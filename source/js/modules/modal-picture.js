function modalPicture() {
  const modal = document.querySelector('.modal--picture');

  if (!modal) {
    return;
  }

  const modalWrapper = modal.querySelector('.modal__wrapper');
  const modalContent = modal.querySelector('.modal__content');
  const modalImgWrapper = modal.querySelector('.modal__img-wrapper');
  const modalImgContainer = modal.querySelector('.modal__img-container');
  const modalImg = modal.querySelector('.modal img');

  const showBigPicture = (img) => {
    const maxImgHeight = window.innerHeight - 2 * (parseInt(getComputedStyle(modalWrapper).paddingTop, 10) + parseInt(getComputedStyle(modalContent).paddingTop, 10));

    modalImg.src = img.currentSrc;
    modalImg.alt = img.alt;

    modalImgWrapper.style = '';
    modalImgContainer.style = '';

    modalImgContainer.style.paddingBottom = `${ img.height / img.width * 100 }%`;

    if (modalImgContainer.offsetHeight > maxImgHeight) {
      modalImgWrapper.style.width = `${ maxImgHeight / modalImgContainer.offsetHeight * 100 }%`;
    }
  };

  document.addEventListener('click', (evt) => {
    const image = evt.target.closest('[data-open-modal="picture"] img');

    if (image) {
      showBigPicture(image);
    }
  });
}

export {modalPicture};
