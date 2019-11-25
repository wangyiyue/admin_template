import { asyncRouterMap, constantRouterMap } from '@/router'
import { getNavList } from '@/api/system';
import Layout from '@/layout'

function filterAsyncRouter(asyncRouterMap,data) {
  data.forEach( element =>{
    let menu = {
      path:element.url ? element.url : '',
      icon:'',
      index:String(element.menuId),
      component:!element.url ? Layout: resolve => require(["@/views" + data.url + ".vue"], resolve),
      children: [],
      title: element.name,
      meta: { title: element.name,icon:element.icon }
    }
    if (element.list) {
      filterAsyncRouter(menu.children, element.list);
    }
    asyncRouterMap.push(menu)
  })
  return asyncRouterMap;
}
const state = {
  routers: constantRouterMap,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {  //保存动态路由时 将静态路由和动态路由合并
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers);
    console.log(state.routers)
  }
}

const actions = {
  GenerateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getNavList(Number(0)).then( response =>{
        let accessedRouters;
        if(response.code == 0) {
          localStorage.setItem('menuList',JSON.stringify(response.menuList));
          accessedRouters = filterAsyncRouter(asyncRouterMap, response.menuList);
          commit('SET_ROUTERS', accessedRouters);  //保存路由
          resolve(accessedRouters);
        }else{
          resolve()
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
