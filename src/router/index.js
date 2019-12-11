import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 *  这里的路由分为两种，constantRoutes(不需要权限) 和 asyncRoutes(需要权限)。
 */
import { constantRouterMap } from './constantRouterMap';


//实例化vue的时候只挂载constantRouterMap
const createRouter = () => new Router({
  mode: 'history', // require service support
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
