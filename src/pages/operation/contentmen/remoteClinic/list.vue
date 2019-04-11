<template>
  <div class="remoteClinicList">
    <tmpHeader/>
    <div class="main">
      <!-- 预约天数 -->
      <!-- <div class="order">
        <p>远程门诊可预约天数：</p>
        <span>7</span>
      </div>-->
      <!-- 云诊室个数 -->
      <!-- <div class="order">
        <p>本院开通云诊室个数：</p>
        <span>5</span>
        <span class="roomList" @click = 'roomListTo'>列表</span>
      </div>-->
      <!-- 区域 -->
      <div class="headers">
        <div class="city">
          <!-- 省 -->
          <Select v-model="model.provinceCode" style="width:100px" @on-change="provinceChange">
            <Option value>请选择</Option>
            <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <!-- 市 -->
          <Select
            v-model="model.cityCode"
            style="width:150px;margin:0 10px;"
            @on-change="cityChange"
          >
            <Option value>请选择</Option>
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.city }}</Option>
          </Select>
          <!-- 区 -->
          <Select v-model="model.districtCode" style="width:200px">
            <Option value>请选择</Option>
            <Option v-for="item in countyList" :value="item.id" :key="item.id">{{ item.area }}</Option>
          </Select>
        </div>
      </div>

      <!-- 检索 -->
      <div class="inputContent">
        <div class="search">
          <Input
            placeholder="请输入医院名称检索"
            v-model.trim="model.orgName"
            style="width: 300px;margin-right:20px;"
            clearable
          />
          <Button type="primary" @click="searchContent">查询</Button>
        </div>
        <!-- <p>已选择远程门诊合作机构</p> -->
      </div>

      <div class="transfer">
        <div class="left" ref="scrollBoxL">
          <h3>可选择远程门诊合作机构</h3>
          <!-- <p @dblclick="leftHospial(item,index,$event)" v-for="item,index in hospialList">
            {{ item.hospitalName }}
            <img
              src="../../../../assets/images/back/gengduo.png"
              alt
              v-show="item.hospitalName"
            >
          </p> -->
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <th>医院</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in hospialList" :key="index"  v-show='hospialList.length'>
              <th>{{ item.hospitalName }}</th>
              <th><span style='color:#2d8cf0;cursor:pointer;user-select:none;' @click='leftHospial(item,index,$event)'>选择</span></th>
            </tr>
          </table>
          <div class="fooDiv" v-show='!hospialList.length'>没有更多数据</div>
        </div>

        <div class="right" ref="scrollBoxR">
          <h3>已选择远程门诊合作机构</h3>
          <!-- <p @dblclick="rightHospial(item,index,$event)" v-for="item,index in selectHospial">
            <img src="../../../../assets/images/back/fanhui.png" alt v-show="item.hospitalName">
            {{ item.hospitalName }}
          </p> -->
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <th>医院</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in selectHospial" :key="index" v-show='selectHospial.length'>
              <th>{{ item.hospitalName }}</th>
              <th><span style='color:#2d8cf0;cursor:pointer;user-select:none;' @click='rightHospial(item,index,$event)'>移除</span></th>
            </tr>
          </table>
          <div class="fooDiv" v-show='!selectHospial.length'>没有更多数据</div>
        </div>
      </div>
      <!-- 保存 -->
      <Button type="primary" @click="edit">保存</Button>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import { Transfer } from "iview";
