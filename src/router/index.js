import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import indexLayout from '@/indexLayout'

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
export const constantRouterMap = [
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
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    component: indexLayout,
    redirect: '/workList',
    children: [{
      path: '/workList',
      name: 'WorkList',
      component: () => import('@/views/workList/index')
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 根据权限动态去匹配的路由
export const asyncRouterMap = [
  {
    path: '/xcx',
    component: Layout,
    redirect: '/xcx/xcxPush',
    name: 'Xcx',
    alwaysShow: true,
    meta: { title: '小程序', icon: 'xcx' },
    children: [
      {
        path: 'xcxPush',
        name: 'XcxPush',
        component: () => import('@/views/xcxPush/index'),
        meta: { title: '小程序推送', icon: 'push' }
      }
    ]
  },
  {
    path: '/poetry',
    component: Layout,
    redirect: '/poetry/list',
    name: 'Poetry',
    alwaysShow: true,
    meta: { title: '诗词管理', icon: 'xcx' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/poetry/list'),
        meta: { title: '诗词列表', icon: 'push' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'xitong' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'yonghu' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'juese' }
      },
      {
        path: 'access',
        name: 'Access',
        component: () => import('@/views/system/access'),
        meta: { title: '权限管理', icon: 'quanxian' }
      }
    ]
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
