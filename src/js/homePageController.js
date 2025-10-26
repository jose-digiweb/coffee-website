//--> Importing modules
import mobileMenuView from './views/mobileMenuView.js';

const mobileMenuControl = function () {
  //--> Show and Hide Mobile Btn
  mobileMenuView.mobileMenuBtn();

  //--> Open Mobile Menu
  mobileMenuView.openMenu();

  //--> Close Mobile Menu
  mobileMenuView.closeMenu();
};

const init = function () {
  mobileMenuControl();
};
init();
