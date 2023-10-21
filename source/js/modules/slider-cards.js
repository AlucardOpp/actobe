/* globals Swiper */
const enableSliderCards = () => {
  const slider = new Swiper('.slider-cards', {
    a11y: {
      notificationClass: 'slider-cards__notification',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
      nextSlideMessage: 'Следующий слайд',
      prevSlideMessage: 'Предыдущий слайд',
    },
    loop: true,
    containerModifierClass: 'slider-cards--',
    slideClass: 'slider-cards__slide',
    slideActiveClass: 'slider-cards__slide--active',
    slideNextClass: 'slider-cards__slide--next',
    slidePrevClass: 'slider-cards__slide--prev',
    slideDuplicateActiveClass: 'slider-cards__slide--duplicate-active',
    slideDuplicateClass: 'slider-cards__slide--duplicate',
    slideDuplicatePrevClass: 'slider-cards__slide--duplicate-prev',
    slideDuplicateNextClass: 'slider-cards__slide--duplicate-next',
    wrapperClass: 'slider-cards__wrapper',
    grabCursor: true,
    navigation: {
      nextEl: '.slider-cards__button--next',
      prevEl: '.slider-cards__button--prev',
      disabledClass: 'slider-cards__button--disabled',
    },
    pagination: {
      el: '.slider-cards__pagination',
      clickable: true,
      bulletClass: 'pagination-slider__bullet',
      bulletActiveClass: 'pagination-slider__bullet--active',
      clickableClass: 'pagination-slider--clickable',
      modifierClass: 'pagination-slider--',
      bulletElement: 'button',
    },
    breakpoints: {
      1024: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      0: {
        spaceBetween: 20,
        slidesPerView: 1,
      },
    },
  });

  return slider;
};

const disableTabIndex = () => {
  const duplicateSlides = document.querySelectorAll('.slider-cards__slide--duplicate');
  if (duplicateSlides) {
    duplicateSlides.forEach((slide) => {
      if (slide.querySelector('.link')) {
        const duplicateLink = slide.querySelector('.link');
        duplicateLink.tabIndex = '-1';
      }
    });
  }
};

export {enableSliderCards, disableTabIndex};
