<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                基本信息
            </Col>
        </Row>
        <Row>
            <Col :xs="24">
                <i class="req-icon"></i>头像：<Avatar shape="square" icon="ios-person" :src="docIcon"/>
            </Col>
        </Row>
        <Form ref="formInline" v-if="info" :model="info" :rules="infoRules" inline>
        <Row class="">
            <Col class="borderRight" :xs="24" :md="12">
                <Row>
                    <Col :xs="24" :md="12">
                        <i class="req-icon">*</i>姓名：
                        <FormItem prop="name">
                            <Input class="w-input" v-model="info.name" :maxlength="20" placeholder="请输入姓名"/>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :md="12">
                        <i class="req-icon">*</i>性别：
                        <FormItem prop="gender">
                            <Select class="w-select" v-model="info.gender">
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" :md="12">
                        <i class="req-icon">*</i>年龄：
                        <FormItem prop="age">
                            <Input class="w-input" v-model="info.age" number/>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :md="12">
                        <i class="req-icon">*</i>职称：
                        <FormItem prop="titleType">
                            <Select class="w-select" v-model="info.titleType">
                                <Option :value="item.dictType" :key="item.dictType" v-for="item of titleList">{{item.dictName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" :md="12">
                        <i class="req-icon">*</i>科室：
                        <FormItem prop="deptTypeId">
                            <Select class="w-select" v-model="info.deptTypeId">
                                <Option :value="item.dictType" :key="item.dictType" v-for="(item,index) of deptList">{{item.dictName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :md="12">
                        <i class="req-icon">*</i>医院级别：
                        <FormItem prop="hospitalGrade">
                            <Select class="w-select" v-model="info.hospitalGrade">
                                <Option value="1">三级甲等</Option>
                                <Option value="2">二级甲等</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <i class="req-icon">*</i>医院名称：
                        <FormItem prop="hospitalName">
                            <Select class="w-select" v-model="info.hospitalName">
                                <Option :value="item.orgName" :key="index" v-for="(item,index) of hospitalList">{{item.orgName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <i class="req-icon">*</i>联系方式：
                        <FormItem prop="phone">
                            <Input class="w-input" v-model="info.phone" placeholder="请输入联系方式"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24">
                        <i class="req-icon">*</i>身份证号：
                        <FormItem prop="idcard">
                            <Input class="w-input" v-model="info.idcard" number placeholder="请输入身份证号"/>
                        </FormItem>
                    </Col>
                </Row>
            </Col>
            <Col class="padding-l" :xs="24" :md="12">
                <Row>
                    <Col :xs="4">
                        <i class="req-icon">*</i>擅长：
                    </Col>
                    <Col :xs="20">
                        <FormItem prop="doctorGood">
                            <Input class="" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" v-model="info.doctorGood" placeholder="请输入医生擅长"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="4">
                        <i class="req-icon"></i>个人介绍：
                    </Col>
                    <Col :xs="20">
                        <Input class="" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" v-model="info.personalIntroduction" placeholder="请输入个人简介"/>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
        <Button type="primary" @click="submit('formInline')">提交</Button>
        <Button type="primary" @click="reback">返回</Button>
        <Modal title="提示：" @on-ok="ok" @on-cancel="cancel" v-model="checkStatus" class-name="vertical-center-modal">
            <p>是否确认修改医生信息？</p>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar,Select,Option } from "iview";
export default {
    data(){
        return {
            id:null,
            info:null,
            docIcon:require('../../../assets/images/heicon.jpg'),
            titleList:[],
            deptList:[],
            gradeList:[],
            hospitalList:[],
            checkStatus:false,
            infoRules: {
                name: [
                    { required: true, message: '医生姓名不能为空', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '性别不能为空', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '年龄不能为空', trigger: 'blur' }
                ],
                titleType: [
                    { required: true, message: '请选择职称', trigger: 'blur' }
                ],
                deptTypeId: [
                    { required: true, message: '请选择科室', trigger: 'blur' }
                ],
                hospitalGrade: [
                    { required: true, message: '请选择医院级别', trigger: 'blur' }
                ],
                hospitalName: [
                    { required: true, message: '请选择医院', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '联系方式不能为空', trigger: 'blur' }
                ],
                idcard: [
                    { required: true, message: '身份证号不能为空', trigger: 'blur' }
                ],
                doctorGood: [
                    { required: true, message: '医生擅长不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        this.id = this.$route.query.id;
        this.$axios.post(api.delReviewDoctorInfo,{id:this.id})
        .then(resp=>{
            this.info = resp.data.object;
            if(this.info.docIcon){
                this.info.docIcon = JSON.parse(this.info.docIcon);
                this.docIcon = this.fileBaseUrl+this.info.docIcon.fileName;
            }
            this.name = this.info.name;
            this.info.gender = String(this.info.gender);
            this.age = this.info.age;
            this.title = this.info.titleType;
            this.deptType = this.info.deptTypeId;
            this.info.hospitalGrade = "1";
            this.hospitalName = this.info.hospitalName;
            this.phone = this.info.phone;
            this.idcard = this.info.idcard;
            this.doctorGood = this.info.doctorGood;
            this.personalIntroduction = this.info.personalIntroduction;
            this.deptList = this.info.depts;
        })
        .catch(err=>{
            this.$Message.info("服务器超时，请重新访问")
        })
        //获取职称列表
        this.$axios
        .post(api.getTitle)
        .then(resp => {
            this.titleList = resp.data.object;
        })
        .catch(err => {
            console.log(err);
        });
        //获取医院列表
        this.$axios
        .post(api.hospitalList)
        .then(resp => {
            console.log(resp.data.object);
            this.hospitalList = resp.data.object;
        })
        .catch(err => {
            console.log(err);
        });
    },
    components:{Avatar,Select,Option},
    methods:{
        submit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.checkStatus = true;
                } else {
                    this.$Message.error('数据不正确');
                }
            })
        },
        reback(){
            this.$router.back(-1);
        },
        ok(){
            this.checkStatus = false;
            this.info.id = parseInt(this.info.id);
            this.info.deptType = this.info.deptTypeId;
            this.info.title = this.info.titleType;
            this.$axios
            .post(api.reviewDoctorUpdate,this.info)
            .then(resp => {
                if(resp.data.success){
                    this.$Message.success("修改成功");
                    this.$router.push("/index/operation/doctorreview/list")
                }else{
                    this.$Message.fail("修改失败，请重试")
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        cancel(){
            this.checkStatus = false;
        }
    }
}
</script>
<style lang="less" scoped>
    .doctorreviewedit{
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
        .w-select {
            width: 100px;
        }
        .w-input {
            width: 200px;
        }
        .req-icon{
            font-size:18px;
            color:red;
            display:inline-block;
            height:18px;
            width:18px;
            text-align:center;
            line-height:18px;
            vertical-align: middle;
        }
    }
</style>