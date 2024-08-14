<template>
  <isLoading :active="isLoading" />
  <div class="text mt-3">
    <h4>控制台</h4>
  </div>
  <hr />
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row">
      <div class="box col-md-6 p-5">
        <router-link to="/backstage/products" class="link">
          <i class="fa-solid fa-shirt me-2"></i>產品列表</router-link
        >
      </div>
      <div class="box col-md-6 p-5">
        <router-link to="/backstage/orders" class="link">
          <i class="fa-solid fa-clipboard-list me-2"></i>訂單列表</router-link
        >
      </div>
      <div class="box col-md-6 p-5">
        <router-link to="/backstage/coupons" class="link">
          <i class="fa-solid fa-ticket-simple me-2"></i>優惠劵</router-link
        >
      </div>
      <div class="box col-md-6 p-5">
        <a href="#" @click.prevent="logout" class="link">
          <i class="fa-solid fa-arrow-right-from-bracket me-2"></i>登出</a
        >
      </div>
    </div>
  </div>
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
      this.$http.post(api, this.user).then(() => {
        this.isLoading = false;
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 90%;
  .row {
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      .link {
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
        font-size: 35px;
        color: black;
        text-decoration: none;
        border-radius: 10px;
        background-color: #e0e0e0;
        box-shadow: 3px 3px 8px rgb(124, 124, 124);
        transition: all 0.6s 0s ease;
        &:hover {
          background-color: #888888;
          outline: none;
          box-shadow: 3px 3px 8px black;
          transform: scale(1.1);
          color: #fff;
        }
      }
    }
  }
}
</style>
