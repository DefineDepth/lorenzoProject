"use strict";

import getViewportWidth from './helpers/getViewportWidth';

import Feather from "feather-icons";
import barba from '@barba/core';
import { gsap } from "gsap";
import Swiper from 'swiper/bundle';
import LocomotiveScroll from 'locomotive-scroll';
// import {Curtains, Plane} from 'curtainsjs';
import {Curtains, Plane, Vec2, Vec3, PingPongPlane, ShaderPass, FXAAPass} from 'curtainsjs';
import * as PIXI from 'pixi.js'


window.APP = {};

APP.html = document.querySelector('html');
APP.body = document.querySelector('body');
// APP.scroll = scroll(document.querySelector('[data-scroll-container]'));

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











// var app = new PIXI.Application(window.innerWidth, window.innerHeight);
// document.body.appendChild(app.view);
// app.stage.interactive = true;
// var posX, displacementSprite, displacementFilter, bg, vx;
// var container = new PIXI.Container();
// app.stage.addChild(container);
// app.loader.add("../img/ripple.png").add("img/ginger.jpg").load(setup);

// function setup() {
//   posX = app.renderer.width / 2;
//   displacementSprite = new PIXI.Sprite.from('../img/ripple.png');
//   displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
//   displacementSprite.anchor.set(0.5);
//   displacementSprite.x = app.renderer.width / 2;
//   displacementSprite.y = app.renderer.height / 2;

//   vx = displacementSprite.x;
//   app.stage.addChild(displacementSprite);
//   container.filters = [displacementFilter];
//   displacementFilter.scale.x = 0;
//   displacementFilter.scale.y = 0;

//   bg = new PIXI.Sprite.from('img/ginger.jpg');
//   bg.width = app.renderer.width;
//   bg.height = app.renderer.height;
//   container.addChild(bg);

//   app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
//   loop();
// }

// function onPointerMove(eventData) {
//   posX = eventData.data.global.x;
// }

// function loop() {
//   requestAnimationFrame(loop);
//   vx += (posX - displacementSprite.x) * 0.045;
//   displacementSprite.x = vx;
//   var disp = Math.floor(posX - displacementSprite.x);
//   if (disp < 0) disp = -disp;
//   var fs = map(disp, 0, 500, 0, 120);
//   disp = map(disp, 0, 500, 0.1, 0.6);
//   displacementSprite.scale.x = disp;
//   displacementFilter.scale.x = fs;
// }
// let map = function(n, start1, stop1, start2, stop2) {
//   var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
//   return newval;
// };



















