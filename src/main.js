import { createApp } from 'vue';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 讀取效果
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// VeeValidate套件
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';// 匯入繁體中文語系檔案

// 千分號、日期方法
import { currency, date } from './methods/filters';

// 封裝訊息回饋
import $httpMessageState from './methods/pushMessageState';

// 載入全部 bootstrap
import 'bootstrap';

// 載入 bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import router from './router';

// VeeValidate套件(加入全部規則)
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

// VeeValidate多國語系
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
// VeeValidate
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

// 千分號、日期方法
app.config.globalProperties.$filters = {
  currency,
  date,
};

// axios
app.use(VueAxios, axios);

// 讀取效果
app.component('isLoading', Loading);

// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(router);
app.mount('#app');
