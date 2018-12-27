<template>
  <div class="temHeader">
    <ul>
      <li>
        <router-link to="/index/operation/register/list">医生排班列表</router-link>
      </li>
      <!-- <li>
        <router-link to="/index/operation/remoteclinic/list">远程门诊排班</router-link>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.temHeader {
  width: 100%;
  line-height: 40px;
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #ddd;
    li {
      a {
        display: block;
        color:black;
        padding: 8px 10px;
        border-bottom: 2px solid transparent;
      }
      .router-link-exact-active {
        color: skyblue;
        border-bottom: 2px solid skyblue;
      }
    }
  }
}
</style>

