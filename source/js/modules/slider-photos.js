/* globals Swiper */
const enablesliderPhotos = () => {
  let slider;
  const sliderContainer = document.querySelector('.slider-photos');

  if (sliderContainer) {
    const sliderSlides = sliderContainer.querySelectorAll('.slider-photos__slide');
    let options;

    if (sliderSlides.length === 1) {
      options = {
        a11y: {
          notificationClass: 'slider-photos__notification',
          paginationBulletMessage: 'Перейти к слайду {{index}}',
          nextSlideMessage: 'Следующий слайд',
          prevSlideMessage: 'Предыдущий слайд',
        },
        loop: false,
        watchOverflow: true,
        containerModifierClass: 'slider-photos--',
        slideClass: 'slider-photos__slide',
        slideActiveClass: 'slider-photos__slide--active',
        slideNextClass: 'slider-photos__slide--next',
        slidePrevClass: 'slider-photos__slide--prev',
        wrapperClass: 'slider-photos__wrapper',
        grabCursor: true,
        navigation: {
          nextEl: '.slider-photos__button--next',
          prevEl: '.slider-photos__button--prev',
          disabledClass: 'slider-photos__button--disabled',
        },
        breakpoints: {
          1024: {
            spaceBetween: 30,
            slidesPerView: 1,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 1,
          },
          0: {
            spaceBetween: 20,
            slidesPerView: 1,
          },
        },
      };
    } else {
      options = {
        a11y: {
          notificationClass: 'slider-photos__notification',
          paginationBulletMessage: 'Перейти к слайду {{index}}',
          nextSlideMessage: 'Следующий слайд',
          prevSlideMessage: 'Предыдущий слайд',
        },
        loop: true,
        containerModifierClass: 'slider-photos--',
        slideClass: 'slider-photos__slide',
        slideActiveClass: 'slider-photos__slide--active',
        slideNextClass: 'slider-photos__slide--next',
        slidePrevClass: 'slider-photos__slide--prev',
        wrapperClass: 'slider-photos__wrapper',
        grabCursor: true,
        navigation: {
          nextEl: '.slider-photos__button--next',
          prevEl: '.slider-photos__button--prev',
          disabledClass: 'slider-photos__button--disabled',
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            spaceBetween: 30,
            slidesPerView: 1,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 1,
          },
          0: {
            spaceBetween: 20,
            slidesPerView: 1,
          },
        },
      };
    }

    slider = new Swiper('.slider-photos', options);
  }
  return slider;
};

export {
  enablesliderPhotos
};
