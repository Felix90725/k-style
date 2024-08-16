<template>
  <isLoading :active="isLoading"/>
  <!-- 產品 banner -->
  <div
    class="product-banner container-fluid w-100 d-flex justify-content-center align-items-center"
  >
    <div class="product-banner-filter w-100"></div>
    <div class="product-banner-txt">
      <h3 class="text-light mb-0">立即搶購最新韓系潮流單品，輕鬆擁有時尚風格！</h3>
    </div>
  </div>
  <!-- 中間產品 -->
  <div class="container mt-md-5">
    <div class="row">
      <!-- 左側商品分類 list -->
      <div class="col-lg-3">
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0
              border-top border-start-0 border-end-0 rounded-0"
              id="headingOne"
              aria-expanded="true"
            >
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">商品分類</h4>
              </div>
            </div>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="list card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a
                      href="#"
                      class="py-2 d-block"
                      :class="{ active: nowChoose === '全部商品' }"
                      @click.prevent="chooseProduct('全部商品')"
                      >全部商品 (All)</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="py-2 d-block"
                      :class="{ active: nowChoose === '衣服' }"
                      @click.prevent="chooseProduct('衣服')"
                      >衣服 (Clothing)</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="py-2 d-block"
                      :class="{ active: nowChoose === '襯衫' }"
                      @click.prevent="chooseProduct('襯衫')"
                      >襯衫 (Shirt)</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="py-2 d-block"
                      :class="{ active: nowChoose === '褲子' }"
                      @click.prevent="chooseProduct('褲子')"
                      >褲子 (Pants)</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="py-2 d-block"
                      :class="{ active: nowChoose === '其它' }"
                      @click.prevent="chooseProduct('其它')"
                      >其它 (Other)</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右側產品卡 product-card -->
      <div class="col-lg-9 m-auto">
        <h3 class="ms-2 mb-0">{{ nowChoose }}</h3>
        <div class="container-fluid w-100">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-5">
            <div class="col mt-4 pb-4" v-for="item in filteredProducts" :key="item.id">
              <div class="right-card">
                <a
                  href="#"
                  class="product-card-link text-decoration-none position-relative"
                  @click.prevent="getProduct(item.id)"
                >
                  <div class="card border-0 position-relative rounded-1">
                    <!-- 愛心按鈕 -->
                    <button
                      type="button"
                      class="favorite btn position-absolute border-0"
                      @click.stop.prevent="toggleFavorite(item)"
                    >
                      <i
                        class="fa-solid fa-heart text-danger"
                        style="font-size: 1.8rem"
                        v-if="favoriteItems.includes(item.id)"
                      ></i>
                      <i class="fa-regular fa-heart text-danger"
                      style="font-size: 1.8rem" v-else></i>
                    </button>
                    <img :src="item.imageUrl" class="card-img-top rounded-1
                    rounded-bottom-0" alt="product" />
                    <div class="card-body p-3 rounded-0">
                      <h5 class="mt-1 mb-0">{{ item.title }}</h5>
                      <p class="card-text mt-2">
                        <span class="text-dark" v-if="item.origin_price === item.price">
                          NT${{ $filters.currency(item.origin_price) }}
                        </span>
                        <span v-else>
                          <span class="text-dark text-decoration-line-through" v-if="item.price">
                            NT${{ $filters.currency(item.origin_price) }}
                          </span>
                          <span class="text-danger ms-2" v-if="item.price">
                            NT${{ $filters.currency(item.price) }}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  class="product-card-btn btn btn-dark rounded-1 rounded-top-0"
                  :disabled="this.status.loadingItem === item.id"
                  @click="addCard(item.id)"
                >
                  <div
                    v-if="this.status.loadingItem === item.id"
                    class="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <Pagination :pages="pagination" @emit-pages="getProducts" class="p-3 pt-2"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import emitter from '@/methods/emitter';
