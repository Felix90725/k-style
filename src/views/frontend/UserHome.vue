<template>
  <!-- https://picsum.photos/1300/200?random=1 -->
  <!-- 輪播 banner -->
  <isLoading :active="isLoading" />
  <div
    id="carouselExampleDark"
    class="carousel slide carousel-fade"
    data-bs-ride="carousel"
    data-bs-pause="false"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>

    <div class="carousel-inner">
      <div class="banner-img carousel-item active" data-bs-interval="5000">
        <img
          src="../../assets/img/banner2.webp"
          class="d-block w-100 position-relative"
          alt="幻燈片1"
        />
        <div class="carousel-caption d-md-block position-absolute" style="top: 60%">
          <router-link
            to="/userAllProducts"
            type="button"
            class="btn text-light"
            style="background-color: coral"
          >
            點我前往
          </router-link>
        </div>
      </div>
      <div class="banner-img carousel-item" data-bs-interval="5000">
        <img
          src="../../assets/img/banner1.webp"
          class="d-block w-100 position-relative"
          alt="幻燈片2"
        />
        <div class="carousel-caption d-md-block position-absolute" style="top: 60%">
          <router-link
            to="/userAllProducts"
            type="button"
            class="btn text-light"
            style="background-color: coral"
          >
            點我前往
          </router-link>
        </div>
      </div>
      <div class="banner-img carousel-item" data-bs-interval="5000">
        <img
          src="../../assets/img/banner3.webp"
          class="d-block w-100 position-relative"
          alt="幻燈片3"
        />
        <div class="carousel-caption d-md-block position-absolute" style="top: 60%">
          <router-link
            to="/userAllProducts"
            type="button"
            class="btn text-light"
            style="background-color: coral"
          >
            點我前往
          </router-link>
        </div>
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon me-5" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon ms-5" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <!-- 熱銷商品 card -->
  <div class="card-container container my-5 py-4">
    <h3 class="text-center">熱銷商品</h3>
    <div class="card-row row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
      <div class="col mt-4 mt-md-5" v-for="item in topFourProducts" :key="item.id">
        <router-link :to="`product/${item.id}`" class="card m-auto text-decoration-none">
          <img
            :src="item.imageUrl"
            class="card-img card-img-top rounded-1 rounded-bottom-0"
            alt="card1"
          />
          <div class="card-body">
            <h5>{{ item.title }}</h5>
            <p class="card-text">
              <span class="original text-decoration-line-through">NT${{ item.origin_price }}</span>
              <br />
              <span class="cheap text-danger">NT${{ item.price }}</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <!-- 簡介 introduction -->
  <div class="introduction-container container-fluid">
    <div class="introduction-filter"></div>
    <div class="introduction-txt text-light text-center pt-4">
      <h3>韓國代購</h3>
      <p>正韓 × 舒適 × 穿搭</p>
    </div>
  </div>
  <!-- 關於 about -->
  <div class="container my-5 py-4">
    <div class="row">
      <div class="col-md-6">
        <img src="../../assets/img/about.avif" class="mw-100 mb-2" alt="about1" />
      </div>
      <div class="col-md-4 m-auto">
        <h4 class="pb-md-2">天然舒適，簡約風格</h4>
        <p>
          我們的韓國服飾代購專注於挑選最優質的商品，確保每件衣服都具備天然、舒適、簡約的特色。從設計到材質，我們致力於為您提供最新潮、最時尚的韓國服飾，讓您享受高品質的穿著體驗。
        </p>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between mt-4">
      <div class="col-md-6">
        <img src="../../assets/img/login2.0.jpg" class="mw-100 mb-2" alt="about1" />
      </div>
      <div class="col-md-4 m-auto">
        <h4 class="pb-md-2">多樣款式，韓國直送時尚</h4>
        <p>
          我們提供多樣化的款式選擇，無論是日常休閒還是時尚潮流，都能滿足您的需求。每件商品均由韓國直送，保證正品，讓您享受最新、最熱門的韓國時尚。
        </p>
      </div>
    </div>
  </div>
  <!-- 訂閱 -->
  <div class="container pb-4">
    <div class="title">
      <h2 class="pb-4"><i class="fa-solid fa-bullhorn me-2"></i>訂閱我們，獲取最新活動消息</h2>
    </div>
    <v-form v-slot="{ errors }" id="customerData" @submit="subscription">
      <div class="input-group mb-3">
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control rounded-1 rounded-end-0"
          placeholder="輸入您的信箱，獲得優惠劵與最新活動消息"
          :class="{ 'is-invalid': errors['email'] }"
          rules="email|required"
          v-model="email"
        ></v-field>
        <button
          class="btn btn-outline-secondary rounded-1 rounded-start-0"
          type="submit"
          form="customerData"
        >
          訂閱
        </button>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
    </v-form>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      products: {},
      topFourProducts: [],
      isLoading: false,
      email: '',
    };
  },
  methods: {
    // 取得商品資料
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.products = res.data.products;
        this.topFourProducts = this.products.slice(0, 4);
        this.isLoading = false;
      });
    },

    subscription() {
      emitter.emit('push-message', {
        style: 'success',
        title: `${this.email}訂閱成功`,
      });
      this.email = '';
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
    this.getProducts();
    this.scrollToTop();
  },
};
</script>

<style lang="scss" scoped>
.banner-img {
  position: relative;
  height: 92.5vh;
}
.banner-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 50px;
  height: 50px;
}
// card
.card-container {
  h3 {
    margin-bottom: 2rem;
  }
  .card {
    border: 0;
    transition: all 0.5s 0s ease;
    box-shadow: 0px 0px 6px rgba(121, 121, 121, 0.2);
    &:hover {
      transform: scale(1.1);
      background-color: #e9e9e9;
      box-shadow: 0px 0px 3px rgb(121, 121, 121, 0.2);
      backdrop-filter: invert(10%);
    }
  }
  .card-img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
}
// introduction
.introduction-container {
  background-image: url("../../assets/img/introductionImg.avif");
  object-fit: cover;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 30vh;
  padding: 0;
  position: relative;
  z-index: 0; // 堆疊順序設置為 0
  display: flex;
  align-items: center;
  justify-content: center;
  .introduction-filter {
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 30vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .introduction-txt {
    font-size: 26px;
  }
}

// 訂閱
input {
  border: 1px solid #888888;
  border-radius: 0;
  border-bottom: 1px solid #888888;
  box-shadow: 0;
  &:focus {
    border: 1px solid #888888;
    outline: none;
    box-shadow: 0px 0px 1px #666666;
    border-radius: 3px;
  }
}

// 平板畫面
@media screen and (max-width: 1199px) {
  .banner-img {
    height: 80vh;
  }
  .banner-img img {
    height: 80vh;
  }
  .card-container {
    .card-img {
      height: 270px;
    }
  }
}
@media screen and (max-width: 991px) {
  .banner-img {
    height: 40vh;
  }
  .banner-img img {
    height: 40vh;
  }
  .card-container {
    h3 {
      margin-bottom: 0rem;
    }
    .card-row {
      margin: auto;
      width: 90%;
      .col {
        margin-bottom: 20px;
      }
    }
    .card-img {
      height: 300px;
    }
  }
}
@media screen and (max-width: 768px) {
  .card-container {
    .card-row {
      width: 100%;
    }
    .card-img {
      height: 450px;
    }
  }
}
// 手機畫面
@media screen and (max-width: 430px) {
  .card-container {
    padding: 0;
    .card-row {
      width: 100%;
    }
    .card-img {
      height: 400px;
    }
  }
}
</style>
