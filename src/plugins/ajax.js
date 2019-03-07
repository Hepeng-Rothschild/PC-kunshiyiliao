import store from '../store';
import cookie from '../utils/cookie.js';
import aesUtils from '../plugins/aes-utils.js';

let iv = store.state.iv;
let salt = store.state.salt;
let key = cookie.getCookie("randmId");
let access_user = aesUtils.decrypt(salt,iv,key,cookie.getCookie("access_user"));
let access_token = window.localStorage.getItem('access_token');
function getXhr(){
    let xhr=null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        //为了兼容IE6
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
}
export default function Ajax(resolve,reject,type, url, headers, data, xhrReturn=()=>{}, progress=()=>{}){
    /* 
    ajax暂停之后不能重新发送请求，需要创建新的xhr对象重新发送请求
    */
    let xhr = getXhr();

    xhrReturn(xhr);

    type = type.toUpperCase();
    
    let reg = new RegExp('\\?',"g");
    if(reg.test(url)){
        reject("url地址传递错误");
        return ;
    }
    let random = Math.random();
    url += "?"+random;
    if(type == 'GET'){
        reject("不支持GET提交方式");
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        
        if (store.state.env == "production" || store.state.env == "test") {
            xhr.setRequestHeader('OPERATE-USER', access_user);
            xhr.setRequestHeader('FORM-ENCODE', 0);
            xhr.setRequestHeader('Authorization', "Bearer " + access_token);
        }
        if(typeof headers == 'object'){
            for(let key in headers){
                // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
                xhr.setRequestHeader(key, headers[key]);
            }
        }else{
            reject("请求头设置有误");
            return ;
        }
        xhr.withCredentials = false;
        
        xhr.upload.onprogress = progress;
        xhr.onabort = ()=>{
            xhr = null;
        };
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                let resp = JSON.parse(xhr.responseText);
                resolve(resp);
            } else {
                reject("提交失败，请重试");
            }
        }
    }
    
}


