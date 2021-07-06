//--> Transcribe and Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//--> Configuration and Helper files
import { BREAK_POINT } from '../config';

import { menuState } from '../helper';

class MobileMenuView {
  _openBtn = document.querySelector('.mobile__open');
  _navMenu = document.querySelector('.nav__desktop');
  _closeBtn = document.querySelector('.mobile__close');
  _parentEl = document.querySelector('.header');

  _controlMobileMenu() {
    menuState(this._openBtn, this._navMenu);
  }

  _menuOpenState() {
    this._navMenu.classList.remove('hidden');
    this._navMenu.classList.add('navAnimationOpen');
    this._navMenu.style.animationName = 'showMenu';
    this._openBtn.classList.add('hidden');
    this._closeBtn.classList.remove('hidden');
  }

  _menuCloseState() {
    this._navMenu.style.animationName = 'hideMenu';
    this._closeBtn.classList.add('hidden');
    this._openBtn.classList.remove('hidden');

    setTimeout(() => {
      this._navMenu.classList.remove('navAnimationOpen');
    }, 1000);
  }

  mobileMenuHandler() {
    ['load', 'resize'].forEach((ev) => {
      window.addEventListener(ev, this._controlMobileMenu.bind(this));
    });
  }

  openMenuHandler() {
    this._openBtn.addEventListener('click', this._menuOpenState.bind(this));
  }

  closeMenuHandler() {
    this._closeBtn.addEventListener('click', this._menuCloseState.bind(this));
  }
}

export default new MobileMenuView();
