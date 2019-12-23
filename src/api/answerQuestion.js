import request from '@/utils/request'

export function getBankList(data) {
  return request({
    url: '/api/v1/bank/list',
    params: data,
    method: 'get'
  })
}
export function addBank(data) {
  return request({
    url: '/api/v1/bank/add',
    data,
    method: 'post'
  })
}
export function updateBank(data) {
  return request({
    url: '/api/v1/bank/update',
    data,
    method: 'post'
  })
}
export function deleteBank(data) {
  return request({
    url: '/api/v1/bank/delete',
    params: data,
    method: 'get'
  })
}

// export function updateAccess(data) {
//   return request({
//     url: '/api/v1/access/update',
//     method: 'post',
//     data
//   })
// }
