class PlanSubscription {
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
  modalPrice = document.querySelectorAll('#checkout__price');
  modalPriceContainer = document.querySelector('.modal__Price');

  //--> Prices
  priceWeekly = document.querySelector('.price__weekly');
  priceBiWeekly = document.querySelector('.price__biweekly');
  priceMonthly = document.querySelector('.price__monthly');
  weeklyChoice = document.querySelector('.weekly');
  biWeeklyChoice = document.querySelector('.biweekly');
  monthlyChoice = document.querySelector('.monthly');

  slidePreference() {
    this.prefTitle.forEach((tittlePref) => {
      const choice = tittlePref.nextElementSibling; //--> Preferences Tittle(h3)
      const arrow = tittlePref.lastElementChild; //--> Arrow Icon
      const cards = choice.firstElementChild.children; //--> Preferences Cards
      let id = tittlePref.parentElement.getAttribute('id');
      const navigation = document.querySelector(`.nav--${id}`);

      const slideDow = function () {
        choice.classList.remove('closePref');
        choice.classList.add('openPref');
        choice.style.animationName = 'openPref';
        arrow.style.transform = 'rotate(180deg)';
        navigation.classList.add('nav--active');
      };

      const slideUp = function () {
        choice.classList.remove('openPref');
        choice.classList.add('closePref');
        navigation.classList.remove('nav--active');
        choice.style.animationName = 'closePref';
        arrow.style.transform = 'rotate(0deg)';
      };

      //--> Slide Up and Down the Preferences Tab
      [navigation, tittlePref].forEach((el) => {
        el.addEventListener('click', function (e) {
          if (choice.classList.contains('disable')) return;
          if (choice.classList.contains('closePref')) slideDow();
          else if (choice.classList.contains('openPref')) slideUp();
        });
      });
    });
  }

  subscriptionPreference() {
    this.cardChoice.forEach((card) => {
      const sub = function () {
        const tittle = card.firstElementChild.textContent;
        const data = card.getAttribute('data-choice');
        const grindSec = this.grindEl.lastElementChild;
        const arrow = this.grindEl.firstElementChild.children[1];
        let orderPrev = document.querySelectorAll(`.option--${data}`);

        //--> Updating the Order Preview and The active Class
        orderPrev.forEach((prev) => {
          if (prev.textContent === '_____') {
            prev.textContent = tittle;
            card.classList.add('active--Card');
          } else if (prev.textContent === tittle) {
            prev.textContent = '_____';
            card.classList.remove('active--Card');
          }

          //--> Updating the Subscription Price
          if (prev.textContent === '250g') {
            this.priceWeekly.textContent = '7.20';
            this.priceBiWeekly.textContent = '9.60';
            this.priceMonthly.textContent = '12.00';
          }
          if (prev.textContent === '500g') {
            this.priceWeekly.textContent = '13.00';
            this.priceBiWeekly.textContent = '17.50';
            this.priceMonthly.textContent = '22.00';
          } else if (prev.textContent === '1000g') {
            this.priceWeekly.textContent = '22.00';
            this.priceBiWeekly.textContent = '32.00';
            this.priceMonthly.textContent = '42.00';
          }
        });

        //--> Updating the the Modal Checkout Value
        this.modalPrice.forEach((price) => {
          if (
            this.weeklyChoice.parentElement.classList.contains('active--Card')
          )
            price.textContent = this.priceWeekly.textContent * 4;
          if (
            this.biWeeklyChoice.parentElement.classList.contains('active--Card')
          )
            price.textContent = this.priceBiWeekly.textContent * 2;
          else if (
            this.monthlyChoice.parentElement.classList.contains('active--Card')
          )
            price.textContent = this.priceMonthly.textContent;
        });

        //--> Controlling the Grind/Capsule Preference
        if (this.capsule.classList.contains('active--Card')) {
          grindSec.classList.add('disable');

          //--> Slide Up the Section
          grindSec.classList.remove('openPref');
          grindSec.classList.add('closePref');
          grindSec.style.animationName = 'closePref';
          arrow.style.transform = 'rotate(0deg)';
          this.grindEl.style.opacity = '0.2';
          this.grindNav.style.opacity = '0.2';

          //--> Updating the Preview Text
          this.grindPrev.forEach((prev) => {
            prev.style.display = 'none';
          });
        } else if (!this.capsule.classList.contains('active--Card')) {
          grindSec.classList.remove('disable');
          this.grindPrev.forEach((prev) => {
            prev.style.display = 'inline-block';
          });
          this.grindEl.style.opacity = '1';
          this.grindNav.style.opacity = '1';
        }

        if (!this.prevText.innerText.includes('_____')) {
          this.btnOrder.classList.remove('btn__disable');
          this.btnOrder.disabled = false;
        } else if (this.prevText.innerText.includes('_____')) {
          this.btnOrder.classList.add('btn__disable');
          this.btnOrder.disabled = true;
        }
      };

      card.addEventListener('click', sub.bind(this));
    });
  }

  openModal() {
    const open = function () {
      this.overlay.style.display = 'block';
      this.modal.style.display = 'block';

      document.documentElement.scrollTop = 0;
      document.documentElement.style.overflow = 'hidden';
    };

    this.btnOrder.addEventListener('click', open.bind(this));
  }

  closeModal() {
    const close = function () {
      this.overlay.style.display = 'none';
      this.modal.style.display = 'none';

      document.documentElement.scrollTop = false;
      document.documentElement.style.overflow = 'scroll';
    };

    this.overlay.addEventListener('click', close.bind(this));
  }

  CheckoutValue() {
    const checkoutCalc = function () {
      //--> Responsive Checkout Price and Button
      if (window.innerWidth < 585) {
        this.modalPriceContainer.style.display = 'none';
        this.btnModal.style.display = 'none';
        this.btnModalMobile.style.display = 'block';
        this.btnModalMobile.style.width = '100%';
      } else if (window.innerWidth >= 585) {
        this.modalPriceContainer.style.display = 'block';
        this.btnModal.style.display = 'block';
        this.btnModalMobile.style.display = 'none';
        this.btnModalMobile.style.width = '';
      }
    };

    ['load', 'resize'].forEach((ev) => {
      window.addEventListener(ev, checkoutCalc.bind(this));
    });
  }
}

export default new PlanSubscription();
