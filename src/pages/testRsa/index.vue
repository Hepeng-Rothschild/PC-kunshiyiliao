<template>
    <div>
        <fourLevelLinkage
                    @changeProvince="changeProvince"
                    @changeCity="changeCity"
                    @changeArea="changeArea"
                    @changeHospital="changeHospital"
                    :province="province"
                    :city="city"
                    :area="area"
                    :hospital="hospital"
                    :isBack="isBack"
                ></fourLevelLinkage>
    </div>
</template>
<script>

import fourLevelLinkage from "@/components/fourLevelLinkage";
import { ext } from "@/plugins/encrypt.js";
// import CryptoJS from 'crypto-js';
export default {
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack:1
        };
    },
    created() {
        this.province = this.$route.query.province
            ? parseInt(this.$route.query.province)
            : null;
        this.city = this.$route.query.city
            ? parseInt(this.$route.query.city)
            : null;
        this.area = this.$route.query.area
            ? parseInt(this.$route.query.area)
            : null;
        this.hospital = this.$route.query.hospital
            ? parseInt(this.$route.query.hospital)
            : null;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.dictType = this.$route.query.dictType
            ? this.$route.query.dictType
            : "";
        this.authStatus =
            this.$route.query.authStatus == null
                ? null
                : parseInt(this.$route.query.authStatus);
        this.isBack = this.$route.query.isBack?parseInt(this.$route.query.isBack):1;
    },
    components: {
        fourLevelLinkage
    },
    methods:{
        changeProvince(val) {
            this.province = val;
        },
        changeCity(val) {
            this.city = val;
        },
        changeArea(val) {
            this.area = val;
        },
        changeHospital(val) {
            this.hospital = val;
        },
    }
};
</script>
<style lang="less">
</style>