import Vue from 'vue'
import moment from 'moment'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */
const dateformat = (dataStr) => {
  return moment(dataStr).format('YYYY-MM-DD HH:mm:ss')
}
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
Vue.prototype.$dateformat = dateformat
Vue.prototype.$deepCopy = deepCopy

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  dataStr = typeof (dataStr) === 'string' ? parseInt(dataStr) : dataStr
  return moment(dataStr).format(pattern)
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
