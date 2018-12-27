<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>服务项目类型：
                </Col>
                <Col :xs="21">
                    <FormItem prop="nature" v-if="natureList.length>0">
                        <Select class="w-select" v-model="info.nature" @on-change="changeHospital">
                            <Option
                                v-for="item of natureList"
                                :key="item.id"
                                :value="item.id"
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>服务项目归属：
                </Col>
                <Col :xs="21">
                    <FormItem prop="paytype">
                        <Select
                            class="w-select"
                            @on-change="changeProvince"
                            placeholder="省"
                            v-model="info.provinceId"
                        >
                            <!-- <Option value="0">全国</Option> -->
                            <Option
                                v-for="item in provinceList"
                                :value="item.value"
                                :key="item.value"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeCity"
                            placeholder="市"
                            v-model="info.cityId"
                        >
                            <Option
                                v-for="(item,index) in cityList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeArea"
                            placeholder="区/县"
                            v-model="info.areaId"
                        >
                            <Option
                                v-for="item in areaList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select class="w-select" placeholder="医院" v-model="info.hospitalId">
                            <Option
                                v-for="item in hospitalList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.orgName}}</Option>
                        </Select>
                        <i-switch
                            v-if="info.hospitalId != '' && info.hospitalId != null && info.hospitalId != 0"
                            v-model="info.ascription"
                            :true-value="1"
                            :false-value="0"
                            size="large"
                        >
                            <span slot="open">公有</span>
                            <span slot="close">私有</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>服务项目名称：
                </Col>
                <Col :xs="21">
                    <FormItem prop="serviceName">
                        <Input
                            class="w-input"
                            v-model="info.serviceName"
                            :maxlength="20"
                            placeholder="请输入服务项目名称"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>操作规范：
                </Col>
                <Col :xs="21">
                    <FormItem prop="serviceDes">
                        <Input
                            class="w-input"
                            v-model="info.serviceDes"
                            type="textarea"
                            :maxlength="20"
                            placeholder="请填写具体操作规范"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>年服务次数：
                </Col>
                <Col :xs="21">
                    <FormItem prop="numberYear">
                        <Select class="w-select" v-model="info.numberYear">
                            <Option v-for="(item,index) of numberYear" :value="item" :key="index">{{item}}/次</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>执行机构/医生：
                </Col>
                <Col :xs="21">
                    <FormItem prop="executingAgency">
                        <Select class="w-select" v-model="info.executingAgency">
                            <Option
                                v-for="item of executingAgencyList"
                                :key="item.id"
                                :value="item.id"
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>收费标准：
                </Col>
                <Col :xs="21">
                    <FormItem prop="amt">
                        <Input class="w-number" v-model="info.amt" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>实收金额：
                </Col>
                <Col :xs="21">
                    <FormItem prop="amountReceived">
                        <Input class="w-number" v-model="info.amountReceived" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>自付金额：
                </Col>
                <Col :xs="21">
                    <FormItem prop="residentowncost">
                        <Input class="w-number" v-model="info.residentowncost" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>政府补贴：
                </Col>
                <Col :xs="21">
                    <FormItem prop="governmentsubsidycost">
                        <Input
                            class="w-number"
                            v-model="info.governmentsubsidycost"
                            :maxlength="20"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>是否启用：
                </Col>
                <Col :xs="21">
                    <FormItem prop="packagestatus">
                        <i-switch
                            v-model="info.packagestatus"
                            :true-value="1"
                            :false-value="0"
                            @on-change="change"
                        >
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>备注：
                </Col>
                <Col :xs="21">
                    <FormItem prop="remarks">
                        <Input
                            class="w-input"
                            v-model="info.remarks"
                            type="textarea"
                            :maxlength="20"
                            placeholder="备注"
                        />
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Button type="primary" @click="submit('formInline')">提交</Button>
        <Button type="primary" @click="reback">返回</Button>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/config/base.js";
