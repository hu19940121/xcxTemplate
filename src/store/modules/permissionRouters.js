
import { asyncRouterMap, constantRouterMap } from '@/router'
function recursionRouter(userRouter = [], allRouter = []) {
  var realRoutes = []
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.path === v.path) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}
const permissionRouters = {
  state: {
    routers: constantRouterMap, // 一开始就有的路由 所有人都有权限
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 根据某个值动态添加的router
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ dispatch, commit }, userInfo) { // 根据userInfo 去动态生成路由
      return new Promise(resolve => {
        let finalRouters
        if (userInfo.is_super) { // 如果是最大权限者
          finalRouters = asyncRouterMap
        } else {
          finalRouters = recursionRouter(userInfo.accessList, asyncRouterMap) // 根据权限列表去生城应有的路由
        }
        commit('SET_ROUTERS', finalRouters)
        resolve(finalRouters)
      })
    }
  }
}
export default permissionRouters
