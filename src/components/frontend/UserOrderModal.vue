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
    <div class="modal-dialog modal-lg" role="document">
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
            <div class="col-12">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="order.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
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
                    <th>電話</th>
                    <td>
                      <a
                        class="text-decoration-none"
                        :href="`tel:${order.user.tel}`"
                        style="color: #000000"
                      >
                        {{ order.user.tel }}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ order.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(order.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="order.is_paid">
                        {{ $filters.date(order.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="order.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ $filters.currency(order.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <th>{{ item.product.title }}</th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">NT$ {{ $filters.currency(item.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-warning">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
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
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: {},
    };
  },
  mixins: [modalMixin],
};
</script>
