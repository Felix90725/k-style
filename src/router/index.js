import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 使用者介面
  {
    path: '/',
    name: 'userBoard',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: '',
        name: 'userHome',
        component: () => import('../views/UserHome.vue'),
      },
      {
        path: 'userAllProducts',
        name: 'userAllProducts',
        component: () => import('../views/UserAllProducts.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'userCart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'userLike',
        component: () => import('../views/UserLike.vue'),
      },
      {
        path: 'userDetail',
        component: () => import('../views/UserDetail.vue'),
      },
      {
        path: 'userPay/:order_id',
        component: () => import('../views/UserPay.vue'),
      },
      {
        path: 'userFinish',
        component: () => import('../views/UserFinish.vue'),
      },
      {
        path: 'userCheck',
        component: () => import('../views/UserCheck.vue'),
      },
      {
        path: 'userCheckOrder/:email_id',
        component: () => import('../views/UserCheckOrder.vue'),
      },

    ],
  },
  // 登入
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  // 後台介面
  {
    path: '/backstage',
    name: 'backstage',
    component: () => import('../views/Backstage.vue'),
    children: [
      {
        path: 'control',
        name: 'control',
        component: () => import('../views/Control.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/Coupons.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
