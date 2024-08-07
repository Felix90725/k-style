<template>
  <Swiper
    :slidesPerView="1"
    :breakpoints="{
      1400: { slidesPerView: 4 },
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
    }"
    :spaceBetween="5"
    :pagination="{ clickable: true }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :modules="modules"
  >
    // 在 swiper-slide 裡面放入要呈現的圖片和標題，每個 swiper-slide 都是獨立的區塊
    <swiper-slide v-for="item in product" :key="item.id" class="mt-3">
      <div class="swiper-card mb-4">
        <a href="#" class="text-dark text-decoration-none" @click.prevent="getProduct(item.id)">
          <img :src="item.imageUrl" alt="item.title" />
          <div class="swiper-text p-3">
            <h5 class="mb-1">{{ item.title }}</h5>
            <span class="text-dark" v-if="item.origin_price === item.price">
              NT${{ $filters.currency(item.origin_price) }}
            </span>
            <span v-else>
              <span class="text-dark text-decoration-line-through" v-if="item.price">
                NT${{ $filters.currency(item.origin_price) }}
              </span>
              <span class="text-danger ms-1" v-if="item.price">
                NT${{ $filters.currency(item.price) }}</span>
            </span>
          </div>
        </a>
      </div>
    </swiper-slide>
  </Swiper>
</template>
<script>
// import Swiper js
import { Swiper, SwiperSlide } from 'swiper/vue';
// Swiper 10 這樣寫 ↓
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper stylesimport 'swiper/css'
import 'swiper/swiper-bundle.css';

export default {
  props: ['product'],
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation], // 額外引入的 modules
    };
  },
  methods: {
    // 前往單一商品頁面
    getProduct(id) {
      this.$router.push(`/product/${id}`).then(() => {
        this.$router.go(0); // 刷新頁面
      });
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}

.swiper-card {
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
  a {
    img {
      width: 300px;
      height: 350px;
      object-fit: cover;
      background-position: center;
    }
    .swiper-text {
      h3 {
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
      }
    }
  }
}
</style>
