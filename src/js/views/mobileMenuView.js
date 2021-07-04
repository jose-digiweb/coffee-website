//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Configuration and Helper files
import { BREAK_POINT } from '../config';

import {
  showMobileBtn,
  hideMobileBtn,
  AddMobileMenu,
  AddDesktopMenu,
} from '../helper';

class MobileMenuView {
  _openBtn = document.querySelector('.mobile__open');
  _navMenu = document.querySelector('.nav__desktop');
  _closeBtn = document.querySelector('.mobile__close');
  _parentEl = document.querySelector('.header');

  _controlMobileMenu() {
    if (window.innerWidth <= BREAK_POINT) {
      AddMobileMenu(this._navMenu);
      showMobileBtn(this._openBtn);
    }

    if (window.innerWidth > BREAK_POINT) {
      hideMobileBtn(this._openBtn);
      AddDesktopMenu(this._navMenu);
    }
  }

  _menuState(state) {
    this._navMenu.style.animationName = state;
    this._openBtn.classList.toggle('hidden');
    this._closeBtn.classList.toggle('hidden');
  }

  _controlMenu(btn, state) {
    btn.addEventListener('click', state);
  }

  addHandlerMobileMenu() {
    ['load', 'resize'].forEach((ev) => {
      window.addEventListener(ev, this._controlMobileMenu.bind(this));
    });
  }

  addHandlerOpenMenu() {
    this._controlMenu(this._openBtn, () => this._menuState('showMenu'));
  }

  addHandlerCloseMenu() {
    this._controlMenu(this._closeBtn, () => this._menuState('hideMenu'));
  }
}

export default new MobileMenuView();
