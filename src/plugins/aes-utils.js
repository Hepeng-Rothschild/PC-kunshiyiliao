import CryptoJS from 'crypto-js'

export default {

    /**
    
    * @param {*需要加密的字符串 注：对象转化为json字符串再加密} word
    
    * @param {*aes加密需要的key值，这个key值后端同学会告诉你} keyStr
    
    */
    encrypt(word, keyStr) { // 加密

        var key = CryptoJS.enc.Utf8.parse(keyStr)
        var srcs = CryptoJS.enc.Utf8.parse(word)
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }) // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）
        // var encrypted = CryptoJS.AES.encrypt('5CngaJ+XcuQZC0yySiOeeg==', '中电国康医到服务', { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs5 }) // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）
        
        return encrypted.toString()
        
    },
    
    decrypt(word, keyStr) { // 解密
        
        var key = CryptoJS.enc.Utf8.parse(keyStr)
        var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
        console.log('decrypt',decrypt);
        return CryptoJS.enc.Utf8.stringify(decrypt).toString()

    },
    aesDecrypt(encrypted, key) {
        console.log("encrypted="+encrypted);
        var encrypted = CryptoJS.enc.Base64.parse(encrypted);
        var decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key), {
            iv:CryptoJS.enc.Utf8.parse(key),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.NoPadding
        });
        decrypted = CryptoJS.enc.Utf8.stringify(decrypted);// 转换为 utf8 字符串
        // console.log("decrypted="+decrypted);
        return decrypted;
    }

}