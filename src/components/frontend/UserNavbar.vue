<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top">
    <div class="container">
      <router-link to="/" class="logoLink navbar-brand">K-style</router-link>
      <button
        id="routerToggler"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        ref="navbarBtn"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ms-auto">
          <router-link to="/" class="homeLink nav-link me-3" @click="closeNavbar"
            >首頁</router-link
          >
          <router-link to="/userAllProducts" class="nav-link me-3" @click="closeNavbar"
            >所有商品</router-link
          >
          <router-link to="/userCheck" class="nav-link me-3" @click="closeNavbar"
            >訂單查詢</router-link
          >
          <router-link to="/userLike" class="nav-link me-3 position-relative" @click="closeNavbar">
            <i class="fa-solid fa-heart" style="font-size: 18px"></i>
            <span
              class="linkNumbers position-absolute translate-middle
              badge rounded-circle bg-danger mt-2"
              v-if="favoriteItems.length > 0"
            >
              {{ favoriteItems.length }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </router-link>

          <router-link to="/userCart" class="nav-link me-3 position-relative" @click="closeNavbar">
            <i class="fa-solid fa-cart-shopping" style="font-size: 18px"></i>
            <span
              class="linkNumbers position-absolute translate-middle
              badge rounded-circle bg-danger mt-2"
              v-if="carts.length > 0"
            >
              {{ cartsNum }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/methods/emitter';
import handleFavorites from '@/methods/handleFavorites';

export default {
  data() {
    return {
      carts: [],
      favoriteItems: handleFavorites.get('myFavorite') || [],
    };
  },
  methods: {
    // 取得購物車資料
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },

    // 取得愛心收藏資料
    getFavorite() {
      this.favoriteItems = handleFavorites.get();
    },

    // 關閉選單
    closeNavbar() {
      if (document.body.offsetWidth < 992) {
        this.$refs.navbarBtn.click();
      }
    },
  },
  computed: {
    // 取得愛心收藏數量
    cartsNum() {
      let cartNum = 0;
      this.carts.forEach((e) => {
        cartNum += e.qty;
      });
      return cartNum;
    },
  },
  mounted() {
    emitter.on('updateCart', this.getCart); // 觸發 getCart事件
    emitter.on('updateFavorite', this.getFavorite); // 觸發 getFavorite 事件
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
nav {
  background-color: #e9e9e9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-height: 70px;
  .logoLink {
    font-size: 28px;
  }
  .linkNumbers {
    top: 0;
    right: -60%;
  }
  .homeLink {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  nav {
    .linkNumbers {
      top: 0px;
      right: 93%;
    }
    .homeLink{
      display: block;
    }
  }
}
@media screen and (max-width: 767px) {
  nav {
    .linkNumbers {
      top: 0px;
      right: 91%;
    }
  }
}
@media screen and (max-width: 430px) {
  nav {
    .linkNumbers {
      top: 0px;
      right: 87%;
    }
  }
}
</style>
