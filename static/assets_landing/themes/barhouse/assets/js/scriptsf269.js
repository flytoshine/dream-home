"use strict";



jQuery(document).on('ready', function() { 

	initSwiper();
	initEvents();
	initStyles();
	initMap();
	initCollapseMenu();	
	checkCountUp();	
	initScrollReveal();
	initCountDown();
	initParallax();
	
	if (!/Mobi/.test(navigator.userAgent) && jQuery(window).width() > 768) jQuery('.matchHeight').matchHeight();
});

jQuery(window).on('scroll', function (event) {

	checkNavbar();
}).scroll();

jQuery(window).on('load', function(){

	initMasonry();

});

/* Collapse menu slide */
function initCollapseMenu() {

	var navbar = jQuery('#navbar'),
		navbar_toggle = jQuery('.navbar-toggle'),
		navbar_wrapper = jQuery("#nav-wrapper");

    navbar_wrapper.on('click', '.navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
        navbar_wrapper.toggleClass('mob-visible');
    });

	// Anchor mobile menu
	navbar.on('click', '.menu-item-type-custom > a', function(e) {

		if ( typeof jQuery(this).attr('href') !== 'undefined' && jQuery(this).attr('href') !== '#' && jQuery(this).attr('href').charAt(0) === '#' )  {

	        navbar_toggle.addClass('collapsed');
	        navbar.addClass('collapse');
	        navbar_wrapper.removeClass('mob-visible');
    	}  	    
    });

    navbar.on('click', '.menu-item-has-children > a', function(e) {

    	var el = jQuery(this);

    	if (!el.closest('#navbar').hasClass('collapse')) {

    		if ((el.attr('href') === undefined || el.attr('href') === '#') || e.target.tagName == 'A') {

		    	el.next().toggleClass('show');
		    	el.next().children().toggleClass('show');
		    	el.parent().toggleClass('show');

		    	return false;
		    }
	    }
    });

    var lastWidth;
    jQuery(window).on("resize", function () {

    	checkNavbar();

    	var winWidth = jQuery(window).width(),
    		winHeight = jQuery(window).height();

        if (winWidth > 1199 && navbar_toggle.is(':hidden')) {
            navbar.addClass('collapse');
            navbar_toggle.addClass('collapsed');
            navbar_wrapper.removeClass('mob-visible');
        }

       	lastWidth = winWidth;

		//if (winHeight < 820) navbar_wrapper.find('.navbar').addClass('lighter'); else navbar_wrapper.find('.navbar').removeClass('lighter');     	
    });	
}

/* Navbar is set darker on main page on scroll */
function checkNavbar() {

	var scroll = jQuery(window).scrollTop(),
    	navBar = jQuery('nav.navbar:not(.no-dark)'),
    	topBar = jQuery('.top-bar'),
	    slideDiv = jQuery('.slider-full');

    if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
}

/* All keyboard and mouse events */
function initEvents() {

	setTimeout(function() { if ( typeof Pace !== 'undefined' && jQuery('body').hasClass('paceloader-enabled') ) { Pace.stop(); }  }, 3000);	

	initMenuFilter();
	jQuery('.swipebox.photo').magnificPopup({type:'image', gallery: { enabled: true }});
	jQuery('.swipebox.image-video').magnificPopup({type:'iframe'});

	// WooCommerce grid-list toggle
	jQuery('.gridlist-toggle').on('click', 'a', function() {

		jQuery('.matchHeight').matchHeight();
	});

	jQuery('.menu-types').on('click', 'a', function() {

		var el = jQuery(this);

		el.addClass('active').siblings('.active').removeClass('active');
		el.parent().find('.type-value').val(el.data('value'));

		return false;
	});

	/* Scrolling to navbar from "go top" button in footer */
    jQuery('footer').on('click', '.go-top', function() {

	    jQuery('html, body').animate({ scrollTop: 0 }, 800);
		return false;
	});

    jQuery('.alert').on('click', '.close', function() {

	    jQuery(this).parent().fadeOut();
	    return false;
	});	

    jQuery('#st_gdpr_iframe').remove();
	jQuery(".topbar-icons.mobile, .topbar-icons.icons-hidden")
		.mouseover(function() {

			jQuery('.topbar-icons.icons-hidden').addClass('show');
			jQuery('#navbar').addClass('muted');
		})
		.mouseout(function() {
			jQuery('.topbar-icons.icons-hidden').removeClass('show');
			jQuery('#navbar').removeClass('muted');
		});


	// TopBar Search
    var searchHandler = function(event){

        if (jQuery(event.target).is("#top-search, #top-search *")) return;
        jQuery(document).off("click", searchHandler);
        jQuery('#top-search').toggleClass('show-field');
        jQuery('#navbar').toggleClass('muted');
    }


	jQuery('#top-search-ico').on('click', function (e) {

		e.preventDefault();
		jQuery(this).parent().toggleClass('show-field');
		jQuery('#navbar').toggleClass('muted');
        if (jQuery('#top-search').hasClass('show-field')) {

        	jQuery(document).on("click", searchHandler);
        }
        	else {

        	jQuery(document).off("click", searchHandler);
        }
	});

	jQuery('#top-search-ico-submit').on('click', function() {

		window.location = '/?s=' + jQuery('#top-search input').val();
		return false;
	});	

	jQuery('#top-search input').keypress(function (e) {
		if (e.which == 13) {
			window.location = '/?s=' + jQuery('#top-search input').val();
			return false;
		}
	});

	jQuery('.woocommerce').on('click', 'div.quantity > span', function(e) {

		var f = jQuery(this).siblings('input');
		if (jQuery(this).hasClass('more')) {
			f.val(Math.max(0, parseInt(f.val()))+1);
		} else {
			f.val(Math.max(1, Math.max(0, parseInt(f.val()))-1));
		}
		e.preventDefault();

		jQuery(this).siblings('input').change();

		return false;
	});
}

