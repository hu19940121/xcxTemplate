import { getMusicList, addMusic, updateMusic } from '@/api/music'
const state = {
  musicList: [],
  total: 0,
  loading: false
}

const mutations = {
  SET_MUSIC_LIST: (state, list) => {
    state.musicList = list
  },
  SET_MUSIC_LIST_TOTAL: (state, number) => {
    state.total = number
  },
  SET_MUSIC_LOADING: (state, status) => {
    state.loading = status
  }
}

const actions = {
  getMusicList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_MUSIC_LOADING', true)
      getMusicList(params).then((res) => {
        commit('SET_MUSIC_LOADING', false)
        commit('SET_MUSIC_LIST', res.data.list)
        commit('SET_MUSIC_LIST_TOTAL', res.data.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addMusic({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addMusic(params).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateMusic({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      updateMusic(params).then((res) => {
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

