import request from '../utils/request'

// 获取商品
export function qryList(data) {
  return request({
    url: '/commodity/commodity/qryList',
    method: 'post',
    data
  })
}

// 新增商品
export function add(data) {
  return request({
    url: '/commodity/commodity/add',
    method: 'post',
    data
  })
}

// 删除商品
export function del(data) {
  return request({
    url: '/commodity/commodity/del',
    method: 'post',
    data
  })
}

// 编辑商品
export function upd(data) {
  return request({
    url: '/commodity/commodity/upd',
    method: 'post',
    data
  })
}

// 查询商品
export function qryById(data) {
  return request({
    url: '/commodity/commodity/qryById',
    method: 'post',
    data
  })
}