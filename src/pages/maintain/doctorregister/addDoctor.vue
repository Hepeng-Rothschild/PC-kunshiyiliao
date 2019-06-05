<template>
    <div class = 'addDoctor'>
        <div class="container">
            <h2 style='font-weight:bold;margin-bottom:10px;'>添加医生</h2>
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                 <!-- 所属医院 -->
                <FormItem label="所属医院" prop="hospital">
                    <fourLevelLinkage
                        @changeProvince="changeProvince"
                        @changeCity="changeCity"
                        @changeArea="changeArea"
                        @changeHospital="changeHospital"
                    ></fourLevelLinkage>
                </FormItem>
                <!-- 医生姓名 -->
                <FormItem label="医生姓名" prop="doctorName">
                    <Input v-model="formValidate.doctorName" placeholder="请输入医生姓名" style='width:300px;'></Input>
                </FormItem>
                <!-- 性别 -->
                <FormItem label="性别" prop="doctorSex">
                    <RadioGroup v-model="formValidate.doctorSex">
                        <Radio label="1">男</Radio>
                        <Radio label="2">女</Radio>
                    </RadioGroup>
                </FormItem>
                <!-- 从业年限 -->
                <FormItem label="从业年限" prop="doctorYears">
                    <InputNumber  v-model="formValidate.doctorYears" placeholder="请输入医生从业年限" style='width:150px;' :min='1'></InputNumber>
                </FormItem>
                <!-- 身份证号 -->
                <FormItem label="身份证号" prop="doctorCart">
                    <Input v-model="formValidate.doctorCart" placeholder="请输入医生身份证号" style='width:300px;' maxlength='18'></Input>
                </FormItem>
                <!-- 联系方式 -->
                <FormItem label="联系方式" prop="doctorPhone">
                    <Input v-model="formValidate.doctorPhone" placeholder="请输入医生联系方式" style='width:300px;' maxlength='11'></Input>
                </FormItem>
                <!-- 医生头像 -->
                <FormItem label="医生头像" >
                   <div class="demo-upload-list" v-for="(item,index) in uploadList" :key='index'>
                        <div v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                        </div>
                        <div v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </div>
                    </div>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2000"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        :action="uploadUrl"
                        :headers="fromData"
                        :data="uploadData"
                        style="display: inline-block;width:58px;"
                    >
                        <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="预览图片" v-model="visible" footer-hide>
                        <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <!-- 医生职称 -->
                <FormItem label="医生职称" prop="doctorTitle">
                    <Select v-model="formValidate.doctorTitle" placeholder="请选择医生职称" style='width:200px;'>
                        <Option
                            v-for="item in titleList"
                            :value="item.dictType"
                            :key="item.dictType"
                            style='text-align:center'
                        >{{item.dictName}}</Option>
                    </Select>
                </FormItem>
                <!-- 科室 -->
                <FormItem label="科室" prop="department">
                    <Select v-model="formValidate.department" placeholder="请选择科室" style='width:200px;'>
                        <Option v-for="item in departmentList" :value="item.dictType" :key="item.dictType" style='text-align:center'>{{ item.dictName }}</Option>
                    </Select>
                    <span style='color:red;'>请选择医院后再选择科室</span>
                </FormItem>
                <!-- 医生简介 -->
                <FormItem label="医生简介" prop="doctorSynopsis">
                    <Input v-model="formValidate.doctorSynopsis" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入医生个人简介" style='width:60%;'></Input>
                </FormItem>
                <!-- 医生擅长 -->
                <FormItem label="医生擅长" prop="doctorBga">
                    <Input v-model="formValidate.doctorBga" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入医生个人擅长"  style='width:60%;'></Input>
                </FormItem>
             </Form>
             <!-- 添加医生 -->
            <Button type='primary' @click="handleSubmit('formValidate')">添加医生</Button>
            <Button @click='back'>返回</Button>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    components: {
        fourLevelLinkage
    },
    data () {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            formValidate: {
                // 姓名
                doctorName: "",
                // 性别
                doctorSex: "1",
                // 从业年限
                doctorYears:"",
                // 身份证号
                doctorCart:"",
                // 联系方式
                doctorPhone: "",
                // 关联医院
                hospital: "",
                // 职称
                doctorTitle:"",
                // 科室
                department: "",
                // 医生简介 
                doctorSynopsis: "",
                // 医生擅长
                doctorBga:"",
            },
            ruleValidate: {
                doctorName: [{ required: true, message: '请输入医生姓名', trigger: 'blur' }],
                doctorSex: [{ required: true, message: '请选择医生性别', trigger: 'change' }],
                doctorYears: [{ required: true, message: '请输入医生从业年限', trigger: 'change' ,type: 'number'}],
                doctorCart: [{ required: true, message: '请输入医生身份证号', trigger: 'blur' }],
                doctorPhone: [{ required: true, message: '请输入医生联系方式', trigger: 'blur' }],
                hospital: [{ required: true, message: '请选择医生所属医院', trigger: 'change' }],
                doctorTitle: [{ required: true, message: '请选择医生职称', trigger: 'change' }],
                department: [{ required: true, message: '请选择医生所属科室', trigger: 'change' }],
                doctorSynopsis: [{ required: true, message: '请输入医生个人简介', trigger: 'blur' }],
                doctorBga: [{ required: true, message: '请输入医生个人擅长', trigger: 'blur' }],
            },
            // 科室列表
            departmentList: [],
            // 职称列表
            titleList: [],
            // 上传图片相关
            defaultList: [],
            uploadList: [],
            uploadModal: true,
            uploadData: { json: '{"urlCode":"' + code.urlCode.reviewAvatar + '"}' },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: "",
            sourceImages: "",
            imgName: "",
            visible: false,
        }
    },
    created () {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/doctorregister/list",
                title: "医生注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
        // 加载职称列表
        this.getTitleList();
    },
    methods: {
        changeProvince(val) {
            this.province = val;
        },
        changeCity(val) {
            this.city = val;
        },
        changeArea(val) {
            this.area = val;
        },
        changeHospital(val) {
            this.formValidate.hospital = String(val);
            this.hospital = val;
            if(Boolean(val)) {
                this.getDepartmentList(val)
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = api.insertdoctor
                    let params = {
                        // 姓名
                        name : this.formValidate.doctorName,
                        // 性别
                        gender : this.formValidate.doctorSex,
                        // 医院
                        hospitalId : this.formValidate.hospital,
                        // 从业年限
                        workingYears : this.formValidate.doctorYears,
                        // 身份证号
                        idcard: this.formValidate.doctorCart,
                        // 医生头像
                        docIcon: this.images,
                        // 电话
                        phone : this.formValidate.doctorPhone,
                        // 职称
                        titleType : this.formValidate.doctorTitle,
                        // 科室
                        deptType : this.formValidate.department,
                        // 擅长
                        doctorGood : this.formValidate.doctorBga,
                        // 简介
                        personalIntroduction : this.formValidate.doctorSynopsis,
                    }
                    this.$axios.post(url, params).then(res => {
                        console.log(res);
                        if(res.data.success) {
                            this.$Message.success("添加成功")
                            setTimeout(() => {
                                this.back();
                            }, 800)
                        } else {
                            this.$Message.error(res.data.message)
                        }
                    })
                } else {
                    this.$Message.error('请完整填写必填项!');
                }
            })
        },
        back () {
            let pageNo = this.$route.query.pageNo
            this.functionJS.queryNavgationTo(this, "/index/maintain/doctorregister/list", 
                {
                    pageNo
                }
            );
        },
        // 获取职称列表
        getTitleList () {
            this.$axios.post(api.getTitle).then(resp => {
                console.log(resp);
                this.titleList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
        },
        // 通过选择医院加载医院下科室
        getDepartmentList (hospitalId) {
            let url = api.querydeptname
            let params = {
                hospitalId
            }
            this.packageAxios(this, url, params, (res) => {
                if(res.data.success) {
                    let ret = res.data.object;
                    this.departmentList = ret;
                    console.log(ret);
                } else {
                    this.$Message.error("加载失败")
                }
            })
        },
        // 上传头像相关
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            res = this.uploadFileDecrypt(res);
            file.url = this.fileBaseUrl + res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            file.name = res.object[0].fileName;
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "The file format is incorrect",
                desc:
                "File format of " +
                file.name +
                " is incorrect, please select jpg or png."
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "文件过大",
                desc: `文件${file.name}过大，文件最大限制为2000KB`
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Message.info("只能上传一张图片");
            }
            return check;
        }
    }
}
</script>
<style lang="less" scoped>
.addDoctor {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    font-size:14px;
    .container {
        width: 90%;
        margin: 0 auto;
    }
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

