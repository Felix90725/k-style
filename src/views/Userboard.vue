<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid position-relative">
    <ToastMessages></ToastMessages>
  </div>
  <router-view/>
  <UserFooter></UserFooter>
</template>

<script>
import emitter from '@/methods/emitter';
import UserNavbar from '../components/UserNavbar.vue';
import UserFooter from '../components/UserFooter.vue';
import ToastMessages from '../components/ToastMessages.vue';

export default {
  components: {
    UserNavbar,
    UserFooter,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
