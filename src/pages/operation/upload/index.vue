<template>
  <div class="doctorreviewedit">
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      name="file"
      :data="jsonObj"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      :headers="fromData"
      type="drag"
      :action="uploadUrl"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img
        :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
        v-if="visible"
        style="width: 100%"
      >
    </Modal>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar, Upload } from "iview";
import code from "@/config/base.js";
export default {
  data() {
    return {
      defaultList: [
        {url:"https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"}
      ],
      imgName: "",
      visible: false,
      uploadList: [],
      uploadUrl:api.fileAll,
      jsonObj:{json:'{"urlCode":"'+ code.urlCode.hospitalBanner +'"}'},
      count:5,
      maxSize:5, //单位kb
    };
  },
  components:{
      Upload
  },
  methods: {
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
        console.log("上传成功");
        file.url = this.fileBaseUrl+res.object[0].fileName;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传格式不正确",
        desc:`文件${file.name}的格式不正确，请上传jpg/jpeg/png格式图片`
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: `文件大小超出限制`,
        desc: `文件${file.name}过大，文件最大限制${this.maxSize}KB`
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.count;
      if (!check) {
        this.$Notice.warning({
          title: `最多上传${this.count}张图片`
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style lang="less" scoped>
.doctorreviewedit {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
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
}
</style>