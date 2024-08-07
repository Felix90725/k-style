<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vuejs-accessibility/no-autofocus -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <!-- 暫時用user-navbar -->
  <isLoading :active="isLoading"></isLoading>
  <UserNavbar></UserNavbar>
  <!-- 下方表單 -->
  <div class="kv">
    <div class="container h-100">
      <form class="row justify-content-center align-content-center h-100" @submit.prevent="signIn">
        <div class="login col-md-5 p-5 border border-5 border-white rounded text-white">
          <h2 class="h3 mb-3 font-weight-normal text-center border-bottom pb-3">管理員登入</h2>
          <div class="alert alert-danger d-block" role="alert" v-if="!loginError">登入失敗</div>
          <div class="mb-3">
            <label for="inputEmail" class="my-2">Email</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="請輸入電子郵件"
              required
              autofocus
              v-model="user.username"
            />
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="my-2">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="請輸入密碼"
              required
              v-model="user.password"
            />
          </div>

          <div class="text-end mt-4">
            <button class="btn text-white mt-2" type="submit">登入</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserNavbar from '@/components/UserNavbar.vue';

export default {
  components: {
    UserNavbar,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loginError: true,
      isLoading: false,
    };
  },
  methods: {
    // 登入
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.isLoading = true;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/backstage/control');
        }
        this.user.password = '';
        this.loginError = false;
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.kv {
  height: 93.9vh;
  background-image: url("../assets/img/login2.0.jpg");
  background-size: cover;
  .login {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 30px #666666;
    backdrop-filter: blur(5px);
    input:focus {
      box-shadow: 0px 0px 6px #666666;
    }
  }
  button {
    background-color: #6ab4fe;
    &:hover {
      background-color: #2f59ce;
    }
  }
}
</style>
