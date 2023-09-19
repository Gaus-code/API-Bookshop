import { renderBooksList } from './renderProdList.js';
import { setCartIcon } from './cart.js';

const loadButton = document.getElementById('btn-load');
const categories = document.querySelectorAll('.categories__item');
const url = 'https://www.googleapis.com/books/v1/volumes';
const apiKey = 'AIzaSyCEJuC_geCL1yPZtaDefDQBGu1xnwm22A4';
const httpRequestParam = {
  category: 'Architecture',
  startIndex: 0,
  maxResults: 6,
  langRestrict: 'en',
};

const selectCategory = (category) => {
  let currentCategoryNode = document.querySelector('.categories__item_selected');
  let newCategoryNode = category;

  currentCategoryNode.classList.remove('categories__item_selected');
  newCategoryNode.classList.add('categories__item_selected');
};

const getHttpRequestParam = (resetStartIndex) => {
  let currentCategoryNode = document.querySelector('.categories__item_selected');
  let currentCategoryName = currentCategoryNode.dataset.category;

  httpRequestParam.category = currentCategoryName;

  if (resetStartIndex === true) {
    httpRequestParam.startIndex = 0;
  }

  return httpRequestParam;
};

const useRequest = (url, getParam, callback, clearNode) => {
  let link = `${url}?q="subject:${httpRequestParam.category}"&${apiKey}&printType=books&startIndex=${httpRequestParam.startIndex}&maxResults=${httpRequestParam.maxResults}&langRestrict=${httpRequestParam.langRestrict}`;

  fetch(link)
  .then(response => response.json())
  .then((data) => {
    callback(data, clearNode);
  })
  .catch(err => console.log(err.message));


};

categories.forEach(category => category.addEventListener('click', (event) => {
  event.preventDefault();

  selectCategory(category);

  const getParam = getHttpRequestParam(true);


  useRequest(url, getParam, renderBooksList, true);
}));

loadButton.addEventListener('click', () => {
  const getParam = getHttpRequestParam();

  getParam.startIndex += 6;

  useRequest(url, getParam, renderBooksList, false);
});

setCartIcon(localStorage.length);

useRequest(url, httpRequestParam, renderBooksList, false);