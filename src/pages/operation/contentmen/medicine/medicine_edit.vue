<template>
  <div class="i_addKeshi">
    <tmpHeader/>
    <div class="i-keshi_main">
      <!--左侧选择-->
      <div class="i-keshi_main-left" ref="oneList">
        <ul class="allList" @click.stop="tab" v-for="item,index in list">
          <li>
            <span>+</span>
            {{ item.parent.name }}
          </li>
          <ul class="oneList">
            <li
              v-for="items,index in item.sub"
              @click.stop="tab"
              :data-id="items.id"
            >{{ items.childDept }}</li>
          </ul>
        </ul>
      </div>
      <!--右侧科室-->
      <div class="i-keshi_main-right">
        <h2>科室信息</h2>
        <!--科室名称-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">*&nbsp;&nbsp;</span>
            <span>科室名称</span>
          </div>
          <input type="text" disabled v-model="title">
        </div>
        <!--院内名称-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">*&nbsp;&nbsp;</span>
            <span>院内名称</span>
          </div>
          <input type="text" placeholder="空" v-model="keshiname">
          <p style="color:rgb(102, 102, 102);">注：只在医院自身互联网平台显示</p>
        </div>
        <!--科室图标-->
        <div class="keshi_name_fileImgs">
          <div class="left">
            <span style="color:red;">*&nbsp;&nbsp;</span>
            <span>科室图标</span>
          </div>
          <div class="input">
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
          </div>
          <p style="color:rgb(102, 102, 102);">注：如不上传，取平台科室默认图标</p>
        </div>
        <!--科室简介-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室简介</span>
          </div>
          <textarea name rows cols v-model="test2"></textarea>
        </div>
        <!--科室特色-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室特色</span>
          </div>
          <editor
            id="editor_id"
            height="300px"
            width="400px"
            :content.sync="editorText"
            :afterChange="afterChange()"
            pluginsPath="@/../static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"
          ></editor>
        </div>
        <!--预约科室-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>是否预约科室</span>
          </div>
          <iSwitch v-model="switch1" style="margin-left:10px;"/>
        </div>
        <!--特色科室-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>是否特色科室</span>
          </div>
          <iSwitch v-model="switch2" style="margin-left:10px;"/>
        </div>
        <!--保存-->
        <div class="save">
          <div @click="save">保存</div>
          <div @click="back">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Switch, Upload, Icon } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    iSwitch: Switch,
    Upload,
    Icon
  },
  data() {
    return {
      title: "",
      keshiname: "",
      test1: "",
      test2: "",
      switch1: true,
      switch2: true,
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      id: sessionStorage.getItem("hospitalId"),
      list: [],
      editorText: "请输入要编辑的内容...",

      uploadModal: true,
      uploadData: { json: '{"urlCode":"203","flag":"1"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: "",
      currentId: -1,
      source: ""
    };
  },
  methods: {
    // 树
    tab(e) {
      let el = e.target;
      let chilrens = el.parentNode.getElementsByTagName("ul");
      let ref = this.$refs.oneList;
      if (chilrens.length > 0) {
        let flag = chilrens[0].style.display;
        if (flag == "" || flag == "none") {
          chilrens[0].style.display = "block";
          el.parentNode.getElementsByTagName("span")[0].innerHTML = "-";
        } else {
          chilrens[0].style.display = "none";
          el.parentNode.getElementsByTagName("span")[0].innerHTML = "+";
        }
      }

      let ichildren = ref.getElementsByTagName("li");
      for (let i = 0; i < ichildren.length; i++) {
        ichildren[i].classList.remove("active");
        if (ichildren[i].localName) {
        }
      }
      let id = el.getAttribute("data-id");
      if (id) {
        this.currentId = id;
        this.getRightData(this.currentId);
      }
      el.classList.add("active");
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "iKeshi",
        params: {
          pageNo
        }
      });
    },
    //保存
    save() {
      let switch1 = 0;
      if (this.switch1) {
        switch1 = 1;
      }
      let switch2 = 0;
      if (this.switch2) {
        switch2 = 1;
      }

      let images = "";
      let params = {
        //科室别名
        deptNickname: this.keshiname,
        //简介
        departmentdes: this.test2,
        //特色
        deptDetails: this.editorText,
        //预约科室
        registeredReservation: switch1,
        //特色科室
        specialDept: switch2,

        id: this.currentId
      };
      //图片
      if (this.images != "" && this.uploadList.length) {
        params.departmenticon = this.images;
      } else if (this.uploadList.length) {
        params.departmenticon = this.source;
      } else {
        params.departmenticon = "";
      }
      // console.log(params);

      this.$axios
        .post(api.medicineedit, params)
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.$router.push({
                name: "iKeshi",
                params: {
                  pageNo
                }
              });
            }, 500);
          } else {
            this.$Message.info("修改失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
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
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("最多只能上传一张图片");
      }
      return check;
    },
    onContentChange(val) {
      this.editorText = val;
    },
    afterChange() {},
    getRightData(id) {
      if (id) {
        this.currentId = id;
        this.$axios
          .post(api.medicinelistsearch, {
            hospitalId: this.id,
            id
          })
          .then(res => {
            if (res.data.code) {
              let ret = res.data.object;
              // 科室名
              this.title = ret.dictType;
              // 别名
              this.keshiname = ret.deptNickname;
              //简介
              this.test2 = ret.departmentdes;
              //特色
              this.editorText = ret.deptDetails;
              //预约科室
              let switch1 = false;
              if (ret.registeredReservation) {
                switch1 = true;
              }
              this.switch1 = Boolean(ret.registeredReservation);
              // 预约科室
              this.switch2 = Boolean(ret.specialDept);
              //图片
              this.uploadList = [];
              // console.log(ret);
              if (ret.departmenticon) {
                this.source = ret.departmenticon;
                this.uploadList.push({
                  name: "a42bdcc1178e62b4694c830f028db5c0",
                  percentage: 100,
                  status: "finished",
                  uid: 1544263544970,
                  url: this.analysisImages(this.source)
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return this.fileBaseUrl + json.fileName;
      } catch (error) {
        return "";
      }
    },
    byIdGetDom(id) {
      let wrapper = document.getElementsByClassName("i-keshi_main-left")[0];
      let li = wrapper.getElementsByTagName("li");
      this.currentId = id;
      let el = "";
      for (let i = 0; i < li.length; i++) {
        if (li[i].getAttribute("data-id")) {
          if (id == li[i].getAttribute("data-id")) {
            el = li[i];
          }
        }
      }
      let parent = el.parentNode;
      el.classList.add("active");
      parent.style.display = "block";
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.getRightData(id);
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.$axios
      .post(api.medicinesearch, {
        hospitalId: this.id,
        pageNo: 1,
        pageSize: 10
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.list = ret;
        }
      });
  },
  updated() {
    // this.$nextTick(() => {
    //   this.byIdGetDom(424)
    // })
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
.i_addKeshi {
  width: 100%;
  .i-keshi_main {
    width: 80%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    .i-keshi_main-left {
      min-width: 200px;
      height: 500px;
      border: 1px solid black;
      margin-right: 20px;
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
      /*border:1px solid red;*/
      display: flex;
      flex-direction: column;
      padding: 30px 0;
      h2 {
        margin-left: 10px;
        font-size: 20px;
        padding-left: 15px;
        border-left: 3px solid blue;
      }

      .keshi_name {
        display: flex;
        flex-direction: row;
        height: 50px;
        align-items: center;
        .left {
          min-width: 100px;
        }
        input {
          outline: none;
          width: 200px;
          height: 36px;
        }
      }
      .keshi_name_fileImgs {
        display: flex;
        flex-direction: row;
        .left {
          min-width: 100px;
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
          min-width: 100px;
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
          cursor: pointer;
        }
      }
    }
  }
}
</style>