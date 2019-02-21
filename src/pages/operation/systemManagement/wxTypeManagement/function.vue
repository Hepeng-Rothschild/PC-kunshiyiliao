<template>
  <div class="add">
    <div class="main">
      <h2>{{ title }}</h2>
      <!-- 服务名称 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>服务名称
        </span>
        <Input v-model="params.menuName" placeholder="请输入服务名称" style="width: 300px"/>
      </div>
      <!-- 类型 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>类型
        </span>
        <Select v-model="params.function" style="width:80px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <!-- 服务图标 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>服务图标
        </span>
        <Input v-model="params.menuicon" placeholder="请输入服务图标路径" style="width: 300px"/>
      </div>
      <!-- 排序 -->
      <div class="item">
        <span class="title">
          <span style="color:red;">*</span>排序
        </span>
        <InputNumber :max="999" :min="1" v-model="params.priority"></InputNumber>
      </div>
      <!-- 跳转路径 -->
      <div class="item">
        <span class="title">跳转路径</span>
        <Input v-model="params.path" placeholder="请输入服务路径" style="width: 300px"/>
      </div>
      <!-- 备注 -->
      <div class="item">
        <span class="title">备注</span>
        <Input v-model="params.remark" type="textarea" placeholder="请输入服务备注"/>
      </div>

      <!-- 是否开启 -->
      <div class="item">
        <span class="title">快捷菜单</span>
        <iSwitch v-model="shortcut"/>
      </div>
      <!-- 保存 -->
      <div class="save">
        <Button type="primary" @click="add">添加</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    Select,
    Option
  },
  data() {
    return {
      params: {
        menuName: "",
        priority: 1,
        path: "",
        remark: "",
        menuicon: "",
        function: "",
        level: 1,
        prentId: ""
      },
      shortcut: true,
      title: "",
      cityList: [
        // {
        //   value: "1",
        //   label: "菜单"
        // },
        {
          value: "2",
          label: "功能"
        }
      ]
    };
  },
  mounted() {
    this.params.prentId = this.$route.query.id;
    this.title = this.$route.query.name;
  },
  methods: {
    // 添加新功能
    add() {
      let params = this.params;
      if (
        !params.menuName ||
        !params.function ||
        !params.priority ||
        !params.menuicon
      ) {
        this.$Message.info("请完整填写必填项");
      } else {
        params.shortcut = Number(this.shortcut);
        this.$axios.post(api.systemManagementAdd, params).then(res => {
          if (res.data.code) {
            this.$Message.info("添加成功");
            setTimeout(() => {
               // FunctionJS方法
              this.functionJS.queryNavgationTo(this,'/index/operation/wxTypeManagement/list')
            }, 800);
          } else {
            this.$Message.info("添加失败,请稍候重试");
          }
        });
      }
    },
    // 回到列表
    back() {
       // FunctionJS方法
      this.functionJS.queryNavgationTo(this,'/index/operation/wxTypeManagement/list')
    }
  }
};
</script>
<style lang="less" scoped>
.add {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 100%;
    margin-top: 10px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        display: inline-block;
        min-width: 150px;
        text-align: center;
      }
      margin: 20px 0;
    }
    .save {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
