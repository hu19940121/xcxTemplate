import request from '@/utils/request'

export function getMusicList(data) {
  return request({
    url: '/api/v1/music/list',
    params: data,
    method: 'get'
  })
}
export function addMusic(data) {
  return request({
    url: '/api/v1/music/add',
    data,
    method: 'post'
  })
}
export function updateMusic(data) {
  return request({
    url: '/api/v1/music/update',
    data,
    method: 'post'
  })
}
export function delMusic(data) {
  return request({
    url: '/api/v1/music/delete',
    method: 'get',
    params: data
  })
}

