import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/api/v1/role/list',
    method: 'get'
  })
}
export function addRole(data) {
  return request({
    url: '/api/v1/role/add',
    method: 'post',
    data
  })
}
export function delRole(data) {
  return request({
    url: '/api/v1/role/delete',
    method: 'get',
    params: data
  })
}
export function updateRole(data) {
  return request({
    url: '/api/v1/role/update',
    method: 'post',
    data
  })
}
export function getRoleAccess(params) {
  return request({
    url: '/api/v1/role/getRoleAccess',
    method: 'get',
    params
  })
}