import handleFavorites from '@/methods/handleFavorites';

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      nowChoose: '全部商品',
      filteredProducts: [],
      status: { // 加入購物車讀取效果
        loadingItem: '', // 對應品項 id
      },
      favoriteItems: handleFavorites.get('myFavorite') || [], // 取得收藏商品
    };
  },
  methods: {
    // 取得商品資料
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.products = res.data.products;
        this.filterProducts(page);
        this.isLoading = false;
        this.scrollToTop();
      });
    },

    // 愛心收藏切換
    toggleFavorite(product) {
      if (this.favoriteItems.includes(product.id)) {
        this.favoriteItems.splice(this.favoriteItems.indexOf(product.id), 1); // 移除收藏
        emitter.emit('push-message', { // toast
          style: 'warning',
          title: '已從收藏清單中移除',
        });
      } else { // 新增收藏
        this.favoriteItems.push(product.id);
        emitter.emit('push-message', { // toast
          style: 'success',
          title: '已新增至收藏清單',
        });
      }
      handleFavorites.save(this.favoriteItems);
      emitter.emit('updateFavorite'); // 與 navFavorite 同步更新
    },

    // 前往單一商品頁面
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    // 選擇點選的商品類型
    chooseProduct(item) {
      this.nowChoose = item;
      this.filterProducts();
      this.scrollToProduct();
    },

    // 過濾產品
    filterProducts(page = 1) {
      if (this.nowChoose === '全部商品') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (product) => product.category === this.nowChoose,
        );
      }
      this.setPagination(page); // 每次過濾後設置分頁
    },

    // 設定頁碼
    setPagination(page = 1) {
      const perPage = 9;
      this.pagination = {
        total_pages: Math.ceil(this.filteredProducts.length / perPage),
        current_page: page,
        category: null,
      };
      // 每頁顯示的資料
      this.filteredProducts = this.filteredProducts.slice((page - 1) * perPage, page * perPage);
    },

    // 加入購物車
    addCard(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then((res) => {
        emitter.emit('updateCart'); // 與 UserNavbar 同步更新
        this.status.loadingItem = '';
        this.$httpMessageState(res, '加入購物車');
      });
    },

    // 滾動到最上方
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    // 滾動到產品頁面
    scrollToProduct() {
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });
    },
  },
  created() {
    this.scrollToTop();
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.product-banner {
  background-image: url("../../assets/img/product-banner.avif");
  min-height: 400px;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
  .product-banner-filter {
    background-color: rgba(0, 0, 0, 0.5);
    min-height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
// 產品
// 左側列表
.list {
  a {
    color: #666666;
    text-decoration: none;
    &:hover {
      color: black;
      text-decoration: none;
    }
    &.active {
      color: black;
      font-weight: 500;
      text-decoration: none;
    }
  }
}
// 右側產品卡
.product-card-link .card {
  .favorite {
    top: 0;
    right: 0;
    padding: 0;
    width: 50px;
    height: 50px;
    z-index: 99;
  }
  position: relative;
  img {
    height: 350px;
    object-fit: cover;
  }
  .card-body {
    height: 130px;
  }
}
.right-card {
  position: relative;
  box-shadow: 0px 0px 5px rgb(121, 121, 121, .3);
  .product-card-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0px;
    z-index: 10;
    box-shadow: 0px 0px 5px rgb(121, 121, 121, .3);
  }
}

@media screen and (max-width: 1400px) {
  .product-card-link .card {
    width: 100%;
    margin: auto;
    img {
      height: 300px;
    }
    .card-body {
      height: 135px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .product-card-link .card {
    h5 {
      font-size: 1.1rem;
    }
  }
}
@media screen and (max-width: 992px) {
  .product-card-link .card {
    h5 {
      font-size: 1.25rem;
    }
    img {
      height: 400px;
    }
    .card-body {
      height: 130px;
    }
  }
}
@media screen and (max-width: 767px) {
  .product-card-link .card {
    img {
      height: 500px;
    }
  }
}
@media screen and (max-width: 450px) {
  .product-card-link .card {
    img {
      height: 400px;
    }
  }
}
</style>
