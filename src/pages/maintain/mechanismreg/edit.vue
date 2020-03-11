<template>
  <div class="mechanismregAdd">
    <span>医院基本信息</span>
    <span @click="$router.push('/index/maintain/mechanismreg/mechanismregDepartment')">院内科室</span>
    <div class="container">
      <div class="container-main">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="display:flex;">
          <div>
            <span>基本信息</span>
            <!-- 机构名称 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>机构名称:</span>
              </div>
              <FormItem prop="orgName">
                <Input
                  v-model.trim="formValidate.orgName"
                  placeholder="请输入机构名称"
                  clearable
                  style="width: 300px"
                ></Input>
              </FormItem>
            </div>
            <div class="region">
              <div class="left">
                <span style="color:red;">*</span>
                <span>机构地址:</span>
              </div>
              <div v-if="idtt == 2 || idtt == 3" style="margin-bottom:20px">
                <Col span="24" offset="6">
                  <newfourLevelLinkage
                    @changeProvince="changeProvince"
                    @changeCity="changeCity"
                    @changeArea="changeArea"
                  ></newfourLevelLinkage>
                </Col>
              </div>
              <div v-if="idtt == 4 || idtt == 5">
                <FormItem>
                  <Select v-model="newprovince" :disabled="cStatus" style="width:100px">
                    <Option :value="newprovince">{{ newprovince }}</Option>
                  </Select>
                  <Select v-model="newcity" :disabled="cStatus" style="width:100px">
                    <Option :value="newcity">{{ newcity }}</Option>
                  </Select>
                  <Select v-model="newdistrict" :disabled="cStatus" style="width:90px">
                    <Option :value="newdistrict">{{ newdistrict }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div v-if="idtt == 0">
                <!-- 省 -->
                <Col span="6">
                  <FormItem prop="provinceCode">
                    <Select
                      v-model="formValidate.provinceCode"
                      @on-change="provChange"
                      style="width:100px"
                    >
                      <Option
                        v-for="item in provList"
                        :value="item.id"
                        :key="item.value"
                        style="text-align:center;"
                      >{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="cityCode">
                    <Select
                      v-model="formValidate.cityCode"
                      @on-change="cityChange"
                      style="width:80px;"
                    >
                      <Option
                        v-for="items in cityList"
                        :value="items.id"
                        :key="items.city"
                        style="text-align:center;"
                      >{{items.city}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="districtCode">
                    <Select v-model="formValidate.districtCode" style="width:130px">
                      <Option
                        v-for="item in countyList"
                        :value="item.id"
                        :key="item.area"
                      >{{ item.area }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </div>
            </div>
            <FormItem prop="hosAddr" class="hosAddr">
              <Input
                v-model.trim="formValidate.hosAddr"
                placeholder="请输入详细地址"
                clearable
                style="width: 300px"
              ></Input>
            </FormItem>
            <!-- 机构组织编码 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>医疗机构组织代码:</span>
              </div>
              <FormItem prop="orgCode">
                <Input
                  v-model.trim="formValidate.orgCode"
                  placeholder
                  clearable
                  style="width: 300px"
                ></Input>
              </FormItem>
            </div>
            <!-- 机构分类 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>机构分类:</span>
              </div>
              <FormItem prop="hospitalType">
                <Select v-model="formValidate.hospitalType" style="width:200px">
                  <Option
                    v-for="item in typeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
              <div class="left">
                <span>上级医院:</span>
              </div>
              <FormItem prop="hospitalSuperior">
                <Select v-model="formValidate.hospitalSuperior" style="width:200px">
                  <Option
                    v-for="item in hospitalSuperiorList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </div>
            <!-- 联系人和电话 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>联系人:</span>
              </div>
              <FormItem prop="linkman">
                <Input
                  v-model.trim="formValidate.linkman"
                  placeholder
                  clearable
                  style="width: 300px"
                />
              </FormItem>
              <div class="left">
                <span style="color:red;">*</span>
                <span>联系电话:</span>
              </div>
              <FormItem prop="linkmanTelephone">
                <Input
                  v-model.trim="formValidate.linkmanTelephone"
                  placeholder
                  clearable
                  style="width: 300px"
                  :maxlength="11"
                />
              </FormItem>
            </div>
            <!-- 机构简介 -->
            <div class="address">
              <div class="left">
                <span>机构简介:</span>
              </div>
              <FormItem prop="introduce">
                <Input
                  v-model.trim="formValidate.introduce"
                  type="textarea"
                  :rows="4"
                  style="width: 500px"
                />
              </FormItem>
            </div>
          </div>

          <div>
            <span>资质信息</span>
            <span style="color:red;">(注意:图片只能上传jpg格式，且文件大小不超过200KB)</span>
            <!-- 医疗机构执业许可证上传 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>医疗机构执业许可证登记号:</span>
              </div>
              <FormItem prop="licence" style="display:flex;">
                <Input v-model.trim="formValidate.licence" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 收费许可证号 -->
            <div class="address">
              <div class="left">
                <span>收费许可证号:</span>
              </div>
              <FormItem prop="feelicense" style="display:flex;">
                <Input v-model.trim="formValidate.feelicense" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 放射诊疗许可证号-->
            <div class="address">
              <div class="left">
                <span>放射诊疗许可证号:</span>
              </div>
              <FormItem prop="radiationpermit" style="display:flex;">
                <Input v-model.trim="formValidate.radiationpermit" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 母婴保健技术服务执业许可证号 -->
            <div class="address">
              <div class="left">
                <span>母婴保健技术服务执业许可证号:</span>
              </div>
              <FormItem prop="healthlicense" style="display:flex;">
                <Input v-model.trim="formValidate.healthlicense" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 大型医疗设备许可证号 -->
            <div class="address">
              <div class="left">
                <span>大型医疗设备许可证号:</span>
              </div>
              <FormItem prop="equipmentlicense" style="display:flex;">
                <Input v-model.trim="formValidate.equipmentlicense" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 卫生许可证编号 -->
            <div class="address">
              <div class="left">
                <span>卫生许可证编号:</span>
              </div>
              <FormItem prop="hygienelicense" style="display:flex;">
                <Input v-model.trim="formValidate.hygienelicense" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 其他资质证书说明 -->
            <div class="address">
              <div class="left">
                <span>其他资质证书说明:</span>
              </div>
              <FormItem prop="otherlicence" style="display:flex;">
                <Input v-model.trim="formValidate.otherlicence" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
              <Button type="primary" style="width:72px;height:35px;">删除</Button>
            </div>
          </div>
        </Form>
        <div class="button-bottom">
          <Button type="primary" @click="handleSubmit('formValidate')">修改机构</Button>
          <Button @click="$router.go(-1)" style="margin-left:30px">取消</Button>
        </div>
      </div>
    </div>
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
      // 上级医院
      hospitalSuperiorList: [
        {
          value: "综合医院",
          label: "综合医院"
        }
      ],
      typeList: [
        {
          value: "综合医院",
          label: "综合医院"
        },
        {
          value: "专科医院",
          label: "专科医院"
        },
        {
          value: "中医医院",
          label: "中医医院"
        }
      ],
      formValidate: {
        provinceCode: "",
        // 市
        cityCode: "",
        //县
        districtCode: "",
        //详细地址
        hosAddr: "",
        //机构名称
        orgName: "",
        //机构组织代码
        orgCode: "",
        //机构分类
        hospitalType: '',
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
        //机构等级
        grade: null,
        //机构电话
        telephone: "",
        //上级医院
        hospitalSuperior: null,
        //联系人
        linkman: "",
        //联系人电话
        linkmanTelephone: "",
        //医疗结构简介
        introduce: "",
        //医疗机构执业许可证登记号
        licence: ""
      },
      ruleValidate: {
        // 医疗机构执业许可证登记号
        licence: [
          {
            required: true,
            message: "请输入医疗机构执业许可证登记号",
            trigger: "blur"
          }
        ],
        // 城
        provinceCode: [
          {
            required: true,
            message: "请选择省级",
            trigger: "change"
          }
        ],
        // 市
        cityCode: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change"
          }
        ],
        //县
        districtCode: [
          {
            required: true,
            message: "请选择区县",
            trigger: "change"
          }
        ],
        // 机构名称
        orgName: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入机构名称",
            // 触发事件
            trigger: "blur"
          }
        ],
        //详细地址
        hosAddr: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请填写详细的地址:省、市、区",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 组织机构代码
        orgCode: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入医疗组织机构代码",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 机构类型
        hospitalType: [
          {
            required: true,
            message: "请选择机构类型",
            trigger: "change"
          }
        ],
        // 公私
        property: [
          {
            required: true,
            message: "请选择公立私立",
            trigger: "change"
          }
        ],
        // 公私
        grade: [
          {
            required: true,
            message: "请选择机构级别",
            trigger: "change"
          }
        ],
        // 机构电话
        // telephone:[
        // 	{
        // 		// 是否校验
        // 		required: false,
        // 		// 提示文字
        // 		message: "请输入机构电话",
        // 		// 触发事件
        // 		trigger: "blur"
        // 	}
        // ],
        // 联系人
        linkman: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入联系人",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 联系人电话
        linkmanTelephone: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入联系电话",
            // 触发事件
            trigger: "blur"
          }
        ]
      },
      idtt: ""
    };
  },
  created() {
    if (cookie.getCookie("idtt") == 4 || cookie.getCookie("idtt") == 5) {
      this.newprovince = JSON.parse(sessionStorage.getItem("list"))[0].province;
      this.newcity = JSON.parse(sessionStorage.getItem("list"))[0].city;
      this.newdistrict = JSON.parse(sessionStorage.getItem("list"))[0].district;
      console.log(sessionStorage.getItem("list"));
      console.log(this.newprovince, this.newcity, this.newdistrict);
      this.idtt = 5;
    } else if (cookie.getCookie("idtt") == 2) {
      this.idtt = 2;
    } else if (cookie.getCookie("idtt") == 3) {
      this.idtt = 3;
    } else if (cookie.getCookie("idtt") == 4) {
      this.idtt = 4;
    } else {
      this.idtt = 0;
    }
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
  },
  mounted() {
    //获取省级信息
    this.getCity();
    // a获取医院等级
    this.getGrent();
    let id = this.$route.query.id;
    if (id) {
      this.$axios
        .post(api.mechanismregSearch, {
          hospitalId: id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            console.log(ret);
            
            //省
            this.formValidate.provinceCode = ret.provinceCode.toString();
            //市
            this.formValidate.cityCode = ret.cityCode.toString();
            // //机构全称
            this.formValidate.orgName = ret.orgName;
            // //机构代码
            this.formValidate.orgCode = ret.orgCode;
            // //机构类型
            this.formValidate.hospitalType = ret.hospitalType.toString();
            // //机构等级
            this.formValidate.grade = ret.grade;
            // //联系人
            this.formValidate.linkman = ret.linkman;
            // //联系人电话
            this.formValidate.linkmanTelephone = ret.linkmanTelephone;
            // 地址
            this.formValidate.hosAddr = ret.hosAddr;
            // 医院ID
            this.formValidate.id = ret.hospitalId;
          } else {
          }
        });
    }
  },
  methods: {
    changeProvince(val) {
      this.province = val;
    },
    changeCity(val) {
      this.city = val;
    },
    changeArea(val) {
      this.area = val;
    },
    //获取医院等级
    getGrent() {
      this.$axios.post(api.classification).then(res => {
        if (res.data) {
          let ret = res.data.object;
          // this.gradeList = ret;
          console.log("dengji", ret);
        }
      });
    },
    // 获取省级
    getCity() {
      this.$axios.post(api.getCity).then(res => {
        if (res.data) {
          console.log(res.data);
          let ret = res.data.object;
          ret.forEach(item => {
            item.id = item.id.toString();
          });
          this.provList = ret;
        }
      });
    },
    // 省级改变获取市级
    provChange() {
      let list = this.provList;
      let len = list.length;
      // 城市列表
      this.cityList = [];
      this.formValidate.cityCode = "";
      // 区县
      this.formValidate.districtCode = "";
      this.countyList = [];
      let citylist;
      if (list != -1) {
        for (let i = 0; i < len; i++) {
          console.log(this.formValidate.provinceCode);
          if (list[i].id == this.formValidate.provinceCode) {
            citylist = list[i].cityList;
            console.log(list[i].cityList);
            list[i].cityList.forEach(item => {
              item.id = item.id.toString();
            });
          }
        }
        this.cityList = citylist;
      }
    },
    //市级改变获取县级
    cityChange() {
      if (Boolean(this.formValidate.cityCode)) {
        // 区县
        this.formValidate.districtCode = "";
        this.countyList = [];
        this.$axios
          .post(api.getCounty, {
            cityId: this.formValidate.cityCode
          })
          .then(res => {
            if (res.data) {
              let ret = res.data.object;
              ret.forEach(item => {
                item.id = item.id.toString();
              });
              this.countyList = ret;
            }
          });
      }
    },
    // 提交表单
    handleSubmit(name) {
      console.log(this.formValidate);
      if (this.idtt == 5 || this.idtt == 4 || this.idtt == 3) {
        this.formValidate.provinceCode = this.$route.query.province;
        this.formValidate.cityCode = this.$route.query.city;
        this.formValidate.districtCode = this.$route.query.area;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          // 必填项填写完成
          this.$axios.post(api.mechanismregAdd, this.formValidate).then(res => {
            if (res.data.code) {
              this.$Message.info("添加成功");
              let pageNo = this.$route.query.pageNo;
              setTimeout(() => {
                // functionJS公用 方法
                this.functionJS.queryNavgationTo(
                  this,
                  "/index/maintain/mechanismreg/list",
                  {
                    pageNo,
                    province: this.province,
                    city: this.city,
                    area: null,
                    hospital: this.hospital,
                    isBack: 2
                  }
                );
              }, 500);
            } else {
              this.$Message.info(res.data.message);
            }
          });
        } else {
          // 必填项填写失败
          this.$Message.error("请检查必填项是否填写正确!");
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.mechanismregAdd {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  box-sizing: border-box;
  .container {
    width: 100%;
    height: 800px;
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
        .left {
          font-size: 20px;
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
      }
      .region {
        select {
          width: 100px;
          margin-right: 10px;
          outline: none;
          option {
            text-align: center;
          }
        }
      }
      .hosAddr {
        margin-left: 110px;
      }
    }
  }
}
</style>
