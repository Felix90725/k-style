<template>
  <isLoading :active="isLoading" />
  <div class="text mt-3">
    <h4>產品列表</h4>
  </div>
  <hr />
  <div class="text-end pt-1">
    <button class="btn btn-warning text-white" type="button" @click="openModal(true)">
      建立新的產品
    </button>
  </div>
  <table class="table mt-3">
    <thead>
      <tr>
        <th width="130">分類</th>
        <th>產品名稱</th>
        <th width="150">原價</th>
        <th width="150">售價</th>
        <th width="130">是否啟用</th>
        <th width="180">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelProductModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getProducts" class="pt-3"></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal ref="delModal" :item="tempProduct" @del-item="delProduct"></DelModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ProductModal from '../../components/backend/ProductModal.vue';
import DelModal from '../../components/backend/DelModal.vue';

export default {
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    // 取得遠端產品資料
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },

    // 開啟建立新的產品 or 編輯
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },

    // 遠端商品建立 or 編輯
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          productComponent.hideModal();
          this.getProducts();
          if (res.data.success && !this.isNew) {
            // 加入訊息回饋
            this.$httpMessageState(res, '編輯');
          } else if (res.data.success) {
            this.$httpMessageState(res, '新增');
          } else {
            this.$httpMessageState(res, '新增');
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },

    // 開啟刪除 Modal
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      this.$refs.delModal.showModal();
    },

    // 刪除遠端產品
    delProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http
        .delete(api)
        .then((res) => {
          this.getProducts();
          this.$refs.delModal.hideModal();
          this.isLoading = false;
          this.$httpMessageState(res, '刪除');
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
