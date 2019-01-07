<template>
  <div class="registeradd">
    <tempHeader/>
    <Row>
      <Col class="padding-t padding-b" :xs="24">
        <b>{{littleTitle}}</b>
      </Col>
    </Row>
    <Row style="line-height:32px;">
      <Col :xs="24" :md="3">{{hospitalName}}</Col>
      <Col :xs="24" :md="3">{{dept}}</Col>
      <Col :xs="24" :md="2">{{doctorName}}</Col>
      <!-- <Col :xs="24" :md="3">
                {{title}}
      </Col>-->
      <Col :xs="24" :md="5">
        <Button type="primary" v-if="addBtnFlag" @click="loadPage(1)">添加专家</Button>
        <span class="expert-msg" :class="{'show-msg': expertMsgStatus}">请添加专家</span>
      </Col>
    </Row>
    <br>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">就诊地址</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input class="w-input" :maxlength="20" v-model="address" placeholder="请输入就诊地址"/>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">门诊类型</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input class="w-input" :maxlength="20" v-model="outpatientType" placeholder="请输入门诊类型"/>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c" :xs="24" :md="3">门诊时间</Col>
      <Col class="padding-l borderLeft" :xs="24" :md="21">
        <Row>
          <Col :xs="2">&nbsp;</Col>
          <Col :xs="2">星期一</Col>
          <Col :xs="2">星期二</Col>
          <Col :xs="2">星期三</Col>
          <Col :xs="2">星期四</Col>
          <Col :xs="2">星期五</Col>
          <Col :xs="2">星期六</Col>
          <Col :xs="2">星期日</Col>
        </Row>
        <Row>
          <Col :xs="2">上午</Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd11"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd21"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd31"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd41"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd51"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd61"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd71"></InputNumber>
          </Col>
        </Row>
        <Row>
          <Col :xs="2">下午</Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd12"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd22"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd32"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd42"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd52"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd62"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber :min="1" v-model="wd72"></InputNumber>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">预约期限</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <InputNumber :min="1" v-model="term"></InputNumber>天
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">医事服务费</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <InputNumber :min="1" v-model="cost"></InputNumber>元
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">患者什么时候、到哪里找您领取挂号</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input
          class="w-input"
          v-model="receive"
          type="textarea"
          :maxlength="20"
          placeholder="请输入挂号领取处"
        />
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">备注</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input class="w-input" v-model="remarks" :maxlength="20" placeholder="请输入备注"/>
      </Col>
    </Row>
    <br>
    <Button type="primary" @click="submit">保存</Button>
    <Button type="primary" @click="reback">返回</Button>
    <Modal v-model="docListModal">
      <p slot="header" style="text-align:center">
        <span>选择专家</span>
      </p>
      <div style="text-align:center">
        <Row class="bordered">
          <Col class="text-align-c" :xs="24">
            <Input
              @on-change="loadPage(1)"
              class="w-input"
              v-model="doctorKey"
              :maxlength="20"
              placeholder="输入医生姓名、医院、科室"
            />
          </Col>
        </Row>
        <Row
          @click.native="chooseDoc(item.hospitalName,item.hospitalId,item.dept,item.deptId,item.doctorName,item.doctorId,item.title)"
          style="cursor:pointer;margin:15px 0;"
          v-for="(item,index) of doctorList"
          :key="index"
        >
          <Col :xs="6">{{item.hospitalName}}</Col>
          <Col :xs="6">{{item.dept}}</Col>
          <Col :xs="6">{{item.doctorName}}</Col>
          <Col :xs="6">{{item.title}}</Col>
        </Row>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import tempHeader from "@/components/tmpHeader";
