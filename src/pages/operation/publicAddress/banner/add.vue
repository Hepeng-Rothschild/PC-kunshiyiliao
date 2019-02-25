<template>
  <!--Banner-->
  <div class="i_addBanner">
    <div class="i_addBanner_main">
      <!--banner名称-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>banner名称</span>
        </div>
        <div class="input">
          <Input v-model.trim="title" placeholder="医院大图" style="width: 360px"/>
        </div>
      </div>
      <!--banner图片-->
      <div class="main_imgs">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
          <span>banner图片</span>
        </div>
        <div class="input">
          <div class="demo-upload-list" v-for="(item,index) in uploadList" :key='index'>
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
      <!--banner链接-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
          <span>banner链接</span>
        </div>
        <div class="input">
          <Input v-model.trim="lianjie" placeholder="无" style="width: 360px"/>
        </div>
      </div>
      <!--排序-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <div class="input">
          <Input v-model.trim="isort" placeholder style="width: 100px" @on-keyup="proxy"/>
        </div>
      </div>
      <!--是否显示-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
          <span>显示</span>
        </div>
        <iSwitch v-model.trim="switch1"/>
      </div>
      <!--是否可点击-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
          <span>是否可点击</span>
        </div>
        <iSwitch v-model.trim="switch2"/>
      </div>
      <!--保存-->
      <div class="save">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import code from "@/config/base.js";
import api from "@/api/commonApi";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
  data() {
    return {
      title: "",
      lianjie: "",
      isort: "",
      switch1: true,
      switch2: true,
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      id:"",
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.wxBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: ""
    };
  },
  created() {
      let iv = store.state.iv;
      let salt = store.state.salt;
      this.id = aesUtils.decrypt(salt,iv,"wxAppid",localStorage.getItem("appid"))
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
    proxy() {
      if (this.isort <= 0) {
        this.isort = "";
      }
    },
    // 后退
    back() {
      let pageNo = this.$route.query.pageNo;
      // FUNCTIONJS公用 跳转方法
      this.functionJS.queryNavgationTo(this,'/index/operation/banner/list',{pageNo})
    },
    save() {
      let images = "";
      if (this.images !== "") {
        images = this.images;
      }
      let params = {
        appid: this.id,
        bannerName: this.title,
        bannerUrl: this.lianjie,
        priority: this.isort,
        enable: Number(this.switch1),
        imageUrl: images,
        iclick: Number(this.switch2)
      };
      if (params.bannerName == "") {
        this.$Message.info("banner名称不能为空");
      } else {
        this.$axios
          .post(api.wxBannerAdd, params)
          .then(res => {
            if (res.data.message === "success") {
              this.$Message.info("添加成功");
              let pageNo = this.$route.query.pageNo;
              setTimeout(() => {
                // FUNCTIONJS公用 跳转方法
                this.functionJS.queryNavgationTo(this,'/index/operation/banner/list',{pageNo})
              }, 500);
            } else {
              this.$Message.info("添加失败请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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
  .i_addBanner_main {
    width: 80%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    h3 {
      padding-left: 6px;
      border-left: 2px solid skyblue;
    }
    .main_title {
      width: 80%;
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      height: 30px;
      line-height: 30px;
      .main_title_info {
        min-width: 100px;
      }
      .input {
        position: relative;
        width: 400px;
        input {
          display: inline-block;
          width: 100%;
          outline: none;
          text-indent: 5px;
        }
        span {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .main_imgs {
      width: 80%;
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      .main_title_info {
        min-width: 100px;
      }
    }
    .save {
      width: 200px;
      height: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0 auto;
      div:first-child {
        background: #359aff;
      }
      div {
        width: 80px;
        height: 30px;
        background: #c9c9c9;
        border-radius: 20px;
        text-align: center;
        line-height: 30px;
        color: #fff;
      }
    }
  }
}
</style>