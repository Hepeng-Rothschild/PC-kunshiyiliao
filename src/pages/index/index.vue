<template>
    <div id="main">
        <Row>
            <Col class="top" :xs="24" :md="4">
                <img class="logo" src="@/assets/images/logo.png">
                <span class="logo-text">易享康 后台运营</span>
            </Col>
            <Col :xs="24" :md="20">
                <top-menu :topMenuLists="topMenuLists" :topActiveName="topActiveName"></top-menu>
            </Col>
        </Row>
        <Row>
            <Col :xs="24" :md="4">
                <left-menu
                    :leftMenuLists="leftMenuLists"
                    :openList="openList"
                    :leftActiveName="leftActiveName"
                    class="left-menu"
                ></left-menu>
            </Col>
            <Col class="content" :xs="24" :md="20">
                <bread :breadTitle="breadTitle" :breadList="breadList"></bread>
                 <div class="welcome" v-if="showWelcome" style="user-select:none;">欢迎来到易享康 后台运营系统</div>
                    <router-view @changeBreadList="changeBreadList"></router-view>
            </Col>
        </Row>
    </div>
</template>

<script>
import topMenu from "@/components/topMenu";
import leftMenu from "@/components/leftMenu";
import Bread from "@/components/bread";
import aesUtils from "@/plugins/aes-utils.js";
import cookie from "@/utils/cookie.js";
export default {
    data() {
        return {
            breadList: [{ path: "", title: "首页" }],
            breadTitle: "",
            showWelcome: true,
            topActiveName: null,
            leftActiveName: null,
            openList: [],
            topMenuLists: []
        };
    },
    components: {
        topMenu,
        leftMenu,
        Bread
    },
    created() {
        let randmId;
        if (this.$store.state.env != "dev") {
            randmId = cookie.getCookie("randmId");
            if (!randmId) {
                // 公用方法
                this.functionJS.queryNavgationTo(this, "/login");
                return;
            }
        }
        this.$store.commit("setTopMenuList");
        let topMenuList = this.$store.state.topMenuList;
        let leftMenuList = this.$store.state.leftMenuList;
        if (topMenuList.length > 0) {
            this.topMenuLists = topMenuList;
        } else {
            // 公用方法
            this.functionJS.queryNavgationTo(this, "/login");
        }
        // this.leftMenuLists = this.$store.state.leftMenuList;
    },
    mounted() {
        let fullPath = this.$route.fullPath;
        for (let item of this.$store.state.topMenuList) {
            let RegObj = new RegExp(`${item.type}`, "ig");
            if (RegObj.test(fullPath)) {
                this.topActiveName = item.id;
                break;
            }
        }
        if(this.topActiveName == null) this.topActiveName = this.$store.state.topMenuList[0].id;
        if (fullPath == "/index") {
            this.topActiveName = this.$store.state.topMenuList[0].id;
        }
        this.$store.commit("setLeftMenuList", this.topActiveName);
        for (let keys in this.$store.state.leftMenuList) {
            for (let key in this.$store.state.leftMenuList[keys].childLists) {
                if (
                    this.$store.state.leftMenuList[keys].childLists[key].path ==
                    fullPath
                ) {
                    this.leftActiveName = `${
                        this.$store.state.leftMenuList[keys].id
                    }-${
                        this.$store.state.leftMenuList[keys].childLists[key].id
                    }`;
                    this.openList[0] = parseInt(keys);
                    break;
                }
            }
        }
        if (fullPath != "/index") this.showWelcome = false;
    },
    beforeRouteUpdate(to, from, next) {
        if (to.fullPath != "/index") this.showWelcome = false;
        else this.showWelcome = true;
        for (let keys in this.$store.state.leftMenuList) {
            for (let key in this.$store.state.leftMenuList[keys].childLists) {
                if (
                    this.$store.state.leftMenuList[keys].childLists[key].path ==
                    to.fullPath
                ) {
                    this.leftActiveName = `${
                        this.$store.state.leftMenuList[keys].id
                    }-${
                        this.$store.state.leftMenuList[keys].childLists[key].id
                    }`;
                    this.openList[0] = parseInt(keys);
                    break;
                }
            }
        }
        next();
    },
    updated(){
        // 提交sdk连接请求
        // this.$store.dispatch("connect");
        // this.$store.dispatch("updateRefreshState");
    },
    computed: {
        leftMenuLists() {
            return this.$store.state.leftMenuList;
        }
    },
    methods: {
        changeBreadList(breadList) {
            this.breadList = breadList;
        }
    }
};
</script>
<style lang="less" scoped>
#main {
    height: 100%;
    overflow:hidden;
    .top {
        height: 70px;
        line-height: 70px;
        background: #1890ff;
        .logo {
            width: 50px;
            vertical-align: middle;
            margin:0 0 0 25px;
        }
        .logo-text {
            text-align: center;
            display: inline-block;
            // width: 150px;
            font-size:18px;
            color: #fff;
            vertical-align: middle;
        }
    }
    .left-menu {
        width: 100% !important;
        height: 1000px;
        overflow: auto;
        background: #1b243c;
    }
    .content {
        // padding:15px 0 0 15px;
        background: #f5f5f5;
        height: 1000px;
        overflow:scroll;
        .welcome {
            height: 500px;
            width: 100%;
            background: #ffffff;
            text-align: center;
            line-height: 380px;
            font-size: 48px;
        }
    }
}
</style>
