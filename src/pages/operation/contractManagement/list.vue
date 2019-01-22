<template>
  <div class="fileManagement">
    <header>
      <span>机构名称：</span>
      <Input v-model.trim="params.hospitalName" placeholder="请输入机构名称" style="width: 200px" clearable />
      <span>患者姓名：</span>
      <Input v-model.trim="params.memberName" placeholder="请输入患者姓名" style="width: 200px" clearable />
      <span>身份证号：</span>
      <Input v-model.trim="params.fdsOrderId" placeholder="请输入患者身份证号码" style="width: 200px" clearable />
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
import api from "@/api/commonApi";
export default {
  data() {
    return {
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
        { title: "签约日期", key: "contractStartTime", align: "center" },
        { title: "签约机构", key: "hospitalName", align: "center" }
      ],
      data1: []
    };
  },
  mounted() {
    this.loadingData(this.pageNo, this.pageSize, 1);
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
          1,
          this.params.hospitalName,
          this.params.memberName,
          this.params.fdsOrderId
        );
      } else {
        this.loadingData(this.pageNo, this.pageSize, 1);
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
            item.iNum = index + 1;
            if (item.gender == 1) {
              item.gender = "男";
            } else {
              item.gender = "女";
            }
          });
          console.log(ret.list)
          this.data1 = ret.list;
        } else {
          this.$Message.info("没有访问权限");
        }
      });
    },

    search() {
      this.loadingData(
        this.pageNo,
        this.pageSize,
        1,
        this.params.hospitalName,
        this.params.memberName,
        this.params.fdsOrderId
      );
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
