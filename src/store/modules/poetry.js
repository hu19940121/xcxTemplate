import { getPoetryList, addPoetry } from '@/api/poetry'
const state = {
  poetryList: [],
  total: 0,
  loading: false
}

const mutations = {
  SET_POETRY_LIST: (state, list) => {
    state.poetryList = list
  },
  SET_POETRY_LIST_TOTAL: (state, number) => {
    state.total = number
  },
  SET_POETRY_LOADING: (state, status) => {
    state.loading = status
  }
}

const actions = {
  getPoetryList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_POETRY_LOADING', true)
      getPoetryList(params).then((res) => {
        commit('SET_POETRY_LOADING', false)
        commit('SET_POETRY_LIST', res.data.data)
        commit('SET_POETRY_LIST_TOTAL', res.data.pager.Total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addPoetry({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addPoetry(params).then((res) => {
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

