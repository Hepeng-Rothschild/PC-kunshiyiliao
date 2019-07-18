<template>
  <div class="edit">
    <div class="container">
      <h2 style='font-weight:bold;margin:10px 0;'>编辑账号</h2>
      <div class="main">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <!-- 登录账号 -->
          <FormItem prop="userName" label='登录账号'>
            <Input v-model.trim="formValidate.userName" placeholder="请输入登录账号" style="width: 300px" autocomplete="off"  id='userName' @on-keyup="formValidate.userName = formValidate.userName.replace(/[^\w_]/g,'');" maxlength="64"/>
          </FormItem>
          <!-- 更改密码 -->
          <FormItem label='更改密码'>
            <Input
              v-model.trim="pass"
              placeholder="请输入登录密码"
              style="width: 300px"
              type="password"
              :maxlength="16"
              autocomplete="new-password"
              id='passWord'
            />
            <span>未填写更改密码时,不修改密码</span>
          </FormItem>
          <!-- 用户昵称 -->
          <FormItem prop="niceName" label='用户昵称'>
            <Input v-model.trim="formValidate.niceName" placeholder="请填写用户昵称" style="width: 300px" />
          </FormItem>
          <FormItem label='用户头像'>
              <div class="input">
                  <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
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
                <Modal title="预览图片" v-model="visible" footer-hide :styles="{top: '20px'}">
                  <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
                </Modal>
              </div>
          </FormItem>
           <!-- 用户身份 -->
          <FormItem label='用户身份'>
            <div>
              <Select class="w-select-identity" placeholder="用户身份" v-model="identity" disabled>
                <Option v-for="item in identityList" :value="item.id" :key="item.id" style='text-align:center;'>{{item.name}}</Option>
              </Select>
            </div>
          </FormItem>
          <!-- 用户所属 -->
          <FormItem label='用户所属'>
            <div>
              <Select
                class="w-select"
                @on-change="changeProvince"
                placeholder="省"
                v-model="provinceId"
                disabled
                v-if="identity >= 2 && identity != 5"
              >
                <!-- <Option value="0">全国</Option> -->
                <Option v-for="item in provinceList" :value="item.id" :key="item.id" style='text-align:center;'>{{item.name}}</Option>
              </Select>
              <Select
                class="w-select"
                @on-change="changeCity"
                placeholder="市"
                v-model="cityId"
                disabled
                v-if="identity >= 3 && identity != 5"
              >
                <Option v-for="(item) in cityList" :value="item.id" :key="item.id" style='text-align:center;'>{{item.name}}</Option>
              </Select>
              <Select
                class="w-select"
                @on-change="changeArea"
                placeholder="区/县"
                v-model="areaId"
                disabled
                v-if="identity >= 4 && identity != 5"
              >
                <Option v-for="item in areaList" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
              <Select
                class="w-select-hos"
                placeholder="医院"
                v-model="hospitalId"
                disabled
                v-if="identity == 5"
              >
                <Option v-for="item in hospitalList" :value="item.id" :key="item.id" style='text-align:center;'>{{item.orgName}}</Option>
              </Select>
            </div>
          </FormItem>
          <!-- 是否开启 -->
          <FormItem  label='是否开启'>
            <iSwitch v-model="switch1" size="large">
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </iSwitch>
          </FormItem>
          <!-- 保存 -->
          <FormItem>
            <Button type="primary" @click="save('formValidate')">保存</Button>
            <Button @click="back">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
