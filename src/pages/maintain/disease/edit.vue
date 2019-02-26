<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">基本信息</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row class>
                <Col class="borderRight" :xs="24" :md="12">
                    <Row>
                        <Col :xs="24">
                            <i class="req-icon">*</i>疾病名称：
                            <FormItem prop="disease">
                                <Input
                                    class="w-input"
                                    v-model="info.disease"
                                    :maxlength="20"
                                    placeholder="请输入疾病名称"
                                />
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon">*</i>针对人群：
                            <FormItem prop="gender">
                                <Select class="w-select" v-model="info.gender">
                                    <Option value="1">男</Option>
                                    <Option value="2">女</Option>
                                    <Option value="3">所有</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
        <Button type="primary" @click="submit('formInline')">提交</Button>
        <Button type="primary" @click="reback">返回</Button>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            id: null,
            info: {
                disease: "",
                gender: "3"
            },
            pageNo: null,

            infoRules: {
                disease: [
                    {
                        required: true,
                        message: "疾病名称不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.id = this.$route.query.id ? this.$route.query.id : null;
        this.pageNo = this.$route.query.pageNo?parseInt(this.$route.query.pageNo):1;
        this.searchKey = this.$route.query.searchKey?this.$route.query.searchKey:"";

        if (this.id) {
            this.$axios
                .post(api.selectDiseaseInfo, { id: this.id })
                .then(resp => {
                    this.info = resp.data.object;
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问")
                });
        }

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/configurationWarehouse/index",
                title: "配置仓"
            },
            {
                path: "/index/maintain/disease/list",
                title: "疾病管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    methods: {
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let operateApi = '';
                    let subMitObj = {};
                    let noticeMsg = "";
                    if (this.id) {
                      operateApi = api.updateDiseaseInfo;
                      noticeMsg = "修改";
                    } else {
                      noticeMsg = "添加";
                      operateApi = api.insertDisease;
                    }
                    subMitObj.id = parseInt(this.info.id);
                    subMitObj.disease = this.info.disease;
                    subMitObj.gender = this.info.gender;
                    this.$axios
                        .post(operateApi, subMitObj)
                        .then(resp => {
                            if (resp.data.code == 1) {
                                //   公用方法
                                this.functionJS.queryNavgationTo(
                                    this,
                                    "/index/maintain/disease/list",
                                    {
                                      pageNo: this.pageNo,
                                      searchKey:this.searchKey
                                    }
                                );
                            } else if(resp.data.code == 2){
                              this.$Message.error("名称重复，请修改");
                            }else{
                                this.$Message.error(noticeMsg+"失败，请重试");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.$Message.error("数据不正确");
                }
            });
        },
        reback() {
             //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/disease/list",
                {
                   pageNo: this.pageNo,
                    searchKey:this.searchKey
                }
            );

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