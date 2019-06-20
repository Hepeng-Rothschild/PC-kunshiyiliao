<template>
  <div class="i_keshi">
    <tmpHeader/>
    <!--搜索-->
    <div class="i-keshi_main">
      <div class="ibanner_header">
        <div class="box">
          <div class="header_input">
            <span></span>
            <Input
              v-model.trim="val"
              placeholder="请输入一级科室或二级科室查询"
              style="width: 200px;margin-right:10px;"
              clearable
            />
          </div>
          <Button type="primary" icon="ios-search" @click="change">查询</Button>
        </div>
        <Button type="info" @click="navto">添加科室</Button>
      </div>
      <!--列表-->
      <div class="tabList">
        <Table stripe :columns="columnList" :data="tableList"></Table>
      </div>
    </div>

    <div style="text-align:center;margin:10px 0;">
      <Page :total="medicineSize" @on-change="pageChange" :current="pageNo"/>
    </div>
  </div>
</template>

<script>
// 院内科室
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
      medicineSize: 10,
      val: "",
      pageNo: 1,
      columnList:[
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
          title:"院内名称",
          key:"deptNickname",
          align:"center",
        },
        {
          title:"预约科室",
          key:"registeredReservation",
          align:"center",
        },
        {
          title:"特色科室",
          key:"specialDept",
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
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getMedicineData(this.pageNo);
  },
  methods: {
    //分页器改变
    pageChange(index) {
      this.pageNo = index;
      if (this.val) {
        this.getMedicineData(index, this.val);
      } else {
        this.getMedicineData(index);
      }
    },
    // 模糊查询
    change() {
      this.getMedicineData(1, this.val);
    },
    navto() {
      this.functionJS.paramsNavgationTo(this, "medicineAdd", {
        // 公用方法
        pageNo: this.pageNo
      }); 
    },
    edit(item) {
      let id = item.id;
      this.functionJS.paramsNavgationTo(this, "medicineEdit", {
        // 公用方法
         id,
        pageNo: this.pageNo
      }); 
    },
    getMedicineData(pageNo, val) {
      let params = {
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (Boolean(val)) {
        params.searchKey = val.trim();
      }
      this.$axios
        .post(api.medicine, params)
        .then(res => {
          if (res.data.success) {
            let ret = res.data.object;
            this.medicineSize = ret.count;
            ret.list.forEach((item,index) => {
              item.registeredReservation = item.registeredReservation == '1'? '是':"否"
              item.specialDept = item.specialDept == '1'? '是':"否"
              item.sum = this.addZeros(index)
            })
            this.tableList = ret.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
      align-items: center;
      .box {
        display: flex;
        flex-direction: row;
      }
    }
    .tabList {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>