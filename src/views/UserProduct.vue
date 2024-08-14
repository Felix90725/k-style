<template>
  <isLoading :active="isLoading"></isLoading>
  <div class="container mt-5">
    <!-- 麵包屑 breadcrumb-->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#/" class="text-secondary text-decoration-none">首頁</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#/userAllProducts" class="text-secondary text-decoration-none">產品</a>
        </li>
        <li class="breadcrumb-item text-secondary active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <!-- 單一產品 -->
    <div class="row pt-2">
      <!-- 產品圖片 -->
      <div class="product-img col-md-5">
        <img :src="product.imageUrl" alt="product1" />
      </div>
      <!-- 產品資訊 -->
      <div class="col-md-6 mx-auto">
        <div class="product-title">
          <h2 class="mt-2 mt-md-0">{{ product.title }}</h2>
        </div>
        <div class="price mt-3">
          <h4 class="card-text mt-2">
            <span class="text-dark" v-if="product.origin_price === product.price"
              >NT$ {{ $filters.currency(product.origin_price) }}</span
            >
            <span v-else>
              <span class="text-dark text-decoration-line-through">
                NT${{ $filters.currency(product.origin_price) }}
              </span>
              <span class="text-danger ps-2"> NT${{ $filters.currency(product.price) }}</span>
            </span>
          </h4>
        </div>
        <div class="product-description mt-3">
          <div class="description mt-3" v-if="product.description">
            <span class="about">【DESCRIPTION】</span>
            <!-- 控制空白處理方式 -->
            <p class="m-0 ms-2" style="white-space: pre-line">
              {{ product.description }}
            </p>
          </div>
          <div class="size pt-3">
            <span>【SIZE(cm)】</span>
            <p class="m-0 ms-2">{{ product.size }}</p>
          </div>
          <div class="model-size pt-3">
            <span>【MODEL SIZE】</span>
            <p class="m-0 ms-2">{{ product.model_size }}</p>
          </div>
          <div class="row mb-3">
            <div class="content col-6 pt-3">
              <span>【FABRIC】</span>
              <p class="m-0 ms-2">{{ product.content }}</p>
            </div>
            <div class="content col-6 pt-3">
              <span>【供應商】</span>
              <p class="m-0 ms-2">한국(韓國)</p>
            </div>
          </div>
        </div>

        <div class="row">
          <p class="mt-3">數量:</p>
          <div class="col-7">
            <div class="input-group bg-warning">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-secondary text-light border-0 py-2 rounded-0"
                  type="button"
                  id="button-addon1"
                  :disabled="productQty === 1"
                  @click="updateQuantity(-1)"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center m-0 shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value="1"
                v-model.number="productQty"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary text-light border-0 py-2 rounded-0"
                  type="button"
                  id="button-addon2"
                  @click="updateQuantity(1)"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-5 d-flex align-items-center justify-content-end">
            <button type="button" class="btn border-0" @click="toggleFavorite(product)">
              <i class="fa-solid fa-heart text-danger" style="font-size: 2rem"
              v-if="favoriteItems.includes(product.id)"></i>
              <i class="fa-regular fa-heart text-danger" style="font-size: 2rem" v-else></i>
            </button>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-6">
            <button
              type="button"
              class="btn btn-outline-dark py-2 rounded-0 w-100"
              :disabled="this.status.loadingItem === product.id"
              @click="addCard(product.id)"
            >
              <i class="fa-solid fa-cart-shopping me-2"></i>加入購物車
            </button>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn btn-dark text-light py-2 rounded-0 w-100"
              @click="goToCart(product.id)"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="Precautions mt-2 col-md-6 text-secondary">
      <p class="m-1">商品說明:</p>
      <ul>
        <li>
          商品顏色因環境光線(太陽光、室內光等..)及螢幕顯示器不同容易產生色差
          ，廠商均努力呈現商品最真實的顏色，實際顏色已收到的商品為主。
        </li>
        <li>
          尺寸數據以公分(cm)為單位，均為廠商手工測量提供，因每個人測量方式不同，1~3公分為正常誤差範圍。
        </li>
      </ul>
    </div>
    <h3 class="mt-5 text-center">我們也推薦</h3>
    <div class="container mb-2">
      <ProductSwiper :product="filteredSwiper"></ProductSwiper>
    </div>
  </div>
</template>

<script>
import ProductSwiper from '@/components/ProductSwiper.vue';
import emitter from '@/methods/emitter';
import handleFavorites from '@/methods/handleFavorites';

export default {
  components: {
    ProductSwiper,
  },
  data() {
    return {
      id: '',
      product: {},
      status: {
        loadingItem: '', // 對應品項 ID
      },
      isLoading: false,
      swiperData: [],
      filteredSwiper: [],
      productQty: 1, // 商品數量
      favoriteItems: handleFavorites.get('myFavorite') || [], // 取得收藏商品
    };
  },
  methods: {
    // 取得單一商品細節
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          this.product = res.data.product;
          console.log('getProduct', this.product);
        }
        this.getAllProduct();
      });
    },
    // 加入購物車
    addCard(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: this.productQty,
      };
      this.status.loadingItem = id;
      this.isLoading = true;

      return this.$http.post(api, { data: cart })
        .then((res) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          if (res.data.success) {
            this.$httpMessageState(res, '加入購物車');
            emitter.emit('updateCart'); // 與 UserNavbar 同步更新
            return true;
          }
          return false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          this.$httpMessageState(error, '加入購物車失敗');
          return false;
        });
    },
    // 進入購物車介面
    goToCart(id) {
      // 確保addCard先執行完，回傳true
      this.addCard(id).then((success) => {
        if (success) {
          emitter.emit('updateCart'); // 與 UserNavbar 同步更新
          this.$router.push('/userCart');
        }
      });
    },
    // 按鈕更新產品的數量
    updateQuantity(number) {
      this.productQty += number;
    },
    // 愛心收藏切換
    toggleFavorite(product) {
      if (this.favoriteItems.includes(product.id)) { // 移除收藏
        this.favoriteItems.splice(this.favoriteItems.indexOf(product.id), 1);
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
    // 取得全部商品(swiper用)
    getAllProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          // console.log('getAllProduct', res);
          this.isLoading = false;
          this.swiperData = res.data.products;
          this.filterProducts();
        }
      });
    },
    // 篩選出單一品項類型商品(swiper用)
    filterProducts() {
      this.filteredSwiper = this.swiperData.filter(
        (data) => data.category === this.product.category && data.id !== this.product.id,
      );
      // console.log('this.filteredSwiper', this.filteredSwiper);
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
    this.id = this.$route.params.productId;
    this.getProduct();
    this.scrollToTop();
  },
};
</script>

<style lang="scss" scoped>
.product-img {
  object-fit: cover;
  overflow: hidden;
  background-position: center;
  img {
    width: 100%;
  }
}
.product-title {
  border-bottom: 1px solid #666666;
}
.product-description {
  border-top: 1px solid #666666;
  border-bottom: 1px solid #666666;
}
</style>
