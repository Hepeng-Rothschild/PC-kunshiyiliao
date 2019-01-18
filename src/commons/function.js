import store from '@/store';
import cookie from '@/utils/cookie.js';
import aesUtils from '@/plugins/aes-utils.js';
export function GetDate(AddDayCount=0) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (m >= 1 && m <= 9) {
        m = "0" + m;
    }
    if (d >= 0 && d <= 9) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}
export function uploadFileDecrypt(res){
    let salt = store.state.salt;
    let iv = store.state.iv;
    let key = cookie.getCookie("randmId");
    if(res.code == 1 && res.encryption){
        res.object = JSON.parse(aesUtils.decrypt(salt,iv,key,res.object));
    }
    return res;
}