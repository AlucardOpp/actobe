import {tabletWidth} from './constants';
import {NavigationChanger} from './navigation-changer';

let observer;

const setSideNavWidth = () => {
  const sideNav = document.querySelector('.side-nav');
  if (sideNav) {
    let windowWidth = window.innerWidth;
    let staticSideNavWidth = getComputedStyle(sideNav, null).width;
    document.documentElement.style.setProperty('--static-sideNav-px', `${staticSideNavWidth}`);

    window.addEventListener('resize', () => {
      if (windowWidth !== document.documentElement.clientWidth) {
        windowWidth = window.innerWidth;
        staticSideNavWidth = getComputedStyle(sideNav, null).width;
        document.documentElement.style.setProperty('--static-sideNav-px', `${staticSideNavWidth}`);
      }
    });
  }
};

const setSideNavFixed = () => {
  let windowWidth = window.innerWidth;
  const innerPage = document.querySelector('.inner-page');
  const activeLink = document.querySelector('.side-nav__link--active');

  if (innerPage && (innerPage.querySelector('.side-nav__nav'))) {
    const innerPageWrapper = innerPage.querySelector('.inner-page__wrapper');
    const innerPageTitle = innerPage.querySelector('.inner-page__title');
    if (innerPage.querySelector('.side-nav__nav')) {
      const sideNav = innerPageWrapper.querySelector('.side-nav__nav');
      let innerPageWrapperInfo = innerPageWrapper.getBoundingClientRect();
      if (windowWidth > tabletWidth) {
        if (innerPageWrapperInfo.top <= 0 && !(sideNav.classList.contains('side-nav__nav--fixed'))) {
          sideNav.classList.add('side-nav__nav--fixed');
          activeLink.classList.remove('side-nav__link--active');
        } else if (innerPageWrapperInfo.top >= 0 && sideNav.classList.contains('side-nav__nav--fixed')) {
          sideNav.classList.remove('side-nav__nav--fixed');
        }
      }
      if (windowWidth < tabletWidth) {
        if (innerPageWrapperInfo.top <= (-20) && !(sideNav.classList.contains('side-nav__nav--fixed'))) {
          sideNav.classList.add('side-nav__nav--fixed');
          if (innerPageTitle) {
            innerPageTitle.classList.add('inner-page__title--fixed');
          }
        } else if (innerPageWrapperInfo.top >= (40) && sideNav.classList.contains('side-nav__nav--fixed')) {
          sideNav.classList.remove('side-nav__nav--fixed');
          if (innerPageTitle) {
            innerPageTitle.classList.remove('inner-page__title--fixed');
          }
        }
      }

      window.addEventListener('scroll', () => {
        innerPageWrapperInfo = innerPageWrapper.getBoundingClientRect();
        windowWidth = window.innerWidth;
        if (windowWidth > tabletWidth) {
          if (innerPageWrapperInfo.top <= 0 && !(sideNav.classList.contains('side-nav__nav--fixed'))) {
            activeLink.classList.remove('side-nav__link--active');
            sideNav.classList.add('side-nav__nav--fixed');
          } else if (innerPageWrapperInfo.top >= 0 && sideNav.classList.contains('side-nav__nav--fixed')) {
            sideNav.classList.remove('side-nav__nav--fixed');
            activeLink.classList.add('side-nav__link--active');
          }
        }
        if (windowWidth <= tabletWidth) {
          if (innerPageWrapperInfo.top <= (-20) && !(sideNav.classList.contains('side-nav__nav--fixed'))) {
            sideNav.classList.add('side-nav__nav--fixed');
            if (innerPageTitle) {
              innerPageTitle.classList.add('inner-page__title--fixed');
            }
          } else if (innerPageWrapperInfo.top >= (40) && sideNav.classList.contains('side-nav__nav--fixed')) {
            sideNav.classList.remove('side-nav__nav--fixed');
            if (innerPageTitle) {
              innerPageTitle.classList.remove('inner-page__title--fixed');
            }
          }
        }
      });
    }
  }
};

