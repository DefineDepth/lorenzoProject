/*--------------------------------------------------
  03. Header
---------------------------------------------------*/

const Header = (function() {

  let navInner;
  let navBg;
  let navList;
  let navListLinks;
  let navInfoItems;
  
  let navBtnOpen;
  let navBtnClose;
  let navBack;

  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    navInner = document.querySelector('.js-nav-inner');
    navBg = navInner.querySelector('.js-nav-bg');
    navList = navInner.querySelector('.js-navList');
    navListLinks = navInner.querySelectorAll('.js-navList > li > a');
    navInfoItems = navInner.querySelectorAll('.js-navInfo-item');

    navBtnOpen = document.querySelector('.js-nav-open');
    navBtnClose = document.querySelector('.js-nav-close');
    navBack = document.querySelector('.js-nav-back');

    menuDeepLevel = 0;
  }

  
  function init() {

    updateVars();
    menuListBindEvents();
    menuAnimBindEvents();
    classicMenuInit();
    headerSticky();

  }

  function deepLevelCheck(level) {

    if (level) {
      gsap.to(navBack, {
        ease: "quart.inOut",
        duration: 0.6,
        y: '0px',
        opacity: 1,
        onStart: () => {
          navBack.classList.remove('pointer-events-none');
        },
      })
    } else {
      gsap.to(navBack, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
        onStart: () => {
          navBack.classList.add('pointer-events-none');
        },
      })
    }

  }

  function menuListBindEvents() {

    const listItems = document.querySelectorAll('.js-navList .menu-item-has-children');

    if (!listItems.length) return;

    navBack.addEventListener('click', () => {
      const visibleList = navList.querySelector('ul.is-visible');
      const parentList = visibleList.parentElement.parentElement;

      menuDeepLevel--;

      deepLevelCheck(menuDeepLevel);
      menuListStepAnimate(visibleList, parentList);
    });
    
    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;

        deepLevelCheck(menuDeepLevel);
        menuListStepAnimate(parent, subnavList);
      });
    });

  }

  function menuListStepAnimate(hideList, showList) {

    const navBtnClose = document.querySelector('.js-nav-close');
    
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    timeline
      .clear()
      .to(hideListLinks, {
        ease: 'quart.out',
        stagger: -0.04,
        duration: 1.0,
        y: '100%',
        onStart: () => {
          showList.classList.add('is-visible');
          hideList.classList.remove('is-visible');
          navBtnClose.classList.add('pointer-events-none');
        },
      })
      .to(showListLinks, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
        onComplete: () => {
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '>-0.6')

  }

  function menuAnimBindEvents() {

    if (!navBtnOpen) return;

    navBtnOpen.addEventListener('click', () => {
      if (App.config.headroom.enabled) {
        App.headroom.freeze();
      }

      App.html.classList.add('html-overflow-hidden');
      showMenu();
    });

    navBtnClose.addEventListener('click', () => {
      if (App.config.headroom.enabled) {
        App.headroom.unfreeze();
      }

      App.html.classList.remove('html-overflow-hidden');
      hideMenu();
    })

  }

  function showMenu() {

    navInner.classList.add('is-active');

    gsap.timeline()
      .set(navListLinks, { opacity: 1, })
      .set(navBack, { opacity: 0, })

      .fromTo(navBg, {
        scaleY: 0,
      }, {
        scaleY: 1,
        duration: 0.8,
        ease: "quart.inOut",
      })
      .fromTo(navBtnClose, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '0px',
        opacity: 1,
      }, '>-0.2')
      .fromTo(navListLinks, {
        y: '100%',
      }, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
      }, '>-0.7')
      .fromTo(navInfoItems, {
        opacity: 0,
        y: '34px',
      }, {
        ease: "quart.out",
        stagger: 0.08,
        duration: 1.0,
        opacity: 1,
        y: '0px',
        onComplete: () => {
          navList.classList.add('is-visible');
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '<')

  }

  function hideMenu() {

    const navVisibleList = navInner.querySelector('.is-visible');
    const navActiveListLinks = navInner.querySelectorAll('.is-visible > li > a');
    menuDeepLevel = 0;

    gsap.timeline()
      .to([navBtnClose, navBack], {
        ease: "quart.out",
        duration: 0.6,
        opacity: 0,
        y: '-16px',
        onStart: () => {
          navBtnClose.classList.add('pointer-events-none');
          navVisibleList.classList.remove('is-visible');
          navBg.classList.add('origin-top');
        },
      })
      .to(navActiveListLinks, {
        ease: "quart.out",
        duration: 0.8,
        y: '-100%',
      }, '>-0.4')
      .to(navInfoItems, {
        opacity: 0,
        y: '-34px',
        ease: "quart.out",
        duration: 0.8,
      }, '<')

      .to(navBg, {
        ease: "quart.inOut",
        duration: 0.8,
        scaleY: 0,
        onComplete: () => {
          navBtnOpen.classList.remove('pointer-events-none');
          navBg.classList.remove('origin-top');
          navInner.classList.remove('is-active');
        },
      }, '>-0.6')

  }

  function classicMenuInit() {

    const target = document.querySelectorAll('.js-navClassic-list .menu-item-has-children');
  
    if (!target.length) return;
  
    const header = document.querySelector('.header');
    let dropDownTheme;
  
    if (header.classList.contains('js-header-dark')) {
      dropDownTheme = 'dark';
    } else {
      dropDownTheme = 'light';
    }
  
    target.forEach(el => {
      let subnav = el.children;
      let where = 'bottom';
      subnav = subnav[subnav.length - 1];

      if (
        el.closest(".menu-item-has-children") &&
        el.closest(".subnav-list")
      ) {
        where = 'right';
      }
      
      tippy(el, {
        interactive: true,
        content: subnav,
        allowHTML: true,
        placement: where,
        offset: [40, 0],
        delay: [null, 200],
  
        theme: dropDownTheme,
        animation: 'shift',
  
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left-start'],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
              },
            },
          ],
        },
      });
    });
  
  }
  
  function headerSticky() {
  
    const header = document.querySelector('.js-header');
  
    if (!header) return;
  
    new ScrollMagic.Scene({
      offset: '2px',
    })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  
  }


  return {
    init: init,
  }

})();
