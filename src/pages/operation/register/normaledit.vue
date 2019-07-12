<template>
  <div class="registeradd">
    <Row>
      <Col class="padding-t padding-b" :xs="24">
        <b>{{littleTitle}}</b>
      </Col>
    </Row>
    <Row style="line-height:32px;">
      <Col :xs="24" :md="3" v-if='status == 1'>{{hospitalName}}</Col>
      <Col :xs="24" :md="3" v-if='status == 1'>{{dept}}</Col>
      <Col :xs="24" :md="2" v-if='status == 1'>{{doctorName}}</Col>

      <Col :xs="24" :md="3" v-if='status == 2'>{{hospitalName}}</Col>
      <Col :xs="24" :md="3" v-if='status == 2'>{{dept}}</Col>

      <Col :xs="24" :md="5">
        <Button type="primary" v-if="addBtnFlag && status == 1" @click="loadPage(1)" >添加专家</Button>
        <!-- <span class="expert-msg" :class="{'show-msg': expertMsgStatus}">请添加专家</span> -->
        <Button type="primary" v-if="addBtnFlag && status == 2" @click='loadDeptPage(1)'>添加科室</Button>
      </Col>
    </Row>
    <br />
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">就诊地址</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input
          class="w-input"
          @on-change="checkInput"
          :maxlength="60"
          v-model="address"
          placeholder="请输入就诊地址"
        />
        <span class="rdColor" v-if="addressFlag">就诊地址不能为空</span>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">门诊类型</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Select class="w-select" v-model="outpatientType">
          <Option
            v-for="(item,index) of typeList"
            :key="item.id"
            :value="item.name"
            style="text-align:center;"
          >{{item.name}}</Option>
        </Select>
        <Button type="primary" @click="jump">分时段设置</Button>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c" :xs="24" :md="3">门诊时间</Col>
      <Col class="padding-l borderLeft" :xs="24" :md="21">
        <Row>
          <Col :xs="2">&nbsp;</Col>
          <Col :xs="3">&nbsp;</Col>
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
          <Col :xs="3">
            <TimePicker
              :open="false"
              :value="upTime"
              format="HH:mm"
              type="timerange"
              :editable="false"
              :disabled="true"
            >
              <a href="javascript:void(0)">
                <Icon type="ios-clock-outline"></Icon>
                <template>{{ upTime[0] + '-' + upTime[1] }}</template>
              </a>
            </TimePicker>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd11"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd21"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd31"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd41"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd51"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd61"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd71"></InputNumber>
          </Col>
        </Row>
        <Row>
          <Col :xs="2">下午</Col>
          <Col :xs="3">
            <TimePicker
              :open="false"
              :value="dnTime"
              format="HH:mm"
              type="timerange"
              :editable="false"
              :disabled="true"
            >
              <a href="javascript:void(0)">
                <Icon type="ios-clock-outline"></Icon>
                <template>{{ dnTime[0] + '-' + dnTime[1] }}</template>
              </a>
            </TimePicker>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd12"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd22"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd32"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd42"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd52"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd62"></InputNumber>
          </Col>
          <Col :xs="2">
            <InputNumber min="1" max="99" v-model="wd72"></InputNumber>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">预约期限</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <InputNumber min="1" max="99" @on-change="checkInput" v-model="term"></InputNumber>天
        <span :class="{rdColor:termRd}" class="notice">预约期限不能为空且不能小于1天</span>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">医事服务费</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <InputNumber min="0" max="9999" @on-change="checkInput" v-model="cost"></InputNumber>元
        <span :class="{rdColor:costRd}" class="notice">医事服务费不能为空，最小为0元</span>
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">患者什么时候、到哪里找您领取挂号</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input
          class="w-area"
          v-model="receive"
          type="textarea"
          :maxlength="100"
          placeholder="请输入挂号领取处"
        />
      </Col>
    </Row>
    <Row class="bordered">
      <Col class="text-align-c borderRight" :xs="24" :md="3">备注</Col>
      <Col class="padding-l" :xs="24" :md="21">
        <Input class="w-area" v-model="remarks" :maxlength="160" placeholder="请输入备注" />
      </Col>
    </Row>
    <br />
    <Button type="primary" @click="submit" v-if='status == 1'>保存</Button>
    <Button type="primary" @click="deptSubmit" v-if='status == 2'>保存</Button>
    <Button type="primary" @click="reback">返回</Button>
    <!-- 专家列表 -->
    <Modal v-model="docListModal" width="1000" :styles="{top: '20px'}">
      <p slot="header" style="text-align:center">
        <span>选择专家</span>
      </p>
      <div style="text-align:center">
        <Row class="bordered">
          <Col class="text-align-c" :xs="24">
          <fourLevelLinkage
            @changeProvince="changeProvince"
            @changeCity="changeCity"
            @changeArea="changeArea"
            @changeHospital="changeHospital"
            :province="province"
            :city="city"
            :area="area"
            :hospital="hospital"
          ></fourLevelLinkage>
            <Input
              class="w-input"
              v-model="doctorKey"
              :maxlength="20"
              style='width:200px;'
              placeholder="输入医生姓名、医院、科室"
            />
            <Button type='primary' @click='loadPage(1)'>查询</Button>
          </Col>
        </Row>
        <Row style="margin:15px 0;">
          <Col :xs="24">
            <Table stripe :columns="columns" :data="doctorList" style="width:100%;"></Table>
          </Col>
        </Row>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage" />
      </div>
      <div slot="footer"></div>
    </Modal>

    <!-- 科室列表 -->
    <Modal v-model="deptListModal" width="1000" :styles="{top: '20px'}" title='选择科室列表'>
        <div>
            <fourLevelLinkage
                @changeProvince="changeProvince"
                @changeCity="changeCity"
                @changeArea="changeArea"
                @changeHospital="changeHospital"
                :province="province"
                :city="city"
                :area="area"
                :hospital="hospital"
                :isBack="isBack"
            ></fourLevelLinkage>
            <Input
              class="w-input"
              v-model="deptSearchKey"
              :maxlength="20"
              placeholder="输入科室名称"
              style='width:270px;'
            />
            <Button type='primary' @click='loadDeptPage(1)'>查询</Button>
        </div>
        <Table stripe :columns="deptColumns" :data="deptList" style="width:100%;margin:10px 0;"></Table>
        <Page :total="deptPageCount" :current="deptPageNo" :page-size="deptPageSize" @on-change="loadDeptPage" style='text-align:center' />

    </Modal>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import tempHeader from "@/components/tmpHeader";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import { Avatar } from "iview";
