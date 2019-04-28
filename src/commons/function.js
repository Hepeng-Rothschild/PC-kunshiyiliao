import store from '@/store';
import cookie from '@/utils/cookie.js';
import aesUtils from '@/plugins/aes-utils.js';
//生成AddDayCount天之前/之后的年月日
export function GetDate(AddDayCount = 0) {
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
export function uploadFileDecrypt(res) {
  let salt = store.state.salt;
  let iv = store.state.iv;
  let key = cookie.getCookie("randmId");
  if (res.code == 1 && res.encryption) {
    res.object = JSON.parse(aesUtils.decrypt(salt, iv, key, res.object));
  }
  return res;
}
//查询cha在str中第num个的位置,num从0开始
export function findStr(str, cha, num) {
  var x = str.indexOf(cha);
  for (var i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}
// 添加序号0
export function addZeros(num) {
  num = num + 1;
  if (num < 10) {
    return "0" + num;
  }
  return num;
}
// 图片地址的兼容
export function analysisImages(json) {
  try {
    json = JSON.parse(json);
    return json.fileName;
  } catch (error) {
    return "";
  }
}

export let functionJS = {
  // params方式传值的跳转函数
  paramsNavgationTo(that, name, params) {
    that.$router.push({
      name,
      params
    });
  },
  // query方式传值的跳转函数
  queryNavgationTo(that, path, query) {
    that.$router.push({
      path,
      query
    });
  }
}
export function getStyle(obj,attr){
  if(obj.currentStyle){
      //IE,OPER
      return obj.currentStyle[attr];
  }else{
      //chrome、safari、FireFox
      return window.getComputedStyle(obj)[attr];
  }
}
export function checkFlash() {  
  let hasFlash = false,flashVersion;　　　　 //是否安装了flash/flash版本    
  
  if(document.all) {  
    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
    if(swf) {  
      hasFlash = true;  
      SwfVersion = swf.GetVariable("$version");
      flashVersion = parseInt(SwfVersion.split(" ")[1].split(",")[0]);  
    }  
  } else {  
    if(navigator.plugins && navigator.plugins.length > 0) {  
      var swf = navigator.plugins["Shockwave Flash"];  
      if(swf) {  
        hasFlash = true;  
        var codes = swf.description.split(" ");  
        for(var i = 0; i < codes.length; ++i) {  
          if(isNaN(parseInt(codes[i]))) continue;  
          flashVersion = parseInt(codes[i]);  
        }  
      }  
    }  
  }  
  return { f: hasFlash, v: flashVersion };  
}