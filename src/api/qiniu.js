import request from '@/utils/request'

export function getQiniuToken(data) {
  return request({
    url: '/api/v1/getQiniuToken',
    method: 'get',
    params: data
  })
}
