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
        <button @click="next">下一步</button>
        <span @click="prev">返回重新上传</span>
      </div>
      <!-- 列表 -->
      <div class="list" v-show = 'list.length'>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>编号</th>
            <th>医生姓名</th>
            <th>医院名称</th>
            <th>医生手机号码</th>
            <th>错误提示</th>
          </tr>
          <tr v-for="item in list">
            <th>编号</th>
            <th>{{ item.doctorName }}</th>
            <th>{{ item.hospitalName }}</th>
            <th>{{ item.phone }}</th>
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
      this.$router.push({
        name: "mechanismregeditbatchthree",
        params:{
          success,
          error
        }
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
      button {
        width: 150px;
        height: 30px;
        border: none;
        outline: none;
        background: #2d8cf0;
        border-radius: 4px;
        color: #fff;
      }
      span {
        color: red;
        cursor: pointer;
      }
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
          background: #9dcae4;
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
