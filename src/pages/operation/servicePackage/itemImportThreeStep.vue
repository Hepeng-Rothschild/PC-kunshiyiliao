<template>
    <div class="two">
        <div class="container">
            <tmptab :active="2"></tmptab>
            <!-- 可传入数据 -->
            <div class="info">
                <span>本次可导入</span>
                <span>数据:{{ success }}条</span>
            </div>
            <!-- 不可传入数据 -->
            <div class="info">
                <span>本次不可导入</span>
                <span>数据:{{ error }}条</span>
            </div>
            <div class="text-c">
                <Button type="primary" size="large" @click="btn">完成</Button>
            </div>
        </div>
    </div>
</template>
<script>
import { Upload } from "iview";
import tmptab from "./tmptab";
export default {
    components: {
        Upload,
        tmptab
    },
    data() {
        return {
            success: 0,
            error: 0
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/servicePackage/pindex",
                title: "服务包管理"
            },
            {
                path: "/index/operation/servicePackage/itemList",
                title: "服务项目管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let fail = this.$route.query;
        if (fail) {
            this.success = fail.success;
            this.error = fail.error;
        }
    },
    methods: {
        btn() {
             //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/servicePackage/itemList"
            );

        }
    }
};
</script>
<style lang="less" scoped>
.two {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        .info {
            width: 60%;
            background: #fffbf6;
            padding: 20px 30px;
            margin: 20px auto;
        }
        .btn {
            border: none;
            outline: none;
            background: skyblue;
            width: 150px;
            line-height: 30px;
            color: #fff;
            font-size: 18px;
            margin: 0 auto;
            border-radius: 4px;
        }
        .text-c{
          text-align:center;
        }
    }
}
</style>
