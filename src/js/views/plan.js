//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './mobileMenuView.js';

const planSectionControl = function () {
  const prefTitle = document.querySelectorAll('.preference__title');
  const prevText = document.querySelector('.preview__text');
  const grindEl = document.querySelector('.grind');
  const grindPrev = document.querySelectorAll('.grind--Preview');
  const grindNav = document.querySelector('.nav--4');
  const capsule = document.querySelector('.capsule');

  //--> Modal
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal__Checkout');
  const btnOrder = document.querySelector('#btn--plan');
  const btnModalMobile = document.querySelector('.btn--mobile');
  const btnModal = document.querySelector('#btn--modal');
  const modalPrice = document.querySelectorAll('#checkout__price');
  const modalPriceContainer = document.querySelector('.modal__Price');

  //--> Prices
  const priceWeekly = document.querySelector('.price__weekly');
  const priceBiWeekly = document.querySelector('.price__biweekly');
  const priceMonthly = document.querySelector('.price__monthly');
  const weeklyChoice = document.querySelector('.weekly');
  const biWeeklyChoice = document.querySelector('.biweekly');
  const monthlyChoice = document.querySelector('.monthly');

  prefTitle.forEach((tittlePref) => {
    // console.log(tittlePref);
    const choice = tittlePref.nextElementSibling; //--> Preferences Tittle(h3)
    const arrow = tittlePref.lastElementChild; //--> Arrow Icon
    const cards = choice.firstElementChild.children; //--> Preferences Cards
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
      const coffeeChoice = card.firstElementChild;
      const tittle = coffeeChoice.textContent;
      const data = card.getAttribute('data-choice');
      const grindSec = grindEl.lastElementChild;
      const arrow = grindEl.firstElementChild.children[1];
      let orderPrev = document.querySelectorAll(`.option--${data}`);

      card.addEventListener('click', function (e) {
        //--> Updating the Order Preview and The active Class
        orderPrev.forEach((prev) => {
          if (prev.textContent === '_____') {
            prev.textContent = tittle;
            coffeeChoice.parentElement.classList.add('active--Card');
          } else if (prev.textContent === tittle) {
            prev.textContent = '_____';
            coffeeChoice.parentElement.classList.remove('active--Card');
          }

          //--> Updating the Subscription Price

          if (prev.textContent === '250g') {
            priceWeekly.textContent = '7.20';
            priceBiWeekly.textContent = '9.60';
            priceMonthly.textContent = '12.00';
          }
          if (prev.textContent === '500g') {
            priceWeekly.textContent = '13.00';
            priceBiWeekly.textContent = '17.50';
            priceMonthly.textContent = '22.00';
          } else if (prev.textContent === '1000g') {
            priceWeekly.textContent = '22.00';
            priceBiWeekly.textContent = '32.00';
            priceMonthly.textContent = '42.00';
          }
        });

        modalPrice.forEach((price) => {
          //--> Updating the the Modal Checkout Value
          if (weeklyChoice.parentElement.classList.contains('active--Card'))
            price.textContent = priceWeekly.textContent * 4;
          if (biWeeklyChoice.parentElement.classList.contains('active--Card'))
            price.textContent = priceBiWeekly.textContent * 2;
          else if (
            monthlyChoice.parentElement.classList.contains('active--Card')
          )
            price.textContent = priceMonthly.textContent;
        });

        //--> Controlling the Grind/Capsule Preference
        if (capsule.classList.contains('active--Card')) {
          grindSec.classList.add('disable');

          //--> Slide Up the Section
          grindSec.classList.remove('openPref');
          grindSec.classList.add('closePref');
          grindSec.style.animationName = 'closePref';
          arrow.style.transform = 'rotate(0deg)';
          grindEl.style.opacity = '0.2';
          grindNav.style.opacity = '0.2';

          //--> Updating the Preview Text
          grindPrev.forEach((prev) => {
            prev.style.display = 'none';
          });
        } else if (!capsule.classList.contains('active--Card')) {
          grindSec.classList.remove('disable');
          grindPrev.forEach((prev) => {
            prev.style.display = 'inline-block';
          });
          grindEl.style.opacity = '1';
          grindNav.style.opacity = '1';
        }

        if (!prevText.innerText.includes('_____')) {
          btnOrder.classList.remove('btn__disable');
          btnOrder.disabled = false;
        } else if (prevText.innerText.includes('_____')) {
          btnOrder.classList.add('btn__disable');
          btnOrder.disabled = true;
        }
      });
    });
  });

  //--> Responsive Checkout Price and Button
  ['load', 'resize'].forEach((ev) => {
    window.addEventListener(ev, function () {
      if (window.innerWidth < 585) {
        modalPriceContainer.style.display = 'none';
        btnModal.style.display = 'none';
        btnModalMobile.style.display = 'block';
        btnModalMobile.style.width = '100%';
      } else if (window.innerWidth >= 585) {
        modalPriceContainer.style.display = 'block';
        btnModal.style.display = 'block';
        btnModalMobile.style.display = 'none';
        btnModalMobile.style.width = '';
      }
    });
  });

  btnOrder.addEventListener('click', function (e) {
    e.preventDefault();

    overlay.style.display = 'block';
    modal.style.display = 'block';

    document.documentElement.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
  });

  overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
    modal.style.display = 'none';

    document.documentElement.scrollTop = false;
    document.documentElement.style.overflow = 'scroll';
  });
};

const init = function () {
  mobileMenuView.mobileMenuHandler();
  mobileMenuView.openMenuHandler();
  mobileMenuView.closeMenuHandler();
  planSectionControl();
};
init();
