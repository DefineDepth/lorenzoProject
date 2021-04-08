"use strict";

import Feather from "feather-icons";
import barba from '@barba/core';
import { gsap } from "gsap";

import Swiper from 'swiper/core';




Feather.replace();


clientsSectionSlider();

function clientsSectionSlider() {
  const slider = document.querySelector('.js-clients-slider');

  const instance = new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 40,

    // breakpoints: {
      // when window width is >= 320px
      // 767: {
      //   slidesPerView: 4,
      //   spaceBetween: 40
      // }
    // },
  });
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
