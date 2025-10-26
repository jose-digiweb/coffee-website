import * as config from '../config.js';

class PlanSubscriptionView {
  prefTitle = document.querySelectorAll('.preference__title');
  prevText = document.querySelector('.preview__text');
  grindEl = document.querySelector('.grind');
  grindPrev = document.querySelectorAll('.grind--Preview');
  grindNav = document.querySelector('.nav--4');
  capsule = document.querySelector('.capsule');
  cardChoice = document.querySelectorAll('.card__choice');

  //--> Modal
  overlay = document.querySelector('.overlay');
  modal = document.querySelector('.modal__Checkout');
  btnOrder = document.querySelector('#btn--plan');
  btnModalMobile = document.querySelector('.btn--mobile');
  btnModal = document.querySelector('#btn--modal');
  modalPrice = document.querySelector('#checkout__price');
  modalPriceContainer = document.querySelector('.modal__Price');
  modalPriceBtn = document.querySelector('.modal__PriceBtn');
  modalText = document.querySelector('.modal__text');

  //--> Prices
  priceWeekly = document.querySelector('.price__weekly');
  priceBiWeekly = document.querySelector('.price__biweekly');
  priceMonthly = document.querySelector('.price__monthly');
  weeklyChoice = document.querySelector('.weekly');
  biWeeklyChoice = document.querySelector('.biweekly');
  monthlyChoice = document.querySelector('.monthly');

  _clear(element) {
    element.textContent = '';
  }

  _updatePrice(weekly, biweekly, monthly) {
    this.priceWeekly.textContent = weekly;
    this.priceBiWeekly.textContent = biweekly;
    this.priceMonthly.textContent = monthly;
  }

  _GrindSectionDisabled(grindSection, tittle, navTittle, arrow) {
    grindSection.classList.add('disabled');
    grindSection.classList.remove('openPref');
    grindSection.classList.add('closePref');
    grindSection.style.animationName = 'closePref';
    tittle.style.opacity = '0.2';

    navTittle.classList.remove('nav--active');
    navTittle.style.opacity = '0.2';

    arrow.style.transform = 'rotate(0)';
  }

  _GrindSectionEnabled(grindSection, tittle, navTittle) {
    grindSection.classList.remove('disabled');
    grindSection.classList.remove('openPref');
    grindSection.classList.add('closePref');

    tittle.style.opacity = '1';
    navTittle.style.opacity = '1';
  }

  _slideDown(choice, arrow, navTittle) {
    choice.classList.remove('closePref');
    choice.classList.add('openPref');
    choice.style.animationName = 'openPref';
    arrow.style.transform = 'rotate(180deg)';
    navTittle.classList.add('nav--active');
  }

  _slideUp(choice, arrow, navTittle) {
    choice.classList.remove('openPref');
    choice.classList.add('closePref');
    choice.style.animationName = 'closePref';
    arrow.style.transform = 'rotate(0)';
    navTittle.classList.remove('nav--active');
  }

  render(element, where, markup) {
    this._clear(element);
    element.insertAdjacentHTML(where, markup);
  }

  slideSectionControl(choice, arrow, navTittle) {
    if (choice.classList.contains('disabled')) return;
    if (choice.classList.contains('closePref'))
      this._slideDown(choice, arrow, navTittle);
    else if (choice.classList.contains('openPref'))
      this._slideUp(choice, arrow, navTittle);
  }

  updateActiveChoice(card, choiceId, subsChoice, StateChoices) {
    if (card.getAttribute('data-card') === choiceId) {
      //-> Removing the Active State to the previous Choice
      card.classList.remove('active--Card');

      //-> Adding the Active State to the Current Choice
      subsChoice.classList.add('active--Card');
    }

    //-> Saving the Subscription Choices to State
    if (card.classList.contains('active--Card')) StateChoices.push(card);
  }

  updateOrderPreview(option, choiceId, subsChoice) {
    if (option.getAttribute('data-preview') === choiceId)
      option.innerText = subsChoice.firstElementChild.textContent;
  }

  GrindSectionControl(
    card,
    preview,
    grindSection,
    grindSectionTittle,
    navTittle,
    arrow
  ) {
    if (
      card.textContent.includes('Capsule') &&
      card.classList.contains('active--Card')
    ) {
      this._GrindSectionDisabled(
        grindSection,
        grindSectionTittle,
        navTittle,
        arrow
      );

      //-> Removing the Grind Option from the Preview Text
      preview.nextElementSibling.style.display = 'none';
    } else if (
      card.textContent.includes('Capsule') &&
      !card.classList.contains('active--Card')
    ) {
      this._GrindSectionEnabled(grindSection, grindSectionTittle, navTittle);

      //-> Adding the Grind Option from the Preview Text
      preview.nextElementSibling.style.display = 'inline-block';
    }
  }

