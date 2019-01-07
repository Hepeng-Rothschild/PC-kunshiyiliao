<template>
  <div class="addNews">
    <!--<tmpHeader />-->
    <div class="main">
      <!--新闻标题-->
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>新闻标题</span>
        </div>
        <div class="input">
          <Input v-model.trim="title" placeholder="请输入新闻标题" style="width: 400px" :maxlength="30"/>
          <span>{{ title.length }}/30</span>
        </div>
      </div>
      <div class="main_title">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>副标题</span>
        </div>
        <div class="input">
          <Input v-model.trim="titles" placeholder="请输入新闻副标题" style="width: 400px" :maxlength="30"/>
          <span>{{ titles.length }}/30</span>
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
            <img :src="fileBaseUrl + item.url">
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
          accept="image/jpeg, image/x-png, image/gif"
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
        <p>添加标题首图</p>
      </div>
      <!--栏目-->
      <div class="lanmu">
        <div class="listImgTitle">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>栏目</span>
        </div>
        <select v-model="select">
          <option value="1">头条</option>
          <option value="2">今日热点</option>
          <option value="3">医学前沿</option>
          <option value="4">宝宝喂养</option>
          <option value="5">科普</option>
          <option value="6">决策者说</option>
        </select>
      </div>
      <!--新闻内容-->
      <div class="main_content">
        <div class="main_title_info">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>新闻内容</span>
        </div>
        <div class="shuru">
          <vueEditor
            id="contentEdit"
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
        <Input
          v-model.trim="isource"
          placeholder="请输入新闻的来源,未填写显示未知"
          style="width: 400px"
        />
      </div>
      <!--排序-->
      <div class="main_sort">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <Input
          v-model.trim="isort"
          style="width: 100px"
        />
        <p>备注:只能填写数字,1代表置顶以此类推</p>
      </div>
      <!--是否显示-->
      <div class="main_ishow">
        <div class="main_title_info">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否显示</span>
        </div>
        <iSwitch v-model.trim="switch1"/>
      </div>
      <!--保存-->
      <div class="save">
        <div @click="save" style="cursor:pointer;">保存</div>
        <div @click="back" style="cursor:pointer;">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/commonApi";
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import vueEditor from "@/components/vueEditor";
import code from "@/config/base.js";
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
      defaultList: [],
      imgName: "",
      id: sessionStorage.getItem("hospitalId"),
      info: {
        content: ""
      },
      select: 1,

      visible: false,
      uploadList: [],
      switch1: true,

      uploadData: { json: '{"urlCode":"' + code.urlCode.patientNews + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,

      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',

      images: "",
      source: "",
      titles: ""
    };
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    let id = this.$route.params.id;
    if (id) {
      this.$axios
        .post(api.getWrap, {
          id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            let detail = ret.operateArticle;

            if (detail.cover) {
              this.uploadList = [];
              this.source = detail.cover;
              this.uploadList.push({
                name: "a42bdcc1178e62b4694c830f028db5c0",
                percentage: 100,
                status: "finished",
                uid: 1544263544970,
                url: this.analysisImages(detail.cover)
              });
            }
            //标题
            this.title = detail.title;
            this.titles = detail.synopsis || "";
            this.isource = detail.source;
            this.num = detail.priority;
            this.switch1 = Boolean(detail.enable);
            this.isort = detail.priority;
            this.info.content = detail.content;
          }
        });
    }
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.uploadList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = res.object[0].fileName;
      this.images = JSON.stringify(res.object[0]);
      file.name = res.object[0].fileName;
    },
    handleFormatError(file) {
      // console.log(file);
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
    back() {
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "contentmanagementHome",
        params: {
          pageNo
        }
      });
    },
    save() {
      let images = "";
      if (this.images && this.uploadList.length) {
        images = this.images;
      } else if (this.uploadList.length) {
        images = this.source;
      } else {
        images = "";
      }

      let params = {
        //栏目
        ids: [this.select],
        operateArticle: {
          //标题
          title: this.title,
          // 副标题
          synopsis: this.titles,
          //图片
          cover: images,
          //排序
          priority: this.isort,
          //内容
          content: this.info.content,
          //够源
          source: this.isource,
          //显示
          enable: Number(this.switch1),
          //新闻资讯ID
          id: this.$route.params.id
        }
      };
      if (this.title == "") {
        this.$Message.info("新闻标题不能为空");
      } else if (this.info.content == "") {
        this.$Message.info("新闻内容不能为空");
      } else {
        this.$axios
          .post(api.changeWrap, params)
          .then(res => {
            if (res.data.code) {
              this.$Message.info("修改成功");
              let pageNo = this.$route.params.pageNo;
              setTimeout(() => {
                this.$router.push({
                  name: "contentmanagementHome",
                  params: {
                    pageNo
                  }
                });
              }, 500);
            } else {
              this.$Message.info("修改失败请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
        // console.log(params);
      }
    },
    afterChange(val) {
      this.info.content = val;
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
    .lanmu {
      margin: 10px 0;
      display: flex;
      flex-direction: row;
      line-height: 30px;
      .listImgTitle {
        width: 100px;
        margin-right: 10px;
      }
      select {
        width: 120px;
        outline: none;
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