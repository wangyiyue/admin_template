import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';//pc 或者 移动端
import settings from './modules/settings'; //设置
import user from './modules/user';//用户信息
import permission from './modules/permission';//权限

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters
})

export default store
