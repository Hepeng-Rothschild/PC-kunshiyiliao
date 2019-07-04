<template>
  <!--Banner-->
  <div class="i_addBanner">
    <h2 style="margin:10px 0;font-weight:bold;">修改公众号Banner图</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="banner名称" prop="bannerName">
        <Input
          v-model.trim="formValidate.bannerName"
          placeholder="请输入医院banner图名称"
          style="width: 360px"
        />
      </FormItem>
      <FormItem label="banner图片">
        <div class="input">
          <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <div v-if="item.status === 'finished'">
              <img :src="item.url" />
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
          <Modal title="预览图片" v-model="visible" footer-hide>
            <img :src=" uploadList[0].url " v-if="visible" style="width: 100%" />
          </Modal>
        </div>
      </FormItem>
      <FormItem label="banner链接">
        <Input
          v-model.trim="formValidate.bannerUrl"
          placeholder="请输入banner链接"
          style="width: 360px"
        />
      </FormItem>
      <FormItem label="排序">
        <InputNumber
          :max="99999"
          :min="1"
          v-model.trim="formValidate.priority"
          style="width: 100px"
        ></InputNumber>
      </FormItem>
      <FormItem label="是否显示">
        <iSwitch v-model.trim="formValidate.enable" />
      </FormItem>
      <FormItem label="是否可点击">
        <iSwitch v-model.trim="formValidate.iclick" />
      </FormItem>
    </Form>
    <div class="save">
      <Button type="primary" @click="save('formValidate')">保存</Button>
      <Button @click="back">取消</Button>
    </div>
  </div>
</template>

<script>
import code from "@/configs/base.js";
import api from "@/api/commonApi";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
  data() {
    return {
      id: "",
      formValidate: {
        bannerName: "",
        bannerUrl: "",
        priority: "",
        enable: false,
        iclick: false
      },
      ruleValidate: {
        bannerName: [
          { required: true, message: "请输入公众号banner图名称", trigger: "blur" }
        ]
      },
      imgName: "",
      visible: false,
      defaultList: [],
      uploadList: [],
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.wxBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: "",
      sourceImages: ""
    };
  },
  created() {
    let iv = store.state.iv;
    let salt = store.state.salt;
    this.id = aesUtils.decrypt(
      salt,
      iv,
      "wxAppid",
      localStorage.getItem("appid")
    );
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/publicHosting/index",
        title: "公众号托管"
      },
      {
        path: "/index/operation/publicAddress/list",
        title: "公众号管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  methods: {
    // 后退
    back() {
      let pageNo = this.$route.query.pageNo;
      // FUNCTIONJS公用 跳转方法
      this.functionJS.queryNavgationTo(this, "/index/operation/banner/list", {
        pageNo
      });
    },
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
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
            appid: this.id,
            bannerName: this.formValidate.bannerName.trim(),
            bannerUrl: this.formValidate.bannerUrl,
            priority: this.formValidate.priority,
            id: this.$route.query.id,
            enable: Number(this.formValidate.enable),
            imageUrl: images,
            iclick: Number(this.formValidate.iclick)
          };
          console.log(params);
            this.$axios.post(api.wxBannerEdit, params).then(res => {
              if (res.data.code) {
                this.$Message.info("修改成功");
                let pageNo = this.$route.query.pageNo;
                setTimeout(() => {
                  // FUNCTIONJS公用 跳转方法
                  this.functionJS.queryNavgationTo(
                    this,
                    "/index/operation/banner/list",
                    { pageNo }
                  );
                }, 500);
              } else {
                this.$Message.info("修改失败请重试");
              }
            });
        } else {
          this.$Message.error("请完整填写必填项!");
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
      res = this.uploadFileDecrypt(res);
      file.url = this.fileBaseUrl + res.object[0].fileName;
      this.images = JSON.stringify(res.object[0]);
      file.name = res.object[0].fileName;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: `文件${file.name}过大，文件最大限制为2000KB`
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    let route = this.$route.query.id;
    if (route) {
      this.$axios
        .post(api.wxBannerDetail, {
          id: route
        })
        .then(res => {
          let ret = res.data.object;
          if (ret) {

            this.formValidate.bannerName = ret.bannerName;
            this.formValidate.bannerUrl = ret.bannerUrl;
            this.formValidate.priority = ret.priority;
            this.formValidate.enable = Boolean(ret.enable);
            this.formValidate.iclick = Boolean(ret.iclick);
            //图片
            if (ret.imageUrl) {
              this.sourceImages = ret.imageUrl;
              this.uploadList.push({
                name: "a42bdcc1178e62b4694c830f028db5c0",
                percentage: 100,
                status: "finished",
                uid: 1544263544971,
                url: this.fileBaseUrl + this.pictureFormat(ret.imageUrl)
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped lang="less">
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
.i_addBanner {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .save {
      width: 200px;
      height: 30px;
      margin: 0 auto;
    }
}
</style>