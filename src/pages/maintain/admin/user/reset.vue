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
        <!-- 账号昵称 -->
        <!-- <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>账号昵称</span>
          </div>
          <Input placeholder="账号昵称" style="width: 300px" v-model.trim="params.niceName"/>
        </div>-->
        <!-- 旧的密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>旧的密码</span>
          </div>
          <Input
            type="password"
            placeholder="请输入历史密码信息"
            style="width: 300px"
            v-model.trim="params.pass"
            :maxlength="16"
          />
        </div>
        <!-- 重置密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>新密码</span>
          </div>
          <Input
            type="password"
            placeholder="请输入新密码"
            style="width: 300px"
            v-model.trim="params.newPass"
            :maxlength="16"
          />
        </div>
        <p class="info">密码必须包含数字,大小写字母长度不低于6位</p>
        <!-- 确认密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>确认密码</span>
          </div>
          <Input
            type="password"
            placeholder="请确认密码"
            style="width: 300px"
            v-model.trim="params.inewPass"
            :maxlength="16"
          />
        </div>
        <p class="info">密码必须包含数字,大小写字母长度不低于6位</p>
        <!-- 保存 -->
        <div class="save">
          <Button type="primary" @click="save">保存</Button>
          <Button @click="back">取消</Button>
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
        inewPass: "",
        niceName: ""
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
    save() {
      if (this.params.user == "") {
        this.$Message.info("用户名不能为空");
      } else if (this.params.pass == "") {
        this.$Message.info("旧密码不能为空");
      } else if (this.params.newPass != this.params.inewPass) {
        this.$Message.info("两次密码不一致");
      } else if (this.params.newPass == "") {
        this.$Message.info("新密码不能为空");
      } else {
        this.$Message.info("重置成功");
        let pageNo = this.$route.query.pageNo;
        setTimeout(() => {
           //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/admin/user/list",
                {
                    pageNo
                }
            );
        }, 800);
      }
    },
    back() {
      let pageNo = this.$route.query.pageNo;
      //   公用方法
      this.functionJS.queryNavgationTo(
          this,
          "/index/maintain/admin/user/list",
          {
              pageNo
          }
      );
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
          width: 100px;
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
        width: 300px;
        margin: 0 auto;
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

