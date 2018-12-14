<template>
  <div class="news">
    <!--头部选择-->
    <tmpHeader/>
    <!--搜索/创建-->
    <div class="headeri">
      <div>
        <span @click = 'press'></span>
        <input type="text" placeholder="新闻标题" v-model="search" >
      </div>
      <button @click="add">创建新闻</button>
    </div>
    <!--表格列表-->
    <div class="main" v-show="tablesList.length">
      <table border cellspacing cellpadding>
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
          <th>{{ addZero(index) }}</th>
          <th>{{ item.title }}</th>
          <th>
            <!-- <img
              :src="(item.newsHeadlines=='' || item.newsHeadlines == null)? '' :fileBaseUrl + item.newsHeadlines"
              alt
              style="margin:10px 0;width:100px;height:50px;"
            > -->
            <img
              :src="analysisImages(item.newsHeadlines)"
              alt
              style="margin:10px 0;width:100px;height:50px;"
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
    <div style="text-align:center;margin:10px 0;">
      <Page :total="newsSize" @on-change="pageChange"/>
    </div>
  </div>
</template>

<script>
// 动态新闻
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import axios from "axios";
import { Page } from "iview";
export default {
  components: {
    tmpHeader,
    Page
  },
  mounted() {
    // this.getData(1);
  },
  data() {
    return {
      switch1: false,
      tablesList: [],
      search: "",
      id: sessionStorage.getItem("hospitalId"),
      newsSize: 10
    };
  },
  methods: {
    //分页器改变
    pageChange(index) {
      this.getData(index);
    },
    navto(item) {
      let id = item.id;
      this.$router.push({
        name: "newsEdit",
        params: {
          id
        }
      });
    },
    add() {
      this.$router.push({
        name: "d_createdNews"
      });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    press() {
      this.getData(1,this.search);
    },
    getData(pageNo, val) {
      let params = {
          hospitalId: this.id,
          pageNo,
          pageSize: 10
        }
        if (val != '') {
          params.searchKey = val
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
    analysisImages (json) {
      try {
        json = JSON.parse(json);
        return this.fileBaseUrl + json.fileName
      } catch (error) {
        return ''
      }
    }
  }
};
</script>

<style scoped lang="less">
.news {
  width: 100%;
  .headeri {
    width: 90%;
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 20px;
      margin-left: 8px;
      margin-top: 5px;
      height: 20px;
      background: url("../../../../assets/images/search.png") no-repeat;
      background-size: 100% 100%;
    }
    button {
      width: 80px;
      height: 30px;
      margin-left: 20px;
      text-align: center;
      line-height: 30px;
      border: none;
      outline: none;
      background: #00bfff;
      color: #fff;
      border-radius: 6px;
    }
    div {
      display: flex;
      flex-direction: row;
      border-radius: 15px;
      border: 1px solid black;
      width: 200px;
      height: 30px;
      input {
        border: none;
        outline: none;
        background: none;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-indent: 5px;
      }
    }
  }
  .main {
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
        background: #9dcae4;
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
        background: #9dcae4;
      }
    }
    .fooDiv {
	  width: 100%;
	  height:40px;
	  line-height:40px;
      border: 1px solid #ddd;
      border-top-color: transparent;
      text-align: center;
    }
  }
}
</style>