/*--------------------------------------------------
  15. Video
---------------------------------------------------*/

function videoBtn() {

  const button = document.querySelector('.js-video-button');

  if (!button) return;

  const videoWrap = document.querySelector('.js-video-wrap');

  button.addEventListener('click', () => {
    if (App.config.cursorFollower.enabled) {
      Cursor.hide();
    }
    
    if (App.config.headroom.enabled) {
      App.headroom.unpin();
    }

    videoWrap.classList.add('is-visible');
    document.documentElement.classList.add('overflow-hidden');
  });

  videoWrap.addEventListener('click', () => {
    if (App.config.cursorFollower.enabled) {
      Cursor.show();
    }

    if (App.config.headroom.enabled) {
      App.headroom.pin();
    }

    videoWrap.classList.remove('is-visible');
    document.documentElement.classList.remove('overflow-hidden');
  });

}
