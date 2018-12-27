<template>
  <div class="edit">
    <tempHeader/>
    <header></header>
    <!-- 主体 -->
    <div class="main">
      <!-- 添加接诊医生  -->
      <Button type="primary" class="primary" @click="modal1=true">
        <Icon type="ios-search" size="14"/>添加接诊医生
      </Button>
      <div class="doctor">
        <!-- 医院 -->
        <span>蚌埠中医院</span>
        <!-- 科室 -->
        <span>心血管内科</span>
        <!-- 医生姓名 -->
        <span>李正兰</span>
      </div>
      <Modal v-model="modal1" title="选择专家">
        <div class="modelExpert">
          <input type="text" placeholder="输入医生姓名、医院、科室">
          <div class="modelExpert_list" @click="expert">
            <span>蚌埠中医院</span>
            <span>心血管内科</span>
            <span>李正兰</span>
            <span>主任医师</span>
          </div>
          <div class="total">
            <Page :total="expertSize" :current="expertNo"/>
          </div>
        </div>
      </Modal>
      <!-- 远程门诊类型 -->
      <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>远程门诊类型</p>
        </div>
        <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
          <Option v-for="item in searchTypeList" :value="item.id" :key="item.id">{{item.name}}</Option>
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
      <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>是否启用</p>
        </div>
        <iSwitch v-model="switch1"/>
      </div>
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
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
            <td>
              <InputNumber :max="8" :min="1"></InputNumber>
            </td>
          </tr>
        </table>
        <p>注：数量不能超过时间段/远程门诊时长数量（如上午8:00至12:00，时长30分钟，最多可设置8次）</p>
        <!-- <div class="nodata">暂无更多数据</div> -->
      </div>
      <!-- 预约备注 -->
      <div class="text">
        <span>预约备注：</span>
        <textarea cols="30" rows="10" v-model="text_info"></textarea>
      </div>
      <!-- 保存 -->
      <div class="save">
        <div style="background:skyblue;color:#fff;" @click="save">保存</div>
        <div @click="back">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import tempHeader from "@/components/tmpHeader";
import { Select, Option, Switch, TimePicker } from "iview";
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
      searchType: 1,
      searchTypeList: [
        { id: 1, name: "普通远程门诊" },
        { id: 2, name: "特需远程门诊" },
        { id: 3, name: "国际远程门诊" }
      ],
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
        { id: 14, name: "十四天" }
      ],
      switch1: true,
      text_info: "",
      // 添加专家model
      modal1: false,
      // 专家页数
      expertNo: 1,
      // 专家条数
      expertSize: 10,
      value2: ""
    };
  },
  methods: {
    //  取消,后退 上一次
    back() {
      this.$router.push({
        name: "DoctorRemoteclinicList"
      });
    },
    changeSearchType(val) {
      console.log(val);
    },
    // 保存
    save() {
      let params = {
        // 远程门诊类型
        searchType: this.searchType,
        // 门诊时长
        time: this.time,
        // 门诊周期
        cycle: this.cycle,
        // 是否启用
        switch1: Number(this.switch1),
        // 预约备注
        text_info: this.text_info,
        // 价格
        money: this.money,
        // 时间段
        time:this.value2
      }
      console.log(params);
    },
    // 选择专家
    expert() {
      console.log(111);
    },
    // 选择时间
    changeTime(val) {
      this.value2 = val;
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
      textarea {
        height: 100px;
        outline: none;
        flex: 1;
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
      font-size: 20px;
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

