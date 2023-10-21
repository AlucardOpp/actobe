/* globals Swiper */
const enableSliderBackground = () => {
  const slider = new Swiper('.slider-background', {
    a11y: {
      notificationClass: 'slider-background__notification',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
      nextSlideMessage: 'Следующий слайд',
      prevSlideMessage: 'Предыдущий слайд',
    },
    containerModifierClass: 'slider-background--',
    slideClass: 'slider-background__slide',
    slideActiveClass: 'slider-background__slide--active',
    slideNextClass: 'slider-background__slide--next',
    slidePrevClass: 'slider-background__slide--prev',
    wrapperClass: 'slider-background__wrapper',
    slideDuplicateActiveClass: 'slider-background__slide--duplicate-active',
    slideDuplicateClass: 'slider-background__slide--duplicate',
    slideDuplicatePrevClass: 'slider-background__slide--duplicate-prev',
    slideDuplicateNextClass: 'slider-background__slide--duplicate-next',
    loop: true,
    pagination: {
      el: '.slider-background__pagination',
      clickable: true,
      bulletClass: 'pagination-slider__bullet',
      bulletActiveClass: 'pagination-slider__bullet--active',
      clickableClass: 'pagination-slider--clickable',
      modifierClass: 'pagination-slider--',
      bulletElement: 'button',
    },
    navigation: {
      nextEl: '.slider-background__button--next',
      prevEl: '.slider-background__button--prev',
      disabledClass: 'slider-background__button--disabled',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  return slider;
};

export {
  enableSliderBackground
};
