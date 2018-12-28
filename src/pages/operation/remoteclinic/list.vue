<template>
  <div class="remoteClinic">
    <tempHeader/>
    <!-- 头部选择框 -->
    <header>
      <!-- 省份 -->
      <Select class="w-select" v-model="city">
        <Option value="0">全国</Option>
        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
      </Select>
      <!-- 医院名称 -->
      <!-- <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
        <Option v-for="item in searchTypeList" :value="item.id" :key="item.id">{{item.name}}</Option>
      </Select> -->
      <!-- 检索的医院名称 -->
      <Input class="w-input" v-model="searchKey" :placeholder="'请输入'+keyPlaceHolder"/>
      <!-- 职称 -->
      <!-- <Select class="w-select" v-model="dictType" placeholder="职称级别">
        <Option
          v-for="item in titleList"
          :value="item.dictType"
          :key="item.dictType"
        >{{item.dictName}}</Option>
      </Select> -->
      <!-- 查询 -->
      <Button type="primary" class="primary" @click="search">
        <Icon type="ios-search" size="14"/>查询
      </Button>
      <!-- 添加接诊医生排班 -->
      <Button type="primary" class="primary" @click="add">添加接诊医生排班</Button>
    </header>
    <!-- 主体列表 -->
    <div class="main">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>序号</td>
          <td>专家姓名</td>
          <td>医院科室</td>
          <td>远程门诊时间</td>
          <td>预约期限</td>
          <td>启用标示</td>
          <td>操作</td>
        </tr>

        <tr v-for = 'item,index in list' v-show = 'list.length'>
          <td>{{ item.sum }}</td>
          <td>{{ item.name }}</td>
          <td>科室</td>
          <td @click="showModel" style="cursor:pointer;">
            <p>上午:门诊时间</p>
            <p>下午:门诊时间</p>
          </td>
          <td>7</td>
          <td>启用</td>
          <!-- <td style = 'color:red;'>停用</td> -->
          <td style="cursor:pointer;" @click="edit()">编辑</td>
        </tr>
      </table>
      <div class="nodata"  v-show = '!list.length'>暂无更多数据</div>
    </div>
    <Modal v-model="modal1" title="远程门诊时间">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <div class="total">
      <Page :total="remoteClinicLength" :current="pageNo" @on-change="change"/>
    </div>
  </div>
</template>
<script>
import tempHeader from "@/components/tmpHeader";
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tempHeader,
    Select,
    Option
  },
  data() {
    return {
      remoteClinicLength: 10,
      pageNo: 1,
      searchTypeList: [
        { id: 1, name: "医院名称" },
        { id: 2, name: "医生姓名" }
      ],
      searchType: 1,
      keyPlaceHolder: "医院名称",
      cityList: [],
      city: "0",
      searchKey: "",
      dictType: "",
      titleList: "",
      modal1: false,
      modelList: [],
      list: [
        {
          sum: "01",
          name:"赵虎",

        }
      ]
    };
  },
  mounted() {
    this.getInfoData();
  },
  methods: {
    // 显示model
    showModel() {
      this.modal1 = true;
    },
    // 页码改变
    change(index) {
      this.pageNo = index;
    },
    changeSearchType(val) {
      if (val == 1) {
        this.keyPlaceHolder = "医院名称";
      } else {
        this.keyPlaceHolder = "医生名称";
      }
    },
    // 新增
    add() {
      this.$router.push({
        name: "DoctorRemoteclinicAdd"
      });
    },
    // 页面加载时获取省级,职称列表
    getInfoData() {
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
    },
    // 修改
    edit() {
      this.$router.push({
        name: "DoctorRemoteclinicEdit"
      });
    },
    search() {
      let params = {
        // 医院/医生名称
        searchType: this.searchType,
        // 区域
        city: this.city,
        // 医院/医生名称
        searchKey: this.searchKey,
        // 职称
        dictType: this.dictType
      };
      console.log(params);
    }
  }
};
</script>
<style lang="less" scoped>
.remoteClinic {
  width: 98%;
  padding: 10px;
  margin-left: 1%;
  margin: 0 auto;
  background: #fff;
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    .w-select {
      width: 100px;
      margin: 0 10px;
    }
    .w-input {
      width: 300px;
    }
    .primary {
      margin: 0 10px;
    }
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 10px 0;
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
          padding: 10px 0;
          text-align: center;
        }
        td.none {
          display: none;
        }
      }
    }
    .nodata {
      width: calc(100% - 1px);
      line-height: 50px;
      background: #fff;
      border: 1px solid #ddd;
      border-top: none;
      text-align: center;
    }
  }
}
</style>
