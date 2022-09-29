import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 管理员路由
export const adminRoutes = [
  // 客户信息管理
  {
    path: '/customers',
    redirect: '/customers/customerList',
    component: Layout,
    name: 'customers',
    meta: {
      title: '客户信息管理',
      icon: 'el-icon-s-custom'
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
        icon: 'el-icon-coordinate'
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
        icon: 'el-icon-user'
      },
    },
    {
      path: 'staffAdd',
      name: 'staffAdd',
      component: () => import('@/pages/staff/staffAdd'),
      meta: {
        title: '新增人员',
        icon: 'el-icon-plus'
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
        icon: 'el-icon-office-building'
      }
    }]
  },
]
// 普通用户路由
export const userRoutes = [
  // 叫号服务
  {
    path: '/makeCall',
    component: Layout,
    meta: {
      title: '叫号服务',
      icon: 'el-icon-message-solid'
    },
    children: [{
      path: 'index',
      name: 'makeCall',
      component: () => import('@/pages/makeCall/index'),
      meta: {
        title: '叫号服务',
        icon: 'el-icon-bell'
      }
    },
    {
      path: 'menu2',
      name: 'menu2',
      component: () => import('@/pages/makeCall/menu2'),
      meta: {
        title: '备用',
        icon: 'el-icon-date'
      }
    },

    ]
  },
  // 预约服务
  {
    path: '/appointment',
    component: Layout,
    meta: {
      title: '预约服务',
      icon: 'el-icon-date'
    },
    children: [{
      path: 'index',
      name: 'appointment',
      component: () => import('@/pages/appointment/index'),
      meta: {
        title: '预约服务',
        icon: 'el-icon-date'
      }
    }]
  },
  // 基金交易
  {
    path: '/fundTrade',
    redirect: '/fundTrade/fundList',
    component: Layout,
    name: 'fundTrade',
    meta: {
      title: '基金交易',
      icon: 'el-icon-coin'
    },
    children: [{
      path: 'fundList',
      name: 'fundList',
      component: () => import('@/pages/fundTrade/fundList'),
      meta: {
        title: '基金列表',
        icon: 'el-icon-s-marketing'
      },
    },
    {
      path: 'fundPurchase',
      name: 'fundPurchase',
      component: () => import('@/pages/fundTrade/fundPurchase'),
      meta: {
        title: '购买基金',
        icon: 'el-icon-shopping-cart-2'
      }
    },
    {
      path: 'fundDetail',
      name: 'fundDetail',
      component: () => import('@/pages/fundTrade/fundDetail'),
      meta: {
        title: '基金详情',
      },
      hidden: true,
    },
    {
      path: 'backInfo',
      name: 'backInfo',
      component: () => import('@/pages/fundTrade/backInfo'),
      meta: {
        title: '购买成功',
      },
      hidden: true,
    },
    ]
  },
  // 个人账户管理
  {
    path: '/myAccount',
    redirect: '/myAccount/accountList',
    component: Layout,
    name: 'myAccount',
    meta: {
      title: '我的账户',
      icon: 'el-icon-house'
    },
    children: [{
      path: 'accountList',
      name: 'accountList',
      component: () => import('@/pages/myAccount/accountList'),
      meta: {
        title: '账户信息',
        icon: 'el-icon-monitor'
      },
    },
    {
      path: 'transfer',
      name: 'transfer',
      component: () => import('@/pages/myAccount/transfer'),
      meta: {
        title: '转账业务',
        icon: 'el-icon-data-analysis'
      }
    },
    {
      path: 'myFundList',
      name: 'myFundList',
      component: () => import('@/pages/myAccount/myFundList'),
      meta: {
        title: '我的基金',
        icon: 'el-icon-s-ticket'
      }
    }
    ]
  },
]

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
    title: '首页',
    icon: 'dashboard'
  },
  redirect: '/home',
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/pages/home/index'),
    meta: {
      title: '数据盘点',
      icon: 'el-icon-pie-chart'
    }
  },
  ]
},
...adminRoutes,
...userRoutes,
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
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
var getRoute = 0;
// 路由守卫
router.beforeEach((to, from, next) => {
  // resetRouter();
  // let p = JSON.parse(localStorage.getItem("user"));
  // if (p.role == '1') {
  //   // 左侧菜单组件中的路由是根据this.$router.options.routes来渲染的
  //   router.addRoutes(adminRoutes);
  //   router.options.routes = router.options.routes.concat(adminRoutes)
  //   console.log(router);
  // } else if (p.role == '2') {
  //   router.addRoutes(userRoutes);
  //   router.options.routes = router.options.routes.concat(userRoutes)
  //   console.log(router);
  // }
  if (to.path == '/login') {
    next();
  } else {
    console.log(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user')) {
      next();
    } else {
      next('/login');
    }
  }
})

export default router
