//--> Importing modules
import mobileMenuView from './views/mobileMenuView.js';
import PlanSubscriptionView from './views/planView.js';
import * as model from './model.js';

const mobileMenuControl = function () {
  //--> Show and Hide Mobile Btn
  mobileMenuView.mobileMenuBtn();

  //--> Open Mobile Menu
  mobileMenuView.openMenu();

  //--> Close Mobile Menu
  mobileMenuView.closeMenu();
};

const slideChoiceControl = function (e) {
  const tittleEl = e.target.closest('.preference__title');
  const id = tittleEl.getAttribute('data-tittle');
  const choiceEl = tittleEl.nextElementSibling;
  const arrow = tittleEl.lastElementChild;
  const navTittle = document.querySelector(`.nav--${id}`);

  PlanSubscriptionView.slideSectionControl(choiceEl, arrow, navTittle);
};

const subscriptionChoiceControl = function (e) {
  //--> Subscription Choices Elements
  const subscriptionChoice = e.target.closest('.card__choice');
  const choiceId = subscriptionChoice.getAttribute('data-card');

  //--> Grind Section Elements
  const grindSectionTittle = model.state.slideTittle[3];
  const grindSection = grindSectionTittle.nextElementSibling;
  const arrow = grindSectionTittle.lastElementChild;
  const grindId = grindSection.getAttribute('data-choice');
  const navTittle = document.querySelector(`.nav--${grindId}`);

  //--> Creating the choices array inside the State Object
  model.state.choices = [];

  //--> Updating the Active State of the Subscription Choices
  model.state.cards.forEach(card => {
    PlanSubscriptionView.updateActiveChoice(
      card,
      choiceId,
      subscriptionChoice,
      model.state.choices
    );
  });

  //--> Updating the Order Preview Text
  model.state.previewText.optionsText.map(option => {
    PlanSubscriptionView.updateOrderPreview(
      option,
      choiceId,
      subscriptionChoice
    );
  });

  //--> Updating the Prices depending on Quantity Chose
  PlanSubscriptionView.changePrice(subscriptionChoice.firstElementChild);

  //--> Grind Section Control Enable/Disable
  model.state.cards.map(card => {
    PlanSubscriptionView.GrindSectionControl(
      card,
      model.state.previewText.optionsText[2],
      grindSection,
      grindSectionTittle,
      navTittle,
      arrow
    );
  });

  //--> Activating the 'Create Plan' Button
  PlanSubscriptionView.activatePlanBtn(model.state.previewText.previewEl);
};

const btnPlanControl = function () {
  const previewMarkup = model.state.previewText.previewEl.innerHTML;

  //--> Rendering the Preview Text to the Modal
  PlanSubscriptionView.render(
    PlanSubscriptionView.modalText.firstElementChild,
    'afterbegin',
    previewMarkup
  );

  //--> Calculating the Checkout Price
  model.state.choices.map(choice => {
    PlanSubscriptionView.calculateCheckoutPrice(choice);
  });

  //--> Opening the Modal
  PlanSubscriptionView.openModal();
};

const init = function () {
  mobileMenuControl();

  model.state.slideTittle.map(tittle => {
    PlanSubscriptionView.handleClickSlide(tittle, slideChoiceControl);
  });

  model.state.cards.map(card =>
    PlanSubscriptionView.handleClickCard(card, subscriptionChoiceControl)
  );

  PlanSubscriptionView.handleClickPlanBtn(btnPlanControl);

  PlanSubscriptionView.handleClickOverlay();
};
init();
