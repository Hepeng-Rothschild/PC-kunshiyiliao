<template>
  <div class="add">
    <div class="main">
      <div class="edition">
        <!-- 版本Id -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">版本id</span>
          <InputNumber :min="1" disabled v-model="params.versionId"></InputNumber>
        </div>
        <!-- 版本名 -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">版本名</span>
          <Input placeholder="请输入版本名" style="width: 300px" v-model="params.versionName"/>
        </div>
        <!-- 版本号 -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">版本号</span>
          <Input placeholder="请输入版本号" style="width: 300px" disabled v-model="params.versionNumber"/>
        </div>
        <!-- 版本唯一标识 -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">唯一标识</span>
          <Input placeholder="请输入版本唯一标识" style="width: 300px" disabled v-model="params.id"/>
        </div>
        <!-- 版本类型 -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">版本类型</span>
          <Select :value="params.type" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!-- 下载路径 -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">下载路径</span>
          <Input placeholder="请输入版本下载路径" style="width: 300px" v-model="params.downloadPath"/>
        </div>
        <!-- 版本说明 -->
        <div class="item">
          <span style="color:red;">&nbsp;</span>
          <span class="info">版本说明</span>
          <Input type="textarea" placeholder="请输入版本版本说明" v-model="params.content"/>
        </div>
      </div>
      <div class="save">
        <Button type="primary" @click="add">修改</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Select, Option } from "iview";
export default {
  components: {
    Select,
    Option
  },
  data() {
    return {
      params: {
        id: null,
        content: "",
        type: "",
        versionId: null,
        versionName: "",
        versionNumber: "",
        downloadPath: ""
      },
      cityList: [
        {
          value: 1,
          label: "IOS"
        },
        {
          value: 2,
          label: "安卓"
        }
      ]
    };
  },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/versionManagement/home",
                title: "版本管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios
      .post(api.versiondetail, {
        id
      })
      .then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.params.id = ret.id;
          this.params.content = ret.content;
          this.params.type = ret.type;
          this.params.versionId = ret.versionId;
          this.params.versionName = ret.versionName;
          this.params.versionNumber = ret.versionNumber;
          this.params.downloadPath = ret.downloadPath;
        } else {
          this.$Message.info("查询数据失败");
        }
      });
  },
  methods: {
    add() {
      this.$axios.post(api.versionupdate, this.params).then(res => {
        if (res.data.code) {
          this.$Message.info("修改成功");
          setTimeout(() => {
            this.$router.push({
              name: "versionManagementHome"
            })
          }, 800)
        }
      });
    },
    back() {
      this.$router.push({
        name: "versionManagementHome"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.add {
  width: 98%;
  padding: 10px;
  margin-left: 1%;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;
      .info {
        min-width: 100px;
      }
    }
    .save {
      width: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 0 auto;
    }
  }
}
</style>
