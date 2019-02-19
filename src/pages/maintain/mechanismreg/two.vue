<template>
  <div class="two">
    <div class="container">
      <!-- 进度条tab -->
      <tmptab :active="1"></tmptab>
      <!-- 可传入数据 -->
      <div class="info">
        <span>本次可导入</span>
        <span>数据:{{ all.success }}条</span>
      </div>
      <!-- 不可传入数据 -->
      <div class="info">
        <span>本次不可导入</span>
        <span>数据:{{ list.length }}条</span>
      </div>
      <div class="next">
        <Button type="primary" @click="next">下一步</Button>
        <Button @click="prev">返回重新上传</Button>
      </div>
      <!-- 列表 -->
      <div class="list" v-show="list.length">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>编号</th>
            <th>机构等级</th>
            <th>机构名称</th>
            <th>机构组织代码</th>
            <th>错误提示</th>
          </tr>
          <tr v-for="item,index in list">
            <th>{{ index+1 }}</th>
            <th>{{ item.grade }}</th>
            <th>{{ item.hospitalName }}</th>
            <th>{{ item.orgCode }}</th>
            <th>{{ item.errorPrompt }}</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Upload } from "iview";
import tmptab from "./tmptab";
export default {
  components: {
    Upload,
    tmptab
  },
  data() {
    return {
      list: [],
      all: {}
    };
  },
  created() {
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/maintain/indexManagement/index",
        title: "索引管理"
      },
      {
        path: "/index/maintain/mechanismreg/list",
        title: "机构注册信息"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  mounted() {
    let fail = this.$route.params.fail;
    if (fail) {
      this.all = fail;
      this.list = fail.fail;
    }
  },
  methods: {
    //   下一步
    next() {
      let fail = this.$route.params.fail;
      let success = fail.success;
      let error = fail.fail.length;
      // functionJS公用 方法
      this.functionJS.paramsNavgationTo(this, "mechanismregeditbatchthree", {
        success,
        error
      });
    },
    //   上一步
    prev() {
      this.$router.back();
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
    .next {
    }
    .list {
      width: 80%;
      margin: 10px auto;
      table {
        border: 1px solid #ddd;
        width: 100%;

        tr:nth-child(odd) {
          background: #f8f8f9;
        }
        tr:nth-child(even) {
          background: #fff;
        }
        tr:not(:first-child):hover {
          background: #ebf7ff;
        }
        tr {
          border-top: 1px solid #ddd;
          height: 40px;
          th {
            text-align: center;
          }
        }
      }
      .notData {
        width: 100%;
        text-align: center;
        border: 1px solid black;
        border-top: none;
      }
    }
  }
}
</style>
