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
                @click="handleView"
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
                @click="handleView"
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
                @click="handleView"
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
                @click="handleView"
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
                @click="handleView"
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
                @click="handleView"
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
                @click="handleView"
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
    <Modal title="查看上传照片" width="30" v-model="viewModal" footer-hide>
      <div>
        <img :src="src" style="width: 100%" />
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
        hospitalSuperior_1: "",
hosIntroduction:"",
      certList: [],
      // 资质信息代号
      arrcode1: "",
      arrcode2: "",
      arrcode3: "",
      arrcode4: "",
      arrcode5: "",
      arrcode6: "",
      arrcode7: "",
      // 图片地址
      filePath1: "",
      filePath2: "",
      filePath3: "",
      filePath4: "",
      filePath5: "",
      filePath6: "",
      filePath7: "",
      // 预览图片的src
      src: "",
      // 预览图片Modal
      viewModal: false,
      uploadUrl: api.fileAll,
      // 机构级别
      SuperiorList: [
        {
          value: "1",
          label: "三级甲等"
        },
        {
          value: "2",
          label: "三级乙等"
        }
      ],
      hospitalSuperior: [
        {
          value: "1",
          label: "无"
        },
        {
          value: "2",
          label: "1"
        }
      ],
      //  机构分类
      hospitalSuperiorList: [
        {
          value: "1",
          label: "公立"
        },
        {
          value: "2",
          label: "私立"
        }
      ],
      typeList: [
        {
          value: "1",
          label: "综合医院"
        },
        {
          value: "2",
          label: "专科医院"
        },
        {
          value: "3",
          label: "中医医院"
        }
      ],
      hosAddr: "",
      //机构名称
      orgName: "",
      //机构组织代码
      orgCode: "",
      //联系人
      linkman: "",
      //联系人电话
      linkmanTelephone: "",
      formValidate: {
        provinceCode: "",
        // 市
        cityCode: "",
        //县
        districtCode: "",
        //详细地址

        //机构分类
        hospitalSuperiorList_1: "1",
        hospitalSuperior_1: "1",
        SuperiorList_1: "1",
        hospitalType: "1",
        // 其他许可证号
        otherlicence: "",
        // 卫生许可证
        hygienelicense: "",
        // 设备许可证
        equipmentlicense: "",
        //保健许可证
        healthlicense: "",
        // 收费许可证
        feelicense: "",
        // 放射许可证
        radiationpermit: "",
        //公私
        property: null,
        //机构电话
        telephone: "",

        //医疗结构简介
        introduce: "",
        //医疗机构执业许可证登记号
        licence: ""
      }
    };
  },
  created() {
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.$axios
        .post(api.mechanismregSearch, {
          hospitalId: id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            //省
            this.formValidate.provinceCode = ret.provinceCode.toString();
            //市
            this.formValidate.cityCode = ret.cityCode.toString();
            // //机构全称
            this.orgName = ret.orgName;
            // //机构代码
            this.orgCode = ret.orgCode;
            // //机构类型
            this.formValidate.hospitalType = ret.hospitalType.toString();
            // //机构等级
            this.formValidate.grade = ret.grade;
            // //联系人
            this.linkman = ret.linkman;
            // //联系人电话
            this.linkmanTelephone = ret.linkmanTelephone;
            // 地址
            this.hosAddr = ret.hosAddr;
            // 医院ID
            this.formValidate.id = ret.hospitalId;
            // 资质列表数组
            this.certList = ret.certList;
            this.certListArr();
            this.hospitalSuperior_1 = ret.gradeName
            this.hosIntroduction = ret.hosIntroduction
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
        if (item.type == "1") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath1 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "2") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath2 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "3") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath3 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "4") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath4 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "5") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath5 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "6") {
          let strindex = item.filePath.indexOf(",");
          let strindex1 = item.filePath.indexOf("g");
          return (this.filePath6 = item.filePath.substring(
            strindex1 + 2,
            strindex - 1
          ));
        } else if (item.type == "7") {
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
    handleView() {
      this.viewModal = true;
      // "{"fileName":"operate/user/img/20200307144207572555036.png","smallFileName":"operate/user/img/s_20200307144207572555036.png"}"
      let arr = this.certList;
      arr.map(item => {
        if (item.type == "1") {
          return (this.src = "operate/user/img/" + this.filePath1);
        } else if (item.type == "2") {
          return (this.src = "operate/user/img/" + this.filePath2);
        } else if (item.type == "3") {
          return (this.src = "operate/user/img/" + this.filePath3);
        } else if (item.type == "4") {
          return (this.src = "operate/user/img/" + this.filePath4);
        } else if (item.type == "5") {
          return (this.src = "operate/user/img/" + this.filePath5);
        } else if (item.type == "6") {
          return (this.src = "operate/user/img/" + this.filePath6);
        } else if (item.type == "7") {
          return (this.src = "operate/user/img/" + this.filePath27);
        }
      });
    },
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
