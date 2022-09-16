import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
  path: '/login',
  component: () => import('@/pages/login/index'),
  hidden: true
},
// 404找不到网页
{
  path: '/404',
  component: () => import('@/pages/404'),
  hidden: true
},
// 首页报表
{
  path: '/',
  component: Layout,
  meta: {
    title: '数据盘点',
    icon: 'dashboard'
  },
  redirect: '/home',
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/pages/home/index'),
    meta: {
      title: '首页',
      icon: 'example'
    }
  },
  {
    path: 'Dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/home/home'),
    meta: {
      title: '统计分析',
      icon: 'el-icon-s-check'
    }
  },
  ]
},

// 客户信息管理
{
  path: '/customers',
  redirect: '/customers/customerList',
  component: Layout,
  name: 'customers',
  meta: {
    title: '客户信息管理',
    icon: 'el-icon-user-solid'
  },
  children: [{
    path: 'customerList',
    name: 'customer',
    component: () => import('@/pages/customers/customerList'),
    meta: {
      title: '客户信息列表',
      icon: 'el-icon-s-custom'
    },
  },
  {
    path: 'customerAdd',
    name: 'customerAdd',
    component: () => import('@/pages/customers/customerAdd'),
    meta: {
      title: '新增客户',
      icon: 'el-icon-s-check'
    }
  },
  {
    path: 'customerEdit',
    name: 'customerEdit',
    component: () => import('@/pages/customers/customerEdit'),
    meta: {
      title: '客户信息编辑',
    },
    hidden: true,
  },
  {
    path: 'cardDetail',
    name: 'cardDetail',
    component: () => import('@/pages/customers/cardDetail'),
    meta: {
      title: '银行卡明细',
    },
    hidden: true,
  },

  ]
},

// 人员信息管理
{
  path: '/staff',
  redirect: '/staff/staffList',
  component: Layout,
  name: 'staffs',
  meta: {
    title: '人员信息管理',
    icon: 'el-icon-user-solid'
  },
  children: [{
    path: 'staffList',
    name: 'staff',
    component: () => import('@/pages/staff/staffList'),
    meta: {
      title: '人员信息列表',
      icon: 'el-icon-s-custom'
    },
  },
  {
    path: 'staffAdd',
    name: 'staffAdd',
    component: () => import('@/pages/staff/staffAdd'),
    meta: {
      title: '新增人员',
      icon: 'el-icon-s-check'
    }
  },
  {
    path: 'staffEdit',
    name: 'staffEdit',
    component: () => import('@/pages/staff/staffEdit'),
    meta: {
      title: '人员信息编辑',
    },
    hidden: true,
  },
  ]
},

// 机构信息设置
{
  path: '/configuration',
  component: Layout,
  children: [{
    path: 'index',
    name: 'configuration',
    component: () => import('@/pages/configuration/index'),
    meta: {
      title: '机构参数配置',
      icon: 'el-icon-setting'
    }
  }]
},

// 个人信息设置
{
  path: '/setting',
  component: Layout,
  children: [{
    path: 'index',
    name: 'setting',
    component: () => import('@/pages/setting/index'),
    meta: {
      title: '个人信息设置',
      icon: 'el-icon-setting'
    }
  }]
},
// 其他404
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// 路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     next();
//   } else {
//     if (sessionStorage.getItem('user')) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// })
export default router
