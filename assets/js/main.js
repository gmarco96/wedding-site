/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			Utils.initSlideShow('#gallery-one');
			Utils.initSlideShow('#gallery-two');
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		/*$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});*/

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	
	// Add to calendar: Android gets the Google Calendar link (it handles .ics files poorly),
	// everyone else keeps the default .ics file (iPhone, Mac, Outlook...).
		if (/Android/i.test(navigator.userAgent))
			$('.add-to-calendar').each(function() {
				$(this)
					.attr('href', $(this).data('google'))
					.attr({ target: '_blank', rel: 'noopener' })
					.removeAttr('type');
			});

	// RSVP Modal.
		var $modal = $('#rsvp-modal'),
			$modalForm = $modal.find('.modal-form');

		function openModal() {
			// Load the form lazily, only on first open.
			if (!$modalForm.attr('src'))
				$modalForm.attr('src', $modalForm.data('src'));

			$modal.addClass('is-visible').attr('aria-hidden', 'false');
			$body.addClass('modal-open');
			$modal.find('.modal-close').trigger('focus');
		}

		function closeModal() {
			$modal.removeClass('is-visible').attr('aria-hidden', 'true');
			$body.removeClass('modal-open');
		}

		$('.open-modal').on('click', function(event) {
			event.preventDefault();
			openModal();
		});

		$modal.on('click', '[data-close-modal]', closeModal);

		$window.on('keydown', function(event) {
			if (event.key === 'Escape' && $modal.hasClass('is-visible'))
				closeModal();
		});

})(jQuery);