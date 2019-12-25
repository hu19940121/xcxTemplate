import Vue from 'vue'
import moment from 'moment'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from './lang' // internationalization

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
// Vue.use(ElementUI, { locale })

Vue.use(ElementUI, {
  // size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  dataStr = typeof (dataStr) === 'string' ? parseInt(dataStr) : dataStr
  return moment(dataStr).format(pattern)
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
