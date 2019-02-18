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
        let province = this.$store.getters.getProvinceByCityId(138);
        console.log(province);
        let city = this.$store.getters.getCityByAreaId(100);
        console.log(city);
        // let area = this.$store.getters.getProvinceById(12);
        // console.log(area);
    }
};
</script>
<style lang="less">
</style>