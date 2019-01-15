<template>
  <div class="edit">
    <div class="container">
      <header>
        <div>编辑账号</div>
      </header>
      <div class="main">
        <!-- 登录账号 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>登录账号</span>
          </div>
          <Input v-model.trim="text" placeholder="请输入登录账号" style="width: 300px"/>
        </div>
        <!-- 登录密码 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>登录密码</span>
          </div>
          <Input
            v-model.trim="pass"
            placeholder="请输入登录密码"
            style="width: 300px"
            type="password"
            :maxlength="16"
          />
        </div>
        <!-- 用户昵称 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>用户昵称</span>
          </div>
          <Input v-model.trim="niceName" placeholder="请填写用户昵称" style="width: 300px"/>
        </div>
        <!-- 用户头像 -->
        <div class="main_imgs">
          <div class="main_title_info">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span>用户头像</span>
          </div>
          <div class="input">
            <div class="demo-upload-list" v-for="item in uploadList">
              <div v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </div>
              <div v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </div>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2000"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              :action="uploadUrl"
              :headers="fromData"
              :data="uploadData"
              style="display: inline-block;width:58px;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="预览图片" v-model="visible">
              <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
            </Modal>
          </div>
        </div>
        <!-- 用户姓名 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>用户姓名</span>
          </div>
          <Input v-model.trim="name" placeholder="请填写身份证上的名字" style="width: 300px"/>
        </div>
        <p class="info">请填写身份证上的名字</p>
        <!-- 联系电话 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>联系电话</span>
          </div>
          <Input v-model.trim="phone" placeholder="请填写常用电话号码" style="width: 300px" :maxlength="11"/>
        </div>
        <p class="info">请填写常用手机号码</p>
        <!-- 用户角色 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <Select v-model="role" style="width:150px">
            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!-- 备注 -->
        <div class="item">
          <div class="item-left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span>备注</span>
          </div>
          <Input v-model="remarks" type="textarea" :rows="4"/>
        </div>
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
import code from "@/config/base.js";
import { Select, Option, Upload, Icon } from "iview";
export default {
  components: {
    Select,
    Option,
    Upload,
    Icon
  },
  data() {
    return {
      // 账号
      text: "",
      // 密码
      pass: "",
      // 姓名
      name: "",
      // 手机号码
      phone: "",
      // 昵称
      niceName: "",
      // 机构名称
      Organizationname: "",
      //用户角色
      role: "",
      // 备注
      remarks: "",
      // 机构名称列表
      hospial: [
        {
          value: "New York",
          label: "New York"
        }
      ],
      //用户角色列表
      roleList: [
        {
          value: "New York",
          label: "New York"
        }
      ],
      // 默认列表
      defaultList: [],
      // 图片名称
      imgName: "",
      // modal显示
      visible: false,
      uploadList: [],
      id: sessionStorage.getItem("appid"),
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.wxBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: ""
    };
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    // 关闭input框的自动填充
    setTimeout(() => {
      this.text = "";
      this.pass = "";
    });
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
        // Organizationname: this.Organizationname,
        //用户角色
        role: this.role,
        //备注
        remarks: this.remarks,
        // 用户昵称
        niceName: this.niceName,
        // 用户头像
        images: this.images
      };
      if (this.text == "") {
        this.$Message.info("账号不能为空");
      } else if (this.pass == "") {
        this.$Message.info("密码不能为空");
      } else if (this.name == "") {
        this.$Message.info("姓名不能为空");
      } else if (this.phone == "") {
        this.$Message.info("手机号不能为空");
      } else if (this.role == "") {
        this.$Message.info("用户角色不能为空");
      } else {
        this.$Message.info("修改成功");
        console.log(params);
        // let pageNo = this.$route.params.pageNo;
        // setTimeout(() => {
        //   this.$router.push({
        //     name: "adminlist",
        //     params: {
        //       pageNo
        //     }
        //   });
        // }, 800);
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      console.log(pageNo);
      this.$router.push({
        name: "adminlist",
        params: {
          pageNo
        }
      });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      if (res.code) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传失败",
        desc: "文件格式错误"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: `文件${file.name}过大，文件最大限制为2000KB`
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      }
      return check;
    }
  }
};
</script>
<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
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
      .main_imgs {
        width: 500px;
        display: flex;
        flex-direction: row;
        margin: 10px auto;
        align-items: center;
        .main_title_info {
          min-width: 100px;
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

