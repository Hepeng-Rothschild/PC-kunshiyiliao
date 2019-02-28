<template>
    <div class="management">
        <tmpHeader :index="3"/>
        <!-- 功能管理 -->
        <Row
            type="flex"
            justify="space-around"
            class="code-row-bg"
            v-for="(item,index) in list"
            :key="index"
        >
            <Col span="4">{{ item.title }}</Col>
            <Col span="4">
                <iSwitch size="large" v-model="item.status">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </iSwitch>
            </Col>
            <Col span="14">&nbsp;</Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="4">
                <Button type="primary" @click="save">保存</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import tmpHeader from "../tmpHeader";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
    components: {
        tmpHeader
    },
    data() {
        return {
            appid: "",
            list: [
                {
                    title: "OCR管理",
                    status: false
                }
            ]
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/publicHosting/index",
                title: "公众号托管"
            },
            {
                path: "/index/operation/wxopeningmanagement/index",
                title: "公众号管理"
            }
        ];
        let iv = store.state.iv;
        let salt = store.state.salt;
        this.appid = aesUtils.decrypt(
            salt,
            iv,
            "wxAppid",
            localStorage.getItem("appid")
        );
    },
    mounted() {
        this.$axios
            .post(api.wxMangentSearch, {
                appid: this.appid
            })
            .then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    // OCR管理状态
                    this.list[0].status = Boolean(ret.ocrStatus);
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
    },
    methods: {
        // 保存
        save() {
            let params = {
                appid: this.appid,
                // OCR管理状态
                ocrStatus: Number(this.list[0].status)
            };
            this.$axios.post(api.wxMangent, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.data;
                    this.$Message.info("修改成功");
                } else {
                    this.$Message.error("修改失败,请重试");
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.management {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .code-row-bg {
        margin-top: 20px;
    }
}
</style>
