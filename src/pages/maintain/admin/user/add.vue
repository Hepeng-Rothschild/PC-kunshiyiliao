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
          <Input v-model.trim="text" placeholder="请设置登录账号" style="width: 300px" :readonly="true"/>
        </div>
        <!-- 登录密码 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>登录密码</span>
          </div>
          <Input
            v-model.trim="pass"
            placeholder="请设置登录密码"
            style="width: 300px"
            type="password"
            :readonly="true"
          />
        </div>
        <!-- 用户姓名 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户姓名</span>
          </div>
          <Input v-model.trim="name" placeholder="请填写身份证上的名字" style="width: 300px"/>
          <div class="sex">
            <span style="color:red;">*</span>
            <span style="margin-right:20px;">性别</span>
            <RadioGroup v-model="sex">
              <Radio label="boy">男</Radio>
              <Radio label="griy">女</Radio>
            </RadioGroup>
          </div>
        </div>
        <!-- 联系电话 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>联系电话</span>
          </div>
          <Input v-model.trim="phone" placeholder="请填写常用手机号码" style="width: 300px" :maxlength="11"/>
        </div>
        <!-- 机构名称 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称</span>
          </div>
          <Select v-model="Organizationname" style="width:150px">
            <Option v-for="item in hosipal" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!-- 用户角色 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <Select v-model="role" style="width:150px">
            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!-- 备注 -->
        <div class="remarks">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>备注</span>
          </div>
          <Input v-model="remarks" type="textarea" :rows="4"/>
        </div>
        <!-- 保存 -->
        <div class="save">
          <Button @click="back">取消</Button>
          <Button type="primary" @click="save">添加</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Select, Option, RadioGroup, Radio } from "iview";
export default {
  components: {
    Select,
    Option,
    RadioGroup,
    Radio
  },
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
      remarks: "",
      // 机构名称
      hosipal: [
        {
          value: "New York",
          label: "New York"
        }
      ],
      // 用户角色
      roleList: [
        {
          value: "New York",
          label: "New York"
        }
      ]
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
      };
      console.log(this.sex);
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
      }
    },
    back() {
      this.$router.push({
        name: "adminlist"
      });
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

