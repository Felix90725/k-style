import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 使用者介面
  {
    path: '/',
    name: 'userBoard',
    component: () => import('../views/frontend/Userboard.vue'),
    children: [
      {
        path: '',
        name: 'userHome',
        component: () => import('../views/frontend/UserHome.vue'),
      },
      {
        path: 'userAllProducts',
        name: 'userAllProducts',
        component: () => import('../views/frontend/UserAllProducts.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/frontend/UserProduct.vue'),
      },
      {
        path: 'userCart',
        component: () => import('../views/frontend/UserCart.vue'),
      },
      {
        path: 'userLike',
        component: () => import('../views/frontend/UserLike.vue'),
      },
      {
        path: 'userDetail',
        component: () => import('../views/frontend/UserDetail.vue'),
      },
      {
        path: 'userPay/:order_id',
        component: () => import('../views/frontend/UserPay.vue'),
      },
      {
        path: 'userFinish',
        component: () => import('../views/frontend/UserFinish.vue'),
      },
      {
        path: 'userCheck',
        component: () => import('../views/frontend/UserCheck.vue'),
      },
      {
        path: 'userCheckOrder/:email_id',
        component: () => import('../views/frontend/UserCheckOrder.vue'),
      },

    ],
  },
  // 登入
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/backend/Login.vue'),
  },
  // 後台介面
  {
    path: '/backstage',
    name: 'backstage',
    component: () => import('../views/backend/Backstage.vue'),
    children: [
      {
        path: 'control',
        name: 'control',
        component: () => import('../views/backend/Control.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
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
