export default {
  // 將資料存入localStorage
  save(itemId) {
    const favoriteId = JSON.stringify(itemId); // 把要存的itemId轉成JSON字串
    localStorage.setItem('myFavorite', favoriteId);
  },
  // 從localStorage取出myFavorite資料
  get() {
    return JSON.parse(localStorage.getItem('myFavorite')); // 將JSON字串轉換成JavaScript的數值或是物件
  },
};
