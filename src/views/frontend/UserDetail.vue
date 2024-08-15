<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <isLoading :active="isLoading" />
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
        <span>3</span>
        <h5 class="my-2">訂單付款</h5>
        <p class="text-warning">確認資料並付款</p>
      </li>
      <i class="bi bi-arrow-right"></i>
      <li>
        <span>4</span>
        <h5 class="my-2">完成訂單</h5>
        <p class="text-warning">完成訂單</p>
      </li>
    </ol>
    <div class="row">
      <div class="col-12 col-lg-8">
        <h3><i class="fa-solid fa-user me-2"></i>顧客資料</h3>
        <div class="customerData">
          <v-form v-slot="{ errors }" id="customerData" @submit="createOrder">
            <div class="my-3">
              <label for="name" class="form-label mb-2"
                >姓名 <span class="text-danger">*</span></label
              >
              <v-field
                id="name"
                name="顧客姓名"
                type="text"
                class="form-control"
                placeholder="請輸入您的姓名"
                :class="{ 'is-invalid': errors['顧客姓名'] }"
                rules="required"
                v-model="form.user.name"
              ></v-field>
              <error-message name="顧客姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label mb-2"
                >電話 <span class="text-danger">*</span></label
              >
              <v-field
                id="phone"
                name="phone"
                type="text"
                class="form-control"
                placeholder="請輸入您的手機電話號碼"
                :class="{ 'is-invalid': errors['phone'] }"
                :rules="isPhone"
                v-model="form.user.tel"
              ></v-field>
              <error-message name="phone" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label mb-2"
                >Email <span class="text-danger">*</span></label
              >
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                placeholder="請輸入 Email"
                :class="{ 'is-invalid': errors['email'] }"
                rules="email|required"
                v-model="form.user.email"
              ></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label mb-2">
                收件地址 <span class="text-danger">*</span>
              </label>
              <v-field
                id="address"
                name="收件地址"
                type="address"
                class="form-control"
                placeholder="請輸入收件地址"
                :class="{ 'is-invalid': errors['收件地址'] }"
                rules="required"
                v-model="form.user.address"
              ></v-field>
              <error-message name="收件地址" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label mb-2">訂單備註</label>
              <textarea
                type="text"
                class="form-control"
                id="message"
                v-model="form.message"
                style="min-height: 150px"
              ></textarea>
            </div>
          </v-form>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="cart-total">
          <h4 class="m-0 p-2 text-center bg-secondary text-light rounded-top-2">訂單資訊</h4>
          <div class="card-body p-3 border">
            <table class="table m-0">
              <thead>
                <tr>
                  <th scope="col" class="ps-0">商品名稱</th>
                  <th scope="col" class="text-end pe-0" style="width: 4rem">數量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="ps-0">{{ item.product.title }}</td>
                  <td class="text-end pe-0">{{ item.qty }}</td>
                </tr>
              </tbody>
            </table>
            <div class="border-bottom pt-3 pb-3">
              <div class="Subtotal d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-normal">小計</h5>
                <p class="mb-0">NT$ {{ $filters.currency(cart.total) }}</p>
              </div>
              <div
                class="d-flex align-items-center justify-content-between text-danger mt-2"
                v-if="cart.total != cart.final_total"
              >
                <h5 class="m-0 fw-normal">折價劵折扣</h5>
                <span class="m-0 fw-normal">
                  -NT$ {{ $filters.currency(cart.total - cart.final_total) }}
                </span>
              </div>
            </div>
            <div class="total d-flex align-items-center justify-content-between mt-3">
              <h5 class="m-0 fw-normal">合計</h5>
              <span class="m-0 fw-normal">NT$ {{ $filters.currency(cart.final_total) }}</span>
            </div>
          </div>
          <div class="createOrder d-flex">
            <router-link
              to="/userCart"
              class="btn btn-outline-secondary w-100"
              style="border-radius: 0; border-bottom-left-radius: 0.25rem"
              >回上一步</router-link
            >
            <button
              type="submit"
              form="customerData"
              class="btn btn-dark w-100"
              style="border-radius: 0; border-bottom-right-radius: 0.25rem"
            >
              建立訂單
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {}, // 購物車資料
      isLoading: false,
    };
  },
  methods: {
    // VeeValidate 電話規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的手機號碼';
    },

    // 送出顧客表單
    createOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.isLoading = true;
      this.$http
        .post(api, { data: this.form })
        .then((res) => {
          this.isLoading = false;
          this.$router.push(`/userPay/${res.data.orderId}`);
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 取得購物車資料
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.cart = res.data.data;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
}
.cart-total {
  h5,
  p,
  span,
  label {
    font-size: 18px;
  }
  h4,
  a,
  button {
    font-size: 20px;
  }
  .table {
    th {
      font-size: 18px;
    }
  }
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
input {
  border: 1px solid #888888;
  border-radius: 0;
  border-bottom: 1px solid #888888;
  box-shadow: 0;
  &:focus {
    border: 1px solid #888888;
    outline: none;
    box-shadow: 0px 0px 3px #666666;
    border-radius: 3px;
  }
}
textarea {
  border: 1px solid #888888;
  border-radius: 3px;
  box-shadow: 0;
  &:focus {
    border: 1px solid #888888;
    outline: none;
    box-shadow: 0px 0px 3px #666666;
    border-radius: 3px;
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
