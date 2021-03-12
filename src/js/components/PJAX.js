/*--------------------------------------------------
  17. PJAX
---------------------------------------------------*/

const PJAX = (function() {

  function initNewPage(data) {
    return new Promise((resolve) => {
      
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      App.SMcontroller.destroy(true);
      App.SMcontroller = new ScrollMagic.Controller();

      if (App.config.headroom.enabled) {
        App.headroom.destroy();
        App.headroom = new Headroom(document.querySelector(".js-header"), App.config.headroom.options);
        App.headroom.init();
      }

      if (App.config.cursorFollower.enabled) {
        Cursor.clear();
        Cursor.update();
      }
      
      initComponents();
      resolve(true);
      
    });
  }

  const generalTransition = {
    name: 'пeneralTransition',

    leave: (data) => {
      return new Promise((resolve) => {
        gsap.timeline()
          .preloaderShow()
          .add(() => {
            resolve(true);
          })
      });
    },

    enter: (data) => {
      return new Promise((resolve) => {
        initNewPage(data).then(() => resolve(true));
      });
    },

    afterEnter: (data) => {
      return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.preloaderHide();
        tl = PageReveal.init(tl);
        tl.add(() => {
          MainSlider3.autoplayStart();
          GA();
          resolve(true);
        });
      });
    }
  }

  function init() {

    if (!document.body.hasAttribute('data-barba')) return;

    barba.init({
      sync: true,
      timeout: 10000,
      prevent: ({ el }) => {

				// element doesn't has attribute
        if (!el.hasAttribute('data-barba')) return true;

				// element is anchor
				if (el.getAttribute('href').indexOf('#') > -1) return true;

				// elementor preview
				if (typeof elementor === 'object') return true;

      },
      transitions: [
        generalTransition,
      ],
    });

  }

  return {
    init: init,
  }

})();