export default {
  components: {
    tmpHeader,
    Transfer
  },
  data() {
    return {
      // 地区列表
      provinceList: [],
      cityList: [],
      countyList: [],
      // 选择的地区
      model: {
        provinceCode: "",
        cityCode: "",
        districtCode: "",
        orgName: ""
      },
      // 医院列表
      hospialList: [],
      // 合作医院列表
      selectHospial: []
    };
  },
  created() {
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
  mounted() {
    let doctor = localStorage.getItem("doctor");
    if (!doctor) {
      this.$Message.info("您还没有开通远程门诊,去开通");
      setTimeout(() => {
        localStorage.setItem("homeIndex", 0);
        // 公用方法
        this.functionJS.paramsNavgationTo(this, "homeInfo");
      }, 800);
      return "";
    }
    this.getHospialRoom();
  },
  methods: {
    // 跳转云诊室列表
    roomListTo() {
       // 公用方法
      this.functionJS.paramsNavgationTo(this, "remoteClinicRoomList");
    },
    // 输入值检索搜索内容
    searchContent() {
      let id = sessionStorage.getItem("hospitalId");
      let params = this.model;
      params.id = id;
      this.$axios.post(api.searchRoomList, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          let arr = [];
          console.log(ret);
          ret.forEach(item => {
            let flag = this.selectHospial.some(i=>{
              return i.remote_hospital_id == item.id
            })
            if(!flag){
              arr.push({
                hospitalName: item.orgName,
                remote_hospital_id: item.id
              })
            }
          });
          this.$Message.success("查询成功")
          this.hospialList = arr;
        } else {
          this.$Message.error("查询失败")
        }
      });
    },
    // 保存
    edit() {
      let id = sessionStorage.getItem("hospitalId");
      let arr = [];
      this.selectHospial.forEach(item => {
        arr.push(item.remote_hospital_id);
      });
      let params = {
        applyHospitalId: id,
        remoteHospitalIds: arr
      };
      if (arr.length == 0) {
        this.$Message.info("请至少选择一个关联医院");
        return ""
      } else {
        this.$axios
          .post(api.searchRoomSelectAdd, params)
          .then(res => {
            if (res.data.code) {
              this.$Message.success("保存成功");
            }
          })
          .catch(err => {
            this.$Message.error("保存失败,请稍候重试");
          });
      }
    },
    // 通过省级获取市级
    provinceChange() {
      this.cityList = [];
      this.model.cityCode = "";
      this.countyList = [];
      this.model.districtCode = "";
      if (this.model.provinceCode == "") {
        return;
      }
      this.provinceList.forEach(item => {
        if (item.id == this.model.provinceCode) {
          this.cityList = item.cityList;
        }
      });
    },
    // 通过市级获取区县
    cityChange() {
      this.countyList = [];
      this.model.districtCode = "";
      if (this.model.provinceCode == "") {
        return;
      }
      this.$axios
        .post(api.getCounty, {
          cityId: this.model.cityCode
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.countyList = ret;
          }
        });
    },
    // 左侧点击右侧
    leftHospial(item, index, e) {
      this.hospialList.splice(index, 1);
      this.selectHospial.push(item);
    },
    // 右侧点击左移
    rightHospial(item, index, e) {
      this.selectHospial.splice(index, 1);
      this.hospialList.push(item);
    },
    // 请求当前医院已关联的医院列表
    getHospialRoom() {
      this.$axios.post(api.getCity).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.provinceList = ret;
        }
      });
      let id = sessionStorage.getItem("hospitalId");
      this.$axios
        .post(api.searchCurrentRoom, {
          applyHospitalId: id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.selectHospial = ret;
          }
        })
        .catch(err => {
          this.$Message.info("查询失败,请稍候重试");
        });
    }
  }
};
</script>
<style lang="less" scoped>
/*滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.remoteClinicList {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 80%;
    margin: 10px auto;
    .order {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;
      .roomList {
        cursor: pointer;
        border: 1px solid gray;
        border-radius: 4px;
        padding: 0 8px;
      }
      span {
        padding: 0 18px;
        border: 1px solid gray;
        margin: 0 20px;
      }
    }
    .headers {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 20px auto;
      .city {
        flex: 1;
        display: flex;
        flex-direction: row;
        select {
          margin-right: 20px;
          border-radius: 10px;
          outline: none;
          width: 100px;
          text-align: center;
        }
      }
    }
    .inputContent {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      justify-content: space-between;
      .search {
        width: 300px;
        background: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
      }
    }
    .total {
      margin: 20px 0;
      text-align: center;
    }
    .info {
      display: flex;
      flex-direction: row;
    }
    .transfer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 20px 0;
      overflow: hidden;
      div {
        width: 400px;
        height: 500px;
        border: 1px solid #ddd;
        overflow: auto;
        h3{
          text-align:center;
          padding:6px 0;
        }
        p {
          padding: 0 10px;
          user-select: none;
          font-size: 18px;
          cursor: pointer;
          img {
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }
        p:hover {
          color: #fff;
          background: #ccc;
        }
        table {
          width: 100%;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          tr {
            border-top: 1px solid #ddd;
            height: 40px;
            th {
              min-width:80px;
              text-align: center;
            }
          }
          tr:first-child{
            background: #f8f8f9;
          }
          tr:not(:first-child):hover {
            background: #ebf7ff;
          }
        }
        .fooDiv {
            width: 100%;
            line-height: 35px;
            height:40px;
            border:none;
            border-bottom: 1px solid #ddd;
            text-align: center;
          }
      }
    }
    .save {
      width: 90px;
      height: 30px;
      background: #2d8cf0;
      color: #fff;
      border-radius: 30px;
      margin: 10px auto;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
