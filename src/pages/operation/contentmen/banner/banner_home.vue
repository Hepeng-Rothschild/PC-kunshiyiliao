<template>
  <!--Banner-->
  <div class="iBanner">
    <div class="ibanner_main">
      <!--导航-->
      <tmpHeader/>
      <!--搜索框-->
      <div class="ibanner_header">
        <div class="header_input">
          <span>
            <Icon type=" i-icon i-icon-shop_fill" size="24"/>
          </span>
          <input type="text" placeholder="名称" v-model="search">
        </div>
        <button @click="navto">添加Banner</button>
      </div>
      <!--表格列表-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>序号</td>
            <td>名称</td>
            <td>轮播图</td>
            <td>链接</td>
            <td>显示</td>
            <td>排序</td>
            <td>操作</td>
          </tr>
          <tr v-for="item,index in tbleList" v-show="tbleList.length">
            <td>{{ addZero(index) }}</td>
            <td>{{ item.bannerName }}</td>
            <td>
              <img
                :src="item.imageUrl == ''? '' :fileBaseUrl + item.imageUrl"
                alt
                style="margin:10px 0;width:80px;height:80px;"
              >
            </td>
            <td>{{ item.bannerUrl }}</td>
            <td>{{ item.enable == 1? "是" :"否" }}</td>
            <td>{{ item.priority }}</td>
            <td @click="change(item)" style="cursor:pointer;">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!tbleList.length">暂无更多数据</div>
      </div>
      <!-- 分页-->
      <div style="text-align:center;margin:10px 0;">
        <Page :total="bannerSize" @on-change="pageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Icon, Page } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    Icon,
    Page
  },
  data() {
    return {
      tbleList: [],
      search: "",
      arr: [],
      len: 10,
      id: sessionStorage.getItem("hospitalId"),
      bannerSize: 10
    };
  },
  methods: {
    pageChange(index) {
      this.getData(index);
    },
    navto() {
      this.$router.push({
        name: "bannerAdd"
      });
    },
    change(item) {
      this.$router.push({
        name: "addBanner",
        params: {
          id: item.id
        }
      });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    getData(pageNo) {
      this.$axios
        .post(api.bannerHome, {
          bannerName: "",
          hospitalId: this.id,
          pageNo,
          pageSize: 10
        })
        .then(res => {
          if (res.data) {
            let ret = res.data.object;
            this.tbleList = ret.list;
            this.bannerSize = ret.count;
          }
        });
    }
  },
  // 页面加载时获取数据
  mounted() {
    this.getData(1);
  },
  // 根据输入的值获取不同的数据
  watch: {
    search: {
      deep: true,
      handler(oldval) {
        this.$axios
          .post(api.bannerHome, {
            bannerName: oldval,
            hospitalId: this.id,
            pageNo: 1,
            pageSize: 10
          })
          .then(res => {
            if (res.data) {
              let ret = res.data.object;
              this.bannerSize = ret.count;
              this.tbleList = ret.list;
            }
          });
      }
    }
  }
};
</script>


<style lang="less" scoped >
.iBanner {
  width: 100%;
  .ibanner_main {
    display: flex;
    flex-direction: column;
    .ibanner_header {
      width: 80%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .header_input {
        width: 200px;
        border-radius: 15px;
        border: 1px solid black;
        height: 30px;
        display: flex;
        flex-direction: row;
        span {
          display: inline-block;
          width: 20px;
          margin-top: 4px;
          margin-left: 5px;
          height: 20px;
          background: url("../../../../assets/images/search.png") no-repeat;
          background-size: 100% 100%;
        }
        input {
          border: none;
          outline: none;
          background: none;
          text-indent: 5px;
        }
      }
      button {
        padding: 6px 8px;
        background:skyblue;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 4px;
      }
    }
    .tabList {
      width: 80%;
      margin: 20px auto;
      
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
          td.none {
            display: none;
          }
        }
      }
      .footer {
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        height:40px;
        line-height:40px;
      }
    }
  }
}
</style>