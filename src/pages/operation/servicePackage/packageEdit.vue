<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>服务包名称：
                </Col>
                <Col :xs="21">
                    <FormItem prop="itemName">
                        <Input
                            class="w-input"
                            v-model="info.itemName"
                            :maxlength="60"
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
                        <iSwitch v-model="info.packagestatus" :true-value="1" :false-value="0">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </iSwitch>
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
                            :disabled="provinceStatus"
                            :clearable="!provinceStatus"
                        >
                            <Option
                                v-for="item in provinceList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeCity"
                            placeholder="市"
                            v-model="info.cityId"
                            :disabled="cityStatus"
                            :clearable="!cityStatus"
                        >
                            <Option
                                v-for="(item) in cityList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeArea"
                            placeholder="区"
                            v-model="info.areaId"
                            :disabled="areaStatus"
                            :clearable="!areaStatus"
                        >
                            <Option
                                v-for="item in areaList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select-hos"
                            @on-change="changeHospital"
                            placeholder="医院"
                            v-model="info.hospitalId"
                            :disabled="hospitalStatus"
                            :clearable="!hospitalStatus"
                        >
                            <Option
                                v-for="item in hospitalList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.orgName}}</Option>
                        </Select>
                        <iSwitch
                            v-if="info.hospitalId != '' && info.hospitalId != null && info.hospitalId != 0"
                            v-model="info.ascription"
                            :true-value="0"
                            :false-value="1"
                            size="large"
                        >
                            <span slot="open">公有</span>
                            <span slot="close">私有</span>
                        </iSwitch>
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
                <Col :xs="18">{{executingAgencyList[detail.executingAgency]}}</Col>
            </Row>
            <Row>
                <Col :xs="6" class="text-r">
                    <i class="req-icon"></i>服务价格：
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
import { Avatar } from "iview";
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
                provinceId: null,
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
            provinceStatus: false,
            cityList: [],
            cityStatus: false,
            areaList: [],
            areaStatus: false,
            hospitalList: [],
            hospitalStatus: false,
            province: "0",
            city: "0",
            area: "0",
            hospitalId: "",
            type: null,
            infoRules: {
                itemName: [
                    {
                        required: true,
                        message: "服务包名称不能为空",
                        trigger: "blur"
                    }
                ]
            },
            switch1: false,
            searchKey: null,

            identity: null,
            identityCoding: null,
            ownArea: null,

            count: 0,
            pageSize: 10,
            pageNo: 1,
            listPageNo: null,

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
            selData: [],

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

        let id = parseInt(this.$route.query.id);
        this.type = this.$route.query.type
            ? parseInt(this.$route.query.type)
            : null;
        this.tabId = parseInt(this.$route.query.tabId);
        this.listPageNo = parseInt(
            this.$route.query.pageNo ? this.$route.query.pageNo : 1
        );
        this.tabList = this.healthEducationSontab;

        this.identity = this.$store.getters.getIdentity;
        this.identityCoding = this.$store.getters.getIdentityCoding;
        this.ownArea = JSON.parse(this.$store.getters.getOwnArea);
        if (this.ownArea.province) {
            this.provinceStatus = true;
            this.provinceList.push(this.ownArea.province);
            this.info.provinceId = this.ownArea.province.id;
        }
        if (this.ownArea.city) {
            this.cityStatus = true;
            this.cityList.push(this.ownArea.city);
            this.info.cityId = this.ownArea.city.id;
        }
        if (this.ownArea.area) {
            this.areaStatus = true;
            this.areaList.push(this.ownArea.area);
            this.info.areaId = this.ownArea.area.id;
        }
        if (this.identity == 1) {
            this.provinceList = this.$store.getters.getProvinceList;
        } else if (this.identity == 2) {
            this.cityList = this.$store.getters.getCityList(
                this.info.provinceId
            );
        } else if (this.identity == 3) {
            this.areaList = this.$store.getters.getAreaList(this.info.cityId);
        } else if (this.identity == 4) {
            var params = {};
            params.provinceCode = parseInt(this.info.provinceId);
            params.cityCode = parseInt(this.info.cityId);
            params.districtCode = parseInt(this.info.areaId);
            this.$axios
                .post(api.hospitalselectbyprovincecode, params)
                .then(resp => {
                    let list = resp.data.object;
                    list.map((el, i) => {
                        let tmpObj = {};
                        tmpObj.id = parseInt(el.id);
                        tmpObj.orgName = el.orgName;
                        this.hospitalList.push(tmpObj);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (this.identity == 5) {
            this.info.hospitalId = parseInt(this.identityCoding);
            this.hospitalStatus = true;
            this.$axios
                .post(api.managementInfo, {
                    hospitalId: parseInt(this.identityCoding)
                })
                .then(resp => {
                    this.hospitalList.push({
                        id: resp.data.object.hospitalId,
                        orgName: resp.data.object.orgName
                    });
                })
                .catch(err => {});
        }

        if (isNaN(id)) {
            this.editTt = `添加服务包`;
            // if (this.info.provinceId) {
            //     this.cityList = this.$store.getters.getCityList(
            //         this.info.provinceId
            //     );
            // }
        } else {
            console.log("修改服务包");
            this.editTt = `修改服务包`;
            this.id = id;
            this.$axios
                .post(api.servicepackageselectbyid, { id: this.id })
                .then(resp => {
                    if (resp.data.success) {
                        this.info = resp.data.object;
                        for (let item of this.info.packageItems) {
                            this.selData.push({
                                id: item.id,
                                serviceName: item.serviceName
                            });
                        }
                        this.info.provinceId = this.info.provinceId;
                        if (this.info.provinceId) {
                            this.cityList = this.$store.getters.getCityList(
                                this.info.provinceId
                            );
                        }
                        if (this.info.cityId) {
                            this.areaList = this.$store.getters.getAreaList(
                                this.info.cityId
                            );
                        }
                        if (this.info.areaId) {
                            var params = {};
                            params.provinceCode = parseInt(
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
                        this.loadPage(1);
                    } else {
                        console.log("查询失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (isNaN(id)) this.loadPage(1);

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/servicePackage/pindex",
                title: "服务包管理"
            },
            {
                path: "/index/operation/servicePackage/pList",
                title: "服务包管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    components: { Avatar },
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
                            params.provinceCode = parseInt(
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
            if (this.info.provinceId) {
                this.selData.push(obj);
            } else {
                this.$Message.info("请选择服务包所属区域");
            }
        },
        selRemove(_index) {
            this.selData.splice(_index, 1);
        },
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.provinceId = parseInt(
                this.info.provinceId == 0 ? null : this.info.provinceId
            );
            if (params.provinceId) {
                params.cityId = parseInt(
                    this.info.cityId == 0 ? null : this.info.cityId
                );
                params.areaId = null;
                params.hospitalId = null;
            } else {
                params.cityId = null;
            }
            if (params.cityId) {
                params.areaId = parseInt(
                    this.info.areaId == 0 ? null : this.info.areaId
                );
                params.hospitalId = null;
            } else {
                params.areaId = null;
            }
            if (params.areaId) {
                params.hospitalId = parseInt(
                    this.info.hospitalId == 0 || this.info.hospitalId == ""
                        ? null
                        : this.info.hospitalId
                );
            } else {
                params.hospitalId = null;
            }
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
        changeProvince() {
            this.info.cityId = null;
            this.info.areaId = null;
            this.info.hospitalId = null;
            this.hospitalList = [];
            this.cityList = this.$store.getters.getCityList(
                this.info.provinceId
            );
            this.allData = [];
            this.selData = [];
            this.loadPage(1);
        },
        changeCity() {
            this.info.areaId = null;
            this.info.hospitalId = null;
            this.hospitalList = [];
            this.areaList = this.$store.getters.getAreaList(this.info.cityId);
            this.allData = [];
            this.selData = [];
            this.loadPage(1);
        },
        changeArea() {
            this.info.hospitalId = null;
            this.hospitalList = [];
            if (this.info.areaId) {
                var params = {};
                params.provinceCode = this.info.provinceId;
                params.cityCode = this.info.cityId;
                params.districtCode = this.info.areaId;
                if (this.info.areaId) {
                    this.$axios
                        .post(api.hospitalselectbyprovincecode, params)
                        .then(resp => {
                            this.hospitalList = resp.data.object;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
            this.allData = [];
            this.selData = [];
            this.loadPage(1);
        },
        changeHospital() {
            this.allData = [];
            this.selData = [];
            this.loadPage(1);
        },
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.selData.length <= 0) {
                        this.$Message.error("已选服务项目不能为空");
                    }
                    let msg = this.id ? "修改" : "添加";
                    let params = {};
                    params.id = this.id ? this.id : null;
                    params.itemName = this.info.itemName;
                    params.packagestatus = parseInt(this.info.packagestatus);
                    params.ascription = parseInt(this.info.ascription);
                    params.hospitalId =
                        this.info.hospitalId == 0 ||
                        this.info.hospitalId == undefined ||
                        this.info.hospitalId == null
                            ? ""
                            : parseInt(this.info.hospitalId);
                    params.provinceId =
                        this.info.provinceId == 0 ||
                        this.info.provinceId == undefined
                            ? ""
                            : parseInt(this.info.provinceId);
                    params.cityId =
                        this.info.cityId == 0 || this.info.cityId == undefined
                            ? ""
                            : parseInt(this.info.cityId);
                    params.areaId =
                        this.info.areaId == 0 || this.info.areaId == undefined
                            ? ""
                            : parseInt(this.info.areaId);
                    params.packageItemsIds = [];
                    for (let item of this.selData) {
                        params.packageItemsIds.push(item.id);
                    }

                    this.$axios
                        .post(api.servicepackageinsert, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.success(msg + "成功");
                                if (this.type) {
                                    //   公用方法
                                    this.functionJS.queryNavgationTo(
                                        this,
                                        "/index/operation/servicePackage/list",
                                        {
                                            province: this.province,
                                            city: this.city,
                                            area: this.area,
                                            hospital: this.hospital,
                                            isBack: 2
                                        }
                                    );
                                } else {
                                    //   公用方法
                                    this.functionJS.queryNavgationTo(
                                        this,
                                        "/index/operation/servicePackage/pList",
                                        {
                                            pageNo: this.listPageNo,
                                            province: this.province,
                                            city: this.city,
                                            area: this.area,
                                            hospital: this.hospital,
                                            isBack: 2
                                        }
                                    );
                                }
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
            if (this.type) {
                //   公用方法
                this.functionJS.queryNavgationTo(
                    this,
                    "/index/operation/servicePackage/list",
                    {
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        hospital: this.hospital,
                        isBack: 2
                    }
                );
            } else {
                //   公用方法
                this.functionJS.queryNavgationTo(
                    this,
                    "/index/operation/servicePackage/pList",
                    {
                        pageNo: this.listPageNo,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        hospital: this.hospital,
                        isBack: 2
                    }
                );
            }
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
    .w-select-hos {
        width: 200px;
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