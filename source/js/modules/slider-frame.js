/* globals Swiper */
const enableSliderFrame = () => {
  const slider = new Swiper('.slider-frame', {
    a11y: {
      notificationClass: 'slider-frame__notification',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
      nextSlideMessage: 'Следующий слайд',
      prevSlideMessage: 'Предыдущий слайд',
    },
    loop: true,
    containerModifierClass: 'slider-frame--',
    slideClass: 'slider-frame__slide',
    slideActiveClass: 'slider-frame__slide--active',
    slideNextClass: 'slider-frame__slide--next',
    slidePrevClass: 'slider-frame__slide--prev',
    slideDuplicateActiveClass: 'slider-frame__slide--duplicate-active',
    slideDuplicateClass: 'slider-frame__slide--duplicate',
    slideDuplicatePrevClass: 'slider-frame__slide--duplicate-prev',
    slideDuplicateNextClass: 'slider-frame__slide--duplicate-next',
    wrapperClass: 'slider-frame__wrapper',
    spaceBetween: 20,
    pagination: {
      el: '.slider-frame__pagination',
      clickable: true,
      bulletClass: 'pagination-slider__bullet',
      bulletActiveClass: 'pagination-slider__bullet--active',
      clickableClass: 'pagination-slider--clickable',
      modifierClass: 'pagination-slider--',
      bulletElement: 'button',
    },
    grabCursor: true,
    navigation: {
      nextEl: '.slider-frame__button--next',
      prevEl: '.slider-frame__button--prev',
      disabledClass: 'slider-frame__button--disabled',
    },
  });

  return slider;
};

export {
  enableSliderFrame
};
