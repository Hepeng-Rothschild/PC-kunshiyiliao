<template>
  <div class="remoteClinicList">
    <tmpHeader/>
    <div class="main">
      <!-- 预约天数 -->
      <div class="order">
        <p>远程门诊可预约天数：</p>
        <input type="text" v-model.trim="model.day">
      </div>
      <!-- 云诊室个数 -->
      <div class="order">
        <p>本院开通云诊室个数：</p>
        <span>5</span>
        <span class="roomList" @click="roomListTo">列表</span>
      </div>
      <!-- 区域 -->
      <div class="headers">
        <div class="city">
          <!-- 省 -->
          <select @change="provinceChange" v-model="model.province">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in provinceList" :key='item.id'>{{ item.name }}</option>
          </select>
          <!-- 市 -->
          <select v-model="model.city" @change="cityChange">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in cityList" :key='item.id'>{{ item.city }}</option>
          </select>
          <!-- 区 -->
          <select v-model="model.county">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in countyList" :key='item.id'>{{ item.area }}</option>
          </select>
        </div>
      </div>

      <!-- 检索 -->
      <div class="inputContent">
        <div class="search">
          <input type="text" placeholder="蚌埠" v-model.trim="model.hospital" @keyup="searchContent">
        </div>
        <p>已选择远程远程门诊合作机构</p>
      </div>
      <Transfer
        :data="data4"
        :target-keys="targetKeys4"
        @on-change="handleChange4"
        :list-style="listStyle"
      ></Transfer>
      <!-- 备注 -->
      <div class="info">
        <span>备注：</span>
        <div>
          <p>更合作机构，将在当前预约天数之后生效。</p>
          <p>在左侧选择机构，选择添加到右侧合作机构。</p>
          <p>在右侧选择机构，选择删除合作机构。</p>
        </div>
      </div>
      <div class="save">
        <span @click="save">保存</span>
        <span @click="$router.back()">取消</span>
      </div>
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
        width: "350px",
        height: "500px",
        margin: "20px 0"
      },
      pageNo: 1,
      provinceList: [],
      cityList: [],
      countyList: [],
      model: {
        province: "-1",
        city: "-1",
        county: "-1",
        hospital: "",
        day: "7",
        number: "5"
      },
      data4: this.getMockData(),
      targetKeys4: this.getTargetKeys()
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
    this.$axios.post(api.getCity).then(res => {
      if (res.data.code) {
        let ret = res.data.object;
        this.provinceList = ret;
      }
    });
  },
  methods: {
    // 跳转云诊室列表
    roomListTo() {
      // 公用方法
      this.functionJS.paramsNavgationTo(this, "remoteClinicRoomList");
    },
    // 输入值时搜索内容
    searchContent() {
    },
    //  分页器改变
    pageChange(index) {
      this.pageNo = index;
    },
    // 通过省级获取市级
    provinceChange() {
      this.cityList = [];
      this.model.city = "-1";
      this.countyList = [];
      this.model.county = "-1";
      if (this.model.province == "-1") {
        return;
      }
      this.provinceList.forEach(item => {
        if (item.id == this.model.province) {
          this.cityList = item.cityList;
        }
      });
    },
    // 通过市级获取区县
    cityChange() {
      this.countyList = [];
      this.model.county = "-1";
      if (this.model.province == "-1") {
        return;
      }
      this.$axios
        .post(api.getCounty, {
          cityId: this.model.city
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.countyList = ret;
          }
        });
    },
    search() {
      if (this.model.hospital == "") {
        this.$Message.info("您还没有输入内容");
        return;
      }
    },
    getMockData() {
      let mockData = [];
      for (let i = 0; i <= 10; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          disabled: false
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => {
          return item.key;
        });
    },
    handleChange4(newTargetKeys, direction, moveKeys) {
      // newTargetKeys    下标
      // direction    左移/右移
      // moveKeys  下标
      this.targetKeys4 = newTargetKeys;
      for (let i = 0; i < newTargetKeys.length; i++) {
        this.data4[newTargetKeys[i]].label;
      }
    },
    render4(item) {
      return item.label + " - " + item.description;
    },
    // 保存
    save() {
      let params = {};
    }
  }
};
</script>
<style lang="less" scoped>
.remoteClinicList {
  width: 100%;
  background: #f2f2f2;
  .main {
    width: 80%;
    margin: 0 auto;
    .order {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;
      input {
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        outline: none;
        background: none;
        border: 1px solid gray;
        margin: 0 20px;
      }
      span {
        padding: 0 20px;
        border: 1px solid gray;
        margin: 0 20px;
      }
      .roomList {
        cursor: pointer;
        border: 1px solid gray;
        border-radius: 4px;
        padding: 0 8px;
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
      width: 100%;
      margin: 0 auto;
      justify-content: space-between;
      .search {
        width: 300px;
        input {
          width: 240px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 40px;
          text-indent: 1em;
          outline: none;
          height: 30px;
        }
        button {
          background: #2d8cf0;
          color: #fff;
          border-radius: 10px;
          border: none;
          outline: none;
          padding: 6px 10px;
        }
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
    .save {
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 200px;
      justify-content: space-around;

      span {
        display: block;
        width: 90px;
        height: 30px;
        background: #2d8cf0;
        color: #fff;
        border-radius: 6px;
        margin: 10px auto;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
