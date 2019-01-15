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
          <Input v-model.trim="text" placeholder="请输入登录账号" style="width: 300px"/>
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
            :maxlength="16"
          />
        </div>
        <!-- 用户昵称 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户昵称</span>
          </div>
          <Input v-model.trim="niceName" placeholder="请设置用户昵称" style="width: 300px"/>
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
        <!-- <div class="pass">
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
        </div>-->
        <!-- 联系电话 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>联系电话</span>
          </div>
          <iSwitch v-model="switch1" size="large">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </iSwitch>
        </div>
        <!-- 机构名称 -->
        <!-- <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称</span>
          </div>
          <Select v-model="Organizationname" style="width:150px">
            <Option v-for="item in hosipal" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>-->
        <!-- 用户角色 -->
        <!-- <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <Select v-model="role" style="width:150px">
            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>-->
        <!-- 备注 -->
        <!-- <div class="remarks">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>备注</span>
          </div>
          <Input v-model="remarks" type="textarea" :rows="4"/>
        </div>-->
        <!-- 保存 -->
        <div class="save">
          <Button type="primary" @click="save">添加</Button>
          <Button @click="back">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/config/base.js";
import { Select, Option, RadioGroup, Radio, Upload, Icon, Switch } from "iview";
export default {
  components: {
    Select,
    Option,
    RadioGroup,
    Radio,
    Upload,
    Icon,
    iSwitch: Switch
  },
  data() {
    return {
      switch1:true,
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
      sex: "",
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
      // //用户角色列表
      roleList: [
        {
          value: "New York",
          label: "New York"
        }
      ],
      readonly: true,
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      id: sessionStorage.getItem("appid"),
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.userImage + '"}' },
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
    })
  },
  methods: {
    save() {
      let images = "";
      // 上传
      if (this.images != "") {
        images = this.images;
      } else if (this.sourceImages != "" && this.uploadList.length) {
        images = this.sourceImages;
        // 默认
      } else {
        images = "";
      }
      let params = {
        // 账号
        userName: this.text,
        //密码
        passWord: this.pass,
        // 用户昵称
        nickName: this.niceName,
        status: Number(this.switch1),
        // 用户头像
        userIcon: images
      };
      if (this.text == "") {
        this.$Message.info("账号不能为空");
      } else if (this.pass == "") {
        this.$Message.info("密码不能为空");
      } else if (params.niceName == "") {
        this.$Message.info("昵称不能为空");
      } else {
        this.$axios.post(api.adminAdd, params).then(res => {
          if (res.data.code) {
            this.$Message.info("添加成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.$router.push({
                name: "adminlist",
                params: {
                  pageNo
                }
              });
            }, 800);
          } else {
            this.$Message.info("添加失败,请稍候重试");
          }
        });
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
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
    },
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return json.fileName;
      } catch (error) {
        return "";
      }
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
        width: 600px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px auto;
        .left {
          width: 100px;
        }
        .sex {
          margin: 0 20px;
          input {
            width: 15px;
            height: 15px;
          }
        }
      }
      .main_imgs {
        display: flex;
        width: 600px;
        flex-direction: row;
        margin: 10px auto;
        align-items: center;
        .main_title_info {
          min-width: 100px;
        }
      }
      .remarks {
        display: flex;
        width: 600px;
        flex-direction: row;
        margin: 10px auto;
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

