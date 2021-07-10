import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      keepAlive: true  //控制主页菜单是否显示
    }
  },
  {
    path: '/xianhua',
    name: 'Xianhua',
    component: () => import('../views/ShowGoods.vue')
  },
  {
    path: '/order',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/Details.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      requireAuth: true,  // 进入这个路由是需要登录的
    },
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      requireAuth: true,  // 进入这个路由是需要登录的
    },
    component: () => import('../views/User.vue'),
    redirect: '/user/portal',
    children: [
      {
        path: '/user/portal',
        name: 'Id',
        component: () => import('../components/PersonalCenter/UserInfo.vue'),
      },
      {
        path: '/user/address',
        name: 'Address',
        component: () => import('../components/PersonalCenter/Address.vue'),
      },
      {
        path: '/user/ordercenter',
        name: 'OrderCenter',
        component: () => import('../components/PersonalCenter/orderCenter.vue')
      },
      {
        path: '/user/orderdetails',
        name: 'OrderDetails',
        component: () => import('../components/PersonalCenter/orderDetails.vue')
      },
      {
        path: '/user/changeinfo',
        name: 'ChangeInfo',
        component: () => import('../components/PersonalCenter/ChangeInfo.vue')
      },
      {
        path: '/user/changepassword',
        name: 'ChangePassword',
        component: () => import('../components/PersonalCenter/ChangePassword.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
  // chrome 新页面置顶
  document.body.scrollTop = 0
  // firefox 新页面置顶
  document.documentElement.scrollTop = 0
  // safari 新页面置顶
  window.pageYOffset = 0
})

export default router
