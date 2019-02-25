<template>
    <div class="mechanismregEdit">
        <div class="container">
            <!-- title -->
            <div class="container-main">
                <!-- 区域 -->
                <div class="region">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>区域</span>
                    </div>
                    <!-- 省 -->
                    <select v-model="regionProv" @change="provChange">
                        <option value="-1">--请选择--</option>
                        <option
                            :value="item.id"
                            v-for="(item,index) in provList"
                            :key="index"
                        >{{ item.name }}</option>
                    </select>
                    <!-- 市 -->
                    <select v-model="regionCity" @change="cityChange">
                        <option value="-1">--请选择--</option>
                        <option
                            :value="item.id"
                            v-for="(item,index) in cityList"
                            :key="index"
                        >{{ item.city }}</option>
                    </select>
                    <!-- 县 -->
                    <!-- <select v-model="regionCounty">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in countyList" :key="index">{{ item.area }}</option>
                    </select>-->
                </div>
                <!-- 机构名称 -->
                <div class="address">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>机构名称:</span>
                    </div>
                    <Input
                        v-model.trim="mechanismName"
                        placeholder="请输入机构全称"
                        clearable
                        style="width: 300px"
                    />
                </div>
                <!-- 机构地址 -->
                <div class="address">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>机构地址:</span>
                    </div>
                    <Input
                        v-model.trim="hosAddr"
                        placeholder="请输入机构地址"
                        clearable
                        style="width: 300px"
                    />
                </div>
                <!-- 机构组织编码 -->
                <div class="address">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>机构组织编码:</span>
                    </div>
                    <Input
                        v-model.trim="mechanismCode"
                        placeholder="请输入医疗组织机构代码"
                        clearable
                        style="width: 300px"
                    />
                </div>
                <!-- 机构类型 -->
                <div class="region">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>机构类型</span>
                    </div>
                    <!-- 医院 -->
                    <Select v-model="mechanismType1" style="width:100px">
                        <Option :value="1">医院</Option>
                    </Select>
                </div>
                <!-- 机构等级 -->
                <div class="region">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>机构等级</span>
                    </div>
                    <!-- 医院等级 -->
                    <Select v-model="mechanismGrade" style="width:200px">
                        <Option
                            :value="item.dictType"
                            v-for="item in grade"
                            :key="item.dictType"
                        >{{ item.dictName }}</Option>
                    </Select>
                </div>
                <!-- 机构联系人 -->
                <div class="address">
                    <div class="left">
                        <span style="color:red;">&nbsp;</span>
                        <span>机构联系人:</span>
                    </div>
                    <Input
                        v-model.trim="Contacts"
                        placeholder="请输入姓名"
                        clearable
                        style="width: 300px"
                    />
                </div>
                <!-- 联系人电话 -->
                <div class="address">
                    <div class="left">
                        <span style="color:red;">&nbsp;</span>
                        <span>联系人电话:</span>
                    </div>
                    <Input
                        v-model.trim="phone"
                        placeholder="请输入电话号码"
                        clearable
                        style="width: 300px"
                        :maxlength="11"
                    />
                </div>
                <!-- 保存 -->
                <div class="save">
                    <Button type="primary" @click="save">提交</Button>
                    <Button type="default" @click="back">取消</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
