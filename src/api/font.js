import request from '@/utils/request'
/**
 *
 * @param {font}  字体名称
 * @param {text}  要转换的字
 */
export function createFont(data) {
  return request({
    url: '/api/v1/fontmin/fontMin',
    method: 'get',
    params: data
  })
}
