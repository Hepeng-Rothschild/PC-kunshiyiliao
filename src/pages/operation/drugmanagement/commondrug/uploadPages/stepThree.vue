<template>
  <div class="two">
    <div class="container">
      <tmptab :active="2"></tmptab>
      <!-- 可传入数据 -->
      <div class="info">
        <span>本次可导入</span>
        <span>数据:{{ success }}条</span>
      </div>
      <!-- 不可传入数据 -->
      <div class="info">
        <span>本次不可导入</span>
        <span>数据:{{ error }}条</span>
      </div>
      <div class="btn-group">
        <Button type="primary" @click="uploadsuccess">完成</Button>
      </div>
    </div>
  </div>
</template>
<script>
import tmptab from "./tmptab";
export default {
  components: {
    tmptab
  },
  data() {
    return {
      success: 0,
      error: 0
    };
  },
  created() {
    let breadList = [
        { path: "/index", title: "首页" },
        {
            path: "",
            title: "药品目录管理"
        },
        {
            path: "/index/operation/drugmanagement/commondrug/list",
            title: "统一药品目录维护"
        }
    ];
    this.$emit("changeBreadList", breadList);
  },
  mounted() {
    let fail = this.$route.params;
    if (fail) {
      this.success = fail.success;
      this.error = fail.error;
    }
  },
  methods: {
    uploadsuccess() {
      this.functionJS.paramsNavgationTo(this, "commondrug");
    }
  }
};
</script>
<style lang="less" scoped>
.two {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .info {
      width: 60%;
      background: #fffbf6;
      padding: 20px 30px;
      margin: 20px auto;
    }
    .btn-group {
      width: 300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      .btn {
        width: 100px;
      }
    }
    .btn {
      border: none;
      outline: none;
      background: #2d8cf0;
      width: 150px;
      line-height: 30px;
      color: #fff;
      font-size: 18px;
      margin: 0 auto;
      border-radius: 4px;
    }
  }
}
</style>
