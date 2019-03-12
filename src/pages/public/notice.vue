<template>
    <div class="notice">
        <h1>{{msg}}</h1>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg:"该账号暂未开通任何权限，请与上级管理员联系"
        }
    },
    created(){
        let breadList = [
            { path: "", title: "首页" },
            {
                title: "登陆提示"
            },
            {
                title: "暂无权限"
            }
        ];
        this.$emit("changeBreadList", breadList);
    }
}
</script>
<style lang="less" scoped>
.notice{
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    color:#495060;
    text-align: center;
}
</style>
