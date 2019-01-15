<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">基本信息</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row class>
                <Col :xs="24" :md="12">
                    <Row>
                        <Col :xs="24">
                            <Row>
                                <Col :xs="4" class="text-r">
                                    <i class="req-icon">*</i>权限路径：
                                </Col>
                                <Col :xs="20">
                                    <FormItem class="fullItem" prop="name">
                                        <Input
                                            class="w-input"
                                            v-model="info.name"
                                            placeholder="请输入权限路径"
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                        <Col :xs="24">
                            <Row>
                                <Col :xs="4" class="text-r">
                                    <i class="req-icon"></i>备注：
                                </Col>
                                <Col :xs="20">
                                    <FormItem class="fullItem" prop="remark">
                                        <Input
                                            v-model="info.remark"
                                            type="textarea"
                                            :autosize="{ minRows: 3, maxRows: 3 }"
                                            placeholder="备注"
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                        <Col :xs="24">
                            <Row>
                                <Col :xs="4" class="text-r">&nbsp;</Col>
                                <Col :xs="20">
                                    <Button type="primary" @click="submit('formInline')">提交</Button>
                                    <Button type="primary" @click="reback">返回</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { Select, Option } from "iview";
export default {
    data() {
        return {
            id: null,
            info: {
                name: null,
                remark: null
            },
            pageNo: null,
            infoRules: {
                name: [
                    {
                        required: true,
                        message: "权限路径不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.id = this.$route.query.id ? this.$route.query.id : null;
        this.pageNo = parseInt(this.$route.query.pageNo);
        if (this.id) {
            this.$axios
                .post(api.operateauthquerybyid, { id: this.id })
                .then(resp => {
                    this.info = resp.data.object;
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问")
                });
        }
    },
    components: { Select, Option },
    methods: {
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let operateApi = "";
                    let subMitObj = {};
                    let noticeMsg = "";
                    if (this.id) {
                        operateApi = api.operateauthupdate;
                        noticeMsg = "修改";
                    } else {
                        noticeMsg = "添加";
                        operateApi = api.operateauthinsert;
                    }
                    subMitObj.id = this.info.id ? parseInt(this.info.id) : null;
                    subMitObj.name = this.info.name;
                    subMitObj.remark = this.info.remark;
                    this.$axios
                        .post(operateApi, subMitObj)
                        .then(resp => {
                            if (resp.data.code == 1) {
                                this.$router.push({
                                    path:
                                        "/index/maintain/system/iface_permise/lt",
                                    query: { pageNo: this.pageNo }
                                });
                            } else {
                                this.$Message.error(noticeMsg + "失败，请重试");
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
            this.$router.push({
                path: "/index/maintain/system/iface_permise/lt",
                query: { pageNo: this.pageNo }
            });
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
    .fullItem {
        width: 100%;
    }
    .text-r {
        text-align: right;
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