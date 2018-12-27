<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>服务包名称：
                </Col>
                <Col :xs="21">
                    <FormItem prop="itemName">
                        <Input
                            class="w-input"
                            v-model="info.itemName"
                            :maxlength="20"
                            placeholder="请输入服务包名称"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>是否启用：
                </Col>
                <Col :xs="21">
                    <FormItem prop="name">
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
                    <i class="req-icon"></i>&nbsp;
                </Col>
                <Col :xs="21">
                    <FormItem prop="paytype">
                        <Select
                            class="w-select"
                            @on-change="changeProvince"
                            placeholder="省"
                            v-model="info.provinceId"
                        >
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
                            placeholder="区"
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
                            :true-value="0"
                            :false-value="1"
                            size="large"
                            @on-change="change"
                        >
                            <span slot="open">公有</span>
                            <span slot="close">私有</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>
                </Col>
                <Col :xs="21">
                    <FormItem prop="searchKey">
                        <Input class="w-input" search v-model="searchKey" placeholder="请输入服务项关键字"/>
                        <Button type="primary" @click="loadPage(1)">
                            <Icon type="ios-search" size="14" style="margin-right:5px;"/>查询
                        </Button>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col offset="3" :xs="9">
                    <h2 class="text-c">可选服务项目</h2>
                    <Table border class="m-table" :columns="allCol" :data="allData"></Table>
                    <Page
                        :total="count"
                        size="small"
                        :current="pageNo"
                        :page-size="pageSize"
                        @on-change="loadPage"
                    />
                </Col>
                <Col offset="2" :xs="9">
                    <h2 class="text-c">已选服务项目</h2>
                    <Table border class="m-table" :columns="selCol" :data="selData"></Table>
                </Col>
            </Row>
            <br>
            <Row>
                <Col offset="3" :xs="20" class="text-c">
                    <Button
                        size="large"
                        class="margin-r"
                        type="primary"
                        @click="submit('formInline')"
                    >提交</Button>
                    <Button size="large" class="margin-l" type="default" @click="reback">取消</Button>
                </Col>
            </Row>
        </Form>
        <Modal
            title="服务项目详情："
            v-model="modalStatus"
            class-name="vertical-center-modal"
            :footer-hide="true"
        >
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>服务项目类型：
                </Col>
                <Col :xs="18">{{detail.nature}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>服务项目归属：
                </Col>
                <Col :xs="18">
                    {{detail.province}}
                    &nbsp;&nbsp;
                    {{detail.city}}
                    &nbsp;&nbsp;
                    {{detail.area}}
                    &nbsp;&nbsp;
                    {{detail.hospital}}
                    &nbsp;&nbsp;
                    <span
                        v-if="detail.hospitalId"
                    >{{detail.ascription}}</span>
                </Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>服务项目名称：
                </Col>
                <Col :xs="18">{{detail.serviceName}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>操作规范：
                </Col>
                <Col :xs="18">{{detail.serviceDes}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>年服务次数：
                </Col>
                <Col :xs="18">{{detail.numberYear}}次</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>执行机构/医生：
                </Col>
                <Col :xs="18">{{detail.executingAgency}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>收费标准：
                </Col>
                <Col :xs="18">￥{{detail.amt}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>实收金额：
                </Col>
                <Col :xs="18">￥{{detail.amountReceived}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>自付金额：
                </Col>
                <Col :xs="18">￥{{detail.residentowncost}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>政府补贴：
                </Col>
                <Col :xs="18">￥{{detail.governmentsubsidycost}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>是否启用：
                </Col>
                <Col :xs="18">{{detail.packagestatus}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>备注：
                </Col>
                <Col :xs="18">{{detail.remarks}}</Col>
            </Row>
        </Modal>
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
                itemName: null,
                areaId: null,
                cityId: null,
                hospitalId: null,
                id: null,
                packageItemsIds: null,
                provinceId: "0",
                packagestatus: 1,
                ascription: 1
            },

            detail: {},
            natureList: ["", "增值付费项目", "基本公共卫生服务承担项目"],
            executingAgencyList: ["", "服务中心", "签约医院"],

            tmpProvinceList: [],
            tmpCityList: [],
            tmpAreaList: [],
            tmpHospitalList: [],

            provinceList: [],
            cityList: [],
            areaList: [],
            hospitalList: [],
            province: "0",
            city: "0",
            area: "0",
            hospitalId: "",

            infoRules: {},
            switch1: false,
            searchKey: null,

            count: 0,
            pageSize: 10,
            pageNo: 1,

            modalStatus: false,

            allCol: [
                {
                    title: "服务项",
                    key: "serviceName",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let id = params.row.id;
                        let status = true;
                        for (let item of this.selData) {
                            if (item.id == id) {
                                status = false;
                            }
                        }
                        let selBtn = null;
                        let spacer = null;
                        if (status) {
                            spacer = " | ";
                            selBtn = h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.selThis({
                                                id: params.row.id,
                                                serviceName:
                                                    params.row.serviceName
                                            });
                                        }
                                    }
                                },
                                "选择"
                            );
                        }
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.showDetail(id);
                                        }
                                    }
                                },
                                "查看"
                            ),
                            spacer,
                            selBtn
                        ];
                    }
                }
            ],
            selCol: [
                {
                    title: "服务项",
                    key: "serviceName",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        let id = params.row.id;
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.selRemove(params.row._index);
                                        }
                                    }
                                },
                                "移除"
                            )
                        ];
                    }
                }
            ],
            allData: [],
            selData: []
        };
    },
    created() {
        this.provinceList = this.$store.getters.getProvinceList;
        let id = parseInt(this.$route.query.id);
        this.tabId = parseInt(this.$route.query.tabId);
        this.pageNo = parseInt(
            this.$route.query.pageNo ? this.$route.query.pageNo : 1
        );
        this.tabList = this.healthEducationSontab;
        if (isNaN(id)) {
            this.editTt = `添加服务包`;
        } else {
            this.editTt = `修改服务包`;
            this.id = id;
            this.$axios
                .post(api.servicepackageselectbyid, { id: this.id })
                .then(resp => {
                    if (resp.data.success) {
                        this.info = resp.data.object;
                        for(let item of this.info.packageItems){
                            this.selData.push({id:item.id,serviceName:item.serviceName})
                        }

                        this.info.provinceId = String(this.info.provinceId);
                        if (this.info.cityId) {
                            this.cityList = this.$store.getters.getCityList(
                                this.info.provinceId
                            );
                        }
                        if (this.info.areaId) {
                            this.areaList = this.$store.getters.getAreaList(
                                this.info.cityId
                            );
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
        this.loadPage(1);
    },
    components: { Avatar, Select, Option, "i-switch": Switch },
    methods: {
        showDetail(id) {
            this.$axios
                .post(api.fdspackageitemselectbyid, { id })
                .then(resp => {
                    if (resp.data.success) {
                        let Flag = true;
                        this.detail = resp.data.object;
                        this.detail.nature = this.natureList[
                            this.detail.nature
                        ];
                        this.detail.ascription =
                            this.detail.ascription == 1 ? "私有" : "公有";
                        this.detail.packagestatus =
                            this.detail.packagestatus == 1 ? "启用" : "禁用";
                        if (this.detail.provinceId) {
                            this.tmpProvinceList = this.$store.getters.getProvinceList;
                            for (let item of this.tmpProvinceList) {
                                if (item.value == this.detail.provinceId) {
                                    this.detail.province = item.name;
                                }
                            }
                        }
                        if (this.detail.cityId) {
                            this.tmpCityList = this.$store.getters.getCityList(
                                this.detail.provinceId
                            );
                            for (let item of this.tmpCityList) {
                                if (item.id == this.detail.cityId) {
                                    this.detail.city = item.name;
                                }
                            }
                        }
                        if (this.detail.areaId) {
                            this.tmpAreaList = this.$store.getters.getAreaList(
                                this.detail.cityId
                            );
                            for (let item of this.tmpAreaList) {
                                if (item.id == this.detail.areaId) {
                                    this.detail.area = item.name;
                                }
                            }
                        }
                        if (this.detail.hospitalId) {
                            Flag = false;
                            var params = {};
                            params.province = parseInt(
                                this.detail.provinceId == 0
                                    ? null
                                    : this.detail.provinceId
                            );
                            this.$axios
                                .post(api.hospitalselectbyprovincecode, params)
                                .then(resp => {
                                    this.tmpHospitalList = resp.data.object;
                                    for (let item of this.tmpHospitalList) {
                                        if (item.id == this.detail.hospitalId) {
                                            this.detail.hospital = item.orgName;
                                        }
                                    }
                                    this.modalStatus = true;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                        if (Flag) {
                            this.modalStatus = true;
                        }
                    } else {
                        console.log("查询失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        selThis(obj) {
            this.selData.push(obj);
        },
        selRemove(_index) {
            this.selData.splice(_index, 1);
        },
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.province = parseInt(
                this.info.provinceId == 0 ? null : this.info.provinceId
            );
            params.city = parseInt(
                this.info.cityId == 0 ? null : this.info.cityId
            );
            params.area = parseInt(
                this.info.areaId == 0 ? null : this.info.areaId
            );
            params.hospitalId = parseInt(
                this.info.hospitalId == 0 || this.info.hospitalId == ""
                    ? null
                    : this.info.hospitalId
            );
            params.searchKey = this.searchKey == "" ? null : this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.fdspackageitempage, params)
                .then(resp => {
                    this.count = resp.data.object.count;
                    this.allData = resp.data.object.list;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        change(status) {
            this.$Message.info("开关状态：" + status);
        },
        changeProvince() {
            this.info.cityId = "0";
            this.info.areaId = "0";
            this.info.hospitalId = "0";
            this.cityList = this.$store.getters.getCityList(
                this.info.provinceId
            );
        },
        changeCity() {
            this.info.areaId = "0";
            this.info.hospitalId = "0";
            this.areaList = this.$store.getters.getAreaList(this.info.cityId);
        },
        changeArea() {
            this.info.hospitalId = "0";
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
                    let params = {};
                    params.id = this.id ? this.id : null;
                    params.itemName = this.info.itemName;
                    params.packagestatus = parseInt(this.info.packagestatus);
                    params.ascription = parseInt(this.info.ascription);
                    params.hospitalId = this.info.hospitalId == 0 || this.info.hospitalId == undefined || this.info.hospitalId == null ?"":parseInt(this.info.hospitalId);
                    params.provinceId = this.info.provinceId == 0 || this.info.provinceId == undefined ? "" : parseInt(this.info.provinceId);
                    params.cityId = this.info.cityId == 0 || this.info.cityId == undefined ? "" : parseInt(this.info.cityId);
                    params.areaId = this.info.areaId == 0 || this.info.areaId == undefined ? "" : parseInt(this.info.areaId);
                    params.packageItemsIds = [];
                    for (let item of this.selData) {
                        params.packageItemsIds.push(item.id);
                    }
                    this.$axios
                        .post(api.servicepackageinsert, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.success(msg + "成功");
                                this.$router.push({
                                    path:
                                        "/index/operation/servicePackage/pList",
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
                path: "/index/operation/servicePackage/pList",
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
        width: 100px;
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
    .text-c {
        text-align: center;
    }
    .margin-r {
        margin-right: 60px;
    }
    .margin-l {
        margin-left: 60px;
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
// .w-input input {
//     padding-right:35px;
// }
</style>