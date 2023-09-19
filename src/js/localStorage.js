const setLocalStorage = (data) => {
    const checkItem = localStorage.getItem(`${data.id}`);
    if (!checkItem) {
      localStorage.setItem(`${data.id}`, JSON.stringify(data));
    }
  };
  
  const removeLocalStorage = (target, key) => {
    let item = target.querySelector(`[data-book-info = "${key}"]`).dataset.bookid;
    localStorage.removeItem(item);
  };
  localStorage.clear();
  export { setLocalStorage, removeLocalStorage };