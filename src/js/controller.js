//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView';

const PreferenceSlide = function () {
  const prefTitle = document.querySelectorAll('.preference__title');

  prefTitle.forEach((pref) => {
    pref.addEventListener('click', function (e) {
      const id = pref.getAttribute('id');
      const choice = pref.nextElementSibling;
      const arrow = pref.lastElementChild;
      const prev = document.querySelector('.order__preview');

      // console.log(choice);

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
