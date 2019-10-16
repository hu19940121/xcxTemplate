import request from '@/utils/request'

export function getPoetryList(data) {
  return request({
    url: '/api/v1/poetry/list',
    params: data,
    method: 'get'
  })
}
export function addPoetry(data) {
  return request({
    url: '/api/v1/poetry/add',
    data,
    method: 'post'
  })
}

// export function updateAccess(data) {
//   return request({
//     url: '/api/v1/access/update',
//     method: 'post',
//     data
//   })
// }
