<template>
    <div>list4</div>

</template>
<script>
import {ext} from '@/plugins/encrypt.js';
export default {
    data() {
        return {
            normalStr:'Hello world',
            after:'',
            publicKey:`-----BEGIN PUBLIC KEY-----
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/GTvHeZv0+WAQR5dwt02TWbON
            gZqflwkcHT3xnY9cFYi0KiOsc5elZ2Ie6SM60RNBrDid19chCap682kxRy94vQzK
            yfwhKLJz5gF3vpJS3q+QcvbSapRy/1ln54kqaw3KZNC05kDwO+dfAmHTeQ95rIZV
            a0bDnxmYnVlvb0zOgwIDAQAB
            -----END PUBLIC KEY-----
            `,
            privateKey:`-----BEGIN PRIVATE KEY-----
            MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL8ZO8d5m/T5YBBH
            l3C3TZNZs42Bmp+XCRwdPfGdj1wViLQqI6xzl6VnYh7pIzrRE0GsOJ3X1yEJqnrz
            aTFHL3i9DMrJ/CEosnPmAXe+klLer5By9tJqlHL/WWfniSprDcpk0LTmQPA7518C
            YdN5D3mshlVrRsOfGZidWW9vTM6DAgMBAAECgYAGlYX7v3LiI91tcioDli00EHkh
            PP/o07laoJ9LvdP8pjlJi9Ii1PC6oC8/RWUTV7TEJHzm41LkLoMTLWPIcN1vyiUT
            u/54nH2GsQ8X77z91CgyBwEubo4RKd6E421OoIAJ5F80mQvJf471z+6C4URYVWY2
            9tIEEtLccKxHm/wO8QJBAPvMGlqkWpifPF8iAcDtlpQom0JLdR4D+oDrH5qat2GL
            0oz3/swV4EWFmftd1GgPdGkyoo18DxO1OizlXwoVEVUCQQDCScXazHugYqwCecOr
            6JUo9y2Dv9X1qav5I16HLxEacDy6eK+5h4OtxSg+FDr0EGRMycs86llLy9md8sjw
            esB3AkEAnGMn+yQZILHFzVBRxoHKBDs0MviqxPmznF5sQpnVS8CMBQICPr9Xi9Zu
            zLB6PCddJflM/JMQyizE9R2A6cIsAQJAPOCOzVMbPZMNYK00oY38Bt0Edu7KJPKo
            PyVU/jjCPC2E6czdCt4qZW2MgX8nRchJFUJ5mzm3Byf1pScozSk5WwJARfzCejsv
            FBvjUEVpQ2Q9Gm0pGJlacEWXoxDtYSqMbgUdWQHTFvqUAI+owCxgyPk7C2hKttzS
            W6KhxNieBuwHWA==
            -----END PRIVATE KEY-----
            `,
        };
    },
    created(){
        let a = ext.en(this.normalStr)
        let b = ext.de(a)
        console.log(a,'加密后的结果')
        console.log(b,'解密后的结果')
        // console.log(this.RSAUtils);
        // let that = this;
        // // 实例化一个JSEncrypt对象
        // let jse = new that.$jsEncrypt();
        // jse.setPublicKey(this.publicKey);
        // // 设置需要加密的字符串
        // let encrypted = jse.encrypt('Hello, world');
        // console.log(encrypted);
        // jse.setPrivateKey(this.privateKey);
        // // // 解密加密过的字符串
        // let decrypted = jse.decrypt(encrypted)
        // console.log(decrypted);
        // let str = 'Wo Shi Shei Wo Shi Cheng Long';
        // let regexp = new RegExp('[A-Z]','g');
        // let res = str.match(regexp);
        // console.log(res);
        // let py = this.$py({value:'我是中国人',type:'firstUp'});
        // let regexp = new RegExp('[A-Z]','g');
        // let res = py.match(regexp);
        // console.log('找出来的大写字母数组',res);
        // console.log('找出来的大写字母数组转换成都好分割字符串',res.join());
    }

};
</script>
<style lang="less">
</style>