(function() {
  "use strict";

  window.App = {};

  App.html = document.querySelector('html');
  App.body = document.querySelector('body');
  // App.SMcontroller = new ScrollMagic.Controller();


  window.onload = function () {
    // customEasingsInit();

    document.fonts.ready.then(function () {
      initComponents();
      // initialReveal();
    });
  }

  function initComponents() {
    console.log('Init components');
  }
})();
