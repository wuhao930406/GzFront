import request from '@/utils/request';


//获取token 即 openid
export async function fakeAccountLogin(code) {
  return request(`/api/wechat/user/login?code=${code}`);
}
