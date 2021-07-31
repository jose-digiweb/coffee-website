//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView.js';
import PlanSubscription from './views/planView.js';

const planSectionControl = function () {
  //--> Slide-Up and Slide-Down the Subscription Choices
  PlanSubscription.slidePreference();

  //--> Controlling the Subscription choices and Coffee Preferences
  PlanSubscription.subscriptionPreference();

  //--> Responsive Checkout Price and Button
  PlanSubscription.CheckoutValue();

  //--> Open the Modal
  PlanSubscription.openModal();

  //--> Close the Modal
  PlanSubscription.closeModal();
};

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
  planSectionControl();
};
init();
