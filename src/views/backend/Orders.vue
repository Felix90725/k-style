<template>
  <isLoading :active="isLoading" />
  <div class="text mt-3">
    <h4>訂單列表</h4>
  </div>
  <hr />
  <div class="text-end pt-1">
    <button class="btn btn-outline-danger" type="button" @click="openDelOrderModal(true)"
    v-if="orders.length">
      刪除全部訂單
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>
            <span v-if="item.user">{{ item.user.email }}</span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product_id }} 數量: {{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(item)">
                檢視
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelOrderModal(false, item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <BackOrderModal
    ref="backOrderModal"
    :order="tempOrder"
    @del-order="openDelOrderModal"
  ></BackOrderModal>
  <DelModal ref="delModal" :item="tempOrder" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import BackOrderModal from '@/components/backend/BackOrderModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    BackOrderModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      orders: {},
      tempOrder: {},
      pagination: {},
      currentPage: 1,
      isAllOrder: true,
    };
  },
  methods: {
    // 取得order
    getOrders(currentPage = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http
        .get(api, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 開啟檢視
    openModal(item) {
      this.tempOrder = { ...item };
      this.$refs.backOrderModal.showModal();
      this.isAllOrder = false;
    },

    // 更新付款狀態
    updatePaid(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.isLoading = true;
      this.$http
        .put(api, { data: paid })
        .then((res) => {
          this.getOrders(this.currentPage);
          this.isLoading = false;
          this.$httpMessageState(res, '更新付款狀態');
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 開啟刪除 modal
    openDelOrderModal(isAllOrder, item) {
      if (isAllOrder) {
        this.tempOrder = {};
      } else {
        this.tempOrder = { ...item };
        this.isAllOrder = false;
      }
      this.$refs.delModal.showModal();
      this.$refs.backOrderModal.hideModal();
    },

    // 確認刪除
    delOrder() {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      if (this.isAllOrder) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      }
      this.isLoading = true;
      this.$http
        .delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal();
          this.getOrders(this.currentPage);
          this.isLoading = false;
          this.$httpMessageState(res, '刪除表單');
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
