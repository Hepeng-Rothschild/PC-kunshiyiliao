<template>
    <div>
        <div class="fcup">大师傅</div>  
    </div>
</template>
<script>
import { ext } from "@/plugins/encrypt.js";
// import CryptoJS from 'crypto-js';
export default {
    data() {
        return {
            
        };
    },
    mounted() {
        var word = this.aesUtils.encrypt('hello,您好','中电国康医到服务');
        console.log('后台加密','5CngaJ+XcuQZC0yySiOeeg==');
        console.log('前台加密',word);
        var after = this.aesUtils.decrypt(word,'中电国康医到服务');
        console.log('解密后',after);
    }
};
</script>
<style lang="less">
</style>