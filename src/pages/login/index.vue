<template>
  <div class="login">
    <div class="wrapper">
      <div class="box">
        <div class="uname-box">
          <input
            type="text"
            class="username"
            @change="checkInput"
            v-model.trim="username"
            placeholder="admin"
            ref="username"
            @keyup="username = username.replace(/[^\w_]/g,'');"
          >
        </div>
        <div class="pwd-box">
          <input
            autocomplete="new-password"
            type="password"
            class="password"
            @change="checkInput"
            v-model.trim="password"
            placeholder="kba789789"
          />
        </div>
        <div class="verify-box">
          <div class="verify-in-box">
            <input
              type="text"
              class="verify"
              v-model.trim="verify"
              placeholder="验证码"
              @keyup.enter="checkLogin"
              @keyup="verify = verify.replace(/[^\w_]/g,'');"
            />
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
          <button class="login-btn" @click="checkLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("@/plugins/gVerify.js");
require("@/plugins/jquery-2.1.1.min.js");
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

      username: "admin11",
      password: "kba789789",
      // username:"test",
      // password:"qwer1234",
      verify: "",
      verifyCode: null,
      loginFlag: true
    };
  },
  mounted() {
    this.verifyCode = new GVerify("verify");
    this.clearData();
  },
  methods: {
    checkLogin() {
        // if (!this.verify) {
        //   this.$Message.info("请输入验证码");
        //   return;
        // }
        // let res = this.verifyCode.validate(this.verify);
        // if (!res) {
        //   this.$Message.info("请输入正确的验证码");
        //   this.verify = "";
        //   this.verifyCode.refresh();
        //   return;
        // }
      if (!this.username.trim() || !this.password.trim()) {
        this.noticeClassColor = "alert-color";
        this.iconClass = "alert-icon";
        this.iconText = "!";
        this.alertMsg = "请输入用户名和密码";
        return;
      } else {
        this.noticeClassColor = "success-color";
        this.iconClass = "success-icon";
        this.iconText = "ok";
        this.alertMsg = "输入正确，登录中...";
      }
      let params =
        "username=" +
        this.username.trim() +
        "&password=" +
        this.password.trim();

      if (this.loginFlag) {
        this.loginFlag = false;
        axios
          .post(api.login, params)
          .then(resp => {
            console.log(resp);
            if (resp.data.success) {
              console.log(resp);
              let times = 10 * 60 * 60;
              window.localStorage.setItem(
                "access_token",
                resp.data.object.access_token
              );
              let tmpIcon = resp.data.object.userIcon;
              let username = resp.data.object.nickname;
              let operateUserId = resp.data.object.operateUserId;
              let identity = resp.data.object.identity;
              let identityCoding = resp.data.object.identityCoding;
              let areaCode = resp.data.object.areaCode;
              if (operateUserId) {
                let tmpObj;
                if (tmpIcon) {
                  tmpObj = JSON.parse(tmpIcon);
                  let userIcon = this.fileBaseUrl + tmpObj.fileName;
                  cookie.setCookie("userIcon", userIcon, times);
                }
                cookie.setCookie("username", username, times);
                cookie.setCookie("operateUserId", operateUserId, times);
                cookie.setCookie("idtt", identity, times);
                cookie.setCookie("idttC", identityCoding, times);
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
                  province = this.$store.getters.getProvinceById(
                    identityCoding
                  );
                  break;
                case 3: //市级
                  city = this.$store.getters.getCityById(identityCoding);
                  province = this.$store.getters.getProvinceByCityId(
                    identityCoding
                  );
                  break;
                case 4: //区级
                  area = this.$store.getters.getAreaById(identityCoding);
                  city = this.$store.getters.getCityByAreaId(identityCoding);
                  province = this.$store.getters.getProvinceByCityId(city.id);
                  break;
                case 5: //机构
                  area = this.$store.getters.getAreaById(areaCode);
                  city = this.$store.getters.getCityByAreaId(areaCode);
                  province = this.$store.getters.getProvinceByCityId(city.id);
              }
              let ownArea = JSON.stringify({
                province,
                city,
                area
              });
              cookie.setCookie("ownArea", ownArea, times);
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
                  if (secondMenu[j].parentId == topMenu[i].id) {
                    tmpObj.id = topMenu[i].id;
                    tmpObj.level = secondMenu[j].level;
                    tmpObj.name = secondMenu[j].name;
                    tmpObj.childLists = [];
                    for (let k = 0; k < thirdMenu.length; k++) {
                      if (thirdMenu[k].parentId == secondMenu[j].id) {
                        let tmpObjS = {};
                        tmpObjS.id = thirdMenu[k].id;
                        tmpObjS.level = thirdMenu[k].level;
                        tmpObjS.name = thirdMenu[k].name;
                        tmpObjS.path = thirdMenu[k].path;
                        tmpObj.childLists.push(tmpObjS);
                        if (
                          secondMenu[j].parentId == topMenu[i].id &&
                          times < 1
                        ) {
                          let start =
                            this.findStr(thirdMenu[k].path, "/", 1) + 1;
                          let end = this.findStr(thirdMenu[k].path, "/", 2);
                          let type = thirdMenu[k].path.slice(start, end);
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
              if (menus.length <= 0) {
                this.$Message.error({
                  content: "该账号暂无任何权限",
                  duration: 3
                });
                this.functionJS.queryNavgationTo(this, "/public");
                return;
              }
              // 公用方法
              this.functionJS.queryNavgationTo(this, "/index");
              // 清空输入的内容
              this.resetInput();
            } else {
              this.loginFlag = true;
              this.noticeClassColor = "alert-color";
              this.iconClass = "alert-icon";
              this.iconText = "!";
              this.alertMsg = "用户名或密码错误，请重新输入";
              this.verifyCode.refresh();
              this.$refs.username.focus();
              this.$router.push("/index");
                this.verify = "";
                this.password = "";
            }
          })
          .catch(err => {
            console.log(err);
            this.loginFlag = true;
            this.noticeClassColor = "alert-color";
            this.iconClass = "alert-icon";
            this.iconText = "!";
            this.alertMsg = "登录失败";
            this.verifyCode.refresh();
            this.verify = "";
            this.password = "";
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
    },
    // 输入值重置
    resetInput() {
      // 样式
      this.noticeClassColor = "";
      this.iconClass = "";
      // 符号
      this.iconText = "";
      // 弹示框
      this.alertMsg = "";
      // 刷新验证码
      this.verifyCode.refresh();
      // 失去焦点
      this.$refs.username.focus();
      this.verify = "";
      // 用户名密码
      this.username = "";
      this.password = "";
      // 打开允许登录
      this.loginFlag = true;
    },
    clearData() {
      let assets_token = window.localStorage.getItem("access_token");
      if (assets_token) {
        window.localStorage.removeItem("access_token");
      }
      let cookiess = document.cookie.split(";");
      cookie.delCookie("username");
      cookie.delCookie("userIcon");
      cookie.delCookie("randmId");
      cookie.delCookie("operateUserId");
      cookie.delCookie("idtt");
      cookie.delCookie("idttC");
      cookie.delCookie("access_user");
      cookie.delCookie("ownArea");
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("top");
      window.localStorage.removeItem("sun1");
      window.localStorage.removeItem("sun2");
      window.localStorage.removeItem("sun3");
      window.localStorage.removeItem("sun4");
      window.localStorage.removeItem("sun5");
      window.localStorage.clear();
      this.resetInput();
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/loginBg.css");
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  .box {
    width: 400px;
    height: 380px;
    background-image: url("../../assets/images/loginbox.png");
    background-repeat: no-repeat;
    background-size: 400px 380px;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 65%;
    padding-top: 50px;
    transform: translateY(-50%);
    z-index: 99;
    line-height: 40px;
    div {
      margin: 15px 0;
      width: 100%;
      min-height: 40px;
      input::-webkit-input-placeholder {
        color: #00eaff;
      }
      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: 0;
        border: 1px solid #00eaff;
        background: none;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        width: 250px;
        color: #00eaff;
        margin: 10px auto 30px auto;
        display: block;
        text-align: left;
        text-indent: 30px;
        font-size: 18px;
        -webkit-transition-duration: 0.25s;
        transition-duration: 0.25s;
        font-weight: 300;
      }
      input:hover {
        background: none;
      }
      input:focus {
        background: none;
        width: 300px;
        color: #09d1e3;
      }
    }
    .title {
      font-size: 28px;
      color: #ffffff;
    }
    .verify-box {
      .verify-in-box {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .verify {
          width: 32%;
          height: 40px;
          margin: 0 10px 0 55px;
        }
        #verify {
          width: 31%;
          height: 40px;
          background: #ffffff;
          position: relative;
          left: -15%;
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
      margin-top: -20px;
      text-align: center;
      .login-btn {
        width: 70%;
        font-size: 22px;
        color: #333;
        outline: none;
        border: 0;
        letter-spacing: 2px;
        background: #fff;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        background: #00eaff;
      }
    }
  }
}
</style>