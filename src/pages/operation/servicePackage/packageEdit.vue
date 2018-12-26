<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row>
                <Col :xs="24">
                    <i class="req-icon">*</i>服务包类型：
                    <FormItem prop="paytype">
                        <Select class="w-select" @on-change="changeHospital">
                            <Option>增值付费包</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24">
                    <i class="req-icon">*</i>服务包归属：
                    <FormItem prop="paytype">
                        <Select
                            class="w-select"
                            @on-change="changeProvince"
                            placeholder="省"
                            v-model="province"
                        >
                            <Option value="0">全国</Option>
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
                            v-model="city"
                        >
                            <Option
                                v-for="(item,index) in cityList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select class="w-select" placeholder="区" v-model="area">
                            <Option
                                v-for="item in areaList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select class="w-select" placeholder="医院" v-model="hospitalId">
                            <Option value="0">医院</Option>
                            <Option
                                v-for="item in hospitalList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>服务包名称：
                    <FormItem prop="name">
                        <Input
                            class="w-input"
                            v-model="info.name"
                            :maxlength="20"
                            placeholder="请输入服务包名称"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>操作规范：
                    <FormItem prop="name">
                        <Input
                            class="w-input"
                            v-model="info.name"
                            type="textarea"
                            :maxlength="20"
                            placeholder="请填写具体操作规范"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24">
                    <i class="req-icon">*</i>年服务次数：
                    <FormItem prop="paytype">
                        <Select class="w-select" @on-change="changeHospital">
                            <Option>1次</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24">
                    <i class="req-icon">*</i>执行机构/医生：
                    <FormItem prop="paytype">
                        <Select class="w-select" @on-change="changeHospital">
                            <Option>服务中心</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>收费标准：
                    <FormItem prop="name">
                        <Input class="w-number" v-model="info.name" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>实收金额：
                    <FormItem prop="name">
                        <Input class="w-number" v-model="info.name" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>自付金额：
                    <FormItem prop="name">
                        <Input class="w-number" v-model="info.name" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>政府补贴：
                    <FormItem prop="name">
                        <Input class="w-number" v-model="info.name" :maxlength="20"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>是否启用：
                    <FormItem prop="name">
                        <i-switch v-model="switch1" @on-change="change" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="12">
                    <i class="req-icon">*</i>备注：
                    <FormItem prop="name">
                        <Input
                            class="w-input"
                            v-model="info.name"
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
                name: ""
            },
            pageNo: null,

            provinceList: [],
            cityList: [],
            areaList: [],
            hospitalList: [],
            searchKey: "",
            province: "0",
            city: "0",
            area: "0",
            hospitalId: "",

            hospitalList: [],
            infoRules: {},
            switch1: false
        };
    },
    created() {
        this.provinceList = this.$store.getters.getProvinceList;
        let id = parseInt(this.$route.query.id);
        this.tabId = parseInt(this.$route.query.tabId);
        this.pageNo = parseInt(this.$route.query.pageNo);
        this.tabList = this.healthEducationSontab;
        if (isNaN(id)) {
            this.editTt = `添加服务包`;
        } else {
            this.editTt = `修改服务包`;
            this.id = id;
            this.$axios
                .post(api.educationDetailById, { id: this.id })
                .then(resp => {
                    if (resp.data.success) {
                        this.eduInfo = resp.data.object;
                        this.eduInfo.enable = String(this.eduInfo.enable);
                        this.tryCatch(this.eduInfo.cover) &&
                            this.defaultList.push({
                                url:
                                    this.fileBaseUrl +
                                    this.tryCatch(this.eduInfo.cover).fileName
                            });
                        this.$nextTick(() => {
                            this.uploadList = this.$refs.upload.fileList;
                        });
                    } else {
                        console.log("查询失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        //获取医院列表
        this.$axios
            .post(api.hospitalList)
            .then(resp => {
                this.hospitalList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
    },
    components: { Avatar, Select, Option, 'i-switch':Switch },
    methods: {
        change(status) {
            this.$Message.info("开关状态：" + status);
        },
        changeProvince() {
            this.city = "0";
            this.cityList = this.$store.getters.getCityList(this.province);
        },
        changeCity() {
            this.area = "0";
            this.areaList = this.$store.getters.getAreaList(this.city);
        },
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.checkStatus = true;
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