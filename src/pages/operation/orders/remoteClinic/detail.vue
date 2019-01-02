<template>
    <div class="doctorreviewreview">
        <Row>
            <Col class="tt-box padding-t padding-b text-c" :xs="24">
                <b>远程门诊订单详情</b>
                <span class="order-status">{{statusList[0]}}</span>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>订单号：</b>
                <span>Y101011111015464</span>
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
                        <span>张三</span>
                    </Col>
                    <Col :xs="8">
                        性别：
                        <span>女</span>
                    </Col>
                    <Col :xs="8">
                        出生日期：
                        <span>2019-01-01</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        电话：
                        <span>13838381438</span>
                    </Col>
                    <Col :xs="8">
                        身份证号：
                        <span>410823199006160055</span>
                    </Col>
                    <Col :xs="8">
                        地址：
                        <span>北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        身高：
                        <span>119</span>cm
                    </Col>
                    <Col :xs="8">
                        体重：
                        <span>1000</span>kg
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
                        <span>张三</span>
                    </Col>
                    <Col :xs="8">
                        医生职称：
                        <span>女</span>
                    </Col>
                    <Col :xs="8">
                        医生电话：
                        <span>2019-01-01</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        申请科室：
                        <span>13838381438</span>
                    </Col>
                    <Col :xs="8">
                        申请医院：
                        <span>410823199006160055</span>
                    </Col>
                    <Col :xs="8">
                        申请时间：
                        <span>北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        初步印象诊断：
                        <span>119</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        病情描述说明：
                        <span>119</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">病例图片：
                        <Row v-if="casePic.length>0">
                            <Col :xs="24" v-for="(item,index) of casePic" :key="index">
                                <div class="img-box">
                                    <!-- <img
                                        :src="fileBaseUrl+item.fileName"
                                        @click="handleView(fileBaseUrl+item.fileName)"
                                    >-->
                                    <img :src="item.fileName" @dblclick="handleView(item.fileName)">
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <i class="lit-icon"></i>
                <b>确认信息：</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="1">&nbsp;</Col>
            <Col :xs="23">
                <Row>
                    <Col :xs="8">
                        确认医生：
                        <span>张三</span>
                    </Col>
                    <Col :xs="8">
                        确认时间：
                        <span>2019-01-05 24:00</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        注意事项：
                        <span>已确认显示 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illum accusantium illo ex perferendis perspiciatis, vero laborum, totam repudiandae reprehenderit blanditiis accusamus vel quasi unde quisquam aliquam veritatis ipsam ratione?</span>
                    </Col>
                    <Col :xs="24">
                        拒绝原因：
                        <span>已退费显示 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illum accusantium illo ex perferendis perspiciatis, vero laborum, totam repudiandae reprehenderit blanditiis accusamus vel quasi unde quisquam aliquam veritatis ipsam ratione?</span>
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
                        <span>张三</span>
                    </Col>
                    <Col :xs="8">
                        医生职称：
                        <span>女</span>
                    </Col>
                    <Col :xs="8">
                        医生电话：
                        <span>2019-01-01</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        远程科室：
                        <span>13838381438</span>
                    </Col>
                    <Col :xs="8">
                        远程医院：
                        <span>410823199006160055</span>
                    </Col>
                    <Col :xs="8">
                        远程日期：
                        <span>2018-10-10(已结束显示)</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="8">
                        远程开始时间：
                        <span>13838381438</span>
                    </Col>
                    <Col :xs="8">
                        远程结束时间：
                        <span>410823199006160055</span>
                    </Col>
                    <Col :xs="8">
                        远程用时：
                        <span>2018-10-10</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        远程诊断：
                        <span>13838381438</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        远程门诊处理建议：
                        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti suscipit adipisci reprehenderit quod, reiciendis soluta rerum officiis deserunt culpa illo vitae repellendus a modi dolores totam! Magni ea iste commodi.</span>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        建议时间：
                        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti suscipit adipisci reprehenderit quod, reiciendis soluta rerum officiis deserunt culpa illo vitae repellendus a modi dolores totam! Magni ea iste commodi.</span>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b text-r" :xs="24">
                <Button type="primary" @click="reback">关闭</Button>
            </Col>
        </Row>
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
            info: null,
            pageNo: null,
            statusList: [
                "待支付",
                "待确认",
                "待接诊",
                "已结束",
                "已取消",
                "已退费",
                "患者爽约",
                "申请医生爽约",
                "远程医生爽约"
            ],
            casePic: [{ fileName: require("@/assets/images/weixiaobao.jpg") }],
            showViewModal: false,
            modalSrc: ""
        };
    },
    created() {
        this.id = parseInt(this.$route.query.id);
        this.pageNo = parseInt(this.$route.query.pageNo);
        this.$axios
            .post(api.reviewDoctorInfo, { id: this.id })
            .then(resp => {
                this.info = resp.data.object;
                if (this.info.authStatus == 1) {
                    this.showReviewBtn = true;
                } else {
                    this.showReviewBtn = false;
                }

                this.tryCatch(this.info.docIcon) &&
                    (this.docIcon =
                        this.fileBaseUrl +
                        this.tryCatch(this.info.docIcon).fileName);
                this.tryCatch(this.info.idcardFront) &&
                    (this.idcardFront =
                        this.fileBaseUrl +
                        this.tryCatch(this.info.idcardFront).fileName);

                this.tryCatch(this.info.idcardBack) &&
                    (this.idcardBack =
                        this.fileBaseUrl +
                        this.tryCatch(this.info.idcardBack).fileName);
                this.tryCatch(this.info.specialtyCertificate) &&
                    (this.specialtyCertificate =
                        this.fileBaseUrl +
                        this.tryCatch(this.info.specialtyCertificate).fileName);
                this.tryCatch(this.info.prescriptionSignature) &&
                    (this.prescriptionSignature =
                        this.fileBaseUrl +
                        this.tryCatch(this.info.prescriptionSignature)
                            .fileName);

                this.tryCatch(this.info.practiceCertificate).length > 0 &&
                    (this.practiceCertificate = this.tryCatch(
                        this.info.practiceCertificate
                    ));

                this.tryCatch(this.info.qualificationCertificate).length > 0 &&
                    (this.qualificationCertificate = this.tryCatch(
                        this.info.qualificationCertificate
                    ));
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
                query: { pageNo: this.pageNo }
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
        width: 100%;
        margin: 10px 0px;
        position: relative;
        img {
            max-height: 160px !important;
        }
    }
}
</style>