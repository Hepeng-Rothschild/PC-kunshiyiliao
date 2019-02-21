<template>
  <div class="temHeader">
    <ul>
      <li v-for="item,sum in dataList" >
        <span :class="index==sum? 'active':'' " @click ='navgationTo(item)'>{{ item.title }}</span>
      
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
          title: "预约挂号",
          name: "/index/operation/register/list"
        },
        {
          title: "远程门诊",
          name: "/index/operation/remoteclinic/list"
        }
      ]
    };
  },
  props: ['index'],
  methods:{
    navgationTo(item){
      // function全局方法
      this.functionJS.queryNavgationTo(this,item.name)
    }
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
      span{
        display: block;
        color: black;
        padding: 8px 10px;
        border-bottom: 2px solid transparent;
        transition: all 0.5s;
        cursor:pointer;
      }
      span:hover {
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

