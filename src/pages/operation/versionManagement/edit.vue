<template>
    <div class="add">
        <div class="main">
            <Form ref="formValidate" :model="params" :rules="ruleValidate" :label-width="80">
                <!-- 版本id -->
                <FormItem label="版本id" prop="versionId">
                    <Input
                        v-model.trim="params.versionId"
                        placeholder="请输入版本Id"
                        style="width:180px;"
                        disabled
                    ></Input>
                </FormItem>
                <!-- 版本名 -->
                <FormItem label="版本名" prop="versionName">
                    <Input
                        v-model.trim="params.versionName"
                        placeholder="请输入版本名"
                        style="width:300px;"
                    ></Input>
                </FormItem>
                <!-- 版本号 -->
                <FormItem label="版本号" prop="versionNumber">
                    <Input
                        v-model.trim="params.versionNumber"
                        placeholder="请输入版本号"
                        style="width:300px;"
                        disabled
                    ></Input>
                </FormItem>
                <!-- 版本类型 -->
                <FormItem label="版本类型" prop="type">
                    <Select v-model="params.type" style="width:100px">
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <!-- 下载路径 -->
                <FormItem label="下载路径" prop="downloadPath">
                    <Input
                        v-model.trim="params.downloadPath"
                        placeholder="请输入下载路径"
                        style="width:300px;"
                    ></Input>
                </FormItem>
                <!-- 版本说明 -->
                <FormItem label="版本说明" prop="content">
                    <Input
                        v-model="params.content"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请输入版本说明"
                    ></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                    <Button @click="back" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            params: {
                // 版本说明
                content: "",
                // 版本类型
                type: "",
                // 版本ID
                versionId: null,
                // 版本名字
                versionName: "",
                // 版本号
                versionNumber: "",
                // 版本路径
                downloadPath: ""
            },
            cityList: [
                {
                    value: "1",
                    label: "IOS"
                },
                {
                    value: "2",
                    label: "安卓"
                }
            ],
            ruleValidate: {
                versionId: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入版本ID",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                versionName: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入版本名字",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                versionNumber: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入版本号",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                type: [
                    {
                        required: true,
                        message: "请选择版本类型",
                        trigger: "change"
                    }
                ],
                downloadPath: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入版本路径",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入版本说明",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/versionManagement/home",
                title: "版本管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let id = this.$route.query.id;
        this.$axios
            .post(api.versiondetail, {
                id
            })
            .then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.params.id = ret.id;
                    this.params.content = ret.content;
                    this.params.type = ret.type.toString();
                    this.params.versionId = ret.versionId.toString();
                    this.params.versionName = ret.versionName;
                    this.params.versionNumber = ret.versionNumber;
                    this.params.downloadPath = ret.downloadPath;
                } else {
                    this.$Message.info("查询数据失败");
                }
            });
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    // 必填项填写完成
                    this.$axios
                        .post(api.versionupdate, this.params)
                        .then(res => {
                            if (res.data.code) {
                                this.$Message.info("修改成功");
                                let pageNo = this.$route.query.pageNo;
                                setTimeout(() => {
                                    this.functionJS.queryNavgationTo(
                                        this,
                                        "/index/operation/versionManagement/home",
                                        {
                                            pageNo
                                        }
                                    );
                                }, 800);
                            }
                        });
                } else {
                    // 必填项填写失败
                    this.$Message.error("请检查必填项是否填写完整!");
                }
            });
        },
        // 后退
        back() {
            let pageNo = this.$route.query.pageNo;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/versionManagement/home",
                {
                    pageNo
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.add {
    width: 98%;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 20px;
            .info {
                min-width: 100px;
            }
        }
        .save {
            width: 200px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            margin: 0 auto;
        }
    }
}
</style>
