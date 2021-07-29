//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView.js';

const init = function () {
  mobileMenuView.mobileMenuHandler();
  mobileMenuView.openMenuHandler();
  mobileMenuView.closeMenuHandler();
};
init();
