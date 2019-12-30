import Vue from 'vue'
import 'normalize.css/normalize.css' // 重置css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全局css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // 图标
import '@/router/permission' // 权限

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