function initCountDown() {

	var countDownEl = jQuery('.ltx-countdown');

	if (jQuery(countDownEl).length) {

			jQuery(countDownEl).each(function(i, el) {

			jQuery(el).countdown(jQuery(el).data('date'), function(event) {
				console.log(event.strftime('' + jQuery(countDownEl).data('template')));
				//console.log(event.strftime('' + '<span>%S <span>seconds</span></span>'));

				jQuery(this).html(event.strftime('' + jQuery(countDownEl).data('template')));
			});		
		});
	}
}

function ltxUrlDecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

/* Parallax initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	jQuery('.like-parallax').each(function() {

		jQuery(this).parallax("50%", 0.3);		
	});

	if ( jQuery('.ltx-parallax-slider').length ) {

		var scene = jQuery('.ltx-parallax-slider').get(0);
		var parallaxInstance = new Parallax(scene, {

			hoverOnly : true,
			limitY : 0,
		});
	}

	jQuery(".ltx-scroll-parallax-1").paroller({ factor: 0.40, type: 'foreground', direction: 'vertical' });
	jQuery(".ltx-scroll-parallax-2").paroller({ factor: 0.15, type: 'foreground', direction: 'vertical' });
	jQuery(".ltx-scroll-parallax-3").paroller({ factor: 0.25, type: 'foreground', direction: 'vertical' });
}

/* Adding custom classes to element */
function initStyles() {

	jQuery('form:not(.checkout) select:not(#rating), aside select').wrap('<div class="select-wrap"></div>');
	jQuery('.mc4wp-form .btn').addClass('btn-black');
	jQuery('.wpcf7-checkbox').parent().addClass('margin-none');

	jQuery('input[type="submit"], button[type="submit"], .post .more-link').addClass('btn btn-default btn-xs');
	jQuery('#send_comment').removeClass('btn-xs').addClass('btn-lg');
	jQuery('#searchsubmit').removeClass('btn');

	jQuery('.form-btn-shadow .btn,.form-btn-shadow input[type="submit"]').addClass('btn-shadow');
	jQuery('.form-btn-wide .btn,.form-btn-wide input[type="submit"]').addClass('btn-wide');

	jQuery('.heading + .ltx-content-width').addClass('ltx-sr-id-' + Math.floor((Math.random() * (10000 - 1000) + 1000)) + ' ltx-sr ltx-sr-effect-fade_in ltx-sr-el-block ltx-sr-delay-300 ltx-sr-duration-1000 ltx-sr-sequences-0');

	jQuery('.woocommerce .button').addClass('btn').removeClass('button');
	jQuery('.woocommerce-message .btn, .woocommerce-info .btn').addClass('btn-xs');
	jQuery('.woocommerce .price_slider_amount .button').addClass('btn btn-black btn-xs color-text-white color-hover-second').removeClass('button');

	jQuery('.ltx-hover-logos a img').each(function(i, el) { jQuery(el).clone().addClass('ltx-img-hover').insertAfter(el); });
	
	jQuery(".container input[type=\"submit\"], .container input[type=\"button\"]").not('.btn-xs').wrap('<span class="ltx-btn-wrap"></span');
	jQuery(".container .wpcf7-submit").removeClass('btn-xs').wrap('<span class="ltx-btn-wrap"></span');

	jQuery('.blog-post .nav-links > a').wrapInner('<span></span>');
	jQuery('.blog-post .nav-links > a[rel="next"]').wrap('<span class="next"></span>');
	jQuery('.blog-post .nav-links > a[rel="prev"]').wrap('<span class="prev"></span>');

	jQuery('section.bg-overlay-black, .wpb_row.bg-overlay-black').prepend('<div class="ltx-overlay-black"></div>');
	jQuery('section.bg-overlay-dark, .wpb_row.bg-overlay-dark').prepend('<div class="ltx-overlay-dark"></div>');

	// Cart quanity change

	jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
	jQuery(document).off('updated_wc_div').on('updated_wc_div', function () {

		jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
		initStyles();
	});

}

