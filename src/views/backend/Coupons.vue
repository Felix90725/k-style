<template>
  <isLoading :active="isLoading" />
  <div class="text mt-3">
    <h4>優惠券列表</h4>
  </div>
  <hr />
  <div class="text-end pt-1">
    <button class="btn btn-warning text-white" type="button" @click="openCouponModal(true)">
      建立新的優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="250">名稱</th>
        <th width="250">折扣百分比</th>
        <th width="250">到期日</th>
        <th width="250">是否啟用</th>
        <th width="250">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getCoupons" class="pt-3"></Pagination>
  <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></CouponModal>
  <DelModal ref="delModal" :item="tempCoupon" @del-item="delCoupon"></DelModal>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    CouponModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: '',
        code: '',
      },
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    // 取得遠端優惠劵資料
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 開啟新增 or 編輯 Modal
    openCouponModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000, // 當前時間的 UNIX 時間戳（以秒為單位）
          is_enabled: 0,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNew = isNew;
      this.$refs.couponModal.showModal();
    },

    // 新增 or 編輯遠端優惠劵
    updateCoupon() {
      if (this.isNew) {
        // 新增
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http
          .post(api, { data: this.tempCoupon })
          .then((res) => {
            this.getCoupons();
            this.$refs.couponModal.hideModal();
            this.$httpMessageState(res, '新增優惠劵');
          })
          .catch((err) => {
            this.$httpMessageState(err, '連線錯誤，請再試一次');
          });
      } else {
        // 編輯
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http
          .put(api, { data: this.tempCoupon })
          .then((res) => {
            this.getCoupons();
            this.$refs.couponModal.hideModal();
            this.$httpMessageState(res, '編輯優惠劵');
          })
          .catch((err) => {
            this.$httpMessageState(err, '連線錯誤，請再試一次');
          });
      }
    },

    // 開啟刪除 Modal
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.delModal.showModal();
    },

    // 刪除遠端優惠劵
    delCoupon() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http
        .delete(api)
        .then((res) => {
          this.isLoading = false;
          this.getCoupons();
          this.$refs.delModal.hideModal();
          this.$httpMessageState(res, '刪除優惠劵');
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
