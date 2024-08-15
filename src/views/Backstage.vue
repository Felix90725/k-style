<template>
  <div class="container-fluid p-0">
    <div class="row g-0">
      <div class="col-12 col-lg-2">
        <BackNavbar></BackNavbar>
      </div>
      <div class="col-12 col-lg-10 p-4">
        <ToastMessages style="top: 60px"></ToastMessages>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import BackNavbar from '../components/BackNavbar.vue';
import ToastMessages from '../components/ToastMessages.vue';

export default {
  components: {
    BackNavbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'); // 取出 token(在MDN文件)
    this.$http.defaults.headers.common.Authorization = token; // 把 token 夾帶在 headers 裡面
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http
      .post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      })
      .catch((err) => {
        this.$httpMessageState(err, '連線錯誤，請再試一次');
      });
  },
};
</script>
