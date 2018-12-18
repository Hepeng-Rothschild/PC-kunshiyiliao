<template>
  <div class="doctorreviewlist">
    <Row>
      <Col :xs="24">
        <Button type="primary" @click="addDoc">添加医生挂号信息</Button>
        <br>
        <Select class="w-select" v-model="city">
          <Option value="0">全国</Option>
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
          <Option v-for="item in searchTypeList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
        <Input class="w-input" v-model="searchKey" :placeholder="'请输入'+keyPlaceHolder"/>
        <Input class="w-input" v-model="deptKey" placeholder="请输入科室关键字"/>
        <Select class="w-select" v-model="dictType" placeholder="职称级别">
          <Option
            v-for="item in titleList"
            :value="item.dictType"
            :key="item.dictType"
          >{{item.dictName}}</Option>
        </Select>
        <Button type="primary" @click="loadPage(1)">
          <Icon type="ios-search" size="14"/>查询
        </Button>
      </Col>
    </Row>
    <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
    <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    <Modal
      title="提示："
      v-model="registertimesFlag"
      class-name="vertical-center-modal"
      footer-hide
    >
    <p v-html="timesHtml" style="text-align:center;"></p>
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
      deptKey: "",
      titleList: "",
      dictType: "",
      weeks: ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      days: ["", "上午", "下午"],
      registertimesFlag:false,
      columns: [
        { title: "序号", key: "iNum", align: "center" },
        { title: "专家姓名", key: "doctorName", align: "center" },
        { title: "医院科室", key: "hospitaldept", align: "center",render:(h,params)=>{
          let item = params.row.hospitaldept;
          return h("span",{
            domProps:{
              innerHTML:item
            }
          })
        }},
        { title: "就诊地址", key: "address", align: "center" },
        {
          title: "预约挂号门诊时间",
          key: "registerTimes",
          align: "center",
          render: (h, params) => {
            let id = params.row.id;
            let tmpTimes = params.row.registerTimes;
            return h("span",{
              domProps:{
                innerHTML:tmpTimes
              },
              style:{cursor:"pointer"},
              on:{
                click:()=>{
                  this.showTimesModal(id);
                }
              }
            })
          }
        },
        { title: "预约期限", key: "term", align: "center" },
        { title: "备注信息", key: "remarks", align: "center" },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            let id = params.row.id;
            return [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/index/operation/register/detail",
                        query: { id,pageNo:this.pageNo }
                      });
                    }
                  }
                },
                "查看"
              ),
              " | ",
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/index/operation/register/edit",
                        query: { id,pageNo:this.pageNo }
                      });
                    }
                  }
                },
                "编辑"
              )
            ];
          }
        }
      ],
      doctorList: [
        {
          iNum: 1,
          avatar: require("@/assets/images/header/code_box.png"),
          operat: ""
        }
      ],
      doctorTimesList:{},
      timesHtml:"",
      count: 0,
      pageSize: 10,
      pageNo: 1,
      modalConfirm: false,
      confirmInfo: "",
      delIndex: null,
      delId: null
    };
  },
  components: {
    Select,
    Option
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
    this.loadPage(pageNo);
  },
  methods: {
    changeSearchType(val){
      if(val == 1){
        this.keyPlaceHolder = "医院名称";
      }else{
        this.keyPlaceHolder = "医生名称";
      }
    },
    //加载列表数据
    loadPage(pageNo) {
      this.pageNo = pageNo;
      var params = {};
      params.province = parseInt(this.city == 0 ? null : this.city);
      params.dept = this.deptKey;
      params.title = this.dictType;
      if (this.searchType == 1) {
        params.hospitalName = this.searchKey;
        params.name = "";
      } else {
        params.name = this.searchKey;
        params.hospitalName = "";
      }
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      this.$axios
        .post(api.registerList, params)
        .then(resp => {
          this.count = resp.data.object.count;
          this.doctorList = resp.data.object.list;
          for (let i = 0; i < this.doctorList.length; i++) {
            let item = this.doctorList[i];
            this.doctorList[i].iNum = i + 1;
            this.doctorList[i].hospitaldept = item.hospitalName+"<br>"+item.dept;
            let tmpTimes = item.registerTimes;
            this.doctorTimesList[item.id] = tmpTimes;
            let tmphtml = ``;
            let max = tmpTimes.length>=2?2:tmpTimes.length;
            for (let j = 0; j < max; j++) {
              tmphtml +=
                this.weeks[tmpTimes[j].week] +"&nbsp;&nbsp;"+
                this.days[tmpTimes[j].day];
              if (j == 0) {
                tmphtml += "<br/>";
              }
            }
            this.doctorList[i].registerTimes = tmphtml
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showTimesModal(id){
      let tmpArr = this.doctorTimesList[id];
      console.log(tmpArr);
      let tmpHtml = ``;
      tmpArr.forEach((element,i) => {
        tmpHtml += `${this.weeks[element.week]}&nbsp;&nbsp;
                ${this.days[element.day]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        if(i % 2 == 1) tmpHtml += `<br>`;
      });
      this.timesHtml = tmpHtml;
      this.registertimesFlag = true;
    },
    addDoc(){
      this.$router.push({path:"/index/operation/register/edit",query:{pageNo:this.pageNo}});
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