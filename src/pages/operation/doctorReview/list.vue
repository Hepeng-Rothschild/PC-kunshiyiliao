<template>
  <div class="doctorreviewlist">
    <Row>
      <Col :xs="24">
        <Select class="w-select" v-model="city">
          <Option value="0">全国</Option>
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
          <Option v-for="item in searchTypeList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Input class="w-input" v-model="searchKey" :placeholder="'请输入'+keyPlaceHolder"/>
        <Select class="w-select" v-model="dictType" placeholder="职称级别">
          <Option v-for="item in titleList" :value="item.dictType" :key="item.dictType">{{item.dictName}}</Option>
        </Select>
        <Select class="w-select" v-model="authStatus">
          <Option value="0">全部认证</Option>
          <Option v-for="(item,index) in statusList" :value="index" :key="index">{{item}}</Option>
        </Select>
        <Button type="primary" @click="loadPage(1)">
          <Icon type="ios-search" size="14"/>查询
        </Button>
      </Col>
    </Row>
    <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
    <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    <Modal title="提示：" @on-ok="ok" @on-cancel="cancel" v-model="modalConfirm" class-name="vertical-center-modal">
      <p>{{confirmInfo}}</p>
    </Modal>
  </div>
</template>
<script>
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  data() {
    return {
      cityList: [],
      city: "0",
      searchTypeList: [
        { id: 1, name: "医院名称" },
        { id: 2, name: "医生姓名" }
      ],
      searchType: 1,
      searchKey: "",
      keyPlaceHolder: "医院名称",
      titleList: "",
      dictType: "",
      statusList: ["未认证", "审核中", "审核通过", "审核未通过"],
      openList: ["未开通","未开通","已开通","未开通"],
      authStatus: "0",
      columns:[
        {title:"序号",key:"iNum",align:"center",width:"60px"},
        {title:"头像",key:"avatar",align:"center",width:"80px",
          render:(h,params)=>{
            let avatar = params.row.avatar;
            let defaultSrc = require("@/assets/images/heicon.jpg");
            return h("img",
            {
              attrs:{
                src: avatar || defaultSrc,
                style:'width:100%;height:100%;border-radius:50%;',
              }
            })
          }
        },
        {title:"姓名",key:"name",align:"center",width:"80px"},
        {title:"职称",key:"title",align:"center",width:"90px"},
        {title:"科室",key:"deptType",align:"center",width:"90px"},
        {title:"所在医院",key:"hospitalName",align:"center",width:"220px"},
        {title:"认证状态",key:"authStatus",align:"center",width:"90px"},
        {title:"图文问诊",key:"imginquiry",align:"center",width:"90px"},
        {title:"电话问诊",key:"phoneinquiry",align:"center",width:"90px"},
        {title:"视频问诊",key:"videoinquiry",align:"center",width:"90px"},
        {title:"家庭医生",key:"homedoctor",align:"center",width:"90px"},
        {title:"操作",key:"operate",align:"center",width:"130px",render:(h,params)=>{
          let id=params.row.id
          var btnTxt = "查看";
          if(params.row.authStatus == '审核中'){
            btnTxt = "审核";
          }
          return [
            h("a",{
              attrs:{
                href:"javascript:void(0);"
              },
              on:{
                click:()=>{
                  this.$router.push({path:"/index/operation/doctorReview/review",query:{id,pageNo:this.pageNo}})
                }
              }
            },btnTxt),
            " | ",
            h("a",{
              attrs:{
                href:"javascript:void(0);"
              },
              on:{
                click:()=>{
                  this.$router.push({path:"/index/operation/doctorReview/edit",query:{id,pageNo:this.pageNo}})
                }
              }
            },"编辑"),
            " | ",
            h("a",{
              on:{
                click:()=>{
                  this.delDoctor(params.index,params.row.id,params.row.name);
                }
              }
            },"删除")
          ]
        }}
      ],
      doctorList:[],
      count:0,
      pageSize:10,
      pageNo:1,
      modalConfirm:false,
      confirmInfo:'',
      delIndex:null,
      delId:null
    };
  },
  components: {
    Select,
    Option,
  },
  mounted() {
    let pageNo = this.$route.query.pageNo
    pageNo = pageNo?pageNo:1;
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
    this.$axios
      .post(api.getTitle)
      .then(resp => {
        this.titleList = resp.data.object;
      })
      .catch(err => {
        console.log(err);
      });
    //上来就加载第一页数据
    this.loadPage(pageNo)
  },
  methods:{
    changeSearchType(val){
      if(val == 1){
        this.keyPlaceHolder = "医院名称";
      }else{
        this.keyPlaceHolder = "医生名称";
      }
    },
    //加载列表数据
    loadPage(pageNo){
      this.pageNo = pageNo;
      var params = {};
      params.province = parseInt(this.city==0?null:this.city);
      params.title = this.dictType;
      params.authStatus = this.authStatus==0?"":this.authStatus;
      if(this.searchType == 1){
          params.hospitalName = this.searchKey;
          params.name = "";
      }else{
          params.name = this.searchKey;
          params.hospitalName = "";
      }
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      this.$axios
      .post(api.getReviewDoctorList,params)
      .then(resp => {
        this.count = resp.data.object.count;
        this.doctorList = resp.data.object.list;
        for(let i=0;i<this.doctorList.length;i++){
          let item = this.doctorList[i];
          this.doctorList[i].iNum = i+1;
          this.tryCatch(item.docIcon) && (this.doctorList[i].avatar = this.fileBaseUrl+this.tryCatch(item.docIcon).fileName);
          this.doctorList[i].imginquiry = this.openList[this.doctorList[i].authStatus];
          this.doctorList[i].phoneinquiry = this.openList[this.doctorList[i].authStatus];
          this.doctorList[i].videoinquiry = this.openList[this.doctorList[i].authStatus];
          this.doctorList[i].homedoctor = this.openList[this.doctorList[i].authStatus];
          this.doctorList[i].authStatus = this.statusList[this.doctorList[i].authStatus];
          this.doctorList[i].operate = this.doctorList[i].id;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    delDoctor(index,id,name){
      this.confirmInfo = "是否确认删除“"+name+"”?";
      this.modalConfirm = true;
      this.delIndex = index;
      this.delId = id;
    },
    ok(){
      let params = {};
      params.id = this.delId;
      this.$axios.post(api.delReviewDoctor,params)
      .then(resp=>{
        if(resp.data.success){
          this.doctorList.splice(this.delIndex,1);
          this.modalConfirm = false;
          this.confirmInfo = '';
          this.delIndex = null;
          this.delId = null;
          this.$Message.info("删除成功");
        }else{
          this.$Message.info("删除失败，请重试");
        }
      })
      .catch(err=>{
        // this.$Message.info("服务器超时，请重试");
      })
    },
    cancel(){
      this.modalConfirm = false;
      this.confirmInfo = '';
      this.delIndex = null;
      this.delId = null;
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
  .m-table{
    margin:10px 0;
  }
}
</style>