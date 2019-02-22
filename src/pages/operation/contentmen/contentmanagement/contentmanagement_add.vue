<template>
  <div class="home_article">
    <!--编辑-->
    <div class="home_edit">
      <!--主标题-->
      <div class="edit_input">
        <div class="edit_input_left">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>新闻标题</span>
        </div>
        <div class="edit_input_right">
          <Input v-model.trim="title" placeholder="请输入新闻标题" style="width: 350px" :maxlength="30"/>
          <span>{{title.length}}/30</span>
        </div>
      </div>
      <!--副标题-->
      <div class="edit_input">
        <div class="edit_input_left">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>副标题</span>
        </div>
        <div class="edit_input_right">
          <Input v-model.trim="ftitle" placeholder="请输入新闻副标题" style="width: 350px" :maxlength="30"/>
          <span>{{ftitle.length}}/30</span>
        </div>
      </div>
      <!--列表小图-->
      <div class="listImg">
        <div class="listImgTitle">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>列表小图</span>
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
          :before-upload="handleBeforeUpload"
          :on-exceeded-size="handleMaxSize"
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
          <img
            :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
            v-if="visible"
            style="width: 100%"
          >
        </Modal>
      </div>
      <!--栏目-->
      <div class="lanmu">
        <div class="listImgTitle">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>栏目</span>
        </div>
        <iSelect v-model="select" style="width:100px" clearable>
          <iOption :value="1" :key="1">头条</iOption>
          <iOption :value="2" :key="2">今日热点</iOption>
          <iOption :value="3" :key="3">医学前沿</iOption>
          <iOption :value="4" :key="4">宝宝喂养</iOption>
          <iOption :value="5" :key="5">科普</iOption>
          <iOption :value="6" :key="6">决策者说</iOption>
        </iSelect>
      </div>
      <!-- 类型 -->
      <div class="lanmu">
        <div class="listImgTitle">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>类型</span>
        </div>
        <iSelect v-model="type" style="width:100px" clearable>
          <iOption :value="1" :key="1">文章</iOption>
        </iSelect>
      </div>
      <!--排序-->
      <div class="sort">
        <div class="listImgTitle">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <Input v-model.trim="num" style="width: 100px"/>
        <p>备注：只能填写数字，1代表置顶以此类推</p>
      </div>
      <!--新闻内容-->
      <div class="article_content">
        <div class="listImgTitle">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>新闻内容</span>
        </div>
        <div class="articletext">
          <vueEditor
            id="analysis"
            :textHtml="editorText"
            :urlCode="urlCode"
            @valueHandle="afterChange"
          ></vueEditor>
        </div>
      </div>
      <!--新闻来源-->
      <div class="edit_input">
        <div class="edit_input_left">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>新闻来源</span>
        </div>
        <div class="edit_input_right">
          <Input
            v-model.trim="source"
            placeholder="请输入新闻的来源,未填写显示未知"
            style="width: 400px"
            :maxlength="30"
          />
          <span>{{source.length}}/30</span>
        </div>
      </div>
      <!--是否发布-->
      <div class="fabu">
        <div class="edit_input_left">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否发布</span>
        </div>
        <iSwitch v-model="switch1" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </iSwitch>
      </div>
      <!--保存/取消-->
      <div class="queding">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import vueEditor from "@/components/vueEditor";
