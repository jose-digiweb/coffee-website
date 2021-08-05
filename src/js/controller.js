//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Importing modules
import mobileMenuView from './views/mobileMenuView.js';
import PlanSubscription from './views/planView.js';
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

  if (choiceEl.classList.contains('disabled')) return;
  if (choiceEl.classList.contains('closePref'))
    PlanSubscription.slideDow(choiceEl, arrow, navTittle);
  else if (choiceEl.classList.contains('openPref'))
    PlanSubscription.slideUp(choiceEl, arrow, navTittle);
};

const subscriptionChoiceControl = function (e) {
  //--> Subscription Choices Elements
  const subscriptionChoice = e.target.closest('.card__choice');
  const choiceId = subscriptionChoice.getAttribute('data-card');

  //--> Grind Section Elements
  const grindSectionTittle = model.state.slideTittle[3];
  const grindSection = model.state.slideTittle[3].nextElementSibling;
  const grindId = grindSection.getAttribute('data-choice');
  const navTittle = document.querySelector(`.nav--${grindId}`);
  const arrow = model.state.slideTittle[3].lastElementChild;

  //--> Order Preview Update Element
  const previewChoice = document.querySelector(`.preview--${choiceId}`);

  //--> Creating the choices array inside the State Object
  model.state.choices = [];

  model.state.cards.forEach((card) => {
    if (card.getAttribute('data-card') === choiceId) {
      //--> Removing the Active State to the previous Choice
      card.classList.remove('active--Card');

      //--> Adding the Active State to the Current Choice
      subscriptionChoice.classList.add('active--Card');

      //--> Updating the Order Preview Text
      previewChoice.innerText =
        subscriptionChoice.firstElementChild.textContent;
    }

    //--> Saving the Subscription Choices to State
    if (card.classList.contains('active--Card')) model.state.choices.push(card);
  });

  //--> Grind Section Control Enable/Disable
  model.state.cards.map((card) => {
    if (
      card.textContent.includes('Capsule') &&
      card.classList.contains('active--Card')
    )
      PlanSubscription.GrindSectionDisabled(
        grindSection,
        grindSectionTittle,
        navTittle,
        arrow
      );
    else if (
      card.textContent.includes('Capsule') &&
      !card.classList.contains('active--Card')
    )
      PlanSubscription.GrindSectionEnabled(
        grindSection,
        grindSectionTittle,
        navTittle
      );
  });

  //--> Activating the Create Plan Button
  if (model.state.choices.length === 5) {
    PlanSubscription.btnOrder.classList.remove('btn__disable');
    PlanSubscription.btnOrder.disabled = false;
  }
};

const init = function () {
  mobileMenuControl();

  model.state.slideTittle.map((tittle) => {
    PlanSubscription.handleClickSlide(tittle, slideChoiceControl);
  });

  model.state.cards.map((card) =>
    PlanSubscription.handleClickCard(card, subscriptionChoiceControl)
  );
};
init();
