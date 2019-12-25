import { login, logout, getInfo, getFormIds, xcxPush, getUserList, updateUser, codeLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  formIds: [],
  userList: []
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
  },
  SET_FORM_IDS: (state, formIds) => {
    state.formIds = formIds
  },
  SET_USER_LIST: (state, list) => {
    state.userList = list
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { phone, password } = userInfo
    console.log(' phone, password', phone, password)
    return new Promise((resolve, reject) => {
      login({ phone: phone.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  codeLogin({ commit }, userInfo) {
    const { phone, code } = userInfo
    console.log(' phone, password', phone, code)
    return new Promise((resolve, reject) => {
      codeLogin({ phone: phone.trim(), code: code }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { nickName, avatarUrl } = data
        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatarUrl)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getFormIds({ commit, state }) {
    return new Promise((resolve, reject) => {
      getFormIds().then((res) => {
        commit('SET_FORM_IDS', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserList().then((res) => {
        commit('SET_USER_LIST', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateUser({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      updateUser(data).then((res) => {
        // commit('SET_USER_LIST', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  xcxPush({ commit }, pushData) {
    return new Promise((resolve, reject) => {
      xcxPush(pushData).then((res) => {
        resolve(res)
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

