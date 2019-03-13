<template>
    <div class="registeradd" v-if="info">
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>{{littleTitle}}</b>
            </Col>
        </Row>
        <Row style="line-height:32px;">
            <Col :xs="24" :md="3">{{info.hospitalName}}</Col>
            <Col :xs="24" :md="3">{{info.dept}}</Col>
            <Col :xs="24" :md="2">{{info.doctorName}}</Col>
            <Col :xs="24" :md="3">
                <!-- {{info.address}} -->
            </Col>
        </Row>
        <br>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">就诊地址</Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.address}}</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">门诊类型</Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.outpatientType}}</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c" align="middle" :xs="24" :md="3">门诊时间</Col>
            <Col class="padding-l padding-b padding-t borderLeft" :xs="24" :md="21">
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
                <Row v-for="(item,index) of upList" :key="index">
                    <Col :xs="2">
                        <span v-if="index+1 == 1">
                            上午
                        </span>
                        <span v-else>&nbsp;</span>
                    </Col>
                    <Col :xs="3">
                        <TimePicker
                            :open="false"
                            :value="item[0]"
                            format="HH:mm"
                            type="timerange"
                            :editable="false"
                        >
                            <a href="javascript:void(0)" @click="upClick(index)">
                                <Icon type="ios-clock-outline"></Icon>
                                <template v-if="item[0][0] === '' || item[0][1] === ''">选择时间段</template>
                                <template v-else>{{ item[0][0]+'-'+item[0][1] }}</template>
                            </a>
                        </TimePicker>
                    </Col>
                    <Col :xs="2">{{item[1] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[2] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[3] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[4] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[5] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[6] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[7] || '&nbsp'}}</Col>
                </Row>
                <br>
                <Row v-for="(item,index) of dnList" :key="index">
                    <Col :xs="2">
                        <span v-if="index+1 == 1">
                            下午
                        </span>
                        <span v-else>&nbsp;</span>
                    </Col>
                    <Col :xs="3">
                        <TimePicker
                            :open="false"
                            :value="item[0]"
                            format="HH:mm"
                            type="timerange"
                            :clearable="false"
                            :confirm="true"
                            :editable="false"
                        >
                            <a href="javascript:void(0)">
                                <Icon type="ios-clock-outline"></Icon>
                                <template v-if="item[0][0] === '' || item[0][1] === ''">选择时间段</template>
                                <template v-else>{{ item[0][0]+'-'+item[0][1] }}</template>
                            </a>
                        </TimePicker>
                    </Col>
                    <Col :xs="2">{{item[1] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[2] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[3] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[4] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[5] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[6] || '&nbsp'}}</Col>
                    <Col :xs="2">{{item[7] || '&nbsp'}}</Col>
                </Row>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">预约期限</Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.term}}天</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">医事服务费</Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.cost}}元</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">患者什么时候、到哪里找您领取挂号</Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.receive}}</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">备注</Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.remarks}}</Col>
        </Row>
        <br>
        <Button type="primary" @click="changeRegisterFlag">{{icloseText}}预约</Button>
        <Button type="primary" v-if="info.updateStatus !== 1" @click="toEdit">编辑</Button>
        <Button type="primary" @click="reback">返回</Button>
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
            pageNo: null,
            searchKey: "",
            deptKey: "",
            dictType: "",
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,

            littleTitle: "查看",
            icloseText: "关闭",
            registerFlag: null,

            upList: [],
            dnList: []
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.pageNo = this.$route.query.pageNo
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

        this.$axios
            .post(api.registerDoctorDetail, { registerId: this.id })
            .then(resp => {
                this.info = resp.data.object;
                this.info.registerTimes.map((el, i) => {
                    if(el.day == 1){
                        let tmpPiece = [el.timeStart, el.timeEnd];
                        if(this.upList.length<=0){
                            let tmpArr = [tmpPiece,"","","","","","",""];
                            tmpArr[el.week] = el.num;
                            this.upList.push(tmpArr);
                        }else{
                            let pFlag = true;
                            let tmpIndex = null;
                            let tmpArr = [tmpPiece,"","","","","","",""];
                            this.upList.map((ele,i)=>{
                                if(ele[0].toString() === tmpPiece.toString()){
                                    pFlag = false;
                                    tmpIndex = i;
                                }
                            })
                            if(pFlag){
                                tmpArr[el.week] = el.num;
                                this.upList.push(tmpArr);
                            }else{
                                this.upList[tmpIndex][el.week] = el.num;
                            }
                        }
                    }else if(el.day == 2){
                        let tmpPiece = [el.timeStart, el.timeEnd];
                        if(this.dnList.length<=0){
                            let tmpArr = [tmpPiece,"","","","","","",""];
                            tmpArr[el.week] = el.num;
                            this.dnList.push(tmpArr);
                        }else{
                            let pFlag = true;
                            let tmpIndex = null;
                            let tmpArr = [tmpPiece,"","","","","","",""];
                            this.dnList.map((ele,i)=>{
                                if(ele[0].toString() === tmpPiece.toString()){
                                    pFlag = false;
                                    tmpIndex = i;
                                }
                            })
                            if(pFlag){
                                tmpArr[el.week] = el.num;
                                this.dnList.push(tmpArr);
                            }else{
                                this.dnList[tmpIndex][el.week] = el.num;
                            }
                        }
                    }
                });
                this.registerFlag = this.info.iclose;
                if (this.info.iclose == 1) {
                    this.icloseText = "开启";
                } else {
                    this.icloseText = "关闭";
                }
            })
            .catch(err => {
                // this.$Message.info("服务器超时，请重新访问")
            });

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
        changeRegisterFlag() {
            if (this.registerFlag == 1) {
                this.registerFlag = 0;
            } else {
                this.registerFlag = 1;
            }

            this.$axios
                .post(api.changeRegisterStatus, {
                    id: this.id,
                    iclose: this.registerFlag
                })
                .then(resp => {
                    if (resp.data.success) {
                        this.$Message.info(this.icloseText + "成功");
                    } else {
                        this.$Message.info(this.icloseText + "失败");
                    }
                    if (this.registerFlag == 1) {
                        this.icloseText = "开启";
                    } else {
                        this.icloseText = "关闭";
                    }
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问")
                });
        },
        toEdit() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/segmentationedit",
                {
                    id: this.id,
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2,
                    searchType: this.searchType,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType
                }
            );
        },

        reback() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/list",
                {
                    pageNo: this.pageNo,
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
    .cus-btn {
        vertical-align: middle;
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        font-size: 30px;
        border: 0;
        border-radius: 50%;
        background: #2d8cf0;
        &:focus {
            border: 0;
            outline: none;
        }
    }
}
</style>
<style lang="less">
.ivu-btn-ghost {
    display: none;
}
</style>