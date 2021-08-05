//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  cards: [],
  slideTittle: [],
  previewText: {
    previewEl: null,
    optionsText: [],
  },
};

export const getCardsChoice = function (data) {
  const cardsChoice = document.querySelectorAll('.card__choice');

  Array.from(cardsChoice).map((card) => {
    state.cards.push(card);
  });
};

export const getChoiceTittle = function (data) {
  const choiceTittle = document.querySelectorAll('.preference__title');

  Array.from(choiceTittle).map((tittle) => {
    state.slideTittle.push(tittle);
  });
};

export const getOrderPreview = function (data) {
  const previewText = document.querySelector('.preview__text');
  const optionText = document.querySelectorAll('.preview__option');

  Array.from(optionText).map((option) =>
    state.previewText.optionsText.push(option)
  );

  state.previewText.previewEl = previewText;
};

const init = function () {
  getChoiceTittle();
  getCardsChoice();
  getOrderPreview();
};
init();
