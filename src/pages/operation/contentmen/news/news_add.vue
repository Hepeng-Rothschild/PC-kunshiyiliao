<template>
  <div class="addNews">
    <tmpHeader/>
    <div class="main">
      <!--新闻标题-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>新闻标题</span>
        </div>
        <div class="input">
          <input type="text" placeholder="请输入新闻标题" maxlength="30" v-model="title">
          <span>{{ title.length }}/30</span>
        </div>
      </div>
      <!--添加大图-->
      <div class="main_imgs">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>添加首图</span>
        </div>
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
          :max-size="2048"
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
        <p>添加标题首图</p>
      </div>
      <!--新闻内容-->
      <div class="main_content">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>新闻内容</span>
        </div>
        <div class="shuru">
          <vueEditor
              id="editor_id"
              :textHtml="info.content"
              :urlCode="urlCode"
              @valueHandle="afterChange"
          ></vueEditor>
        </div>
      </div>
      <!--新闻来源-->
      <div class="main_source">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>新闻来源</span>
        </div>
        <input type="text" placeholder="请输入新闻的来源" v-model="isource">
      </div>
      <!--排序-->
      <div class="main_sort">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <input type="text" v-model="isort">
        <p>备注:只能填写数字,1代表置顶以此类推</p>
      </div>
      <!--是否显示-->
      <div class="main_ishow">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否显示</span>
        </div>
        <iSwitch v-model="switch1" @on-change="change"/>
      </div>
      <!--保存-->
      <div class="save">
        <div @click="save" style="cursor:pointer">保存</div>
        <div @click="back" style="cursor:pointer">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/commonApi";
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import vueEditor from "@/components/vueEditor";
import { Switch, Upload, Icon } from "iview";
export default {
  components: {
    tmpHeader,
    vueEditor,
    iSwitch: Switch,
    Upload,
    Icon
  },
  data() {
    return {
      title: "",
      isort: "",
      isource: "",
      id: "tinymce-editor",
      height: 200,
      tinymceHtml: "",
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      switch1: true,
      info:{
        content:""
      },
      uploadModal: true,
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      uploadData: { json: '{"urlCode":"9998"}' },
      images: "",
      id: sessionStorage.getItem("hospitalId"),
      urlCode: '{"urlCode":"9990"}',
    };
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    afterChange(val) {
      this.info.content = val;
    },
    chan(e) {
      // console.log(e);
    },
    valueHandle(param) {
      this.tinymceHtml = param;
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
      file.url = this.fileBaseUrl + res.object[0].fileName;
      this.images = JSON.stringify(res.object[0]);
      file.name = res.object[0].fileName;
    },
    handleFormatError(file) {
      this.$Message.info("文件" + file.name + "上传失败");
    },
    handleMaxSize(file) {
      this.$Message.info("文件" + file.name + "过大");
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      }
      return check;
    },
    change(status) {
      //              this.$Message.info('开关状态：' + status);
    },
    save() {
      let params = {};
      let num = 1;
      if (!this.switch1) {
        num = 0;
      }
      let images = "";
      if (this.uploadList.length) {
        images = this.images;
      }
      params = {
        content: this.info.content,
        enable: num,
        hospitalId: this.id,
        priority: this.isort,
        source: this.isource,
        title: this.title
      };
      params.newsHeadlines = images;
      // console.log(params);
      if (this.title == "") {
        this.$Message.info("新闻标题不能为空");
      } else if (this.info.content == "") {
        this.$Message.info("新闻内容不能为空");
      } else if (params.newsHeadlines == "") {
        this.$Message.info("新闻首图不能为空");
      } else {
        // 添加
        this.$axios
          .post(api.newsA, params)
          .then(res => {
            if (res.data.code) {
              let pageNo = this.$route.params.pageNo;
              this.$Message.info("添加成功");
              setTimeout(() => {
                setTimeout(() => {
                  this.$router.push({
                    name: "operationNews",
                    params: {
                      pageNo
                    }
                  });
                }, 500);
              });
            } else {
              this.$Message.info("添加失败请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    back() {
	  let pageNo = this.$route.params.pageNo;
	  // console.log(pageNo);
      this.$router.push({
        name: "operationNews",
        params: {
          pageNo
        }
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
.addNews {
  width: 100%;
  .main {
    width: 80%;
    border: 1px solid #f2f2f2;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 30px 0;
    .main_title {
      width: 100%;
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
        border: 1px solid #ddd;
        border-radius: 4px;
        input {
          display: inline-block;
          width: 88%;
          border: none;
          background: none;
          text-indent: 4px;
          outline: none;
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
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      height: 100px;
      align-items: center;
      width: 100%;
      .main_title_info {
        min-width: 100px;
      }
      p {
        margin-left: 15px;
      }
    }
    .main_content {
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      width: 100%;
      .main_title_info {
        min-width: 100px;
      }
      .shuru {
        div {
          margin: 0;
        }
      }
    }
    .main_source {
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      width: 100%;
      .main_title_info {
        min-width: 100px;
      }
      input {
        width: 400px;
        outline: none;
      }
    }
    .main_sort {
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      width: 100%;
      .main_title_info {
        min-width: 100px;
      }
      input {
        width: 100px;
        outline: none;
      }
      p {
        margin: 0 15px;
      }
    }
    .main_ishow {
      display: flex;
      flex-direction: row;
      margin: 10px auto;
      width: 100%;
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