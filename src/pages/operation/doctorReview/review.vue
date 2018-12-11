<template>
    <div class="doctorreviewreview">
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>基本信息</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="24">
                <b>头像：</b><Avatar shape="square" icon="ios-person" :src="require('../../../assets/images/heicon.jpg')"/>
            </Col>
        </Row>
        <Row class="borderBottom" v-if="info">
            <Col class="borderRight" :xs="24" :md="12">
                <Row>
                    <Col :xs="24" :md="12">
                        <b>姓名：</b>{{info.name}}
                    </Col>
                    <Col :xs="24" :md="12">
                        <b>性别：</b>{{info.gender | fGender}}
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" :md="12">
                        <b>年龄：</b>{{info.age}}
                    </Col>
                    <Col :xs="24" :md="12">
                        <b>职称：</b>{{info.title}}
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" :md="12">
                        <b>科室：</b>{{info.deptType}}
                    </Col>
                    <Col :xs="24" :md="12">
                        <b>医院级别：</b>三级甲等
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <b>医院名称：</b>{{info.hospitalName}}
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <b>联系方式：</b>{{info.phone}}
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <b>身份证号：</b>{{info.idcard}}
                    </Col>
                </Row>
            </Col>
            <Col class="padding-l" :xs="24" :md="12">
                <Row>
                    <Col :xs="24">
                        <b>擅长：</b>{{info.doctorGood}}
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <b>个人介绍：</b>{{info.personalIntroduction}}
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>认证信息</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="12">
                <b>身份证(正反面照)</b>
            </Col>
            <Col :xs="12">
                <b>医师执业证(首页+个人信息页)</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="12">
                
            </Col>
            <Col :xs="12">
                
            </Col>
        </Row>
        <Row>
            <Col :xs="12">
                <b>医师资格证(首页+毕业院校)</b>
            </Col>
            <Col :xs="12">
                <b>专业技术资格证(职称证)</b>
            </Col>
        </Row>
        <Row>
            <Col :xs="12">
                
            </Col>
            <Col :xs="12">
                
            </Col>
        </Row>
        <Row>
            <Col :xs="24">
                
            </Col>
        </Row>
        <Button v-if="showReviewBtn" @click="reviewPass">审核通过</Button>
        <Button v-if="showReviewBtn" @click="reviewPassNo">审核不通过</Button>
        <Button @click="reback">返回</Button>
        <Modal title="审核提示：" @on-ok="ok" @on-cancel="cancel" v-model="reviewYesStatus" class-name="vertical-center-modal">
            <p><i class="alert-icon" style="display:inline-block; vertical-align: middle; width:20px; height:20px; text-align:center; border-radius:50%; background:#f00; color:#ffffff; font-size:14px; line-height:20px;">!</i>&nbsp;&nbsp;{{reviewMsg}}</p>
        </Modal>
        <Modal title="审核提示：" @on-ok="ok('formValue')" :loading="loading" @on-cancel="cancel" v-model="reviewNoStatus" class-name="vertical-center-modal">
            <Row>
                <Col :xs="24" :mb="4">
                    <i class="req-icon" style="font-size:18px; text-align:center; color:red; display:inline-block; height:18px; width:18px; line-height:18px; vertical-align: middle;">*</i>不通过原因描述&nbsp;&nbsp;<span style="color:red">{{checkAlert}}</span>
                </Col>
                <Col :xs="24" :mb="20">
                    <Form ref="formValue" :model="noMsg" :rules="ruleValue">
                        <FormItem prop="reviewNoMsg">
                            <Input class="" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" v-model="noMsg.reviewNoMsg" placeholder="请输入不通过原因"/>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :mb="4">
                    备注
                </Col>
                <Col :xs="24" :mb="20">
                    <Input class="" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" v-model="reviewNoRemark" placeholder="请输入备注"/>
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar,Upload } from "iview";
export default {
    data(){
        return {
            id:null,
            info:null,
            reviewYesStatus:false,
            reviewNoStatus:false,
            reviewStatus:null,
            reviewMsg:"确认审核通过，是否继续？",
            reviewNoMsg:"",
            reviewNoRemark:"",
            checkAlert:"",
            loading: true,
            titleList: {},
            showReviewBtn:false,
            noMsg:{
                reviewNoMsg:''
            },
            ruleValue:{
                reviewNoMsg:[
                    { required: true, message: '不通过原因不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        this.id = parseInt(this.$route.query.id);
        this.$axios.post(api.delReviewDoctorInfo,{id:this.id})
        .then(resp=>{
            this.info = resp.data.object
            if(this.info.authStatus == 1){
                this.showReviewBtn = true;
            }else{
                this.showReviewBtn = false;
            }
        })
        .catch(err=>{
            this.$Message.info("服务器超时，请重新访问")
        })
        //获取职称列表
        this.$axios
        .post(api.getTitle)
        .then(resp => {
            let tmpTitleList = resp.data.object;
            tmpTitleList.forEach(el=>{
                this.titleList[el.dictType] = el.dictName;
            })
        })
        .catch(err => {
            console.log(err);
        });
    },
    components:{
        Avatar,Upload
    },
    methods:{
        reback(){
            this.$router.back(-1);
        },
        reviewPass(){
            this.reviewYesStatus = true;
            this.reviewStatus = 2;
        },
        reviewPassNo(){
            this.reviewNoStatus = true;
            this.reviewStatus = 3;
        },
        ok(name){
            this.loading = true;
            let params = {},sMsg,fMsg;
            params.id = this.id;
            params.authStatus = this.reviewStatus;
            if(this.reviewStatus == 2){
                sMsg = "审核通过成功";
                fMsg = "审核通过失败，请重试";
                this.review(params,sMsg,fMsg);
            }else if(this.reviewStatus == 3){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checkStatus = true;
                        params.notPassingReasons = this.reviewNoMsg;
                        params.remarks = this.reviewNoRemark;
                        sMsg = "审核不通过成功";
                        fMsg = "审核不通过失败，请重试";
                        this.review(params,sMsg,fMsg);
                    } else {
                        this.loading = false;
                        setTimeout(()=>{
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        },1000)
                    }
                })
            }
        },
        cancel(){
            this.reviewYesStatus = false;
            this.reviewNoStatus = false;
            this.reviewStatus = null;
        },
        review(param,sMsg,fMsg){
            this.$axios.post(api.reviewDoctor,param)
            .then(resp=>{
                if(resp.data.success){
                    this.$Message.info(sMsg);
                    this.$router.push("/index/operation/doctorreview/list");
                }else{
                    this.$Message.info(fMsg);
                    this.reviewYesStatus = false;
                    this.reviewNoStatus = false;
                    this.reviewStatus = null;
                }
            })
            .catch(err=>{
                this.$Message.info("服务器连接超时，请重试");
                this.reviewYesStatus = false;
                this.reviewNoStatus = false;
                this.reviewStatus = null;
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .doctorreviewreview{
        margin-left: 1%;
        padding: 10px;
        width: 98%;
        background: #ffffff;
        box-sizing: border-box;
        .padding-l{
            padding-left:5px;
        }
        .padding-r{
            padding-right:5px;
        }
        .padding-t{
            padding-top:15px;
        }
        .padding-b{
            padding-bottom:15px;
        }
        .borderRight{
            border-right:1px solid #e5e5e5;
        }
        .borderLeft{
            border-left:1px solid #e5e5e5;
        }
        .borderBottom{
            border-bottom:1px solid #e5e5e5;
        }
        .borderTop{
            border-top:1px solid #e5e5e5;
        }
        b{
            font-weight:bold;
        }
    }
</style>