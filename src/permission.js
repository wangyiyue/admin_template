import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      store.dispatch('user/getUserInfo').then( response =>{
        store.dispatch('permission/GenerateRoutes').then( response =>{
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next(); //执行下一步
        })
      }).catch( () => {
        /*store.dispatch('user/LogOut').then(() => {
            Message.error('验证失败,请重新登录');
            next({ path: '/login' });
        });*/
      });
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {

})
