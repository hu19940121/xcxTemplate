import { getPoetryList } from '@/api/poetry'
const state = {
  poetryList: []
}

const mutations = {
  SET_POETRY_LIST: (state, list) => {
    state.poetryList = list
  }
}

const actions = {
  getPoetryList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getPoetryList(params).then((res) => {
        commit('SET_POETRY_LIST', res.data.data)
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

