<template>
  <div class="reset">
    <div class="container">
      <header>
        <div>重置密码</div>
      </header>
      <div class="main">
        <!-- 登录账号 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>登录账号</span>
          </div>
          <Input placeholder="请输入登录账号" style="width: 300px" v-model.trim="params.user"/>
        </div>
        <p class="info">登录账号不建议与用户姓名相同</p>
        <!-- 旧的密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>旧的密码</span>
          </div>
          <Input placeholder="请输入历史密码信息" style="width: 300px" v-model.trim="params.pass"/>
        </div>
        <!-- 重置密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>新密码</span>
          </div>
          <Input placeholder="请输入新密码" style="width: 300px" v-model.trim="params.newPass"/>
        </div>
        <p class="info">密码必须包含数字,大小写字母长度不低于6位</p>
        <!-- 确认密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>确认密码</span>
          </div>
          <Input placeholder="请确认密码" style="width: 300px" v-model.trim="params.inewPass"/>
        </div>
        <p class="info">密码必须包含数字,大小写字母长度不低于6位</p>
        <!-- 保存 -->
        <div class="save">
          <Button @click="back">取消</Button>
          <Button type="primary" @click="save">保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      params: {
        user: "",
        pass: "",
        newPass: "",
        inewPass: ""
      }
    };
  },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/admin/user/list",
                title: "账号管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
  methods: {
    save() {},
    back() {
      this.$router.push({
        name: "adminlist"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.reset {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    header {
      div {
        font-size: 18px;
      }
    }
    .main {
      width: 100%;
      margin: 20px auto;
      display: flex;
      flex-direction: column;

      .item {
        width: 500px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px auto;
        .item-left {
          width: 150px;
          span {
            width: 30px;
          }
        }
        input {
          display: inline-block;
          width: 400px;
          border-radius: 4px;
          border: 1px solid #ddd;
          text-indent: 10px;
          line-height: 40px;
          background: #fff;
          outline: none;
        }
      }
      .info {
        text-align: center;
        color: #999;
      }
      .save {
        display: flex;
        flex-direction: row;
        width: 300px;
        justify-content: space-around;
        margin: 20px auto;
        div:last-child {
          background: skyblue;
        }
        div {
          width: 80px;
          height: 30px;
          border-radius: 4px;
          background: #ddd;
          text-align: center;
          line-height: 30px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

