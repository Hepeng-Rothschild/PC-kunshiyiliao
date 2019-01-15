<template>
    <div class="login">
        <div class="box">
            <div class="title">
                互联网医院管理系统V{{$store.state.version}}
            </div>
            <div class="uname-box">
                <input type="text" class="username" @change="checkInput" v-model="username" placeholder="用户账号">
            </div>
            <div class="pwd-box">
                <input type="password" class="password" @change="checkInput" v-model="password" placeholder="登陆密码" >
            </div>
            <div class="verify-box">
                <div class="verify-in-box">
                    <input type="text" class="verify" v-model="verify" placeholder="验证码" @keyup.enter='checkLogin'> 
                    <div id="verify">
                        <canvas id="verifyCanvas" style="cursor: pointer;"></canvas>
                    </div>
                </div>
            </div>
            <div class="notice-box" :class="noticeClassColor">
                <i :class="iconClass">{{iconText}}</i>&nbsp;&nbsp;{{alertMsg}}
                <!-- <i class="success-icon">ok</i>&nbsp;&nbsp;登陆成功 -->
            </div>
            <div class="btn-box">
                <button class="login-btn" @click="checkLogin">登陆</button>
            </div>
        </div>
    </div>
</template>
<script>
require("@/plugins/gVerify.js")
import api from "@/api/commonApi";
import axios from "axios";
import cookie from '../../utils/cookie.js';
export default {
    data(){
        return {
            noticeClassColor:"",
            iconClass:"",
            iconText:"",
            alertMsg:"",
            username:"",
            // username:"test",
            password:"",
            // password:"qwer1234",
            verify:"",
            verifyCode:null,
            loginFlag:true,
        };
    },
    beforeCreate(){
        let assets_token = cookie.getCookie("access_token");
        if(assets_token){
            cookie.delCookie("access_token");
        }
    },
    mounted(){
        this.verifyCode = new GVerify("verify");
    },
    methods:{
        checkLogin(){
            if(!this.verify){
                this.$Message.info("请输入验证码");
                return ;
            }
            let res = this.verifyCode.validate(this.verify);
            if(!res){
                this.$Message.info("请输入正确的验证码");
                this.verify = "";
                this.verifyCode.refresh();
                return ;
            }
            if(!this.username || !this.password){
                this.noticeClassColor = "alert-color"; 
                this.iconClass = "alert-icon";
                this.iconText = "!";
                this.alertMsg = "请输入用户名和密码";
                return ;
            }else{
                this.noticeClassColor = "success-color";
                this.iconClass = "success-icon";
                this.iconText = "ok";
                this.alertMsg = "输入正确，登陆中...";
            }
            let params = "username=" + this.username + "&password=" + this.password;

            if(this.loginFlag){
                this.loginFlag = false;
                axios.post(api.login,params)
                .then(resp=>{
                    if(resp.data.success){
                        let times = 10*60*60;
                        cookie.setCookie("access_token", resp.data.object.access_token,times)
                        this.$router.push("/index");
                    }else{
                        this.loginFlag = true;
                        this.noticeClassColor = "alert-color";
                        this.iconClass = "alert-icon";
                        this.iconText = "!";
                        this.alertMsg = "登陆失败，请重试";
                        this.verifyCode.refresh();
                    }
                })
                .catch(err=>{
                    console.log(err);
                    this.loginFlag = true;
                    if(err){
                        this.noticeClassColor = "";
                        this.iconClass = "";
                        this.iconText = "";
                        this.alertMsg = "";
                        // this.$Message.info("服务器超时");
                        this.verifyCode.refresh();
                    }
                })
            }
        },
        checkInput(){
            if(!this.username || !this.password){
                this.noticeClassColor = "alert-color";
                this.iconClass = "alert-icon";
                this.iconText = "!";
                this.alertMsg = "请输入用户名和密码";
                return ;
            }else{
                this.noticeClassColor = "success-color";
                this.iconClass = "success-icon";
                this.iconText = "ok";
                this.alertMsg = "";
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login{
        width:100%;
        height:100%;
        background:#f5f5f5;
        position:absolute;
        .box{
            width:480px;
            height:380px;
            margin:10% auto;
            background:rgba(102,102,102,1);
            border-radius:5px;
            padding:20px;
            text-align:center;
            line-height:40px;
            div{
                margin:15px 0;
                width:100%;
                input{
                    width:80%;
                    box-sizing: border-box;
                    padding:0 15px;
                    margin:0 0 ;
                    outline: none;
                    border:0;
                }
            }
            .title{
                font-size:32px;
                color:#ffffff;
            }
            .verify-box{
                .verify-in-box{
                    width:80%;
                    margin: 0 auto;
                    display:flex;
                    justify-content: space-between;
                    .verify{
                        width:55%;
                    }
                    #verify{
                        width:40%;
                        height:40px;
                        background:#ffffff;
                        margin:0 0 ;
                        #verifyCanvas{
                            width:100%;
                            height:100%;
                        }
                    }
                }
            }
            .notice-box{
                font-size:14px;
                .alert-icon{
                    display:inline-block;
                    vertical-align: middle;
                    width:20px;
                    height:20px;
                    border-radius:50%;
                    background:#f00;
                    color:#ffffff;
                    font-size:14px;
                    line-height:20px;
                }
                .success-icon{
                    display:inline-block;
                    vertical-align: middle;
                    width:20px;
                    height:20px;
                    border-radius:50%;
                    background:#0f0;
                    color:#ffffff;
                    font-size:14px;
                    line-height:20px;
                }
            }
            .alert-color{
                color:#f00;
            }
            .success-color{
                color:#0f0;
            }
            .btn-box{
                text-align:center;
                .login-btn{
                    width:80%;
                    font-size:22px;
                    color:#fff;
                    outline: none;
                    border:0;
                    background:#689AFF;
                    border-radius:5px;
                }
            }
        }
    }
</style>