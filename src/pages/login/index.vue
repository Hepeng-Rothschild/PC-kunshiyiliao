<template>
    <div class="login">
        <div class="box">
            <div class="title">互联网医院管理系统V{{$store.state.version}}</div>
            <div class="uname-box">
                <input
                    type="text"
                    class="username"
                    @change="checkInput"
                    v-model="username"
                    placeholder="用户账号"
                    ref="username"
                >
            </div>
            <div class="pwd-box">
                <input
                    type="password"
                    class="password"
                    @change="checkInput"
                    v-model="password"
                    placeholder="登陆密码"
                >
            </div>
            <div class="verify-box">
                <div class="verify-in-box">
                    <input
                        type="text"
                        class="verify"
                        v-model="verify"
                        placeholder="验证码"
                        @keyup.enter="checkLogin"
                    >
                    <div id="verify">
                        <canvas id="verifyCanvas" style="cursor: pointer;"></canvas>
                    </div>
                </div>
            </div>
            <div class="notice-box" :class="noticeClassColor">
                <i :class="iconClass">{{iconText}}</i>
                &nbsp;&nbsp;{{alertMsg}}
                <!-- <i class="success-icon">ok</i>&nbsp;&nbsp;登陆成功 -->
            </div>
            <div class="btn-box">
                <button class="login-btn" @click="checkLogin">登陆</button>
            </div>
        </div>
    </div>
