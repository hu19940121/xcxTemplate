import { getRoomList, addRoom, delRoom, updateRoom } from '@/api/room'
const state = {
  roomList: []
}

const mutations = {
  SET_ROOM_LIST: (state, list) => {
    state.roomList = list
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
  getRoomList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoomList().then((res) => {
        commit('SET_ROOM_LIST', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addRoom({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addRoom(params).then((res) => {
        // commit('ADD_ACCESS', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRoom({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      updateRoom(params).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delRoom({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      delRoom(params).then((res) => {
        // commit('DEL_ROLE', index)
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

