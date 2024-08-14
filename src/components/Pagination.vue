<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 上一頁 -->
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 顯示頁數、點擊可切換 -->
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
    },
    previousPage() {
      if (this.pages.current_page > 1) {
        this.updatePage(this.pages.current_page - 1);
      }
    },
    nextPage() {
      if (this.pages.current_page < this.pages.total_pages) {
        this.updatePage(this.pages.current_page + 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: black;
  &:focus {
    box-shadow: 0px 0px 5px #666666;
  }
  &:hover {
    color: black;
  }
}
.page-item.active .page-link {
  background-color: #666666;
  border-color: #666666;
  color: #fff;
}
</style>
