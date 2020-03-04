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
      <Table stripe :columns="columns" :data="tbleList" style="width:100%;margin:10px 0;"></Table>
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
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
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
      appid:"",
      bannerSize: 10,
      pageNo: 1,
      pageSize: 10,
      columns:[
        {
          title:"序号",
          key:"sum",
          align:"center",
        },
        {
          title:"名称",
          key:"bannerName",
          align:"center",
        },
        {
          title:"轮播图",
          key:"imageUrl",
          align:"center",
          width: 100,
          render: (h, params) => {
            let avatar = params.row.imageUrl;
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
          title:"链接",
          key:"bannerUrl",
          align:"center",
        },
        {
          title:"显示",
          key:"enable",
          align:"center",
        },
        {
          title:"排序",
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
                  click: () => {
                    this.change(row)
                  }
                }
              },'编辑')
            ]
          }
        }
      ]
    };
  },
  created() {
    let iv = store.state.iv;
    let salt = store.state.salt;
    this.appid = aesUtils.decrypt(salt,iv,"wxAppid",localStorage.getItem("appid"))
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
      if (Boolean(val)) {
        params.searchKey = val.trim();
      }
      this.$axios.post(api.wxBannerList, params).then(res => {
        if (res.data.code) {
          console.log(res)
          let ret = res.data.object;
          ret.list.forEach((item,index) => {
            item.sum = this.addZeros(index)
            item.imageUrl = this.analysisImages(item.imageUrl)
            item.enable = item.enable == 1 ? "是" :"否" 
          })
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
    let pageNo = this.$route.query.pageNo;
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
  }
}
</style>