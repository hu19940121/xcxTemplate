import { getQiniuToken } from '@/api/qiniu'
const state = {
  token: {}
}

const mutations = {
  SET_TOKEN: (state, tokenInfo) => {
    state.token = tokenInfo
  }
}

const actions = {
  getQiniuToken({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getQiniuToken().then((res) => {
        console.log(res.data)

        commit('SET_TOKEN', res.data)
        resolve()
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

