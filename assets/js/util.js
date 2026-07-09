'use strict';

let timerInterval = null;

const Utils = {
	countDown: (date) => {
		const now = new Date().getTime();
		const countDownDate = new Date(date).getTime();
		const distance = countDownDate - now;

		if (distance < 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		return {
			days: Math.floor(distance / (1000 * 60 * 60 * 24)),
			hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((distance % (1000 * 60)) / 1000)
		};
	},
	initCountDown: (endDate) => {
		timerInterval = setInterval(function () {
			const countDown = Utils.countDown(endDate);
			$('.days').text(String(countDown.days).padStart(2, '0'));
			$('.hours').text(String(countDown.hours).padStart(2, '0'));
			$('.minutes').text(String(countDown.minutes).padStart(2, '0'));
			$('.seconds').text(String(countDown.seconds).padStart(2, '0'));
		}, 1000);
	},

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

		if (enableAutoStart) {
			setInterval(goToNext, 5000);
		}
	},

	clearCountDown: () => {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
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

