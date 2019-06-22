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
        <Button @click="addBanner" type="info">添加Banner</Button>
      </div>
      <!--表格列表-->
      <div class="tabList">
        <Table stripe :columns="columnList" :data="tbleList"></Table>
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
      pageNo: 1,
      columnList: [
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
                    this.editBanner(row)
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
      if (Boolean(val)) {
        params.bannerName = val.trim();
      }
      this.$axios.post(api.bannerHome, params).then(res => {
        if (res.data.success) {
          let ret = res.data.object;
          ret.list.forEach((item,index) => {
            item.sum = this.addZeros(index);
            item.imageUrl = this.analysisImages(item.imageUrl);
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
    }
  }
}
</style>