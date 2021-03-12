/*--------------------------------------------------
  04. Page reveals
---------------------------------------------------*/

function pageRevealEffects() {

  // masthead shapes
  gsap.registerEffect({
    name: 'mastheadShapes',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        opacity: 0,
        y: config.y,
      }, {
        ease: config.easing,
        duration: config.duration,
        opacity: 1,
        y: '0%',
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 3.0,
      y: '90%',
    },
  });

  // header, menu and ui elements
  gsap.registerEffect({
    name: 'uiElementsAnimate',
    effect: (target, config) => {

      let headerLogo;
      let headerMenu;
      let classicMenu;
      let uiElements;

      if (document.querySelector('.js-header-logo')) {
        headerLogo = document.querySelector('.js-header-logo');
      }
      if (document.querySelector('.js-header-menu')) {
        headerMenu = document.querySelector('.js-header-menu');
      }
      if (document.querySelector('.js-navClassic-list > li > a')) {
        classicMenu = document.querySelectorAll('.js-navClassic-list > li > a');
      }
      if (document.querySelector('.js-ui')) {
        uiElements = document.querySelectorAll('.js-ui');
      }

      if (!headerLogo && !headerMenu && !uiElements && !classicMenu) return;

      return gsap.fromTo([
        headerLogo,
        headerMenu,
        classicMenu,
        uiElements,
      ], {
        y: config.y,
        opacity: 0,
      }, {
        ease: config.easing,
        duration: config.duration,
        y: '0px',
        opacity: 1,
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 0.8,
      y: '30px',
    },
  });

  // masthead background
  gsap.registerEffect({
    name: 'mastheadBackground',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        scale: 1.4,
        opacity: 0,
      }, {
        ease: 'quart.inOut',
        duration: 1.4,
        scale: 1,
        opacity: 1,
      })
  
    },
    extendTimeline: true,
  });

}


