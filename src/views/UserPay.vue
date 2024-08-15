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
        <span class="active">3</span>
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
        <div class="orderDetails me-md-4 mb-5 p-3 p-md-4">
          <h4 class="mb-3">訂單明細</h4>
          <table class="table">
            <thead>
              <tr>
                <th class="col-6">品名</th>
                <th class="col-2 text-end">數量</th>
                <th class="col-4 text-end">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td>{{ item.product.title }}</td>
                <td class="text-end">{{ item.qty }}</td>
                <td class="text-end">NT$ {{ $filters.currency(item.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="orderData me-md-4 mb-5 p-3 p-md-4">
          <h4 class="mb-3">訂單資訊</h4>
          <table class="table">
            <tbody>
              <tr>
                <th class="col-5">訂單日期</th>
                <td class="col-7 fw-normal">{{ $filters.date(order.create_at) }}</td>
              </tr>
              <tr>
                <th class="col-5">訂單編號</th>
                <td class="col-7 fw-normal">{{ order.id }}</td>
              </tr>
              <tr>
                <th class="col-5">付款狀態</th>
                <td class="col-7 fw-normal text-success" v-if="order.is_paid">已付款</td>
                <td class="col-7 fw-normal text-danger" v-else>尚未付款</td>
              </tr>
              <tr>
                <th class="col-5">姓名</th>
                <td class="col-7" v-if="order.user">{{ order.user.name }}</td>
              </tr>
              <tr>
                <th class="col-5">電話</th>
                <td class="col-7" v-if="order.user">
                  <a
                    class="text-decoration-none"
                    :href="`tel:${ order.user.tel }`"
                    style="color: #000000"
                  >
                    {{ order.user.tel }}
                  </a>
                </td>
              </tr>
              <tr>
                <th class="col-5">電子郵件</th>
                <td class="col-7" v-if="order.user">
                  <a
                    class="text-decoration-none"
                    :href="`mailto:${order.user.email}`"
                    style="color: #000000"
                  >
                    {{ order.user.email }}
                  </a>
                </td>
              </tr>
              <tr>
                <th class="col-5">收件地址</th>
                <td class="col-7" v-if="order.user">{{ order.user.address }}</td>
              </tr>
              <tr class="remark">
                <th colspan="2">
                  訂單備註 : <span class="fw-normal">{{ order.message }}</span>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="cart-total">
          <h4 class="m-0 p-2 text-center bg-secondary text-light rounded-top-2">結帳付款</h4>
          <div class="card-body p-3 border">
            <div class="orderAbout mb-5">
              <h5 class="pb-2 m-0">訂單狀態</h5>
              <p class="p-2 ps-0" style="font-size: 16px">
                訂單已成功建立，請確認您的訂單資訊是否正確，並且於下方選擇訂單付款方式。
              </p>
            </div>
            <div class="orderAbout mb-5">
              <h5 class="pb-2 m-0">請選擇付款方式</h5>
              <select class="form-select mt-3" aria-label="Default select example">
                <option selected value="1">信用卡付款</option>
                <option value="2">貨到付款</option>
                <option value="3">ibon付款</option>
                <option value="3">ATM付款</option>
              </select>
            </div>
            <div class="total d-flex align-items-center justify-content-between mt-3">
              <h5 class="m-0">付款金額</h5>
              <span class="m-0 fw-normal">NT$ {{ $filters.currency(order.total) }}</span>
            </div>
          </div>
          <div class="createOrder d-flex">
            <button
              type="button"
              form="customerData"
              class="btn btn-dark w-100 rounded-0 rounded-bottom-2"
              @click="goToPay()"
            >
              進行付款
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      isLoading: false,
      orderId: '',
      cart: {},
      order: {},
      allQty: 0,
    };
  },
  methods: {
    // 取得單筆訂單列表
    getOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.order;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 結帳付款
    goToPay() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .post(api, this.orderId)
        .then((res) => {
          this.isLoading = false;
          emitter.emit('updateCart'); // 與 UserNavbar 同步更新
          this.$httpMessageState(res, '付款');
          this.$router.push('/userFinish');
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
  },
  created() {
    // 取得訂單ID
    this.orderId = this.$route.params.order_id;
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
}
.orderDetails,
.orderData {
  border: 1px solid #888888;
  box-shadow: 3px 3px 3px #d1d1d1;
  border-radius: 5px;
  table {
    table-layout: fixed; // 表格佈局設定為固定
  }

  .remark {
    th {
      word-wrap: break-word; // 自動換行防止溢出
    }
  }
}
.cart-total {
  .orderAbout {
    h5 {
      border-bottom: 1px solid #888888;
    }
    select {
      border: 1px solid #888888;
      border-radius: 0;
      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px black;
      }
    }
  }
  h5,
  span {
    font-size: 18px;
  }
  h4,
  button {
    font-size: 20px;
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
@media screen and (max-width: 767px) {
  .shoppingProcess {
    p {
      display: none;
    }
    h5 {
      font-size: 16px;
    }
  }
  .orderDetails,
  .orderData {
    table {
      tr {
        font-size: 14px;
      }
    }
  }
}
</style>
