import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login'

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}


export default function getUserinfo(props) {
    localStorage.setItem('TOKEN',"og4oj6hFZ2T3E4b_vGD5_pgSRimo");
    const token = localStorage.getItem("TOKEN");
    if (token && token != 'undefined') {
        return
    }
    const code = getQueryVariable("code");
    if (code) {
        const _props = JSON.parse(localStorage.getItem('_props'));
        fakeAccountLogin(code).then(res => {
            //设置token
            localStorage.setItem('TOKEN', res.data);
            setTimeout(() => {
                //返回跳转前打开的url
                history.replace(_props.location.pathname);
            }, 1000)
        }).catch(err => {
            if (err) {
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('_props');
                history.replace('/');
            }
        })
    } else {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbc658826026c1ccd&redirect_uri=http://sanbao.bbscmyk.com/wechat/index.html&response_type=code&scope=snsapi_base#wechat_redirect'
        localStorage.setItem('_props', JSON.stringify(props))
    }
}