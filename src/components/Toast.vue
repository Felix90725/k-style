<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header rounded-0 text-white border-0" :class="`bg-${msg.style}`">
      <i class="fa-solid fa-triangle-exclamation me-2 fa-flip"
      v-if="msg.style === 'warning'" style="--fa-animation-duration: 2s;"></i>
      <i class="fa-solid fa-check me-2" v-else-if="msg.style === 'success'"></i>
      <i class="fa-solid fa-xmark me-2" v-else-if="msg.style === 'danger'"></i>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body rounded-0" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: ['msg'],
  mounted() {
    const toastE1 = this.$refs.toast;
    const toast = new Toast(toastE1, {
      delay: 2000,
    });
    toast.show();
    console.log(this.msg);
  },
};
</script>
