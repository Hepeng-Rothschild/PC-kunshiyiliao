<template>
  <div class="mechanismregAdd">
    <div class="container">
      <div class="container-main">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="display:flex;">
          <div style="width:40%">
            <span style="color:blue;font-size:20px">基本信息</span>
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
                  style="width: 480px"
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
                style="width: 480px"
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
                  style="width: 417px"
                ></Input>
              </FormItem>
            </div>
            <!-- 机构分类 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>机构分类:</span>
              </div>
              <FormItem prop="hospitalNature">
                <Select v-model="formValidate.hospitalNature" style="width:200px;margin-right:10px">
                  <Option
                    v-for="item in typeList"
                    :value="item.dictType"
                    :key="item.dictType"
                  >{{ item.dictName}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="property">
                <Select v-model="formValidate.property" style="width:200px">
                  <Option
                    v-for="item in hospitalSuperiorList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </div>
            <!-- 机构级别 -->
            <div class="address">
              <div class="left">
                <span style="color:red;">*</span>
                <span>机构级别:</span>
              </div>
              <FormItem prop="grade">
                <Select v-model="formValidate.grade" style="width:200px;margin-right:10px">
                  <Option
                    v-for="item in SuperiorList"
                    :value="item.dictType"
                    :key="item.dictType"
                  >{{ item.dictName}}</Option>
                </Select>
              </FormItem>
              <div class="left">
                <span>上级医院:</span>
              </div>
              <FormItem prop="orgParentCode">
                <Select v-model="formValidate.orgParentCode" style="width:200px">
                  <Option
                    v-for="item in hospitalSuperior"
                    :value="item.orgCode"
                    :key="item.id"
                  >{{ item.orgName }}</Option>
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
                  style="width: 200px;margin-right:10px"
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
                  style="width: 200px"
                  :maxlength="11"
                />
              </FormItem>
            </div>
            <!-- 机构简介 -->
            <div class="address">
              <div class="left">
                <span>机构简介:</span>
              </div>
              <FormItem prop="hosIntroduction">
                <Input
                  v-model.trim="formValidate.hosIntroduction"
                  type="textarea"
                  :rows="4"
                  style="width: 490px"
                />
              </FormItem>
            </div>
          </div>

          <div>
            <span style="color:blue;font-size:20px">资质信息</span>
            <span style="color:red;">(注意:图片只能上传jpg格式，且文件大小不超过200KB)</span>
            <!-- 医疗机构执业许可证上传 -->
            <div class="address" style="justify-content: space-between;">
              <div class="left">
                <span style="color:red;">*</span>
                <span>医疗机构执业许可证登记号:</span>
              </div>
              <FormItem prop="licence" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[0].code" style="width: 200px"></Input>
              </FormItem>
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList1"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview1"
                :data="uploadData"
                :on-success="handleSuccess1"
                :on-remove="onremove1"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath1" style="width: 100px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView1"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove1"
                class="button-upload"
              >删除</Button>
            </div>
            <div class="address" style="justify-content: space-between;">
              <div class="left">
                <span>收费许可证号:</span>
              </div>
              <FormItem prop="feelicense" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[1].code" style="width: 305px"></Input>
              </FormItem>
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList2"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview2"
                :data="uploadData"
                :on-success="handleSuccess2"
                :on-remove="onremove2"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath2" style="width: 100px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView2"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove2"
                class="button-upload"
              >删除</Button>
            </div>
            <!-- 放射诊疗许可证号-->
            <div class="address" style="justify-content: space-between;">
              <div class="left">
                <span>放射诊疗许可证号:</span>
              </div>
              <FormItem prop="radiationpermit" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[2].code" style="width: 278px"></Input>
              </FormItem>
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList3"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview3"
                :data="uploadData"
                :on-success="handleSuccess3"
                :on-remove="onremove3"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath3" style="width: 100px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView3"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove3"
                class="button-upload"
              >删除</Button>
            </div>
            <!-- 母婴保健技术服务执业许可证号 -->
            <div class="address" style="justify-content: space-between;">
              <div class="left">
                <span>母婴保健技术服务执业许可证号:</span>
              </div>
              <FormItem prop="healthlicense" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[3].code" style="width: 189px"></Input>
              </FormItem>
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList4"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview4"
                :data="uploadData"
                :on-success="handleSuccess4"
                :on-remove="onremove4"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath4" style="width: 100px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView4"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove4"
                class="button-upload"
              >删除</Button>
            </div>
            <!-- 大型医疗设备许可证号 -->
            <div class="address" style="justify-content: space-between;">
              <div class="left">
                <span>大型医疗设备许可证号:</span>
              </div>
              <FormItem prop="equipmentlicense" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[4].code" style="width: 250px"></Input>
              </FormItem>
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList5"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview5"
                :data="uploadData"
                :on-success="handleSuccess5"
                :on-remove="onremove5"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath5" style="width: 100px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView5"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove5"
                class="button-upload"
              >删除</Button>
            </div>
            <!-- 卫生许可证编号 -->
            <div class="address" style="justify-content: space-between;">
              <div class="left">
                <span>卫生许可证编号:</span>
              </div>
              <FormItem prop="hygienelicense" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[5].code" style="width: 295px"></Input>
              </FormItem>
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList6"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview6"
                :data="uploadData"
                :on-success="handleSuccess6"
                :on-remove="onremove6"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath6" style="width: 100px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView6"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove6"
                class="button-upload"
              >删除</Button>
            </div>
            <!-- 其他资质证书说明 -->
            <div class="address">
              <div class="left">
                <span>其他资质证书说明:</span>
              </div>
              <FormItem prop="otherlicence" style="display:flex;">
                <Input v-model.trim="formValidate.certListMap[6].code" style="width: 680px"></Input>
              </FormItem>
            </div>
            <div style="display:flex;">
              <Upload
                ref="upload"
                :headers="fromData"
                :action="uploadUrl"
                :default-file-list="uploadList7"
                :format="['jpg']"
                :on-format-error="uploadFormatError"
                max-size="200"
                :on-exceeded-size="handleMaxSize"
                :before-upload="preview7"
                :data="uploadData"
                :on-success="handleSuccess7"
                :on-remove="onremove7"
                :show-upload-list="noshow"
              >
                <Button type="primary" class="button-upload">选择文件上传</Button>
              </Upload>
              <Input v-model="filePath7" style="width: 508px"></Input>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="handleView7"
                class="button-upload"
              >查看</Button>
              <Button
                type="primary"
                style="width:72px;height:32px;"
                @click="onremove7"
                class="button-upload"
              >删除</Button>
            </div>
          </div>
        </Form>
        <div class="button-bottom">
          <Button type="primary" @click="handleSubmit('formValidate')">修改机构</Button>
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
import code from "@/configs/base.js";

import newfourLevelLinkage from "@/components/newfourLevelLinkage";
export default {
  components: {
    newfourLevelLinkage
  },
  data() {
    return {
      noshow: false,
      uploadData: {
        json: '{"urlCode":"' + code.urlCode.userImage + '"}'
      },
      // 查看列表
      uploadList1: [],
      uploadList2: [],
      uploadList3: [],
      uploadList4: [],
      uploadList5: [],
      uploadList6: [],
      uploadList7: [],

      // 预览图片的src
      src1: "",
      src2: "",
      src3: "",
      src4: "",
      src5: "",
      src6: "",
      src7: "",
      // 图片地址名字
      filePath1: "",
      filePath2: "",
      filePath3: "",
      filePath4: "",
      filePath5: "",
      filePath6: "",
      filePath7: "",
      // 预览图片Modal
      viewModal1: false,
      viewModal2: false,
      viewModal3: false,
      viewModal4: false,
      viewModal5: false,
      viewModal6: false,
      viewModal7: false,
      uploadUrl: api.fileAll,
      // 机构级别
      SuperiorList: [],
      // 上级医院列表
      hospitalSuperior: [
        {
          id: 0,
          orgName: "无",
          orgCode: "0"
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
      typeList: [],
      formValidate: {
        id: null,
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
        hosIntroduction: "",
        //机构分类
        property: "1",
        orgParentCode: "0",
        grade: "03f12e03-0c2a-4339-84e7-31a50229d018",
        hospitalNature: "YLJGLB01",
        certListMap: [
          {
            type: "1",
            code: "",
            filePath: null
          },
          {
            type: "2",
            code: "",
            filePath: null
          },
          {
            type: "3",
            code: "",
            filePath: null
          },
          {
            type: "4",
            code: "",
            filePath: null
          },
          {
            type: "5",
            code: "",
            filePath: null
          },
          {
            type: "6",
            code: "",
            filePath: null
          },
          {
            type: "7",
            code: "",
            filePath: null
          }
        ]
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

        // 公私
        property: [
          {
            required: true,
            message: "请选择公立私立",
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
      //城市列表
      provList: [],
      cityList: [],
      countyList: [],

      province: null,
      city: null,
      area: null,
      isBack: 2,
      newprovince: "",
      newcity: "",
      newdistrict: "",
      cStatus: true,
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
  },
  mounted() {
    // a获取医院等级
    this.getGrent();
    //获取省级信息
    this.getCity();
    // 获取机构分类
    this.getClass();
    // 获取上级医院
    this.getLastHospital();
    let id = this.$route.query.id;
    this.formValidate.id = id;
    if (id) {
      this.$axios
        .post(api.mechanismregSearch, {
          hospitalId: id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            console.log("-----", ret);
            // //机构全称
            this.formValidate.orgName = ret.orgName;
            // //机构代码
            this.formValidate.orgCode = ret.orgCode;
            // //机构等级
            this.formValidate.grade = ret.grade;
            // //联系人
            this.formValidate.linkman = ret.linkman;
            // //联系人电话
            this.formValidate.linkmanTelephone = ret.linkmanTelephone;
            // 地址
            this.formValidate.hosAddr = ret.hosAddr;
            this.certList = ret.certList;
            this.certListArr();
            this.formValidate.hosIntroduction = ret.hosIntroduction;
            this.formValidate.certListMap[0].code = ret.certList[0].code;
            this.formValidate.certListMap[1].code = ret.certList[1].code;
            this.formValidate.certListMap[2].code = ret.certList[2].code;
            this.formValidate.certListMap[3].code = ret.certList[3].code;
            this.formValidate.certListMap[4].code = ret.certList[4].code;
            this.formValidate.certListMap[5].code = ret.certList[5].code;
            this.formValidate.certListMap[6].code = ret.certList[6].code;
          } else {
          }
        });
    }
  },
  methods: {
    // 资质信息数组处理
    certListArr() {
      let arr = this.certList;
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
    // 获取上级医院
    getLastHospital() {
      this.$axios.post(api.managementYlt).then(res => {
        if (res.data.success) {
          let ret = res.data.object;
          for (let i in ret) {
            this.hospitalSuperior.push(ret[i]);
          }
        }
      });
    },
    // 获取机构分类
    getClass() {
      this.$axios.post(api.classification).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.typeList = ret;
          // console.log(ret);
        }
      });
    },
    // 获取医院等级
    getGrent() {
      this.$axios.post(api.managementAll).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.SuperiorList = ret;
        }
      });
    },
    //       控制图片上传开始---------------------------------------------------------------------
    onremove1(file, fileList) {
      this.uploadList1 = [];
      this.filePath1 = "";
      this.src1 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess1(res, file) {
      res = this.uploadFileDecrypt(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[0].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList1.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath1 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview1(file) {
      const check = this.uploadList1.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src1 = window.URL.createObjectURL(file);
      }
    },
    // // 查看预览图片
    handleView1(file) {
      this.viewModal1 = true;
    },
    //       第二个----------------------------------
    onremove2(file, fileList) {
      this.uploadList2 = [];
      this.filePath2 = "";
      this.src2 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess2(res, file) {
      res = this.uploadFileDecrypt(res);
      // console.log(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[1].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList2.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath2 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview2(file) {
      const check = this.uploadList2.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src2 = window.URL.createObjectURL(file);
      }
    },
    handleView2(file) {
      this.viewModal2 = true;
    },
    // 第三个-----------
    onremove3(file, fileList) {
      this.uploadList3 = [];
      this.filePath3 = "";
      this.src3 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess3(res, file) {
      res = this.uploadFileDecrypt(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[2].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList3.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath3 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview3(file) {
      const check = this.uploadList3.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src3 = window.URL.createObjectURL(file);
      }
    },
    handleView3(file) {
      this.viewModal3 = true;
    },
    // 第四个------------
    onremove4(file, fileList) {
      this.uploadList4 = [];
      this.filePath4 = "";
      this.src4 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess4(res, file) {
      res = this.uploadFileDecrypt(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[3].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList4.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath4 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview4(file) {
      const check = this.uploadList4.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src4 = window.URL.createObjectURL(file);
      }
    },
    handleView4(file) {
      this.viewModal4 = true;
    },
    // 第五个----------
    onremove5(file, fileList) {
      this.uploadList5 = [];
      this.filePath5 = "";
      this.src5 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess5(res, file) {
      res = this.uploadFileDecrypt(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[4].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList5.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath5 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview5(file) {
      const check = this.uploadList5.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src5 = window.URL.createObjectURL(file);
      }
    },
    handleView5(file) {
      this.viewModal5 = true;
    },
    // 第六个------
    onremove6(file, fileList) {
      this.uploadList6 = [];
      this.filePath6 = "";
      this.src6 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess6(res, file) {
      res = this.uploadFileDecrypt(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[5].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList6.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath6 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview6(file) {
      const check = this.uploadList6.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src6 = window.URL.createObjectURL(file);
      }
    },
    handleView6(file) {
      this.viewModal6 = true;
    },
    // 第七个 -----------
    onremove7(file, fileList) {
      this.uploadList7 = [];
      this.filePath7 = "";
      this.src7 = "";
    },
    // 文件上传成功触发的函数
    handleSuccess7(res, file) {
      res = this.uploadFileDecrypt(res);

      if (res.success) {
        file.url = this.fileBaseUrl + res.object[0].fileName;
        this.images = JSON.stringify(res.object[0]);
        file.name = res.object[0].fileName;
        this.formValidate.certListMap[6].filePath = res.object[0];
        let obj = {};
        obj.name = file.name;
        obj.url = file.url;
        this.uploadList7.push(obj);

        let strindex = file.name.indexOf("j");
        let strindex1 = file.name.indexOf("g");
        this.filePath7 = file.name.substring(strindex1 + 2, strindex + 3);
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    preview7(file) {
      const check = this.uploadList7.length < 1;
      if (!check) {
        this.$Message.info("只能上传一张图片");
      } else {
        this.src7 = window.URL.createObjectURL(file);
      }
    },
    handleView7(file) {
      this.viewModal7 = true;
    },

    // 控制图片上传结束-------------------------------------------------------------------------
    // 上传图片大小错误提醒
    handleMaxSize() {
      this.$Message.error("上传图片大小不能超过200kb");
    },
    // 上传图片格式错误提醒
    uploadFormatError() {
      this.$Message.error("上传图片类型只能是jpg格式");
    },
    changeProvince(val) {
      this.province = val;
    },
    changeCity(val) {
      this.city = val;
    },
    changeArea(val) {
      this.area = val;
    },
    // 获取省级
    getCity() {
      this.$axios.post(api.getCity).then(res => {
        if (res.data) {
          // console.log(res.data);
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

      if (this.formValidate.certListMap[0].code) {
        this.$refs[name].validate(valid => {
          if (valid) {
            // 必填项填写完成
            this.$axios
              .post(api.mechanismregEdit, this.formValidate)
              .then(res => {
                console.log("----------", res);

                if (res.data.code) {
                  let ret = res.data;
                  this.$Message.info("修改成功");
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
                        area: this.area,
                        hospital: this.hospital,
                        isBack: 2
                      }
                    );
                  }, 500);
                } else {
                  this.$Message.info("修改失败请重试");
                }
              });
          } else {
            // 必填项填写失败
            this.$Message.error("请检查必填项是否填写正确！");
          }
        });
      } else {
        this.$Message.error("请输入医疗机构执业许可证登记号");
      }
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
      width: 100%;
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
      .hosAddr {
        margin-left: 80px;
      }
    }
  }
}
.button-upload {
  margin-left: 10px;
  margin-right: 10px;
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
