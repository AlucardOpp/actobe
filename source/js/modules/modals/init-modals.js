import {Modals} from './modals';
import {initZoom, restoreZoom} from './../zoom';

let modals;

let zoomContainer = document.querySelector('.modal__content');

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    startFocus: true,
    focusBack: true,
    eventTimeout: 400,
    openCallback: false,
    closeCallback: false,
  },
  'picture': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    startFocus: true,
    focusBack: true,
    eventTimeout: 400,
    openCallback: () => {
      initZoom(zoomContainer);
    },
    closeCallback: () => {
      restoreZoom();
    },
  },
};

const initModals = () => {
  const modalElements = document.querySelectorAll('.modal');
  if (modalElements.length) {
    modalElements.forEach((el) => {
      setTimeout(() => {
        el.classList.remove('modal--preload');
      }, 100);
    });
  }

  modals = new Modals(settings);
  window.modals = modals;
};

export {modals, initModals};