/* Starting countUp function */
function checkCountUp() {

	if (jQuery(".countUp").length){

		jQuery('.countUp').counterUp();
	}
}

/* 
	Scroll Reveal Initialization
	Catches the classes: ltx-sr-fade_in ltx-sr-text_el ltx-sr-delay-200 ltx-sr-duration-300 ltx-sr-sequences-100
*/
function initScrollReveal() {

	if (/Mobi/.test(navigator.userAgent) || jQuery(window).width() < 768) return false;

	window.sr = ScrollReveal();

	var srAnimations = {
		zoom_in: {
			
			opacity : 1,
			scale    : 0.01,
		},
		fade_in: {
			distance: 0,
			opacity : 0,
			scale : 1,
		},
		slide_from_left: {
			distance: '200%',
			origin: 'left',			
		},
		slide_from_right: {
			distance: '150%',
			origin: 'right',			
		},
		slide_from_top: {
			distance: '150%',
			origin: 'top',			
		},
		slide_from_bottom: {
			distance: '150%',
			origin: 'bottom',			
		},
		slide_rotate: {
			rotate: { x: 0, y: 0, z: 360 },		
		},		
	};

	var srElCfg = {

		block: [''],
		items: ['article', '.item'],
		text_el: ['.header', '.subheader', '.btn', 'p', 'img'],
		list_el: ['li']
	};


	/*
		Parsing elements class to get variables
	*/
	jQuery('.ltx-sr').each(function() {

		var el = jQuery(this),
			srClass = el.attr('class');

		var srId = srClass.match(/ltx-sr-id-(\S+)/),
			srEffect = srClass.match(/ltx-sr-effect-(\S+)/),
			srEl = srClass.match(/ltx-sr-el-(\S+)/),
			srDelay = srClass.match(/ltx-sr-delay-(\d+)/),
			srDuration = srClass.match(/ltx-sr-duration-(\d+)/),
			srSeq = srClass.match(/ltx-sr-sequences-(\d+)/); 

		var cfg = srAnimations[srEffect[1]];

		var srConfig = {

			delay : parseInt(srDelay[1]),
			duration : parseInt(srDuration[1]),
			easing   : 'ease-in-out',
			afterReveal: function (domEl) { jQuery(domEl).css('transition', 'all .3s ease'); }
		}			

		cfg = jQuery.extend({}, cfg, srConfig);

		var initedEls = [];
		jQuery.each(srElCfg[srEl[1]], function(i, e) {

			initedEls.push('.ltx-sr-id-' + srId[1] + ' ' + e);
		});

		sr.reveal(initedEls.join(','), cfg, parseInt(srSeq[1]));
	});
}

/*
	Slider filter 
	Filters element in slider and reinits swiper slider after
*/
function initSliderFilter(swiper) {

	var btns = jQuery('.slider-filter'),
		container = jQuery('.slider-filter-container');

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat', function() {

			var el = jQuery(this),
				filter = el.data('filter'),
				limit = el.data('limit');

			container.find('.filter-item').show();
			el.parent().parent().find('.cat-active').removeClass('cat-active')
			el.addClass('cat-active');

			if (filter !== '') {

				container.find('.filter-item').hide();
				container.find('.filter-item.filter-type-' + filter + '').fadeIn();
			}

			if (swiper !== 0) {

				swiper.slideTo(0, 0);
				swiper.update();
			}

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.cat:first')

		firstBtn.addClass('cat-active');
		container.find('.filter-item').hide();
		container.find('.filter-item.filter-type-' + firstBtn.data('filter') + '').show();
	}
}

