import CryptoJS from 'crypto-js'

export default {
    KEY:CryptoJS.enc.Utf8.parse("中电国康医到服务"),
    IV:CryptoJS.enc.Utf8.parse("中电国康医到服务"),
    /**
    
    * @param {*需要加密的字符串 注：对象转化为json字符串再加密} word
    
    * @param {*aes加密需要的key值，这个key值后端同学会告诉你} keyStr
    
    */
    // encrypt(word, keyStr) { // 加密

    //     var key = CryptoJS.enc.Utf8.parse(keyStr)
    //     console.log('key= ',key);
    //     var srcs = CryptoJS.enc.Utf8.parse(word)
    //     var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }) // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）
    //     // var encrypted = CryptoJS.AES.encrypt('5CngaJ+XcuQZC0yySiOeeg==', '中电国康医到服务', { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs5 }) // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）

    //     return encrypted.toString()

    // },
    encrypt(word, keyStr, ivStr) {
        let key = this.KEY
        let iv = this.IV

        if (keyStr) {
            key = CryptoJS.enc.Utf8.parse(keyStr);
            iv = CryptoJS.enc.Utf8.parse(ivStr);
        }

        let srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        // console.log("-=-=-=-", encrypted.ciphertext)
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    },

    decrypt(word, keyStr, ivStr) {
        let key = this.KEY
        let iv = this.IV

        if (keyStr) {
            key = CryptoJS.enc.Utf8.parse(keyStr);
            iv = CryptoJS.enc.Utf8.parse(ivStr);
        }

        let base64 = CryptoJS.enc.Base64.parse(word);
        let src = CryptoJS.enc.Base64.stringify(base64);

        var decrypt = CryptoJS.AES.decrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });

        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }

}