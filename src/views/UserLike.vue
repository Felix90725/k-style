<template>
  <isLoading :active="isLoading"></isLoading>
  <div class="container p-lg-5 m-0 m-auto" style="min-height: 660px" v-if="products.length > 0">
    <h3 class="m-0 mb-4"><i class="bi bi-bag-heart me-2"></i>您的願望清單</h3>
    <table class="table" style="max-width: 1200px">
      <thead>
        <tr>
          <th class="col-2 col-lg-2 ps-0">商品圖片</th>
          <th class="col-4 col-lg-3">商品名稱</th>
          <th class="col-2 col-lg-2 ps-lg-3">價格</th>
          <th class="col-3 col-lg-3 text-center">加入購物車</th>
          <th class="col-1 col-lg-2 text-center">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="ps-md-0"><img :src="item.imageUrl" :alt="item.title" /></td>
          <td class="align-middle pb-0 pb-md-2">
            <h5 class="mb-2">{{ item.title }}</h5>
            <p class="m-0">分類:{{ item.category }}</p>
          </td>
          <td class="align-middle ps-lg-3 pt-0 pt-md-2">
            <p class="card-text mt-2">
              <span class="price d-md-none">價格:</span>
              <span class="text-dark" v-if="item.origin_price === item.price">
                NT${{ $filters.currency(item.origin_price) }}
              </span>
              <span v-else>
                <span class="text-dark text-decoration-line-through" v-if="item.price">
                  NT${{ $filters.currency(item.origin_price) }}
                </span>
                <span class="text-danger d-md-block" v-if="item.price">
                  NT${{ $filters.currency(item.price) }}
                </span>
              </span>
            </p>
          </td>
          <td class="addCartBtn align-middle text-center">
            <button class="btn btn-dark rounded-0" @click="addCard(item.id)">
              <i class="fa-solid fa-cart-shopping me-2"></i>加入購物車
            </button>
          </td>
          <td class="align-middle text-center">
            <button class="border-0 bg-white text-dark" @click="delFavorite(item)">
              <i class="fa-solid fa-trash-can" style="font-size: 20px"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text text-center p-5 m-5" style="min-height: 560px;" v-else>
      <i class="bi bi-bag-heart my-5 pb-3" style="font-size: 110px"></i>
      <h2 class="pt-4 pb-3">您的願望清單目前是空的唷~</h2>
      <p class="p-3" style="font-size: 20px">趕快加入商品到願望清單吧~</p>
      <a href="/#/userAllProducts" class="btn btn-dark mb-1">去逛逛</a>
  </div>
</template>

<script>
import handleFavorites from '@/methods/handleFavorites';
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      products: {},
      favoriteItems: handleFavorites.get('myFavorite') || [], // 取得收藏商品
      loadingItem: '',
      isLoading: false,
    };
  },
  methods: {
    // 取得商品列表並篩選收藏品項
    getAllProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        // 過濾收藏的產品
        const filterFavorite = res.data.products
          .filter((product) => this.favoriteItems.includes(product.id));
        // 根據 filterFavorite 的順序排序收藏產品
        this.products = filterFavorite.sort(
          (a, b) => this.favoriteItems.indexOf(b.id) - this.favoriteItems.indexOf(a.id),
        );
      });
    },
    // 移除愛心
    delFavorite(product) {
      if (this.favoriteItems.includes(product.id)) {
        // 移除收藏
        this.favoriteItems.splice(this.favoriteItems.indexOf(product.id), 1);
        emitter.emit('push-message', {
          // toast
          style: 'warning',
          title: '已從收藏清單中移除',
        });
      }
      handleFavorites.save(this.favoriteItems);
      this.getAllProducts();
      emitter.emit('updateFavorite'); // 與 navFavorite 同步更新
    },
    // 加入購物車
    addCard(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.isLoading = true;
      this.$http.post(api, { data: cart }).then((res) => {
        this.isLoading = false;
        this.$httpMessageState(res, '加入購物車');
        emitter.emit('updateCart'); // 與 UserNavbar 同步更新
        // console.log('addCard', res);
      });
    },
    // 滾動到最上方
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  created() {
    this.getAllProducts();
    this.scrollToTop();
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 180px;
  height: 220px;
  object-fit: cover;
}

@media screen and (max-width: 991px) {
.addCartBtn{
  padding: 0;
  button{
    width: 100%;
    font-size: 14px;
  }
}
}
@media screen and (max-width: 767px) {
  h5{
    font-size: 24px;
  }
  p{
    font-size: 18px;
  }
  img {
    width: 300px;
    height: 400px;
  }
  .table {
    span{
      font-size: 22px;
      & + span{
        margin-left: 5px;
      }
    }
    border-collapse: collapse;
    td,
    thead {
      border: none;
    }
    thead {
      display: none;
    }
    tbody {
      tr {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #888888;
        margin-bottom: 10px;
        td {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
