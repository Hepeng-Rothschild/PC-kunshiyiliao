<template>
    <div class="add">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="公司名称" prop="corporateName">
                <Input v-model="formValidate.corporateName" placeholder="请输入公司名称" style='width:300px;'></Input>
            </FormItem>
            <FormItem label="用途" prop="purpose">
                <Input v-model="formValidate.purpose" placeholder="请输入用途" style='width:300px;'></Input>
            </FormItem>
            <FormItem label="访问用户名" prop="userName">
                <Input v-model="formValidate.userName" placeholder="请输入访问用户名" style='width:300px;'></Input>
            </FormItem>
            <FormItem label="aseKey">
                <p style='color:#5cadff;'>{{ formValidate.aseKey }}</p>
                <Button @click='copyContent(formValidate.aseKey)'>点击复制</Button>
            </FormItem>
            <FormItem label="token">
                <p style='color:#5cadff;'>{{ formValidate.token }}</p>
                <Button @click='copyContent(formValidate.token)'>点击复制</Button>
            </FormItem>

            <FormItem label="是否启用">
                <iSwitch size="large" v-model='formValidate.iopen' >
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </iSwitch>
            </FormItem>
            
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">返回上一步</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            formValidate: {
                // 公司名称
                corporateName: "",
                // 用途
                purpose: "",
                // 开关
                iopen: true,
                // 64位生成码
                aseKey: "",
                // 128位生成码
                token: "",
                // 访问用户名
                userName: "",
                id: ""
            },
            ruleValidate: {
                corporateName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                purpose: [{ required: true, message: '请输入用途', trigger: 'blur' }],
                userName: [{ required: true, message: '请输入访问用户名', trigger: 'blur' }],

            },

        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/nterfaceManagement/list",
                title: "接口管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let id = this.$route.query.id;
        this.getDefault(id)
    },
    methods: {
        // 确认添加接口
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = api.apiserviceupdate;
                    let params = {}
                    params.iopen = Number(this.formValidate.iopen).toString()
                    params.purpose = this.formValidate.purpose
                    params.userName = this.formValidate.userName
                    params.corporateName = this.formValidate.corporateName
                    params.aseKey = this.formValidate.aseKey
                    params.token = this.formValidate.token
                    params.id = this.formValidate.id

                    this.$axios.post(url, params).then(res => {
                        if (res.data.success) {
                            this.$Message.success(res.data.object.success)
                            setTimeout(() => {
                                this.handleReset('formValidate')
                            }, 500)
                        
                        } else {
                           this.$Message.error(res.data.object.file || res.data.object.same)
                        }
                    })
                } else {
                    this.$Message.error('请完整填写必填项!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(this, "/index/maintain/nterfaceManagement/list", {
                pageNo: query.pageNo
            });
        },
        getDefault (id) {
            let url = api.apiservicequerybyid;
            let params = {
                id
            }
            this.$axios.post(url, params).then(res => {
                console.log(res);
                if(res.data.success) {
                let ret = res.data.object;
                    // 公司名称
                this.formValidate.corporateName = ret.corporateName
                // 用途
                this.formValidate.purpose = ret.purpose
                // 开关
                this.formValidate.iopen = Boolean(Number(ret.iopen))
                // 64位生成码
                this.formValidate.aseKey = ret.aesKey
                // 128位生成码
                this.formValidate.token = ret.token
                // 访问用户名
                this.formValidate.userName = ret.userName
                this.formValidate.id = ret.id
                

                } else {
                    this.$Message.error("加载接口管理详情失败")
                }
            })
        },
        // 点击复制到剪粘版
        copyContent (content) {
            if(window.clipboardData){
                window.clipboardData.setData('text',content);
            }else{
                (function(content){
                    document.oncopy=function(e){
                        e.clipboardData.setData('text',content);
                        e.preventDefault();
                        document.oncopy=null;
                    }
                })(content);
                document.execCommand('Copy');
            }
            this.$Message.success("复制成功")
        },
    }
};
</script>
<style lang="less" scoped>
.add {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>
