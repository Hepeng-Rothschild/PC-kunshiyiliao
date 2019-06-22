<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import api from "./api/commonApi.js";
import cookie from "./utils/cookie";
import aesUtils from "./plugins/aes-utils.js";
import Vue from "vue";
export default {
    name: "App",
    data() {
        return {
            accessToken: null
        };
    },
    updated() {
        this.$store.commit(
            "setAccessToken",
            window.localStorage.getItem("access_token")
        );
    },
    watch: {
        "$store.state.accessToken"(val) {
            //上传接口统一添加自定义请求头
            let iv = this.$store.state.iv;
            let salt = this.$store.state.salt;
            let key = cookie.getCookie("randmId");
            let access_user;
            if (iv && salt && key) {
                access_user = aesUtils.decrypt(
                    salt,
                    iv,
                    key,
                    cookie.getCookie("access_user")
                );
            }
            if (this.$store.state.env != "dev") {
                Vue.prototype.fromData = {
                    ContentType: "multipart/form-data",
                    Authorization: "Bearer " + val,
                    "OPERATE-USER": access_user,
                    "FORM-ENCODE": 0
                };
            }
        }
    },
    mounted() {
        // let top = window.localStorage.getItem("top")
        // if (!top) {
        // 	this.$router.push("/login")
        // }
    },
    components: {},
    updated() {
        let imgs = [].slice.call(document.getElementsByTagName("img"), 0);
        imgs.forEach(el => {
            el.onmousedown = e => {
                e.preventDefault();
                return false;
            };
        });
    }
};
</script>
<style lang="less" scoped>
</style>