// import { Select, Option } from "iview";
export default {
    components: {
        // Select,
        // Option
    },
    data() {
        return {
            // 序号
            number: "010101020312",
            // 省
            regionProv: "-1",
            // 市
            regionCity: "-1",
            //县
            regionCounty: "-1",
            //机构全称
            mechanismName: "",
            //机构代码
            mechanismCode: "",
            //机构类型
            mechanismType1: "0",
            //机构等级
            mechanismGrade: "-1",
            //联系人
            Contacts: "",
            //联系人电话
            phone: "",
            //城市列表
            provList: [],
            cityList: [],
            countyList: [],
            //医院等级 列表
            grade: [],
            hosAddr: "",
            hospitalId: "",

            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2
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
        this.getCity();
        this.getGrent();

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/mechanismreg/list",
                title: "机构注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let id = this.$route.query.id;
        if (id) {
            this.$axios
                .post(api.mechanismregSearch, {
                    hospitalId: id
                })
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        //省
                        this.regionProv = ret.provinceCode;
                        //市
                        this.regionCity = ret.cityCode;
                        //区
                        this.regionCounty = ret.districtCode;
                        // //机构全称
                        this.mechanismName = ret.orgName;
                        // //机构代码
                        this.mechanismCode = ret.orgCode;
                        // //机构类型
                        this.mechanismType1 = ret.hospitalType;
                        // //机构等级
                        this.mechanismGrade = ret.grade;
                        // //联系人
                        this.Contacts = ret.linkman;
                        // //联系人电话
                        this.phone = ret.linkmanTelephone;
                        // 地址
                        this.hosAddr = ret.hosAddr;
                        // 医院ID
                        this.hospitalId = ret.hospitalId;
                    } else {
                    }
                });
        }
    },
    methods: {
        save() {
            let params = {
                // 省
                provinceCode: this.regionProv,
                // 市
                cityCode: this.regionCity,
                //县
                // districtCode: this.regionCounty,
                //机构全称
                orgName: this.mechanismName,
                //机构代码
                orgCode: this.mechanismCode,
                //机构类型
                hospitalType: this.mechanismType1,
                //机构等级
                grade: this.mechanismGrade,
                //联系人
                linkman: this.Contacts,
                //联系人电话
                linkmanTelephone: this.phone,
                // 地址
                hosAddr: this.hosAddr,
                // 医院Id
                id: this.hospitalId
            };
            if (this.regionProv == "-1" || this.regionCity == "-1") {
                this.$Message.error("区域不能为空");
            } else if (this.mechanismName == "") {
                this.$Message.error("机构名称不能为空");
            } else if (this.address == "") {
                this.$Message.error("机构地址不能为空");
            } else if (this.mechanismCode == "") {
                this.$Message.error("组织机构代码不能为空");
            } else if (this.mechanismType1 == "-1") {
                this.$Message.error("机构类型不能为空");
            } else if (this.mechanismGrade == "-1") {
                this.$Message.error("机构等级不能为空");
            } else {
                this.$axios.post(api.mechanismregEdit, params).then(res => {
                    if (res.data.code) {
                        let ret = res.data;
                        this.$Message.info("修改成功");
                        let pageNo = this.$route.query.pageNo;
                        setTimeout(() => {
                            // functionJS公用 方法
                            this.functionJS.queryNavgationTo(
                                this,
                                "/index/maintain/mechanismreg/list",
                                {
                                    pageNo,
                                    province: this.province,
                                    city: this.city,
                                    area: this.area,
                                    hospital: this.hospital,
                                    isBack: 2
                                }
                            );
                        }, 500);
                    } else {
                        this.$Message.info("修改失败请重试");
                    }
                });
            }
        },
        back() {
            let pageNo = this.$route.query.pageNo;
            // functionJS公用 方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/mechanismreg/list",
                {
                    pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        },
        //获取医院等级
        getGrent() {
            this.$axios.post(api.managementAll).then(res => {
                if (res.data) {
                    let ret = res.data.object;
                    this.grade = ret;
                }
            });
        },
        // 获取省级
        getCity() {
            this.$axios.post(api.getCity).then(res => {
                if (res.data) {
                    let ret = res.data.object;
                    this.provList = ret;
                    this.countyList = [];
                    this.cityList = [];
                    this.provChange(this.regionProv);
                }
            });
        },
        // 省级改变获取市级
        provChange() {
            let list = this.provList;
            let len = list.length;
            if (list != -1) {
                for (let i = 0; i < len; i++) {
                    if (list[i].id == this.regionProv) {
                        this.cityList = list[i].cityList;
                    }
                }
            }
        },
        //市级改变获取县级
        cityChange() {
            if (this.regionCity != -1) {
                this.$axios
                    .post(api.getCounty, {
                        cityId: this.regionCity
                    })
                    .then(res => {
                        if (res.data) {
                            let ret = res.data.object;
                            this.countyList = ret;
                        }
                    });
            }
        }
    }
};
</script>
<style lang="less" scoped>
.mechanismregEdit {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        header {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
        }
        .container-main {
            display: flex;
            flex-direction: column;
            width: 80%;
            margin: 0 auto;
            .number,
            .region,
            .address {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 10px;
                .left {
                    width: 200px;
                    font-size: 20px;
                    span:last-child {
                        font-weight: 600;
                    }
                }
            }
            .region {
                select {
                    width: 100px;
                    margin-right: 10px;
                    option {
                        text-align: center;
                    }
                }
            }
            .address {
                input {
                    width: 400px;
                    height: 25px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    outline: none;
                    background: #fff;
                    text-indent: 5px;
                }
            }
            .save {
                width: 300px;

                display: flex;
                justify-content: space-between;
                margin: 20px auto;
                flex-direction: row;
                div {
                    cursor: pointer;
                    width: 100px;
                    height: 40px;
                    border-radius: 6px;
                    border: 1px solid #c8c8c8;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }
    }
}
</style>
