<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">基本信息</Col>
        </Row>
        <Row>
            <Col :xs="24">
                <i class="req-icon"></i>头像：
                <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <Avatar shape="square" icon="ios-person" :src="item.url"/>
                        <div class="avatar-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress
                            v-if="item.showProgress"
                            class="progress"
                            :percent="item.percentage"
                            hide-info
                        ></Progress>
                    </template>
                </span>
                <Upload
                    ref="upload"
                    name="file"
                    :data="jsonObj"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="maxSize"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    :headers="fromData"
                    type="drag"
                    :action="uploadUrl"
                    style="display: inline-block;width:58px;"
                    class="upload-avatar"
                >
                    <div style="width: 32px;height:32px;line-height: 32px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
            </Col>
        </Row>
        <Form ref="formInline" v-if="info" :model="info" :rules="infoRules" inline>
            <Row class>
                <Col class="borderRight" :xs="24" :md="12">
                    <Row>
                        <Col :xs="24" :md="12">
                            <i class="req-icon">*</i>姓名：
                            <FormItem prop="name">
                                <Input
                                    class="w-input"
                                    v-model="info.name"
                                    :maxlength="20"
                                    placeholder="请输入姓名"
                                />
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
                            <i class="req-icon"></i>年龄：
                            <FormItem prop="age">
                                <Input
                                    class="w-input"
                                    @on-focus="blurInput"
                                    v-model="info.age"
                                    number
                                />
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12">
                            <i class="req-icon">*</i>职称：
                            <FormItem prop="titleType">
                                <Select class="w-select" v-model="info.titleType">
                                    <Option
                                        :value="item.dictType"
                                        :key="item.dictType"
                                        v-for="item of titleList"
                                        style='text-align:center;'
                                    >{{item.dictName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :md="12">
                            <i class="req-icon">*</i>科室：
                            <FormItem prop="deptTypeId">
                                <Select class="w-dep-select" v-model="info.deptTypeId">
                                    <Option
                                        :value="item.dictType"
                                        :key="item.dictType"
                                        v-for="(item,index) of deptList"
                                        style='text-align:center;'
                                    >{{item.dictName}}</Option>
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
                            <FormItem prop="hospitalId">
                                <Select
                                    class="w-hos-select"
                                    @on-change="changeHospital"
                                    v-model="info.hospitalId"
                                >
                                    <Option
                                        :value="item.id"
                                        :key="index"
                                        v-for="(item,index) of hospitalList"
                                        style='text-align:center;'
                                    >{{item.orgName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24">
                            <i class="req-icon">*</i>联系方式：
                            <FormItem prop="phone">
                                <Input class="w-input" v-model.trim = "info.phone" placeholder="请输入联系方式" maxlength="11"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24">
                            <i class="req-icon">*</i>身份证号：
                            <FormItem prop="idcard">
                                <Input class="w-input" v-model.trim = "info.idcard" placeholder="请输入身份证号" maxlength="18"/>
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
                            <FormItem class="text-area" prop="doctorGood">
                                <Input
                                    class
                                    :autosize="{ minRows: 6, maxRows: 6 }"
                                    type="textarea"
                                    v-model="info.doctorGood"
                                    placeholder="请输入医生擅长"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="4">
                            <i class="req-icon"></i>个人介绍：
                        </Col>
                        <Col :xs="20">
                            <FormItem class="text-area" prop="personalIntroduction">
                                <Input
                                    class
                                    :autosize="{ minRows: 7, maxRows: 7 }"
                                    type="textarea"
                                    v-model="info.personalIntroduction"
                                    placeholder="请输入个人简介"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
        <Button type="primary" @click="submit('formInline')">提交</Button>
        <Button type="default" @click="reback">返回</Button>
        <Modal
            title="提示："
            @on-ok="ok"
            @on-cancel="cancel"
            v-model="checkStatus"
            class-name="vertical-center-modal"
        >
            <p>是否确认修改医生信息？</p>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import { Avatar } from "iview";
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

            searchKey: "",
            dictType: "",
            authStatus: null,

            docIcon: "",
            defaultList: [],
            uploadList: [],
            uploadUrl: api.fileAll,
            jsonObj: {
                json: '{"urlCode":"' + code.urlCode.reviewAvatar + '"}'
            },
            count: 1,
            maxSize: 2028, //单位kb

            titleList: [],
            deptList: [],
            gradeList: [],
            hospitalList: [],
            checkStatus: false,
            infoRules: {
                name: [
                    {
                        required: true,
                        message: "医生姓名不能为空",
                        trigger: "blur"
                    }
                ],
                gender: [
                    { required: true, message: "性别不能为空", trigger: "blur" }
                ],
                titleType: [
                    { required: true, message: "请选择职称", trigger: "blur" }
                ],
                deptTypeId: [
                    { required: true, message: "请选择科室", trigger: "blur" }
                ],
                hospitalGrade: [
                    {
                        required: true,
                        message: "请选择医院级别",
                        trigger: "blur"
                    }
                ],
                hospitalId: [
                    {
                        type: "number",
                        required: true,
                        message: "请选择医院",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "联系方式不能为空",
                        trigger: "blur"
                    }
                ],
                idcard: [
                    {
                        required: true,
                        message: "身份证号不能为空",
                        trigger: "blur"
                    }
                ],
                doctorGood: [
                    {
                        required: true,
                        message: "医生擅长不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.pageNo = this.$route.query.pageNo?parseInt(this.$route.query.pageNo):1;
        this.province = this.$route.query.province?parseInt(this.$route.query.province):null;
        this.city = this.$route.query.city?parseInt(this.$route.query.city):null;
        this.area = this.$route.query.area?parseInt(this.$route.query.area):null;
        this.hospital = this.$route.query.hospital?parseInt(this.$route.query.hospital):null;
        this.searchKey = this.$route.query.searchKey?this.$route.query.searchKey:"";
        this.dictType = this.$route.query.dictType?this.$route.query.dictType:"";
        this.authStatus = this.$route.query.authStatus==null?null:parseInt(this.$route.query.authStatus);
        
        this.$axios
            .post(api.reviewDoctorInfo, { id: this.id })
            .then(resp => {
                this.info = resp.data.object;
                this.tryCatch(this.info.docIcon) &&
                    (this.docIcon =
                        this.fileBaseUrl +
                        this.tryCatch(this.info.docIcon).fileName);
                this.tryCatch(this.info.docIcon) &&
                    this.defaultList.push({
                        url:
                            this.fileBaseUrl +
                            this.tryCatch(this.info.docIcon).fileName
                    });
                this.$nextTick(() => {
                    this.uploadList = this.$refs.upload.fileList;
                });
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
            .catch(err => {
                // this.$Message.info("服务器超时，请重新访问")
            });
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
                console.log(resp)
                this.hospitalList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctorreview/list",
                title: "医生认证"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    components: { Avatar },
    methods: {
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
             //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/doctorreview/list",
                {
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    searchKey: this.searchKey,
                    dictType: this.dictType,
                    authStatus: this.authStatus,
                    isBack:2
                }
            );

        },
        ok() {
            this.checkStatus = false;
            let subMitObj = {};
            subMitObj.id = parseInt(this.info.id);
            subMitObj.name = this.info.name.trim();
            subMitObj.hospitalId = String(this.info.hospitalId);
            subMitObj.phone = this.info.phone;
            subMitObj.deptType = this.info.deptTypeId;
            subMitObj.title = this.info.titleType.trim();
            subMitObj.docIcon = this.info.docIcon;
            subMitObj.personalIntroduction = this.info.personalIntroduction;
            subMitObj.gender = parseInt(this.info.gender);
            subMitObj.doctorGood = this.info.doctorGood;
            subMitObj.idcard = this.info.idcard;
            this.hospitalList.forEach((el, i) => {
                if (el.id == this.info.hospitalId) {
                    subMitObj.hospitalName = el.orgName;
                }
            });
            this.$axios
                .post(api.reviewDoctorUpdate, subMitObj)
                .then(resp => {
                    if (resp.data.success) {
                        this.$Message.success("修改成功");
                         //   公用方法
                        this.functionJS.queryNavgationTo(
                            this,
                            "/index/operation/doctorreview/list",
                            {
                                pageNo: this.pageNo,
                                province: this.province,
                                city: this.city,
                                area: this.area,
                                hospital: this.hospital,
                                searchKey: this.searchKey,
                                dictType: this.dictType,
                                authStatus: this.authStatus,
                                isBack:2
                            }
                        );

                    } else {
                        if(resp.data.object.same){
                            this.$Message.error({content:resp.data.object.same,duration:5});
                        }else{
                            this.$Message.error("修改失败，请重试");
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        cancel() {
            this.checkStatus = false;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            res = this.uploadFileDecrypt(res);  
            console.log(res);
            if (res.success) {
                this.info.docIcon = JSON.stringify(res.object[0]);
                file.url = this.fileBaseUrl + res.object[0].fileName;
            } else {
                this.alertMsg("网络错误上传失败，请重试");
            }
        },
        handleFormatError(file) {
            this.alertMsg("只支持jpg/jpeg/png格式上传");
        },
        handleMaxSize(file) {
            this.alertMsg(
                `文件${file.name}过大，文件最大限制${this.maxSize}KB`
            );
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < this.count;
            if (!check) {
                this.alertMsg(
                    `最多上传${this.count}张图片,请先点击图片删除老图片`
                );
            }
            return check;
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
    .w-hos-select {
        width: 200px;
    }
    .w-dep-select {
        width: 200px;
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
    .text-area{
        display:block;
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