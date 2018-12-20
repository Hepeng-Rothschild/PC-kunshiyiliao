<template>
  <div class="edit">
    <div class="container">
      <header>
        <div>添加账号</div>
      </header>
      <div class="main">
        <!-- 登录账号 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>登录账号</span>
          </div>
          <input type="text" v-model="text">
        </div>
        <!-- 登录密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>登录密码</span>
          </div>
          <input type="password" v-model="pass">
        </div>
        <!-- 用户姓名 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>用户姓名</span>
          </div>
          <input type="text" v-model="name">
        </div>
        <p class="info">请填写身份证上的名字</p>
        <!-- 联系电话 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>联系电话</span>
          </div>
          <input type="text" v-model="phone">
        </div>
        <p class="info">请填写常用手机号码</p>
        <!-- 机构名称 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>机构名称</span>
          </div>
          <select name id v-model="Organizationname">
            <option value="1">蚌埠中医院</option>
          </select>
        </div>
        <p class="info">请填写系统使用机构名称</p>
        <!-- 用户角色 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <select name id v-model="role">
            <option value="1">运营人员</option>
          </select>
        </div>
        <!-- 备注 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span>备注</span>
          </div>
          <textarea name id cols="30" rows="10">{{ remarks }}</textarea>
        </div>
        <!-- 保存 -->
        <div class="save">
          <div @click="$router.back()">取消</div>
          <div @click="save">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      pass: "",
      name: "",
      phone: "",
      // 机构名称
      Organizationname: "",
      //用户角色
      role: "",
      // 备注
      remarks: ""
    };
  },
  methods: {
    save() {
      let params = {
        // 账号
        text: this.text,
        //密码
        pass: this.pass,
        //姓名
        name: this.name,
        //手机
        phone: this.phone,
        //机构名称
        Organizationname: this.Organizationname,
        //用户角色
        role: this.role,
        //备注
        remarks: this.remarks
      };
      if (this.text == "") {
        this.$Message.info("账号不能为空");
      } else if (this.pass == "") {
        this.$Message.info("密码不能为空");
      } else if (this.name == "") {
        this.$Message.info("姓名不能为空");
      } else if (this.phone == "") {
        this.$Message.info("手机号不能为空");
      } else if (this.Organizationname == "") {
        this.$Message.info("机构名称不能为空");
      } else if (this.role == "") {
        this.$Message.info("用户角色不能为空");
      } else {
        this.$Message.info("添加成功");
        // console.log(params);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.edit {
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
        border-left: 2px solid blue;
        padding-left: 10px;
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
        textarea {
          display: inline-block;
          width: 400px;
          border-radius: 4px;
          border: 1px solid #ddd;
          outline: none;
        }
        select {
          width: 100px;
          line-height: 30px;
          border-radius: 4px;
          outline: none;
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
          border: 1px solid #ddd;
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

