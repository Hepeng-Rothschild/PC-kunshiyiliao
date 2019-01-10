/**
 *  加密
 */

import store from "../store";
import {RSA} from './RSA.js'
var ext = {
  /*
    加密
  */
  en: function (deStr) {
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(store.state.Rsa.my_key);
    var encStr = encrypt_rsa.encrypt(deStr)
    encStr = RSA.hex2b64(encStr);
    return encStr
  },

  /*
    解密
  */
  de: function (encStr) {
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(store.state.Rsas.my_key);
    encStr = RSA.b64tohex(encStr)
    var decStr = decrypt_rsa.decrypt(encStr)
    return decStr
  }
}
export  {ext}