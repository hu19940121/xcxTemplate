import request from '@/utils/request'

export function getRoomList() {
  return request({
    url: '/api/v1/room/list',
    method: 'get'
  })
}
export function addRoom(data) {
  return request({
    url: '/api/v1/room/add',
    method: 'post',
    data
  })
}
export function delRoom(data) {
  return request({
    url: '/api/v1/room/delete',
    method: 'get',
    params: data
  })
}

export function updateRoom(data) {
  return request({
    url: '/api/v1/room/update',
    method: 'post',
    data
  })
}
