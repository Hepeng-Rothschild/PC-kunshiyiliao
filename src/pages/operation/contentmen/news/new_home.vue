<template>
  <div class="news">
    <!--头部选择-->
    <tmpHeader/>
    <!--搜索/创建-->
    <div class="headeri" v-show="!flag">
      <div>
        <span></span>
        <Input v-model.trim="search" placeholder="请输入新闻标题查询" style="width: 200px" @on-keyup.enter="press" clearable/>
       <Button type="primary" @click="press"  icon="ios-search">查询</Button>
      </div>
      <Button type="primary" @click="add">创建新闻</Button>
    </div>
    <!--表格列表-->
    <div class="main" v-show="tablesList.length">
      <table border="0" cellspacing="0" cellpadding="0" v-show="!flag">
        <tr>
          <th>编号</th>
          <th>新闻标题</th>
          <th>首图</th>
          <th>新闻来源</th>
          <th>是否显示</th>
          <th>是否置顶</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tablesList" :key="index">
          <th>{{ addZeros(index) }}</th>
          <th>{{ item.title }}</th>
          <th>
            <!-- <img
              :src="(item.newsHeadlines=='' || item.newsHeadlines == null)? '' :fileBaseUrl + item.newsHeadlines"
              alt
              style="margin:10px 0;width:100px;height:50px;"
            >-->
            <img
              :src="analysisImages(item.newsHeadlines)"
              alt=''
              style="display:inline-block;margin:10px 0;width:100px;height:50px;"
            >
          </th>
          <th>{{ item.source}}</th>
          <!--是否显示-->
          <th>{{ item.enable === 1 ? '是':'否' }}</th>
          <!--是否置顶-->
          <th>{{ item.priority ==1 ? '是' : '否' }}</th>
          <th :data-id="item.id" :date-id="tablesList.length">
            <span style="cursor:pointer;" :data-id="item.id" @click="navto(item)">编辑</span>
          </th>
        </tr>
      </table>
    </div>
    <!--底部空表格-->
    <footer v-show="!tablesList.length">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>编号</th>
          <th>新闻标题</th>
          <th>首图</th>
          <th>新闻内容</th>
          <th>新闻来源</th>
          <th>是否显示</th>
          <th>是否置顶</th>
          <th>操作</th>
        </tr>
      </table>
      <div class="fooDiv">没有更多数据</div>
    </footer>
    <div style="text-align:center;margin:10px 0;" v-show="!flag">
      <Page :total="newsSize" @on-change="pageChange" :current="pageNo"/>
    </div>
  </div>
</template>

<script>
// 动态新闻
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import axios from "axios";
export default {
  components: {
    tmpHeader
  },
  created(){
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
  mounted() {
    this.status();
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getData(this.pageNo);
  },
  data() {
    return {
      switch1: false,
      tablesList: [],
      search: "",
      id: sessionStorage.getItem("hospitalId"),
      newsSize: 10,
      pageNo: 1,
      flag: false
    };
  },
  methods: {
    //分页器改变
    pageChange(index) {
      this.pageNo = index;
      if (this.search) {
        this.getData(index, this.search);
      } else {
        this.getData(index);
      }
    },
    status() {
      let flag = localStorage.getItem("status");
      if (!Boolean(flag)) {
        this.$Message.info("您还没有开通互联网医院,去开通");
        localStorage.setItem("homeIndex", 0);
        this.flag = true;
        setTimeout(() => {
          this.functionJS.paramsNavgationTo(this, "homeInfo", {
            // 公用方法
          }); 
        }, 600);
      }
    },
    navto(item) {
      let id = item.id;
      this.functionJS.paramsNavgationTo(this, "newsEdit", {
        // 公用方法
        id,
        pageNo: this.pageNo
      }); 
    },
    add() {
      this.functionJS.paramsNavgationTo(this, "d_createdNews", {
        // 公用方法
          pageNo: this.pageNo
      }); 
    },
    press() {
      this.getData(1, this.search);
    },
    getData(pageNo, val) {
      let params = {
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.searchKey = val;
      }
      axios
        .post(api.news, params)
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object.list;
            this.tablesList = ret;
            this.newsSize = res.data.object.count;
          }
        })
        .catch(err => {
          console.log(err);
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
  }
};
</script>

<style scoped lang="less">
.news {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .headeri {
    width: 80%;
    display: flex;
    margin: 10px auto;
    flex-direction: row;
    justify-content: space-between;

  }
  .main {
    width: calc(90% - 40px);
    margin: 10px auto;
    padding: 0 20px;
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
        background: #ebf7ff;
      }
    }
  }
  footer {
    width: calc(100% - 40px);
    margin: 10px auto;
    padding: 0 20px;
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
        background: #ebf7ff;
      }
    }
    .fooDiv {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 1px solid #ddd;
      border-top-color: transparent;
      text-align: center;
    }
  }
}
</style>