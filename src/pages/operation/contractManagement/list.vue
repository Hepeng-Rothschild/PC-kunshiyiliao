<template>
  <div class="fileManagement">
    <header>
      <span>签约状态：</span>
      <Select class="w-select" clearable v-model="authStatus" style='width:120px;'>
        <Option value="null" key="null">全部</Option>
        <Option v-for="(item,index) in statusList" :value="index" :key="index">{{item}}</Option>
      </Select>
      <span>机构名称：</span>
      <Input
        v-model.trim="params.hospitalName"
        placeholder="请输入机构名称检索"
        style="width: 200px"
        clearable
      />
      <span>患者姓名：</span>
      <Input v-model.trim="params.memberName" placeholder="请输入患者姓名检索" style="width: 200px" clearable/>
      <span>身份证号：</span>
      <Input
        v-model.trim="params.fdsOrderId"
        placeholder="请输入患者身份证号码检索"
        style="width: 200px"
        clearable
      />
      <Button type="primary" icon="ios-search" @click="search">查询</Button>
    </header>
    <div class="table">
      <Table size="small" :columns="columns1" :data="data1" stripe></Table>
      <Page
        :total="count"
        :current="pageNo"
        :page-size="pageSize"
        @on-change="loadPage"
        class="pages"
      />
    </div>
  </div>
</template>
<script>
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    Select,
    Option
  },
  data() {
    return {
      statusList: ["审核中", "签约成功", "签约拒绝", "解约","系统自动拒绝"],
      authStatus: 1,
      params: {
        // 医院名
        hospitalName: null,
        // 患者
        memberName: null,
        // 身份证
        fdsOrderId: null
      },
      pageNo: 1,
      pageSize: 10,
      count: 10,
      columns1: [
        { title: "编号", key: "iNum", align: "center" },
        { title: "患者姓名", key: "memberName", align: "center" },
        { title: "性别", key: "gender", align: "center" },
        { title: "身份证号", key: "idcard", align: "center" },
        { title: "电话", key: "telephone", align: "center" },
        { title: "签约医生", key: "doctorName", align: "center" },
        { title: "签约状态", key: "status", align: "center" },
        { title: "签约日期", key: "contractStartTime", align: "center" },
        { title: "签约机构", key: "hospitalName", align: "center" }
      ],
      data1: []
    };
  },
  mounted() {
    this.loadingData(this.pageNo, this.pageSize,1);
    let breadList = [
      { path: "/index", title: "首页" },
      { path: "/index/operation/doctorManagement/index", title: "医生端运营" },
      {
        path: "/index/operation/contractManagement/list",
        title: "家医签约管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  methods: {
    loadPage(index) {
      this.pageNo = index;
      if (
        this.params.hospitalName ||
        this.params.memberName ||
        this.params.fdsOrderId
      ) {
        this.loadingData(
          this.pageNo,
          this.pageSize,
          this.authStatus,
          this.params.hospitalName,
          this.params.memberName,
          this.params.fdsOrderId
        );
      } else {
        this.loadingData(this.pageNo, this.pageSize, this.authStatus);
      }
    },
    loadingData(
      pageNo,
      pageSize,
      status,
      hospitalName,
      memberName,
      fdsOrderId
    ) {
      let params = {
        pageNo,
        pageSize,
        ieffective: status
      };
      // 医院名
      params.hospitalName = hospitalName;
      // 患者
      params.memberName = memberName;
      // 医院名
      params.idcard = fdsOrderId;

      this.$axios.post(api.contractManagementList, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.count = ret.count;
          ret.list.forEach((item, index) => {
            item.iNum = this.addZeros(index);
            if (item.gender == 1) {
              item.gender = "男";
            } else {
              item.gender = "女";
            }
            item.status = this.statusList[item.ieffective]
          });
          this.data1 = ret.list;
        } else {
          this.$Message.info("没有访问权限");
        }
      });
    },

    search() {
      this.loadingData(
        1,
        this.pageSize,
        this.authStatus,
        this.params.hospitalName,
        this.params.memberName,
        this.params.fdsOrderId
      );
      // this.loadPage(1);
    }
  }
};
</script>
<style lang="less" scoped>
.fileManagement {
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
    justify-content: space-around;
    margin-bottom: 20px;
  }
  .pages {
    margin-top: 20px;
  }
}
</style>
