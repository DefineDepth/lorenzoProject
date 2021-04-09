"use strict";

import getViewportWidth from './helpers/getViewportWidth';

import Feather from "feather-icons";
import barba from '@barba/core';
import { gsap } from "gsap";

import Swiper from 'swiper/bundle';


function initComponents() {
  Feather.replace();
  headerBar();
  clientsSectionSlider();
  servicesSectionSlider();
}

initComponents();

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



// barba.init({
// });

// window.App = {};

// App.html = document.querySelector('html');
// App.body = document.querySelector('body');
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