const hideSideNav = () => {
  const sideNav = document.querySelector('.side-nav');
  const footer = document.querySelector('.footer');
  if (sideNav) {
    const sideNavNavigation = sideNav.querySelector('.side-nav__nav');
    let sideNavNavigationCoordinates = sideNavNavigation.getBoundingClientRect();
    let blockBelow = document.elementFromPoint(0, sideNavNavigationCoordinates.bottom + 100);
    if ((blockBelow === footer || footer.contains(blockBelow)) && sideNavNavigation.classList.contains('side-nav__nav--fixed')) {
      sideNav.classList.add('side-nav--hide');
    } else if (blockBelow !== footer && sideNav.classList.contains('side-nav--hide')) {
      sideNav.classList.remove('side-nav--hide');
    }
    window.addEventListener('scroll', () => {
      sideNavNavigationCoordinates = sideNavNavigation.getBoundingClientRect();
      blockBelow = document.elementFromPoint(0, sideNavNavigationCoordinates.bottom + 1);
      if ((blockBelow === footer || footer.contains(blockBelow)) && sideNavNavigation.classList.contains('side-nav__nav--fixed')) {
        sideNav.classList.add('side-nav--hide');
      } else if (blockBelow !== footer && sideNav.classList.contains('side-nav--hide')) {
        sideNav.classList.remove('side-nav--hide');
      }
    });
  }
};

const buttonToggle = () => {
  const sideNav = document.querySelector('.side-nav');
  if (sideNav) {
    const sideNavButton = sideNav.querySelector('.side-nav__button');
    const sideNavList = sideNav.querySelector('.side-nav__list');
    const sideNaNav = sideNav.querySelector('.side-nav__nav');
    sideNavButton.addEventListener('click', () => {
      if (sideNavList.classList.contains('side-nav__list--show')) {
        sideNavList.classList.remove('side-nav__list--show');
        sideNaNav.classList.remove('is-active');
      } else {
        sideNavList.classList.add('side-nav__list--show');
        sideNaNav.classList.add('is-active');
      }
    });
    document.addEventListener('click', (evt) => {
      if (!(evt.target === sideNavButton)) {
        if (sideNavList.classList.contains('side-nav__list--show')) {
          sideNavList.classList.remove('side-nav__list--show');
          sideNaNav.classList.remove('is-active');
        }
      }
    });
  }
};

const sideNavHandling = () => {
  const sideNav = document.querySelector('.side-nav');
  if (sideNav) {
    const sideNavList = sideNav.querySelector('.side-nav__list');
    const sideNavLinks = sideNavList.querySelectorAll('.side-nav__link');
    const sideNavButton = sideNav.querySelector('.side-nav__button');
    let breakpointMb = window.matchMedia('(max-width: 767px)');
    const isSideNavLinkActive = () => {
      let sideNavActiveLink;
      sideNavLinks.forEach((link) => {
        if (link.classList.contains('is-active')) {
          sideNavActiveLink = link;
        }
        return sideNavActiveLink;
      });
      return sideNavActiveLink;
    };
    observer = new MutationObserver(() => {
      if (breakpointMb.matches) {
        if (isSideNavLinkActive()) {
          const sideNavActiveLink = isSideNavLinkActive();
          if (sideNavActiveLink.dataset.shortName) {
            sideNavButton.textContent = sideNavActiveLink.dataset.shortName;
          } else {
            sideNavButton.textContent = sideNavActiveLink.textContent;
          }
        }
      }
    });
    observer.observe(sideNavList, {attributes: true, subtree: true});
  }
};

const enableNavigation = () => {
  const sideNav = document.querySelector('.side-nav');
  if (sideNav) {
    const sideNavList = sideNav.querySelector('.side-nav__list');
    const navigationChanger = new NavigationChanger();
    navigationChanger.init(observer, sideNavList);
  }
};

export {setSideNavWidth, enableNavigation, setSideNavFixed, hideSideNav, buttonToggle, sideNavHandling};
