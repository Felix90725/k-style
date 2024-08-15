<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-warning text-white">
          <h5 class="modal-title ms-2" id="exampleModalLabel">訂單細節</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col col-xl-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px;">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      <a
                        class="text-decoration-none"
                        :href="`mailto:${tempOrder.user.email}`"
                        style="color: #000000"
                      >
                        {{ tempOrder.user.email }}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>
                      <a
                        class="text-decoration-none"
                        :href="`tel:${tempOrder.user.tel}`"
                        style="color: #000000"
                      >
                        {{ tempOrder.user.tel }}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col col-xl-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                      {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ $filters.currency(tempOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>{{ item.product.title }}</th>
                    <td>
                      {{ item.qty }} / {{ item.product.unit }}
                    </td>
                    <td class="text-end">
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  watch: {
    order() {
      this.tempOrder = this.order;
      this.isPaid = this.tempOrder.isPaid;
    },
  },
  data() {
    return {
      modal: {},
      tempOrder: {},
      isPaid: false,
    };
  },
  mixins: [modalMixin],
};
</script>