const PageReveal = (function() {

  function mastheadType_1(tl) {

    if (!document.querySelector('.js-masthead-type-1')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-1');
    let title = false;
    let text = masthead.querySelector('.js-text');
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }


    const splitTitle = {
      stagger: 0.1,
      duration: 1.2,
      ease: 'quart.out',
      y: '0%',
    };
    
    const textButton = {
      stagger: 0.1,
      duration: 1,
      ease: 'quart.out',
      y: '0%',
      opacity: 1,
    };


    gsap.set([text, button], {
      y: '35px',
      opacity: 0,
    })


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');

      tl
        .mastheadShapes(shapes, '>-0.7')
        .to(title, splitTitle, '>-2.3')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

    if (masthead.classList.contains('js-bg')) {
      const bgItem = masthead.querySelector('.js-bg-item');

      tl
        .mastheadBackground(bgItem, '>-0.0')
        .to(title, splitTitle, '>-0.5')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

  }

  function mastheadType_2(tl) {

    if (!document.querySelector('.js-masthead-type-2')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-2');
    const shapes = masthead.querySelectorAll('.js-shape');
    const bgItem = masthead.querySelector('.js-bg-item');
    const title = masthead.querySelector('.js-title');
    const text = masthead.querySelector('.js-text');
    const button = masthead.querySelector('.js-button');

    let delay = '>-0.1';

    if (shapes.length) {
      tl.mastheadShapes(shapes, '>-0.2')
      tl.uiElementsAnimate(null, '>-2.5')
      delay = '>-0.9';
    } else if (bgItem) {
      tl.mastheadBackground(bgItem, '>-0.8')
      tl.uiElementsAnimate(null, '>-0.1')
      delay = '>-0.1';
    }

    tl
      .fromTo(title.querySelectorAll('.split__line'), {
        y: '100%',
      }, {
        stagger: 0.12,
        duration: 1.4,
        ease: 'quart.out',
        y: '0%',
      }, delay)
      .fromTo(text.querySelectorAll('.split__line'), {
        y: '100%',
      }, {
        stagger: 0.08,
        duration: 1.2,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.8')
      .fromTo(button, {
        y: '100%',
      }, {
        ease: 'quart.out',
        duration: 1.2,
        y: '0%',
      }, '>-0.8')

  }

  function mastheadType_3(tl) {

    if (!document.querySelector('.js-masthead-type-3')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-3');
    let subtitle = false;
    let title = false;
    let text = false;
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-subtitle')) {
      subtitle = masthead.querySelectorAll('.js-subtitle .split__line');
    }

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }

    if (masthead.querySelector('.js-text')) {
      text = masthead.querySelectorAll('.js-text .split__line');
    }


    const splitLines = {
      stagger: 0.1,
      duration: 1.2,
      ease: 'quart.out',
      y: '0%',
    };

    const slideButton = {
      ease: 'quart.out',
      duration: 1.2,
      y: '0%',
    };

    gsap.set(button, { y: '100%' });


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');

      tl
        .mastheadShapes(shapes, '>-0.7')
        .to(subtitle, splitLines, '>-2.0')
        .to(title, splitLines, '>-0.9')
        .to(text, splitLines, '>-0.9')
        .to(button, slideButton, '>-0.9')
        .uiElementsAnimate(null, '>-0.9')
    }

    if (masthead.classList.contains('js-bg')) {
      const bgItem = masthead.querySelector('.js-bg-item');

      tl
        .mastheadBackground(bgItem, '>-0.0')
        .to(subtitle, splitLines, '>-0.5')
        .to(title, splitLines, '>-0.9')
        .to(text, splitLines, '>-0.9')
        .to(button, slideButton, '>-0.9')
        .uiElementsAnimate(null, '>-0.9')
    }

  }

  function mastheadType_4(tl) {

    if (!document.querySelector('.js-masthead-type-4')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-4');
    let image = masthead.querySelector('.js-image');
    let imageCover = masthead.querySelector('.js-image-cover');
    let subtitle = false;
    let title = false;
    let text = false;
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-subtitle')) {
      subtitle = masthead.querySelectorAll('.js-subtitle .split__line');
    }

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }

    if (masthead.querySelector('.js-text')) {
      text = masthead.querySelectorAll('.js-text .split__line');
    }


    gsap.set(image, { scale: 2.2 });
    gsap.set(button, { y: '101%' });

    tl
      .to(imageCover, {
        duration: 0.8,
        ease: 'quart.inOut',
        scaleX: 0,
      }, '>-0.1')
      .to(image, {
        duration: 0.8,
        ease: 'quart.inOut',
        scale: 1,
      }, '>-0.8')
      
      .to(subtitle, {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.3')
      .to(title, {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.8')
      .to(text, {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.8')
      .to(button, {
        ease: 'quart.out',
        duration: 1,
        y: '0%',
      }, '>-0.8')

      .uiElementsAnimate(null, '>-0.8')

  }


  function mastheadPortfolioWorkType_1(tl) {

    if (!document.querySelector('.js-masthead-type-work-1')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-work-1');
    const subtitle = masthead.querySelectorAll('.js-subtitle .split__line');
    const title = masthead.querySelectorAll('.js-title .split__line');
    const infoItems = masthead.querySelectorAll('.js-info-item .split__line');
    

    const splitBase = {
      stagger: 0.1,
      duration: 1,
      ease: 'quart.out',
      y: '0%',
    };

    const splitInfoItems = {
      stagger: 0.08,
      duration: 0.8,
      ease: 'quart.out',
      opacity: 1,
      y: '0px',
    };


    gsap.set(infoItems, { opacity: 0, y: '34px' });


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');
      const image = masthead.querySelector('.js-image');

      gsap.set(image, { opacity: 0, y: '34px' });

      tl
        .mastheadShapes(shapes, '>-0.8')
        .to(subtitle, splitBase, '>-2.3')
        .to(title, splitBase, '>-0.8')
        .to(infoItems, splitInfoItems, '>-0.8')
        .to(image, {
          duration: 1,
          ease: 'quart.out',
          opacity: 1,
          y: '0px',
        }, '>-0.5')
    }

    if (masthead.classList.contains('js-bg')) {
      const image = masthead.querySelector('.js-image');

      gsap.set(image, { opacity: 0, scale: 1.3 });

      tl
        .to(image, {
          duration: 1.0,
          ease: 'quart.inOut',
          opacity: 1,
          scale: 1,
        }, '>-0.2')
        .uiElementsAnimate(null, '>-0.4')
        .to(subtitle, splitBase, '>-0.6')
        .to(title, splitBase, '>-0.8')
        .to(infoItems, splitInfoItems, '>-0.8')
        
    }

  }

  function mastheadBlogArticle(tl) {

    if (!document.querySelector('.js-masthead-blog-article')) {
      return tl;
    }
    
    const masthead = document.querySelector('.js-masthead-blog-article');
    const info = masthead.querySelector('.js-info');
    const title = masthead.querySelector('.js-title');

    tl
      .fromTo(info, {
        opacity: 0,
        y: '34px',
      }, {
        duration: 1,
        ease: 'quart.out',
        opacity: 1,
        y: '0px',
      }, '>-0.2')
      .to(title.querySelectorAll('.split__line'), {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.7')

  }


  function sliderMainType_1(tl) {

    if (!document.querySelector('.js-sliderMain-type-1')) {
      return tl;
    }

    const slider = document.querySelector('.js-sliderMain-type-1');
    const image = slider.querySelector('.js-image');
    const bgTitle = slider.querySelector('.sliderMain__bgTitle');
    const subtitle = slider.querySelector('.sliderMain__subtitle');
    const title = slider.querySelector('.sliderMain__title');
    const button = slider.querySelector('.sliderMain__button');

    tl
      .fromTo(image, {
        scale: 1.6,
        opacity: 0,
      }, {
        duration: 0.8,
        ease: 'quart.inOut',
        scale: 1,
        opacity: 1,
      }, '>-0.1')
  
      .fromTo([subtitle, title, button], {
        opacity: 0,
        y: '35px',
      }, {
        stagger: 0.1,
        duration: 0.8,
        ease: 'quart.out',
        opacity: 1,
        y: '0px',
      }, '>-0.2')
      .fromTo(bgTitle, {
        opacity: 0,
        x: '35px',
      }, {
        duration: 0.8,
        ease: 'quart.out',
        opacity: 1,
        x: '0px',
      }, '>-0.6')

      .uiElementsAnimate(null, '>-0.5')

  }

  function sliderMainType_2(tl) {

    if (!document.querySelector('.js-sliderMain-type-2')) {
      return tl;
    }

    const slider = document.querySelector('.js-sliderMain-type-2');
    const slideContent = slider.querySelector('[data-swiper-slide-index="0"]');
    let img = slider.querySelectorAll('.js-slider-img')[0];
    let title = slider.querySelectorAll('.js-slider-title');
    let subtitle = slideContent.querySelector('.js-slider-subtitle');

    gsap.set([title, subtitle], { opacity: 0, y: '40px', })

    tl
      .add(() => {
        img.classList.add('is-active');
      }, '>-0.0')
      .uiElementsAnimate(null, '>+0.6')
      .to(title, {
        ease: 'quart.inOut',
        duration: 0.8,
        opacity: 1,
        y: '0px',
      }, '>-0.6')
      .to(subtitle, {
        duration: 0.8,
        ease: 'quart.inOut',
        opacity: 1,
        y: '0px',
      }, '>-0.7')

  }

  function sliderMainType_3(tl) {

    if (!document.querySelector('.js-sliderMain-type-3')) {
      return tl;
    }

    const slider = document.querySelector('.js-sliderMain-type-3');
    const image = slider.querySelector('.js-image');
    const imageCover = slider.querySelector('.js-image-cover');
    const slideContent = slider.querySelector('.slider__content');
    const subtitle = slideContent.querySelector('.js-subtitle');
    const title = slideContent.querySelector('.js-title');
    const button = slideContent.querySelector('.js-button');

    gsap.set(image, { scale: 2.2, })
    gsap.set(button, { y: '100%', })

    tl
      .to(imageCover, {
        duration: 0.8,
        ease: 'quart.inOut',
        scaleX: 0,
      }, '>-0.1')
      .to(image, {
        duration: 0.8,
        ease: 'quart.inOut',
        scale: 1,
      }, '>-0.8')

      .to(subtitle.querySelectorAll('.split__line'), {
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.5')
      .to(title.querySelectorAll('.split__line'), {
        stagger: 0.08,
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.9')
      .to(button, {
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.9')

      .uiElementsAnimate(null, '>-0.9')

  }


  function base(tl) {
    
    if (
      document.querySelector('.js-page-header') ||
      document.querySelector('.js-masthead-type-1') ||
      document.querySelector('.js-masthead-type-2') ||
      document.querySelector('.js-masthead-type-3') ||
      document.querySelector('.js-masthead-type-4') ||
      document.querySelector('.js-masthead-type-work-1') ||
      document.querySelector('.js-sliderMain-type-1') ||
      document.querySelector('.js-sliderMain-type-2') ||
      document.querySelector('.js-sliderMain-type-3') ||
      document.querySelector('.js-masthead-blog-article')
    ) {
      return tl;
    }

    tl.add(() => {
      RevealAnim.init();
    })

  }

  function init(tl) {

    if (document.querySelector('.page-reveal-off')) {
      return tl;
    }

    if (document.querySelector('.js-slider-full-page')) {
      App.html.classList.add('full-page-slider');
    } else {
      App.html.classList.remove('full-page-slider');
    }

    if (
      document.querySelector('.js-page-header') ||
      document.querySelector('.js-masthead-type-1') ||
      document.querySelector('.js-masthead-type-2') ||
      document.querySelector('.js-masthead-type-3') ||
      document.querySelector('.js-masthead-type-4') ||
      document.querySelector('.js-masthead-type-work-1') ||
      document.querySelector('.js-sliderMain-type-1') ||
      document.querySelector('.js-sliderMain-type-2') ||
      document.querySelector('.js-sliderMain-type-3') ||
      document.querySelector('.js-masthead-blog-article')
    ) {
      RevealAnim.init();
    }
    
    mastheadType_1(tl);
    mastheadType_2(tl);
    mastheadType_3(tl);
    mastheadType_4(tl);
    mastheadPortfolioWorkType_1(tl);
    sliderMainType_1(tl);
    sliderMainType_2(tl);
    sliderMainType_3(tl);
    mastheadBlogArticle(tl);
    base(tl);
  
    tl.add(() => {
      if (MainSlider3.isActive()) {
        MainSlider3.autoplayStart();
      }
    })

    return tl;

  }

  return {
    init: init,
  }

})();


function initialReveal() {
  let tl = gsap.timeline();
  tl.preloaderInitial();
  tl = PageReveal.init(tl);
}
