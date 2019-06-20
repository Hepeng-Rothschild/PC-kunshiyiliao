<template>
  <div class="k_department">
    <tmpHeader/>
    <div class="k_department-main">
      <!--搜索框-->
      <header>
        <div>
          <Input placeholder="请输入一级科室或二级科室查询" v-model.trim="val" style="width: 200px;margin-right:10px;" clearable/>
        </div>
        <Button type="primary" icon="ios-search" @click="valChange">查询</Button>
      </header>
      <!--列表-->
      <div class="tabList">
        <Table stripe :columns="columnList" :data="tableList"></Table>
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
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      tableList: [],
      id: sessionStorage.getItem("hospitalId"),
      bookingofficeSize: 10,
      val: "",
      pageNo: 1,
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
          title:"科室就诊位置",
          key:"address",
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
    edit(item) {
      let id = item.id;
       //functionJS公用跳转方法
        this.functionJS.paramsNavgationTo(this, "bookingofficeEdit", {
          id,
          pageNo:this.pageNo
        });
    },
    // 模糊查询
    valChange() {
      this.getBookingofficeData(1, this.val);
    },
    getBookingofficeData(pageNo, val) {
      let params = {
        childDept: "",
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (Boolean(val)) {
        params.searchKey = val.trim();
      }
      this.$axios.post(api.kDepartment, params).then(res => {
        if (res.data.success) {
          let ret = res.data.object;
          console.log(ret);
          ret.list.forEach((item,index) => {
            item.sum = this.addZeros(index);
            item.display = item.display ==1? '是' :"否"
          })
          this.tableList = ret.list;
          this.bookingofficeSize = ret.count;
        }
      });
    }
  },
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getBookingofficeData(this.pageNo);
  }
};
</script>

<style scoped lang="less">
.k_department {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .k_department-main {
    width: 80%;
    margin: 10px auto;
    header {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .tabList {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>