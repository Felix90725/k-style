<template>
  <isLoading :active="isLoading" />
  <div class="container my-5 pb-4">
    <ol class="shoppingProcess d-flex justify-content-center align-items-center p-0 mb-4 mt-2">
      <li>
        <span class="active">1</span>
        <h5 class="my-2">購物車</h5>
        <p class="text-warning">請確認您的商品</p>
      </li>
      <i class="bi bi-arrow-right"></i>
      <li>
        <span>2</span>
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
    <div class="row" v-if="this.allQty > 0">
      <div class="col-12 col-lg-8 mb-2">
        <h3><i class="fa-solid fa-cart-shopping me-2 mb-3"></i>您的購物車</h3>
        <div class="buyOrDel d-flex justify-content-between my-2">
          <router-link to="/userAllProducts" class="btn btn-outline-secondary text-decoration-none"
            ><i class="fa-solid fa-arrow-left-long me-1"></i>繼續選購</router-link
          >
          <button
            type="button"
            class="btn btn-outline-danger text-decoration-none ms-3"
            @click.prevent="openDelProductModal(true)"
          >
            <i class="fa-regular fa-trash-can me-1"></i>清空購物車
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th class="col-2 ps-0">商品圖片</th>
              <th class="col-4">商品</th>
              <th class="col-4">數量</th>
              <th class="col-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="align-middle" v-for="item in cart.carts" :key="item.id">
              <td class="ps-0">
                <img :src="item.product.imageUrl" :alt="item.product.category" />
              </td>
              <td>
                <span class="">{{ item.product.title }}</span>
                <span class="d-block" style="font-size: 16px;">
                  <span class="price d-md-none" style="font-size: 16px;">價格:</span> NT$
                  {{ $filters.currency(item.total) }}
                </span>
              </td>
              <td class="pe-md-4 px-0">
                <div class="input-group bg-warning rounded-1">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-sm btn-outline-secondary text-light
                      border-0 py-2 rounded-1 rounded-end-0"
                      type="button"
                      id="button-addon1"
                      style="width: 35px; height: 35px"
                      :disabled="item.qty === 1"
                      @click="updateQuantity(item, -1)"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="number"
                    class="countInput form-control form-control-sm text-center
                    m-0 shadow-nonebg-light"
                    aria-label="Example text with button addon"
                    value="1"
                    @input="checkQuantity(item)"
                    @change="updateCart(item)"
                    v-model.number="item.qty"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-sm btn-outline-secondary text-light
                      border-0 py-2 rounded-1 rounded-start-0"
                      type="button"
                      id="button-addon2"
                      style="width: 35px; height: 35px"
                      @click="updateQuantity(item, 1)"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td class="delBtn ">
                <button
                  type="button"
                  class="btn border-0 p-0 w-100"
                  @click="openDelProductModal(false, item)"
                >
                  <i class="fa-solid fa-trash-can" style="font-size: 20px"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-lg-4">
        <div class="cart-total">
          <h4 class="m-0 p-2 text-center bg-secondary text-light rounded-top-2">購物車總計</h4>
          <div class="card-body p-3 border">
            <ul class="list-unstyled border-bottom m-0 pb-3">
              <li class="d-flex align-items-center justify-content-between mb-4 mt-2">
                <h5 class="m-0">商品總數</h5>
                <span class="m-0 fw-normal">{{ allQty }} 項</span>
              </li>
              <li class="d-flex align-items-center justify-content-between">
                <h5 class="m-0">小計</h5>
                <span class="m-0 fw-normal">NT$ {{ $filters.currency(cart.total) }}</span>
              </li>
              <li
                class="d-flex align-items-center justify-content-between text-danger mt-2"
                v-if="cart.total != cart.final_total"
              >
                <h5 class="m-0">折價劵折扣</h5>
                <span class="m-0 fw-normal">
                  -NT$ {{ $filters.currency(cart.total - cart.final_total) }}
                </span>
              </li>
            </ul>
            <div class="coupons pt-3 pb-3 border-bottom">
              <h5 class="mb-4">
                限時優惠劵(全品項9折)： <span class="text-danger fw-normal">style2024</span>
              </h5>
              <label for="coupons" class="input-group"
                ><h5 class="mb-2">優惠劵</h5>
                <div class="input-group mb-2">
                  <input
                    id="coupons"
                    type="text"
                    class="form-control rounded-start-1"
                    placeholder="請輸入優惠碼"
                    aria-label="coupons"
                    aria-describedby="button-coupons"
                    v-model="coupon_code"
                  />
                  <button
                    class="btn btn-outline-secondary rounded-end-1 text-light border-0"
                    type="button"
                    id="button-coupons"
                    @click="addCouponCode"
                  >
                    送出
                  </button>
                </div>
              </label>
              <span class="text-danger" v-if="cart.total != cart.final_total">
                {{ coupon_data.message }}
              </span>
            </div>
            <div
              class="total d-flex align-items-center justify-content-between mt-3"
              v-if="cart.total != cart.final_total"
            >
              <h5 class="m-0">合計(包含折扣)</h5>
              <span class="m-0 fw-normal">NT$ {{ $filters.currency(cart.final_total) }}</span>
            </div>
            <div class="total d-flex align-items-center justify-content-between mt-3" v-else>
              <h5 class="m-0">合計</h5>
              <span class="m-0 fw-normal">NT$ {{ $filters.currency(cart.final_total) }}</span>
            </div>
          </div>
          <div class="goPay text-center">
            <router-link
              to="/userDetail"
              class="btn w-100 bg-dark text-light text-decoration-none rounded-0 rounded-bottom-2"
            >
              前往結帳</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="text text-center p-md-5 m-md-5" style="min-height: 400px" v-else>
      <i class="fa-solid fa-cart-plus me-3 mt-5" style="font-size: 90px"></i>
      <h2 class="pt-4 pb-3">您的購物車目前是空的唷～</h2>
      <p class="p-2" style="font-size: 20px">趕快加入商品到購物車！！！</p>
      <router-link to="/userAllProducts" class="btn btn-dark mb-1">繼續選購</router-link>
    </div>
  </div>
  <DelModal ref="delModal" :item="tempCartProduct" @del-item="deleteProduct"></DelModal>
  <UserDelModal ref="userDelModal" :item="tempCart" @del-item="deleteProduct"></UserDelModal>
