const commitImage = document.querySelector('.commitment__image img');

import commitTable from '../assets/about/tablet/image-commitment.jpg';

import commitDesktop from '../assets/about/desktop/image-commitment.jpg';

import commitMobile from '../assets/about/mobile/image-commitment.jpg';

if (window.innerWidth <= 935) {
  commitImage.src = commitTable;
}
if (window.innerWidth > 935) {
  commitImage.src = commitDesktop;
}
if (window.innerWidth <= 700) {
  commitImage.src = commitMobile;
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 936) {
    commitImage.src = commitDesktop;
  }
  if (window.innerWidth <= 935) {
    commitImage.src = commitTable;
  }
  if (window.innerWidth <= 700) {
    commitImage.src = commitMobile;
  }
});
