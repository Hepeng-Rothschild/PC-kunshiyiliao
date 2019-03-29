<template>
    <div class="fourlevellinkage">
        <Select
            class="w-select"
            :clearable="!provinceStatus"
            :value="province"
            :disabled="provinceStatus"
            placeholder="省"
            @on-change="changeProvince"
        >
            <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select
            class="w-select"
            :clearable="!cityStatus"
            :disabled="cityStatus"
            :value="city"
            placeholder="市"
            @on-change="changeCity"
        >
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select
            class="w-select"
            :clearable="!areaStatus"
            :disabled="areaStatus"
            :value="area"
            placeholder="区"
            @on-change="changeArea"
        >
            <Option v-for="item in areaList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select
            class="w-select-hos"
            :clearable="!hospitalStatus"
            :disabled="hospitalStatus"
            :value="hospital"
            placeholder="机构"
            @on-change="changeHospital"
        >
            <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
    </div>
</template>
<script>
import cookie from "./../utils/cookie.js";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            hospitalList: [],

            provinceStatus: false,
            cityStatus: false,
            areaStatus: false,
            hospitalStatus: false
        };
    },
    props: {
        province: {
            default: null
        },
        city: {
            default: null
        },
        area: {
            default: null
        },
        hospital: {
            default: null
        },
        isBack: {
            default: 1
        }
    },
    created() {
        console.log('fourLevelLinkage');
        if (this.isBack == 1) {
            this.identity = cookie.getCookie("idtt");
            this.identityCoding = cookie.getCookie("idttC");
            this.ownArea = JSON.parse(cookie.getCookie("ownArea"));
            if (this.ownArea.province) {
                this.provinceList.push(this.ownArea.province);
                this.province = this.ownArea.province.id;
                this.provinceStatus = true;
            }
            if (this.ownArea.city) {
                this.cityList.push(this.ownArea.city);
                this.city = this.ownArea.city.id;
                this.cityStatus = true;
            }
            if (this.ownArea.area) {
                this.areaList.push(this.ownArea.area);
                this.area = this.ownArea.area.id;
                this.areaStatus = true;
            }
            if (this.identity == 1) {
                this.provinceList = this.$store.getters.getProvinceList;
            } else if (this.identity == 2) {
                this.cityList = this.$store.getters.getCityList(this.province);
                this.$emit("changeProvince", this.province);
            } else if (this.identity == 3) {
                this.areaList = this.$store.getters.getAreaList(this.city);
                this.$emit("changeProvince", this.province);
                this.$emit("changeCity", this.city);
            } else if (this.identity == 4) {
                var params = {};
                params.provinceCode = parseInt(this.province);
                params.cityCode = parseInt(this.city);
                params.districtCode = parseInt(this.area);
                this.$emit("changeProvince", this.province);
                this.$emit("changeCity", this.city);
                this.$emit("changeArea", this.area);
                this.$axios
                    .post(api.hospitalselectbyprovincecode, params)
                    .then(resp => {
                        let list = resp.data.object;
                        if(list && list.length>0){
                            list.map((el, i) => {
                                let tmpObj = {};
                                tmpObj.id = parseInt(el.id);
                                tmpObj.name = el.orgName;
                                this.hospitalList.push(tmpObj);
                            });
                        }
                    })
                    .catch(err => {
                    });
            } else if (this.identity == 5) {
                this.hospital = parseInt(this.identityCoding);
                this.hospitalStatus = true;
                this.$emit("changeProvince", this.province);
                this.$emit("changeCity", this.city);
                this.$emit("changeArea", this.area);
                this.$emit("changeHospital", this.hospital);
                this.$axios
                    .post(api.managementInfo, {
                        hospitalId: parseInt(this.identityCoding)
                    })
                    .then(resp => {
                        this.hospitalList.push({
                            id: resp.data.object.hospitalId,
                            name: resp.data.object.orgName
                        });
                    })
                    .catch(err => {});
            }
        }else if(this.isBack == 2){
        //设置从其他页面返回后默认值
            if (this.province) {
                this.provinceList = this.$store.getters.getProvinceList;
                this.cityList = this.$store.getters.getCityList(this.province);
                if (this.city) {
                    this.areaList = this.$store.getters.getAreaList(this.city);
                    if (this.area) {
                        var params = {};
                        params.provinceCode = parseInt(this.province);
                        params.cityCode = parseInt(this.city);
                        params.districtCode = parseInt(this.area);
                        this.$axios
                        .post(api.hospitalselectbyprovincecode, params)
                        .then(resp => {
                            let list = resp.data.object;
                            if(list && list.length>0){
                                list.map((el, i) => {
                                    let tmpObj = {};
                                    tmpObj.id = parseInt(el.id);
                                    tmpObj.name = el.orgName;
                                    this.hospitalList.push(tmpObj);
                                });
                            }
                        })
                        .catch(err => {});
                    }
                }
            }
        }
    },
    methods: {
        changeProvince(val) {
            console.log("changeProvince");
            val = val ? val : null;
            this.$emit("changeProvince", val);
            this.$emit("changeCity", null);
            this.$emit("changeArea", null);
            this.$emit("changeHospital", null);
            this.city = null;
            this.area = null;
            this.hospital = null;
            this.hospitalList = [];
            this.cityList = this.$store.getters.getCityList(val);
        },
        changeCity(val) {
            console.log("changeCity");
            val = val ? val : null;
            this.$emit("changeCity", val);
            this.$emit("changeArea", null);
            this.$emit("changeHospital", null);
            this.area = null;
            this.hospital = null;
            this.hospitalList = [];
            this.areaList = this.$store.getters.getAreaList(val);
        },
        changeArea(val) {
            console.log("changeArea");
            val = val ? val : null;
            this.$emit("changeArea", val);
            this.$emit("changeHospital", null);
            this.hospital = null;
            this.hospitalList = [];
            if (val) {
                var params = {};
                params.provinceCode = parseInt(this.province);
                params.cityCode = parseInt(this.city);
                params.districtCode = parseInt(val);
                this.$axios
                    .post(api.hospitalselectbyprovincecode, params)
                    .then(resp => {
                        let list = resp.data.object;
                        list.map((el, i) => {
                            let tmpObj = {};
                            tmpObj.id = parseInt(el.id);
                            tmpObj.name = el.orgName;
                            this.hospitalList.push(tmpObj);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        changeHospital(val) {
            console.log("changeHospital");
            val = val ? val : null;
            this.$emit("changeHospital", val);
        }
    }
};
</script>
<style lang="less" scoped>
.fourlevellinkage {
    display: inline-block;
    .w-select {
        width: 100px;
    }
    .w-select-hos {
        width: 180px;
    }
}
</style>