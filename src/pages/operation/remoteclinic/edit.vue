<template>
  <div class="edit">
    <!-- <tempHeader/> -->
    <!-- 主体 -->
    <div class="main">
      <!-- 添加接诊医生  -->
      <!-- <Button type="primary" class="primary" @click="modal1=true">
        <Icon type="ios-search" size="14"/>添加接诊医生
      </Button>-->
      <div class="doctor">
        <!-- 医院 -->
        <span>{{ selectExpert.hospitalName }}</span>
        <!-- 科室 -->
        <span>{{ selectExpert.deptName }}</span>
        <!-- 医生姓名 -->
        <span>{{ selectExpert.doctorName }}</span>
      </div>
      <!-- 选择专家 -->
      <!-- <Modal v-model="modal1" title="选择专家">
        <div class="modelExpert">
          <input type="text" placeholder="输入医生姓名、医院、科室">
          <div class="modelExpert_list" @click="expert(item)" v-for="item,index in expertList">
            <span>{{ item.hospital }}</span>
            <span>{{ item.deparment }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.host }}</span>
          </div>
          <div class="total">
            <Page :total="expertSize" :current="expertNo"/>
          </div>
        </div>
      </Modal>-->
      <!-- 远程门诊类型 -->
      <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>远程门诊类型</p>
        </div>
        <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
          <Option v-for="item,index in searchTypeList" :value="index" :key="item.id">{{item.name}}</Option>
        </Select>
      </div>
      <!-- 医事服务费 -->
      <div class="item">
        <div class="item-text">
          <span style="color:red;"></span>
          <p>医事服务费</p>
        </div>
        <p>{{ money }}元</p>
      </div>
      <!-- 远程门诊时长 -->
      <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>远程门诊时长</p>
        </div>
        <Select class="w-select" v-model="time">
          <Option v-for="item in timeList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </div>
      <!--  预约周期 -->
      <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>预约周期</p>
        </div>
        <Select class="w-select" v-model="cycle">
          <Option v-for="item in cycleList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </div>
      <!-- 是否启用 -->
      <!-- <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>是否启用</p>
        </div>
        <iSwitch v-model="switch1"/>
      </div>-->
      <!-- 列表 -->
      <div class="table">
        <p>远程门诊接诊数量</p>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>时间</td>
            <td>预约时间段</td>
            <td>星期一</td>
            <td>星期二</td>
            <td>星期三</td>
            <td>星期四</td>
            <td>星期五</td>
            <td>星期六</td>
            <td>星期天</td>
          </tr>
          <tr>
            <td>上午</td>
            <td>
              <TimePicker
                :value="value2"
                format="HH:mm"
                type="timerange"
                placement="bottom-end"
                placeholder="时间段"
                style="width: 120px"
                @on-change="changeTime"
              ></TimePicker>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.oneAm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.twoAm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.threeAm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.fourAm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.fiveAm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.sixAm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.sevenAm"></InputNumber>
            </td>
          </tr>
          <tr>
            <td>下午</td>
            <td>
              <TimePicker
                :value="value3"
                format="HH:mm"
                type="timerange"
                placement="bottom-end"
                placeholder="时间段"
                style="width: 120px"
                @on-change="changeTime1"
              ></TimePicker>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.onePm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.twoPm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.threePm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.fourPm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.fivePm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.sixPm"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="0" v-model="params.sevenPm"></InputNumber>
            </td>
          </tr>
        </table>
        <p>注：数量不能超过时间段/远程门诊时长数量（如上午8:00至12:00，时长30分钟，最多可设置8次）</p>
        <!-- <div class="nodata">暂无更多数据</div> -->
      </div>
      <!-- 预约备注 -->
      <div class="text">
        <span>预约备注：</span>
        <!-- <textarea cols="30" rows="10" v-model="text_info"></textarea> -->
        <Input v-model.trim="text_info" type="textarea" :rows="4" placeholder="请输入备注"/>
      </div>
      <!-- 保存 -->
      <div class="save">
        <div style="background:#57a3f3;color:#fff;" @click="save">保存</div>
        <div @click="back">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import tempHeader from "@/components/tmpHeader";
