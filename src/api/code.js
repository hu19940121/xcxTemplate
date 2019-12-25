import request from '@/utils/request'

export function sendLoginCode(data) {
  return request({
    url: '/api/v1/code/sendLoginCode',
    method: 'get',
    params: data
  })
}

