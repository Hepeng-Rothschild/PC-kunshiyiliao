<template>
    <div class="management">
        <tmpHeader :index="3"/>
        <!-- OCR管理 -->
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="4">OCR管理</Col>
            <Col span="4">
                <div>
                    <iSwitch size="large" v-model="ocrStatus">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </iSwitch>
                </div>
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
            ocrStatus: false,
            appid: ""
        };
    },
    created() {
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
                    this.ocrStatus = Boolean(ret.ocrStatus);
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
                ocrStatus: Number(this.ocrStatus)
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
