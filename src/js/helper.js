export const showMobileBtn = function (btn) {
  btn.classList.remove('hidden');
};

export const hideMobileBtn = function (btn) {
  btn.classList.add('hidden');
};

export const AddMobileMenu = function (nav) {
  nav.classList.add('hidden');
  nav.classList.replace('nav__desktop', 'nav__mobile');
  nav.classList.add('navAnimationOpen');
};

export const AddDesktopMenu = function (nav) {
  nav.classList.remove('hidden');
  nav.classList.replace('nav__mobile', 'nav__desktop');
  nav.classList.remove('navAnimationOpen');
};
