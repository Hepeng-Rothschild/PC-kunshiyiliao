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
import aesUtils from '../../plugins/aes-utils.js';
import Vue from 'vue';
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
        let assets_token = window.localStorage.getItem("access_token");
        if(assets_token){
            window.localStorage.removeItem("access_token");
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
                        window.localStorage.setItem("access_token", resp.data.object.access_token);
                        let tmpIcon = resp.data.object.userIcon;
                        let username = resp.data.object.nickname;
                        if(tmpIcon){
                            let tmpObj = JSON.parse(tmpIcon);
                            let userIcon = this.fileBaseUrl+tmpObj.fileName;
                            cookie.setCookie("userIcon", userIcon, times);
                            cookie.setCookie("username", username, times);
                        }
                        let key = resp.data.object.randmId;
                        let iv = this.$store.state.iv;
                        let salt = this.$store.state.salt;
                        cookie.setCookie("randmId", key,times);
                        let topMenu = [
                            {id:1,name:'运营平台',type:"operation"},
                            {id:2,name:'运维平台',type:"maintain"},
                            {id:3,name:'统计平台',type:"statistics"},
                            {id:4,name:'监管平台',type:"supervision"}
                        ];
                        let operationLeftMenu = [
                            {id:1,level:1,name:"订单管理",childLists:[
                                {id:36,level:2,name:"预约挂号订单",path:"/index/operation/orders/reservation/list"},
                                {id:42,level:2,name:"远程门诊订单",path:"/index/operation/orders/remoteClinic/list"},
                                {id:43,level:2,name:"家医签约管理",path:"/index/operation/contractManagement/list"},
                            ]},
                            {id:1,level:1,name:"医生端运营",childLists:[
                                {id:17,level:2,name:"医生认证",path:"/index/operation/doctorreview/list"},
                                {id:29,level:2,name:"预约服务",path:"/index/operation/register/list"},
                                {id:33,level:2,name:"内容管理",path:"/index/operation/doctorContentCheck/list"},
                                {id:35,level:2,name:"医生管理",path:"/index/operation/doctormanage/list"},
                                {id:46,level:2,name:"版本管理",path:"/index/operation/versionManagement/home"},
                            ]},
                            {id:1,level:1,name:"患者端运营",childLists:[
                                {id:30,level:2,name:"内容管理",path:"/index/operation/contentmanagement_home"},
                            ]},
                            {id:1,level:1,name:"机构运营",childLists:[
                                {id:21,level:2,name:"机构管理",path:"/index/operation/home"}
                            ]},
                            {id:1,level:1,name:"服务包管理",childLists:[
                                {id:40,level:2,name:"服务包管理",path:"/index/operation/servicePackage/pList"},
                                {id:41,level:2,name:"服务项目管理",path:"/index/operation/servicePackage/itemList"}
                            ]},
                            {id:1,level:1,name:"公众号托管",childLists:[
                                {id:45,level:2,name:"公众号管理",path:"/index/operation/publicAddress/list"}
                            ]},
                            {id:1,level:1,name:"系统管理",childLists:[
                                {id:47,level:2,name:"菜单管理",path:"/index/operation/wxTypeManagement/list"}
                            ]},
                        ];
                        let maintainLeftMenu = [
                            {id:2,level:1,name:"索引管理",childLists:[
                                {id:31,level:2,name:"居民注册信息",path:"/index/maintain/residentregister/list"},
                                {id:32,level:2,name:"医生注册信息",path:"/index/maintain/doctorregister/list"},
                                {id:33,level:2,name:"机构注册信息",path:"/index/maintain/mechanismreg/list"}
                            ]},
                            {id:2,level:1,name:"配置仓",childLists:[
                                {id:37,level:2,name:"基础字典",path:"/index/maintain/dictionary/tree"},
                                {id:38,level:2,name:"疾病管理",path:"/index/maintain/disease/list"},
                                {id:39,level:2,name:"症状管理",path:"/index/maintain/symptom/list"},
                                {id:48,level:2,name:"评价管理",path:"/index/maintain/starClass/list"},
                            ]},
                            {id:2,level:1,name:"系统管理",childLists:[
                                {id:31,level:2,name:"账号管理",path:"/index/maintain/admin/user/list"},
                                {id:44,level:2,name:"权限管理",path:"/index/maintain/system/iface_permise/lt"},
                                {id:49,level:2,name:"菜单管理",path:"/index/maintain/system/m_manage/lt"},
                            ]}
                        ];
                        let statisticsLeftMenu = [
                            {id:1,level:1,name:"统计端列表",childLists:[]}
                        ];
                        let supervisionLeftMenu = [
                            {id:1,level:1,name:"监管端列表",childLists:[]}
                        ];
                        topMenu = JSON.stringify(topMenu);
                        operationLeftMenu = JSON.stringify(operationLeftMenu);
                        maintainLeftMenu = JSON.stringify(maintainLeftMenu);
                        statisticsLeftMenu = JSON.stringify(statisticsLeftMenu);
                        supervisionLeftMenu = JSON.stringify(supervisionLeftMenu);
                        window.localStorage.setItem("top",aesUtils.encrypt(salt,iv,key,topMenu))
                        window.localStorage.setItem("operation",aesUtils.encrypt(salt,iv,key,operationLeftMenu))
                        window.localStorage.setItem("maintain",aesUtils.encrypt(salt,iv,key,maintainLeftMenu))
                        window.localStorage.setItem("statistics",aesUtils.encrypt(salt,iv,key,statisticsLeftMenu))
                        window.localStorage.setItem("supervision",aesUtils.encrypt(salt,iv,key,supervisionLeftMenu))
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