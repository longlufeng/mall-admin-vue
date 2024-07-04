import request from '../utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/user/login',
    method: 'post',
    data
  })
}
// 获取用户
export function qryList(data) {
  return request({
    url: '/user/user/qryList',
    method: 'post',
    data
  })
}

// 新增用户
export function userAdd(data) {
  return request({
    url: '/user/user/register',
    method: 'post',
    data
  })
}

// 删除用户
export function userDel(data) {
  return request({
    url: '/user/user/del',
    method: 'post',
    data
  })
}

// 编辑用户
export function userEdit(data) {
  return request({
    url: '/user/user/upd',
    method: 'post',
    data
  })
}

// 查询用户
export function userSel(data) {
  return request({
    url: '/user/user/qryByUserId',
    method: 'post',
    data
  })
}

// 密码修改
export function pwdUpd(data) {
  return request({
    url: '/user/user/updPwd',
    method: 'post',
    data
  })
}

// 密码重置
export function pwdReset(data) {
  return request({
    url: '/user/user/resetPwd',
    method: 'post',
    data
  })
}
