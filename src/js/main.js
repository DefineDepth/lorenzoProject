(function() {
"use strict";

/*------------------------------------------------------------------

  01. Custom easings
  02. Preloader
  03. Header
  04. Page reveals
  05. Custom cursor
  06. Elements reveal
  07. Main sliders
  08. Section sliders
  09. Contact form
  10. Isotope grids
  11. Lazy loading
  12. Parallax
  13. To top button
  14. Scroll down button
  15. Video
  16. Scroll to id
  17. PJAX

-------------------------------------------------------------------*/

// GSAP: turn off console warnings
gsap.config({
	nullTargetWarn: false
});

function GA() {
  ga('set', 'page', window.location.pathname);
  ga('send', 'pageview');
}

window.App = {};

App.config = {
  headroom: {
    enabled: true,
    options: {
      classes : {
        initial : "headroom",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      },
    }
  },
  ajax: {
    enabled: true,
  },
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

if (App.config.headroom.enabled) {
  App.headroom = new Headroom(document.querySelector(".js-header"), App.config.headroom.options);
}

window.onload = function () {

  customEasingsInit();
  pageRevealEffects();
  Preloader.init();

  if (App.config.headroom.enabled) {
    App.headroom.init();
  }

  if (App.config.cursorFollower.enabled) {
    Cursor.init();
  }
  
  if (App.config.ajax.enabled) {
		PJAX.init();
	}

  document.fonts.ready.then(function () {
    initComponents();
    initialReveal();
  });

}


// Reloads all scripts when navigating through pages
function initComponents() {

  Header.init();
  lazyLoading();
  splitTextIntoLines();
  backButton();
  uiScrollDown();
  scrollToIdInit();
  parallaxInit();
  contactForm();
  
  mainSlider1Init();
  mainSlider2Init();
  MainSlider3.init();
  sectionSlidersInit();
  
  masonryFilterInit();
  masonryGridInit();
  
  feather.replace();
  videoBtn();

  //
	// your custom plugins init here
	//

}


//=include('components/customEasings.js')
//=include('components/preloader.js')
//=include('components/menu.js')
//=include('components/pageReveal.js')
//=include('components/cursor.js')
//=include('components/revealAnim.js')
//=include('components/sliders/header.js')
//=include('components/sliders/sections.js')
//=include('components/contact.js')
//=include('components/isotopeInit.js')
//=include('components/lazyLoading.js')
//=include('components/parallax.js')
//=include('components/backButton.js')
//=include('components/scrollDown.js')
//=include('components/video.js')
//=include('components/scrollToId.js')
//=include('components/PJAX.js')

})();
