import request from '@/utils/request'

export function getRobotUserList(data) {
  return request({
    url: '/api/v1/robotUser/list',
    params: data,
    method: 'get'
  })
}
