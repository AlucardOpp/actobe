import {ScrollLock} from './../utils/scroll-lock';
import {FocusLock} from './../utils/focus-lock';
import {desktopWidth} from './constants';

const toggleMainMenu = () => {
  const header = document.querySelector('.header');
  let windowWidth = window.innerWidth;
  window.scrollLock = new ScrollLock();
  window.focusLock = new FocusLock();

  if (header) {
    const nav = header.querySelector('.nav');
    const showMenuText = header.querySelector('.nav__toggle').getAttribute('data-show-text');
    const hideMenuText = header.querySelector('.nav__toggle').getAttribute('data-hide-text');
    const dropdown = header.querySelector('.dropdown');
    const dropdownList = dropdown.querySelector('.dropdown__list');
    const firstElementDropdownList = dropdownList.firstElementChild;
    const lastElementDropdownList = dropdownList.lastElementChild;
    const popupItems = header.querySelectorAll('.nav__item--popup');

    const onDocumentClick = (evt) => {
      if (windowWidth < desktopWidth) {
        const menuToggle = evt.target.closest('.nav__toggle');
        if (menuToggle) {
          menuToggle.classList.toggle('nav__toggle--opened');
          header.classList.toggle('header--opened');
          nav.classList.toggle('nav--show');
          if (menuToggle.classList.contains('nav__toggle--opened')) {
            window.scrollLock.disableScrolling();
            window.focusLock.lock('.header');
            menuToggle.blur();
            menuToggle.setAttribute('aria-label', hideMenuText);
            menuToggle.setAttribute('aria-pressed', 'true');
          } else {
            window.scrollLock.enableScrolling();
            window.focusLock.unlock();
            menuToggle.setAttribute('aria-label', showMenuText);
            menuToggle.setAttribute('aria-pressed', 'false');
          }
        }
        const itemPopupTarget = evt.target.closest('.nav__item--popup');
        const dropdownTarget = evt.target.closest('.dropdown');
        if (itemPopupTarget) {
          const isItemShowed = itemPopupTarget.classList.contains('nav__item--show');
          const popup = itemPopupTarget.querySelector('.nav__popup');
          if (!isItemShowed) {
            popup.classList.add('nav__popup--show');
            itemPopupTarget.classList.add('nav__item--show');
            if (nav.querySelectorAll('.nav__item--show').length > 1) {
              const itemsShowed = nav.querySelectorAll('.nav__item--show');
              for (let i = 0; i < itemsShowed.length; i++) {
                itemsShowed[i].classList.remove('nav__item--show');
                const itemPopup = itemsShowed[i].querySelector('.nav__popup--show');
                itemPopup.classList.remove('nav__popup--show');
              }
              popup.classList.add('nav__popup--show');
              itemPopupTarget.classList.add('nav__item--show');
            }
          } else {
            popup.classList.remove('nav__popup--show');
            itemPopupTarget.classList.remove('nav__item--show');
          }
        } else {
          const itemShowed = nav.querySelector('.nav__item--show');
          if (itemShowed) {
            const popup = nav.querySelector('.nav__popup--show');
            const itemPopup = nav.querySelector('.nav__item--show');
            popup.classList.remove('nav__popup--show');
            itemPopup.classList.remove('nav__item--show');
          }
        }
        if (dropdownTarget) {
          const isDropdownShowed = dropdownTarget.classList.contains('dropdown--show');
          if (!isDropdownShowed) {
            dropdown.classList.add('dropdown--show');
          } else {
            dropdown.classList.remove('dropdown--show');
          }
        } else {
          const dropdownShowed = header.querySelector('.dropdown--show');
          if (dropdownShowed) {
            dropdown.classList.remove('dropdown--show');
          }
        }
      }
    };

    const onPopupItemKeydown = (evt) => {
      const popupItem = evt.target.closest('.nav__item--popup');
      const popupList = popupItem.querySelector('.nav__popup-list');
      const firstElementPopupList = popupList.firstElementChild;
      const lastElementPopupList = popupList.lastElementChild;
      if (popupItem) {
        const popup = popupItem.querySelector('.nav__popup');

        if (evt.key === ' ' || evt.key === 'Enter') {
          evt.preventDefault();
          if (!popupItem.classList.contains('nav__item--show')) {
            popupItem.classList.add('nav__item--show');
            popup.classList.add('nav__popup--show');

            if (nav.querySelectorAll('.nav__item--show').length > 1) {
              const itemsShowed = nav.querySelectorAll('.nav__item--show');
              for (let i = 0; i < itemsShowed.length; i++) {
                itemsShowed[i].classList.remove('nav__item--show');
                const itemPopup = itemsShowed[i].querySelector('.nav__popup--show');
                itemPopup.classList.remove('nav__popup--show');
              }
              popup.classList.add('nav__popup--show');
              popupItem.classList.add('nav__item--show');
            }
          } else {
            popupItem.classList.remove('nav__item--show');
            popup.classList.remove('nav__popup--show');
          }
        }

        if ((evt.key === 'Tab' && !(evt.shiftKey)) && (evt.target.parentElement === lastElementPopupList)) {
          const itemsShowed = nav.querySelectorAll('.nav__item--show');
          for (let i = 0; i < itemsShowed.length; i++) {
            itemsShowed[i].classList.remove('nav__item--show');
            const itemPopup = itemsShowed[i].querySelector('.nav__popup--show');
            itemPopup.classList.remove('nav__popup--show');
          }
        } else if ((evt.key === 'Tab' && evt.shiftKey) && ((evt.target.parentElement === firstElementPopupList) || ((evt.target.classList.contains('nav__link')) && popupItem.classList.contains('nav__item--show')))) {
          const itemsShowed = nav.querySelectorAll('.nav__item--show');
          for (let i = 0; i < itemsShowed.length; i++) {
            itemsShowed[i].classList.remove('nav__item--show');
            const itemPopup = itemsShowed[i].querySelector('.nav__popup--show');
            itemPopup.classList.remove('nav__popup--show');
          }
        }
      }
    };

    const onDropdownKeydown = (evt) => {
      const isDropdownShowed = dropdown.classList.contains('dropdown--show');
      if (evt.key === ' ' || evt.key === 'Enter') {
        evt.preventDefault();
        if (!isDropdownShowed) {
          dropdown.classList.add('dropdown--show');
        } else {
          dropdown.classList.remove('dropdown--show');
        }
      }

      if ((evt.key === 'Tab' && !(evt.shiftKey)) && (evt.target.parentElement === lastElementDropdownList)) {
        dropdown.classList.remove('dropdown--show');
      } else if ((evt.key === 'Tab' && evt.shiftKey) && ((evt.target.parentElement === firstElementDropdownList) || (evt.target.classList.contains('dropdown')))) {
        dropdown.classList.remove('dropdown--show');
      }
    };

    document.addEventListener('click', onDocumentClick);
    popupItems.forEach((popupItem) => {
      popupItem.addEventListener('keydown', onPopupItemKeydown);
    });

    dropdown.addEventListener('keydown', onDropdownKeydown);

    window.addEventListener('resize', () => {
      windowWidth = window.innerWidth;
      document.addEventListener('click', onDocumentClick);
    });
  }
};

export {toggleMainMenu};
