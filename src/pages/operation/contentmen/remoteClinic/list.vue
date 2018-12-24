<template>
  <div class="remoteClinicList">
    <tmpHeader/>
    <br>
    <div class="wrapper">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>编号</th>
          <th>科室名称</th>
          <th>二级科室</th>
          <th>院内名称</th>
          <th>是否显示</th>
          <th>操作</th>
        </tr>
        <tr>
          <th>1</th>
          <th>科室名称</th>
          <th>二级科室</th>
          <th>院内名称</th>
          <th>是否显示</th>
          <th>
            <span style="cursor:pointer" @click="edit">查看</span>
          </th>
        </tr>
      </table>
      <!-- <div class="notData">暂无更多数据</div> -->
      <div class="total">
        <Page :total="remoteClinicSize" @on-change="pageChange" :current="pageNo"/>
      </div>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      remoteClinicSize: 10,
      pageNo: 1
    };
  },
  methods: {
    //  分页器改变 
    pageChange(index) {
      this.pageNo = index;
    },
    // 查看科室
    edit () {
        this.$router.push({
            name:"remoteClinicEdit"
        })
    }
  }
};
</script>
<style lang="less" scoped>
.remoteClinicList {
  width: 100%;
  background: #f2f2f2;
  .wrapper {
    width: 90%;
    margin: 0 auto;
    height: auto;
    table {
      width: 100%;
      border: 1px solid #ddd;
      tr {
        border-top: 1px solid #ddd;
        height: 40px;
        th {
          text-align: center;
        }
      }
      tr:nth-child(odd) {
        background: #f8f8f9;
      }
      tr:nth-child(even) {
        background: #fff;
      }
      tr:not(:first-child):hover {
        background: #9dcae4;
      }
    }
    .notData {
      width: 100%;
      height: 40px;
      text-align: center;
      border: 1px solid #ddd;
      margin: 0 auto;
      background: #fff;
      border-top: none;
      line-height: 40px;
    }
  }
  .total{
      margin:20px 0;
      text-align:center;
  }
}
</style>
