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
      meta: { title: '首页', icon: 'home' }
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
