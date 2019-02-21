<template>
    <div class="fourlevellinkage">
        <Select
            class="w-select"
            :clearable="!provinceStatus"
            :bind="province"
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
            :bind="city"
            placeholder="市"
            @on-change="changeCity"
        >
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select
            class="w-select"
            :clearable="!areaStatus"
            :disabled="areaStatus"
            :bind="area"
            placeholder="区"
            @on-change="changeArea"
        >
            <Option v-for="item in areaList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select
            class="w-select-hos"
            :clearable="!hospitalStatus"
            :disabled="hospitalStatus"
            :bind="hospital"
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
            provinceStatus: false,
            cityList: [],
            cityStatus: false,
            areaList: [],
            areaStatus: false,
            hospitalList: [],
            hospitalStatus: false
        };
    },
    props: {
        province: {
            type:Number,
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
        checkReback: {
            default: 1
        }
    },
    created() {
        if (this.checkReback == 1) {
            console.log(1);
            this.identity = this.$store.getters.getIdentity;
            this.identityCoding = this.$store.getters.getIdentityCoding;
            this.ownArea = JSON.parse(this.$store.getters.getOwnArea);
            if (this.ownArea.province) {
                this.provinceStatus = true;
                this.provinceList.push(this.ownArea.province);
                this.province = this.ownArea.province.id;
            }
            if (this.ownArea.city) {
                this.cityStatus = true;
                this.cityList.push(this.ownArea.city);
                this.city = this.ownArea.city.id;
            }
            if (this.ownArea.area) {
                this.areaStatus = true;
                this.areaList.push(this.ownArea.area);
                this.area = this.ownArea.area.id;
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
        }else if(this.checkReback == 2){
            console.log(2);
        //设置从其他页面返回后默认值
            if (this.province) {
                this.provinceList = this.$store.getters.getProvinceList;
                this.cityList = this.$store.getters.getCityList(this.province);
                if (this.city) {
                    this.areaList = this.$store.getters.getAreaList(this.city);
                    if (this.area) {
                        this.$axios
                        .post(api.managementInfo, {
                            hospitalId: parseInt(this.area)
                        })
                        .then(resp => {
                            this.hospitalList.push({
                                id: resp.data.object.hospitalId,
                                name: resp.data.object.orgName
                            });
                        })
                        .catch(err => {});
                    }
                }
            }
        }
    },
    methods: {
        changeProvince(val) {
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