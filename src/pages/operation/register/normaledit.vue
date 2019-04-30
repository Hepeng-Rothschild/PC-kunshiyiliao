<template>
    <div class="registeradd">
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>{{littleTitle}}</b>
            </Col>
        </Row>
        <Row style="line-height:32px;">
            <Col :xs="24" :md="3">{{hospitalName}}</Col>
            <Col :xs="24" :md="3">{{dept}}</Col>
            <Col :xs="24" :md="2">{{doctorName}}</Col>
            <Col :xs="24" :md="5">
                <Button type="primary" v-if="addBtnFlag" @click="loadPage(1)">添加专家</Button>
                <span class="expert-msg" :class="{'show-msg': expertMsgStatus}">请添加专家</span>
            </Col>
        </Row>
        <br>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">就诊地址</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Input class="w-input" @on-change="checkInput" :maxlength="60" v-model="address" placeholder="请输入就诊地址"/>
                <span class="rdColor" v-if="addressFlag">就诊地址不能为空</span>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">门诊类型</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Select class="w-select" v-model="outpatientType">
                    <Option
                        v-for="(item,index) of typeList"
                        :key="item.id"
                        :value="item.name"
                    >{{item.name}}</Option>
                </Select>
                <Button type="primary" @click="jump">分时段设置</Button>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c" :xs="24" :md="3">门诊时间</Col>
            <Col class="padding-l borderLeft" :xs="24" :md="21">
                <Row>
                    <Col :xs="2">&nbsp;</Col>
                    <Col :xs="3">&nbsp;</Col>
                    <Col :xs="2">星期一</Col>
                    <Col :xs="2">星期二</Col>
                    <Col :xs="2">星期三</Col>
                    <Col :xs="2">星期四</Col>
                    <Col :xs="2">星期五</Col>
                    <Col :xs="2">星期六</Col>
                    <Col :xs="2">星期日</Col>
                </Row>
                <Row>
                    <Col :xs="2">上午</Col>
                    <Col :xs="3">
                        <TimePicker
                            :open="false"
                            :value="upTime"
                            format="HH:mm"
                            type="timerange"
                            :editable="false"
                            :disabled="true"
                        >
                            <a href="javascript:void(0)">
                                <Icon type="ios-clock-outline"></Icon>
                                <template>{{ upTime[0] + '-' + upTime[1] }}</template>
                            </a>
                        </TimePicker>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd11"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd21"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd31"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd41"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd51"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd61"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd71"></InputNumber>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="2">下午</Col>
                    <Col :xs="3">
                        <TimePicker
                            :open="false"
                            :value="dnTime"
                            format="HH:mm"
                            type="timerange"
                            :editable="false"
                            :disabled="true"
                        >
                            <a href="javascript:void(0)">
                                <Icon type="ios-clock-outline"></Icon>
                                <template>{{ dnTime[0] + '-' + dnTime[1] }}</template>
                            </a>
                        </TimePicker>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd12"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd22"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd32"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd42"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd52"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd62"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="wd72"></InputNumber>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">预约期限</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <InputNumber min="1" max="99" @on-change="checkInput" v-model="term"></InputNumber>天
                <span :class="{rdColor:termRd}" class="notice">预约期限不能为空且不能小于1天</span>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">医事服务费</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <InputNumber min="1" max="9999" @on-change="checkInput" v-model="cost"></InputNumber>元
                <span :class="{rdColor:costRd}" class="notice">医事服务费不能为空，最小为0元</span>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">患者什么时候、到哪里找您领取挂号</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Input
                    class="w-area"
                    v-model="receive"
                    type="textarea"
                    :maxlength="100"
                    placeholder="请输入挂号领取处"
                />
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">备注</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Input class="w-area" v-model="remarks" :maxlength="160" placeholder="请输入备注"/>
            </Col>
        </Row>
        <br>
        <Button type="primary" @click="submit">保存</Button>
        <Button type="primary" @click="reback">返回</Button>
        <Modal v-model="docListModal">
            <p slot="header" style="text-align:center">
                <span>选择专家</span>
            </p>
            <div style="text-align:center">
                <Row class="bordered">
                    <Col class="text-align-c" :xs="24">
                        <Input
                            @on-change="loadPage(1)"
                            class="w-input"
                            v-model="doctorKey"
                            :maxlength="20"
                            placeholder="输入医生姓名、医院、科室"
                        />
                    </Col>
                </Row>
                <Row
                    @click.native="chooseDoc(item.hospitalName,item.hospitalId,item.dept,item.deptId,item.doctorName,item.doctorId,item.title)"
                    style="cursor:pointer;margin:15px 0;"
                    v-for="(item,index) of doctorList"
                    :key="index"
                >
                    <Col :xs="6">{{item.hospitalName}}</Col>
                    <Col :xs="6">{{item.dept}}</Col>
                    <Col :xs="6">{{item.doctorName}}</Col>
                    <Col :xs="6">{{item.title}}</Col>
                </Row>
                <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import tempHeader from "@/components/tmpHeader";
