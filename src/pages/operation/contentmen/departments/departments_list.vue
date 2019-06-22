<template>
  <div class="i_keshi">
    <tmpHeader/>
    <!--搜索-->
    <div class="i-keshi_main" v-show = '!flag'>
      <div class="ibanner_header">
        <div class="header_input">
          <span></span>
          <Input v-model.trim="search" clearable placeholder="请输入一级科室或二级科室查询" style="width: 200px;margin-right:7px;" @on-keyup.enter='searchs'/>
        <Button type="primary" @click="searchs" icon="ios-search">查询</Button>
        </div>
      </div>
      <!--列表-->
      <div class="tabList">
        <Table stripe :columns="columnList" :data="tableList"></Table>
      </div>
    </div>
    <div style="text-align:center;margin:10px 0;" v-show = '!flag'>
      <Page :total="departmentsSize" @on-change="pageChange" :current = "pageNo"/>
    </div>
  </div>
</template>

<script>
// 特色科室
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      tableList: [],
      id: sessionStorage.getItem("hospitalId"),
      departmentsSize: 10,
      search:"",
      pageNo:1,
      flag:"",
      columnList: [
        {
          title:"序号",
          key:"sum",
          align:"center",
        },
        {
          title:"一级科室",
          key:"parentDept",
          align:"center",
        },
        {
          title:"二级科室",
          key:"childDept",
          align:"center",
        },
        {
          title:"院内科室",
          key:"deptNickname",
          align:"center",
        },
        {
          title:"显示",
          key:"display",
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
                    this.edit(row)
                  }
                }
              },'编辑')
            ]
          }
        }
      ]
    };
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
    this.status()
     let pageNo = this.$route.params.pageNo
    if(pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getDepartmentsData(this.pageNo);
  },
  methods: {
    // 分页器,切换事件
    pageChange(index) {
      this.pageNo = index
      if (this.search) {
        this.getDepartmentsData(index,this.search);
      } else {
        this.getDepartmentsData(index);
      }
    },
    status() {
      let flag = localStorage.getItem("status");
      if (!Boolean(flag)) {
        this.$Message.info("您还没有开通互联网医院,去开通");
        this.flag = true;
        localStorage.setItem("homeIndex", 0);
        setTimeout(() => {
          this.functionJS.paramsNavgationTo(this, "homeInfo");
        }, 600)
      }
    },
    searchs() {
      this.getDepartmentsData(1,this.search);
    },
    edit(item) {
      let id = item.id;
      this.functionJS.paramsNavgationTo(this, "departmentsList", {
        // 公用方法
        id,
        pageNo:this.pageNo
      });
    },
    getDepartmentsData(pageNo,val) {
      let params = {
          hospitalId: this.id,
          pageNo,
          pageSize: 10
        }
        if (Boolean(val)) {
          params.searchKey = val.trim()
        }
      this.$axios
        .post(api.tesekeshi, params)
        .then(res => {
          if (res.data.success) {
            let ret = res.data.object;
            console.log(res);
            ret.list.forEach((item,index) => {
              item.sum = this.addZeros(index);
              item.display = item.display == 1 ? '是'  : "否"
            })
            this.tableList = ret.list;
            this.departmentsSize = ret.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeshow (show) {
      if (show !=1) {
        return '否'
      }
      return '是'
    }
  }
};
</script>

<style scoped lang="less">
.i_keshi {
   width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .i-keshi_main {
    width: 80%;
    margin: 10px auto;
    .ibanner_header {
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .tabList {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>