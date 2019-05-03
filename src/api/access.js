import request from '@/utils/request'

export function getAccessList() {
  return request({
    url: '/api/v1/access/list',
    method: 'get'
  })
}
export function addAccess(data) {
  return request({
    url: '/api/v1/access/add',
    method: 'post',
    data
  })
}
export function delAccess(data) {
  return request({
    url: '/api/v1/access/delete',
    method: 'get',
    params: data
  })
}

export function updateAccess(data) {
  return request({
    url: '/api/v1/access/update',
    method: 'post',
    data
  })
}
