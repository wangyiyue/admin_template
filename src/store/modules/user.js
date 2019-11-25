//import { login, logout, getInfo } from '@/api/user'
import { login } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        //请求成功，设置token并将token保存
        if (response.code === 0) {
          commit('SET_TOKEN', response.token);
          setToken(response.token);//登录成功后将token存储在session之中
          resolve(response);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 获取用户信息
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //模拟
      commit('SET_NAME', 'Admin');
      commit('SET_AVATAR', 'http://bhms-fru-dev.oss-cn-shenzhen.aliyuncs.com/farm/1572587608119.gif');
      resolve();
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

