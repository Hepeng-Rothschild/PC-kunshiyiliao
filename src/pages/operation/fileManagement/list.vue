<template>
  <div class="fileManagement">
    <!-- 头部搜索 -->
    <header>
      <span>机构名称</span>
      <Input v-model.trim="params.mechanism" placeholder="请输入机构名称" style="width: 200px"/>
      <span>患者姓名</span>
      <Input v-model.trim="params.userName" placeholder="请输入患者姓名" style="width: 200px"/>
      <span>身份证号</span>
      <Input v-model.trim="params.uId" placeholder="请输入患者身份证号码" style="width: 200px"/>
      <Button type="primary" icon="ios-search">查询</Button>
    </header>
    <!-- 列表 -->
    <div class="table">
      <Table size="small" :columns="columns1" :data="data1"></Table>
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
        mechanism: "",
        userName: "",
        uId: ""
      },
      pageNo: 1,
      pageSize: 10,
      count: 10,
      columns1: [
        { title: "编号", key: "iNum", align: "center" },
        { title: "患者姓名", key: "iName", align: "center" },
        { title: "性别", key: "iSex", align: "center" },
        { title: "身份证号", key: "iId", align: "center" },
        { title: "电话", key: "iphone", align: "center" },
        { title: "签约医生", key: "iDoctor", align: "center" },
        { title: "签约日期", key: "iDate", align: "center" },
        { title: "签约机构", key: "iMenagement", align: "center" },
      ],
      data1: [
        {
          iName: "John Brown",
          iNum: 18,
          iMenagement: "New York No. 1 Lake Park",
          iDate: "2016-10-03",
          iOperate: "编辑",
          id: 1
        }
      ]
    };
  },
  mounted () {

  },
  methods: {
    loadPage(index) {
      console.log(index);
    },
    loadingData (pageNo,pageSize,val) {
        let params = {
            pageNo,
            pageSize
        }
        if(val !='') {
            params.val = val;
        }
    //    this.$axios.post(url,params).then(res => {
    //     if (res.data.code) {
    //       let ret = res.data
    //       console.log(ret)
    //     }
    //   }).catch(err => {
    //     this.$Message.info("请求失败,请稍候重试");
    //   })
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
