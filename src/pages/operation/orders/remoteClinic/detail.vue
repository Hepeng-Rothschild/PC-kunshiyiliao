<template>
    <div class="doctorreviewreview">
        <template v-if="info.orderNumber">
        <Row>
            <Col class="tt-box padding-t padding-b text-c" :xs="24">
                <b>远程门诊订单详情</b>
                <span class="order-status">{{statusList[info.remoteType]}}</span>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>订单号：</b>
                <span>{{info.orderNumber}}</span>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <i class="lit-icon"></i>
                <b>患者信息：</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="1">&nbsp;</Col>
            <Col :xs="23">
                <Row>
                    <Col :xs="8">
                        姓名：
                        <span>{{info.memberName}}</span>
                    </Col>
                    <Col :xs="8">
                        性别：
                        <span>{{info.gender | fGender }}</span>
                    </Col>
                    <Col :xs="8">
                        出生日期：
                        <span>{{info.birth}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        电话：
                        <span>{{info.telephone}}</span>
                    </Col>
                    <Col :xs="8">
                        身份证号：
                        <span>{{info.idcard}}</span>
                    </Col>
                    <Col :xs="8">
                        地址：
                        <span>{{info.presentAddr}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        身高：
                        <span>{{info.height}}</span>cm
                    </Col>
                    <Col :xs="8">
                        体重：
                        <span>{{info.weight}}</span>kg
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <i class="lit-icon"></i>
                <b>申请信息：</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="1">&nbsp;</Col>
            <Col :xs="23">
                <Row>
                    <Col :xs="8">
                        申请医生：
                        <span>{{info.applyDoctorName}}</span>
                    </Col>
                    <Col :xs="8">
                        医生职称：
                        <span>{{info.applyTitle}}</span>
                    </Col>
                    <Col :xs="8">
                        医生电话：
                        <span>{{info.applyPhone}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        申请科室：
                        <span>{{info.applyDeptName}}</span>
                    </Col>
                    <Col :xs="8">
                        申请医院：
                        <span>{{info.applyHospital}}</span>
                    </Col>
                    <Col :xs="8">
                        申请时间：
                        <span>{{info.applyTime}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        初步印象诊断：
                        <span>{{info.assessmentcontent}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        病情描述说明：
                        <span>{{info.description}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">病例图片：
                        <Row v-if="info.caseImages.length>0">
                            <Col :xs="24">
                                <div class="img-box" v-for="(item,index) of info.caseImages" :key="index">
                                    <img
                                        :src="fileBaseUrl+item.fileName"
                                        @click="handleView(fileBaseUrl+item.fileName)"
                                    >
                                    <!-- <img :src="item.fileName" @dblclick="handleView(item.fileName)"> -->
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row v-if="info.remoteType > 1 && info.remoteType != 5">
            <Col class="padding-t padding-b" :xs="24">
                <i class="lit-icon"></i>
                <b>确认信息：</b>
            </Col>
        </Row>
        <Row v-if="info.remoteType > 1 && info.remoteType != 5">
            <Col :xs="1">&nbsp;</Col>
            <Col :xs="23">
                <Row>
                    <Col :xs="8">
                        确认医生：
                        <span>{{info.remoteDoctorName}}</span>
                    </Col>
                    <Col :xs="8">
                        确认时间：
                        <!-- <span>{{info.memberName}}</span> -->
                        <span>2019-02-05 00:01:01</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" v-if="info.remoteType != 4">
                        注意事项：
                        <span>{{info.attention}}</span>
                    </Col>
                    <Col :xs="24" v-if="info.remoteType == 4">
                        拒绝原因：
                        <span>{{info.refuseReason}}</span>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <i class="lit-icon"></i>
                <b>接诊信息：</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="1">&nbsp;</Col>
            <Col :xs="23">
                <Row>
                    <Col :xs="8">
                        远程医生：
                        <span>{{info.remoteDoctorName}}</span>
                    </Col>
                    <Col :xs="8">
                        医生职称：
                        <span>{{info.remoteTitle}}</span>
                    </Col>
                    <Col :xs="8">
                        医生电话：
                        <span>{{info.remotePhone}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        远程科室：
                        <span>{{info.remoteDepartmentName}}</span>
                    </Col>
                    <Col :xs="8">
                        远程医院：
                        <span>{{info.remoteHospitalName}}</span>
                    </Col>
                    <Col :xs="8" v-if="info.remoteType == 3">
                        远程日期：
                        <span>{{info.remoteDate}}</span>
                    </Col>
                </Row>
                <Row v-if="info.remoteType == 3">
                    <Col :xs="8">
                        远程开始时间：
                        <span>{{info.remoteStartTime}}</span>
                    </Col>
                    <Col :xs="8">
                        远程结束时间：
                        <span>{{info.remoteEndTime}}</span>
                    </Col>
                    <Col :xs="8">
                        远程用时：
                        <span>{{info.remoteUseTime}}</span>
                    </Col>
                </Row>
                <Row v-if="info.remoteType == 3">
                    <Col :xs="24">
                        远程诊断：
                        <span>{{info.remoteDiagnosis}}</span>
                    </Col>
                </Row>
                <Row v-if="info.remoteType == 3">
                    <Col :xs="24">
                        远程门诊处理建议：
                        <span>{{info.suggestion}}</span>
                    </Col>
                </Row>
                <Row v-if="info.remoteType == 3">
                    <Col :xs="24">
                        建议时间：
                        <span>{{info.suggestionTime}}</span>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b text-r" :xs="24">
                <Button type="primary" @click="reback">关闭</Button>
            </Col>
        </Row>
        </template>
        <Modal title="预览" :footer-hide="true" v-model="showViewModal">
            <img :src="modalSrc" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            id: null,
            info: {
                orderNumber:null
            },
            pageNo: null,
            statusList: [
                "待支付",
                "待确认",
                "待接诊",
                "已结束",
                "已退费",
                "已取消",
                "患者爽约",
                "申请医生爽约",
                "远程医生爽约"
            ],
            casePic: [{ fileName: require("@/assets/images/weixiaobao.jpg") }],
            showViewModal: false,
            modalSrc: "",

            searchKey: "",
            startDate: "",
            endDate: "",
            status: null,
        };
    },
    created() {
        this.id = parseInt(this.$route.query.id);
        this.pageNo = this.$route.query.pageNo?parseInt(this.$route.query.pageNo):1;
        this.searchKey = this.$route.query.searchKey?this.$route.query.searchKey:"";
        this.startDate = this.$route.query.startDate?this.$route.query.startDate:"";
        this.endDate = this.$route.query.endDate?this.$route.query.endDate:"";
        this.status = this.$route.query.status == null?null:parseInt(this.$route.query.status);
        let breadList = [
            {path:"/index",title:"首页"},
            {path:"/index/operation/ordersmanagement/index",title:"订单管理"},
            {path:"/index/operation/orders/remoteClinic/list",title:"远程门诊订单"}
        ]
        this.$emit("changeBreadList",breadList);
        
        this.$axios
            .post(api.ordermanagementselectbyremoteclinicid, { remoteClinicId: this.id })
            .then(resp => {
                this.info = resp.data.object;
                
                this.info.caseImages = this.tryCatch(this.info.caseImages) ? this.tryCatch(this.info.caseImages) : [];
            })
            .catch(err => {
                // this.$Message.info("服务器超时，请重新访问")
            });
    },
    methods: {
        handleView(src) {
            this.modalSrc = src;
            this.showViewModal = true;
        },
        reback() {
            this.$router.push({
                path: "/index/operation/orders/remoteClinic/list",
                query: { 
                    pageNo: this.pageNo,
                    searchKey: this.searchKey,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    status: this.status
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.doctorreviewreview {
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
    .text-r {
        text-align: right;
    }
    .text-c {
        text-align: center;
    }
    .text-l {
        text-align: left;
    }
    .tt-box {
        position: relative;
        b {
            line-height: 30px;
        }
        .order-status {
            position: absolute;
            right: 30px;
            border: 1px solid #2d8cf0;
            padding: 5px 15px 5px 15px;
        }
    }
    .lit-icon {
        display: inline-block;
        background-color: #2d8cf0;
        width: 5px;
        height: 16px;
        vertical-align: middle;
    }
    .img-box {
        display:inline-block;
        min-width: 320px;
        min-height: 160px;
        margin: 10px 10px;
        img {
            max-width: 320px !important;
            max-height: 160px !important;
        }
    }
}
</style>