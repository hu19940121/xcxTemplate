import { getBankList, addBank, updateBank, deleteBank } from '@/api/answerQuestion'
const state = {
  bankList: [],
  total: 0,
  loading: false
}

const mutations = {
  SET_BANK_LIST: (state, list) => {
    state.bankList = list
  },
  SET_BANK_LIST_TOTAL: (state, number) => {
    state.total = number
  },
  SET_LOADING: (state, status) => {
    state.loading = status
  }
}

const actions = {
  getBankList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)
      getBankList(params).then((res) => {
        commit('SET_LOADING', false)
        commit('SET_BANK_LIST', res.data.data)
        commit('SET_BANK_LIST_TOTAL', res.data.pager.Total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addBank({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addBank(params).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateBank({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      updateBank(params).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteBank({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      deleteBank(params).then((res) => {
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

