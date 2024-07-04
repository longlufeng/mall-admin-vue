import request from '../utils/request'

// 转账
export function transfer(data) {
  return request({
    url: '/pay/pay/transfer',
    method: 'post',
    data
  })
}