import router from './index'
import store from '../store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/util' // 获取token
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login'] // 白名单

var flag = 0;//解决刷新后页面空白的问题
router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 如果有token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (flag == 0){
        store.dispatch('user/getUserInfo').then( response =>{
          store.dispatch('permission/GenerateRoutes').then( response =>{
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            flag ++ ;
            next({ ...to, replace: true })
          })
        }).catch( () => {
          store.dispatch('user/LogOut').then(() => {
            Message.error('验证失败,请重新登录');
            next({ path: '/login' });
          });
        });
      }else{
        next()
      }
    }
  } else {
    /* 没有token */
    if (whiteList.indexOf(to.path) !== -1) { //在免登录白名单，直接进入
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {

})
