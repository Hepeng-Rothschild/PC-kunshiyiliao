<template>
  <div class="add">
    <div class="container">
      <header>
        <div>添加账号</div>
      </header>
      <div class="main">
        <!-- 登录账号 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>登录账号</span>
          </div>
          <input type="text" v-model="text">
        </div>
        <!-- 登录密码 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>登录密码</span>
          </div>
          <input type="password" v-model="pass">
        </div>
        <!-- 用户姓名 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户姓名</span>
          </div>
          <input type="text" placeholder="请填写身份证上的名字" v-model="name">
          <div class="sex">
            <span style="color:red;">*</span>
            <span style="margin-right:20px;">性别</span>
            <input type="radio" name="sex" id="boy" v-model="sex" value="0">
            <label for="boy">男</label>
            <input type="radio" name="sex" id="griy" v-model="sex" value="1">
            <label for="griy">女</label>
          </div>
        </div>
        <!-- 联系电话 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>联系电话</span>
          </div>
          <input type="text" placeholder="请填写常用手机号码" v-model="phone">
        </div>
        <!-- 机构名称 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称</span>
          </div>
          <select name id v-model="Organizationname">
            <option value="1">中医院</option>
          </select>
        </div>
        <!-- 用户角色 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <select name id v-model="role">
            <option value="1">用户角色</option>
          </select>
        </div>
        <!-- 备注 -->
        <div class="remarks">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>备注</span>
          </div>
          <textarea name id cols="30" rows="10" v-model="remarks"></textarea>
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
import api from "@/api/commonApi";
export default {
  data() {
    return {
      text: "",
      pass: "",
      sex: "",
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
        remarks: this.remarks,
        //性别
        sex: this.sex
      }
      if (this.text == "") {
        this.$Message.info("账号不能为空");
      } else if (this.pass == "") {
        this.$Message.info("密码不能为空");
      } else if (this.name == "") {
        this.$Message.info("姓名不能为空");
      } else if (this.phone == "") {
        this.$Message.info("手机号码不能为空");
      } else if (this.Organizationname == "") {
        this.$Message.info("机构名称不能为空");
      } else if (this.sex == "") {
        this.$Message.info("请选择性别");
      } else {
        this.$Message.info("添加成功");
        // console.log(params);
        
      }
    }
  }
};
</script>
<style lang="less" scoped>
.add {
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
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .pass {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        .left {
          width: 100px;
        }
        select {
          display: inline-block;
          width: 100px;
          line-height: 30px;
          outline: none;
          border-radius: 4px;
        }
        input {
          display: inline-block;
          line-height: 30px;
          width: 400px;
          
          outline: none;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          text-indent: 5px;
        }
        .sex {
          margin: 0 20px;
          input {
            width: 15px;
            height: 15px;
          }
        }
      }
      .remarks {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        .left {
          width: 100px;
        }
        textarea {
          display: inline-block;
          outline: none;
          text-indent: 10px;
          width: 400px;
        }
      }
      .save {
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px auto;
        div {
          width: 100px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
        }
        div:first-child {
          background: #fff;
          border: 1px solid #cacaca;
          border-radius: 4px;
        }
        div:last-child {
          background: #3399ff;
          color: #fff;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>