export default {
  data() {
    return {
      formValidate:{
        userName:"",
        niceName:""
      },
      // 验证条件
      ruleValidate:{
        userName:[
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入登录账号",
            // 触发事件
            trigger: "change"
          }
        ],
        niceName:[
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入用户昵称",
            // 触发事件
            trigger: "blur"
          }
        ]
      },
      switch1: true,
      // 账号
      text: "",
      // 密码
      pass: "",
      // 姓名
      name: "",
      // 手机号码
      phone: "",
      // 昵称
      niceName: "",
      // 机构名称
      Organizationname: "",
      //用户角色
      role: "",
      // 备注
      remarks: "",
      // 机构名称列表
      hospial: [
        {
          value: "New York",
          label: "New York"
        }
      ],
      //用户角色列表
      roleList: [
        {
          value: "New York",
          label: "New York"
        }
      ],
      // 默认列表
      defaultList: [],
      // 图片名称
      imgName: "",
      // modal显示
      visible: false,
      uploadList: [],
      // id: sessionStorage.getItem("appid"),
      uploadModal: true,
      uploadData: {
        json: '{"urlCode":"' + code.urlCode.userImage + '"}'
      },
      activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
      uploadUrl: api.fileAll,
      images: "",

      identityList: [
        { id: 1, name: "超级管理员" },
        { id: 2, name: "省级管理员" },
        { id: 3, name: "市级管理员" },
        { id: 4, name: "区级管理员" },
        { id: 5, name: "机构管理员" }
      ],
      identity: 5,

      provinceList: [],
      cityList: [],
      areaList: [],
      hospitalList: [],
      provinceId: null,
      cityId: null,
      areaId: null,
      hospitalId: null,
      identityCoding: null
    };
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    // 获取路由传递过来的ID
    let id = this.$route.query.id;
    // 用户详情加载数据
    this.$axios
      .post(api.adminEdit, {
        id
      })
      .then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          
          this.formValidate.userName = ret.userName;
          this.formValidate.niceName = ret.nickName;

          this.switch1 = Boolean(Number(ret.status));
          this.text = ret.userName;
          this.pass = ret.passWord;
          this.niceName = ret.nickName;
          this.identity = parseInt(ret.identity);
          this.provinceId = ret.provinceCode;
          this.cityId = ret.cityCode;
          this.areaId = ret.areaCode;
          this.hospitalId = ret.hospitalId;

          if (this.identity == 1) {
          } else if (this.identity == 2) {
            this.provinceList.push(
              this.$store.getters.getProvinceById(ret.identityCoding)
            );
            this.provinceId = this.provinceList[0].id;
          } else if (this.identity == 3) {
            this.provinceList.push(
              this.$store.getters.getProvinceByCityId(ret.identityCoding)
            );
            this.provinceId = this.provinceList[0].id;
            this.cityList.push(
              this.$store.getters.getCityById(ret.identityCoding)
            );
            this.cityId = this.cityList[0].id;
          } else if (this.identity == 4) {
            this.areaList.push(
              this.$store.getters.getAreaById(ret.identityCoding)
            );
            this.cityList.push(
              this.$store.getters.getCityByAreaId(ret.identityCoding)
            );
            this.cityId = this.cityList[0].id;
            this.provinceList.push(
              this.$store.getters.getProvinceByCityId(this.cityId)
            );
            this.provinceId = this.provinceList[0].id;
          } else if (this.identity == 5) {
            this.hospitalList = [
              { id: this.hospitalId, orgName: ret.hospitalName }
            ];
          }
          if (Boolean(ret.userIcon)) {
            this.uploadList.push({
              name: "a42bdcc1178e62b4694c830f028db5c0",
              percentage: 100,
              status: "finished",
              uid: 1544263544971,
              url: this.fileBaseUrl + this.analysisImages(ret.userIcon)
            });
          }
        } else {
          this.$Message.info("信息查询失败,请稍候重试");
        }
      });
    
  },
  created() {
    this.province = this.$route.query.province
      ? parseInt(this.$route.query.province)
      : null;
    this.city = this.$route.query.city
      ? parseInt(this.$route.query.city)
      : null;
    this.area = this.$route.query.area
      ? parseInt(this.$route.query.area)
      : null;
    this.hospital = this.$route.query.hospital
      ? parseInt(this.$route.query.hospital)
      : null;
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/maintain/systemManagement/index",
        title: "系统管理"
      },
      {
        path: "/index/maintain/admin/user/list",
        title: "账号管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
    // this.provinceList = this.$store.getters.getProvinceList;
  },
  methods: {
    changeProvince() {
      // this.cityId = null;
      // this.areaId = null;
      // this.hospitalId = null;
      // this.cityList = this.$store.getters.getCityList(this.provinceId);
      // this.hospitalList = null;
    },
    changeCity() {
      // this.areaId = null;
      // this.hospitalId = null;
      // this.areaList = this.$store.getters.getAreaList(this.cityId);
      // this.hospitalList = null;
    },
    changeArea() {
      // this.hospitalId = null;
      // this.hospitalList = null;
      // var params = {};
      // params.provinceCode = parseInt(
      //     this.provinceId == 0 ? null : this.provinceId
      // );
      // this.$axios
      //     .post(api.hospitalselectbyprovincecode, params)
      //     .then(resp => {
      //         this.hospitalList = resp.data.object;
      //     })
      //     .catch(err => {
      //         console.log(err);
      //     });
    },
    save(name) {
      let images = "";
      // 上传
      if (this.images != "") {
        images = this.images;
      } else if (this.sourceImages != "" && this.uploadList.length) {
        images = this.sourceImages;
        // 默认
      } else {
        images = "";
      }
      this.$refs[name].validate(valid => {
				if (valid) {
					// 必填项填写完成
          let id = this.$route.query.id;
          let params = {
            id,
            // 账号
            userName: this.formValidate.userName.trim(),
            //密码
            passWord: this.pass,
            // 用户昵称
            nickName: this.formValidate.niceName.trim(),
            // 状态
            status: Number(this.switch1),
            // 用户头像
            userIcon: images
          };
            // 修改用户数据
            this.$axios.post(api.adminDetail, params).then(res => {
              if (res.data.code) {
                  let pageNo = this.$route.query.pageNo;
                  this.$Message.info("修改成功");
                  // 当pageNo有值时它是从列表跳转过来的,需要跳回列表,值为空时,是从头像跳转过来的,跳转到主页面
                  if (pageNo) {
                    setTimeout(() => {
                        // 公用方法
                      this.functionJS.queryNavgationTo(
                        this,
                        "/index/maintain/admin/user/list",
                        {
                          pageNo,
                          province: this.province,
                          city: this.city,
                          area: this.area,
                          hospital: this.hospital,
                          isBack: 2
                        }
                      );
                    }, 800);
                  } else {
                    //   公用方法
                    this.functionJS.queryNavgationTo(this, "/index", {
                      pageNo
                    });
                    //   公用方法
                    this.functionJS.queryNavgationTo(this, "/index");
                  }
                } else {
                  this.$Message.info("修改失败,请稍候重试");
                }
        });
				} else {
					// 必填项填写失败
					this.$Message.error("请检查必填荐是否填写完整！");
				}
			})
    },
    back() {
      let pageNo = this.$route.query.pageNo;
      if (pageNo) {
        //   公用方法
        this.functionJS.queryNavgationTo(
          this,
          "/index/maintain/admin/user/list",
          {
            pageNo,
            province: this.province,
            city: this.city,
            area: this.area,
            hospital: this.hospital,
            isBack: 2
          }
        );
      } else {
        this.$router.back();
      }
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
      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传失败",
        desc: "文件格式错误"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: `文件${file.name}过大，文件最大限制为2000KB`
      });
    },
    handleBeforeUpload(file) {
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
    }
  }
};
</script>
<style lang="less" scoped>
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
// 关闭input文本框自动填充背景色黄色
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
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
.w-select {
  width: 80px;
}
.w-select-hos {
  width: 130px;
}
.w-select-identity {
  width: 100px;
}
.edit {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    .main {
      width: 70%;
      margin: 20px auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

