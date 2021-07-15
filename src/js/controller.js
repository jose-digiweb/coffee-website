//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView';

const PreferenceSlide = function () {
  const prefTitle = document.querySelectorAll('.preference__title');
  const prev = document.querySelector('.order__preview');

  prefTitle.forEach((pref) => {
    const choice = pref.nextElementSibling;
    const arrow = pref.lastElementChild;
    const cards = choice.firstElementChild.children;

    pref.addEventListener('click', function (e) {
      if (choice.classList.contains('openPref')) {
        choice.classList.remove('openPref');
        choice.style.animationName = 'closePref';
        arrow.style.transform = 'rotate(0deg)';
      } else {
        choice.classList.add('openPref');
        choice.style.animationName = 'openPref';
        arrow.style.transform = 'rotate(180deg)';
      }
    });

    cards.forEach((card) => {
      const choice = card.firstElementChild;

      card.addEventListener('click', function (e) {
        const tittle = choice.textContent;
        const data = card.getAttribute('data-choice');
        let prev = document.querySelector(`.option--${data}`);

        prev.textContent = tittle;
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
