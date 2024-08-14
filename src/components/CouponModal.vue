<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-warning text-white">
          <h5 class="modal-title" id="exampleModalLabel">新增優惠劵</h5>
          <span><em>( * 為必填項目)</em></span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="d-block" for="title"
              >標題 *
              <input
                type="text"
                class="form-control mt-2"
                id="title"
                placeholder="請輸入標題"
                v-model="tempCoupon.title"
              />
            </label>
          </div>

          <div class="mb-3">
            <label class="d-block" for="coupon_code"
              >優惠碼 *
              <input
                type="text"
                class="form-control mt-2"
                id="coupon_code"
                placeholder="請輸入優惠碼"
                v-model="tempCoupon.code"
              />
            </label>
          </div>

          <div class="mb-3">
            <label class="d-block" for="due_date"
              >到期日 *
              <input type="date" class="form-control mt-2" id="due_date" v-model="due_date" />
            </label>
          </div>

          <div class="mb-3">
            <label class="d-block" for="price"
              >折扣百分比 *
              <input
                type="number"
                class="form-control mt-2"
                id="price"
                placeholder="請輸入折扣百分比"
                v-model="tempCoupon.percent"
              />
            </label>
          </div>

          <div class="mb-3 mt-3">
            <div class="form-check">
              <label class="form-check-label" for="is_enabled">
                <input
                  class="inputUse form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                />
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-warning">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  name: 'couponModal',
  props: {
    coupon: {},
  },
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      console.log(this.tempCoupon.due_date);
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  // 整合相同程式碼
  mixins: [modalMixin],
};
</script>

<style lang="scss" scoped>
input {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #888888;
  box-shadow: 0;
  &:focus {
    border-bottom: 1px solid black;
    outline: none;
    box-shadow: 0px 0px 3px black;
    border-radius: 3px;
  }
}
.inputUse {
  border: 1px solid #888888;
  &:focus {
    border-bottom: 1px solid #888888;
  }
}
</style>
