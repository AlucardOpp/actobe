import AOS from '../../../node_modules/aos';

const enableAnimation = () => {
  AOS.init({
    duration: 700,
    once: true,
  });
};

export {enableAnimation};