export default {
  data() {
    return {
        status: "",
        id: null,
        info: null,
        lPageNo: null,
        searchKey: "",
        deptKey: "",
        dictType: "",

        province: null,
        city: null,
        area: null,
        hospital: null,
        isBack: 2,

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
        typeList: [
            { id: 1, name: "普通门诊" }
            // {id:2,name:"社保门诊"}
        ],
        outpatientType: "普通门诊",
        upTime: ["08:00", "12:00"],
        dnTime: ["13:00", "17:00"],
        wd11: null,
        wd21: null,
        wd31: null,
        wd41: null,
        wd51: null,
        wd61: null,
        wd71: null,

        wd12: null,
        wd22: null,
        wd32: null,
        wd42: null,
        wd52: null,
        wd62: null,
        wd72: null,

        term: 1,
        cost: 0,
        receive: null,
        remarks: null,
        docListModal: false,
        doctorList: [{ hospitalName: "", dept: "", doctorName: "", title: "" }],
        doctorKey: "",
        pageNo: 0,
        pageSize: 10,
        count: 0,

        expertMsgStatus: false,
        icut: 1,
        termRd: false,
        costRd: false,

        addressFlag: false,
        // 医生表头信息
        columns: [
            {
                title: "医院名称",
                key: "hospitalName",
                align: "center"
            },
            {
                title: "科室名称",
                key: "dept",
                align: "center"
            },
            {
                title: "医生名称",
                key: "doctorName",
                align: "center"
            },
            {
                title: "职称",
                key: "title",
                align: "center"
            },
            {
                title: "选择",
                align: "center",
                render: (h, params) => {
                    let item = params.row;
                    return [
                    h(
                        "a",
                        {
                        on: {
                            click: () => {
                            this.chooseDoc(
                                item.hospitalName,
                                item.hospitalId,
                                item.dept,
                                item.deptId,
                                item.doctorName,
                                item.doctorId,
                                item.title
                            );
                            // this.expert(row)
                            }
                        }
                        },
                        "选择"
                    )
                    ];
                }
            }
        ],
        //   科室列表相关
        deptListModal: false,
        deptPageNo: 1,
        deptPageSize: 10,
        deptPageCount: 10,
        deptList: [],
        deptColumns: [
            {
                title: "医院名称",
                key: "hospitalName",
                align: "center"
            },
            {
                title: "科室名称",
                key: "dept",
                align: "center"
            },
            {
                title: "选择",
                align: "center",
                render: (h, params) => {
                    let item = params.row;
                    return [
                    h(
                        "a",
                        {
                        on: {
                            click: () => {
                                // console.log('添加科室');
                                this.chooseDept(item)
                            }
                        }
                        },
                        "选择"
                    )
                    ];
                }
            }
        ],
        deptSearchKey:""
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
    let query = this.$route.query;
    this.id = query.id ? parseInt(query.id) : null;
    this.pageNo = query.pageNo ? parseInt(query.pageNo) : 1;
    this.searchKey = query.searchKey ? query.searchKey : "";
    this.deptKey = query.deptKey ? query.deptKey : "";
    this.dictType = query.dictType ? query.dictType : "";
    this.province = query.province ? parseInt(query.province) : null;
    this.city = query.city ? parseInt(query.city) : null;
    this.area = query.area ? parseInt(query.area) : null;
    this.hospital = query.hospital ? parseInt(query.hospital) : null;
    this.hospitalName = query.hospitalName ? query.hospitalName : null;
    this.hospitalId = query.hospitalId ? parseInt(query.hospitalId) : null;
    this.dept = query.dept ? query.dept : null;
    this.deptId = query.deptId ? query.deptId : null;
    this.doctorName = query.doctorName ? query.doctorName : null;
    this.doctorId = query.doctorId ? parseInt(query.doctorId) : null;
    this.title = query.title ? query.title : null;
    this.address = query.address ? query.address : null;
    this.outpatientType = query.outpatientType ? query.outpatientType : "普通门诊";
    this.cost = query.cost ? parseInt(query.cost) : 0;
    this.term = query.term ? parseInt(query.term) : 1;
    this.receive = query.receive ? query.receive : null;
    this.remarks = query.remarks ? query.remarks : null;
    this.docListModal = false;
    this.status = query.status ? query.status : null;

    if (this.id) {
      this.littleTitle = "编辑";
      this.addBtnFlag = false;
    } else {
      this.littleTitle = "添加";
      this.addBtnFlag = true;
      this.expertMsgStatus = true;
    }
    if (this.id) {
        if(this.status == 1) {
            this.loadingDoctorDefalt(this.id)
        } else if(this.status == 2) {
            this.loadingDeptDefalt(this.id)
        }
       
    }

    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/doctorManagement/index",
        title: "患者端运营"
      },
      {
        path: "/index/operation/register/list",
        title: "预约挂号"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  components: { Avatar, tempHeader, fourLevelLinkage },
  methods: {
    // 省市区三级
    changeProvince(val) {
        this.province = val;
    },
    changeCity(val) {
        this.city = val;
    },
    changeArea(val) {
        this.area = val;
    },
    changeHospital(val) {
        this.hospital = val;
    },
    // 添加,修改医生排班
    submit(name) {
      let flag = true;
      if (this.cost == null) return (this.costRd = true);
      if (this.term == null) return (this.termRd = true);

      let tmpRegistertimes = [];
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 2; j++) {
          let tmpObj = {};
          if (j == 1) {
            tmpObj.timeStart = this.upTime[0];
            tmpObj.timeEnd = this.upTime[1];
          } else if (j == 2) {
            tmpObj.timeStart = this.dnTime[0];
            tmpObj.timeEnd = this.dnTime[1];
          }
          if (this["wd" + i + j] != null && this["wd" + i + j] > 0) {
            tmpObj.num = this["wd" + i + j];
            tmpObj.day = j;
            tmpObj.week = i;
            tmpRegistertimes.push(tmpObj);
          }
        }
      }
      if (!this.address) {
        this.addressFlag = true;
        flag = false;
      }
      if (tmpRegistertimes.length <= 0) {
        flag = false;
        this.$Message.error({
          content: "请至少有一个号源有号再保存，谢谢",
          duration: 5
        });
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
      params.icut = this.icut;
      params.schedulingType = 1
      console.log(params);
      let url = "";
      let msg = "";
      if (this.id) {
        url = api.registerDoctorUpdate;
        msg = "修改";
      } else {
        url = api.registerDoctorInsert;
        msg = "添加";
      }
      console.log('专家排班', params);
      if (params.doctorId) {
        if (flag) {
          this.$axios
            .post(url, params)
            .then(resp => {
              if (resp.data.success) {
                this.$Message.info(msg + "成功");
                //   公用方法
                this.reback();
              } else {
                this.$Message.info(msg + "失败，请重试");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.expertMsgStatus = true;
        this.$Message.error("请选择专家")
      }
    },
    // 添加,修改科室排班
    deptSubmit () {
        let flag = true;
        if (this.cost == null) return (this.costRd = true);
        if (this.term == null) return (this.termRd = true);
        let tmpRegistertimes = [];
        for (let i = 1; i <= 7; i++) {
            for (let j = 1; j <= 2; j++) {
            let tmpObj = {};
            if (j == 1) {
                tmpObj.timeStart = this.upTime[0];
                tmpObj.timeEnd = this.upTime[1];
            } else if (j == 2) {
                tmpObj.timeStart = this.dnTime[0];
                tmpObj.timeEnd = this.dnTime[1];
            }
            if (this["wd" + i + j] != null && this["wd" + i + j] > 0) {
                tmpObj.num = this["wd" + i + j];
                tmpObj.day = j;
                tmpObj.week = i;
                tmpRegistertimes.push(tmpObj);
            }
            }
        }
        if (!this.address) {
            this.addressFlag = true;
            flag = false;
        }
        if (tmpRegistertimes.length <= 0) {
            flag = false;
            this.$Message.error({
            content: "请至少有一个号源有号再保存，谢谢",
            duration: 5
            });
        }
        let url = ''
        let msg = ''
        let params = {}
        params.address = this.address;
        params.cost = this.cost;
        params.dept = this.dept;
        params.deptId = this.deptId;
        params.hospitalId = this.hospitalId;
        params.outpatientType = this.outpatientType;
        params.receive = this.receive;
        params.remarks = this.remarks;
        params.term = this.term;
        params.registerTimes = tmpRegistertimes;
        params.icut = this.icut;
        params.schedulingType = 2
        console.log('科室排班', params);

        if (this.id) {
            url = api.registerDoctorUpdate;
            msg = "修改";
            params.id = this.id;
        } else {
            url = api.registerDoctorInsert;
            msg = "添加";
            
        }
        // return ""
        if(params.deptId) {
            if (flag) {
              this.$axios.post(url, params).then(res => {
                  if(res.data.success) {
                      this.$Message.info(msg + "成功");
                      this.reback();
                  } else {
                      this.$Message.info(msg + "失败，请重试");
                  }
              })
            }
        } else {
            this.$Message.error("请选择科室")
        }
        

    },
    // 加载医生排班详情
    loadingDoctorDefalt(id) {
        let url = api.registerDoctorDetail
        let params = { registerId: this.id, schedulingType: this.status }
        console.log(params);
        this.$axios.post(url, params).then(resp => {
            this.info = resp.data.object;
            for (let i = 0; i < this.info.registerTimes.length; i++) {
                let tmpregistertimes = this.info.registerTimes[i];
                this["wd" + tmpregistertimes.week + tmpregistertimes.day] =
                tmpregistertimes.num;
            }
            console.log(resp);
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
    },
    // 加载科室排班详情
    loadingDeptDefalt(){
        let url = api.registerDoctorDetail
        let params = {
            registerId: this.id,
            schedulingType: this.status,
        }
        console.log(params);
        // return ''
        this.$axios.post(url, params).then(res => {
            if(res.data.success) {
                this.info = res.data.object;
                for (let i = 0; i < this.info.registerTimes.length; i++) {
                    let tmpregistertimes = this.info.registerTimes[i];
                    this["wd" + tmpregistertimes.week + tmpregistertimes.day] =
                    tmpregistertimes.num;
                }
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
                console.log(this.info);
            } else {
                this.$Message.error("加载科室排班详情失败")
            }
        })
    },
    // 公用数据
    checkInput() {
      if (this.term == null) this.termRd = true;
      else this.termRd = false;
      if (this.cost == null) this.costRd = true;
      else this.costRd = false;
      if (!this.address) this.addressFlag = true;
      else this.addressFlag = false;
    },
    // 返回上一页
    reback() {
      let query = this.$route.query
      //   公用方法
      this.functionJS.queryNavgationTo(this, "/index/operation/register/list", {
        pageNo: this.lPageNo,
        province: query.province,
        city: query.city,
        area: query.area,
        hospital: query.hospital,
        isBack: 2,
        searchKey: this.searchKey,
        deptKey: this.deptKey,
        dictType: this.dictType
      });
    },
    // 保留医生信息
    chooseDoc(
      hospitalName,
      hospitalId,
      dept,
      deptId,
      doctorName,
      doctorId,
      title
    ) {
      console.log(this.doctorList);
      this.hospitalName = hospitalName;
      this.hospitalId = hospitalId;
      this.dept = dept;
      this.deptId = deptId;
      this.doctorName = doctorName;
      this.doctorId = doctorId;
      this.title = title;
      this.docListModal = false;
    },
    // 保留科室信息
    chooseDept(row) {
        this.hospitalName = row.hospitalName;
        this.hospitalId = row.hospitalId;
        this.dept = row.dept;
        this.deptId = row.deptId;
        this.deptListModal = false
    },
    // 科室列表分页
    loadDeptPage(pageNo) {
        this.deptPageNo = pageNo
        let url = api.registerselectdept
        let params = {}
        params.searchKey = this.deptSearchKey.trim();
        params.pageNo = pageNo;
        params.pageSize = this.deptPageSize;
        params.provinceCode = this.province ? this.province : null;
        params.cityCode = this.city ? this.city : null;
        params.areaCode = this.area ? this.area : null;
        params.hospitalId = this.hospital ? this.hospital : null;
        console.log('科室列表分页',params);
        this.$axios.post(url, params).then(resp => {
            if (resp.data.success) {
                this.deptList = resp.data.object.list;
                console.log(resp);
                this.deptPageCount = resp.data.object.count;
                this.deptPagepageNo = pageNo;
                this.deptListModal = true;
            } else {
                this.$Message.info("查询失败，请重试");
            }
        }).catch(err => {
            console.log(err);
        })
    },
    // 专家列表分页
    loadPage(pageNo) {
      this.pageNo = pageNo;
      var params = {};
      params.searchKey = this.doctorKey.trim();
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      params.provinceCode = this.province ? this.province : null;
      params.cityCode = this.city ? this.city : null;
      params.areaCode = this.area ? this.area : null;
      params.hospitalId = this.hospital ? this.hospital : null;
      this.$axios
        .post(api.registerDoctorList, params)
        .then(resp => {
          if (resp.data.success) {
            this.doctorList = resp.data.object.list;
            this.count = resp.data.object.count;
            this.pageNo = pageNo;
            this.docListModal = true;
            console.log(this.doctorList);
          } else {
            this.$Message.info("查询失败，请重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到分时段设置
    jump() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/operation/register/segmentationedit",
        {
          id: this.id,
          pageNo: this.lPageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          hospital: this.hospital,
          isBack: 2,
          searchKey: this.searchKey,
          deptKey: this.deptKey,
          dictType: this.dictType,
          hospitalName: this.hospitalName,
          hospitalId: this.hospitalId,
          dept: this.dept,
          deptId: this.deptId,
          doctorName: this.doctorName,
          doctorId: this.doctorId,
          title: this.title,
          address: this.address,
          outpatientType: this.outpatientType,
          cost: this.cost,
          term: this.term,
          receive: this.receive,
          remarks: this.remarks,
          status: this.status,
        }
      );
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
  .w-area {
    width: 80%;
  }
  .notice {
    display: inline-block;
    margin-left: 15px;
    color: #aaa;
  }
  span.rdColor {
    color: #ff0000;
  }
}
</style>