<template>
  <div class="toast-container position-fixed translate-middles">
    <Toast class="mb-2 rounded-0" v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      console.log(this.messages);
    });
  },
};
</script>

<style lang="scss" scoped>
  .toast-container{
    right: 20px;
    top: 80px;
  }
</style>
