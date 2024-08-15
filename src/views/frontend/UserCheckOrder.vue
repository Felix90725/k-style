<template>
  <isLoading :active="isLoading" />
  <div class="container my-5">
    <h2 class="pb-4"><i class="bi bi-card-checklist me-2"></i>您的購買清單</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="orderId">訂單編號</th>
          <th>訂購日期</th>
          <th>總金額</th>
          <th class="text-center">付款狀態</th>
          <th class="text-center">詳細</th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="order in filteredOrders" :key="order.id">
          <td class="orderId">{{ order.id }}</td>
          <td>{{ $filters.date(order.create_at) }}</td>
          <td>{{ $filters.currency(order.total) }}</td>
          <td class="text-center">
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td class="text-center">
            <button class="btn btn-secondary" type="button" @click="openOrder(order)">
              查看詳情
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <UserOrderModal ref="userOrderModal" :order="tempOrder"></UserOrderModal>
</template>

<script>
import UserOrderModal from '@/components/frontend/UserOrderModal.vue';

export default {
  components: {
    UserOrderModal,
  },
  data() {
    return {
      isLoading: false,
      email: '',
      orders: [],
      tempOrder: {},
      filteredOrders: [],
      paginatedOrders: [],
      pagination: {},
      page: 1,
    };
  },
  methods: {
    // 取得全部訂單列表
    getOrder(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.filteredOrders = this.orders
            .filter((order) => order.user.email === this.email); // 篩選
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 開啟詳細
    openOrder(item) {
      this.tempOrder = { ...item };
      this.$refs.userOrderModal.showModal();
    },
  },
  created() {
    this.getOrder();
    this.email = this.$route.params.email_id;
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  min-height: 600px;
}
@media screen and (max-width: 584px) {
  .orderId {
    display: none;
  }
}
</style>
