import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
const NotFound = () => import('@/views/404.vue');
/**
 * constantRoutes
 * 不需要权限的数由
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]
// 未找到页面路由
export const noFound = {
  path: '*',
  component: NotFound,
  name: '404',
  hidden: true
};

export const asyncRouterMap = [];

//实例化vue的时候只挂载constantRouterMap
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

/* 重置路由*/
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
