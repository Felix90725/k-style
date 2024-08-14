<template>
  <div class="container my-5">
    <ol class="shoppingProcess d-flex justify-content-center align-items-center p-0 mb-5">
      <li>
        <span class="active">1</span>
        <h5 class="my-2">購物車</h5>
        <p class="text-warning">請確認您的商品</p>
      </li>
      <i class="bi bi-arrow-right"></i>
      <li>
        <span class="active">2</span>
        <h5 class="my-2">填寫資料</h5>
        <p class="text-warning">填寫訂購人相關資料</p>
      </li>
      <i class="bi bi-arrow-right"></i>
      <li>
        <span class="active">3</span>
        <h5 class="my-2">訂單付款</h5>
        <p class="text-warning">確認資料並付款</p>
      </li>
      <i class="bi bi-arrow-right"></i>
      <li>
        <span class="active">4</span>
        <h5 class="my-2">完成訂單</h5>
        <p class="text-warning">完成訂單</p>
      </li>
    </ol>
  </div>
  <div class="text text-center p-sm-3 m-sm-5 pb-5" style="min-height: 400px;" >
    <i class="bi bi-bag-check-fill" style="font-size: 90px"></i>
    <h2 class="pt-4 pb-3">您的訂單已成功付款!</h2>
    <p class="p-3" style="font-size: 20px">
      感謝您的訂購!! 我們正在處理您的訂單，如有任何問題歡迎
      <router-link to="" href="https://accounts.google.com/" target="_blank" class="m-0 text-decoration-none">與我們聯繫</router-link>!!
    </p>
    <router-link to="/userAllProducts" class="btn btn-dark mb-1">繼續選購</router-link>
  </div>
</template>

<style lang="scss" scoped>
p {
  font-size: 14px;
}
.shoppingProcess {
  list-style: none;
  li {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 25%;
    .active {
      background-color: #424242;
      color: #fff;
    }
    span {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #424242;
      font-size: 22px;
      border: 2px solid #424242;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      line-height: 0;
      position: relative;
    }
  }
}
@media screen and (max-width: 767px) {
  .shoppingProcess {
    p {
      display: none;
    }
    h5 {
      font-size: 16px;
    }
  }
}
</style>
