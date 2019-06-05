<template>
    <div class = 'addDoctor'>
        <div class="container">
            <h2 style='font-weight:bold;margin-bottom:10px;'>添加医生</h2>
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="所属医院" prop="hospital">
                    <fourLevelLinkage
                        @changeProvince="changeProvince"
                        @changeCity="changeCity"
                        @changeArea="changeArea"
                        @changeHospital="changeHospital"
                    ></fourLevelLinkage>
                </FormItem>
                <FormItem label="医生姓名" prop="doctorName">
                    <Input v-model="formValidate.doctorName" placeholder="请输入医生姓名" style='width:300px;'></Input>
                </FormItem>
                <FormItem label="性别" prop="doctorSex">
                    <RadioGroup v-model="formValidate.doctorSex">
                        <Radio label="1" >男</Radio>
                        <Radio label="2">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="从业年限" prop="doctorYears">
                    <InputNumber  v-model="formValidate.doctorYears" placeholder="请输入医生从业年限" style='width:150px;' :min='1'></InputNumber>
                </FormItem>
                <FormItem label="联系方式" prop="doctorPhone">
                    <Input v-model="formValidate.doctorPhone" placeholder="请输入医生联系方式" style='width:300px;' maxlength='11'></Input>
                </FormItem>
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
                <FormItem label="科室" prop="department">
                    <Select v-model="formValidate.department" placeholder="请选择科室" style='width:200px;'>
                        <Option v-for="item in departmentList" :value="item.dictType" :key="item.dictType" style='text-align:center'>{{ item.dictName }}</Option>
                    </Select>
                    <span style='color:red;'>请选择医院后再选择科室</span>
                </FormItem>
                <FormItem label="医生简介" prop="doctorSynopsis">
                    <Input v-model="formValidate.doctorSynopsis" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入医生个人简介" style='width:60%;'></Input>
                </FormItem>
                <FormItem label="医生擅长" prop="doctorBga">
                    <Input v-model="formValidate.doctorBga" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入医生个人擅长"  style='width:60%;'></Input>
                </FormItem>
             </Form>
            <Button type='primary' @click="handleSubmit('formValidate')">添加医生</Button>
            <Button @click='back'>返回</Button>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
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
            titleList: []
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
</style>