import { Avatar, Select, Option } from "iview";
export default {
  data() {
    return {
      id: null,
      info: null,
      pageNo: null,
      littleTitle: "编辑",
      addBtnFlag: false,
      doctorName: null,
      doctorId: null,
      hospitalName: null,
      hospitalId: null,
      title: null,
      dept: null,
      deptId: null,
      address: null,
      outpatientType: null,
      wd11: null,
      wd1d: null,
      wd21: null,
      wd21d: null,
      wd31: null,
      wd31d: null,
      wd41: null,
      wd41d: null,
      wd51: null,
      wd51d: null,
      wd61: null,
      wd61d: null,
      wd71: null,
      wd71d: null,
      wd12: null,
      wd12d: null,
      wd22: null,
      wd22d: null,
      wd32: null,
      wd32d: null,
      wd42: null,
      wd42d: null,
      wd52: null,
      wd52d: null,
      wd62: null,
      wd62d: null,
      wd72: null,
      wd72d: null,
      term: null,
      cost: null,
      receive: null,
      remarks: null,
      docListModal: false,
      doctorList: [{ hospitalName: "", dept: "", doctorName: "", title: "" }],
      doctorKey: "",
      pageNo: 0,
      pageSize: 10,
      count: 0,

      expertMsgStatus: false
    };
  },
  watch: {
    doctorId(newId, oldId) {
      if (newId == null || newId == "" || newId == undefined) {
        this.expertMsgStatus = true;
      } else {
        this.expertMsgStatus = false;
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.pageNo = parseInt(this.$route.query.pageNo);
    if (this.id) {
      this.littleTitle = "编辑";
      this.addBtnFlag = false;
    } else {
      this.littleTitle = "添加";
      this.addBtnFlag = true;
      this.expertMsgStatus = true;
    }
    if (this.id) {
      this.$axios
        .post(api.registerDoctorDetail, { registerId: this.id })
        .then(resp => {
          this.info = resp.data.object;
          for (let i = 0; i < this.info.registerTimes.length; i++) {
            let tmpregistertimes = this.info.registerTimes[i];
            this["wd" + tmpregistertimes.week + tmpregistertimes.day] =
              tmpregistertimes.num;
            this["wd" + tmpregistertimes.week + tmpregistertimes.day + "d"] =
              tmpregistertimes.id;
          }
          this.doctorName = this.info.doctorName;
          this.doctorId = this.info.doctorId;
          this.hospitalName = this.info.hospitalName;
          this.hospitalId = this.info.hospitalId;
          this.dept = this.info.dept;
          this.deptId = this.info.deptId;
          this.address = this.info.address;
          this.outpatientType = this.info.outpatientType;
          this.term = this.info.term;
          this.cost = this.info.cost;
          this.receive = this.info.receive;
          this.remarks = this.info.remarks;
        })
        .catch(err => {
          // this.$Message.info("服务器超时，请重新访问");
        });
    }
  },
  components: { Avatar, Select, Option, tempHeader },
  methods: {
    submit(name) {
      let tmpRegistertimes = [];
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 2; j++) {
          let tmpObj = {};
          if (this["wd" + i + j] > 0 || this["wd" + i + j + "d"] != null) {
            tmpObj.id = this["wd" + i + j + "d"];
            tmpObj.num = this["wd" + i + j];
            tmpObj.day = j;
            tmpObj.week = i;
            tmpRegistertimes.push(tmpObj);
          }
        }
      }
      let params = {};
      params.address = this.address;
      params.cost = this.cost;
      params.dept = this.dept;
      params.deptId = this.deptId;
      params.doctorId = this.doctorId;
      params.hospitalId = this.hospitalId;
      params.iclose = this.iclose;
      params.id = this.id;
      params.outpatientType = this.outpatientType;
      params.receive = this.receive;
      params.remarks = this.remarks;
      params.term = this.term;
      params.registerTimes = tmpRegistertimes;
      let url = "";
      if (this.id) {
        url = api.registerDoctorUpdate;
      } else {
        url = api.registerDoctorInsert;
      }
      if (params.doctorId) {
        this.$axios
          .post(url, params)
          .then(resp => {
            if (resp.data.success) {
              this.$Message.info("添加成功");
              this.$router.push({
                path: "/index/operation/register/list",
                query: { pageNo: this.pageNo }
              });
            } else {
              this.$Message.info("添加失败，请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.expertMsgStatus = true;
      }
    },
    reback() {
      this.$router.push({
        path: "/index/operation/register/list",
        query: { pageNo: this.pageNo }
      });
    },
    chooseDoc(
      hospitalName,
      hospitalId,
      dept,
      deptId,
      doctorName,
      doctorId,
      title
    ) {
      this.hospitalName = hospitalName;
      this.hospitalId = hospitalId;
      this.dept = dept;
      this.deptId = deptId;
      this.doctorName = doctorName;
      this.doctorId = doctorId;
      this.title = title;
      this.docListModal = false;
    },
    loadPage(pageNo) {
      this.pageNo = pageNo;
      var params = {};
      params.searchKey = this.doctorKey;
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      this.$axios
        .post(api.registerDoctorList, params)
        .then(resp => {
          if (resp.data.success) {
            this.doctorList = resp.data.object.list;
            this.count = resp.data.object.count;
            this.pageNo = pageNo;
            this.docListModal = true;
          } else {
            this.$Message.info("查询失败，请重试");
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
.registeradd {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .padding-l {
    padding-left: 5px;
  }
  .padding-r {
    padding-right: 5px;
  }
  .padding-t {
    padding-top: 15px;
  }
  .padding-b {
    padding-bottom: 15px;
  }
  .borderRight {
    border-right: 1px solid #e5e5e5;
  }
  .borderLeft {
    border-left: 1px solid #e5e5e5;
  }
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .borderTop {
    border-top: 1px solid #e5e5e5;
  }
  .w-select {
    width: 100px;
  }
  .w-input {
    width: 200px;
  }
  .req-icon {
    font-size: 18px;
    color: red;
    display: inline-block;
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 18px;
    vertical-align: middle;
  }
  .text-align-c {
    text-align: center;
    line-height: 32px;
  }
  .bordered {
    border: 1px solid #e5e5e5;
  }
  b {
    font-weight: bold;
  }
  .expert-msg {
    color: #f00;
    display: none;
  }
  .show-msg {
    display: inline-block;
  }
}
</style>