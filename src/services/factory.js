import request from '@/utils/request';
import bodyParse from '@/utils/bodyParse';

//关键词
export async function keyword(params) {
  return request('/api/wechat/keyword' + bodyParse(params));
}

//分类
export async function classify(params) {
  return request('/api/wechat/max_classify' + bodyParse(params));
}

//岗位
export async function job(params) {
  return request('/api/wechat/job' + bodyParse(params));
}

//岗位详情
export async function jobdetail(params) {
  return request('/api/wechat/job/' + params);
}

//立即报名
export async function enroll(params) {
  return request('/api/wechat/enroll', {
    method: 'POST',
    data: params,
  });
}

//客服列表
export async function customer(params) {
  return request('/api/wechat/customer' + bodyParse(params));
}

//门店列表
export async function store(params) {
  return request('/api/wechat/store' + bodyParse(params));
}

//用户信息
export async function userinfo() {
  return request('/api/wechat/user/info');
}

//乘车记录
export async function train_record(params) {
  return request('/api/wechat/train_record' + bodyParse(params));
}

//报名历史
export async function getenroll(params) {
  return request('/api/wechat/enroll' + bodyParse(params));
}

//启用or禁用用户
export async function setenable(params) {
  return request('/api/user/set_enable', {
    method: 'PUT',
    data: params,
  });
}

//角色列表
export async function role(params) {
  return request('/api/role' + bodyParse(params));
}

//更新角色
export async function editrole(params) {
  return request('/api/role/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除角色
export async function deleterole(params) {
  return request('/api/role/' + params, {
    method: 'DELETE',
  });
}

//创建用户
export async function adduser(params) {
  return request('/api/user', {
    method: 'POST',
    data: params,
  });
}

//更新用户
export async function edituser(params) {
  return request('/api/user/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除用户
export async function deleteuser(params) {
  return request('/api/user/' + params, {
    method: 'DELETE',
  });
}

//重置密码
export async function resetuser(params) {
  return request('/api/user/reset_password', {
    method: 'PUT',
    data: params,
  });
}

//用户详情
export async function getuser(params) {
  return request('/api/user/' + params);
}

//删除门店
export async function deletestore(params) {
  return request('/api/store/' + params, {
    method: 'DELETE',
  });
}

//当前用户信息
export async function queryCurrent() {
  return request('/api/user/info');
}

export async function queryNotices() {
  return request('/api/notices');
}
