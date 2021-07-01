import 'core-js/stable';
import 'regenerator-runtime/runtime';

const qualityImage = document.querySelector('.quality__image img');

import qualityTablet from 'url:../assets/about/tablet/image-quality.jpg';

import qualityDesktop from 'url:../assets/about/desktop/image-quality.jpg';

import qualityMobile from 'url:../assets/about/mobile/image-quality.jpg';

if (window.innerWidth <= 1200) {
  qualityImage.src = qualityTablet;
}
if (window.innerWidth > 1200) {
  qualityImage.src = qualityDesktop;
}
if (window.innerWidth <= 700) {
  qualityImage.src = qualityMobile;
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1200) {
    qualityImage.src = qualityDesktop;
  }
  if (window.innerWidth <= 1200) {
    qualityImage.src = qualityTablet;
  }
  if (window.innerWidth <= 700) {
    qualityImage.src = qualityMobile;
  }
});
