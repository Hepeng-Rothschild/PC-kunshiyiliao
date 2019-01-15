<template>
  <div class="remoteClinic">
    <tempHeader/>
    <!-- 头部选择框 -->
    <header>
      <!-- 省份 -->
      <Select class="w-select" v-model="city">
        <Option value="0">全国</Option>
        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
      </Select>
      <!-- 医院名称 -->
      <!-- <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
        <Option v-for="item in searchTypeList" :value="item.id" :key="item.id">{{item.name}}</Option>
      </Select>-->
      <!-- 检索的医院名称 -->
      <Input class="w-input" v-model="searchKey" :placeholder="'请输入职称/医院名称/医生名称'"/>
      <!-- 职称 -->
      <!-- <Select class="w-select" v-model="dictType" placeholder="职称级别">
        <Option
          v-for="item in titleList"
          :value="item.dictType"
          :key="item.dictType"
        >{{item.dictName}}</Option>
      </Select>-->
      <!-- 查询 -->
      <Button type="primary" class="primary" @click="search">
        <Icon type="ios-search" size="14"/>查询
      </Button>
      <!-- 添加接诊医生排班 -->
      <Button type="primary" class="primary" @click="add">添加接诊医生排班</Button>
    </header>
    <!-- 主体列表 -->
    <div class="main">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>序号</td>
          <td>专家姓名</td>
          <td>医院科室</td>
          <td>远程门诊时间</td>
          <td>预约期限</td>
          <td>启用标示</td>
          <td>操作</td>
        </tr>
        <tr v-for="item,index in list" v-show="list.length">
          <td>{{ addZero(index) }}</td>
          <td>{{ item.doctorName }}</td>
          <td>{{ item.deptName }}</td>
          <td @click="showModel(item)" style="cursor:pointer;">
            <p
              v-show="item.intervalTimeAmStart && item.intervalTimeAmEnd"
            >上午:{{ item.intervalTimeAmStart + '-' +item.intervalTimeAmEnd }}</p>
            <p
              v-show="item.intervalTimePmStart && item.intervalTimeAmEnd"
            >下午:{{ item.intervalTimePmStart + '-' +item.intervalTimeAmEnd }}</p>
          </td>
          <td>{{ item.cycleDay }}</td>
          <td v-show="item.iremote==1">启用</td>
          <td style="color:red;" v-show="item.iremote==0">停用</td>
          <td style="cursor:pointer;" @click="edit(item)">编辑</td>
        </tr>
      </table>
      <div class="nodata" v-show="!list.length">暂无更多数据</div>
    </div>
    <Modal v-model="modal1" title="远程门诊时间" footer-hide>
      <p style="text-align:center;" v-show="currentData.oneAm && currentData.onePm">
        周一：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.oneAm || "无"}}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.onePm || "无"}}</span>
      </p>
      <p style="text-align:center;" v-show="currentData.twoAm && currentData.twoPm">
        周二：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.twoAm || "无"}}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.twoPm || "无"}}</span>
      </p>
      <p style="text-align:center;" v-show="currentData.threeAm && currentData.threePm">
        周三：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.threeAm || "无"}}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.threePm || "无"}}</span>
      </p>
      <p style="text-align:center;" v-show="currentData.fourAm && currentData.fourPm">
        周四：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.fourAm || "无"}}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.fourPm || "无" }}</span>
      </p>
      <p style="text-align:center;" v-show="currentData.fiveAm && currentData.fivePm">
        周五：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.fiveAm || "无"}}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.fivePm || "无" }}</span>
      </p>
      <p style="text-align:center;" v-show="currentData.sixAm && currentData.sixPm">
        周六：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.sixAm || "无" }}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.sixPm || "无"}}</span>
      </p>
      <p style="text-align:center;" v-show="currentData.sevenAm && currentData.sevenPm">
        周日：
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >上午{{ currentData.sevenAm || "无" }}</span>
        <span
          style="margin:0 20px;display:inline-block;min-width:100px;"
        >下午{{ currentData.sevenPm || "无" }}</span>
      </p>
    </Modal>
    <div class="total">
      <Page :total="remoteClinicLength" :current="pageNo" @on-change="change"/>
    </div>
  </div>
