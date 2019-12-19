import request from '@/utils/request'

export function getQiniuToken() {
  return request({
    url: '/api/v1/getQiniuToken',
    method: 'get'
  })
}
