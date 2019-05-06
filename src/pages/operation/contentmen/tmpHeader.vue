<template>
  <header>
    <h1 class="hospitalName">{{ hospitalName }}</h1>
    <ul>
      <li v-for="(item,index) in dataList" @click="changeIndex(index)" :key='index'>
        <router-link :to="item.name" :class="{ active:current == index }">{{ item.title }}</router-link>
      </li>
    </ul>
  </header>
</template>
<script>
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
  data() {
    return {
      hospitalName: "",
      current: localStorage.getItem("homeIndex") || -1,
      dataList: [
        {
          name: "/index/operation/home_info",
          title: "医院信息"
        },
        {
          name: "/index/operation/i_banner",
          title: "Banner"
        },
        {
          name: "/index/operation/i_keshi",
          title: "院内科室"
        },
        {
          name: "/index/operation/t_keshi",
          title: "特色科室"
        },
        {
          name: "/index/operation/k_department",
          title: "预约科室"
        },
        {
          name: "/index/operation/news",
          title: "动态新闻"
        },
        {
          name: "/index/operation/expert",
          title: "专家介绍"
        },
        {
          name: "/index/operation/service_management",
          title: "服务管理"
        },
        {
          name: "/index/operation/servicePackage/list",
          title: "服务包管理"
        },
        {
          name: "/index/operation/remoteClinic_list",
          title: "远程门诊"
        },
        {
          name: "/index/operation/doctorremoteClinic_list",
          title: "远程门诊类型"
        },
        {
          name: "/index/operation/thirdParty",
          title: "第三方服务"
        }
      ]
    };
  },
  mounted() {
    let iv = store.state.iv;
    let salt = store.state.salt;
    this.hospitalName = aesUtils.decrypt(
      salt,
      iv,
      "Doctortoservice",
      localStorage.getItem("hospitalName")
    );
  },
  methods: {
    changeIndex(index) {
      localStorage.setItem("homeIndex", index);
    }
  }
};
</script>
<style scoped lang="less">
header {
  width: 100%;
  padding: 30px auto;
  .hospitalName {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  ul {
    width:90%;
    margin: 0 5%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    li {
      float: left;
      border-bottom: 1px solid #ddd;
      a {
        display: block;
        color: black;
        padding: 6px 8px;
        cursor: pointer;
        user-select: none;
        border-bottom: 2px solid transparent;
        transition: all 0.5s;
      }
      a:hover {
        color: #57a3f3;
        border-bottom: 2px solid #2d8cf0;
      }
      .active {
        color: #2d8cf0;
        border-bottom: 2px solid #2d8cf0;
      }
      // .router-link-exact-active {
      //   color: #2d8cf0;
      //   border-bottom: 2px solid #2d8cf0;
      // }
    }
    li:last-child {
      margin: 0;
    }
  }
}
</style>