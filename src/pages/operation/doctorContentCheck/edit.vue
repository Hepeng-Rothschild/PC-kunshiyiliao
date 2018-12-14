<template>
  <div class="edit-news">
    <Row>
      <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
    </Row>
    <div v-if="tabId == 0">
      <Form ref="formInline" v-if="eduInfo" :model="eduInfo" :rules="eduInfoRules" inline>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>标题：
            <FormItem prop="title">
              <Input class="w-input" v-model="eduInfo.title" :maxlength="20" placeholder="请输入标题"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>概要：
            <FormItem prop="synopsis">
              <Input
                class="w-input"
                v-model="eduInfo.synopsis"
                :maxlength="20"
                placeholder="请输入概要"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24">
            <i class="req-icon"></i>封面：
            <FormItem prop="cover">
              <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                  <div class="avatar-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
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
            <i class="req-icon"></i>来源：
            <FormItem prop="source">
              <Input class="w-input" v-model="eduInfo.source" :maxlength="20" placeholder="请输入来源"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>栏目：
            <FormItem prop="type">
              <Select class="w-select" v-model="eduInfo.type">
                <Option :value="item.id" v-for="item of tabList" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>内容：
            <FormItem prop="content">
              <editor
                id="editor_id"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>状态：
            <FormItem prop="enable">
              <Select class="w-select" v-model="eduInfo.enable">
                <Option value="0">禁用</Option>
                <Option value="1">启用</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>排序：
            <FormItem prop="priority">
              <Input
                class="w-input"
                v-model="eduInfo.priority"
                :maxlength="20"
                placeholder="请输入排序"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div v-if="tabId == 1">
      <Form ref="formInline" v-if="info" :model="info" :rules="infoRules" inline>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>医生：
            <FormItem prop="doctorName">
              <Input class="w-input" v-model="info.doctorName" :maxlength="20" placeholder="请输入标题"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>职称：
            <FormItem prop="title">
              <Select class="w-select" v-model="info.title">
                <Option :value="item.id" v-for="item of titleList" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>科室：
            <FormItem prop="dept">
              <Select class="w-select" v-model="info.dept">
                <Option :value="item.id" v-for="item of deptList" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>医院：
            <FormItem prop="hospital">
              <Select class="w-select" v-model="info.hospital">
                <Option :value="item.id" v-for="item of hospitalList" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>标题：
            <FormItem prop="articleName">
              <Input
                class="w-input"
                v-model="info.articleName"
                :maxlength="20"
                placeholder="请输入标题"
              />
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
            <FormItem prop="cover">
              <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                  <div class="avatar-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
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
            <FormItem prop="content">
              <editor
                id="introduction"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>病例详情：
            <FormItem prop="content">
              <editor
                id="details"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>入院诊断：
            <FormItem prop="content">
              <editor
                id="diagnosis"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>治疗方案：
            <FormItem prop="content">
              <editor
                id="programme"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>病例分析：
            <FormItem prop="content">
              <editor
                id="analysis"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24">
            <i class="req-icon"></i>病历资料：
            <FormItem prop="cover">
              <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                  <div class="avatar-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
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
            <i class="req-icon"></i>轮播图：
            <FormItem prop="cover">
              <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                  <div class="avatar-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
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
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>排序：
            <FormItem prop="priority">
              <Input class="w-input" v-model="info.priority" :maxlength="20" placeholder="请输入排序"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div v-if="tabId == 2">
      <Form ref="formInline" v-if="info" :model="info" :rules="infoRules" inline>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>标题：
            <FormItem prop="title">
              <Input class="w-input" v-model="info.title" :maxlength="20" placeholder="请输入标题"/>
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
            <i class="req-icon"></i>封面：
            <FormItem prop="cover">
              <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                  <Avatar class="avatar-pic" shape="square" icon="ios-person" :src="item.url"/>
                  <div class="avatar-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
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
            <i class="req-icon"></i>来源：
            <FormItem prop="source">
              <Input class="w-input" v-model="info.source" :maxlength="20" placeholder="请输入来源"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>栏目：
            <FormItem prop="type">
              <Select class="w-select" v-model="info.type">
                <Option :value="item.id" v-for="item of tabList" :key="item.id">{{item.name}}</Option>
              </Select>
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
        <Row>
          <Col :xs="24" :md="24">
            <i class="req-icon"></i>内容：
            <FormItem prop="content">
              <editor
                id="editor_id"
                height="500px"
                width="700px"
                :content.sync="editorText"
                :afterChange="afterChange()"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="false"
                @on-content-change="onContentChange"
              ></editor>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
	&nbsp;&nbsp;&nbsp;&nbsp;
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
      defaultList: [],
      uploadList: [],
      uploadUrl: api.fileAll,
      jsonObj: { json: '{"urlCode":"207"}' },
      count: 1,
      maxSize: 2028, //单位kb
      imgName: "",
      visible: false,

      eduInfo: {
        id: null,
        title: null,
        synopsis: null,
        source: null,
        priority: null,
        enable: "1",
        cover: null,
        type: 1,
        content: ""
      },
      editTt: "",
      id: null,
      tabId: null,
      tabList: [{ id: 0, name: "全部" }],
      tabs: ["健康宣教", "经典案例", "热门推荐"],
      healthEducationSontab: [
        { id: 1, name: "常用" },
        { id: 2, name: "最新" },
        { id: 3, name: "医生忠告" },
        { id: 4, name: "用药" },
        { id: 5, name: "日常" }
      ],
      hotRecommendSontab: [
        { id: 1, name: "头条" },
        { id: 2, name: "今日热点" },
        { id: 3, name: "医学前沿" },
        { id: 4, name: "决策者说" }
      ],
      classicCaseSontab: [],
      editorText: "请输入要编辑的内容...",
      editorTextCopy: "", // content-change 事件回掉改变的对象 要提交到后台的数据
      eduInfoRules: {
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
    let tabId = parseInt(this.$route.query.tabId);
    this.tabId = tabId;
    tabId == 0 && (this.tabList = this.healthEducationSontab);
    tabId == 1 && (this.tabList = this.classicCaseSontab);
    tabId == 2 && (this.tabList = this.hotRecommendSontab);
    if (isNaN(id)) {
      this.editTt = `新增-${this.tabs[tabId]}`;
    } else {
      this.id = id;
      this.$axios
        .post(api.educationDetailById, { id: this.id })
        .then(resp => {
          if (resp.data.success) {
            this.eduInfo = resp.data.object;
            this.eduInfo.enable = String(this.eduInfo.enable);
            this.tryCatch(this.eduInfo.cover) &&
              this.defaultList.push({
                url:
                  this.fileBaseUrl + this.tryCatch(this.eduInfo.cover).fileName
              });
            this.editorText = this.eduInfo.content;
            this.$nextTick(() => {
              this.uploadList = this.$refs.upload.fileList;
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
          let subApi = this.id ? api.educationUpdate : api.educationInsert;
          this.eduInfo.id = this.id && parseInt(this.id);
          this.eduInfo.enable = parseInt(this.eduInfo.enable);
          this.eduInfo.priority = parseInt(this.eduInfo.priority);
          this.$axios
            .post(subApi, this.eduInfo)
            .then(resp => {
              if (resp.data.success) {
                this.$Message.success("修改成功");
                this.$router.push("/index/operation/doctorContentCheck/list");
              } else {
                this.$Message.fail("修改失败，请重试");
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
      this.$router.back(-1);
    },
    onContentChange(val) {
      this.eduInfo.content = val;
    },
    afterChange() {},
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      if (res.success) {
        console.log("上传成功");
        this.eduInfo.cover = JSON.stringify(res.object[0]);
        file.url = this.fileBaseUrl + res.object[0].fileName;
      } else {
        this.alertMsg("网络错误上传失败，请重试");
      }
    },
    handleFormatError(file) {
      this.alertMsg("只支持jpg/jpeg/png格式上传");
    },
    handleMaxSize(file) {
      this.alertMsg(`文件${file.name}过大，文件最大限制${this.maxSize}KB`);
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.count;
      if (!check) {
        this.alertMsg(`最多上传${this.count}张图片,请先点击图片删除老图片`);
      }
      return check;
    },
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
    width: 100px;
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