/*
	Menu filter
*/
function initMenuFilter() {

	var container = jQuery('.menu-sc'),
		btns = jQuery('.menu-sc .menu-filter');

	var niceScrollConf = {cursorcolor:"#242424",cursorborder:"0px",background:"#fff",cursorwidth: "7px",cursorborderradius: "0px",autohidemode:false};

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat', function() {

			var el = jQuery(this),
				filter = el.data('filter');

			container.find('article').show();
			el.parent().parent().find('.cat-active').removeClass('cat-active')
			el.addClass('cat-active');

			if (filter !== '') {

				container.find('article').hide();
				container.find('article.filter-type-' + filter + '').fadeIn();
			}

			jQuery('.menu-sc .items').getNiceScroll().resize();

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.cat:first')

		firstBtn.addClass('cat-active');
		container.find('article').hide();
		container.find('article.filter-type-' + firstBtn.data('filter') + '').show();
	}

	jQuery('.menu-sc .items').niceScroll(niceScrollConf);	
}



/* Swiper slider initialization */
function initSwiper() {


	var products = jQuery('.products-slider'),
		sliders = jQuery('.slider-sc'),
		servicesEl = jQuery('.services-photos-slider'),
		clientsSwiperEl = jQuery('.testimonials-slider'),
		gallerySwiperEl = jQuery('.swiper-gallery'),
		postGalleryEl = jQuery('.ltx-post-gallery'),
		portfolio = jQuery('.portfolio-slider'),
		textSwiperEl = jQuery('.swiper-text'),
		schedule = jQuery('.swiper-schedule');

	if (postGalleryEl.length) {

	    var postGallerySwiper = new Swiper(postGalleryEl, {

			direction   : 'horizontal',
			
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
						
	        pagination: '.swiper-pages',
	        paginationClickable: true,

			speed		: 1000,   
		
			autoplay    : postGalleryEl.data('autoplay'),
			autoplayDisableOnInteraction	: false,
		
	    });

	    postGallerySwiper.update();
	}


	if (portfolio.length) {

		jQuery(portfolio).each(function(i, el) {

		    var portfolioSwiper = new Swiper(el, {

				direction   : 'horizontal',
				
		        pagination: '.swiper-pages',
		        paginationClickable: true,

				speed		: 1000,   
			
				autoplay    : portfolio.data('autoplay'),
				autoplayDisableOnInteraction	: false,
			
		    });

		    portfolioSwiper.update();

		});

	}

	if (clientsSwiperEl.length) {

	    var clientsSwiper = new Swiper(clientsSwiperEl, {

			direction   : 'horizontal',
			
	        pagination: '.swiper-pages',
	        paginationClickable: true,

			speed		: 1000,
			slidesPerView : clientsSwiperEl.data('cols'),
			slidesPerGroup : clientsSwiperEl.data('cols'),	   
		
			autoplay    : clientsSwiperEl.data('autoplay'),
			autoplayDisableOnInteraction	: false,
		
	    });

	    clientsSwiper.update();

		jQuery(window).on('resize', function(){

			var ww = jQuery(window).width(),
				wh = jQuery(window).height();

			if ( clientsSwiperEl.data('cols') >= 2 ) {

				if (ww > 1000) { clientsSwiper.params.slidesPerView = 2; clientsSwiper.params.slidesPerGroup = 2; }
				if (ww <= 1000) { clientsSwiper.params.slidesPerView = 1; clientsSwiper.params.slidesPerGroup = 1; }
				if (ww <= 479) { clientsSwiper.params.slidesPerView = 1; clientsSwiper.params.slidesPerGroup = 1; }		
			
				clientsSwiper.update();			
			}
		}).resize(); 
	}

	if (schedule.length) {

		var schedulePages = schedule.data('pages');

	    var scheduleSwiper = new Swiper(schedule, {

			direction   : 'horizontal',
	        pagination: '.swiper-pages',
	        paginationClickable: true,
	        paginationBulletRender: function (swiper, index, className) {

	            return '<span class="btn btn-main btn-xs ' + className + '">' + (schedulePages[index]) + '</span>';
	        }		

	    });

	    initSliderFilter(scheduleSwiper);
	}

	if (products.length) {

	    var productsSwiper = new Swiper(products, {

			speed		: 1000,
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			slidesPerView : products.data('cols'),	        
			slidesPerGroup : products.data('cols'),	        
		
			autoplay    : products.data('autoplay'),
			autoplayDisableOnInteraction	: false,
	    });

	    initSliderFilter(productsSwiper);

		jQuery(document).on('vc-full-width-row', function() {

			productsSwiper.update();
		});		

		jQuery(window).on('resize', function(){

			var ww = jQuery(window).width(),
				wh = jQuery(window).height();

			if ( products.data('cols') >= 2 ) {

				if (ww > 1200) { productsSwiper.params.slidesPerView = 3; productsSwiper.params.slidesPerGroup = 4; }
				if (ww <= 1199) { productsSwiper.params.slidesPerView = 2; productsSwiper.params.slidesPerGroup = 2; }
				if (ww <= 1000) { productsSwiper.params.slidesPerView = 2; productsSwiper.params.slidesPerGroup = 2; }
				if (ww <= 768) { productsSwiper.params.slidesPerView = 1; productsSwiper.params.slidesPerGroup = 1; }		
			
				productsSwiper.update();			
			}	

		}).resize();

	}
		else {

	    initSliderFilter(0);
	}

/*
	if (servicesEl.length) {

	    var servicesSwiper = new Swiper(servicesEl, {

			direction   : 'horizontal',

			speed		: 1000,
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			slidesPerView : servicesEl.data('cols'),
		
			autoplay    : servicesEl.data('autoplay'),
			autoplayDisableOnInteraction	: false,
	    });
	}
*/
	if (servicesEl.length) {

		jQuery(servicesEl).each(function(i, el) {

		    var servicesSwiper = new Swiper(el, {

				direction   : 'horizontal',

				speed		: 1000,
				nextButton	: '.arrow-right',
				prevButton	: '.arrow-left',
				navigation: {
				nextEl: '.arrow-right',
				prevEl: '.arrow-left',
			},			

				slidesPerView : jQuery(el).data('cols'),
			
				autoplay    : jQuery(el).data('autoplay'),
				autoplayDisableOnInteraction	: false,
		    });
		
			jQuery(document).on('vc-full-width-row', function() {

				servicesSwiper.update();
			});		   

			jQuery(window).on('resize', function(){

				var ww = jQuery(window).width(),
					wh = jQuery(window).height();


				if (jQuery(el).length && jQuery(el).data('cols') >= 3) {

					if (ww > 1600) { servicesSwiper.params.slidesPerView = jQuery(el).data('cols'); }
					if (ww <= 1600) { servicesSwiper.params.slidesPerView = 3; }
					if (ww <= 1199) { servicesSwiper.params.slidesPerView = 2; }
					if (ww <= 480) {

						if ( servicesEl.hasClass('ltx-mobile-disabled') ) {

							servicesSwiper.destroy( true, true );
							servicesEl.find('.swiper-wrapper').removeClass('swiper-wrapper');
							servicesEl.find('.swiper-slide').removeClass('swiper-slide');
							servicesEl.find('.arrows').hide();
						}
							else {

							servicesSwiper.params.slidesPerView = 1;
						}
					}		
				
					servicesSwiper.update();			
				}				
			});

			window.dispatchEvent(new Event('resize'));
		});

	}


	if (gallerySwiperEl.length) {	

	    var gallerySwiperEl = new Swiper(gallerySwiperEl, {
			direction   : 'horizontal',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,		
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}

	if (textSwiperEl.length) {	

	    var textSwiperEl = new Swiper(textSwiperEl, {
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			loop		: true,
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}	


}


/* Masonry initialization */
function initMasonry() {

	jQuery('.masonry').masonry({
	  itemSelector: '.item',
	  columnWidth:  '.item'
	});		
}

/* Google maps init */
function initMap() {

	jQuery('.ltx-google-maps').each(function(i, mapEl) {

		mapEl = jQuery(mapEl);
		if (mapEl.length) {

			var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
			var map = new google.maps.Map(document.getElementById(mapEl.attr('id')), {
			  zoom: mapEl.data('zoom'),
			  center: uluru,
			  scrollwheel: false,
			  styles: mapStyles
			});

			var marker = new google.maps.Marker({
			  position: uluru,
			  icon: mapEl.data('marker'),
			  map: map
			});
		}
	});
}
