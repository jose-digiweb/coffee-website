//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView';

const controlMobileMenu = function () {
  mobileMenuView.addHandlerMobileMenu();
  mobileMenuView.addHandlerOpenMenu();
  mobileMenuView.addHandlerCloseMenu();
};
controlMobileMenu();
