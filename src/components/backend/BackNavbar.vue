<template>
  <isLoading :active="isLoading" />
  <nav class="navbar navbar-dark navbar-expand-lg bg-secondary flex-lg-column">
    <a class="logoLink navbar-brand mb-3 m-auto" href="#"
      >K-style
      <span class="backLogo text-white">後台管理</span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse me-auto w-100" id="navbarNavAltMarkup">
      <div class="navbar-nav mb-auto flex-column w-100">
        <router-link to="/backstage/control" class="nav-link pb-3 pt-3 ps-4">
          <i class="fa-solid fa-person-dots-from-line me-2"></i>控制台
        </router-link>

        <h5 class="text-white ms-2 mb-3 mt-3 ps-4">
          <i class="fa-solid fa-list-ul me-2 ms-1"></i>功能列表
        </h5>

        <router-link to="/backstage/products" class="nav-link pb-3 pt-3 ps-4">
          <i class="fa-solid fa-shirt me-2"></i>產品</router-link
        >
        <router-link to="/backstage/orders" class="nav-link ps-4 pb-3 pt-3">
          <i class="fa-solid fa-clipboard-list me-2"></i>訂單</router-link
        >
        <router-link to="/backstage/coupons" class="nav-link ps-4 pb-3 pt-3">
          <i class="fa-solid fa-ticket-simple me-2"></i>優惠券</router-link
        >
        <a href="#" @click.prevent="logout" class="nav-link ps-4 pb-3 pt-3">
          <i class="fa-solid fa-arrow-right-from-bracket me-2"></i>登出</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    // 登出功能
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.isLoading = true;
      this.$http
        .post(api, this.user)
        .then(() => {
          this.isLoading = false;
          this.$router.push('/login');
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  min-height: 100%;
  box-shadow: 3px 0px 5px rgb(192, 191, 191);
  .logoLink {
    font-size: 28px;
    .backLogo {
      font-size: 16px;
    }
  }
  h5 {
    font-size: 22px;
  }
  .nav-link {
    font-size: 18px;
    position: relative;
    &:focus {
      background-color: #888888;
    }
    & + .nav-link::before {
      content: "";
      position: absolute;
      border-top: 1px solid #fff;
      top: 0;
      left: 20px;
      right: 20px;
    }
  }
}
// 大於 992 時
@media screen and (min-width: 992px) {
  nav {
    height: 100vh;
  }
}
</style>
