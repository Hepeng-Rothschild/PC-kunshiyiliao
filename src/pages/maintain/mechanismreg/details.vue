<template>
  <div class="mechanismregAdd">
    <div class="container">
      <div class="container-main">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          style="display:flex;justify-content: space-between;"
        >
          <div style="width:40%">
            <span style="color:blue;font-size:20px">基本信息</span>
            <!-- 机构名称 -->
            <div class="address">
              <div class="left">
                <span>机构名称:</span>
              </div>
              <FormItem prop="orgName">
                <span>{{orgName}}</span>
              </FormItem>
            </div>
            <div class="region">
              <div class="left">
                <span>机构地址:</span>
              </div>
              <FormItem prop="hosAddr" class="hosAddr">
                <span>{{hosAddr}}</span>
              </FormItem>
            </div>

            <!-- 机构组织编码 -->
            <div class="address">
              <div class="left">
                <span>医疗机构组织代码:</span>
              </div>
              <FormItem prop="orgCode">
                <span>{{orgCode}}</span>
              </FormItem>
            </div>
            <!-- 机构分类 -->
            <div class="address">
              <div class="left">
                <span>机构分类:</span>
              </div>
              <span style="padding-top:5px;">asdasdasdasdasda</span>

              <span style="padding-top:5px;">sadsadsadas</span>
            </div>
            <!-- 机构级别 -->
            <div class="address">
              <div class="left">
                <span>机构级别:</span>
              </div>
              <span style="padding-top:5px;">{{hospitalSuperior_1}}</span>
              <div class="left">
                <span>上级医院:</span>
              </div>
              <span style="padding-top:5px;">sadasdsadsa</span>
            </div>
            <!-- 联系人和电话 -->
            <div class="address">
              <div class="left">
                <span>联系人:</span>
              </div>
              <FormItem prop="linkman">
                <span style>{{linkman}}</span>
              </FormItem>
              <div class="left">
                <span>联系电话:</span>
              </div>
              <FormItem prop="linkmanTelephone">
                <span>{{linkmanTelephone}}</span>
              </FormItem>
            </div>
            <!-- 机构简介 -->
            <div class="address">
              <div class="left">
                <span>机构简介:</span>
              </div>
              <FormItem prop="introduce">
                <span>{{hosIntroduction}}</span>
              </FormItem>
            </div>
          </div>

          <div style="width:45%">
            <span style="color:blue;font-size:20px">资质信息</span>
            <!-- 医疗机构执业许可证上传 -->
            <div class="address">
              <div class="left">
                <span>医疗机构执业许可证登记号:</span>
              </div>
              <FormItem prop="licence" style="display:flex;">
                <span>{{arrcode1}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath1}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView1"
                class="button-upload"
              >查看</Button>
            </div>
            <!-- 收费许可证号 -->
            <div class="address">
              <div class="left">
                <span>收费许可证号:</span>
              </div>
              <FormItem prop="feelicense" style="display:flex;">
                <span>{{arrcode2}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath2}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView2"
                class="button-upload"
              >查看</Button>
            </div>
            <!-- 放射诊疗许可证号-->
            <div class="address">
              <div class="left">
                <span>放射诊疗许可证号:</span>
              </div>
              <FormItem prop="radiationpermit" style="display:flex;">
                <span>{{arrcode3}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath3}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView3"
                class="button-upload"
              >查看</Button>
            </div>
            <!-- 母婴保健技术服务执业许可证号 -->
            <div class="address">
              <div class="left">
                <span>母婴保健技术服务执业许可证号:</span>
              </div>
              <FormItem prop="healthlicense" style="display:flex;">
                <span>{{arrcode4}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath4}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView4"
                class="button-upload"
              >查看</Button>
            </div>
            <!-- 大型医疗设备许可证号 -->
            <div class="address">
              <div class="left">
                <span>大型医疗设备许可证号:</span>
              </div>
              <FormItem prop="equipmentlicense" style="display:flex;">
                <span>{{arrcode5}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath5}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView5"
                class="button-upload"
              >查看</Button>
            </div>
            <!-- 卫生许可证编号 -->
            <div class="address">
              <div class="left">
                <span>卫生许可证编号:</span>
              </div>
              <FormItem prop="hygienelicense" style="display:flex;">
                <span>{{arrcode6}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath6}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView6"
                class="button-upload"
              >查看</Button>
            </div>
            <!-- 其他资质证书说明 -->
            <div class="address">
              <div class="left">
                <span>其他资质证书说明:</span>
              </div>
              <FormItem prop="otherlicence" style="display:flex;">
                <span>{{arrcode7}}</span>
              </FormItem>
              <span style="margin-top:5px;margin-left:100px">{{filePath7}}</span>
              <Button
                type="primary"
                style="width:72px;height:32px;margin-left:100px;"
                @click="handleView7"
                class="button-upload"
              >查看</Button>
            </div>
          </div>
        </Form>
        <div class="button-bottom">
          <Button @click="$router.go(-1)" style="margin-left:30px">返回上一步</Button>
        </div>
      </div>
    </div>
    <Modal title="预览图片" width="30" v-model="viewModal1" footer-hide>
      <div>
        <img :src="src1" style="width: 100%" />
      </div>
    </Modal>
    <Modal title="预览图片" width="30" v-model="viewModal2" footer-hide>
      <div>
        <img :src="src2" style="width: 100%" />
      </div>
    </Modal>
    <Modal title="预览图片" width="30" v-model="viewModal3" footer-hide>
      <div>
        <img :src="src3" style="width: 100%" />
      </div>
    </Modal>
    <Modal title="预览图片" width="30" v-model="viewModal4" footer-hide>
      <div>
        <img :src="src4" style="width: 100%" />
      </div>
    </Modal>
    <Modal title="预览图片" width="30" v-model="viewModal5" footer-hide>
      <div>
        <img :src="src5" style="width: 100%" />
      </div>
    </Modal>
    <Modal title="预览图片" width="30" v-model="viewModal6" footer-hide>
      <div>
        <img :src="src6" style="width: 100%" />
      </div>
    </Modal>
    <Modal title="预览图片" width="30" v-model="viewModal7" footer-hide>
      <div>
        <img :src="src7" style="width: 100%" />
      </div>
    </Modal>
  </div>
