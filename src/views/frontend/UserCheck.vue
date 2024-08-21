<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <isLoading :active="isLoading" />
  <div class="container my-sm-5 d-flex flex-column justify-content-center">
    <div class="title">
      <h2 class="my-4 pb-4 text-center"><i class="bi bi-bag-check me-2"></i>購買訂單查詢</h2>
    </div>
    <v-form v-slot="{ errors }" id="customerData" @submit="searchOrder">
      <label for="email" class="form-label mb-2 mt-6"
        >Email <span class="text-danger">*</span></label
      >
      <div class="input-group mb-3">
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control rounded-1 rounded-end-0"
          placeholder="請輸入 Email"
          :class="{ 'is-invalid': errors['email'] }"
          rules="email|required"
          v-model="email"
        ></v-field>
        <button class="btn btn-outline-secondary rounded-1 rounded-start-0"
        type="submit" form="customerData">查詢</button>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
    </v-form>
    <div class="checkAbout">
      <h5 class="pt-5">訂單出貨說明：</h5>
      <ul class="py-2">
        <li>商品均由韓國代購並空運，訂單確認後需7～15個備貨工作天寄出。</li>
        <li>備貨期間如遇商品缺貨、工廠原料不足將再多7～21個工作天。</li>
        <li>連續假期、航班延誤或清關延遲將導致配送延誤，請參考首頁公告</li>
        <li>如購買過程及收到商品有任何問題，歡迎聯繫我們，我們會盡快回覆您。</li>
      </ul>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      email: '',
      isLoading: false,
      orders: [],
    };
  },
  methods: {
    // 查詢顧客表單
    searchOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.filteredOrders = this.orders
            .filter((order) => order.user.email === this.email); // 篩選
          this.isLoading = false;
          if (this.filteredOrders.length > 0) {
            this.$router.push(`/userCheckOrder/${this.email}`);
          } else {
            emitter.emit('push-message', {
              // toast
              style: 'danger',
              title: '查無此訂單',
            });
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
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
    this.scrollToTop();
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 700px;
  min-height: 600px;
}
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
@media screen and (max-width: 768px) {
  .container{
    min-height: 670px;
  }
}
@media screen and (max-width: 576px) {
  .container {
    margin: 0;
    min-height: 600px;
  }
}
</style>
