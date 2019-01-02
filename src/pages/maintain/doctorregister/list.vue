<template>
  <div class="doctorregister">
    <div class="container">
      <!-- 头部信息 -->
      <header>
        <Button @click="branch">批量导入</Button>
        <div class="search">
          <Input v-model.trim="Name" placeholder="医生姓名/联系方式/医院名称" style="width: 260px" @on-keyup='nameChange'/>
        </div>
      </header>
      <!-- 列表 -->
      <div class="list">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>编号</th>
            <th>医生姓名</th>
            <th>性别</th>
            <th>城市</th>
            <th>医院名称</th>
            <th>就诊科室</th>
            <th>职称</th>
            <th>医生手机号</th>
            <th>医生简介</th>
            <th>擅长</th>
            <th>注册时间</th>
            <th>数据来源</th>
          </tr>
          <tr v-for="item,index in list">
            <th>{{ addZero(index) }}</th>
            <th>{{ item.doctorName }}</th>
            <th>{{ item.gender == '0'? '女' :'男' }}</th>
            <th>{{ item.city }}</th>
            <th>{{ item.hospitalName }}</th>
            <th>{{ item.deptType }}</th>
            <th>{{ item.title }}</th>
            <th>{{ item.phone }}</th>

            <!-- <th style = 'max-width:200px;'>{{ item.personalIntroduction }}</th>
            <th style = 'max-width:200px;'>{{ item.doctorGood }}</th>-->
            <th class="one">{{ item.personalIntroduction }}</th>
            <th class="one">{{ item.doctorGood }}</th>

            <th>{{ item.createTime }}</th>
            <th>{{ item.ibatch == '0'? '个人注册' :'批量导入'}}</th>
          </tr>
        </table>
        <div class="notData" v-show="!list.length">暂无更多数据</div>
      </div>
    </div>
    <!--分页器-->
    <div class="paging">
      <Page :total="doctorregisterSize" @on-change="pageChange"/>
    </div>
  </div>
</template>
<script>
// 医生注册信息
import api from "@/api/commonApi";
import { Page, Upload } from "iview";
export default {
  data() {
    return {
      doctorregisterSize: 10,
      list: [],
      Name: ""
    };
  },
  mounted() {
    this.getDoctorData(1);
  },
  methods: {
    branch() {
      this.$router.push({ 
        name: "doctorregisterbatchone"
      });
    },
    pageChange(index) {
      this.getDoctorData(index);
      if (this.Name) {
         this.getDoctorData(1, this.Name);
      } else {
         this.getDoctorData(index);
      }
    },
    nameChange() {
      // console.log(this.Name);
      this.getDoctorData(1, this.Name);
    },
    getDoctorData(pageNo, val) {
      let params = {
          pageNo,
          pageSize: 10
        }
        
        if (val != '') {
          params.searchKey = val;
        }
      this.$axios
        .post(api.getDoctorInfo, params)
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.doctorregisterSize = ret.count;
            this.list = ret.list;
          }
        });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
  },
  components: {
    Page,
    Upload
  }
};
</script>
<style lang="less" scoped>
.doctorregister {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    header {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      button {
        background: skyblue;
        border: none;
        outline: none;
        color: #fff;
        width: 128px;
        height: 39px;
        border-radius: 2px;
      }
      .search {
        // background-color: rgb(255, 255, 255);
        // width: 276px;
        // height: 32px;
        // border-radius: 16px;
        // border-width: 1px;
        // border-color: rgb(102, 102, 102);
        // border-style: solid;
        // input {
        //   text-align: left;
        //   font-size: 14px;
        //   font-weight: 400;
        //   font-style: normal;
        //   text-decoration: none;
        //   border: none;
        //   outline: none;
        //   font-family: 微软雅黑;
        //   color: rgb(102, 102, 102);
        //   padding-left: 28px;
        //   width: 100%;
        //   line-height: 32px;
        //   background: none;
        // }
      }
    }
    .list {
      width: 100%;
      margin: 10px 0;
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
          th {
            text-align: center;
          }
          th.one {
            max-width: 150px;
            padding: 0 6px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .notData {
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        line-height:40px;
      }
    }
  }
  .paging {
    width: 100%;
    margin: 10px auto;
    text-align: center;
  }
}
</style>