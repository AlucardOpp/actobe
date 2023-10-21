const header = document.querySelector('.header');

const setWindowHeight = () => {
  if (!header) {
    return;
  }

  let windowHeight = window.innerHeight;
  let staticVh = windowHeight * 0.01;
  let staticPaddingVh = windowHeight * 0.23;
  let staticHeaderHeight = getComputedStyle(header, null).height;
  let windowWidth = window.innerWidth;
  let staticVw = windowWidth * 0.01;
  document.documentElement.style.setProperty('--static-vh', `${staticVh}px`);
  document.documentElement.style.setProperty('--static-padding-vh', `${staticPaddingVh}px`);
  document.documentElement.style.setProperty('--static-header-px', `${staticHeaderHeight}`);
  document.documentElement.style.setProperty('--static-vw', `${staticVw}px`);

  window.addEventListener('resize', () => {
    windowHeight = window.innerHeight;

    if (windowWidth !== document.documentElement.clientWidth) {
      windowWidth = window.innerWidth;
      staticVh = windowHeight * 0.01;
      staticPaddingVh = windowHeight * 0.285;
      staticVw = windowWidth * 0.01;
      staticHeaderHeight = getComputedStyle(header, null).height;
      document.documentElement.style.setProperty('--static-vh', `${staticVh}px`);
      document.documentElement.style.setProperty('--static-padding-vh', `${staticPaddingVh}px`);
      document.documentElement.style.setProperty('--static-header-px', `${staticHeaderHeight}`);
      document.documentElement.style.setProperty('--static-vw', `${staticVw}px`);
    }
  });
};

export {setWindowHeight};
