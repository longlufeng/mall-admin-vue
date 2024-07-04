import request from '../utils/request'

// 新增订单
export function add(data) {
  return request({
    url: '/order/order/add',
    method: 'post',
    data
  })
}

// 编辑订单
export function upd(data) {
  return request({
    url: '/order/order/upd',
    method: 'post',
    data
  })
}

// 查询订单详情
export function qryById(data) {
  return request({
    url: '/order/order/qryById',
    method: 'post',
    data
  })
}

// 查询订单列表
export function qryList(data) {
  return request({
    url: '/order/order/qryList',
    method: 'post',
    data
  })
}
