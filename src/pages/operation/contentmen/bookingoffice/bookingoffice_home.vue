<template>
  <div class="k_department">
    <tmpHeader/>
    <div class="k_department-main">
      <!--搜索框-->
      <header>
        <div>
          <span></span>
          <input type="text" placeholder="一级科室二级科室" v-model.trim="val">
        </div>
        <button @click="valChange" class="btn">查询</button>
      </header>
      <!--列表-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>序号</th>
            <th>一级科室</th>
            <th>二级科室</th>
            <th>科室就诊位置</th>
            <th>是否显示</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
          <tr v-for="item,index in tableList" v-show="tableList.length">
            <td>{{ addZero(index) }}</td>
            <td>{{ item.parentDept }}</td>
            <td>{{ item.childDept }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.display !=1? '否' :'是' }}</td>
            <td>{{ item.priority }}</td>
            <td class="ltd" @click="navto(item)">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!tableList.length">暂无更多数据</div>
      </div>
    </div>
    <div style="text-align:center;margin:10px 0;">
      <Page :total="bookingofficeSize" @on-change="pageChange" :current="pageNo"/>
    </div>
  </div>
</template>

<script>
// 预约科室
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import { Page } from "iview";
export default {
  components: {
    tmpHeader,
    Page
  },
  data() {
    return {
      tableList: [],
      id: sessionStorage.getItem("hospitalId"),
      bookingofficeSize: 10,
      val: "",
      pageNo: 1
    };
  },
  methods: {
    //分页器改变
    pageChange(index) {
      this.pageNo = index;
      if (this.val) {
        this.getBookingofficeData(index, this.val);
      } else {
        this.getBookingofficeData(index);
      }
    },
    navto(item) {
      let id = item.id;
      this.$router.push({
        name: "bookingofficeEdit",
        params: {
          id,
          pageNo:this.pageNo
        }
      });
    },
    // 模糊查询
    valChange() {
      this.getBookingofficeData(1, this.val);
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    getBookingofficeData(pageNo, val) {
      let params = {
        childDept: "",
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.searchKey = val;
      }
      this.$axios.post(api.kDepartment, params).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.tableList = ret.list;
          this.bookingofficeSize = ret.count;
        }
      });
    }
  },
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = pageNo;
    }
    this.getBookingofficeData(1);
  }
};
</script>

<style scoped lang="less">
.k_department {
  width: 100%;
  background: #fff;
  .k_department-main {
    width: 80%;
    margin: 0 auto;
    header {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin: 20px 0;
      div {
        border-radius: 20px;
        border: 1px solid black;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          display: inline-block;
          width: 20px;
          margin-left: 5px;
          height: 20px;
          background: url("../../../../assets/images/search.png") no-repeat;
          background-size: 100% 100%;
        }
        input {
          text-indent: 5px;
          height: 30px;
          outline: none;
          background: none;
          border: none;
          border-radius: 0;
          margin: 0 10px;
        }
      }
      .btn {
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: none;
        outline: none;
        background: skyblue;
        color: #fff;
        border-radius: 4px;
        margin-left: 10px;
      }
    }
    .tabList {
      width: 100%;
      margin: 20px 0;
      .footer {
        width: 100%;
        border: 1px solid #ddd;
        height: 40px;
        line-height: 40px;
        border-top: none;
        text-align: center;
      }
      table {
        width: 100%;
        border: 1px solid #ddd;
        tr:nth-child(odd) {
          background: #f8f8f9;
        }
        tr:nth-child(even) {
          background: #fff;
        }
        tr:not(:first-child):hover {
          background: #9dcae4;
        }
        tr {
          border-top: 1px solid #ddd;
          height: 40px;
          td {
            text-align: center;
          }
          .ltd {
            color: black;
            user-select: none;
            cursor: pointer;
          }
          th {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>