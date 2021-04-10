"use strict";

import getViewportWidth from './helpers/getViewportWidth';

import Feather from "feather-icons";
import barba from '@barba/core';
import { gsap } from "gsap";
import Swiper from 'swiper/bundle';
import LocomotiveScroll from 'locomotive-scroll';


window.APP = {};

APP.html = document.querySelector('html');
APP.body = document.querySelector('body');
APP.scroll = scroll(document.querySelector('[data-scroll-container]'));

function initComponents() {
  Feather.replace();
  menu();
  headerBar();
  clientsSectionSlider();
  servicesSectionSlider();
}

initComponents();

barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    after(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    },
  }],
});

barba.hooks.after(() => {
  APP.scroll.update();
  initComponents();
});

//=======================================


function clientsSectionSlider() {
  const slider = document.querySelector('.js-clients-slider');
  if (!slider) return;

  let instance = {};
  instance.destroyed = true;

  const initSlider = () => {
    instance.slider = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      loopAdditionalSlides: 1,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        }
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
    });

    instance.destroyed = false;
  }

  const init = () => {
    if (getViewportWidth() <= 992) {
      initSlider();
    }
  
    window.addEventListener('resize', () => {
      if (getViewportWidth() <= 992 && instance.destroyed === true) {
        initSlider();
      }
      
      if (getViewportWidth() > 992 && instance.destroyed === false) {
        instance.slider.destroy();
        instance.destroyed = true;
      }
    })
  }

  init();
}


function servicesSectionSlider() {
  const slider = document.querySelector('.js-services-slider');
  if (!slider) return;

  let instance = {};
  instance.destroyed = true;

  const initSlider = () => {
    instance.slider = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      loopAdditionalSlides: 1,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        }
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
    });

    instance.destroyed = false;
  }

  const init = () => {
    if (getViewportWidth() <= 992) {
      initSlider();
    }
  
    window.addEventListener('resize', () => {
      if (getViewportWidth() <= 992 && instance.destroyed === true) {
        initSlider();
      }
      
      if (getViewportWidth() > 992 && instance.destroyed === false) {
        instance.slider.destroy();
        instance.destroyed = true;
      }
    })
  }

  init();
}



function headerBar() {
  const bar = document.querySelector('.js-header');
  if (!bar) return;

  // bar.classList.add('is-hidden');

  console.log('headerBar');
}



function menu() {
  const nav = document.querySelector('.js-nav');
  if (!nav) return;

  console.log('menu init');

  const buttonOpen = document.querySelector('.js-nav-open');
  const buttonClose = document.querySelector('.js-nav-close');
  const background = document.querySelector('.js-nav-bg');
  const list = document.querySelector('.js-nav-list');
  const links = list.querySelectorAll('a');

  const open = () => {
    gsap.timeline()
      .to(buttonOpen, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        onStart: () => {
          buttonOpen.classList.add('pointer-events-none');
        },
      })
      .to(buttonClose, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, '<')
      .to(nav, {
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          buttonOpen.classList.add('pointer-events-none');
          buttonClose.classList.remove('pointer-events-none');
          nav.classList.remove('pointer-events-none');
        },
      }, '<')
  }
  
  const close = () => {
    gsap.timeline()
      .to(buttonClose, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        onStart: () => {
          buttonClose.classList.add('pointer-events-none');
          nav.classList.add('pointer-events-none');
        },
      })
      .to(buttonOpen, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, '<')
      .to(nav, {
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          buttonOpen.classList.remove('pointer-events-none');
        },
      }, '<')
  }

  const init = () => {
    buttonOpen.addEventListener('click', open);
    buttonClose.addEventListener('click', close);
  }

  init();
}



function scroll(container) {
  console.log('scroll init');

  const scroll = new LocomotiveScroll({
    // el: document.querySelector('[data-scroll-container]'),
    el: container,
    smooth: true,
  });

  // const bar = document.querySelector('.js-header');

  scroll.on('scroll', (args) => {
    // console.log(args.scroll.y);

    // if (args.scroll.y > 300) {
    //   bar.classList.add('is-hidden');
    // } else {
    //   bar.classList.remove('is-hidden');
    // }
  })

  return scroll;
}







// // App.SMcontroller = new ScrollMagic.Controller();


// window.onload = function () {
//   // customEasingsInit();

//   document.fonts.ready.then(function () {
//     initComponents();
//     // initialReveal();
//   });
// }

// function initComponents() {
//   console.log('Init components');
// }
