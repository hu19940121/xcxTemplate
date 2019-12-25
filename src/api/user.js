import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  console.log('lgondata', data)

  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}
// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function getInfo(token) {
  return request({
    url: '/api/v1/getUserInfo',
    method: 'get',
    params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'post'
  })
}

export function getFormIds() {
  return request({
    url: '/api/v1/getFormIds',
    method: 'get'
  })
}
export function xcxPush(data) {
  return request({
    url: '/api/v1/xcxPush',
    method: 'post',
    data
  })
}
export function getUserList() {
  return request({
    url: '/api/v1/user/list',
    method: 'get'
  })
}
export function updateUser(data) {
  return request({
    url: '/api/v1/user/update',
    method: 'post',
    data
  })
}
export function codeLogin(data) {
  return request({
    url: '/api/v1/codeLogin',
    method: 'post',
    data
  })
}

