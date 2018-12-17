<template>
  <div class="residentregister">
    <div class="container">
      <!-- 头部信息 -->
      <header>
        <div class="search">
          <input type="text" placeholder="医生姓名/联系方式/医院名称" v-model="Name">
        </div>
        <button @click="nameChange">查询</button>
      </header>
      <!-- 列表 -->
      <div class="list">
        <table border cellspacing cellpadding>
          <tr>
            <th>编号</th>
            <th>openID</th>
            <th>居民姓名</th>
            <th>注册昵称</th>
            <th>联系方式（手机）</th>
            <th>注册微信公众号</th>
            <th>微信号
              <br>绑定机构名称
            </th>
            <th>注册时间</th>
          </tr>
          <tr v-for="item,index in list">
            <th>{{ addZero(index) }}</th>
            <th>{{ item.openid }}</th>
            <th>{{ item.userName }}</th>
            <th>{{ item.nickname }}</th>
            <th>{{ item.telephone }}</th>
            <th>{{ item.appNick }}</th>
            <th>{{ item.appMechanism }}</th>
            <th>{{ item.createTime }}</th>
          </tr>
        </table>
        <div class="notData" v-show="!list.length">暂无更多数据</div>
      </div>
    </div>
    <!--分页器-->
    <div class="paging">
      <Page :total="residentregisterSize" @on-change="pageChange"/>
    </div>
  </div>
</template>
<script>
// 居民注册信息
import api from "@/api/commonApi";
import { Page } from "iview";
export default {
  data() {
    return {
      residentregisterSize: 10,
      list: [],
      Name: ""
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    pageChange(index) {
      if (this.Name) {
        this.getData(index,this.Name);
      } else {
        this.getData(index);
      }
    },
    nameChange() {
      this.getData(1, this.Name);
    },
    getData(pageNo, val) {
      let params = {
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.searchKey = val;
      }
      this.$axios.post(api.residentReg, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          if (ret.list) {
            this.residentregisterSize = ret.count;
            this.list = ret.list;
          } else {
            this.residentregisterSize = 10
            this.list = []
            this.$Message.info("查询结果为空");
          }
        } else {
          this.$Message.info("查询失败");
        }
      });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
  },
  components: {
    Page
  }
};
</script>
<style lang="less" scoped>
.residentregister {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    header {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .search {
        background-color: rgb(255, 255, 255);
        height: 32px;
        width: 276px;
        border-radius: 16px;
        border-width: 1px;
        border-color: rgb(102, 102, 102);
        border-style: solid;
        text-align: right;
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
      button {
        width: 100px;
        text-align: center;
        line-height: 32px;
        border: none;
        outline: none;
        background: skyblue;
        text-align: center;
        border-radius: 4px;
        color: #fff;
        margin-left: 10px;
      }
    }
    .list {
      width: 100%;
      margin: 10px 0;
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
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        line-height:40px;
        
      }
    }
  }
  .paging {
    width: 100%;
    margin: 10px auto;
    text-align: center;
  }
}
</style>