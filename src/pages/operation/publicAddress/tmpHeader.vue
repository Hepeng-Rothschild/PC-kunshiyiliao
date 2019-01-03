<template>
  <div class="temHeader">
    <ul>
      <li v-for="item,index in dataList">
        <router-link :to="item.name" >{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { TabPane } from "iview";
export default {
  components: { TabPane },
  data() {
    return {
      dataList: [
        {
          title: "Banner图",
          name: "/index/operation/banner/list"
        },
        {
          title: "模板管理",
          name: "/index/operation/template/home"
        }
      ]
    };
  }
};
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
        color: black;
        padding: 8px 10px;
        border-bottom: 2px solid transparent;
        transition: all 0.5s;
      }
      a:hover {
        color: #57a3f3;
      }
      .active {
        color: #2d8cf0;
        border-bottom: 2px solid #2d8cf0;
      }
      .router-link-exact-active {
        color: #2d8cf0;
        border-bottom: 2px solid #2d8cf0;
      }
    }
  }
}
</style>

