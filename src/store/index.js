import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import role from './modules/role'
import access from './modules/access'
import poetry from './modules/poetry'

import permissionRouters from './modules/permissionRouters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    role,
    access,
    poetry,
    permissionRouters
  },
  getters
})

export default store
