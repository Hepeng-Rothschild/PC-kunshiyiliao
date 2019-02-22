<template>
  <!--Banner-->
  <div class="iBanner">
    <div class="ibanner_main">
      <!--导航-->
      <tmpHeader :index='0' />
      <!--搜索框-->
      <div class="ibanner_header">
        <div class="header_input">
          <Input v-model.trim="search" @on-keyup.enter='searchData' placeholder="请输入banner图名称查询" style="width: 200px" clearable/>
          <Button type="primary" @click="searchData">查询</Button>
        </div>
         <Button type="primary" @click="navto">添加Banner</Button>
      </div>
      <!--表格列表-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>序号</td>
            <td>名称</td>
            <td>图片</td>
            <td>链接</td>
            <td>显示</td>
            <td>排序</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in tbleList" v-show="tbleList.length" :key='index'>
            <td>{{ addZeros(index) }}</td>
            <td>{{ item.bannerName }}</td>
            <td>
              <img
                :src="analysisImages(item.imageUrl)"
                style="display:inline-block;margin:10px 0;width:80px;height:80px;"
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
        <Page :total="bannerSize" @on-change="pageChange" :current="pageNo" :page-size="pageSize"/>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "../tmpHeader";
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
      appid: sessionStorage.getItem("appid"),
      bannerSize: 10,
      pageNo: 1,
      pageSize: 10
    };
  },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/publicHosting/index",
                title: "公众号托管"
            },
            {
                path: "/index/operation/publicAddress/list",
                title: "公众号管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
  methods: {
    // 根据输入的值获取不同的数据
    searchData () {
      this.getData(1, this.search);
    },
    pageChange(index) {
      this.pageNo = index;
      if (this.search) {
        this.getData(1, this.search);
      } else {
        this.getData(index);
      }
    },
    // 添加banner图
    navto() {
      // this.functionJS.paramsNavgationTo(this,'wxbannerAdd',{pageNo:this.pageNo})
      this.functionJS.queryNavgationTo(this,'/index/operation/banner/add',{pageNo:this.pageNo})
    },
    // 点击编辑
    change(item) {
      this.functionJS.paramsNavgationTo(this,'wxbannerEdit',{
          id: item.id,
          pageNo: this.pageNo
        })
      this.functionJS.queryNavgationTo(this,'/index/operation/banner/edit',{
        id: item.id,pageNo:this.pageNo
        })
    },
    getData(pageNo, val) {
      let params = {
        pageNo,
        pageSize: this.pageSize,
        appid: this.appid
      };
      if (val != "") {
        params.searchKey = val;
      }
      this.$axios.post(api.wxBannerList, params).then(res => {
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
  // 页面加载时获取数据
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = Number(pageNo);
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
      width: 100%;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .tabList {
      width: 100%;
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
            min-width: 100px;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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