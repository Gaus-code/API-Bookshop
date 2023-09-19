import bannerImg1 from '../assets/slider/banner.jpg';
import bannerImg2 from '../assets/slider/banner-2.jpg';
import bannerImg3 from '../assets/slider/banner-3.jpg';


let images = [{
  url: bannerImg1
}, {
  url: bannerImg2
}, {
  url: bannerImg3
}];

function initSlider(options) {
  if (!images || !images.length) return;

  options = options || {
    titles: true,
    dots: true,
    autoplay: false
  };

  let sliderImages = document.querySelector('.slider__images');
  let sliderDots = document.querySelector('.slider__dots');

  initImages();

  if (options.dots) {
    initDots();
  }

  if (options.titles) {
    initTitles();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : "" }" style="background-image:url(${images[index].url})" data-index="${index}"></div>`;

      sliderImages.innerHTML += imageDiv;
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dotItem = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;

      sliderDots.innerHTML += dotItem;
    });

    sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
        dot.addEventListener('click', event => {
          let currentDot = event.target.dataset.index;

          moveSlider(currentDot);
        });
    });
  }

  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;

    sliderImages.innerHTML += titleDiv;
  }

  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector('.slider__images-title');

    sliderTitle.innerText = images[num].title;
  }

  function initAutoplay() {
    setInterval(() => {
      let currentNum = +sliderImages.querySelector('.active').dataset.index;
      let nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;

      moveSlider(nextNum);
    }, options.autoplayInterval);
  }

  function moveSlider(num) {
    sliderImages.querySelector('.active').classList.remove('active');
    sliderImages.querySelector('.n' + num).classList.add('active');

    if (options.dots) {
      sliderDots.querySelector('.active').classList.remove('active');
      sliderDots.querySelector('.n' + num).classList.add('active');
    }

    if (options.titles) changeTitle(num);
  }
}

let sliderOption = {
  titles: false,
  dots: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener('DOMContentLoaded', function() {
  initSlider(sliderOption);
});