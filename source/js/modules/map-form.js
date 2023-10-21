import PerfectScrollbar from 'perfect-scrollbar';

const mapForm = document.querySelector('.map-form');
const setToggles = () => {
  if (mapForm) {
    const toggleBase = mapForm.querySelector('.map-form__toggle--base');
    const toggleObjects = mapForm.querySelector('.map-form__toggle--objects');
    const accordionsBase = mapForm.querySelector('.map-accordion--base');
    const accordionsObjects = mapForm.querySelector('.map-accordion--objects');

    const onToggleBaseClick = () => {
      if (!toggleBase.classList.contains('map-form__toggle--active')) {
        accordionsBase.classList.add('map-accordion--active');
        toggleBase.classList.add('map-form__toggle--active');
        accordionsObjects.classList.remove('map-accordion--active');
        toggleObjects.classList.remove('map-form__toggle--active');
      }
    };

    const onToggleObjectsClick = () => {
      if (!toggleObjects.classList.contains('map-form__toggle--active')) {
        accordionsObjects.classList.add('map-accordion--active');
        toggleObjects.classList.add('map-form__toggle--active');
        accordionsBase.classList.remove('map-accordion--active');
        toggleBase.classList.remove('map-form__toggle--active');
      }
    };

    toggleBase.addEventListener('click', onToggleBaseClick);
    toggleObjects.addEventListener('click', onToggleObjectsClick);
  }
};

const setCheckboxes = () => {
  const mapAccordion = document.querySelector('.map-form__filters');
  if (mapAccordion) {
    const allCheckboxButtons = mapAccordion.querySelectorAll('.map-accordion__checkbox-label--all');
    const inputs = mapAccordion.querySelectorAll('input');
    inputs.forEach((input) => {
      input.checked = true;
    });
    const onAllCheckboxClick = (evt) => {
      const checkboxesList = evt.target.closest('.map-accordion__checkboxes');
      const allInputs = checkboxesList.querySelectorAll('input');
      const allCheckboxInput = checkboxesList.querySelector('.map-accordion__checkbox-input--all');
      if (allCheckboxInput.checked === false) {
        allInputs.forEach((input) => {
          input.checked = true;
        });
        allCheckboxInput.checked = false;
      } else {
        allInputs.forEach((input) => {
          input.checked = false;
        });
        allCheckboxInput.checked = true;
      }
    };

    allCheckboxButtons.forEach((button) => {
      button.addEventListener('click', onAllCheckboxClick);
    });
  }
};

const setScrollbar = () => {
  if (mapForm) {
    const checkboxesLists = mapForm.querySelectorAll('.map-accordion__checkboxes');
    checkboxesLists.forEach((list) => {
      const perfectScroll = new PerfectScrollbar(list);
      perfectScroll.update();
    });
  }
};

const toggleFilters = () => {
  if (mapForm) {
    const hideButton = mapForm.querySelector('.map-form__hide');
    const openButton = mapForm.querySelector('.map-form__open');

    hideButton.addEventListener('click', () => {
      mapForm.classList.add('map-form--hide');
      hideButton.classList.add('map-form__hide--hide');
    });

    openButton.addEventListener('click', () => {
      if (mapForm.classList.contains('map-form--hide')) {
        mapForm.classList.remove('map-form--hide');
        hideButton.classList.remove('map-form__hide--hide');
      } else {
        mapForm.classList.add('map-form--hide');
        hideButton.classList.add('map-form__hide--hide');
      }
    });
  }
};

const closePopup = () => {
  if (mapForm) {
    document.addEventListener('click', (evt) => {
      const closePopupButton = evt.target.closest('.map-balloon__close');
      if (closePopupButton) {
        const popup = closePopupButton.closest('.map-balloon--show');
        popup.classList.remove('map-balloon--show');
      }
    });
  }
};

const applyForm = () => {
  if (mapForm) {
    const applyFormButton = mapForm.querySelector('.map-form__apply');
    const hideButton = mapForm.querySelector('.map-form__hide');
    if (applyFormButton) {
      applyFormButton.addEventListener('click', () => {

        // код применения всех фильтров

        mapForm.classList.add('map-form--hide');
        hideButton.classList.add('map-form__hide--hide');
      });
    }
  }
};

export {setCheckboxes, setToggles, setScrollbar, toggleFilters, closePopup, applyForm};
