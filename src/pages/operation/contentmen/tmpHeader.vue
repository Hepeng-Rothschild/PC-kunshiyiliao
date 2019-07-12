<template>
  <header>
    <h1 class="hospitalName">{{ hospitalName }}</h1>
    <div class="wrapper">
      <ul class ='wrapper-box'>
        <li v-for="(item,index) in dataList" @click="changeIndex(index,$event)" :key='index'>
          <router-link :to="item.name" :class="{ active:current == index }">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>

  </header>
</template>
<script>
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
import BScroll from 'better-scroll'
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
        },
        {
          name: "/index/operation/feeStandard",
          title: "互联网收费标准"
        },
        {
          name: "/index/operation/followupNotice/index",
          title: "随访告知书"
        },
        {
          name : "/index/operation/followForm/index",
          title : "随访表单"
        }
      ],
      scroll: null
    };
  },
  mounted() {
    let iv = store.state.iv;
    let salt = store.state.salt;
    let storage = localStorage.getItem("hospitalName")
    if(Boolean(storage)) {
        this.hospitalName = aesUtils.decrypt(
          salt,
          iv,
          "Doctortoservice",
          storage
        )
    }

    let _wrapperbox = document.querySelector('.wrapper-box')
    let len = this.dataList.length;
    _wrapperbox.style.width = len * 120 + 'px'

    let wrapper = document.querySelector('.wrapper')
    this.scroll = new BScroll(wrapper, {
      scrollX: true,
      click: true
    })
    let _li = _wrapperbox.getElementsByTagName('li')
    this.scroll.scrollToElement(_li[this.current], 0, true)

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
  // width: 100%;
  padding: 30px auto;
  overflow:hidden;
  .hospitalName {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 40px;
  }
  .wrapper{
    height:40px;
  }
  ul {
    width:300%;
    height: 40px;
    li {
      min-width:120px;
      text-align:center;
      // padding:0 2px;
      float: left;
      border-bottom: 1px solid #ddd;
      a {
        display: block;
        font-size:12px;
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
    }
    li:last-child {
      margin: 0;
    }
  }
}
</style>