import { setLocalStorage, removeLocalStorage } from './localStorage.js';

const cart = document.getElementById('cart-count');

const setCartIcon = (count) => {
  if (localStorage.length) {
    cart.classList.remove('cart-btn__count_empty');
    cart.textContent = count;
  }
};

const addInCart = (target, count) => {
  target.innerHTML = 'In the cart';
  target.classList.add('btn_in-cart');
  cart.classList.remove('cart-btn__count_empty');
  cart.textContent = count;
};

const deleteFromCart = (target, count) => {
  target.innerHTML = 'Buy now';
  target.classList.remove('btn_in-cart');
  if (count === 0) {
    cart.classList.add('cart-btn__count_empty');
  }
  cart.textContent = count;
};

const checkCartContents = (button) => {
  if (localStorage.length) {
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key === button.dataset.bookid) {
        button.innerHTML = 'In the cart';
        button.classList.add('btn_in-cart');
      }
    }
  }
};

const getSelectedBookInfo = (collection) => {
  for (let button of collection) {
    checkCartContents(button);

    button.addEventListener('click', (event) => {
      const targetBook = event.target.parentElement.parentElement;
      const bookInfo = {
        id: '',
        thumbnail: '',
        author: '',
        title: '',
        description: '',
        price: '',
      };

      for (let key in bookInfo) {
        let node = targetBook.querySelector(`[data-book-info = "${key}"]`);

        if (node && key === 'id') {
          bookInfo[key] = node.dataset.bookid;
        } else if (node && key === 'thumbnail') {
          bookInfo[key] = node.getAttribute('src');
        } else if (node) {
          bookInfo[key] = node.textContent;
        }
      }

      if (event.target.classList.contains('btn_in-cart')) {
        removeLocalStorage(targetBook, 'id');
        deleteFromCart(event.target, localStorage.length);
      } else {
        setLocalStorage(bookInfo);
        addInCart(event.target, localStorage.length);
      }
    });
  }
};

export { getSelectedBookInfo, setCartIcon };