<template>
  <header>
    <h1 class="hospitalName">{{ hospitalName }}</h1>
    <ul>
      <li>
        <router-link to="/index/operation/home_info">医院信息</router-link>
      </li>
      <li>
        <router-link to="/index/operation/i_banner">Banner</router-link>
      </li>
      <li>
        <router-link to="/index/operation/i_keshi">院内科室</router-link>
      </li>
      <li>
        <router-link to="/index/operation/news">动态新闻</router-link>
      </li>
      <li>
        <router-link to="/index/operation/t_keshi">特色科室</router-link>
      </li>
      <li>
        <router-link to="/index/operation/expert">专家介绍</router-link>
      </li>
      <li>
        <router-link to="/index/operation/service_management">服务管理</router-link>
      </li>
      <li>
        <router-link to="/index/operation/k_department">预约科室</router-link>
      </li>
      <li>
        <router-link to="/index/operation/remoteClinic_list">远程门诊</router-link>
      </li>
      <li>
        <router-link to="/index/operation/doctorremoteClinic_list">远程门诊类型</router-link>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  data() {
    return {
      hospitalName: sessionStorage.getItem("hospitalName")
    };
  }
};
</script>
<style scoped lang="less">
header {
  width: 100%;
  // height: 40px;
  margin: 30px auto;
  .hospitalName {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  ul {
    // width: 80%;
    min-width:900px;
    margin: 0 10%;
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
      }
      .router-link-exact-active {
        color: skyblue;
        border-bottom: 2px solid skyblue;
      }
    }
    li:last-child {
      margin: 0;
    }
  }
}
</style>