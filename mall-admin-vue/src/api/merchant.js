import request from '../utils/request'

// 商户注册
export function merchantRegister(data) {
  return request({
    url: '/merchant/merchant/register',
    method: 'post',
    data
  })
}

// 商户登录
export function merchantLogin(data) {
  return request({
    url: '/merchant/merchant/login',
    method: 'post',
    data
  })
}

// 商户修改登录密码
export function merchantUpdPassword(data) {
  return request({
    url: '/merchant/merchant/updPassword',
    method: 'post',
    data
  })
}

// 查询商户列表
export function qryList(data) {
  return request({
    url: '/merchant/merchant/qryList',
    method: 'post',
    data
  })
}

// 新增商户
export function add(data) {
  return request({
    url: '/merchant/merchant/add',
    method: 'post',
    data
  })
}

// 删除商户
export function del(data) {
  return request({
    url: '/merchant/merchant/del',
    method: 'post',
    data
  })
}

// 编辑商户
export function upd(data) {
  return request({
    url: '/merchant/merchant/upd',
    method: 'post',
    data
  })
}

// 查询商户
export function qryById(data) {
  return request({
    url: '/merchant/merchant/qryById',
    method: 'post',
    data
  })
}

// 获取当前日期
export function getCurDate() {
  return request({
    url: '/merchant/merchant/getCurDate',
    method: 'post'
  })
}

// 通过商户Id查询详情
export function qryDetailById(data) {
  return request({
    url: '/merchant/merchantInfo/qryDetailById',
    method: 'post',
    data
  })
}

