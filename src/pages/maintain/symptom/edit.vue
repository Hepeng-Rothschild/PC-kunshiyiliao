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
                            <i class="req-icon">*</i>症状名称：
                            <FormItem prop="symptom">
                                <Input
                                    class="w-input"
                                    v-model="info.symptom"
                                    :maxlength="20"
                                    placeholder="请输入症状名称"
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
                symptom: "",
                gender: "3"
            },
            pageNo: null,

            infoRules: {
                symptom: [
                    {
                        required: true,
                        message: "症状名称不能为空",
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
                .post(api.selectSymptomInfo, { id: this.id })
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
                path: "/index/maintain/symptom/list",
                title: "症状管理"
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
                    let message = ''
                    if (this.id) {
                      operateApi = api.updateSymptomInfo;
                      message = '修改成功'
                      subMitObj.id = parseInt(this.info.id);
                    } else {
                      operateApi = api.insertSymptom;
                      message = '添加成功'
                    }
                    subMitObj.symptom = this.info.symptom.trim();
                    subMitObj.gender = this.info.gender;
                    console.log(subMitObj);
                    this.$axios
                        .post(operateApi, subMitObj)
                        .then(resp => {
                            console.log(resp);
                            if (resp.data.code == 1) {
                                this.$Message.success(message)
                                setTimeout(() => {
                                    //   公用方法
                                    this.functionJS.queryNavgationTo(
                                        this,
                                        "/index/maintain/symptom/list",
                                        {
                                            pageNo: this.pageNo,
                                            searchKey:this.searchKey
                                        }
                                    );
                                },500)
                            } else {
                                this.$Message.error(resp.data.message);
                            }
                            //  else if(resp.data.code == 2){
                            //   this.$Message.error("名称重复，请修改");
                            // } else if(resp.data.code == 0){
                            //     this.$Message.error('该症状已添加');
                            // }
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
                "/index/maintain/symptom/list",
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