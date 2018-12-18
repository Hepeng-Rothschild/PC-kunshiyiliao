<template>
  <div class="doctorreviewlist">
    <Row>
      <Col :xs="24">
        医生：
        <Input class="w-input" v-model="doctorName" placeholder="请输入医生名称"/>&nbsp;&nbsp;&nbsp;&nbsp;
        科室：
        <Input class="w-input" v-model="dept" placeholder="请输入科室关键字"/>&nbsp;&nbsp;&nbsp;&nbsp;
        职称：
        <Input class="w-input" v-model="title" placeholder="请输入职称关键字"/>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" @click="loadPage(1)">
          <Icon type="ios-search" size="14"/>查询
        </Button>
      </Col>
    </Row>
    <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
    <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
  </div>
</template>
<script>
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  data() {
    return {
      doctorName: "",
      dept: "",
      title: "",
      columns: [
        { title: "序号", key: "iNum", align: "center" },
        { title: "医生姓名", key: "doctorName", align: "center" },
        { title: "科室", key: "deptType", align: "center" },
        { title: "职称", key: "title", align: "center" },
        { title: "联系电话", key: "phone", align: "center" },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            let id = params.row.doctorId;
            return h(
              "a",
              {
                attrs: {
                  href: "javascript:void(0);"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: "/index/operation/doctormanage/edit",
                      query: { id,pageNo:this.pageNo }
                    });
                  }
                }
              },
              "管理服务"
            );
          }
        }
      ],
      doctorList: [],
      count: 0,
      pageSize: 10,
      pageNo: 1
    };
  },
  components: {
    Select,
    Option
  },
  mounted() {
    let pageNo = this.$route.query.pageNo
    pageNo = pageNo?pageNo:1;
    //上来就加载第一页数据
    this.loadPage(pageNo);
  },
  methods: {
    //加载列表数据
    loadPage(pageNo) {
      this.pageNo = pageNo;
      var params = {};
      params.deptType = this.dept;
      params.doctorName = this.doctorName;
      params.title = this.title;
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      this.$axios
        .post(api.doctorList, params)
        .then(resp => {
          this.count = resp.data.object.count;
          this.doctorList = resp.data.object.list;
          for(let i=0;i<this.doctorList.length;i++){
            this.doctorList[i].iNum = i+1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.doctorreviewlist {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .w-select {
    width: 100px;
  }
  .w-input {
    width: 200px;
  }
  .m-table {
    margin: 10px 0;
  }
}
</style>