import { Avatar } from "iview";
export default {
    data() {
        return {
            id: null,
            info: null,
            lPageNo: null,
            searchKey: "",
            deptKey: "",
            dictType: "",
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,

            littleTitle: "编辑",
            addBtnFlag: false,
            doctorName: null,
            doctorId: null,
            hospitalName: null,
            hospitalId: null,
            title: null,
            dept: null,
            deptId: null,
            address: null,
            typeList: [
                { id: 1, name: "普通门诊" }
                // {id:2,name:"社保门诊"}
            ],
            outpatientType: "普通门诊",
            upTime: ["08:00", "12:00"],
            dnTime: ["13:00", "17:00"],
            wd11: null,
            wd21: null,
            wd31: null,
            wd41: null,
            wd51: null,
            wd61: null,
            wd71: null,

            wd12: null,
            wd22: null,
            wd32: null,
            wd42: null,
            wd52: null,
            wd62: null,
            wd72: null,

            term: 1,
            cost: 0,
            receive: null,
            remarks: null,
            docListModal: false,
            doctorList: [
                { hospitalName: "", dept: "", doctorName: "", title: "" }
            ],
            doctorKey: "",
            pageNo: 0,
            pageSize: 10,
            count: 0,

            expertMsgStatus: false,
            icut: 1,
            termRd: false,
            costRd: false,

            addressFlag:false
        };
    },
    watch: {
        doctorId(newId, oldId) {
            if (newId == null || newId == "" || newId == undefined) {
                this.expertMsgStatus = true;
            } else {
                this.expertMsgStatus = false;
            }
        }
    },
    created() {
        this.id = this.$route.query.id
            ? parseInt(this.$route.query.id)
            : null;
        this.lPageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.deptKey = this.$route.query.deptKey
            ? this.$route.query.deptKey
            : "";
        this.dictType = this.$route.query.dictType
            ? this.$route.query.dictType
            : "";
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
        this.hospitalName = this.$route.query.hospitalName
            ? this.$route.query.hospitalName
            : null;
        this.hospitalId = this.$route.query.hospitalId
            ? parseInt(this.$route.query.hospitalId)
            : null;
        this.dept = this.$route.query.dept ? this.$route.query.dept : null;
        this.deptId = this.$route.query.deptId
            ? this.$route.query.deptId
            : null;
        this.doctorName = this.$route.query.doctorName
            ? this.$route.query.doctorName
            : null;
        this.doctorId = this.$route.query.doctorId
            ? parseInt(this.$route.query.doctorId)
            : null;
        this.title = this.$route.query.title ? this.$route.query.title : null;
        this.address = this.$route.query.address
            ? this.$route.query.address
            : null;
        this.outpatientType = this.$route.query.outpatientType
            ? this.$route.query.outpatientType
            : "普通门诊";
        this.cost = this.$route.query.cost
            ? parseInt(this.$route.query.cost)
            : 0;
        this.term = this.$route.query.term
            ? parseInt(this.$route.query.term)
            : 1;
        this.receive = this.$route.query.receive
            ? this.$route.query.receive
            : null;
        this.remarks = this.$route.query.remarks
            ? this.$route.query.remarks
            : null;
        this.docListModal = false;

        if (this.id) {
            this.littleTitle = "编辑";
            this.addBtnFlag = false;
        } else {
            this.littleTitle = "添加";
            this.addBtnFlag = true;
            this.expertMsgStatus = true;
        }
        if (this.id) {
            this.$axios
                .post(api.registerDoctorDetail, { registerId: this.id })
                .then(resp => {
                    this.info = resp.data.object;
                    for (let i = 0; i < this.info.registerTimes.length; i++) {
                        let tmpregistertimes = this.info.registerTimes[i];
                        this[
                            "wd" + tmpregistertimes.week + tmpregistertimes.day
                        ] = tmpregistertimes.num;
                    }
                    this.doctorName = this.info.doctorName;
                    this.doctorId = this.info.doctorId;
                    this.hospitalName = this.info.hospitalName;
                    this.hospitalId = this.info.hospitalId;
                    this.dept = this.info.dept;
                    this.deptId = this.info.deptId;
                    this.address = this.info.address;
                    this.outpatientType = this.info.outpatientType;
                    this.term = this.info.term;
                    this.cost = this.info.cost;
                    this.receive = this.info.receive;
                    this.remarks = this.info.remarks;
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问");
                });
        }

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/register/list",
                title: "预约挂号"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    components: { Avatar, tempHeader },
    methods: {
        submit(name) {
            let flag = true;
            if (this.cost == null) return (this.costRd = true);
            if (this.term == null) return (this.termRd = true);

            let tmpRegistertimes = [];
            for (let i = 1; i <= 7; i++) {
                for (let j = 1; j <= 2; j++) {
                    let tmpObj = {};
                    if (j == 1) {
                        tmpObj.timeStart = this.upTime[0];
                        tmpObj.timeEnd = this.upTime[1];
                    } else if (j == 2) {
                        tmpObj.timeStart = this.dnTime[0];
                        tmpObj.timeEnd = this.dnTime[1];
                    }
                    if (this["wd" + i + j] != null && this["wd" + i + j] > 0) {
                        tmpObj.num = this["wd" + i + j];
                        tmpObj.day = j;
                        tmpObj.week = i;
                        tmpRegistertimes.push(tmpObj);
                    }
                }
            }
            if(!this.address){
                this.addressFlag = true;
                flag = false;
            }
            if(tmpRegistertimes.length<=0){
                flag = false;
                this.$Message.error({content:"请至少有一个号源有号再保存，谢谢",duration:5});
            }
            let params = {};
            params.address = this.address;
            params.cost = this.cost;
            params.dept = this.dept;
            params.deptId = this.deptId;
            params.doctorId = this.doctorId;
            params.hospitalId = this.hospitalId;
            params.iclose = this.iclose;
            params.id = this.id;
            params.outpatientType = this.outpatientType;
            params.receive = this.receive;
            params.remarks = this.remarks;
            params.term = this.term;
            params.registerTimes = tmpRegistertimes;
            params.icut = this.icut;
            let url = "";
            let msg = "";
            if (this.id) {
                url = api.registerDoctorUpdate;
                msg = "修改";
            } else {
                url = api.registerDoctorInsert;
                msg = "添加";
            }
            if (params.doctorId) {
                if(flag){
                    this.$axios
                        .post(url, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.info(msg + "成功");
                                //   公用方法
                                this.functionJS.queryNavgationTo(
                                    this,
                                    "/index/operation/register/list",
                                    {
                                        pageNo: this.lPageNo,
                                        province: this.province,
                                        city: this.city,
                                        area: this.area,
                                        hospital: this.hospital,
                                        isBack: 2,
                                        searchKey: this.searchKey,
                                        deptKey: this.deptKey,
                                        dictType: this.dictType
                                    }
                                );
                            } else {
                                this.$Message.info(msg + "失败，请重试");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            } else {
                this.expertMsgStatus = true;
            }
        },
        checkInput() {
            if (this.term == null) this.termRd = true;
            else this.termRd = false;
            if (this.cost == null) this.costRd = true;
            else this.costRd = false;
            if (!this.address) this.addressFlag = true;
            else this.addressFlag = false;
        },
        reback() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/list",
                {
                    pageNo: this.lPageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType
                }
            );
        },
        chooseDoc(
            hospitalName,
            hospitalId,
            dept,
            deptId,
            doctorName,
            doctorId,
            title
        ) {
            this.hospitalName = hospitalName;
            this.hospitalId = hospitalId;
            this.dept = dept;
            this.deptId = deptId;
            this.doctorName = doctorName;
            this.doctorId = doctorId;
            this.title = title;
            this.docListModal = false;
        },
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.searchKey = this.doctorKey.trim();
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.registerDoctorList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.doctorList = resp.data.object.list;
                        this.count = resp.data.object.count;
                        this.pageNo = pageNo;
                        this.docListModal = true;
                    } else {
                        this.$Message.info("查询失败，请重试");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        jump() {
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/segmentationedit",
                {
                    id: this.id,
                    pageNo: this.lPageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType,
                    hospitalName: this.hospitalName,
                    hospitalId: this.hospitalId,
                    dept: this.dept,
                    deptId: this.deptId,
                    doctorName: this.doctorName,
                    doctorId: this.doctorId,
                    title: this.title,
                    address: this.address,
                    outpatientType: this.outpatientType,
                    cost: this.cost,
                    term: this.term,
                    receive: this.receive,
                    remarks: this.remarks
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.registeradd {
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
        width: 200px;
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
    .text-align-c {
        text-align: center;
        line-height: 32px;
    }
    .bordered {
        border: 1px solid #e5e5e5;
    }
    b {
        font-weight: bold;
    }
    .expert-msg {
        color: #f00;
        display: none;
    }
    .show-msg {
        display: inline-block;
    }
    .w-area {
        width: 80%;
    }
    .notice {
        display: inline-block;
        margin-left: 15px;
        color: #aaa;
    }
    span.rdColor {
        color: #ff0000;
    }
    
}
</style>