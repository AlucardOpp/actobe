const modalPicture = document.querySelector('.modal--picture');

const MAX_ZOOM_LEVEL = 3;
let zoomLevel = 1;
let zoomContainer = null;
let zoomItem = null;

const handleDragY = (initialCoord, shift, maxOffset) => {
  if ((shift > 0 && zoomItem.getBoundingClientRect().top >= zoomContainer.getBoundingClientRect().top + maxOffset) || (shift < 0 && zoomItem.getBoundingClientRect().bottom <= zoomContainer.getBoundingClientRect().bottom - maxOffset)) {
    return;
  }
  zoomItem.style.top = `${initialCoord + shift}px`;
};
const handleDragX = (initialCoord, shift, maxOffset) => {
  if ((shift < 0 && zoomItem.getBoundingClientRect().right <= zoomContainer.getBoundingClientRect().right - maxOffset) || (shift > 0 && zoomItem.getBoundingClientRect().left >= zoomContainer.getBoundingClientRect().left + maxOffset)) {
    return;
  }
  zoomItem.style.left = `${initialCoord + shift}px`;
};
const toggleZoom = () => {
  zoomItem.style.transform = `scale(${zoomLevel})`;
  if (zoomLevel === 1) {
    zoomItem.style.top = '';
    zoomItem.style.left = '';
  }
  zoomItem.classList.toggle('scaled', zoomLevel > 1);
};

const onZoomItemMouseDown = (downEvt) => {
  downEvt.preventDefault();
  if (zoomLevel === 1) {
    return;
  }
  const initialY = zoomItem.offsetTop;
  const initialX = zoomItem.offsetLeft;
  const maxOffsetY = 0.05 * window.innerHeight;
  const maxOffsetX = 0.05 * window.innerWidth;
  const onZoomItemMouseMove = (moveEvt) => {
    const newShiftY = Math.round((moveEvt.clientY - downEvt.clientY));
    const newShiftX = Math.round((moveEvt.clientX - downEvt.clientX));
    moveEvt.preventDefault();
    handleDragY(initialY, newShiftY, maxOffsetY);
    handleDragX(initialX, newShiftX, maxOffsetX);
  };
  const onZoomItemMouseUp = () => {
    zoomItem.removeEventListener('mousemove', onZoomItemMouseMove);
    zoomItem.removeEventListener('mouseup', onZoomItemMouseUp);
  };
  zoomItem.addEventListener('mousemove', onZoomItemMouseMove);
  zoomItem.addEventListener('mouseup', onZoomItemMouseUp);
};
const getTouchesDistance = (evt) => Math.hypot(evt.touches[0].pageX - evt.touches[1].pageX, evt.touches[0].pageY - evt.touches[1].pageY);
const onZoomItemTouchStart = (startEvt) => {
  const MIN_PINCH_DELTA = 50;
  let initialY = 0;
  let initialX = 0;
  let maxOffsetY = 0;
  let maxOffsetX = 0;
  let startTouchesDistance = 0;
  let moveTouchesDistance = 0;
  let isMultitouch = false;
  startEvt.preventDefault();
  if (startEvt.touches.length > 1) {
    startTouchesDistance = getTouchesDistance(startEvt);
  }
  if (zoomLevel > 1) {
    initialY = zoomItem.offsetTop;
    initialX = zoomItem.offsetLeft;
    maxOffsetY = 0.05 * window.innerHeight;
    maxOffsetX = 0.05 * window.innerWidth;
  }
  const onZoomItemTouchMove = (moveEvt) => {
    moveEvt.preventDefault();
    if (moveEvt.touches.length > 1) {
      isMultitouch = true;
      moveTouchesDistance = getTouchesDistance(moveEvt);
    }
    if (!isMultitouch && zoomLevel > 1) {
      const newShiftY = Math.round((moveEvt.touches[0].clientY - startEvt.touches[0].clientY));
      const newShiftX = Math.round((moveEvt.touches[0].clientX - startEvt.touches[0].clientX));
      handleDragY(initialY, newShiftY, maxOffsetY);
      handleDragX(initialX, newShiftX, maxOffsetX);
    }
  };
  const onZoomItemTouchEnd = () => {
    if (startTouchesDistance && moveTouchesDistance && Math.abs(moveTouchesDistance - startTouchesDistance) > MIN_PINCH_DELTA) {
      if (moveTouchesDistance > startTouchesDistance) {
        zoomLevel = zoomLevel < MAX_ZOOM_LEVEL ? zoomLevel + 1 : zoomLevel;
      } else {
        zoomLevel = zoomLevel > 1 ? zoomLevel - 1 : zoomLevel;
      }
      toggleZoom();
    }
    zoomItem.removeEventListener('touchmove', onZoomItemTouchMove);
    zoomItem.removeEventListener('touchend', onZoomItemTouchEnd);
  };
  zoomItem.addEventListener('touchmove', onZoomItemTouchMove);
  zoomItem.addEventListener('touchend', onZoomItemTouchEnd);
};

const initZoom = (container) => {
  if (!modalPicture) {
    return;
  }
  zoomContainer = container;

  zoomItem = zoomContainer.querySelector('.zoom__item');
  zoomContainer.classList.add('init');
  zoomItem.addEventListener('mousedown', onZoomItemMouseDown);
  zoomItem.addEventListener('touchstart', onZoomItemTouchStart);
};

const restoreZoom = () => {
  if (!modalPicture) {
    return;
  }
  zoomItem.classList.remove('scaled');
  zoomItem.style.top = '';
  zoomItem.style.left = '';
  zoomItem.style.transform = '';
  zoomContainer.classList.remove('init');
  zoomItem.removeEventListener('mousedown', onZoomItemMouseDown);
  zoomItem.removeEventListener('touchstart', onZoomItemTouchStart);
  zoomLevel = 1;
  zoomContainer = null;
  zoomItem = null;
};

export {initZoom, restoreZoom};
