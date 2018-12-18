<template>
  <div class="doctorreviewlist">
    <Row>
      <Col :xs="24">
        <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人"/>
        <Button type="primary" @click="loadPage(1)">
          <Icon type="ios-search" size="14"/>查询
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Select class="w-select" v-model="status">
          <Option value="9">全部</Option>
          <Option v-for="(item,index) in statusList" :value="index" :key="index">{{item}}</Option>
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>日期:</span>
        <DatePicker type="date" v-model="startDate" placeholder="开始日期" style="width: 200px"></DatePicker>
        <span>至</span>
        <DatePicker type="date" v-model="endDate" placeholder="结束日期" style="width: 200px"></DatePicker>
      </Col>
    </Row>
    <br>
    <Row>
      <Col :xs="24">
        <span>医院</span>
        <Select class="w-select" v-model="hospitalName">
          <Option value="9">全部</Option>
          <Option v-for="(item,index) in hospitalList" :value="index" :key="index">{{item}}</Option>
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>履约率</span>
        <Input class="w-num-input" @on-focus="blurInput" v-model="coolRate"/>
        <span>爽约率</span>
        <Input class="w-num-input" @on-focus="blurInput" v-model="performanceRate"/>
      </Col>
    </Row>
    <Table class="m-table" stripe :columns="columns" :data="orderList"></Table>
    <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
  </div>
</template>
<script>
import { Select, Option, DatePicker } from "iview";
import api from "@/api/commonApi";
export default {
  data() {
    return {
      coolRate:"49%", //爽约率
      performanceRate:"53%", //履约率
      searchKey: "",
      status:"9",
      startDate:"",
      endDate:"",
      statusList: ["爽约","履约","取消","退号"],
      hospitalList:[],
      hospitalName:"",
      columns:[
        {title:"编号",key:"iNum",align:"center"},
        {title:"订单号",key:"orderNumber",align:"center"},
        {title:"医院",key:"hospitalName",align:"center"},
        {title:"科室",key:"dept",align:"center"},
        {title:"医生",key:"doctorName",align:"center"},
        {title:"就诊人",key:"person",align:"center"},
        {title:"预约电话",key:"phone",align:"center"},
        {title:"挂号费",key:"fee",align:"center"},
        {title:"订单时间",key:"startDate",align:"center"},
        {title:"预约时间",key:"reservationDate",align:"center"},
        {title:"状态",key:"status",align:"center",render:(h,params)=>{
          let id=params.row.id
          return h("span",{
              domProps:{
                innerHTML:"履约"
              }
            })
        }}
      ],
      orderList:[
        {iNum:1,avatar:require("@/assets/images/header/code_box.png"),operat:""}
      ],
      count:0,
      pageSize:10,
      pageNo:1
    };
  },
  components: {
    Select,
    Option,
    DatePicker
  },
  mounted() {
    //上来就加载第一页数据
    this.loadPage(1)
  },
  methods:{
    //加载列表数据
    loadPage(pageNo){
      this.pageNo = pageNo;
      var params = {};
      params.status = this.status==9?"":this.status;
      params.startDate = this.startDate;
      params.endDate = this.endDate;
      params.searchKey = this.searchKey;
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      this.$axios
      .post(api.getReviewDoctorList,params)
      .then(resp => {
        this.count = resp.data.object.count;
        this.orderList = resp.data.object.list;
        for(let i=0;i<this.orderList.length;i++){
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    blurInput(e){
      e.target.blur();
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
    width: 220px;
  }
  .w-num-input {
    width: 100px;
  }
  .m-table{
    margin:10px 0;
  }
}
</style>