</template>

<script>
import DelModal from '@/components/backend/DelModal.vue';
import UserDelModal from '@/components/frontend/UserDelModal.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    DelModal,
    UserDelModal,
  },
  data() {
    return {
      cart: {},
      isLoading: false,
      allQty: 0, // 產品總數
      tempCart: {}, // UserDelModal
      tempCartProduct: {}, // DelModal
      isAll: true,
      coupon_code: '',
      coupon_data: {},
    };
  },
  methods: {
    // 取得購物車資料
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
          this.addAllQty();
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 按鈕更新產品的數量
    updateQuantity(item, num) {
      const newQty = item.qty + num;
      if (newQty >= 1) {
        // eslint-disable-next-line no-param-reassign
        item.qty = newQty;
        this.updateCart(item);
      }
    },

    // 檢查數量是否小於 1
    checkQuantity(item) {
      if (item.qty < 1) {
        // eslint-disable-next-line no-param-reassign
        item.qty = 1;
      }
    },

    // 更新購物車
    updateCart(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoading = true;
      this.$http
        .put(api, { data: cart })
        .then((res) => {
          this.$httpMessageState(res, '更新數量');
          this.isLoading = false;
          emitter.emit('updateCart'); // 與 navCart 同步更新
          this.getCart();
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 計算總數量
    addAllQty() {
      // 使用 reduce 方法計算 cart.carts 數組(計算總數量)
      this.allQty = this.cart.carts.reduce((sum, item) => sum + item.qty, 0);
    },

    // 開啟刪除 Modal
    openDelProductModal(isAll, item) {
      if (isAll) {
        this.tempCart = {};
        this.$refs.userDelModal.showModal();
      } else {
        this.tempCart = { ...item };
        this.$refs.delModal.showModal();
        this.tempCartProduct = this.tempCart.product;
      }
    },

    // 刪除單一購物車資料 or 全部
    deleteProduct() {
      // 單一
      if (this.tempCart.id) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.tempCart.id}`;
        this.isLoading = true;
        this.$http
          .delete(api)
          .then((res) => {
            this.isLoading = false;
            emitter.emit('updateCart'); // 與 UserNavbar 同步更新
            this.$refs.delModal.hideModal();
            this.getCart();
            this.$httpMessageState(res, '刪除品項');
          })
          .catch((err) => {
            this.$httpMessageState(err, '連線錯誤，請再試一次');
            this.isLoading = false;
          });
      } else {
        // 全部
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
        this.isLoading = true;
        this.$http
          .delete(api)
          .then((res) => {
            this.isLoading = false;
            emitter.emit('updateCart'); // 與 UserNavbar 同步更新
            this.$refs.userDelModal.hideModal();
            this.getCart();
            this.$httpMessageState(res, '刪除購物車');
          })
          .catch((err) => {
            this.$httpMessageState(err, '連線錯誤，請再試一次');
            this.isLoading = false;
          });
      }
    },

    // 新增優惠劵
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http
        .post(api, { data: coupon })
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          if (res.data.success === true) {
            this.coupon_data = res.data;
            emitter.emit('push-message', {
              style: 'success',
              title: '優惠劵套用成功!',
            });
          } else {
            emitter.emit('push-message', {
              style: 'danger',
              title: '找不到優惠劵!',
            });
            this.coupon_code = '';
          }

          this.getCart();
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
  },
  mounted() {
    this.getCart();
    emitter.emit('updateCart'); // 與 UserNavbar 同步更新
  },
};
</script>

<style lang="scss" scoped>
/* 隱藏數字輸入框的上下箭頭 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

p {
  font-size: 14px;
}
img {
  width: 120px;
  height: 150px;
  object-fit: cover;
}
.shoppingProcess {
  h5{
    font-size: 18px;
  }
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
      width: 35px;
      height: 35px;
      border-radius: 50%;
      color: #424242;
      font-size: 20px;
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
.delete {
  font-size: 22px;
}
.countInput {
  border: 1px solid #c9c9c9;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 1px black;
  }
}
.cart-total {
  h5,
  p,
  span,
  label,
  button {
    font-size: 18px;
  }
  h4,
  a {
    font-size: 20px;
  }
  .coupons {
    input {
      border: 1px solid #888888;
      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px black;
      }
    }
    button {
      background-color: #888888;
      &:hover {
        background-color: #666666;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .delBtn{
    background-color: #E9E9E9;
    border-radius: 3px;
    margin: 5px 0;
  }
  .shoppingProcess {
    p {
      display: none;
    }
    h5 {
      font-size: 16px;
    }
  }
  img {
    width: 300px;
    height: 400px;
  }
  .buyOrDel {
    border-bottom: 1px solid #888888;
    padding-bottom: 16px;
  }
  .table {
    span {
      font-size: 20px;
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
        padding-bottom: 10px;
        margin-bottom: 10px;
        td {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}
</style>