  changePrice(element) {
    if (element.textContent === config.LOWER_QUANTITY)
      this._updatePrice(
        config.LOWER_WEEKLY,
        config.LOWER_BIWEEKLY,
        config.LOWER_MONTHLY
      );
    if (element.textContent === config.MEDIUM_QUANTITY)
      this._updatePrice(
        config.MEDIUM_WEEKLY,
        config.MEDIUM_BIWEEKLY,
        config.MEDIUM_MONTHLY
      );
    if (element.textContent === config.MAXIMUM_QUANTITY)
      this._updatePrice(
        config.MAXIMUM_WEEKLY,
        config.MAXIMUM_BIWEEKLY,
        config.MAXIMUM_MONTHLY
      );
  }

  activatePlanBtn(preview) {
    if (preview.innerText.includes('_____')) {
      this.btnOrder.classList.add('btn__disable');
      this.btnOrder.disabled = true;
    } else if (!preview.innerText.includes('_____')) {
      this.btnOrder.classList.remove('btn__disable');
      this.btnOrder.disabled = false;
    }
  }

  openModal() {
    this.overlay.style.display = 'block';
    this.modal.style.display = 'block';

    document.documentElement.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
  }

  closeModal() {
    this.overlay.style.display = 'none';
    this.modal.style.display = 'none';

    document.documentElement.scrollTop = false;
    document.documentElement.style.overflow = 'scroll';
  }

  calculateCheckoutPrice(choice) {
    //--> Desktop CheckoutPrice
    if (
      choice.textContent.includes('Every week') &&
      choice.classList.contains('active--Card')
    ) {
      this.modalPrice.textContent = (
        +choice.lastElementChild.firstElementChild.textContent * 4
      ).toFixed(2);
      console.log(this.modalPriceBtn);
    }

    //--> Mobile CheckoutPrice
    if (
      choice.textContent.includes('Every week') &&
      choice.classList.contains('active--Card') &&
      window.innerWidth < 585
    ) {
      this.modalPriceContainer.style.display = 'none';
      this.btnModal.style.width = '100%';
      this.render(
        this.modalPriceBtn,
        'afterbegin',
        ` - ${this.modalPriceContainer.innerHTML}`
      );
    }

    //--> Desktop CheckoutPrice
    if (
      choice.textContent.includes('Every 2 weeks') &&
      choice.classList.contains('active--Card')
    ) {
      this.modalPrice.textContent = (
        +choice.lastElementChild.firstElementChild.textContent * 2
      ).toFixed(2);
    }

    //--> Mobile CheckoutPrice
    if (
      choice.textContent.includes('Every 2 weeks') &&
      choice.classList.contains('active--Card') &&
      window.innerWidth < 585
    ) {
      this.modalPriceContainer.style.display = 'none';
      this.btnModal.style.width = '100%';
      this.render(
        this.modalPriceBtn,
        'afterbegin',
        ` - ${this.modalPriceContainer.innerHTML}`
      );
    }

    //--> Desktop CheckoutPrice
    if (
      choice.textContent.includes('Every month') &&
      choice.classList.contains('active--Card')
    ) {
      this.modalPrice.textContent = (
        +choice.lastElementChild.firstElementChild.textContent * 1
      ).toFixed(2);
    }

    //--> Mobile CheckoutPrice
    if (
      choice.textContent.includes('Every month') &&
      choice.classList.contains('active--Card') &&
      window.innerWidth < 585
    ) {
      this.modalPriceContainer.style.display = 'none';
      this.btnModal.style.width = '100%';
      this.render(
        this.modalPriceBtn,
        'afterbegin',
        ` - ${this.modalPriceContainer.innerHTML}`
      );
    }
  }

  handleClickSlide(tittle, handle) {
    tittle.addEventListener('click', handle);
  }

  handleClickCard(card, handle) {
    card.addEventListener('click', handle);
  }

  handleClickPlanBtn(handle) {
    this.btnOrder.addEventListener('click', handle);
  }

  handleClickOverlay() {
    this.overlay.addEventListener('click', this.closeModal.bind(this));
  }
}

export default new PlanSubscriptionView();