</template>
<script>
require("@/plugins/gVerify.js");
import api from "@/api/commonApi";
import axios from "axios";
import cookie from "../../utils/cookie.js";
import aesUtils from "../../plugins/aes-utils.js";
import Vue from "vue";
export default {
    data() {
        return {
            noticeClassColor: "",
            iconClass: "",
            iconText: "",
            alertMsg: "",
            username: "",
            // username:"test",
            password: "",
            // password:"qwer1234",
            verify: "",
            verifyCode: null,
            loginFlag: true
        };
    },
    beforeCreate() {
        let assets_token = window.localStorage.getItem("access_token");
        if (assets_token) {
            window.localStorage.removeItem("access_token");
        }
        cookie.delCookie("username");
        cookie.delCookie("userIcon");
        cookie.delCookie("randmId");
        cookie.delCookie("operateUserId");
        cookie.delCookie("idtt");
        cookie.delCookie("idttC");
        cookie.delCookie("access_user");
        cookie.delCookie("ownArea");
    },
    mounted() {
        this.verifyCode = new GVerify("verify");
    },
    methods: {
        checkLogin() {
            if (!this.verify) {
                this.$Message.info("请输入验证码");
                return;
            }
            let res = this.verifyCode.validate(this.verify);
            if (!res) {
                this.$Message.info("请输入正确的验证码");
                this.verify = "";
                this.verifyCode.refresh();
                return;
            }
            if (!this.username || !this.password) {
                this.noticeClassColor = "alert-color";
                this.iconClass = "alert-icon";
                this.iconText = "!";
                this.alertMsg = "请输入用户名和密码";
                return;
            } else {
                this.noticeClassColor = "success-color";
                this.iconClass = "success-icon";
                this.iconText = "ok";
                this.alertMsg = "输入正确，登陆中...";
            }
            let params =
                "username=" + this.username + "&password=" + this.password;

            if (this.loginFlag) {
                this.loginFlag = false;
                axios
                    .post(api.login, params)
                    .then(resp => {
                        console.log("resp",resp);
                        if (resp.data.success) {
                            let times = 10 * 60 * 60;
                            window.localStorage.setItem(
                                "access_token",
                                resp.data.object.access_token
                            );
                            let tmpIcon = resp.data.object.userIcon;
                            let username = resp.data.object.nickname;
                            let operateUserId = resp.data.object.operateUserId;
                            let identity = resp.data.object.identity;
                            let identityCoding =
                                resp.data.object.identityCoding;
                            let areaCode =
                                resp.data.object.areaCode;
                            if (operateUserId) {
                                let tmpObj;
                                if(tmpIcon){
                                    tmpObj = JSON.parse(tmpIcon);
                                    let userIcon =
                                        this.fileBaseUrl + tmpObj.fileName;
                                    cookie.setCookie("userIcon", userIcon, times);
                                }
                                cookie.setCookie("username", username, times);
                                cookie.setCookie(
                                    "operateUserId",
                                    operateUserId,
                                    times
                                );
                                cookie.setCookie("idtt", identity, times);
                                cookie.setCookie(
                                    "idttC",
                                    identityCoding,
                                    times
                                );
                            }
                            let key = resp.data.object.randmId;
                            let access_user = resp.data.object["access_user"];
                            let iv = this.$store.state.iv;
                            let salt = this.$store.state.salt;
                            let menus = resp.data.object.menus;
                            cookie.setCookie("randmId", key, times);
                            cookie.setCookie(
                                "access_user",
                                aesUtils.encrypt(salt, iv, key, access_user),
                                times
                            );
                            //存储当前用户身份对应省市区
                            let province = null,
                                city = null,
                                area = null;
                            switch (parseInt(identity)) {
                                case 1: //超级管理员，暂时不管
                                    break;
                                case 2: //省级
                                    province = this.$store.getters.getProvinceById( identityCoding );
                                    break;
                                case 3: //市级
                                    city = this.$store.getters.getCityById( identityCoding );
                                    province = this.$store.getters.getProvinceByCityId( identityCoding );
                                    break;
                                case 4: //区级
                                    area = this.$store.getters.getAreaById( identityCoding );
                                    city = this.$store.getters.getCityByAreaId( identityCoding );
                                    province = this.$store.getters.getProvinceByCityId( city.id );
                                    break;
                                case 5: //机构
                                    area = this.$store.getters.getAreaById( areaCode );
                                    city = this.$store.getters.getCityByAreaId( areaCode );
                                    province = this.$store.getters.getProvinceByCityId( city.id );
                            }
                            let ownArea = JSON.stringify({province,city,area});
                            
                            cookie.setCookie("ownArea",ownArea,times);
                            let topMenu = [],
                                secondMenu = [],
                                thirdMenu = [];
                            menus.map((el, i) => {
                                if (el.level == 0) {
                                    let tmpTop = {
                                        id: el.id,
                                        name: el.menuName,
                                        level: el.level
                                    };
                                    topMenu.push(tmpTop);
                                } else if (el.level == 1) {
                                    let tmpSecond = {
                                        id: el.id,
                                        name: el.menuName,
                                        parentId: el.prentId,
                                        level: el.level
                                    };
                                    secondMenu.push(tmpSecond);
                                } else if (el.level == 2) {
                                    let tmpThird = {
                                        id: el.id,
                                        name: el.menuName,
                                        parentId: el.prentId,
                                        level: el.level,
                                        path: el.path
                                    };
                                    thirdMenu.push(tmpThird);
                                }
                            });
                            topMenu = topMenu.reverse();
                            let menuList = [];
                            for (let i = 0; i < topMenu.length; i++) {
                                let tmpMenu = [];
                                let times = 0;
                                for (let j = 0; j < secondMenu.length; j++) {
                                    let tmpObj = {};
                                    if (
                                        secondMenu[j].parentId == topMenu[i].id
                                    ) {
                                        tmpObj.id = topMenu[i].id;
                                        tmpObj.level = secondMenu[j].level;
                                        tmpObj.name = secondMenu[j].name;
                                        tmpObj.childLists = [];
                                        for (
                                            let k = 0;
                                            k < thirdMenu.length;
                                            k++
                                        ) {
                                            if (
                                                thirdMenu[k].parentId ==
                                                secondMenu[j].id
                                            ) {
                                                let tmpObjS = {};
                                                tmpObjS.id = thirdMenu[k].id;
                                                tmpObjS.level =
                                                    thirdMenu[k].level;
                                                tmpObjS.name =
                                                    thirdMenu[k].name;
                                                tmpObjS.path =
                                                    thirdMenu[k].path;
                                                tmpObj.childLists.push(tmpObjS);
                                                if (
                                                    secondMenu[j].parentId ==
                                                        topMenu[i].id &&
                                                    times < 1
                                                ) {
                                                    let start =
                                                        this.findStr(
                                                            thirdMenu[k].path,
                                                            "/",
                                                            1
                                                        ) + 1;
                                                    let end = this.findStr(
                                                        thirdMenu[k].path,
                                                        "/",
                                                        2
                                                    );
                                                    let type = thirdMenu[
                                                        k
                                                    ].path.slice(start, end);
                                                    topMenu[i].type = type;
                                                    times++;
                                                }
                                            }
                                        }
                                        tmpMenu.push(tmpObj);
                                    }
                                }
                                tmpMenu = JSON.stringify(tmpMenu);
                                window.localStorage.setItem(
                                    "sun" + topMenu[i].id,
                                    aesUtils.encrypt(salt, iv, key, tmpMenu)
                                );
                            }
                            topMenu = JSON.stringify(topMenu);
                            window.localStorage.setItem(
                                "top",
                                aesUtils.encrypt(salt, iv, key, topMenu)
                            );
                            // 公用方法
                            this.functionJS.queryNavgationTo(this, '/index');
                            
                        } else {
                            this.loginFlag = true;
                            this.noticeClassColor = "alert-color";
                            this.iconClass = "alert-icon";
                            this.iconText = "!";
                            this.alertMsg = "用户名或密码错误，请重新输入";
                            this.verifyCode.refresh();
                            this.$refs.username.focus();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.loginFlag = true;
                        if (err) {
                            this.noticeClassColor = "";
                            this.iconClass = "";
                            this.iconText = "";
                            this.alertMsg = "";
                            // this.$Message.info("服务器超时");
                            this.verifyCode.refresh();
                        }
                    });
            }
        },
        checkInput() {
            if (!this.username || !this.password) {
                this.noticeClassColor = "alert-color";
                this.iconClass = "alert-icon";
                this.iconText = "!";
                this.alertMsg = "请输入用户名和密码";
                return;
            } else {
                this.noticeClassColor = "";
                this.iconClass = "";
                this.iconText = "";
                this.alertMsg = "";
            }
        }
    }
};
</script>
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: absolute;
    .box {
        width: 480px;
        height: 380px;
        margin: 10% auto;
        background: rgba(102, 102, 102, 1);
        border-radius: 5px;
        padding: 20px;
        text-align: center;
        line-height: 40px;
        div {
            margin: 15px 0;
            width: 100%;
            input {
                width: 80%;
                box-sizing: border-box;
                padding: 0 15px;
                margin: 0 0;
                outline: none;
                border: 0;
            }
        }
        .title {
            font-size: 32px;
            color: #ffffff;
        }
        .verify-box {
            .verify-in-box {
                width: 80%;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                .verify {
                    width: 55%;
                }
                #verify {
                    width: 40%;
                    height: 40px;
                    background: #ffffff;
                    margin: 0 0;
                    #verifyCanvas {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .notice-box {
            font-size: 14px;
            .alert-icon {
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #f00;
                color: #ffffff;
                font-size: 14px;
                line-height: 20px;
            }
            .success-icon {
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #0f0;
                color: #ffffff;
                font-size: 14px;
                line-height: 20px;
            }
        }
        .alert-color {
            color: #f00;
        }
        .success-color {
            color: #0f0;
        }
        .btn-box {
            text-align: center;
            .login-btn {
                width: 80%;
                font-size: 22px;
                color: #fff;
                outline: none;
                border: 0;
                background: #689aff;
                border-radius: 5px;
            }
        }
    }
}
</style>