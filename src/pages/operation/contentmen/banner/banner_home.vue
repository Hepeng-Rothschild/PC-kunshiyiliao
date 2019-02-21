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
          <Input v-model.trim="search" placeholder="输入名称进行检索" style="width: 200px" clearable/>
          <Button type="primary" @click="searchInput" icon="ios-search">查询</Button>
        </div>
        <Button @click="addBanner" type="primary">添加Banner</Button>
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
            <td>{{ addZeros(index) }}</td>
            <td>{{ item.bannerName }}</td>
            <td>
              <img
                :src="analysisImages(item.imageUrl)"
                alt="路径错误"
                style="display:inline-block;margin:10px 0;width:80px;height:80px;"
              >
            </td>
            <td>{{ item.bannerUrl }}</td>
            <td>{{ item.enable == 1? "是" :"否" }}</td>
            <td>{{ item.priority }}</td>
            <td @click="editBanner(item)" style="cursor:pointer;">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!tbleList.length">暂无更多数据</div>
      </div>
      <!-- 分页-->
      <div style="text-align:center;margin:10px 0;">
        <Page :total="bannerSize" @on-change="pageChange" :current="pageNo"/>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      tbleList: [],
      search: "",
      arr: [],
      len: 10,
      id: sessionStorage.getItem("hospitalId"),
      bannerSize: 10,
      pageNo: 1
    };
  },
  created() {
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/mechanism/index",
        title: "机构运营"
      },
      {
        path: "/index/operation/home",
        title: "机构管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  methods: {
    pageChange(index) {
      this.pageNo = index;
      if (this.search) {
        this.getData(1, this.search);
      } else {
        this.getData(index);
      }
    },
    searchInput() {
      this.getData(1, this.search);
    },
    // 新增
    addBanner() {
      //functionJS公用跳转方法
      this.functionJS.paramsNavgationTo(this, "bannerAdd", {
        pageNo: this.pageNo
      });
    },
    // 编辑
    editBanner(item) {
      //functionJS公用跳转方法
      this.functionJS.paramsNavgationTo(this, "addBanner", {
        id: item.id,
        pageNo: this.pageNo
      });
    },
    getData(pageNo, val) {
      let params = {
        bannerName: "",
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.bannerName = val;
      }
      this.$axios.post(api.bannerHome, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.tbleList = ret.list;
          this.bannerSize = ret.count;
        }
      });
    },
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return this.fileBaseUrl + json.fileName;
      } catch (error) {
        return "";
      }
    }
  },
  // 页面初始化获取数据
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getData(this.pageNo);
  }
};
</script>

<style lang="less" scoped >
.iBanner {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .ibanner_main {
    display: flex;
    flex-direction: column;
    .ibanner_header {
      width: 80%;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
          background: #ebf7ff;
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
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>