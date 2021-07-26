//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView';

const PreferenceSlide = function () {
  const prefTitle = document.querySelectorAll('.preference__title');
  const grindEl = document.querySelector('.grind');
  const grindPrev = document.querySelector('.grind--Preview');
  const grindSpace = document.querySelector('.option--4');
  const capsule = document.querySelector('.capsule');
  const grindNav = document.querySelector('.nav--4');
  const priceWeekly = document.querySelector('.price__weekly');
  const priceBiWeekly = document.querySelector('.price__biweekly');
  const priceMonthly = document.querySelector('.price__monthly');
  const prevText = document.querySelector('.preview__text');
  const btnOrder = document.querySelector('.btn__order');

  prefTitle.forEach((tittlePref) => {
    const choice = tittlePref.nextElementSibling;
    const arrow = tittlePref.lastElementChild;
    const cards = choice.firstElementChild.children;
    let id = tittlePref.parentElement.getAttribute('id');
    const navigation = document.querySelector(`.nav--${id}`);

    const slideDow = function () {
      choice.classList.remove('closePref');
      choice.classList.add('openPref');
      choice.style.animationName = 'openPref';
      arrow.style.transform = 'rotate(180deg)';
      navigation.classList.add('nav--active');
    };

    const slideUp = function () {
      choice.classList.remove('openPref');
      choice.classList.add('closePref');
      navigation.classList.remove('nav--active');
      choice.style.animationName = 'closePref';
      arrow.style.transform = 'rotate(0deg)';
    };

    //--> Slide Up and Down the Preferences Tab
    [navigation, tittlePref].forEach((el) => {
      el.addEventListener('click', function (e) {
        if (choice.classList.contains('disable')) return;
        if (choice.classList.contains('closePref')) slideDow();
        else if (choice.classList.contains('openPref')) slideUp();
      });
    });

    //--> Controlling the choices and coffee preferences
    cards.forEach((card) => {
      const choice = card.firstElementChild;
      const tittle = choice.textContent;
      const data = card.getAttribute('data-choice');
      const grindSec = grindEl.lastElementChild;
      const arrow = grindEl.firstElementChild.children[1];
      let orderPrev = document.querySelector(`.option--${data}`);

      card.addEventListener('click', function (e) {
        //--> Updating the Order Preview and The active Class
        if (orderPrev.textContent === '_____') {
          orderPrev.textContent = tittle;
          choice.parentElement.classList.toggle('active--Card');
        } else if (orderPrev.textContent === tittle) {
          orderPrev.textContent = '_____';
          choice.parentElement.classList.toggle('active--Card');
        }

        //--> Updating the Subscription Price
        if (orderPrev.textContent === '250g') {
          priceWeekly.textContent = '$7.20';
          priceBiWeekly.textContent = '$9.60';
          priceMonthly.textContent = '$12.00';
        }
        if (orderPrev.textContent === '500g') {
          priceWeekly.textContent = '$13.00';
          priceBiWeekly.textContent = '$17.50';
          priceMonthly.textContent = '$22.00';
        } else if (orderPrev.textContent === '1000g') {
          priceWeekly.textContent = '$22.00';
          priceBiWeekly.textContent = '$32.00';
          priceMonthly.textContent = '$42.00';
        }

        if (capsule.classList.contains('active--Card')) {
          //--> Controlling the Grind/Capsule Preference
          grindSec.classList.add('disable');

          //--> Slide Up the Section
          grindSec.classList.remove('openPref');
          grindSec.classList.add('closePref');
          grindSec.style.animationName = 'closePref';
          arrow.style.transform = 'rotate(0deg)';
          grindEl.style.opacity = '0.2';
          grindNav.style.opacity = '0.2';

          //--> Updating the Preview Text
          grindPrev.style.display = 'none';
          grindSpace.style.display = 'none';
        } else if (!capsule.classList.contains('active--Card')) {
          grindSec.classList.remove('disable');
          grindPrev.style.display = 'inline-block';
          grindSpace.style.display = 'inline-block';
          grindEl.style.opacity = '1';
          grindNav.style.opacity = '1';
        }

        // console.log(orderPrev.parentElement.innerText);
        if (!orderPrev.parentElement.innerText.includes('_____')) {
          btnOrder.classList.remove('btn__disable');
        } else if (orderPrev.parentElement.innerText.includes('_____')) {
          btnOrder.classList.add('btn__disable');
        }
      });
    });
  });
};

const controlPlanSec = function () {
  mobileMenuView.mobileMenuHandler();
  mobileMenuView.openMenuHandler();
  mobileMenuView.closeMenuHandler();
  PreferenceSlide();
};
controlPlanSec();
