import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    console.log('value', value)

    const btnAccessList = store.getters && store.getters.btnAccessList
    if (value) {
      const permissionBtn = value
      const hasPermission = btnAccessList.includes(permissionBtn)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need btnAccess! Like v-permission="/access/add"`)
    }
  }
}
