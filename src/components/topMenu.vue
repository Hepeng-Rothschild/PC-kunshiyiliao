<template>
  <Menu
    v-if="topMenuLists.length>0"
    @on-select="changeTop"
    class="topMenu"
    mode="horizontal"
    :theme="theme1"
    :active-name="topActiveName"
  >
    <MenuItem v-for="item in topMenuLists" :key="item.id" :name="item.id">{{item.name}}</MenuItem>
    <!-- <MenuItem name="1">
            运营平台
        </MenuItem>
        <MenuItem name="2">
            运维平台
        </MenuItem>
        <MenuItem name="3">
            统计平台
        </MenuItem>
        <MenuItem name="4">
            监管平台
    </MenuItem>-->
    <div class="logout">
      <div class="avatar">
        <img :src="userIcon || './static/img/heicon.jpg'" @click="edit" style="cursor:pointer;">
      </div>
      <div class="info">
        <span>{{username || "喜大普奔"}}</span>
        <br>
        <a href="javascript:void(0);" @click="logout">退出</a>
      </div>
    </div>
  </Menu>
</template>
<script>
import { Menu, MenuItem } from "iview";
import cookie from "./../utils/cookie.js";
import aesUtils from "@/plugins/aes-utils.js";
export default {
  data() {
    return {
      theme1: "light",
      username: "",
      userIcon: "",
      operateUserId: ""
    };
  },
  props: ["topActiveName", "topMenuLists"],
  components: {
    Menu,
    MenuItem
  },
  created() {
    this.username = cookie.getCookie("username");
    this.userIcon = cookie.getCookie("userIcon");
    this.operateUserId = cookie.getCookie("operateUserId");
    // this.$store.commit("setTopMenuList");
    // this.lists = this.$store.state.topMenuList;
    // this.$store.commit("setLeftMenuList",this.topActiveName);
  },
  methods: {
    changeTop(name) {
      this.$store.commit("setLeftMenuList", name);
      this.$router.push("/index");
    },
    logout() {
      window.localStorage.removeItem("access_token");
      cookie.delCookie("username");
      cookie.delCookie("userIcon");
      cookie.delCookie("randmId");
      cookie.delCookie("operateUserId");
      this.$router.push("/login");
    },
    edit() {
      this.$router.push({
        path: "/index/maintain/admin/user/edit",
        query: {
          id:this.operateUserId
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.topMenu {
  margin-top: 10px !important;
  position: relative;
  .logout {
    display: inline-flex;
    justify-content: start;
    position: absolute;
    right: 30px;
    width: 150px;
    height: 50px;
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .info {
      line-height: 22px;
      position: relative;
      top: 10px;
      left: 10px;
    }
  }
}
</style>