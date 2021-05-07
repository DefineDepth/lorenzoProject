"use strict";

import getViewportWidth from './helpers/getViewportWidth';

import Feather from "feather-icons";
import barba from '@barba/core';
import { gsap } from "gsap";
import Swiper from 'swiper/bundle';
import LocomotiveScroll from 'locomotive-scroll';

import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
// import Scene from "./scene";

// import Scene from "./scene";
// const scene = new Scene("container");


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



  // const scene = new Scene("container");
  


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





// distortion();

// function distortion() {
//   const target = document.querySelector('.js-distortion');
// }








const fragment = `
uniform vec2 u_resolution;

uniform sampler2D u_texture;
uniform sampler2D u_texture2;
uniform vec2 u_textureFactor;
uniform vec2 u_texture2Factor;
uniform float u_textureProgress;

// RGB
uniform vec2 u_rgbPosition;
uniform vec2 u_rgbVelocity;

varying vec2 vUv;
vec2 centeredAspectRatio(vec2 uvs, vec2 factor){
    return uvs * factor - factor /2. + 0.5;
}
void main(){
    // On THREE 102 The image is has Y backwards
    // vec2 flipedUV = vec2(vUv.x,1.-vUv.y);

    vec2 normalizedRgbPos = u_rgbPosition / u_resolution;
    normalizedRgbPos.y = 1. - normalizedRgbPos.y; 

    
    vec2 vel = u_rgbVelocity;
    float dist = distance(normalizedRgbPos + vel / u_resolution, vUv.xy);

    float ratio = clamp(1.0 - dist * 5., 0., 1.);


    vec4 tex1 = vec4(1.);
    vec4 tex2 = vec4(1.);

    vec2 uv = vUv;

    uv.x -= sin(uv.y) * ratio / 100. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 100. * (vel.x + vel.y) / 7.;

    tex1.r = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).r;
    tex2.r = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).r;

    
    uv.x -= sin(uv.y) * ratio / 150. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 150. * (vel.x + vel.y) / 7.;

    tex1.g = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).g;
    tex2.g = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).g;
    
    uv.x -= sin(uv.y) * ratio / 300. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 300. * (vel.x + vel.y) / 7.;

    tex1.b = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).b;
    tex2.b = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).b;
     
    


    vec4 fulltex1 = texture2D(u_texture, centeredAspectRatio(vUv, u_textureFactor) );
    vec4 fulltex2 = texture2D(u_texture2, centeredAspectRatio(vUv, u_texture2Factor));
    
    vec4 mixedTextures =  mix(tex1,tex2,u_textureProgress);

    gl_FragColor = mixedTextures;
}
`;

const vertex = `
#define PI 3.14159265359
uniform float u_offset;
uniform float u_progress;
uniform float u_direction;
uniform float u_time;
uniform float u_waveIntensity;
varying vec2 vUv;
void main(){
    vec3 pos = position.xyz;

    float distance = length(uv.xy - 0.5 );
    float sizeDist = length(vec2(0.5,0.5));
    float normalizedDistance = distance/sizeDist ;

    float stickOutEffect = normalizedDistance ;
    float stickInEffect = -normalizedDistance ;

    
    float stickEffect = mix(stickOutEffect,stickInEffect, u_direction);

    // Backwards V wave.
    float stick = 0.5;

    float waveIn = u_progress*(1. / stick); 
    float waveOut =  -( u_progress - 1.) * (1./(1.-stick) );
    waveOut = pow(smoothstep(0.,1.,waveOut),0.7);

    float stickProgress = min(waveIn, waveOut);





    // We can re-use stick Influcse because this oen starts at the same position
    float offsetInProgress = clamp(waveIn,0.,1.);

    // Invert stickout to get the slope moving upwards to the right
    // and move it left by 1
    float offsetOutProgress = clamp(1.-waveOut,0.,1.);

    float offsetProgress = mix(offsetInProgress,offsetOutProgress,u_direction);


    float stickOffset = u_offset;
    pos.z += stickEffect * stickOffset * stickProgress  - u_offset * offsetProgress;

    
    pos.z += sin(distance * 8. - u_time * 2. )  * u_waveIntensity;

    gl_Position =   
        projectionMatrix * 
        modelViewMatrix * 
         vec4(pos, 1.0);

    vUv = uv;
}
`;




// const postvertex = document.querySelector('#post-vertex');
// const postfragment = document.querySelector('#post-fragment');

// const vertex = document.querySelector('#shader-vertex');
// const fragment = document.querySelector('#shader-fragment');





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



const TEXTURE = new THREE.TextureLoader().load('../img/ginger.jpg'); 
const geometry = new THREE.PlaneBufferGeometry();


// const material = new THREE.MeshBasicMaterial( { map: TEXTURE } );

const material = new THREE.ShaderMaterial({
  uniforms: {
    u_texture: { type: "t", value: TEXTURE },
    // u_textureFactor: { type: "f", value: this.factors[this.currentIndex] },
    // u_texture2: { type: "t", value: this.textures[this.nextIndex] },
    // u_texture2Factor: { type: "f", value: this.factors[this.nextIndex] },
    u_textureProgress: { type: "f", value: 0 },
    u_offset: { type: "f", value: 8 },
    u_progress: { type: "f", value: 0 },
    u_direction: { type: "f", value: 1 },
    u_effect: { type: "f", value: 0 },
    u_time: { type: "f", value: 0 },
    u_waveIntensity: { type: "f", value: 0 },
    u_resolution: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    },
    u_rgbPosition: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)
    },
    u_rgbVelocity: { type: "v2", value: new THREE.Vector2(0, 0) }
  },
  vertexShader: vertex,
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  // map: TEXTURE,
});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// set up post processing
let composer = new EffectComposer(renderer);
let renderPass = new RenderPass(scene, camera);
// rendering our scene with an image
composer.addPass(renderPass);

// our custom shader pass for the whole screen, to displace previous render
// let customPass = new ShaderPass({vertexShader,fragmentShader});
let customPass = new ShaderPass( fragment );
customPass.renderToScreen = true;
composer.addPass( customPass );


camera.position.z = 1;

function animate() {
  requestAnimationFrame( animate );

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  composer.render();
}
animate();











// getTwitchFollowers();

// function getTwitchFollowers() {


//   console.log('oppa');
// }



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
