const btnMenu = document.querySelector('.mobile__menu');
const mobileClose = document.querySelector('.mobile__close');
const nav = document.querySelector('.nav__top');
const navLinks = document.querySelectorAll('.nav__top a');
const overlay = document.querySelector('.overlay__menu');
const body = document.querySelector('body');

if (window.innerWidth <= 700) {
  btnMenu.addEventListener('click', () => {
    btnMenu.style.display = 'none';
    mobileClose.style.display = 'block';
    overlay.style.visibility = 'visible';
    overlay.style.height = '100vh';
    nav.style.height = '250px';
    body.style.overflow = 'hidden';

    setTimeout(() => {
      navLinks[0].style.visibility = 'visible';
      navLinks[0].style.fontSize = '24px';
    }, 200);

    setTimeout(() => {
      navLinks[1].style.visibility = 'visible';
      navLinks[1].style.fontSize = '24px';
    }, 300);

    setTimeout(() => {
      navLinks[2].style.visibility = 'visible';
      navLinks[2].style.fontSize = '24px';
    }, 400);
  });

  mobileClose.addEventListener('click', () => {
    setTimeout(() => {
      navLinks[0].style.visibility = 'hidden';
      navLinks[0].style.fontSize = '0';
    }, 300);

    setTimeout(() => {
      navLinks[1].style.visibility = 'hidden';
      navLinks[1].style.fontSize = '0';
    }, 200);

    setTimeout(() => {
      navLinks[2].style.visibility = 'hidden';
      navLinks[2].style.fontSize = '0';
    }, 100);

    setTimeout(() => {
      nav.style.height = '0';
    }, 300);

    setTimeout(() => {
      overlay.style.visibility = 'hidden';
      overlay.style.height = '0';
    }, 400);

    mobileClose.style.display = 'none';
    btnMenu.style.display = 'block';
    body.style.overflow = 'scroll';
  });
}
