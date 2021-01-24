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

//车票列表
export async function trains(params) {
  return request('/api/wechat/train' + bodyParse(params));
}
//创建乘车记录
export async function train_record(params) {
  return request('/api/wechat/train_record', {
    method: 'POST',
    data: params,
  });
}

//推送消息
export async function send_message(params) {
  return request('/api/wechat/enroll/send_message', {
    method: 'POST',
    data: params,
  });
}

//乘车记录
export async function getrain_record(params) {
  return request('/api/wechat/train_record' + bodyParse(params));
}

//报名历史
export async function getenroll(params) {
  return request('/api/wechat/enroll' + bodyParse(params));
}

//报名历史
export async function getenrolldetail(params) {
  return request('/api/wechat/enroll/' + params);
}

//注册会员
export async function member_card() {
  return request('/api/wechat/user/member_card');
}

//全部站点
export async function stations() {
  return request('/api/wechat/train/stations');
}

//全部站点
export async function banner() {
  return request('/api/wechat/banner');
}

//全部站点
export async function code() {
  return request('/api/wechat/user/code');
}

//全部站点
export async function promo() {
  return request('/api/wechat/user/promo');
}

//获取排名名次
export async function rank() {
  return request('/api/wechat/user/recursion_rank');
}

//获取排名列表
export async function member(params) {
  return request('/api/wechat/member' + bodyParse(params));
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
