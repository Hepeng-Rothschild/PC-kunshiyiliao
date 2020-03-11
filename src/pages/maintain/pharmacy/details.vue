<template>
  <div class="mechanismregAdd">
    <div class="container">
      <div class="container-main">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="display:flex;">
          <div>
            <span>基本信息</span>
            <!-- 药店名称 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>药店名称:</span>
              </div>
              <FormItem prop="orgName">
                <Input v-model.trim="formValidate.orgName" clearable style="width: 300px"></Input>
              </FormItem>
            </div>
            <div class="region">
              <div class="left">
                <span style="color:red;">*</span>
                <span>药店地址:</span>
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
            <!-- 医保定点 -->

            <div class="address">
              <div class="left">
                <span>省医保定点:</span>
              </div>

              <RadioGroup v-model="formValidate.provinceyb">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
              <div class="left">市医保定点:</div>
              <RadioGroup v-model="formValidate.cityyb">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </div>
            <!-- 所属药企 -->
            <div class="address">
              <div class="left">
                <span>所属药企:</span>
              </div>

              <Select v-model="formValidate.selectenterprise" style="width:200px">
                <Option
                  v-for="item in enterpriseList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
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
            <!-- 营业时间说明 -->
            <div class="address">
              <div class="left">
                <span>营业时间说明:</span>
              </div>
              <FormItem prop="businessHours">
                <Input v-model.trim="formValidate.businessHours" businessHours style="width: 300px"></Input>
              </FormItem>
            </div>
            <!-- 药店简介 -->
            <div class="address">
              <div class="left">
                <span>药店简介:</span>
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
            <!-- 经营范围 -->
            <div class="address">
              <div class="left">
                <span>经营范围:</span>
              </div>
              <FormItem prop="businessScope">
                <Input
                  v-model.trim="formValidate.businessScope"
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
            <!-- 营业执照编号 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>营业执照编号:</span>
              </div>
              <FormItem prop="licencecode" style="display:flex;">
                <Input v-model.trim="formValidate.licencecode" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 药品经营许可证号 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>

                <span>药品经营许可证号:</span>
              </div>
              <FormItem prop="businessLicense" style="display:flex;">
                <Input v-model.trim="formValidate.businessLicense" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 药品经营质量管理规范认证证书编号-->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>

                <span>药品经营质量管理规范认证证书编号:</span>
              </div>
              <FormItem prop="qualitySpecification" style="display:flex;">
                <Input v-model.trim="formValidate.qualitySpecification" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 执业药师证编号 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>

                <span>执业药师证编号:</span>
              </div>
              <FormItem prop="pharmacistlicence" style="display:flex;">
                <Input v-model.trim="formValidate.pharmacistlicence" style="width: 200px"></Input>
              </FormItem>
              <Upload action max-size="200" accept="jpg">
                <Button type="primary">选择文件上传</Button>
              </Upload>
              <Input style="width: 100px"></Input>
              <Button type="primary" style="width:72px;height:35px;">查看</Button>
            </div>
            <!-- 医疗器械经营许可证号 -->
            <div class="address">
              <div class="left">
                <span>医疗器械经营许可证号:</span>
              </div>
              <FormItem prop="businesslicense" style="display:flex;">
                <Input v-model.trim="formValidate.businesslicense" style="width: 200px"></Input>
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
          <Button @click="$router.go(-1)" style="margin-left:30px">返回上一步</Button>
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
      enterpriseList: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        }
      ],

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
        //营业时间说明
        businessHours: "",
        // 所属药企
        selectenterprise: null,
        provinceyb: "",
        cityyb: "",
        provinceCode: "",
        // 市
        cityCode: "",
        //县
        districtCode: "",
        //详细地址
        hosAddr: "",
        //机构名称
        orgName: "",
        //其他许可证
        otherlicence: "",
        //机构组织代码
        orgCode: "",
        // 卫生许可证
        hygienelicense: "",
        // 经营许可证
        businesslicense: "",
        //联系人
        linkman: "",
        //联系人电话
        linkmanTelephone: "",
        //药店简介
        introduce: "",
        // 药师证号
        pharmacistlicence: "",
        // 药品经营质量管理规范认证证书编号
        qualitySpecification: "",
        // 经营范围
        businessScope: "",
        //营业执照编号
        licencecode: "",
        //药品经营许可证
        businessLicense: ""
      },
      ruleValidate: {
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
        // 药品经营许可证
        businessLicense: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入药品经营许可证号",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 营业执照编号
        licencecode: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入营业执照编号",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 药品经营质量管理规范认证证书编号
        qualitySpecification: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入药品经营质量管理规范认证证书编号",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 药师证编号
        pharmacistlicence: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入执业药师证编号",
            // 触发事件
            trigger: "blur"
          }
        ],
        // 药店名称
        orgName: [
          {
            // 是否校验
            required: true,
            // 提示文字
            message: "请输入药店名称",
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
            message: "请填写详细的地址",
            // 触发事件
            trigger: "blur"
          }
        ],
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
            message: "请输入联系人电话",
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
      this.$axios.post(api.managementAll).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.gradeList = ret;
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