import { Avatar, Select, Option, Switch } from "iview";
export default {
    data() {
        return {
            id: null,
            info: {
                serviceName: null,
                residentowncost: null,
                governmentsubsidycost: null,
                amt: null,
                packagestatus: 1,
                ascription: 1,
                hospitalId: null,
                serviceDes: null,
                provinceId: null,
                cityId: null,
                areaId: null,
                remarks: null,
                numberYear: null,
                executingAgency: null,
                nature: null,
                amountReceived: null
            },
            pageNo: null,
            numberYear: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            natureList: [
                { id: 1, name: "增值付费项目" },
                { id: 2, name: "基本公共卫生服务承担项目" }
            ],
            executingAgencyList: [
                { id: 1, name: "服务中心" },
                { id: 2, name: "签约医院" }
            ],

            provinceList: [],
            cityList: [],
            areaList: [],
            hospitalList: [],
            searchKey: "",
            hospitalId: "",

            infoRules: {},
            switch1: false
        };
    },
    created() {
        this.provinceList = this.$store.getters.getProvinceList;
        let id = parseInt(this.$route.query.id);
        this.pageNo = this.$route.query.pageNo?parseInt(this.$route.query.pageNo):1;
        if (isNaN(id)) {
            this.editTt = `添加服务包`;
        } else {
            this.editTt = `修改服务包`;
            this.id = id;
            this.$axios
                .post(api.fdspackageitemselectbyid, { id: this.id })
                .then(resp => {
                    if (resp.data.success) {
                        this.info = resp.data.object;
                        this.info.provinceId = String(this.info.provinceId);
                        if(this.info.cityId){
                            this.cityList = this.$store.getters.getCityList(this.info.provinceId);
                        }
                        if(this.info.areaId){
                            this.areaList = this.$store.getters.getAreaList(this.info.cityId);
                        }
                        if (this.info.hospitalId) {
                            var params = {};
                            params.province = parseInt(
                                this.info.provinceId == 0
                                    ? null
                                    : this.info.provinceId
                            );
                            this.$axios
                                .post(api.hospitalselectbyprovincecode, params)
                                .then(resp => {
                                    this.hospitalList = resp.data.object;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    } else {
                        console.log("查询失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    components: { Avatar, Select, Option, "i-switch": Switch },
    methods: {
        change(status) {
            console.log(this.info.packagestatus);
            console.log(this.info.ascription);
        },
        changeProvince() {
            this.info.cityId = "0";
            this.info.areaId = "0";
            this.info.hospitalId = "0";
            this.cityList = this.$store.getters.getCityList(this.info.provinceId);
        },
        changeCity() {
            this.info.areaId = "0";
            this.info.hospitalId = "0";
            this.areaList = this.$store.getters.getAreaList(this.info.cityId);

        },
        changeArea() {
            this.hospitalId = "0";
            var params = {};
            params.province = parseInt(
                this.info.provinceId == 0 ? null : this.info.provinceId
            );
            this.$axios
                .post(api.hospitalselectbyprovincecode, params)
                .then(resp => {
                    this.hospitalList = resp.data.object;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let msg = this.id ? "修改" : "添加";
                    let subApi = this.id
                        ? api.fdspackageitemupdate
                        : api.fdspackageiteminsert;
                    let params = {};
                    params.id = this.id ? this.id : null;
                    params.serviceName = this.info.serviceName;
                    params.residentowncost = this.info.residentowncost;
                    params.governmentsubsidycost = this.info.governmentsubsidycost;
                    params.amt = this.info.amt;
                    params.packagestatus = parseInt(this.info.packagestatus);
                    params.ascription = parseInt(this.info.ascription);
                    params.hospitalId = this.info.hospitalId == 0 || this.info.hospitalId == undefined ?"":parseInt(this.info.hospitalId);
                    params.serviceDes = this.info.serviceDes;
                    params.provinceId = this.info.provinceId == 0 || this.info.provinceId == undefined ? "":parseInt(this.info.provinceId);
                    params.cityId = this.info.cityId == 0 || this.info.cityId == undefined ? "" : parseInt(this.info.cityId);
                    params.areaId = this.info.areaId == 0 || this.info.areaId == undefined ? "" : parseInt(this.info.areaId);
                    params.remarks = this.info.remarks;
                    params.numberYear = parseInt(this.info.numberYear);
                    params.executingAgency = parseInt(this.info.executingAgency);
                    params.nature = parseInt(this.info.nature);
                    params.amountReceived = this.info.amountReceived;
                    this.$axios
                        .post(subApi, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.success(msg + "成功");
                                this.$router.push({
                                    path:
                                        "/index/operation/servicePackage/itemList",
                                    query: {
                                        pageNo: this.pageNo
                                    }
                                });
                            } else {
                                this.$Message.fail(msg + "失败，请重试");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.$Message.error("数据不正确");
                }
            });
        },
        reback() {
            this.$router.push({
                path: "/index/operation/servicePackage/itemList",
                query: { pageNo: this.pageNo }
            });
        },
        alertMsg(msg) {
            this.$Message.error({
                render: h => {
                    return h("span", {
                        domProps: {
                            innerHTML: msg
                        },
                        style: { color: "#f00" }
                    });
                },
                duration: 3
            });
        },
        changeHospital(val) {
            let param = {};
            param.hospitalId = val;
            this.$axios
                .post(api.getDeptListByHospitalId, param)
                .then(resp => {
                    this.info.deptTypeId = "";
                    if (resp.data.success) {
                        this.deptList = resp.data.object;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        blurInput(e) {
            e.target.blur();
        }
    }
};
</script>
<style lang="less" scoped>
.doctorreviewedit {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .padding-l {
        padding-left: 5px;
    }
    .padding-r {
        padding-right: 5px;
    }
    .padding-t {
        padding-top: 15px;
    }
    .padding-b {
        padding-bottom: 15px;
    }
    .borderRight {
        border-right: 1px solid #e5e5e5;
    }
    .borderLeft {
        border-left: 1px solid #e5e5e5;
    }
    .borderBottom {
        border-bottom: 1px solid #e5e5e5;
    }
    .borderTop {
        border-top: 1px solid #e5e5e5;
    }
    .w-select {
        width: 150px;
    }
    .w-input {
        width: 400px;
    }
    .w-number {
        width: 80px;
    }
    .req-icon {
        font-size: 18px;
        color: red;
        display: inline-block;
        height: 18px;
        width: 18px;
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
    }
    .text-r {
        text-align: right;
    }
}
</style>
<style lang="less">
.upload-avatar {
    display: inline-block;
    vertical-align: middle;
    width: 32px !important;
    height: 32px !important;
    margin-bottom: 3px;
    //   div {
    //     border: 0 !important;
    //   }
}
.avatar-box {
    position: relative;
    display: inline-block;
    .avatar-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        width: 32px;
        height: 32px;
    }
}
.avatar-box:hover .avatar-cover {
    display: block;
    text-align: center;
}
.avatar-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
    line-height: 32px;
}
.progress {
    width: 32px;
}
</style>