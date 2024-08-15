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
          <h5 class="modal-title" id="exampleModalLabel">
            <span class="me-3">新增產品</span>
          </h5>
          <span><em>( * 為必填項目)</em></span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label d-block"
                  >輸入圖片網址
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </label>
              </div>

              <div class="mb-3">
                <label for="customFile" class="form-label d-block"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                  <input
                    type="file"
                    id="customFile"
                    class="img-input form-control mt-1"
                    ref="fileInput"
                    @change="uploadFile"
                  />
                </label>
              </div>
              <img class="img-fluid" alt="" />
            </div>

            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label d-block"
                  >標題 *
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </label>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label d-block"
                    >分類 *
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label d-block"
                    >單位 *
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </label>
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label d-block"
                    >原價 *
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model.number="tempProduct.origin_price"
                    />
                  </label>
                </div>
                <div class="mb-4 col-md-6">
                  <label for="price" class="form-label d-block"
                    >售價 *
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model.number="tempProduct.price"
                    />
                  </label>
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="description" class="form-label d-block"
                    >尺寸
                    <textarea
                      type="text"
                      class="form-control mt-1"
                      id="description"
                      placeholder="請輸入產品尺寸"
                      v-model="tempProduct.size"
                    ></textarea>
                  </label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="description" class="form-label d-block"
                    >模特穿著尺寸
                    <textarea
                      type="text"
                      class="form-control mt-1"
                      id="description"
                      placeholder="請輸入模特穿著尺寸"
                      v-model="tempProduct.model_size"
                    ></textarea>
                  </label>
                </div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label d-block"
                  >產品描述
                  <textarea
                    type="text"
                    class="form-control mt-1"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </label>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label d-block"
                  >說明內容
                  <textarea
                    type="text"
                    class="form-control mt-1"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </label>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <label class="form-check-label" for="is_enabled">
                    <input
                      class="inputUse form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                    />
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-warning">
          <button type="button" class="cancel btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
          >
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
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  methods: {
    // 上傳圖片
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(api, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
  },
  // 整合相同程式碼
  mixins: [modalMixin],
};
</script>

<style lang="scss" scoped>
.img-input {
  border: 1px solid #888888;
}
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
textarea {
  border: 1px solid #888888;
  border-radius: 3px;
  box-shadow: 0;
  &:focus {
    border: 1px solid #888888;
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
