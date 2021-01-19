import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

export default function getUserinfo(props, fn) {
  //localStorage.setItem('TOKEN',"og4oj6hFZ2T3E4b_vGD5_pgSRimo");//og4oj6g1PDt2eA06i4bG4VIBCGZg  og4oj6hFZ2T3E4b_vGD5_pgSRimo
  const token = localStorage.getItem('TOKEN');
  if (token && token != 'undefined') {
    props
      .dispatch({
        type: 'global/token',
        payload: token,
      })
      .then((res) => {
        if (fn) {
          fn();
        }
      });
    return;
  }
  const code = getQueryVariable('code');
  if (code) {
    const pathname = localStorage.getItem('pathname');
    fakeAccountLogin(code)
      .then((res) => {
        //设置token
        localStorage.setItem('TOKEN', res.data);
        props
          .dispatch({
            type: 'global/token',
            payload: res.data,
          })
          .then((res) => {
            if (fn) {
              fn();
            }
          });
        history.replace(pathname);
      })
      .catch((err) => {
        if (err) {
          history.replace(pathname);
          localStorage.removeItem('TOKEN');
          localStorage.removeItem('pathname');
        }
      });
  } else {
    let path = props?.location?.pathname,
      topath = '';
    if (!path) {
      path = '';
    } else {
      topath = '#' + path;
    }

    let uri = 'http://www.sanbaodagong.com/wechat/index.html'; //'http://www.sanbaodagong.com/wechat/index.html';
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbc658826026c1ccd&redirect_uri=' +
      uri +
      '&response_type=code&scope=snsapi_base#wechat_redirect';
    localStorage.setItem('pathname', path);
  }
}
