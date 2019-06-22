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
          <Input v-model.trim="title" placeholder="请输入新闻标题" style="width: 350px" :maxlength="30" />
          <span>{{ title.length }}/30</span>
        </div>
      </div>
      <!--添加大图-->
      <div class="main_imgs">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>添加首图</span>
        </div>
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
        <Modal title="预览图片" v-model="visible" footer-hide>
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
        <Input v-model.trim="isource" placeholder="请输入新闻的来源" style="width: 300px"/>
      </div>
      <!--排序-->
      <div class="main_sort">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <!-- <Input v-model.trim="isort" style="width: 100px"/> -->
        <InputNumber :max="99999" :min="1" v-model.trim="isort" style="width: 100px" placeholder="无"></InputNumber>
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
        <Button type="primary" @click="save">保存</Button>
          <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/commonApi";
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import vueEditor from "@/components/vueEditor";
import code from "@/configs/base.js";
export default {
  components: {
    tmpHeader,
    vueEditor
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
      info: {
        content: ""
      },
      uploadModal: true,
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      uploadData: {
        json: '{"urlCode":"' + code.urlCode.hospitalDynamicNews + '"}'
      },
      images: "",
      id: sessionStorage.getItem("hospitalId"),
      source: "",
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}'
    };
  },
  created(){
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
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    let item = this.$route.params.id;
    if (item) {
      this.$axios
        .post(api.getNews, {
          hospitalId: this.id,
          id: item
        })
        .then(res => {
          if (res.data.object) {
            let ret = res.data.object;
            this.title = ret.title;
            this.info.content = ret.content;
            this.isource = ret.source;
            this.isort = ret.priority;
            this.switch1 = Boolean(ret.enable);
            if (ret.newsHeadlines) {
              this.uploadList.push({
                name: "a42bdcc1178e62b4694c830f028db5c0",
                percentage: 100,
                status: "finished",
                uid: 1544263544970,
                url: this.analysisImages(ret.newsHeadlines)
              });
              this.source = ret.newsHeadlines;
              this.img = ret.newsHeadlines;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    afterChange(val) {
      this.info.content = val;
    },
    chan(e) {
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
      let images = "";
      if (this.images != "" && this.uploadList.length) {
        images = this.images;
      } else if (this.uploadList.length) {
        images = this.source;
      } else {
        images = "";
      }
      params = {
        content: this.info.content,
        enable: Number(this.switch1),
        hospitalId: this.id,
        priority: this.isort,
        source: this.isource,
        title: this.title.trim(),
        id: this.$route.params.id
      };
      params.newsHeadlines = images;
      if (this.title == "") {
        this.$Message.info("新闻标题不能为空");
      } else if (this.info.content == "") {
        this.$Message.info("新闻内容不能为空");
      } else if (params.newsHeadlines == "") {
        this.$Message.info("新闻首图不能为空");
      } else {
        this.$axios
          .post(api.addNews, params)
          .then(res => {
            if (res.data) {
              this.$Message.info("修改成功");
              let pageNo = this.$route.params.pageNo;
              setTimeout(() => {
                setTimeout(() => {
                  this.functionJS.paramsNavgationTo(this, "operationNews", {
                    // 公用方法
                    pageNo
                  }); 
                }, 500);
              });
            } else {
              this.$Message.info("修改失败请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.functionJS.paramsNavgationTo(this, "operationNews", {
        // 公用方法
        pageNo
      }); 
    },
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return this.fileBaseUrl + json.fileName;
      } catch (error) {
        return "";
      }
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
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 10px auto;
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
        input {
          display: inline-block;
          width: 100%;
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
        background: #2d8cf0;
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