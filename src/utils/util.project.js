/**
 * 项目相关工具
 */

import request from './request'

export function reporter({ type, data } = { type: 'uv', data: {} }) {
  const body = {
    url: 'sys/reportClickLog',
    errToast:1,
    data,
  }
  switch (type) {
    case 'uv':
      body.data.plateFrom = 'douyin'
      break
    default:
      break
  }
  request(body)
}
