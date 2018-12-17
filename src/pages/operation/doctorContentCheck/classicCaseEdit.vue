<template>
  <div class="edit-news">
    <Row>
      <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
    </Row>
    <Form ref="formInline" v-if="info" :model="info" :rules="infoRules" inline>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>医生：
          <FormItem prop="doctorName">
            <Input class="w-input" v-model="info.doctorName" :maxlength="20" placeholder="请输入医生姓名"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>职称：
          <FormItem prop="title">
            <Input class="w-input" v-model="info.title" :maxlength="20" placeholder="请输入职称"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>医院：
          <FormItem prop="hospital">
            <Input class="w-input" v-model="info.hospital" :maxlength="20" placeholder="请输入医院名称"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>科室：
          <FormItem prop="dept">
            <Input class="w-input" v-model="info.dept" :maxlength="20" placeholder="请输入科室名称"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>标题：
          <FormItem prop="articleName">
            <Input class="w-input" v-model="info.articleName" :maxlength="20" placeholder="请输入标题"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>概要：
          <FormItem prop="synopsis">
            <Input class="w-input" v-model="info.synopsis" :maxlength="20" placeholder="请输入概要"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24">
          <i class="req-icon"></i>头像：
          <FormItem prop="headUrl">
            <span class="avatar-box" v-for="(item,index) of headUrlUploadlList" :key="index">
              <template v-if="item.status === 'finished'">
                <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                <div class="avatar-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="headUrlHandleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress
                  v-if="item.showProgress"
                  class="progress"
                  :percent="item.percentage"
                  hide-info
                ></Progress>
              </template>
            </span>
            <Upload
              ref="headUrlUpload"
              name="file"
              :data="headUrlJsonObj"
              :show-upload-list="false"
              :default-file-list="headUrlList"
              :on-success="headUrlHandleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="headUrlMaxSize"
              :on-format-error="headUrlHandleFormatError"
              :on-exceeded-size="headUrlHandleMaxSize"
              :before-upload="headUrlHandleBeforeUpload"
              multiple
              :headers="fromData"
              type="drag"
              :action="uploadUrl"
              style="display: inline-block;width:58px;"
              class="upload-avatar"
            >
              <div style="width: 64px;height:64px;line-height: 64px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>专家介绍：
          <FormItem prop="introduction">
            <editor
              id="introduction"
              height="500px"
              width="700px"
              :content.sync="introductionText"
              pluginsPath="@/../static/kindeditor/plugins/"
              :loadStyleMode="false"
              @on-content-change="introductionOnContentChange"
            ></editor>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>病例详情：
          <FormItem prop="details">
            <editor
              id="details"
              height="500px"
              width="700px"
              :content.sync="detailsText"
              pluginsPath="@/../static/kindeditor/plugins/"
              :loadStyleMode="false"
              @on-content-change="detailsOnContentChange"
            ></editor>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>入院诊断：
          <FormItem prop="diagnosis">
            <editor
              id="diagnosis"
              height="500px"
              width="700px"
              :content.sync="diagnosisText"
              pluginsPath="@/../static/kindeditor/plugins/"
              :loadStyleMode="false"
              @on-content-change="diagnosisOnContentChange"
            ></editor>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>治疗方案：
          <FormItem prop="programme">
            <editor
              id="programme"
              height="500px"
              width="700px"
              :content.sync="programmeText"
              pluginsPath="@/../static/kindeditor/plugins/"
              :loadStyleMode="false"
              @on-content-change="programmeOnContentChange"
            ></editor>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>病例分析：
          <FormItem prop="analysis">
            <editor
              id="analysis"
              height="500px"
              width="700px"
              :content.sync="analysisText"
              pluginsPath="@/../static/kindeditor/plugins/"
              :loadStyleMode="false"
              @on-content-change="analysisOnContentChange"
            ></editor>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24">
          <i class="req-icon"></i>病历资料：
          <FormItem prop="picture">
            <span class="avatar-box" v-for="(item,index) of pictureUploadList" :key="index">
              <template v-if="item.status === 'finished'">
                <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                <div class="avatar-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="pictureHandleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress
                  v-if="item.showProgress"
                  class="progress"
                  :percent="item.percentage"
                  hide-info
                ></Progress>
              </template>
            </span>
            <Upload
              ref="pictureUpload"
              name="file"
              :data="pictureJsonObj"
              :show-upload-list="false"
              :default-file-list="pictureList"
              :on-success="pictureHandleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="pictureMaxSize"
              :on-format-error="pictureHandleFormatError"
              :on-exceeded-size="pictureHandleMaxSize"
              :before-upload="pictureHandleBeforeUpload"
              multiple
              :headers="fromData"
              type="drag"
              :action="uploadUrl"
              style="display: inline-block;width:58px;"
              class="upload-avatar"
            >
              <div style="width: 64px;height:64px;line-height: 64px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24">
          <i class="req-icon"></i>banner图：
          <FormItem prop="bannerImage">
            <span class="avatar-box" v-for="(item,index) of bannerImageUploadList" :key="index">
              <template v-if="item.status === 'finished'">
                <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                <div class="avatar-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="bannerImageHandleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress
                  v-if="item.showProgress"
                  class="progress"
                  :percent="item.percentage"
                  hide-info
                ></Progress>
              </template>
            </span>
            <Upload
              ref="bannerImageUpload"
              name="file"
              :data="bannerImageJsonObj"
              :show-upload-list="false"
              :default-file-list="bannerImageList"
              :on-success="bannerImageHandleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="bannerImageMaxSize"
              :on-format-error="bannerImageHandleFormatError"
              :on-exceeded-size="bannerImageHandleMaxSize"
              :before-upload="bannerImageHandleBeforeUpload"
              multiple
              :headers="fromData"
              type="drag"
              :action="uploadUrl"
              style="display: inline-block;width:58px;"
              class="upload-avatar"
            >
              <div style="width: 64px;height:64px;line-height: 64px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :md="24">
          <i class="req-icon"></i>状态：
          <FormItem prop="enable">
            <Select class="w-select" v-model="info.enable">
              <Option value="0">禁用</Option>
              <Option value="1">启用</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>&nbsp;&nbsp;&nbsp;&nbsp;
    <Button type="primary" @click="submit('formInline')">提交</Button>
    <Button type="primary" @click="reback">返回</Button>
    <Modal title="大图预览" :footer-hide="true" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar, Select, Option } from "iview";
