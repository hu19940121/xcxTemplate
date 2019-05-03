import { getRoleList, addRole, delRole, updateRole, getRoleAccess } from '@/api/role'
const state = {
  roleList: []
}

const mutations = {
  SET_ROLE_LIST: (state, list) => {
    state.roleList = list
  },
  ADD_ROLE: (state, roleItem) => {
    state.roleList.push(roleItem)
  },
  DEL_ROLE: (state, index) => {
    state.roleList.splice(index, 1)
  },
  UPDATE_ROLE: (state, updatedData) => {
    let updatedPosition
    const newList = state.roleList.filter((role, index) => {
      if (role.id === updatedData.id) {
        updatedPosition = index
      }
      return role.id !== updatedData.id
    })
    newList.splice(updatedPosition, 0, updatedData)
    state.roleList = newList
  }
}

const actions = {
  getRoleList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoleList().then((res) => {
        commit('SET_ROLE_LIST', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addRole({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addRole(params).then((res) => {
        commit('ADD_ROLE', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delRole({ commit, state }, { params, index }) {
    return new Promise((resolve, reject) => {
      delRole(params).then((res) => {
        commit('DEL_ROLE', index)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRole({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      updateRole(params).then((res) => {
        commit('UPDATE_ROLE', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据roleId获取权限
  getRoleAccess({ commit, state }, params) {
    console.log('params', params)

    return new Promise((resolve, reject) => {
      getRoleAccess(params).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
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

