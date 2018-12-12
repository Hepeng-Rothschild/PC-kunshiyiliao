<template>
  <div class="Institutionalregistration">
    <div class="container">
      <!-- 头部信息 -->
      <header>
        <div class="btn">
          <button style="background:#716bb2;">批量导入</button>
          <button style="background:#4d8f8f;" @click = 'add'>新增机构</button>
        </div>
        <div class="search">
          <input type="text" placeholder="医生姓名/联系方式/医院名称" v-model="Name" @keyup="nameChange">
        </div>
      </header>
      <!-- 列表 -->
      <div class="list">
        <table border cellspacing cellpadding>
          <tr>
            <th>编号</th>
            <th>城市</th>
            <th>机构名称</th>
            <th>机构编码</th>
            <th>机构类型</th>
            <th>机构等级</th>
            <th>联系人姓名</th>
            <th>联系电话</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
          <tr>
            <th>编号</th>
            <th>城市</th>
            <th>机构名称</th>
            <th>机构编码</th>
            <th>机构类型</th>
            <th>机构等级</th>
            <th>联系人姓名</th>
            <th>联系电话</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>
              <span style = 'cursor:pointer' @click = 'edit'>编辑</span>
              <span style = 'cursor:pointer'>删除</span>
              <span style = 'cursor:pointer'>停用</span>
            </th>
          </tr>
        </table>
        <div class = 'notData' v-show = '!list.length'>暂无更多数据</div>
      </div>
      <!--分页器-->
		<div class = 'paging'>
			<Page :total = "doctorregisterSize" @on-change = 'pageChange'/>		
		</div>
    </div>
  </div>
</template>
<script>
// 机构注册信息
import api from "@/api/commonApi";
import { Page } from "iview";
export default {
  data() {
    return {
      doctorregisterSize: 10,
      list: [],
      Name: ""
    };
  },
  methods: {
    nameChange() {
      console.log(this.Name);
    },
    pageChange (index) {

    },
    add () {
      this.$router.push({
        name:"mechanismregadd"
      })
    },
    edit () {
      this.$router.push({
        name:"mechanismregedit"
      })
    }
  },
  components: {
    Page
  }
};
</script>
<style lang="less" scoped>
.Institutionalregistration {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    .paging{
      width:100%;
      margin:10px auto;
      text-align:center;
    }
    header {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .btn {
        button {
          border: none;
          outline: none;
          color: #e2adad;
          width: 128px;
          height: 39px;
          border-radius: 2px;
        }
      }
      .search {
        background-color: rgb(255, 255, 255);
        width: 276px;
        height: 32px;
        border-radius: 16px;
        border-width: 1px;
        border-color: rgb(102, 102, 102);
        border-style: solid;
        input {
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          text-decoration: none;
          border: none;
          outline: none;
          font-family: 微软雅黑;
          color: rgb(102, 102, 102);
          padding-left: 28px;
          width: 100%;
          line-height: 32px;
          background: none;
        }
      }
    }
    .list {
      width: 100%;
      margin:10px 0;
      table {
        width: 100%;
        tr:first-child{
          background-color: rgb(228, 228, 228);
          color: rgb(102, 102, 102);
        }
        tr {
          th {
            text-align: center;
          }
        }
      }
      .notData{
        width:100%;
        text-align:center;
        border:1px solid black;
        border-top:none;
        
      }
    }
  }
}
</style>