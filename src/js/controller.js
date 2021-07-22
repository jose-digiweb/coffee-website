//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView';

const PreferenceSlide = function () {
  const prefTitle = document.querySelectorAll('.preference__title');
  const prefChoice = document.querySelectorAll('.preference__choice');
  const prev = document.querySelector('.order__preview');
  const grindEl = document.querySelector('.grind');
  const grindPrev = document.querySelector('.grind--Preview');
  const grindSpace = document.querySelector('.option--4');
  const capsule = document.querySelector('.capsule');
  const grindNav = document.querySelector('.nav--4');

  prefTitle.forEach((pref) => {
    const choice = pref.nextElementSibling;
    const arrow = pref.lastElementChild;
    const cards = choice.firstElementChild.children;
    let id = pref.parentElement.getAttribute('id');
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
    [navigation, pref].forEach((el) => {
      el.addEventListener('click', function (e) {
        if (choice.classList.contains('disable')) return;
        if (choice.classList.contains('closePref')) slideDow();
        else if (choice.classList.contains('openPref')) slideUp();
      });
    });

    //--> Controlling the choices and coffee preferences
    cards.forEach((card) => {
      const choice = card.firstElementChild;

      card.addEventListener('click', function (e) {
        const tittle = choice.textContent;
        const data = card.getAttribute('data-choice');
        const grindSec = grindEl.lastElementChild;
        const arrow = grindEl.firstElementChild.children[1];
        let prev = document.querySelector(`.option--${data}`);

        //--> Updating the Order Preview and The active Class
        if (prev.textContent === '_____') {
          prev.textContent = tittle;
          choice.parentElement.classList.toggle('active--Card');
        } else if (prev.textContent === tittle) {
          prev.textContent = '_____';
          choice.parentElement.classList.toggle('active--Card');
        }

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
          grindPrev.style.display = 'none';
          grindSpace.style.display = 'none';
        } else if (!capsule.classList.contains('active--Card')) {
          grindSec.classList.remove('disable');
          grindPrev.style.display = 'inline-block';
          grindSpace.style.display = 'inline-block';
          grindEl.style.opacity = '1';
          grindNav.style.opacity = '1';
        }
      });
    });
  });
};

const renderMessage = function () {
  const body = document.querySelector('.plan__body');

  const ht = '<div class="append"><h1>Page in construction</h1></div>';

  body.insertAdjacentHTML('afterbegin', ht);
};

const controlMobileMenu = function () {
  mobileMenuView.mobileMenuHandler();
  mobileMenuView.openMenuHandler();
  mobileMenuView.closeMenuHandler();
  PreferenceSlide();
  renderMessage();
};
controlMobileMenu();
