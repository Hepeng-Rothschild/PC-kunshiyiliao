<template>
  <div class="i_addKeshi">
    <tmpHeader/>
    <div class="i-keshi_main">
      <!--左侧选择-->
      <div class="i-keshi_main-left" ref="oneList">
        <Tree :data="data1" @on-select-change="threeChild"></Tree>
      </div>
      <!--右侧科室-->
      <div class="i-keshi_main-right">
        <h2>科室信息</h2>
        <!--科室名称-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室名称</span>
          </div>
          <Input v-model.trim="title" style="width: 300px" disabled/>
        </div>
        <!--科室就诊位置-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室就诊位置</span>
          </div>
          <Input v-model.trim="keshiname" style="width: 300px" placeholder="例：门诊楼2楼1-7诊室"/>
        </div>
        <div class="keshi_name_fileImgs">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室图标</span>
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
            <Modal title="预览图片" v-model="visible" footer-hide>
              <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
            </Modal>
          </div>
          <p style="color:rgb(102, 102, 102);">注：如不上传，取平台科室默认图标</p>
        </div>
        <!--科室简介-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室简介</span>
          </div>

          <vueEditor
            id="editor_id"
            :textHtml="info.content"
            :urlCode="urlCode"
            @valueHandle="afterChange"
            style="margin:0;"
          ></vueEditor>
        </div>
        <!--排序-->
        <div class="keshi_name_text" style="align-items:center;">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>排序</span>
          </div>
          <Input v-model.trim="isort" style="width: 80px"/>
          <p style="margin-left:5px;">备注：只能填写数字，1代表置顶以此类推</p>
        </div>
        <!--是否显示-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>是否显示</span>
          </div>
          <iSwitch v-model.trim="switch1" style="margin-left:10px;"/>
        </div>
        <!--保存-->
        <div class="save">
          <Button type="primary" @click="save">保存</Button>
          <Button @click="back">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 预约科室
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Tree } from "iview";
import code from "@/configs/base.js";
import vueEditor from "@/components/vueEditor";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    vueEditor,
    Tree
  },
  data() {
    return {
      // 科室名称
      title: "",
      // 科室别名
      keshiname: "",
      // 是否显示
      switch1: true,
      // 科室排序
      isort: "",
      defaultList: [],
      // 科室编码
      code:"",
      imgName: "",
      visible: false,
      tablsList: [],
      rightDetail: [],
      currentId: -1,
      id: sessionStorage.getItem("hospitalId"),
      editorTexts: "请输入要编辑的内容...",
      info: {
        content: ""
      },
      uploadList: [],
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: "",
      source: "",
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
      data1: []
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
    this.status();
  },
  mounted() {
    let id = this.$route.params;
    if (id) {
      this.changes(id);
    }
    this.uploadList = this.$refs.upload.fileList;
    this.$axios
      .post(api.getDepartment, {
        hospitalId: this.id
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object;
          let data1 = [];
          let id = this.$route.params.id;
          ret.forEach((item, index) => {
            let a = {};
            a.title = item.name;
            let children = [];
            item.child.forEach((i, s) => {
              i.title = i.childDept;
              if (id == i.id) {
                i.selected = true;
                a.expand = true;
              }
              children.push(i);
            });
            a.children = children;
            data1.push(a);
          });
          this.data1 = data1;
          this.tablsList = ret;
        }
      });
  },
  methods: {
    // 富文本编辑器
    afterChange(val) {
      this.info.content = val;
    },
    status() {
      let flag = localStorage.getItem("status");
      if (!Boolean(flag)) {
        this.$Message.info("您还没有开通互联网医院,去开通");
        this.flag = true;
        localStorage.setItem("homeIndex", 0);
        setTimeout(() => {
          this.functionJS.paramsNavgationTo(this, "homeInfo", {
            // 公用方法
          }); 
        }, 600);
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.functionJS.paramsNavgationTo(this, "kDepartment", {
        pageNo
      });
    },
    save() {
      let images = "";
      let params = {
        // 头像
        // "departmenticon":this.images,
        //   详情
        departmentdes: this.info.content,
        //  位置
        deptPosition: this.keshiname,
        display: Number(this.switch1),
        priority: this.isort,
        id: this.currentId,
        // code
        // code:this.code
      };
      if (this.images != "" && this.uploadList.length) {
        params.departmenticon = this.images;
      } else if (this.uploadList.length) {
        params.departmenticon = this.source;
      } else {
        params.departmenticon = "";
      }

      if (params.name === "") {
        this.$Message.info("科室名称不能为空");
      } else {
        this.$axios.post(api.departmentChange, params).then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
               //functionJS公用跳转方法
              this.functionJS.paramsNavgationTo(this, "kDepartment", {
                pageNo
              });
            });
          } else {
            this.$Message.info("修改失败请重试");
          }
        });
      }
    },
    changes(item) {
      let id = item.id;
      this.addBookingofficeData(id);
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.uploadList.splice(0, 1);
    },
    handleSuccess(res, file) {
      res = this.uploadFileDecrypt(res);
      file.url = this.fileBaseUrl + res.object[0].fileName;
      this.images = JSON.stringify(res.object[0]);
      file.name = res.object[0].fileName;
      if (this.uploadList.length < 1) {
        this.uploadList.push({
          name: "a42bdcc1178e62b4694c830f028db5c0",
          percentage: 100,
          status: "finished",
          uid: 1544263544970,
          url: this.fileBaseUrl + res.object[0].fileName
        });
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc: "文件 " + file.name + " 上传失败,请重试"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc: "文件 " + file.name + " 上传失败,请重试"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      }
      return check;
    },
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return this.fileBaseUrl + json.fileName;
      } catch (error) {
        return "";
      }
    },
    threeChild(index) {
      if (index.length == 0) {
        return "";
      }
      if (Boolean(index[0].id) && index[0].id != this.currentId) {
        this.currentId = index[0].id;
        this.addBookingofficeData(index[0].id);
      }
    },
    addBookingofficeData(id) {
      this.currentId = id;
      this.$axios
        .post(api.departmentDetail, {
          hospitalId: this.id,
          id
        })
        .then(res => {
          if (res.data) {
            let ret = res.data.object;
            //图片
            this.uploadList = [];
            if (Boolean(ret.departmenticon)) {
              this.source = ret.departmenticon;
              this.uploadList.push({
                name: "a42bdcc1178e62b4694c830f028db5c0",
                percentage: 100,
                status: "finished",
                uid: 1544263544970,
                url: this.analysisImages(this.source)
              });
            }
            // 标题
            this.title = ret.dictType;
            // 详情
            this.info.content = ret.departmentdes;
            // 位置
            this.keshiname = ret.deptPosition;
            // 开关
            this.switch1 = Boolean(ret.display);
            // 排序
            this.isort = ret.priority || 0;
            
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
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
.i_addKeshi {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .i-keshi_main {
    width: 80%;
    height: auto;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    .i-keshi_main-left {
      min-width: 200px;
      height: 500px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 20px;
      overflow:auto;
      ul {
        width: 100%;
        li {
          width: 100%;
          padding-left: 20px;
          user-select: none;
          cursor: pointer;
        }
        li.active {
          background: #41c7db;
        }
      }
      .oneList {
        display: none;
        li {
          padding-left: 40px;
        }
        li.active {
          background: #41c7db;
        }
      }
      .twoList {
        display: none;
        li {
          padding-left: 60px;
        }
        li.active {
          background: #41c7db;
        }
      }
    }

    .i-keshi_main-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px 0;

      .keshi_name {
        display: flex;
        flex-direction: row;
        height: 50px;
        align-items: center;
        .left {
          min-width: 150px;
        }
        input {
          display: inline-block;
          outline: none;
          width: 400px;
          height: 36px;
          text-indent: 10px;
        }
      }
      .keshi_name_fileImgs {
        display: flex;
        flex-direction: row;
        .left {
          min-width: 150px;
        }

        p {
          margin-left: 20px;
        }
      }
      .keshi_name_text {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        .left {
          min-width: 150px;
        }
        textarea {
          outline: none;
          width: 400px;
          height: 100px;
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
          cursor: pointer;
        }
      }
    }
  }
}
</style>