<template>
  <!--Banner-->
  <div class="i_addBanner">
    <tmpHeader style="margin-bottom:10px;" />
    <div class="main">
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
          <iSwitch size="large"  v-model="formValidate.enable" >
              <span slot="open">显示</span>
              <span slot="close">关闭</span>
          </iSwitch>
        </FormItem>
        <FormItem>
          <Button @click="save('formValidate')" type="primary">保存</Button>
          <Button @click="back">取消</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
// 机构banner管理
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import code from "@/configs/base.js";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      formValidate: {
        bannerName: "",
        bannerUrl: "",
        priority: "",
        enable: false
      },
      ruleValidate: {
        bannerName: [
          { required: true, message: "请输入医院banner图名称", trigger: "blur" }
        ]
      },

      imgName: "",
      visible: false,
      id: sessionStorage.getItem("hospitalId"),

      uploadList: [],
      defaultList: [],
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: ""
    };
  },
  created() {
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/mechanism/index",
        title: "机构运营"
      },
      {
        path: "/index/operation/home",
        title: "机构管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  methods: {
    back() {
      let pageNo = this.$route.params.pageNo;
      //functionJS公用跳转方法
      this.functionJS.paramsNavgationTo(this, "iBanner", {
        pageNo
      });
    },
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let images = "";
          if (this.images !== "") {
            images = this.images;
          }
          let params = {
            hospitalId: this.id,
            bannerName: this.formValidate.bannerName.trim(),
            bannerUrl: this.formValidate.bannerUrl,
            priority: this.formValidate.priority,
            enable: Number(this.formValidate.enable),
            imageUrl: images
          };
          console.log(params);
            this.$axios
              .post(api.bannerAdd, params)
              .then(res => {
                if (res.data.message === "success") {
                  this.$Message.info("添加成功");
                  let pageNo = this.$route.params.pageNo;
                  setTimeout(() => {
                    //functionJS公用跳转方法
                    this.functionJS.paramsNavgationTo(this, "iBanner", {
                      pageNo
                    });
                  }, 300);
                } else {
                  this.$Message.info("修改失败请重试");
                }
              })
              .catch(err => {
                console.log(err);
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
        title: "格式错误",
        desc: "文件 " + file.name + " 上传失败,请重试"
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
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
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
  .main {
    width: 70%;
    margin: 0 auto;
  }
}
</style>