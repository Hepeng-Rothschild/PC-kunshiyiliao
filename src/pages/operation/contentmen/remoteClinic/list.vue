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
          <select @change="provinceChange" v-model="model.provinceCode">
            <option value>--请选择--</option>
            <option :value="item.id" v-for="item in provinceList">{{ item.name }}</option>
          </select>
          <!-- 市 -->
          <select v-model="model.cityCode" @change="cityChange">
            <option value>--请选择--</option>
            <option :value="item.id" v-for="item in cityList">{{ item.city }}</option>
          </select>
          <!-- 区 -->
          <select v-model="model.districtCode">
            <option value>--请选择--</option>
            <option :value="item.id" v-for="item in countyList">{{ item.area }}</option>
          </select>
        </div>
      </div>

      <!-- 检索 -->
      <div class="inputContent">
        <div class="search">
          <Input
            placeholder="请输入关键字检索"
            v-model.trim="model.orgName"
            style="width: 300px;margin-right:20px;"
          />
          <Button type="primary" @click="searchContent">查询</Button>
        </div>
        <p>已选择远程远程门诊合作机构</p>
      </div>

      <div class="transfer">
        <div class="left">
          <p @dblclick="leftHospial(item,index,$event)" v-for="item,index in hospialList">
            {{ item.hospitalName }}
            <img
              src="../../../../assets/images/back/gengduo.png"
              alt
              v-show="item.hospitalName"
            >
          </p>
        </div>
        <div class="right">
          <p @dblclick="rightHospial(item,index,$event)" v-for="item,index in selectHospial">
            <img src="../../../../assets/images/back/fanhui.png" alt v-show="item.hospitalName">
            {{ item.hospitalName }}
          </p>
        </div>
      </div>

      <!-- 备注 -->
      <!-- <div class="info">
        <span>备注：</span>
        <div>
          <p>更合作机构，将在当前预约天数之后生效。</p>
          <p>在左侧选择机构，选择添加到右侧合作机构。</p>
          <p>在右侧选择机构，选择删除合作机构。</p>
        </div>
      </div>-->
      <!-- 保存 -->
      <div class="save" @click="edit">保存</div>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import { Select, Option, Transfer } from "iview";
export default {
  components: {
    tmpHeader,
    Select,
    Option,
    Transfer
  },
  data() {
    return {
      remoteClinicSize: 10,
      listStyle: {
        width: "45%",
        height: "450px",
        margin: "20px 0"
      },
      pageNo: 1,
      provinceList: [],
      cityList: [],
      countyList: [],
      model: {
        provinceCode: "",
        cityCode: "",
        districtCode: "",
        orgName: ""
      },
      hospialList: [],
      selectHospial: []
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
  mounted() {
    let doctor = sessionStorage.getItem("doctor");
    if (!doctor) {
      this.$Message.info("您还没有开通远程门诊,去开通");
      setTimeout(() => {
        sessionStorage.setItem("homeIndex", 0);
        this.$router.push({
          name: "homeInfo"
        });
      }, 800);
      return "";
    }
    this.getHospialRoom();
  },
  methods: {
    // 跳转云诊室列表
    roomListTo() {
      this.$router.push({
        name: "remoteClinicRoomList"
      });
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
          ret.forEach(item => {
            arr.push({
              hospitalName: item.orgName,
              remote_hospital_id: item.id
            });
          });
          this.hospialList = arr;
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
      } else {
        this.$axios
          .post(api.searchRoomSelectAdd, params)
          .then(res => {
            if (res.data.code) {
              this.$Message.info("保存成功");
            }
          })
          .catch(err => {
            this.$Message.info("保存失败,请稍候重试");
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
            console.log(ret);
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
      div {
        width: 400px;
        height: 500px;
        border: 1px solid #ddd;
        overflow: auto;
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
