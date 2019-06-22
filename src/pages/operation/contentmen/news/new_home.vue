<template>
  <div class="news">
    <!--头部选择-->
    <tmpHeader/>
    <!--搜索/创建-->
    <div class="headeri" v-show="!flag">
      <div>
        <Input v-model.trim="search" placeholder="请输入新闻标题查询" style="width: 200px" @on-keyup.enter="press" clearable />
       <Button type="primary" @click="press"  icon="ios-search">查询</Button>
      </div>
      <Button type="info" @click="add">创建新闻</Button>
    </div>
    <!--表格列表-->
    <div class="main">
      <Table stripe :columns="columnList" :data="tablesList"></Table>
    </div>
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
      tablesList: [],
      search: "",
      id: sessionStorage.getItem("hospitalId"),
      newsSize: 10,
      pageNo: 1,
      flag: false,
      columnList: [
        {
          title:"序号",
          key:"sum",
          align:"center",
        },
        {
          title:"新闻标题",
          key:"title",
          align:"center",
        },
        {
          title:"首图",
          key:"newsHeadlines",
          align:"center",
          width: 100,
          render: (h, params) => {
            let avatar = params.row.newsHeadlines;
            let a = ''
            if(Boolean(avatar)) {
              a = h("img", {
                  attrs: {
                      src: avatar || '',
                      style:
                          "width:100%;height:100%;"
                  }
              })
            } else {
              a = h("span", {
                  attrs: {
                      style:'color:gray'
                  }
              },'暂无图片')
            }
            return a
        }
        },
        {
          title:"新闻来源",
          key:"source",
          align:"center",
        },
        {
          title:"是否显示",
          key:"enable",
          align:"center",
        },
        {
          title:"是否置顶",
          key:"priority",
          align:"center",
        },
        {
          title:"操作",
          align:"center",
          render: (h,params) => {
            let row = params.row;
            return [
              h('a',{
                on: {
                  click :() => {
                    this.navto(row)
                  }
                }
              },'编辑')
            ]
          }
        }
      ]
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
      if (Boolean(val)) {
        params.searchKey = val;
      }
      axios
        .post(api.news, params)
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object.list;
            ret.forEach((item,index) => {
              item.sum = this.addZeros(index);
              item.enable = item.enable === 1 ? '是':'否'
              item.priority = item.priority == 1 ? '是' : '否'
              item.newsHeadlines = this.analysisImages(item.newsHeadlines);
            })
            this.tablesList = ret;
            console.log(ret);
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
  }
}
</style>