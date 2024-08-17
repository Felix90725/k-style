<template>
  <div class="bg-dark text-light py-4">
    <div class="container">
      <div class="top d-flex align-content-center justify-content-between
      text-white mb-mb-7 mb-md-5 my-3 mt-0">
        <a href="#" class="logo text-white text-decoration-none h4">K-style</a>
        <ul class="d-flex align-items-center list-unstyled h4 mb-0">
          <li class="px-3">
            <router-link to="" href="https://www.facebook.com" target="_blank" class="text-white">
              <i class="fa-brands fa-facebook"></i>
            </router-link>
          </li>
          <li class="px-3">
            <router-link to="" href="https://www.instagram.com/" target="_blank" class="text-white">
              <i class="fa-brands fa-instagram"></i>
            </router-link>
          </li>
          <li class="px-3">
            <router-link to="" href="https://github.com/" target="_blank" class="text-white">
              <i class="fa-brands fa-github"></i>
            </router-link>
          </li>
          <li class="px-3">
            <router-link to=""
              href="https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bprofile%2Bfriends%2Bgroups%2Btimeline.post%2Bmessage.write%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fsocial-plugins.line.me%252Fwidget%252FloginCallback%253FreturnUrl%253Dhttps%25253A%25252F%25252Fsocial-plugins.line.me%25252Fwidget%25252Fclose%26state%3D9fec98665820574ebc349f47d089a6%26client_id%3D1446101138&loginChannelId=1446101138#/"
              target="_blank"
              class="text-white"
            >
              <i class="fa-brands fa-line"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <div
        class="d-flex flex-column flex-md-row justify-content-between"
      >
        <div class="mb-md-0 mb-3">
          <h5 class="m-0 mb-md-1">聯絡我們：</h5>
          <p class="mb-0">02-3456-7890</p>
          <p class="mb-md-0">service@gmail.com</p>
        </div>
        <div class="mb-md-0 mb-0 d-md-flex align-items-end justify-content-end order-1 order-md-0">
          <p class="mb-0">© 2024 Yan-Fu Lin. All Rights Reserved.</p>
        </div>
        <div class="mb-md-0 d-flex flex-column justify-content-end order-0 order-md-1">
          <h5 class="mb-0" style="font-size: 16px;">
            <router-link to="/login" class="backLogin text-light text-decoration-none">管理員登入
              <i class="fa-solid fa-arrow-right"></i>
            </router-link>
          </h5>
          <p class="m-0">此網頁為學習使用，不做任何商業用途。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-size: 25px;
}
.backLogin{
  &:hover{
    border-bottom: 1px solid white;
  }
}
@media screen and (max-width: 991px) {
  p{
    font-size: 14px;
  }
}
@media screen and (max-width: 767px) {
  p{
    font-size: 16px;
  }
  .top{
    border-bottom: 1px solid white;
    padding-bottom: 10px;
  }
}
</style>
