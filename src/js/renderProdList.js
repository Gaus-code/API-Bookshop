import noImage from "../assets/no_photo.png";
import ratingStarFilled from "../assets/icons/star-filled.svg";
import ratingStar from "../assets/icons/star.svg";
import { getSelectedBookInfo } from './cart.js';

const renderBooksList = (data, clearNode) => {
  let targetNode = document.getElementById('product-list');
  let buyButtons = null;

  if (clearNode) {
    targetNode.innerHTML = '';
  }

  data.items.forEach(item => {
  
    let thumbnailData = null;
    let bookId = item.id;
  
    let authorsNode ='';
    let titleNode = '';
    let ratingNode = '';
    let descriptionNode = '';
    let priceNode = '';
    let productHtml = '';

    if (item.volumeInfo.imageLinks) {
      thumbnailData = item.volumeInfo.imageLinks.thumbnail;
    } else {
      thumbnailData = noImage;
    }

    if (item.volumeInfo.authors) {
      let authorsListData = item.volumeInfo.authors;
      let output = '';

      authorsListData.forEach((item, index, arr) => {
        if (index === arr.length - 1) {
          output += `${item}`;
        } else {
          output += `${item}, `;
        }
      });

      authorsNode = `<p class="product__author" data-book-info="author">${output}</p>`;
    }

    if (item.volumeInfo.title) {
      let titleData = item.volumeInfo.title;
      titleNode = `<h1 class="product__title" data-book-info="title">${titleData}</h1>`;
    }

    if (item.volumeInfo.averageRating) {
      let ratingsCountData = item.volumeInfo.ratingsCount;
      ratingNode = `<div class="product__rating">
                      <div class="rating__stars">
                        <img src=${ratingStarFilled} alt="Icon" class="star">
                        <img src=${ratingStarFilled} alt="Icon" class="star">
                        <img src=${ratingStarFilled}  alt="Icon" class="star">
                        <img src=${ratingStar}  alt="Icon" class="star">
                        <img src=${ratingStar}  alt="Icon" class="star">
                      </div>
                      <span class="review-nums">${ratingsCountData} review</span>
                    </div>`;
    }

    if (item.volumeInfo.description && item.volumeInfo.description.length > 90) {
      let descriptionData = item.volumeInfo.description;
      let description = descriptionData.slice(0, 91) + '...';
      descriptionNode = `<p class="product__description" data-book-info="description">${description}</p>`;
    } else if (item.volumeInfo.description) {
      let descriptionData = item.volumeInfo.description;
      descriptionNode = `<p class="product__description" data-book-info="description">${descriptionData}</p>`;
    }

    if (item.saleInfo.listPrice) {

      let priceData = item.saleInfo.listPrice.amount;
      const currency = 98;
      let priceValue = Math.floor(priceData * 100 / currency) / 100;

      priceNode = `<div class="product__price">
                    <span class="price__currency">$</span><span class="price__value" data-book-info="price">${priceValue}</span>
                  </div>`;
    }

    productHtml = `<div class="products-list__item product">
                      <img src="${thumbnailData}" alt="Book cover" class="product__img" data-book-info="thumbnail">
                      <div class="product__card">
                        ${authorsNode}
                        ${titleNode}
                        ${ratingNode}
                        ${descriptionNode}
                        ${priceNode}
                        <button class="btn buy-button" data-book-info="id" data-bookid="${bookId}">Buy now</button>
                      </div>
                    </div>`;

    targetNode.insertAdjacentHTML('beforeend', productHtml);
  });

  buyButtons = document.getElementsByClassName('buy-button');
  getSelectedBookInfo(buyButtons);

};

export { renderBooksList };