</template>
<script>
import tempHeader from "@/components/tmpHeader";
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tempHeader,
    Select,
    Option
  },
  data() {
    return {
      remoteClinicLength: 10,
      pageNo: 1,
      searchTypeList: [
        { id: 1, name: "医院名称" },
        { id: 2, name: "医生姓名" }
      ],
      searchType: 1,
      keyPlaceHolder: "医院名称",
      cityList: [],
      city: "0",
      searchKey: "",
      dictType: "",
      titleList: "",
      modal1: false,
      modelList: [],
      currentData: [],
      list: []
    };
  },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/remoteclinic/list",
                title: "远程门诊"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
  mounted() {
    this.getInfoData();
    this.getDoctorList(1);
  },
  methods: {
    // 显示model
    showModel(item) {
      let params = {};
      params.oneAm = item.oneAm;
      params.onePm = item.onePm;

      params.twoAm = item.twoAm;
      params.twoPm = item.twoPm;

      params.threeAm = item.threeAm;
      params.threePm = item.threePm;

      params.fourAm = item.fourAm;
      params.fourPm = item.fourPm;

      params.fiveAm = item.fiveAm;
      params.fivePm = item.fivePm;

      params.sixAm = item.sixAm;
      params.sixPm = item.sixPm;

      params.sevenAm = item.sevenAm;
      params.sevenPm = item.sevenPm;

      this.currentData = params;
      let flag = false;
      for (let i in params) {
        if (params[i]) {
          flag = true;
        }
      }
      this.modal1 = flag;
      if (!flag) {
        this.$Message.info("远程门诊时间为空");
      }
    },
    // 页码改变
    change(index) {
      this.pageNo = index;
      if (this.searchKey != "") {
        this.getDoctorList(1, this.city, this.searchKey);
      } else {
        this.getDoctorList(index);
      }
    },
    changeSearchType(val) {
      if (val == 1) {
        this.keyPlaceHolder = "医院名称";
      } else {
        this.keyPlaceHolder = "医生名称";
      }
    },
    // 新增
    add() {
      this.$router.push({
        name: "DoctorRemoteclinicAdd"
      });
    },
    // 页面加载时获取省级,职称列表
    getInfoData() {
      //获取省级列表
      this.$axios
        .post(api.getProvince)
        .then(resp => {
          this.cityList = resp.data.object;
        })
        .catch(err => {
          console.log(err);
        });
      //获取职称列表
      // this.$axios
      //   .post(api.getTitle)
      //   .then(resp => {
      //     this.titleList = resp.data.object;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },
    // 修改
    edit(item) {
      this.$router.push({
        name: "DoctorRemoteclinicEdit",
        params: {
          id: item.id
        }
      });
    },
    search() {
      let params = {
        city: this.city,
        // 医院/医生名称
        searchKey: this.searchKey
      };
      this.getDoctorList(1, this.city, this.searchKey);
    },
    getDoctorList(pageNo, provinceId, searchKey) {
      let params = {
        pageNo,
        pageSize: 10
      };
      if (provinceId != "") {
        params.provinceId = provinceId;
      }
      if (searchKey != "") {
        params.searchKey = searchKey;
      }
      this.$axios.post(api.doctorRomteclinicList, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.remoteClinicLength = ret.count;
          this.list = ret.list;
          console.log(res);
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
  }
};
</script>
<style lang="less" scoped>
.remoteClinic {
  width: 98%;
  padding: 10px;
  margin-left: 1%;
  margin: 0 auto;
  background: #fff;
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    .w-select {
      width: 100px;
      margin: 0 10px;
    }
    .w-input {
      width: 300px;
    }
    .primary {
      margin: 0 10px;
    }
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
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
        td {
          padding: 10px 0;
          text-align: center;
        }
        td.none {
          display: none;
        }
      }
    }
    .nodata {
      width: calc(100% - 1px);
      line-height: 50px;
      background: #fff;
      border: 1px solid #ddd;
      border-top: none;
      text-align: center;
    }
  }
}
</style>
