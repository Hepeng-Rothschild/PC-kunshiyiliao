<template>
  <div class="room">
    <tmpHeader/>
    <div class="main">
      <div class="headers">
        <div class="search">
          <input type="text" placeholder="云诊室名称">
        </div>
        <button @click="addRoom">添加云诊室</button>
      </div>
      <div class="table">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>序号</td>
            <td>云诊室名称</td>
            <td>云诊室位置</td>
            <td>使用排序</td>
            <td>开放时间</td>
            <td>单次门诊时间</td>
            <td>使用标示</td>
            <td>操作</td>
          </tr>
          <tr>
            <td>序号</td>
            <td>云诊室名称</td>
            <td>云诊室位置</td>
            <td>使用排序</td>
            <td>
              <p>上午</p>
              <p>下午</p>
              <p>晚上</p>
            </td>
            <td>30分钟</td>
            <!-- <td style = 'color:#3dd7d7'>使用中</td> -->
            <td style="color:red">停用</td>
            <td @click="editRoom" style="cursor:pointer;">编辑</td>
          </tr>
        </table>
        <div class="notData">暂无更多数据</div>
      </div>
    </div>
    <!-- 弹出层 -->
    <div class="model" v-show="modelFlag">
      <h3>蚌埠中医院云诊室信息维护</h3>
      <!-- 云诊室名称 -->
      <div class="name">
        <span>云诊室名称：</span>
        <input type="text" placeholder="请输入云诊室名称">
      </div>
      <!-- 云诊室位置 -->
      <div class="name">
        <span>云诊室位置：</span>
        <input type="text" placeholder="请输入云诊室位置">
      </div>
      <!-- 云诊室排序 -->
      <div class="sort">
        <span>云诊室排序：</span>
        <input type="text" placeholder="排序">
        <p>备注：远程门诊预约优先排序</p>
      </div>
      <!-- 开放时间 -->
      <div class="createdTime">
        <span>开放时间：</span>
        <div class="time">
          <!-- 上午 -->
          <div class="timeMorning">
            <input type="checkbox" name id="morning">
            <label for="morning">上午</label>
            <TimePicker
              format="HH:mm"
              placeholder="开始时间"
              style="width: 100px"
              @on-change="startMorning"
            ></TimePicker>
            <b>至</b>
            <TimePicker
              format="HH:mm"
              placeholder="结束时间"
              style="width: 100px"
              @on-change="endMorning"
            ></TimePicker>
          </div>
          <!--下午  -->
          <div class="timeMorning">
            <input type="checkbox" name id="Afternoon">
            <label for="Afternoon">下午</label>
            <TimePicker
              format="HH:mm"
              placeholder="开始时间"
              style="width: 100px"
              @on-change="startAfternoon"
            ></TimePicker>
            <b>至</b>
            <TimePicker
              format="HH:mm"
              placeholder="结束时间"
              style="width: 100px"
              @on-change="endAfternoon"
            ></TimePicker>
          </div>
          <!--晚上  -->
          <div class="timeMorning">
            <input type="checkbox" name id="Night">
            <label for="Night">晚上</label>
            <TimePicker
              format="HH:mm"
              placeholder="开始时间"
              style="width: 100px"
              @on-change="startNight"
            ></TimePicker>
            <b>至</b>
            <TimePicker
              format="HH:mm"
              placeholder="结束时间"
              style="width: 100px"
              @on-change="endNight"
            ></TimePicker>
          </div>
        </div>
      </div>
      <!-- 单次门诊时间 -->
      <div class="oneTime">
        <span>单次门诊时间：</span>
        <select>
          <option value>30分钟</option>
          <option value>15分钟</option>
          <option value>20分钟</option>
        </select>
        <p>备注：建议全院统一。</p>
      </div>
      <!-- 云诊室显示 -->
      <div class="show">
        <span>云诊室显示：</span>
        <iSwitch v-model="switch1"/>
      </div>
      <!-- 保存 -->
      <div class="save">
        <div @click="save">保存</div>
        <div @click="modelFlag=false">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import { TimePicker, Switch } from "iview";
export default {
  components: {
    tmpHeader,
    TimePicker,
    iSwitch: Switch
  },
  data() {
    return {
      switch1: true,
      modelFlag: false,
      time: {
        startMorning: "",
        endMorning: "",
        startAfternoon: "",
        endAfternoon: "",
        startNight: "",
        endNight: ""
      },
      current: -1
    };
  },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/mechanism/index",
                title: "机构运营"
            },
            {
                path: "/index/operation/home",
                title: "机构管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
  methods: {
    addRoom() {
      this.modelFlag = true;
    },
    editRoom() {
      this.current = 1;
      this.modelFlag = true;
    },
    startMorning(time) {
      this.time.startMorning = time;
      //   console.log(time);
    },
    endMorning(time) {
      this.time.endMorning = time;
      //   console.log(time);
    },
    startAfternoon(time) {
      this.time.startAfternoon = time;
      //   console.log(time);
    },
    endAfternoon(time) {
      this.time.endAfternoon = time;
      //   console.log(time);
    },
    startNight(time) {
      this.time.startNight = time;
      //   console.log(time);
    },
    endNight(time) {
      this.time.endNight = time;
      //   console.log(time);
    },
    save() {
      console.log(this.time);
    }
  }
};
</script>
<style lang="less" scoped>
.room {
  width: 100%;
  position: relative;
  .main {
    width: 80%;
    margin: 0 auto;
    .headers {
      display: flex;
      flex-direction: row;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      .search {
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 40px;
        width: 200px;
        input {
          width: 100%;
          height: 30px;
          outline: none;
          border: none;
          background: none;
          text-indent: 1em;
        }
      }
      button {
        background: #2d8cf0;
        color: #fff;
        height: 30px;
        padding: 0 8px;
        border: none;
        outline: none;
        border-radius: 4px;
      }
    }
    .table {
      width: 100%;
      margin: 0 auto;
      .notData {
        width: 100%;
        border: 1px solid #ddd;
        border-top: none;
        text-align: center;
        line-height: 40px;
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
    }
  }
  .model {
    width: 600px;
    background: #fff;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -300px;
    .name {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px auto;
      width: 400px;
      span {
        width: 100px;
      }
      input {
        outline: none;
        width: 230px;
        text-indent: 10px;
        border: 1px solid #ddd;
      }
    }
    .sort {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px auto;
      width: 400px;
      span {
        width: 100px;
      }
      input {
        outline: none;
        width: 50px;
        text-indent: 10px;
        border: 1px solid #ddd;
      }
    }
    .createdTime {
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      width: 400px;
      span {
        width: 100px;
        line-height: 40px;
      }
      .time {
        display: flex;
        flex-direction: column;
        width: 400px;
        .timeMorning {
          margin: 4px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
          justify-content: space-around;
        }
      }
    }
    .oneTime {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
      width: 400px;
      span {
        width: 100px;
      }
      p {
        margin-left: 20px;
      }
    }
    .show {
      width: 400px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .save {
      width: 200px;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px auto;
      justify-content: space-around;
      div {
        width: 80px;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 6px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