export default {
  components: {
    Avatar,
    Select,
    Option
  },
  data() {
    return {
      // 头像 start
      headUrlList: [],
      headUrlUploadlList: [],
      headUrlSubmitList: [],
      uploadUrl: api.fileAll,
      headUrlJsonObj: { json: '{"urlCode":"205"}' }, //头像:205 病例资料:208  轮播图:209
      headUrlCount: 1,
      headUrlMaxSize: 2028, //单位kb
      // 头像 end
      // 病历资料 start
      pictureList: [],
      pictureUploadList: [],
      pictureSubmitList: [],
      uploadUrl: api.fileAll,
      pictureJsonObj: { json: '{"urlCode":"208"}' }, //头像:205 病例资料:208  轮播图:209
      pictureCount: 9,
      pictureMaxSize: 2028, //单位kb
      // 病历资料 end
      // banner-image start
      bannerImageList: [],
      bannerImageUploadList: [],
      bannerImageSubmitList: [],
      uploadUrl: api.fileAll,
      bannerImageJsonObj: { json: '{"urlCode":"209"}' }, //头像:205 病例资料:208  轮播图:209
      bannerImageCount: 1,
      bannerImageMaxSize: 2028, //单位kb
      // banner-image end
      imgName: "",
      visible: false,

      info: {
        id: null,
        title: "",
        synopsis: "",
        source: "",
        enable: "1",
        headUrl: "",
        type: 1,
        content: "",
        dept: "",
        introduction: "",
        details: "",
        diagnosis: "",
        programme: "",
        analysis: "",
        picture: "",
        bannerImage: ""
      },
      editTt: "",
      id: null,
      tabId: null,
      titleList: [],
      deptList: [],
      hospitalList: [],
      tabList: [{ id: 0, name: "全部" }],
      classicCaseSontab: [],

      introductionText: "请输入要编辑的内容...",
      detailsText: "请输入要编辑的内容...",
      diagnosisText: "请输入要编辑的内容...",
      programmeText: "请输入要编辑的内容...",
      analysisText: "请输入要编辑的内容...",

      infoRules: {
        // title: [
        //   { required: true, message: "标题不能为空", trigger: "blur" }
        // ],
        // synopsis: [{ required: true, message: "概要不能为空", trigger: "blur" }],
        // source: [{ required: true, message: "来源不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    let id = parseInt(this.$route.query.id);
    this.tabId = parseInt(this.$route.query.tabId);
    this.tabList = this.classicCaseSontab;
    if (isNaN(id)) {
      this.editTt = `新增-经典案例`;
    } else {
      this.editTt = `修改-经典案例`;
      this.id = id;
      this.$axios
        .post(api.doctorclassicDetailById, { id: this.id })
        .then(resp => {
          if (resp.data.success) {
            this.info = resp.data.object;
            this.info.enable = String(this.info.enable);
            this.tryCatch(this.info.headUrl) &&
              this.headUrlList.push({
                url:
                  this.fileBaseUrl + this.tryCatch(this.info.headUrl).fileName
              });
            this.headUrlSubmitList.push(this.tryCatch(this.info.headUrl));
            let tmpPicture = this.tryCatch(this.info.picture);
            if(tmpPicture.length>0){
              tmpPicture.forEach((el,ind)=>{
                this.pictureSubmitList.push(el);
                this.pictureList.push({
                  url:
                    this.fileBaseUrl + el.fileName
                });
              })
            }
            this.tryCatch(this.info.bannerImage) &&
              this.bannerImageList.push({
                url:
                  this.fileBaseUrl + this.tryCatch(this.info.bannerImage).fileName
              });
            this.introductionText = this.info.introduction;
            this.detailsText = this.info.details;
            this.diagnosisText = this.info.diagnosis;
            this.programmeText = this.info.programme;
            this.analysisText = this.info.analysis;
            this.$nextTick(() => {
              this.headUrlUploadlList = this.$refs.headUrlUpload.fileList;
              this.pictureUploadList = this.$refs.pictureUpload.fileList;
              this.bannerImageUploadList = this.$refs.bannerImageUpload.fileList;
            });
          } else {
            console.log("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let successMsg = this.id ? "修改成功" : "新增成功";
          let failMsg = this.id ? "修改失败" : "新增失败";
          let subApi = this.id ? api.doctorclassicUpdate : api.doctorclassicInsert;
          this.info.id = this.id && parseInt(this.id);
          this.info.enable = parseInt(this.info.enable);
          this.info.priority = parseInt(this.info.priority);
          this.info.headUrl = JSON.stringify(this.headUrlSubmitList[0]);
          this.info.picture = JSON.stringify(this.pictureSubmitList);
          this.info.bannerImage = JSON.stringify(this.bannerImageSubmitList[0]);
          this.$axios
            .post(subApi, this.info)
            .then(resp => {
              if (resp.data.success) {
                this.$Message.success(successMsg);
                this.$router.push({path:"/index/operation/doctorContentCheck/list",query:{tabId:this.tabId}});
              } else {
                this.$Message.error(failMsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("数据不正确");
        }
      });
    },
    reback() {
      this.$router.push({path:"/index/operation/doctorContentCheck/list",query:{tabId:this.tabId}});
    },
    introductionOnContentChange(val) {
      this.info.introduction = val;
    },
    detailsOnContentChange(val) {
      this.info.details = val;
    },
    diagnosisOnContentChange(val) {
      this.info.diagnosis = val;
    },
    programmeOnContentChange(val) {
      this.info.programme = val;
    },
    analysisOnContentChange(val) {
      this.info.analysis = val;
    },
    //头像 start
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    headUrlHandleRemove(file) {
      let url = file.url.slice(file.url.indexOf("classic"));
      this.headUrlSubmitList.splice(this.headUrlSubmitList.indexOf(url), 1);
      const fileList = this.$refs.headUrlUpload.fileList;
      this.$refs.headUrlUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    headUrlHandleSuccess(res, file) {
      if (res.success) {
        console.log("上传成功");
        this.headUrlSubmitList.push(res.object[0])
        file.url = this.fileBaseUrl + res.object[0].fileName;
      } else {
        this.alertMsg("网络错误上传失败，请重试");
      }
    },
    headUrlHandleFormatError(file) {
      this.alertMsg("只支持jpg/jpeg/png格式上传");
    },
    headUrlHandleMaxSize(file) {
      this.alertMsg(
        `文件${file.name}过大，文件最大限制${this.headUrlMaxSize}KB`
      );
    },
    headUrlHandleBeforeUpload() {
      const check = this.headUrlUploadlList.length < this.headUrlCount;
      if (!check) {
        this.alertMsg(
          `最多上传${this.headUrlCount}张图片,请先点击图片删除老图片`
        );
      }
      return check;
    },
    //头像 end
    //病历资料 start
    pictureHandleRemove(file) {
      let url = file.url.slice(file.url.indexOf("classic"));
      this.pictureSubmitList.splice(this.pictureSubmitList.indexOf(url), 1);
      const fileList = this.$refs.pictureUpload.fileList;
      this.$refs.pictureUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    pictureHandleSuccess(res, file) {
      if (res.success) {
        console.log("上传成功");
        this.pictureSubmitList.push(res.object[0])
        file.url = this.fileBaseUrl + res.object[0].fileName;
      } else {
        this.alertMsg("网络错误上传失败，请重试");
      }
    },
    pictureHandleFormatError(file) {
      this.alertMsg("只支持jpg/jpeg/png格式上传");
    },
    pictureHandleMaxSize(file) {
      this.alertMsg(
        `文件${file.name}过大，文件最大限制${this.pictureMaxSize}KB`
      );
    },
    pictureHandleBeforeUpload() {
      const check = this.pictureUploadList.length < this.pictureCount;
      if (!check) {
        this.alertMsg(
          `最多上传${this.pictureCount}张图片,请先点击图片删除老图片`
        );
      }
      return check;
    },
    //病历资料 end
    //轮播图 start
    bannerImageHandleRemove(file) {
      let url = file.url.slice(file.url.indexOf("classic"));
      this.bannerImageSubmitList.splice(this.bannerImageSubmitList.indexOf(url), 1);
      const fileList = this.$refs.bannerImageUpload.fileList;
      this.$refs.bannerImageUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    bannerImageHandleSuccess(res, file) {
      if (res.success) {
        console.log("上传成功");
        this.bannerImageSubmitList.push(res.object[0])
        file.url = this.fileBaseUrl + res.object[0].fileName;
      } else {
        this.alertMsg("网络错误上传失败，请重试");
      }
    },
    bannerImageHandleFormatError(file) {
      this.alertMsg("只支持jpg/jpeg/png格式上传");
    },
    bannerImageHandleMaxSize(file) {
      this.alertMsg(
        `文件${file.name}过大，文件最大限制${this.bannerImageMaxSize}KB`
      );
    },
    bannerImageHandleBeforeUpload() {
      const check = this.bannerImageUploadList.length < this.bannerImageCount;
      if (!check) {
        this.alertMsg(
          `最多上传${this.bannerImageCount}张图片,请先点击图片删除老图片`
        );
      }
      return check;
    },
    //轮播图 end
    alertMsg(msg) {
      this.$Message.error({
        render: h => {
          return h("span", {
            domProps: {
              innerHTML: msg
            },
            style: { color: "#f00" }
          });
        },
        duration: 3
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.headUrlUploadlList = this.$refs.headUrlUpload.fileList;
      this.pictureUploadList = this.$refs.pictureUpload.fileList;
      this.bannerImageUploadList = this.$refs.bannerImageUpload.fileList;
    });
  }
};
</script>

<style scoped lang="less">
.edit-news {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .padding-l {
    padding-left: 5px;
  }
  .padding-r {
    padding-right: 5px;
  }
  .padding-t {
    padding-top: 15px;
  }
  .padding-b {
    padding-bottom: 15px;
  }
  .borderRight {
    border-right: 1px solid #e5e5e5;
  }
  .borderLeft {
    border-left: 1px solid #e5e5e5;
  }
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .borderTop {
    border-top: 1px solid #e5e5e5;
  }
  .w-select {
    width: 200px;
  }
  .w-input {
    width: 200px;
  }
  .req-icon {
    font-size: 18px;
    color: red;
    display: inline-block;
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 18px;
    vertical-align: middle;
  }
}
</style>
<style lang="less">
.upload-avatar {
  display: inline-block;
  vertical-align: middle;
  width: 64px !important;
  height: 64px !important;
  margin-bottom: 3px;
}
.avatar-box {
  position: relative;
  display: inline-block;
  .avatar-pic {
    width: 64px;
    height: 64px;
  }
  .avatar-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 64px;
    height: 64px;
  }
}
.avatar-box:hover .avatar-cover {
  display: block;
  text-align: center;
}
.avatar-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
  line-height: 64px;
}
.progress {
  width: 64px;
}
</style>