import store from '@/store';
import cookie from '@/utils/cookie.js';
import aesUtils from '@/plugins/aes-utils.js';
//生成AddDayCount天之前/之后的年月日
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
//上传接口返回值解密
export function uploadFileDecrypt(res){
    let salt = store.state.salt;
    let iv = store.state.iv;
    let key = cookie.getCookie("randmId");
    if(res.code == 1 && res.encryption){
        res.object = JSON.parse(aesUtils.decrypt(salt,iv,key,res.object));
    }
    return res;
}
//查询cha在str中第num个的位置,num从0开始
export function findStr(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
    }