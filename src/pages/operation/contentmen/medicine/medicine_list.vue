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
        <Button type="primary" @click="navto">添加科室</Button>
      </div>
      <!--列表-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>序号</th>
            <th>一级科室</th>
            <th>二级科室</th>
            <th>院内名称</th>
            <th>预约科室</th>
            <th>特色科室</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in tableList" v-show="tableList.length" :key='index'>
            <td>{{ addZeros(index) }}</td>
            <td>{{ item.parentDept }}</td>
            <td>{{ item.childDept }}</td>
            <td>{{ item.deptNickname}}</td>
            <td>{{ item.registeredReservation == '1'? '是':"否" }}</td>
            <td>{{ item.specialDept == '1'? '是':"否" }}</td>
            <td >
              <span @click="edit(item)" style="cursor:pointer;">编辑</span>
              <!-- <span>删除</span> -->
            </td>
          </tr>
        </table>
        <div class="footer" v-show="!tableList.length">暂无更多数据</div>
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
          if (res.data.code) {
            let ret = res.data.object;
            this.medicineSize = ret.count;
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
      .footer {
        width: 100%;
        border: 1px solid #ddd;
        border-top: none;
        text-align: center;
        background: #fff;
        height: 40px;
        line-height: 40px;
      }
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
          .ltd {
            color: black;
            user-select: none;
            cursor: pointer;
          }
          th {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>