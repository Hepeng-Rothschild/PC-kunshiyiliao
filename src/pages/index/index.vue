<template>
  <div id="main">
    <Row>
      <Col class="top" :xs="24" :md="4">
        <img class="logo" src="@/assets/images/logo.png">
        <span class="logo-text">互联网医院平台</span>
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
        <div class="welcome" v-if="showWelcome">欢迎来到互联网医院管理系统</div>
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
import topMenu from "@/components/topMenu";
import leftMenu from "@/components/leftMenu";
import Bread from "@/components/bread";
export default {
  name: "App",
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
    this.$store.commit("setTopMenuList");
    this.topMenuLists = this.$store.state.topMenuList;
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
    if (fullPath == "/index") {
      this.topActiveName = this.$store.state.topMenuList[0].id;
    }
    this.$store.commit("setLeftMenuList", this.topActiveName);
    for (let keys in this.$store.state.leftMenuList) {
      for (let key in this.$store.state.leftMenuList[keys].childLists) {
        if (
          this.$store.state.leftMenuList[keys].childLists[key].path == fullPath
        ) {
          this.leftActiveName = `${this.$store.state.leftMenuList[keys].id}-${
            this.$store.state.leftMenuList[keys].childLists[key].id
          }`;
          this.openList[0] = parseInt(keys);
          break;
        }
      }
    }
    let bread = { path: fullPath, title: this.$route.meta.title };
    this.breadList.push(bread);
    this.breadTitle = this.$route.meta.title;
    if (fullPath != "/index") this.showWelcome = false;
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != "/index") this.showWelcome = false;
    else this.showWelcome = true;

    if (to.meta.index < 3) {
      if (this.breadList[to.meta.index - 1]) {
        this.breadList = this.breadList.slice(0, to.meta.index - 1);
        this.breadTitle = to.meta.title;
        let bread = { path: to.fullPath, title: to.meta.title };
        this.breadList.push(bread);
      } else {
        let bread = { path: to.fullPath, title: to.meta.title };
        this.breadList.push(bread);
      }
    }
    next();
  },
  computed: {
    leftMenuLists() {
      return this.$store.state.leftMenuList;
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  .top {
    .logo {
      width: 60px;
      margin: 5px;
    }
    .logo-text {
      text-align: center;
      display: inline-block;
      width: 60%;
    }
  }
  .left-menu {
    width: 100% !important;
  }
  .content {
    // padding:15px 0 0 15px;
    background: #f5f5f5;
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
