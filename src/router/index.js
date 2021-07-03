/*
 * @Description: 路由js
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2021-05-22 14:40:36
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  /* -------------------人力独立使用 begin ------------------------*/
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index',
  //   name: '人力看板',
  //   meta: {
  //     title: '人力看板', icon: 'shoes'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: '人力(易天)',
  //     component: () => import('@/views/human/index'),
  //     meta: { title: '人力(易天)', icon: 'shoes' }
  //   },
  //   {
  //     path: 'ERPproject',
  //     name: '生产入库报表',
  //     component: () => import('@/views/erpproject/index'),
  //     meta: { title: '生产入库报表', icon: 'shoes' }
  //   }]
  // },
  /* --------------------人力独立使用 end -----------------------  */

  /* -------------------- 生产ERP报表 begin -----------------------  */

  /**
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '生产入库报表',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/erpproject/index'),
      meta: { title: '生产入库报表', icon: 'shoes' }
    }]
  },
  */

  /* --------------------生产ERP报表 end -----------------------  */

  /* -------------------- 江西业绩 begin -----------------------  */

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index',
  //   name: '江西业绩分析',
  //   meta: {
  //     title: '江西业绩分析', icon: 'shoes'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'Kucunyuan',
  //     component: () => import('@/views/kucunyuan/index'),
  //     meta: { title: '库存源', icon: 'shoes' }
  //   }, {
  //     path: 'achievement',
  //     name: 'Achievement',
  //     component: () => import('@/views/kucunyuan/achievement'),
  //     meta: { title: '业绩', icon: 'shoes' }
  //   }]
  // },

  /* -------------------- 江西业绩 end -----------------------  */

  /* -------------------GIC取数报表 begin ------------------------*/

  // {
  //   path: '/',
  //   component: Layout,
  //   name: 'GIC取数报表',
  //   meta: {
  //     title: 'GIC取数报表', icon: 'shoes'
  //   },
  //   redirect: '/gic-analysis',
  //   children: [
  //     {
  //       path: 'gic',
  //       name: 'GIC',
  //       component: () => import('@/views/gic/index'),
  //       meta: { title: 'GIC', icon: 'shoes' }
  //     },
  //     {
  //       path: 'gic-analysis',
  //       name: 'GICANALYSIS',
  //       component: () => import('@/views/gic/gic-analysis'),
  //       meta: { title: 'GIC卡券分析', icon: 'shoes' }
  //     }
  //   ]
  // },

  /* -------------------GIC取数报表 end ------------------------*/

  /* -------------------销售分析独立 begin ------------------------*/

  // {
  //   path: '/',
  //   component: Layout,
  //   name: '销售分析',
  //   meta: {
  //     title: '销售分析', icon: 'shoes'
  //   },
  //   redirect: '/top30',
  //   children: [
  //     {
  //       path: 'top30',
  //       name: '全国日销TOP30',
  //       component: () => import('@/views/sales/top30/index'),
  //       meta: { title: '全国日销TOP30', icon: 'shoes' }
  //     }, {
  //       path: 'storeDayAvg',
  //       name: '系统客户日均单店',
  //       component: () => import('@/views/sales/storeDayAvg/index'),
  //       meta: { title: '系统客户日均单店', icon: 'shoes' }
  //     }, {
  //       path: 'retailShare',
  //       name: '零售占比',
  //       component: () => import('@/views/sales/retailShare/index'),
  //       meta: { title: '零售占比', icon: 'shoes' }
  //     }, {
  //       path: 'inSaleStorage',
  //       name: '进销存',
  //       component: () => import('@/views/sales/inSaleStorage/index'),
  //       meta: { title: '进销存', icon: 'shoes' }
  //     }, {
  //       path: 'layoutStructure',
  //       name: '版面结构',
  //       component: () => import('@/views/sales/layoutStructure/index'),
  //       meta: { title: '版面结构', icon: 'shoes' }
  //     }
  //   ]
  // },

  /* --------------------销售分析独立 end -----------------------  */

  /* -------------------- 经销商套餐分析独立 end -----------------------  */
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '经销商套餐分析',
      component: () => import('@/views/analysis/setmeal/index'),
      meta: { title: '经销商套餐分析', icon: 'shoes' }
    }]
  },
  {
    path: '/setmeal-day',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '当日经销商套餐分析',
      component: () => import('@/views/analysis/setmealDay/index'),
      meta: { title: '当日经销商套餐分析', icon: 'shoes' }
    }]
  },
  {
    path: '/unit-price-customer',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '客单价分析',
      component: () => import('@/views/analysis/unitPriceCustomer/index'),
      meta: { title: '客单价分析', icon: 'shoes' }
    }]
  },

  /* -------------------- 经销商套餐分析独立 end -----------------------  */

  /* -------------------  零售分析独立 begin ------------------------*/

  // {
  //   path: '/',
  //   component: Layout,
  //   // redirect: '/permissionConfig',
  //   // redirect: '/kucunyuan',
  //   redirect: '/dataAnalysis',
  //   name: '数据看板',
  //   meta: {
  //     title: '数据分析', icon: 'shoes'
  //   },
  //   children: [
  //     {
  //       path: 'dataAnalysis',
  //       name: '大数据看板',
  //       component: () => import('@/views/bigData/shoes/index'),
  //       meta: { title: '大数据看板', icon: 'shoes' }
  //     }]
  // },
  // {
  //   path: '/Analysis',
  //   component: Layout,
  //   name: '数据分析',
  //   redirect: '/Analysis/retail',
  //   meta: {
  //     title: '数据分析', icon: 'shoes'
  //   },
  //   children: [{
  //     path: 'retail',
  //     name: '零售分析',
  //     component: () => import('@/views/analysis/retailAnalysis/index'),
  //     meta: { title: '零售分析', icon: 'shoes' }
  //   }, {
  //     path: 'vip',
  //     name: '会员分析',
  //     component: () => import('@/views/analysis/vipAnalysis/index'),
  //     meta: { title: '会员分析', icon: 'shoes' }
  //   }, {
  //     path: 'vipRetail',
  //     name: '购买分析',
  //     component: () => import('@/views/analysis/vipRetailAnalysis/index'),
  //     meta: { title: '会员购买分析', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/vip',
  //   component: Layout,
  //   redirect: '/vip/index',
  //   children: [{
  //     path: 'index',
  //     name: '会员挖掘',
  //     component: () => import('@/views/vip/index'),
  //     meta: { title: '会员挖掘', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/setmeal',
  //   component: Layout,
  //   redirect: '/setmeal/index',
  //   children: [{
  //     path: 'index',
  //     name: '经销商套餐分析',
  //     component: () => import('@/views/analysis/setmeal/index'),
  //     meta: { title: '经销商套餐分析', icon: 'shoes' }
  //   }]
  // },

  /* -------------------- 零售分析独立 end -----------------------  */

  // {
  //   path: '/',
  //   component: Layout,
  //   // redirect: '/permissionConfig',
  //   redirect: '/kucunyuan/achievement',
  //   name: '数据看板',
  //   meta: {
  //     title: '数据分析', icon: 'shoes'
  //   },
  //   children: [
  //     {
  //       path: 'dataAnalysis',
  //       name: '大数据看板',
  //       component: () => import('@/views/bigData/shoes/index'),
  //       meta: { title: '大数据看板', icon: 'shoes' }
  //     }]
  // },
  // {
  //   path: '/kucunyuan',
  //   component: Layout,
  //   redirect: '/kucunyuan/index',
  //   name: '江西业绩分析',
  //   meta: {
  //     title: '江西业绩分析', icon: 'shoes'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'Kucunyuan',
  //     component: () => import('@/views/kucunyuan/index'),
  //     meta: { title: '库存源', icon: 'shoes' }
  //   }, {
  //     path: 'achievement',
  //     name: 'Achievement',
  //     component: () => import('@/views/kucunyuan/achievement'),
  //     meta: { title: '业绩', icon: 'shoes' }
  //   }]
  // },
  // {
  //   path: '/Analysis',
  //   component: Layout,
  //   name: '数据分析',
  //   redirect: '/Analysis/retail',
  //   meta: {
  //     title: '零售分析', icon: 'shoes'
  //   },
  //   children: [{
  //     path: 'retail',
  //     name: '零售分析',
  //     component: () => import('@/views/analysis/retailAnalysis/index'),
  //     meta: { title: '零售分析', icon: 'shoes' }
  //   }, {
  //     path: 'vip',
  //     name: '会员分析',
  //     component: () => import('@/views/analysis/vipAnalysis/index'),
  //     meta: { title: '会员分析', icon: 'shoes' }
  //   }, {
  //     path: 'vipRetail',
  //     name: '购买分析',
  //     component: () => import('@/views/analysis/vipRetailAnalysis/index'),
  //     meta: { title: '会员购买分析', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/sales',
  //   component: Layout,
  //   name: '销售分析',
  //   meta: {
  //     title: '销售分析', icon: 'shoes'
  //   },
  //   redirect: '/sales/top30',
  //   children: [
  //     {
  //       path: 'top30',
  //       name: '全国日销TOP30',
  //       component: () => import('@/views/sales/top30/index'),
  //       meta: { title: '全国日销TOP30', icon: 'shoes' }
  //     }, {
  //       path: 'storeDayAvg',
  //       name: '系统客户日均单店',
  //       component: () => import('@/views/sales/storeDayAvg/index'),
  //       meta: { title: '系统客户日均单店', icon: 'shoes' }
  //     }, {
  //       path: 'retailShare',
  //       name: '零售占比',
  //       component: () => import('@/views/sales/retailShare/index'),
  //       meta: { title: '零售占比', icon: 'shoes' }
  //     }, {
  //       path: 'inSaleStorage',
  //       name: '进销存',
  //       component: () => import('@/views/sales/inSaleStorage/index'),
  //       meta: { title: '进销存', icon: 'shoes' }
  //     }, {
  //       path: 'layoutStructure',
  //       name: '版面结构',
  //       component: () => import('@/views/sales/layoutStructure/index'),
  //       meta: { title: '版面结构', icon: 'shoes' }
  //     }
  //   ]
  // },
  // {
  //   path: '/vip',
  //   component: Layout,
  //   redirect: '/vip/index',
  //   children: [{
  //     path: 'index',
  //     name: '会员挖掘',
  //     component: () => import('@/views/vip/index'),
  //     meta: { title: '会员挖掘', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/permissionConfig',
  //   component: Layout,
  //   redirect: '/permissionConfig/index',
  //   children: [{
  //     path: 'index',
  //     name: '权限配置',
  //     component: () => import('@/views/permissionConfig/index'),
  //     meta: { title: '权限配置', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   redirect: '/tab/index',
  //   children: [{
  //     path: 'index',
  //     name: 'tab',
  //     component: () => import('@/views/tab/index'),
  //     meta: { title: 'tab', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/api-log',
  //   component: Layout,
  //   redirect: '/apiLog/index',
  //   children: [{
  //     path: 'index',
  //     name: 'apiLog',
  //     component: () => import('@/views/apiLog/index'),
  //     meta: { title: '接口日志', icon: 'shoes' }
  //   }]
  // },

  /* -----------------测试时注释掉-----begin---------------------  */

  // {
  //   path: '/human',
  //   component: Layout,
  //   redirect: '/human/index',
  //   children: [{
  //     path: 'index',
  //     name: '人力(易天)',
  //     component: () => import('@/views/human/index'),
  //     meta: { title: '人力(易天)', icon: 'shoes' }
  //   }]
  // },

  // {
  //   path: '/baidu',
  //   component: Layout,
  //   redirect: '/baidu/index',
  //   children: [{
  //     path: 'index',
  //     name: '百度',
  //     component: () => import('@/views/baidu/index'),
  //     meta: { title: '百度', icon: 'shoes' }
  //   }]
  // },
  // {
  //   path: '/gaode',
  //   component: Layout,
  //   redirect: '/gaode/index',
  //   children: [{
  //     path: 'index',
  //     name: '高德',
  //     component: () => import('@/views/gaode/index'),
  //     meta: { title: '高德', icon: 'shoes' }
  //   }]
  // },
  // {
  //   path: '/map',
  //   component: Layout,
  //   redirect: '/map/china',
  //   children: [{
  //     path: 'china',
  //     name: '看板',
  //     component: () => import('@/views/map/index'),
  //     meta: { title: '看板', icon: 'shoes' }
  //   }]
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/index',
  //   children: [{
  //     path: 'test',
  //     name: '测试',
  //     component: () => import('@/views/test/index'),
  //     meta: { title: '测试', icon: 'shoes' }
  //   }]
  // },

  /* -----------------测试时注释掉-----end---------------------  */

  /* -------------------------------------------  */
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/complex-table',
  //   name: 'Table',
  //   meta: {
  //     title: 'Table',
  //     icon: 'table'
  //   },
  //   children: [
  //     {
  //       path: 'complex-table',
  //       component: () => import('@/views/table/complex-table'),
  //       name: 'ComplexTable',
  //       meta: { title: 'Complex Table' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
