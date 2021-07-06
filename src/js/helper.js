import { BREAK_POINT } from './config';

export const menuState = function (btn, nav) {
  if (window.innerWidth <= BREAK_POINT) {
    btn.classList.remove('hidden');
    nav.classList.replace('nav__desktop', 'nav__mobile');
  }

  if (window.innerWidth > BREAK_POINT) {
    btn.classList.add('hidden');
    nav.classList.replace('nav__mobile', 'nav__desktop');
  }
};
