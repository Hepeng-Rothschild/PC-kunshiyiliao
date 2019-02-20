<template>
    <div class="sensitiveword">
        <Row>
            <Col class="padding-t padding-b" :xs="24">词汇信息</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row class>
                <Col class :xs="24" :md="12">
                    <Row>
                        <Col :xs="24">
                            <i class="req-icon"></i>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：敏感词汇与敏感词汇之间以 "<span style='color:red'>英文输入法</span>" 的逗号隔开,如：“词1,词2,词3”
                            <FormItem prop="sensitives">
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>敏感词汇：
                            <FormItem prop="sensitives">
                                <Input
                                    class="w-textarea"
                                    type="textarea"
                                    :autosize="{ minRows: 6, maxRows: 12 }"
                                    v-model="info.sensitives"
                                    :maxlength="20"
                                    placeholder="请输入敏感词汇"
                                />
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>暴恐违禁：
                            <FormItem prop="score1">
                                <Input
                                    class="w-input"
                                    v-model="info.score1"
                                    :maxlength="20"
                                    placeholder="请输入敏感指数"
                                />
                                <label for="">介于0~1之间，大于等于0，小于1</label>
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>文本色情：
                            <FormItem prop="score2">
                                <Input
                                    class="w-input"
                                    v-model="info.score2"
                                    :maxlength="20"
                                    placeholder="请输入敏感指数"
                                />
                                <label for="">介于0~1之间，大于等于0，小于1</label>
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>政治敏感：
                            <FormItem prop="score3">
                                <Input
                                    class="w-input"
                                    v-model="info.score3"
                                    :maxlength="20"
                                    placeholder="请输入敏感指数"
                                />
                                <label for="">介于0~1之间，大于等于0，小于1</label>
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>恶意推广：
                            <FormItem prop="score4">
                                <Input
                                    class="w-input"
                                    v-model="info.score4"
                                    :maxlength="20"
                                    placeholder="请输入敏感指数"
                                />
                                <label for="">介于0~1之间，大于等于0，小于1</label>
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>低俗辱骂：
                            <FormItem prop="score5">
                                <Input
                                    class="w-input"
                                    v-model="info.score5"
                                    :maxlength="20"
                                    placeholder="请输入敏感指数"
                                />
                                <label for="">介于0~1之间，大于等于0，小于1</label>
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>低俗灌水：
                            <FormItem prop="score6">
                                <Input
                                    class="w-input"
                                    v-model="info.score6"
                                    :maxlength="20"
                                    placeholder="请输入敏感指数"
                                />
                                <label for="">介于0~1之间，大于等于0，小于1</label>
                            </FormItem>
                        </Col>
                        <Col :xs="24">
                            <i class="req-icon"></i>是否启用：
                            <FormItem prop="start">
                                <i-switch v-model="info.start" :true-value="1" :false-value="0">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
                <Col :xs="0" :md="12">
                    <span class="notice"></span>
                </Col>
            </Row>
        </Form>
        <Button type="primary" @click="submit('formInline')">保存</Button>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar, Select, Option, Switch } from "iview";
export default {
    data() {
        const validateScore = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('敏感指数最小为0，不能为空'));
                }
                let reg = /^[0-9]+.?[0-9]*$/;
                if(!reg.test(value)){
                    callback(new Error('敏感指数必须为数字,且不能位负数'));
                }else{
                    if(value<0 || value>=1){
                        callback(new Error("敏感指数必须大于等于0或者小于1"))
                    }else{
                        let tmp = value.toString().split('.');
                        if(tmp[1] != undefined && tmp[1].length>4){
                            callback(new Error("小数点后只能保留4位或小于4位"))
                        }else{
                            callback();
                        }
                    }
                }
            };
        return {
            info: {
                id: null,
                sensitives: "",
                start: 1,
                score1: 0.0001,
                score2: 0.0001,
                score3: 0.0001,
                score4: 0.0001,
                score5: 0.0001,
                score6: 0.0001
            },
            pageNo: null,
            infoRules: {
                score1: [{validator:validateScore,trigger:'blur'}],
                score2: [{validator:validateScore,trigger:'blur'}],
                score3: [{validator:validateScore,trigger:'blur'}],
                score4: [{validator:validateScore,trigger:'blur'}],
                score5: [{validator:validateScore,trigger:'blur'}],
                score6: [{validator:validateScore,trigger:'blur'}]
            }
        };
    },
    created() {
        this.$axios
            .post(api.sensitiveSelectSensitive)
            .then(resp => {
                if (resp.data.object) this.info = resp.data.object;
            })
            .catch(err => {
                // this.$Message.info("服务器超时，请重新访问")
            });

        let breadList = [
            { path: "", title: "首页" },
            {
                path: "",
                title: "系统管理"
            },
            {
                path: "",
                title: "敏感词汇"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    components: { "i-switch": Switch },
    methods: {
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let operateApi = "";
                    let params = {};
                    operateApi = api.sensitiveUpdate;
                    params.id = parseInt(this.info.id);
                    params.sensitives = this.info.sensitives;
                    params.start = this.info.start;
                    params.score1 = parseFloat(this.info.score1);
                    params.score2 = parseFloat(this.info.score2);
                    params.score3 = parseFloat(this.info.score3);
                    params.score4 = parseFloat(this.info.score4);
                    params.score5 = parseFloat(this.info.score5);
                    params.score6 = parseFloat(this.info.score6);
                    this.$axios
                        .post(operateApi, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.info("保存成功");
                            } else {
                                this.$Message.error("保存失败，请重试");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.$Message.error("数据不正确");
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.sensitiveword {
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
    .w-textarea {
        width: 500px;
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