import { Select, Option, Switch, TimePicker } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tempHeader,
    Select,
    Option,
    iSwitch: Switch,
    TimePicker
  },
  data() {
    return {
      // 门诊类型
      searchType: -1,
      searchTypeList: [],
      money: 60,
      //   接诊时长
      time: 30,
      timeList: [
        { id: 30, name: "30分钟" },
        { id: 20, name: "20分钟" },
        { id: 15, name: "15分钟" },
        { id: 10, name: "10分钟" }
      ],
      //   预约周期
      cycle: 7,
      cycleList: [
        { id: 1, name: "一天" },
        { id: 2, name: "二天" },
        { id: 3, name: "三天" },
        { id: 4, name: "四天" },
        { id: 5, name: "五天" },
        { id: 6, name: "六天" },
        { id: 7, name: "七天" },
        { id: 8, name: "八天" },
        { id: 9, name: "九天" },
        { id: 10, name: "十天" },
        { id: 11, name: "十一天" },
        { id: 12, name: "十二天" },
        { id: 13, name: "十三天" },
        { id: 14, name: "十四天" },
        { id: 15, name: "十五天" }
      ],
      switch1: true,
      text_info: "",
      // 添加专家model
      modal1: false,
      expertNo: 1,
      expertSize: 10,
      // 上午时间
      value2: [],
      // 下午时间
      value3: [],
      // 一周号源
      params: {
        // 周一
        oneAm: null,
        onePm: null,
        // 周二
        twoAm: null,
        twoPm: null,
        // 周三
        threeAm: null,
        threePm: null,
        // 周四
        fourAm: null,
        fourPm: null,
        // 周五
        fiveAm: null,
        fivePm: null,
        // 周六
        sixAm: null,
        sixPm: null,
        // 周天
        sevenAm: null,
        sevenPm: null
      },
      // 医院ID
      id: 82,
      selectExpert: {},
      expertList: []
    };
  },
  mounted() {
    this.getRemoteClinic();
    this.getDetail(this.$route.params.id);
  },
  methods: {
    //  取消,后退 上一次
    back() {
      this.$router.push({
        name: "DoctorRemoteclinicList"
      });
    },
    // 根据远程门诊类型变更金额
    changeSearchType(val) {
      this.money = this.searchTypeList[val].cost;
    },
    // 保存
    save() {
      // 号源
      let params = this.params;
      // 远程门诊类型
      params.outpatintTypeId = this.searchType;
      // 门诊时长
      params.outpatientTime = this.time;
      // 门诊周期
      params.cycleDay = this.cycle;
      // 备注
      params.remarks = this.text_info;
      // 上午间隔时间
      params.intervalTimeAmStart = this.value2[0];
      params.intervalTimeAmEnd = this.value2[1];
      // 下午间隔时间
      params.intervalTimePmStart = this.value3[0];
      params.intervalTimePmEnd = this.value3[1];
      // 医生id
      params.doctorId = this.selectExpert.doctorId;
      // 医院ID
      params.hospitalId = this.selectExpert.hospitalId;
      params.id = this.selectExpert.id;
      if (this.searchType == -1) {
        this.$Message.info("请选择远程门诊类型");
      } else if (this.time < 0) {
        this.$Message.info("请选择远程门诊时长");
      } else if (this.cycle < 0) {
        this.$Message.info("请选择远程门诊周期");
      } else {
        console.log(params);
        this.$axios.post(api.doctorRomteclinicEdit, params).then(res => {
          console.log(res);
          if (res.data.code) {
            this.$Message.info(res.data.message);
            setTimeout(() => {
              this.$router.push({
                name: "DoctorRemoteclinicList"
              });
            }, 800);
          }
        });
      }
    },
    // 选择专家
    expert(item) {
      this.modal1 = false;
      this.selectExpert = item;
    },
    // 选择上午时间
    changeTime(val) {
      this.value2 = val;
    },
    // 选择下午时间
    changeTime1(val) {
      this.value3 = val;
    },
    // 远程门诊类型
    getRemoteClinic() {
      this.$axios
        .post(api.DoctorRemoteClinicTypeList, {
          hospitalId: this.id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.searchTypeList = ret;
          }
        });
    },
    getDetail(id) {
      this.$axios.post(api.doctorRomteclinicDetail, { id }).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          console.log(ret);
          // 远程门诊类型
          this.searchType = ret.outpatintTypeId;
          // 门诊时长
          this.time = ret.outpatientTime;
          // 门诊周期
          this.cycle = ret.cycleDay;
          // 备注
          this.text_info = ret.remarks;
          // 上午间隔时间
          this.value2.push(ret.intervalTimeAmStart);
          this.value2.push(ret.intervalTimeAmEnd);
          // 下午间隔时间
          this.value3.push(ret.intervalTimePmStart);
          this.value3.push(ret.intervalTimePmEnd);
          // 科室
          this.selectExpert.doctorName = ret.doctorName;
          // 医院名字
          this.selectExpert.hospitalName = ret.hospitalName;
          // 医生姓名
          this.selectExpert.deptName = ret.deptName;

          // 医院id
          this.selectExpert.hospitalId = ret.hospitalId;
          // 医生id
          this.selectExpert.id = ret.id;

          this.selectExpert.doctorId = ret.doctorId;

          // 号源
          // 周一
          this.params.oneAm = ret.oneAm;
          this.params.onePm = ret.onePm;
          // 周二
          this.params.twoAm = ret.twoAm;
          this.params.twoPm = ret.twoPm;

          this.params.threeAm = ret.threeAm;
          this.params.threePm = ret.threePm;
          // 周三
          this.params.fourAm = ret.fourAm;
          this.params.fourPm = ret.fourPm;
          // 周四
          this.params.fiveAm = ret.fiveAm;
          this.params.fivePm = ret.fivePm;
          //  周五
          this.params.sixAm = ret.sixAm;
          this.params.sixPm = ret.sixPm;
          // 周六
          this.params.sevenAm = ret.sevenAm;
          this.params.sevenPm = ret.sevenPm;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.edit {
  width: 98%;
  padding: 10px;
  margin-left: 1%;
  margin: 0 auto;
  background: #fff;

  .main {
    width: 80%;
    margin: 15px auto;
    .doctor {
      width: 100%;
      display: flex;
      height: 40px;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
      span {
        margin-right: 20px;
        font-size: 20px;
      }
    }
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
      .item-text {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100px;
      }
      .w-select {
        width: 150px;
      }
    }
    .table {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      p {
        text-align: center;
        margin: 10px 0;
      }
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
            text-align: center;
          }
          td.none {
            display: none;
          }
        }
      }
      .nodata {
        width: calc(100% - 1px);
        line-height: 40px;
        background: #fff;
        border: 1px solid #ddd;
        border-top: none;
        text-align: center;
      }
    }
    .text {
      width: 100%;
      display: flex;
      flex-direction: row;
      span {
        display: inline-block;
        width: 100px;
        
      }
    }
    .save {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 200px;
      margin: 10px auto;
      justify-content: space-around;
      div {
        width: 80px;
        line-height: 30px;
        border-radius: 40px;
        border: 1px solid #ddd;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
.modelExpert {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .total {
    text-align: center;
    margin: 10px 0;
  }
  .modelExpert_list {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    span {
      user-select: none;
    }
  }
  input {
    width: 100%;
    background: #fff;
    border: none;
    outline: none;
    text-indent: 10px;
    line-height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }
}
</style>

