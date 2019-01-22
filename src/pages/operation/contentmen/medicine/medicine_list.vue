<template>
  <div class="i_keshi">
    <tmpHeader/>
    <!--搜索-->
    <div class="i-keshi_main">
      <div class="ibanner_header">
        <div class="box">
          <div class="header_input">
            <span></span>
              <Input v-model.trim="val" placeholder="一级科室/二级科室" style="width: 200px" clearable/>
          </div>
          <button @click="change" class="btn">查询</button>
        </div>

        <button @click="navto" class="btn1">添加科室</button>
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
          <tr v-for="item,index in tableList" v-show="tableList.length">
            <td>{{ addZero(index) }}</td>
            <td>{{ item.parentDept }}</td>
            <td>{{ item.childDept }}</td>
            <td>{{ item.deptNickname}}</td>
            <td>{{ item.registeredReservation == '1'? '是':"否" }}</td>
            <td>{{ item.specialDept == '1'? '是':"否" }}</td>
            <td class="ltd">
              <span @click="edit(item)" style="cursor:pointer;">编辑</span>
              <span>删除</span>
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
import { Page } from "iview";
export default {
  components: {
    tmpHeader,
    Page
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
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = pageNo;
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
      this.$router.push({
        name: "medicineAdd",
        params:{
          pageNo:this.pageNo
        }
      });
    },
    edit(item) {
      let id = item.id;
      this.$router.push({
        name: "medicineEdit",
        params: {
          id,
          pageNo:this.pageNo
        }
      });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    getMedicineData(pageNo, val) {
      let params = {
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.searchKey = val;
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
      align-items:center;
      .box {
        display: flex;
        flex-direction: row;
        // .header_input {
        //   width: 200px;
        //   border-radius: 15px;
        //   border: 1px solid black;
        //   height: 30px;
        //   display: flex;
        //   flex-direction: row;
        //   align-items: center;
        //   justify-content: space-between;
        //   span {
        //     display: inline-block;
        //     width: 20px;
        //     margin-left: 5px;
        //     height: 20px;
        //     background: url("../../../../assets/images/search.png") no-repeat;
        //     background-size: 100% 100%;
        //   }
        //   input {
        //     display: block;
        //     width: calc(100% - 20px);
        //     border: none;
        //     outline: none;
        //     background: none;
        //     text-indent: 5px;
        //   }
        // }
        .btn {
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: none;
          outline: none;
          background: #2d8cf0;
          color: #fff;
          border-radius: 4px;
          margin-left: 10px;
        }
      }
      .btn1 {
        padding: 6px 8px;
        background: #2d8cf0;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 4px;
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
        background:#fff;
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
          background: #9dcae4;
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