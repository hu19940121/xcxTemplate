import { getAccessList, addAccess, delAccess, updateAccess } from '@/api/access'
const state = {
  accessList: []
}

const mutations = {
  SET_ACCESS_LIST: (state, list) => {
    state.accessList = list
  }
  // ADD_ACCESS: (state, accessItem) => {
  //   state.accessList.push(accessItem)
  // }
  // DEL_ROLE: (state, index) => {
  //   state.roleList.splice(index, 1)
  // },
  // UPDATE_ROLE: (state, updatedData) => {
  //   let updatedPosition
  //   const newList = state.roleList.filter((role, index) => {
  //     if (role.id === updatedData.id) {
  //       updatedPosition = index
  //     }
  //     return role.id !== updatedData.id
  //   })
  //   newList.splice(updatedPosition, 0, updatedData)
  //   state.roleList = newList
  // }
}

const actions = {
  getAccessList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAccessList().then((res) => {
        commit('SET_ACCESS_LIST', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addAccess({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addAccess(params).then((res) => {
        // commit('ADD_ACCESS', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateAccess({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      updateAccess(params).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delAccess({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      delAccess(params).then((res) => {
        // commit('DEL_ROLE', index)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // updateRole({ commit, state }, params) {
  //   return new Promise((resolve, reject) => {
  //     updateRole(params).then((res) => {
  //       commit('UPDATE_ROLE', res.data)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

