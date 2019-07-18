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
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span class ='leftname'>科室名称</span>
          </div>
          <Input v-model="title" disabled style="width: 300px"/>
        </div>
        <!--院内名称-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span class ='leftname'>院内名称</span>
          </div>
          <Input v-model.trim="keshiname" style="width: 300px" placeholder="空"/>
          <p style="color:rgb(102, 102, 102);font-size:12px;">只在医院自身互联网平台显示</p>
        </div>
        <!--科室Code-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span class ='leftname'>第三方科室Code</span>
          </div>
          <Input v-model.trim="medicineCode" style="width: 300px"/>
        </div>
        <!--科室图标-->
        <div class="keshi_name_fileImgs">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span class ='leftname'>科室图标</span>
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
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span class ='leftname'>科室简介</span>
          </div>
          <Input v-model="test2" type="textarea" :rows="6" placeholder="请输入科室简介" />
        </div>
        <!--科室特色-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span class ='leftname'>科室特色</span>
          </div>
          <vueEditor
            id="editor_id"
            :textHtml="info.content"
            :urlCode="urlCode"
            @valueHandle="afterChange"
            style="margin:0;"
            :height='100'
          ></vueEditor>
        </div>
        <!--预约科室-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span class ='leftname'>是否预约科室</span>
          </div>
          <iSwitch size="large"  v-model="registeredReservation" style="margin-left:10px;" >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
          </iSwitch>
        </div>
        <!--特色科室-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span class ='leftname'>是否特色科室</span>
          </div>
          <iSwitch size="large"  v-model="specialDept" style="margin-left:10px;" >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
          </iSwitch>
        </div>
        <!--远程门诊-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span class ='leftname'>是否开通远程门诊</span>
          </div>
          <iSwitch size="large"  v-model="iremote" style="margin-left:10px;" >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
          </iSwitch>
        </div>
        <!-- 是否支持第三方预约挂号池 -->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span class ='leftname'>是否支持第三方预约挂号池</span>
          </div>
          <iSwitch size="large"  v-model="thirdPartyRegistration" style="margin-left:10px;" >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
          </iSwitch>
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
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Tree } from "iview";
import vueEditor from "@/components/vueEditor";
import code from "@/configs/base.js";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    vueEditor,
    Tree
  },
  data() {
    return {
      title: "",
      keshiname: "",
      test2: "",
      // 开启按钮
      registeredReservation: true,
      specialDept: true,
      iremote: true,
      thirdPartyRegistration:false,

      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      id: sessionStorage.getItem("hospitalId"),
      list: [],
      info: {
        content: ""
      },
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: "",
      currentId: -1,
      source: "",
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
      data1: [],
      medicineCode:''
    };
  },
  methods: {
    // 后退
    back() {
      let pageNo = this.$route.params.pageNo;
      this.functionJS.paramsNavgationTo(this, "iKeshi", {
        // 公用方法
        pageNo
      }); 
    },
    //保存
    save() {
      let images = "";
      let params = {
        //科室别名
        deptNickname: this.keshiname,
        //简介
        departmentdes: this.test2,
        //特色
        deptDetails: this.info.content,
        //预约科室
        registeredReservation: Number(this.registeredReservation),
        //特色科室
        specialDept: Number(this.specialDept),
        id: this.currentId,
        // 科室开通远程门诊
        iremote: Number(this.iremote),
        // 科室code
        code:this.medicineCode,
        // 第三方预约挂号池
        thirdPartyRegistration: Number(this.thirdPartyRegistration)
      };
      //图片
      if (this.images != "" && this.uploadList.length) {
        params.departmenticon = this.images;
      } else if (this.uploadList.length) {
        params.departmenticon = this.source;
      } else {
        params.departmenticon = "";
      }
      console.log('参数',params);

      this.$axios
        .post(api.medicineedit, params)
        .then(res => {
          if (res.data.success) {
            this.$Message.info("修改成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.functionJS.paramsNavgationTo(this, "iKeshi", {
                // 公用方法
                pageNo
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
    // 上传图片相关事件
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
        title: "文件过大",
        desc: `文件${file.name}过大，文件最大限制为2000KB`
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.info("最多只能上传一张图片");
      }
      return check;
    },
    // 富文本编辑器
    afterChange(val) {
      this.info.content = val;
    },
    // 获取科室详细数据
    getRightData(id) {
      if (id) {
        this.currentId = id;
        this.$axios
          .post(api.medicinelistsearch, {
            hospitalId: this.id,
            id
          })
          .then(res => {
            if (res.data.success) {
              let ret = res.data.object;
              console.log('数据',ret);
              // 科室名
              this.title = ret.dictType;
              // 别名
              this.keshiname = ret.deptNickname;
              //简介
              this.test2 = ret.departmentdes;
              //特色
              this.info.content = ret.deptDetails;
              //预约科室
              this.registeredReservation = Boolean(ret.registeredReservation);
              // 预约科室
              this.specialDept = Boolean(ret.specialDept);
              // 第三方预约挂号池
              this.thirdPartyRegistration = Boolean(ret.thirdPartyRegistration)
              //图片
              this.uploadList = [];
              // 科室Code
              this.medicineCode = ret.code
              // 科室开通远程门诊s
              this.iremote = Boolean(ret.iremote);
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
    // 图片兼容
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
    },
    threeChild(index) {
      if (index.length == 0) {
        return "";
      }
      if (Boolean(index[0].id) && index[0].id != this.currentId) {
        this.currentId = index[0].id;
        this.getRightData(index[0].id);
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.getRightData(id);
    }
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
    this.$axios
      .post(api.medicinesearch, {
        hospitalId: this.id,
        pageNo: 1,
        pageSize: 10
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object;
          let data1 = [];
          let id = this.$route.params.id;

          ret.forEach((item, index) => {
            let a = {};
            a.title = item.parent.name;
            let children = [];
            item.sub.forEach((i, s) => {
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
          this.list = ret;
        }
      });
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
      margin-right: 20px;
      border-radius: 10px;
      overflow:auto;
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
          outline: none;
          width: 200px;
          height: 36px;
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
        margin: 20px auto;
      }
    }
  }
}
</style>