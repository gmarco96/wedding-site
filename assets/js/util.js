'use strict';

const Utils = {
	initSlideShow: (selector, enableAutoStart = false) => {
		const container = document.querySelector(selector);
		if (!container) return;

		const track = container.querySelector('.slides');
		const slides = container.querySelectorAll('.slide-item');
		const nextBtn = container.querySelector('.next');
		const prevBtn = container.querySelector('.prev');

		if (!track || !slides.length || !nextBtn || !prevBtn) return;

		let currentIndex = 0;

		const updatePosition = () => {
			track.style.transform = `translateX(-${currentIndex * 100}%)`;
		};

		const goToNext = () => {
			currentIndex = (currentIndex + 1) % slides.length;
			updatePosition();
		};

		const goToPrev = () => {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
			updatePosition();
		};

		nextBtn.addEventListener('click', goToNext);
		prevBtn.addEventListener('click', goToPrev);

		// Swipe (touch) and drag (mouse/pen): the track follows the pointer,
		// then snaps to the next/previous slide or back to the current one.
		const SWIPE_RATIO = 0.2;    // fraction of the width that changes slide
		const FLICK_SPEED = 0.4;    // px/ms: a quick flick changes slide even if short
		let startX = 0, startY = 0, startTime = 0, deltaX = 0;
		let pointerId = null, dragging = false;

		container.addEventListener('dragstart', (e) => e.preventDefault());

		container.addEventListener('pointerdown', (e) => {
			if (e.target.closest('.prev, .next')) return;
			if (e.pointerType === 'mouse' && e.button !== 0) return;
			pointerId = e.pointerId;
			startX = e.clientX;
			startY = e.clientY;
			startTime = performance.now();
			deltaX = 0;
			dragging = false;
		});

		container.addEventListener('pointermove', (e) => {
			if (e.pointerId !== pointerId) return;
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;

			if (!dragging) {
				// Wait for a clear horizontal movement; vertical means page scroll.
				if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
				if (Math.abs(dy) > Math.abs(dx)) { pointerId = null; return; }
				dragging = true;
				container.setPointerCapture(e.pointerId);
				container.classList.add('is-dragging');
			}

			deltaX = dx;
			// Resist dragging past the first/last slide.
			const atEdge = (currentIndex === 0 && dx > 0) || (currentIndex === slides.length - 1 && dx < 0);
			const offset = atEdge ? dx / 3 : dx;
			track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${offset}px))`;
		});

		const endDrag = (e) => {
			if (e.pointerId !== pointerId) return;
			pointerId = null;
			if (!dragging) return;
			dragging = false;
			container.classList.remove('is-dragging');

			const speed = Math.abs(deltaX) / Math.max(performance.now() - startTime, 1);
			const passed = Math.abs(deltaX) > container.offsetWidth * SWIPE_RATIO || speed > FLICK_SPEED;

			if (passed && deltaX < 0 && currentIndex < slides.length - 1) currentIndex++;
			else if (passed && deltaX > 0 && currentIndex > 0) currentIndex--;
			updatePosition();
		};

		container.addEventListener('pointerup', endDrag);
		container.addEventListener('pointercancel', endDrag);

		if (enableAutoStart) {
			setInterval(goToNext, 5000);
		}
	},

	prioritize: (elements, condition) => {
		const nodes = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
		const key = '__prioritize_ref';

		nodes.forEach(el => {
			const parent = el.parentElement;
			if (!parent) return;

			if (!el[key]) {
				if (!condition) return;
				const prev = el.previousElementSibling;
				if (!prev) return;

				el[key] = prev;
				parent.prepend(el);
			} else {
				if (condition) return;
				el[key].after(el);
				delete el[key];
			}
		});
	}
};

