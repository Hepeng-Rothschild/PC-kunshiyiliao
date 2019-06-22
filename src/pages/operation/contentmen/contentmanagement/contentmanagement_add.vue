<template>
  <div class="home_article">
    <h2 style='margin:20px 0;font-weight:bold;'>添加内容管理</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
      <!-- 新闻标题 -->
        <FormItem label="新闻标题" prop="title">
          <Input v-model.trim="formValidate.title" placeholder="请输入新闻标题" style="width: 350px" :maxlength="30"/>
        </FormItem>
        <!-- 副酷暑 -->
        <FormItem label="副标题" prop="synopsis">
          <Input v-model.trim="formValidate.synopsis" placeholder="请输入新闻副标题" style="width: 350px" :maxlength="30"/>
        </FormItem>
        <!-- 小图 -->
        <FormItem label="列表小图" >
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
          <Modal title="预览图片" v-model="visible" footer-hide>
            <img
              :src="fileBaseUrl + imgName"
              v-if="visible"
              style="width: 100%"
            >
          </Modal>
        </FormItem>
        <!-- 栏目 -->
        <FormItem label="栏目" prop="ids">
            <Select v-model="formValidate.ids" style="width:100px">
              <Option :value="1" :key="1">头条</Option>
              <Option :value="2" :key="2">今日热点</Option>
              <Option :value="3" :key="3">医学前沿</Option>
              <Option :value="4" :key="4">宝宝喂养</Option>
              <Option :value="5" :key="5">科普</Option>
              <Option :value="6" :key="6">决策者说</Option>
            </Select>
        </FormItem>
        <!-- 类型 -->
        <FormItem label="类型" prop="type">
            <Select v-model="formValidate.type" style="width:100px" clearable>
            <Option :value="1" :key="1">文章</Option>
          </Select>
        </FormItem>
        <!-- 排序 -->
        <FormItem label="排序" prop="priority">
          <Input v-model.trim="formValidate.priority" style="width: 100px"/>
          <span>备注：只能填写数字，1代表置顶以此类推</span>
        </FormItem>
        <!-- 新闻内容 -->
        <FormItem label="新闻内容" >
            <div class="articletext">
              <vueEditor
                id="analysis"
                :textHtml="editorText"
                :urlCode="urlCode"
                @valueHandle="afterChange"
                :height='100'
                style='margin:0;'
              ></vueEditor>
            </div>
        </FormItem>
        <FormItem label="新闻来源">
          <Input v-model.trim="formValidate.source" style="width: 100px"/>
        </FormItem>
        <FormItem label="是否发布">
          <iSwitch v-model="formValidate.enable" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </iSwitch>
        </FormItem>
    </Form>
    <div class="queding">
      <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
      <Button @click="back">取消</Button>
    </div>
  </div>
</template>

<script>
import vueEditor from "@/components/vueEditor";
import code from "@/configs/base.js";
import api from "@/api/commonApi";
export default {
  components: {
    vueEditor
  },
  data() {
    return {
      id: sessionStorage.getItem("hospitalId"),
      height: 200,
      formValidate:{
        title: "",
        synopsis: "",
        type: "",
        ids:"",
        priority: "",
        source: "",
        enable: false,
      },
      ruleValidate:{
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        synopsis: [{ required: true, message: '请输入新闻副标题', trigger: 'blur' }],
        ids: [{ required: true, message: '请选择新闻栏目', trigger: 'change', type:"number" }],
        type: [{ required: true, message: '请选择新闻类型', trigger: 'change', type:"number" }],
        priority: [{ required: true, message: '请输入新闻排序', trigger: 'blur' }],
        source: [{ required: true, message: '请输入新闻来源', trigger: 'blur' }],
      },
      // 新闻内容
      editorText: "",
      // 上传图片相关
      imgName: "",
      defaultList: [],
      visible: false,
      uploadList: [],
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
      ],
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
      let query = this.$route.query;
      this.functionJS.queryNavgationTo(
        this,
        "/index/operation/contentmanagement_home",
        query
        //公用方法
      );
    },
    //保存
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
                if (!this.editorText) {
                  this.$Message.error("请输入新闻内容");
                } else {
                  //把页面上的参数获取到
                  let params = {
                    ids: [this.formValidate.ids],
                    operateArticle: {
                      title: this.formValidate.title.trim(),
                      synopsis: this.formValidate.synopsis.trim(),
                      priority: this.formValidate.priority,
                      content: this.editorText,
                      source: this.formValidate.source,
                      enable: Number(this.formValidate.enable),
                      type: this.formValidate.type
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
                        console.log(res);
                        this.$Message.info("添加成功");
                        let query = this.$route.query
                        let pageNo = this.$route.query.pageNo ? Number(this.$route.query.pageNo) :1
                        let type2 = this.$route.query.type2 ? Number(this.$route.query.type2) : null
                        setTimeout(() => {
                          this.back();
                        }, 500);
                      } else {
                        this.$Message.info("添加失败请重试");
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
          } else {
              this.$Message.error('请完整填写必填项!');
          }
      })
      //判断必填项是否已填
      // if (!this.title) {
      //   this.$Message.error("主标题不能为空");
      // } else if (!this.ftitle) {
      //   this.$Message.error("副标题不能为空");
      // } else if (this.select == "-1") {
      //   this.$Message.error("请选择栏目");
      // } else if (!this.type) {
      //   this.$Message.error("请选择类型");
      // } else if (!this.num) {
      //   this.$Message.error("排序不能为空");
      // } else 
      // if (!this.editorText) {
      //   this.$Message.error("请输入新闻内容");
      // } else {
      //   //把页面上的参数获取到
      //   let params = {
      //     ids: [this.select],
      //     operateArticle: {
      //       title: this.formValidate.title.trim(),
      //       synopsis: this.formValidate.synopsis.trim(),
      //       priority: this.formValidate.priority,
      //       content: this.editorText,
      //       source: this.formValidate.source,
      //       enable: Number(this.formValidate.enable),
      //       type: this.formValidate.type
      //     }
      //   };
      //   let images = "";
      //   if (this.images && this.uploadList.length) {
      //     images = this.images;
      //   } else if (this.uploadList.length) {
      //     images = this.uploadList[0].url;
      //   } else {
      //     images = "";
      //   }
      //   params.operateArticle.cover = images;
      //   this.$axios
      //     .post(api.createdWrap, params)
      //     .then(res => {
      //       if (res.data.code) {
      //         this.$Message.info("添加成功");
      //         let query = this.$route.query
      //         let pageNo = this.$route.query.pageNo ? Number(this.$route.query.pageNo) :1
      //         let type2 = this.$route.query.type2 ? Number(this.$route.query.type2) : null
      //         setTimeout(() => {
      //           this.back();
      //         }, 500);
      //       } else {
      //         this.$Message.info("添加失败请重试");
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }
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