</template>

<script>
import api from "@/api/commonApi";
import address from "@/configs/address";
import cookie from "@/utils/cookie.js";
import newfourLevelLinkage from "@/components/newfourLevelLinkage";
export default {
  components: {
    newfourLevelLinkage
  },
  data() {
    return {
      hosIntroduction: "",
      certList: [],
      // 资质信息代号
      arrcode1: "",
      arrcode2: "",
      arrcode3: "",
      arrcode4: "",
      arrcode5: "",
      arrcode6: "",
      arrcode7: "",
      // 图片地址名字
      filePath1: "",
      filePath2: "",
      filePath3: "",
      filePath4: "",
      filePath5: "",
      filePath6: "",
      filePath7: "",
      // 预览图片的src
      src1: "",
      src2: "",
      src3: "",
      src4: "",
      src5: "",
      src6: "",
      src7: "",
      // 预览图片Modal
      viewModal1: false,
      viewModal2: false,
      viewModal3: false,
      viewModal4: false,
      viewModal5: false,
      viewModal6: false,
      viewModal7: false,
      uploadUrl: api.fileAll,

      hosAddr: "",
      //机构名称
      orgName: "",
      //机构组织代码
      orgCode: "",
      //联系人
      linkman: "",
      //联系人电话
      linkmanTelephone: ""
    };
  },
  created() {},
  mounted() {
    let id = this.$route.query.id;
    console.log(id);
    
    if (id) {
      this.$axios
        .post(api.mechanismregSearch, {
          hospitalId: id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;

            // //机构全称
            this.orgName = ret.orgName;
            // //机构代码
            this.orgCode = ret.orgCode;

            // //联系人
            this.linkman = ret.linkman;
            // //联系人电话
            this.linkmanTelephone = ret.linkmanTelephone;
            // 地址
            this.hosAddr = ret.hosAddr;
            // 资质列表数组
            this.certList = ret.certList;
            this.certListArr();
            this.hospitalSuperior_1 = ret.gradeName;
            this.hosIntroduction = ret.hosIntroduction;
          }
        });
    }
  },
  methods: {
    // 资质信息数组处理
    certListArr() {
      let arr = this.certList;
      arr.map(item => {
        if (item.type == "1") {
          return (this.arrcode1 = item.code);
        } else if (item.type == "2") {
          return (this.arrcode2 = item.code);
        } else if (item.type == "3") {
          return (this.arrcode3 = item.code);
        } else if (item.type == "4") {
          return (this.arrcode4 = item.code);
        } else if (item.type == "5") {
          return (this.arrcode5 = item.code);
        } else if (item.type == "6") {
          return (this.arrcode6 = item.code);
        } else if (item.type == "7") {
          return (this.arrcode7 = item.code);
        }
      });
      arr.map(item => {
        if (item.type == "1" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath1 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "2" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath2 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "3" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath3 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "4" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath4 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "5" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath5 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "6" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath6 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "7" && item.filePath != "null") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath7 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        }
      });
    },

    // 查看预览图片
    handleView1() {
      this.viewModal1 = true;
      // "{"fileName":"operate/user/img/20200307144207572555036.png","smallFileName":"operate/user/img/s_20200307144207572555036.png"}"
      let arr = this.certList;
      let str = arr[0].filePath;
      let strindex1 = arr[0].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src1 = this.fileBaseUrl + str1;
    },
    handleView7(file) {
      this.viewModal7 = true;
      let arr = this.certList;
      let str = arr[6].filePath;
      let strindex1 = arr[6].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src7 = this.fileBaseUrl + str1;
    },
    handleView6(file) {
      this.viewModal6 = true;
      let arr = this.certList;
      let str = arr[5].filePath;
      let strindex1 = arr[5].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src6 = this.fileBaseUrl + str1;
    },
    handleView5(file) {
      this.viewModal5 = true;
      let arr = this.certList;
      let str = arr[4].filePath;
      let strindex1 = arr[4].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src5 = this.fileBaseUrl + str1;
    },
    handleView4(file) {
      this.viewModal4 = true;
      let arr = this.certList;
      let str = arr[3].filePath;
      let strindex1 = arr[3].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src4 = this.fileBaseUrl + str1;
    },
    handleView3(file) {
      this.viewModal3 = true;
      let arr = this.certList;
      let str = arr[2].filePath;
      let strindex1 = arr[2].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src3 = this.fileBaseUrl + str1;
    },
    handleView2(file) {
      this.viewModal2 = true;
      let arr = this.certList;
      let str = arr[1].filePath;
      let strindex1 = arr[1].filePath.indexOf(",");
      let str1 = str.substring(13, strindex1 - 1).toString();
      this.src2 = this.fileBaseUrl + str1;
    }
  }
};
</script>
<style lang='less' scoped>
.mechanismregAdd {
  margin-left: 1%;
  width: 98%;
  box-sizing: border-box;
  .container {
    width: 100%;
    height: 800px;
    padding: 10px;

    background: #ffffff;
    // display: flex;
    flex-direction: column;
    .container-main {
      flex-direction: column;
      width: 80%;
      .button-bottom {
        margin-top: 100px;
        text-align: center;
        button {
          width: 200px;
          height: 50px;
        }
      }
      .ivu-col-offset-6 {
        margin: 0px;
      }
      .region,
      .address {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
        .left {
          font-size: 14px;
          padding-top: 5px;
          span:last-child {
            font-weight: 600;
          }
        }
        input {
          display: inline-block;
          width: 400px;
          border: 1px solid black;
          line-height: 30px;
          outline: none;
          background: #fff;
          text-indent: 5px;
        }
        span {
          font-size: 14px;
        }
      }
      .region {
        .ivu-col-span-6 {
          margin-right: 20px;
        }
        select {
          width: 100px;
          // margin-right: 20px;
          outline: none;
          option {
            text-align: center;
          }
        }
      }
    }
  }
}
.button-upload {
  margin-left: 10px;
}
.ivu-upload {
  display: flex;
  height: 100%;
  .ivu-upload-select {
    height: 100%;
  }
  /deep/ .ivu-upload-list {
    height: 100%;
    margin-top: -10px;
    padding-left: 4px;
    padding-right: 4px;
    .ivu-upload-list-file {
      padding: 0px;
    }
  }
}
</style>
