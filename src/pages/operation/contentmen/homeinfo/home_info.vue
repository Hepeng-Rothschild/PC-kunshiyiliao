<template>
  <div class="Institutional_information">
    <tmpHeader/>
    <div class="main">
      <!--机构名称 -->
      <div class="main_info">
        <span>机构名称</span>
        <Input :value="title" style="width: 300px" disabled/>
      </div>
      <!--机构首图-->
      <div class="main_imgs">
        <span>机构首图</span>
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
        <Modal title="预览图片" v-model="visible">
          <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
        </Modal>
        <span>添加图片</span>
      </div>
      <!--机构等级-->
      <div class="main_type">
        <span>机构等级</span>
        <!-- <select v-model="y_type">
          <option :value="item.dictType" v-for="item,index in types">{{ item.dictName }}</option>
        </select> -->
        <Select v-model="y_type" style="width:100px">
          <Option v-for="item in types" :value="item.dictType" :key="item.dictType">{{ item.dictName }}</Option>
        </Select>
      </div>
      <!--医联体上级医院-->
      <div class="main_info">
        <span>医联体上级医院</span>
        <Select v-model="y_search1" style="width:200px;">
          <Option value="0">请选择</Option>
          <Option :value="item.orgCode" v-for="item,index in ylt" :key="item.orgCode">{{ item.orgName }}</Option>
        </Select>
      </div>
      <!--背景模板-->
      <div class="main_moban">
        <span>背景模板</span>

         <Select v-model="y_module" style="width:100px;">
          <Option :value="2">默认模板</Option>
           <Option :value="1">中医院模板</Option>
        </Select>
      </div>
      <!--机构简介-->
      <div class="main_jianjie">
        <span>机构简介</span>
        <div>
          <vueEditor
            id="homeInfo"
            :textHtml="info.content"
            :urlCode="urlCode"
            @valueHandle="afterChange"
          ></vueEditor>
        </div>
      </div>
      <!--机构路线-->
      <div class="main_info">
        <span>机构路线</span>
        <Input v-model="y_luxin" placeholder="请输入机构乘车路线" style="width: 370px"/>
      </div>
      <!--机构电话-->
      <div class="main_info">
        <span>机构电话</span>
        <Input v-model="y_phone" placeholder="请输入机构电话" style="width: 370px" :maxlength="12"/>
      </div>
      <!--机构地址-->
      <div class="main_info">
        <span>机构地址</span>
        <Input v-model="y_dizhi" placeholder="请输入机构地址" style="width: 370px"/>
      </div>
      <!--是否开通互联网医院-->
      <div class="main_yy">
        <span class="main_yy_name">是否开通互联网医院</span>
        <iSwitch v-model="switch1" @on-change="change"/>
      </div>
      <!--互联网医院公众号-->
      <div class="main_moban">
        <span>互联网医院公众号</span>
        <Select v-model="y_gzh" style="width:150px;" :disabled="status">
          <Option :value="0">请选择</Option>
          <Option v-for="item,index in gzh" :value="item.appid" :key="item.appid">{{ item.nick }}</Option>
        </Select>
      </div>
      <!--是否加入医院联盟-->
      <div class="main_yy">
        <span class="main_yy_name">是否加入医院联盟</span>
        <iSwitch v-model="switch2" :disabled="status" @on-change="change2"/>
      </div>
      <!--医院联盟排序-->
      <div class="main_info">
        <span>医院联盟排序</span>
        <!-- <input
          type="text"
          placeholder="医院联盟排序"
          style="width:120px;"
          v-model.trim="hospitalSort"
          :disabled="hospitalFlag"
        >-->
        <Input
          placeholder="医院联盟排序"
          style="width:120px;"
          v-model.trim="hospitalSort"
          :disabled="hospitalFlag"
        />
        <p>备注:只能填写数字,1代表置顶以些类推</p>
      </div>
      <!--是否开通处方流转-->
      <div class="main_yy">
        <span class="main_yy_name">是否开通处方流转</span>
        <iSwitch v-model="switch3"/>
      </div>
      <!--是否加入远程门诊-->
      <div class="main_yy">
        <span class="main_yy_name">是否加入远程门诊</span>
        <iSwitch v-model="switch4"/>
      </div>
      <!-- 是否开通预约门诊 -->
      <!-- <div class="main_yy">
        <span class="main_yy_name">是否开通预约挂号</span>
        <iSwitch v-model="switch5"/>
      </div>-->
      <!--处方流转平台接口ID-->
      <div class="main_info">
        <span>处方流转平台接口ID</span>
        <Input v-model="y_uid" placeholder="请输入Id" style="width: 370px"/>
      </div>
      <!--保存-->
      <div class="main_save">
        <div @click="save" style="cursor:pointer;">保存</div>
        <div @click="$router.push('/index/operation/home')" style="cursor:pointer;">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import vueEditor from "@/components/vueEditor";
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Switch, Upload, Icon, Select, Option } from "iview";
import code from "@/config/base.js";
import cookie from "@/utils/cookie.js";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    iSwitch: Switch,
    Upload,
    Icon,
    vueEditor,
    Select,
    Option
  },
  data() {
    return {
      info: {
        content: ""
      },
      height: 300,
      tinymceHtml: "",
      defaultList: [],
      types: [],
      imgName: "",
      title: "",
      visible: false,
      uploadList: [],
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      switch5: false,
      y_name: "",
      y_type: 6001,
      y_module: "2",
      y_luxin: "",
      y_search: "",
      y_phone: "",
      y_dizhi: "",
      y_gzh: null,
      y_uid: "",
      y_search1: "0",
      gzh: [],
      ylt: [],
      uploadModal: true,
      uploadData: { json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}' },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: "",
      id: sessionStorage.getItem("hospitalId"),
      status: false,
      hospitalSort: "",
      hospitalFlag: false,
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}'
    };
  },
  methods: {
    afterChange(val) {
      this.info.content = val;
    },
    change(status) {
      if (status) {
        this.status = false;
      } else {
        this.status = true;
        this.y_gzh = null;
        this.switch2 = false;
        this.hospitalFlag = true;
      }
    },
    change2(status) {
      if (status) {
        this.hospitalFlag = false;
      } else {
        this.hospitalFlag = true;
      }
    },
    save() {
      let images = "";
      if (this.images != "" && this.uploadList.length) {
        images = this.images;
      } else if (this.uploadList.length) {
        images = this.source;
      } else {
        images = "";
      }
      let params = {
        hospitalId: this.id,
        //上级编码
        orgParentCode: this.y_search1,
        // 医院图标
        hosIcon: images,
        //机构等级
        grade: this.y_type,
        //模板
        cssTemplate: this.y_module,
        //路线
        route: this.y_luxin,
        //电话
        telephone: this.y_phone,
        //简介
        hosIntroduction: this.info.content,
        //地址
        hosAddr: this.y_dizhi,
        //公众号
        appid: this.y_gzh,
        //处方平台UID
        prescriptionId: this.y_uid,
        //互联网医院
        internetHospital: Number(this.switch1),
        //医院联盟
        unionHospital: Number(this.switch2),
        //处方流转
        ipres: Number(this.switch3),
        // 医院排序
        internetHospitalSort: this.hospitalSort,
        // 开启远程门诊
        iremote: Number(this.switch4)
        // 开启预约门诊
        // registeredReservation: Number(this.switch5)
      };
      if (!this.switch1) {
        params.appid = null;
      }

      this.$axios
        .post(api.managementEdit, params)
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
          } else {
            this.$Message.info("修改失败,请重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
      if (this.switch1) {
        localStorage.setItem("status", "show");
        sessionStorage.setItem("doctor", "show");
      } else {
        localStorage.setItem("status", "");
        sessionStorage.setItem("doctor", "");
      }
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
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
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
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return json.fileName;
      } catch (error) {
        return "";
      }
    },
    addData() {
      // 医院等级
      this.$axios.post(api.managementAll, {}).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.types = ret;
        }
      });
      // 医联体
      this.$axios.post(api.managementYlt).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.ylt = ret;
        }
      });
      // 公众号
      this.$axios.post(api.managementGzh).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.gzh = ret;
        }
      });
    }
  },
  created() {
    sessionStorage.setItem("homeIndex", 0);
    this.addData();
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    // 医院信息
    this.$axios
      .post(api.managementInfo, {
        hospitalId: this.id
      })
      .then(res => {
        if (res.data.object) {
          
          let ret = res.data.object;
          // 名字
          this.y_name = ret.orgName;
          // 图片
          if (ret.hosIcon) {
            this.source = ret.hosIcon;
            this.uploadList.push({
              name: "a42bdcc1178e62b4694c830f028db5c0",
              percentage: 100,
              status: "finished",
              uid: 1544263544970,
              url: this.fileBaseUrl + this.analysisImages(ret.hosIcon)
            });
          }

          this.title = ret.orgName;
          // m机构等级
          this.y_type = ret.grade;
          // 医联体上级医院
          this.y_search1 = ret.orgParentCode;
          // 背景模板
          this.y_module = ret.cssTemplate;
          // 简介
          this.info.content = ret.hosIntroduction;
          //路线
          this.y_luxin = ret.route;
          //电话
          this.y_phone = ret.telephone;
          // 地址
          this.y_dizhi = ret.hosAddr;
          // 公众号
          this.y_gzh = ret.appid;
          //uid
          //互联网医院
          this.switch1 = Boolean(ret.internetHospital);
          if (this.switch1) {
            this.status = false;
            localStorage.setItem("status", "show");
          } else {
            this.status = true;
            localStorage.setItem("status", "");
          }
          // 医院联盟
          this.switch2 = Boolean(ret.unionHospital);
          this.hospitalSort = ret.internetHospitalSort;
          // hospitalFlag
          if (this.switch2) {
            this.hospitalFlag = false;
          } else {
            this.hospitalFlag = true;
          }
          // 开通预约门诊
          // this.switch5 = Boolean(ret.registeredReservation);

          // 开启远程门诊
          this.switch4 = Boolean(ret.iremote);
          if (this.switch4) {
            sessionStorage.setItem("doctor", "show");
          } else {
            sessionStorage.setItem("doctor", "");
          }

          //医联体上级医院
          // 处方流转
          this.switch3 = Boolean(ret.ipres);
          this.y_uid = ret.prescriptionId;
        }
      });
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
.Institutional_information {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    margin: 0 auto;
    .main_info {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 30px;
      margin: 5px auto;
      align-items: center;
      span {
        display: inline-block;
        min-width: 100px;
        line-height: 30px;
      }
      input {
        line-height: 30px;
        display: inline-block;
        width: calc(100% - 300px);
        outline: none;
        text-indent: 5px;
      }
    }
    .main_yy {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 30px;
      margin: 5px auto;
      .main_yy_name {
        display: inline-block;
        min-width: 100px;
        margin-right: 10px;
      }
    }
    .main_imgs,
    .main_type,
    .main_moban {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 30px;
      margin: 5px auto;
      span {
        display: inline-block;
        min-width: 100px;
      }
    }
    .main_imgs {
      height: auto;
    }
    .main_jianjie {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: auto;
      margin: 5px auto;
      span {
        display: inline-block;
        min-width: 100px;
      }
      div {
        margin: 0;
      }
    }
    .main_save {
      width: 300px;
      margin: 20px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      div:first-child {
        background: dodgerblue;
      }
      div {
        width: 100px;
        height: 30px;
        background: gray;
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
      }
    }
  }
}
</style>