import { Select, Option } from "iview";
import code from "@/config/base.js";
import api from "@/api/commonApi";
export default {
  components: {
    vueEditor,
    iSelect: Select,
    iOption: Option
  },
  data() {
    return {
      id: "tinymce-editor",
      height: 200,
      title: "",
      ftitle: "",
      select: "-1",
      num: "",
      source: "",
      switch1: true,
      test: "",
      img: [],
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      id: sessionStorage.getItem("hospitalId"),
      type: "",
      editorText: "",
      uploadModal: true,
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      uploadData: { json: '{"urlCode":"' + code.urlCode.patientNews + '"}' },
      images: "",
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
      selectList: [
        {
          value: 1,
          label: "头条"
        }
      ]
    };
  },
  created() {
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/patient/index",
        title: "患者端运营"
      },
      {
        path: "/index/operation/contentmanagement_home",
        title: "内容管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    afterChange(val) {
      this.editorText = val;
    },
    valueHandle(val) {
      this.test = val;
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
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      }
      return check;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: `文件${file.name}过大，文件最大限制为2000KB`
      });
    },
    back() {
      let query = this.$route.query
      this.functionJS.queryNavgationTo(
        this,
        "/index/operation/contentmanagement_home",
        query
        //公用方法
      );
    },
    //保存
    save() {
      //判断必填项是否已填
      if (!this.title) {
        this.$Message.error("主标题不能为空");
      } else if (!this.ftitle) {
        this.$Message.error("副标题不能为空");
      } else if (this.select == "-1") {
        this.$Message.error("请选择栏目");
      } else if (!this.type) {
        this.$Message.error("请选择类型");
      } else if (!this.num) {
        this.$Message.error("排序不能为空");
      } else if (!this.editorText) {
        this.$Message.error("请输入新闻内容");
      } else {
        //把页面上的参数获取到
        let params = {
          ids: [this.select],
          operateArticle: {
            title: this.title,
            synopsis: this.ftitle,
            priority: this.num,
            content: this.editorText,
            source: this.source,
            enable: Number(this.switch1),
            type: this.type
          }
        };
        let images = "";
        if (this.images && this.uploadList.length) {
          images = this.images;
        } else if (this.uploadList.length) {
          images = this.uploadList[0].url;
        } else {
          images = "";
        }
        params.operateArticle.cover = images;
        this.$axios
          .post(api.createdWrap, params)
          .then(res => {
            if (res.data.code) {
              this.$Message.info("添加成功");
              let query = this.$route.query
              setTimeout(() => {
                let query = this.$route.query
                this.functionJS.queryNavgationTo(
                  this,
                  "/index/operation/contentmanagement_home",
                  query
                  //公用方法
                );
              }, 500);
            } else {
              this.$Message.info("添加失败请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
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

.home_article {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .article_title {
    padding: 0 30px;
    margin: 5px 0;
    background: #fff;
    span {
      display: inline-block;
      font-size: 30px;
      font-weight: 500;
      color: deepskyblue;
      border-bottom: 4px solid deepskyblue;
    }
  }
  /*编辑列表*/
  .home_edit {
    width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    .edit_input {
      display: flex;
      flex-direction: row;
      margin: 10px 0;
      .edit_input_left {
        width: 100px;
        margin-right: 10px;
        line-height: 30px;
      }
      .edit_input_right {
        width: 400px;
        position: relative;
        height: 30px;
        // border: 1px solid gray;
        input {
          border: none;
          outline: none;
          background: none;
          text-indent: 4px;
          height: 30px;
          width: 90%;
        }
        span {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  /*列表小图*/
  .listImg {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    line-height: 30px;
    position: relative;
    .listImgTitle {
      width: 100px;
      margin-right: 10px;
    }
    .addImg {
      display: block;
      width: 30px;
      height: 30px;
      background: #fff;
      margin-right: 10px;
      font-weight: bold;
      text-align: center;
      line-height: 30px;
    }
    .addFile {
      position: absolute;
      top: 0;
      left: 110px;
      display: block;
      width: 30px;
      height: 30px;
      opacity: 0;
    }
    #show {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: none;
    }
  }
  /*栏目*/
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
  /*排序*/
  .sort {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    line-height: 30px;
    .listImgTitle {
      width: 100px;
      margin-right: 10px;
    }
    input {
      width: 50px;
      height: 30px;
      display: block;
      outline: none;
    }
    p {
      margin-left: 10px;
    }
  }
  /*新闻内容*/
  .article_content {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    line-height: 30px;
    .listImgTitle {
      width: 100px;
      margin-right: 10px;
    }
    .inputAll {
      margin: 0;
    }
    .articletext {
      flex: 1;
    }
  }
  /*发布*/
  .fabu {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    line-height: 30px;
    .edit_input_left {
      width: 100px;
      margin-right: 10px;
    }
  }
  /*保存*/
  .queding {
    width: 200px;
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
</style>