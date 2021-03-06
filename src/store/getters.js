const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  formIds: state => state.user.formIds,
  userList: state => state.user.userList,
  roleList: state => state.role.roleList,
  accessList: state => state.access.accessList,
  routers: state => state.permissionRouters.routers,
  addRouters: state => state.permissionRouters.addRouters,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  btnAccessList: state => state.permissionRouters.btnAccessList,
  roomList: state => state.room.roomList

}
export default getters
