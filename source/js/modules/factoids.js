const enableFactoidsAnimation = () => {
  const factoids = document.querySelector('.factoids');
  if (factoids) {
    const factoidsNumbers = factoids.querySelectorAll('.factoids__number');

    const animate = (obj, initVal, lastVal, duration) => {
      let startTime = null;
      const step = (currentTime) => {
        currentTime = Date.now();
        if (!startTime) {
          startTime = currentTime;
        }
        const progress = Math.min((currentTime - startTime) / duration, 1);
        if (!Number.isInteger(lastVal)) {
          obj.textContent = Number(progress * (lastVal - initVal) + initVal).toFixed(1);
        } else {
          const number = String(Math.floor(progress * (lastVal - initVal) + initVal));
          const numberLength = number.length;
          let newNumber = '';
          for (let i = 0; i <= numberLength - 1; i++) {
            newNumber += Number(number[numberLength - 1 - i]);
            if ((i + 1) % 3 === 0) {
              newNumber += ' ';
            }
          }
          obj.textContent = newNumber.split('').reverse().join('');
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    for (let i = 0; i < factoidsNumbers.length; i++) {
      animate(factoidsNumbers[i], 0, Number(factoidsNumbers[i].textContent), 1000);
    }
  }
};

export {
  enableFactoidsAnimation
};
