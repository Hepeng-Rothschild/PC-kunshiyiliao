<template>
    <div class="registerdetail" v-if="info">
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>{{littleTitle}}</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="24" :md="3">{{info.hospitalName}}</Col>
            <Col :xs="24" :md="3">{{info.dept}}</Col>
            <Col :xs="24" :md="2">{{info.doctorName}}</Col>
            <Col :xs="24" :md="3">
                <!-- {{info.address}} -->
            </Col>
        </Row>
        <br>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">
                <b>就诊地址</b>
            </Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.address}}</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">
                <b>门诊类型</b>
            </Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.outpatientType}}</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c" :xs="24" :md="3">
                <b>门诊时间</b>
            </Col>
            <Col class="padding-l borderLeft" :xs="24" :md="21">
                <Row>
                    <Col class="text-align-c" :xs="2">&nbsp;</Col>
                    <Col class="text-align-c" :xs="2">星期一</Col>
                    <Col class="text-align-c" :xs="2">星期二</Col>
                    <Col class="text-align-c" :xs="2">星期三</Col>
                    <Col class="text-align-c" :xs="2">星期四</Col>
                    <Col class="text-align-c" :xs="2">星期五</Col>
                    <Col class="text-align-c" :xs="2">星期六</Col>
                    <Col class="text-align-c" :xs="2">星期日</Col>
                </Row>
                <Row>
                    <Col class="text-align-c" :xs="2">上午</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd11?info.wd11:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd21?info.wd21:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd31?info.wd31:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd41?info.wd41:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd51?info.wd51:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd61?info.wd61:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd71?info.wd71:'&nbsp;'}}</Col>
                </Row>
                <Row>
                    <Col class="text-align-c" :xs="2">下午</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd12?info.wd12:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd22?info.wd22:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd32?info.wd32:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd42?info.wd42:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd52?info.wd52:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd62?info.wd62:'&nbsp;'}}</Col>
                    <Col class="text-align-c" :xs="2">{{info.wd72?info.wd72:'&nbsp;'}}</Col>
                </Row>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">
                <b>预约期限</b>
            </Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.term}}天</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">
                <b>医事服务费</b>
            </Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.cost}}元</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">
                <b>患者什么时候、到哪里找您领取挂号</b>
            </Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.receive}}</Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">
                <b>备注</b>
            </Col>
            <Col class="padding-l" :xs="24" :md="21">{{info.remarks}}</Col>
        </Row>
        <br>
        <Button type="primary" @click="changeRegisterFlag">{{icloseText}}预约</Button>
        <Button type="primary" @click="toEdit">编辑</Button>
        <Button type="primary" @click="reback">返回</Button>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar, Upload } from "iview";
import tempHeader from "@/components/tmpHeader";
export default {
    data() {
        return {
            id: null,
            info: null,
            pageNo: null,
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,
            searchType: 1,
            searchKey: "",
            deptKey: "",
            dictType: "",

            littleTitle: "查看",
            icloseText: "关闭",
            registerFlag: null
        };
    },
    created() {
        this.id = parseInt(this.$route.query.id);
        this.pageNo = parseInt(this.$route.query.pageNo);
        this.province = this.$route.query.province?parseInt(this.$route.query.province):null;
        this.city = this.$route.query.city?parseInt(this.$route.query.city):null;
        this.area = this.$route.query.area?parseInt(this.$route.query.area):null;
        this.hospital = this.$route.query.hospital?parseInt(this.$route.query.hospital):null;
        this.searchType = this.$route.query.searchType?parseInt(this.$route.query.searchType):1;
        this.searchKey = this.$route.query.searchKey?this.$route.query.searchKey:"";
        this.deptKey = this.$route.query.deptKey?this.$route.query.deptKey:"";
        this.dictType = this.$route.query.dictType?this.$route.query.dictType:"";

        this.$axios
            .post(api.registerDoctorDetail, { registerId: this.id })
            .then(resp => {
                this.info = resp.data.object;
                for (let i = 0; i < this.info.registerTimes.length; i++) {
                    let tmpregistertimes = this.info.registerTimes[i];
                    this.info[
                        "wd" + tmpregistertimes.week + tmpregistertimes.day
                    ] = tmpregistertimes.num;
                }
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
    components: {
        Avatar,
        Upload,
        tempHeader
    },
    methods: {
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
                    isBack:2,
                    searchType: this.searchType,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType
                }
            );

        },
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
                "/index/operation/register/normaledit",
                {
                    id: this.id, 
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack:2,
                    searchType: this.searchType,
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
.registerdetail {
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
    b {
        font-weight: bold;
    }
    .w-select {
        width: 100px;
    }
    .w-input {
        width: 200px;
    }
    .text-align-c {
        text-align: center;
        line-height: 32px;
    }
    .bordered {
        border: 1px solid #e5e5e5;
    }
}
</style>