window.addEventListener("load", function() {

  function lerp (start, end, amt){
    return (1 - amt) * start + amt * end;
  }

  // set up our WebGL context and append the canvas to our wrapper
  var webGLCurtain = new Curtains({
    container: "canvas"
  });

  webGLCurtain.onRender(function() {
    // update our planes deformation
    // increase/decrease the effect
    planesDeformations = lerp(planesDeformations, 0, 0.075);
    scrollEffect = lerp(scrollEffect, 0, 0.075);

  }).onScroll(function() {
    // get scroll deltas to apply the effect on scroll
    var delta = webGLCurtain.getScrollDeltas();

    // invert value for the effect
    delta.y = -delta.y;

    // threshold
    if(delta.y > 60) {
      delta.y = 60;
    }
    else if(delta.y < -60) {
      delta.y = -60;
    }

    if(Math.abs(delta.y) > Math.abs(planesDeformations)) {
      planesDeformations = lerp(planesDeformations, delta.y, 0.5);
    }
  
    if(Math.abs(delta.y) > Math.abs(scrollEffect)) {
      scrollEffect = lerp(scrollEffect, delta.y, 0.5);
    }
  }).onError(function() {
    // we will add a class to the document body to display original images
    document.body.classList.add("no-curtains", "planes-loaded");
  }).onContextLost(function() {
    // on context lost, try to restore the context
    webGLCurtain.restoreContext();
  });

  // we will keep track of all our planes in an array
  var planes = [];
  var planesDeformations = 0
  var scrollEffect = 0;

  // get our planes elements
  var planeElements = document.getElementsByClassName("plane");

  var vs = `
    precision mediump float;

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 planeTextureMatrix;

    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform float uPlaneDeformation;

    void main() {
      vec3 vertexPosition = aVertexPosition;

      // cool effect on scroll
      vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 250.0));

      gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

      // varyings
      vVertexPosition = vertexPosition;
      vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    }
  `;

  var fs = `
    precision mediump float;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D planeTexture;

    void main() {
      // just display our texture
      gl_FragColor = texture2D(planeTexture, vTextureCoord);
    }
  `;

  // all planes will have the same parameters
  var params = {
    vertexShader: vs,
    fragmentShader: fs,
    shareProgram: true, // share planes program to improve plane creation speed
    widthSegments: 10,
    heightSegments: 10,
    drawCheckMargins: {
      top: 100,
      right: 0,
      bottom: 100,
      left: 0,
    },
    uniforms: {
      planeDeformation: {
        name: "uPlaneDeformation",
        type: "1f",
        value: 0,
      },
    }
  };

  // add our planes and handle them
  for (var i = 0; i < planeElements.length; i++) {
    planes.push(webGLCurtain.addPlane(planeElements[i], params));

    handlePlanes(i);
  }

  // handle all the planes
  function handlePlanes(index) {
    var plane = planes[index];

    // check if our plane is defined and use it
    plane && plane.onLoading(function() {
      //console.log(plane.loadingManager.sourcesLoaded);
    }).onReady(function() {
      plane.setRenderTarget(rgbTarget);

      // once everything is ready, display everything
      if(index === planes.length - 1) {
        document.body.classList.add("planes-loaded");
      }
    }).onRender(function() {
      // update the uniform
      plane.uniforms.planeDeformation.value = planesDeformations;
    
      //plane.setScale(1, 1 + Math.abs(scrollEffect) / 500);
      plane.textures[0].setScale(1 + Math.abs(scrollEffect) / 500);
    });
  }

  var rgbFs = `
    precision mediump float;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D uRenderTexture;

    uniform float uScrollEffect;

    void main() {
      vec2 textureCoords = vTextureCoord;

      vec2 redTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 500.0);
      vec2 greenTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 1000.0);
      vec2 blueTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 1500.0);

      vec4 red = texture2D(uRenderTexture, redTextCoords);
      vec4 green = texture2D(uRenderTexture, greenTextCoords);
      vec4 blue = texture2D(uRenderTexture, blueTextCoords);

      vec4 finalColor = vec4(red.r, green.g, blue.b, min(1.0, red.a + blue.a + green.a));
      gl_FragColor = finalColor;
    }
  `;

  var rgbTarget = webGLCurtain.addRenderTarget();


  var rgbPass = webGLCurtain.addShaderPass({
    fragmentShader: rgbFs,
    renderTarget: rgbTarget,
    depthTest: false, // we need to disable the depth test to display that shader pass on top of the first one
    uniforms: {
      scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0,
      },
    },
  });

  if ( rgbPass ) {
    rgbPass.onRender(function() {
      // update the uniform
      rgbPass.uniforms.scrollEffect.value = scrollEffect;
    });
  }

});





























// const vs = `
//   precision mediump float;
//   // those are the mandatory attributes that the lib sets
//   attribute vec3 aVertexPosition;
//   attribute vec2 aTextureCoord;
//   // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
//   uniform mat4 uMVMatrix;
//   uniform mat4 uPMatrix;
//   // our texture matrix that will handle image cover
//   uniform mat4 uTextureMatrix0;
//   // pass your vertex and texture coords to the fragment shader
//   varying vec3 vVertexPosition;
//   varying vec2 vTextureCoord;
//   void main() {
//     vec3 vertexPosition = aVertexPosition;
//     gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
//     // set the varyings
//     // here we use our texture matrix to calculate the accurate texture coords
//     vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
//     vVertexPosition = vertexPosition;
//   }
// `;

// const fs = `
//   precision mediump float;
//   // get our varyings
//   varying vec3 vVertexPosition;
//   varying vec2 vTextureCoord;
//   // the uniform we declared inside our javascript
//   uniform float uTime;
//   // our texture sampler (default name, to use a different name please refer to the documentation)
//   uniform sampler2D uSampler0;
//   void main() {
//     // get our texture coords from our varying
//     vec2 textureCoord = vTextureCoord;
//     // displace our pixels along the X axis based on our time uniform
//     // textures coords are ranging from 0.0 to 1.0 on both axis
//     textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;
//     // map our texture with the texture matrix coords
//     gl_FragColor = texture2D(uSampler0, textureCoord);
//   }
// `;










// wait for everything to be ready
// window.addEventListener("load", () => {
//   // set up our WebGL context and append the canvas to our wrapper
//   const curtains = new Curtains({
//     container: "canvas",
//     pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
//     autoRender: false, // use gsap ticker to render our scene
//   });

//   gsap.ticker.add(curtains.render.bind(curtains));

//   // get our plane element
//   const planeElement = document.getElementsByClassName("plane")[0];

//   // set our initial parameters (basic uniforms)
//   const params = {
//     vertexShader: vs,
//     fragmentShader: fs,
//     uniforms: {
//       time: {
//         name: "uTime", // uniform name that will be passed to our shaders
//         type: "1f", // this means our uniform is a float
//         value: 0,
//       },
//     },
//   };

//   // create our plane using our curtains object, the HTML element and the parameters
//   const plane = new Plane(curtains, planeElement, params);

//   plane.onRender(() => {
//     // use the onRender method of our plane fired at each requestAnimationFrame call
//     plane.uniforms.time.value++; // update our time uniform value
//   });
// });

