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
                    ></Input>
                </FormItem>
                <!-- 版本类型 -->
                <FormItem label="版本类型" prop="type">
                    <Select v-model="params.type" style="width:100px">
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                            style='text-align:center;'
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
                    <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
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
            ]
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
    methods: {
        back() {
            let pageNo = this.$route.query.pageNo;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/versionManagement/home",
                {
                    pageNo
                }
            );
        },
        handleSubmit(name) {
            console.log(this.params);
            this.$refs[name].validate(valid => {
                if (valid) {
                    // 必填项填写完成
                    this.$axios
                        .post(api.versioninsert, this.params)
                        .then(res => {
                            if (res.data.code) {
                                this.$Message.info("添加成功");
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
                            } else {
                                this.$Message.info("添加失败,请稍候重试");
                            }
                        });
                } else {
                    // 必填项填写失败
                    this.$Message.error("请检查必填项是否填写完整!");
                }
            });
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
    }
}
</style>
