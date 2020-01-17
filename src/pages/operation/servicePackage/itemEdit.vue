<template>
    <div class="doctorreviewedit">
        <Row>
            <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
        </Row>
        <Form ref="formInline" :model="info" :rules="infoRules" inline>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>服务项目类型：
                </Col>
                <Col :xs="21">
                    <FormItem prop="nature" v-if="natureList.length>0">
                        <Select class="w-select" v-model="info.nature" @on-change="changeHospital" style='width:180px;'>
                            <Option
                                v-for="item of natureList"
                                :key="item.id"
                                :value="item.id"
                                style='text-align:center;'
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>服务项目归属：
                </Col>
                <Col :xs="21">
                    <FormItem prop="attribution">
                        <Select
                            class="w-select"
                            @on-change="changeProvince"
                            placeholder="省"
                            v-model="info.provinceId"
                            :disabled="provinceStatus"
                            :clearable="!provinceStatus"
                        >
                            <Option
                                v-for="item in provinceList"
                                :value="item.id"
                                :key="item.id"
                                style='text-align:center;'
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeCity"
                            placeholder="市"
                            v-model="info.cityId"
                            :disabled="cityStatus"
                            :clearable="!cityStatus"
                        >
                            <Option
                                v-for="item in cityList"
                                :value="item.id"
                                :key="item.id"
                                style='text-align:center;'
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeArea"
                            placeholder="区/县"
                            v-model="info.areaId"
                            :disabled="areaStatus"
                            :clearable="!areaStatus"
                        >
                            <Option
                                v-for="item in areaList"
                                :value="item.id"
                                :key="item.id"
                                style='text-align:center;'
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select-hos"
                            placeholder="医院"
                            v-model="info.hospitalId"
                            :disabled="hospitalStatus"
                            :clearable="!hospitalStatus"
                        >
                            <Option
                                v-for="item in hospitalList"
                                :value="item.id"
                                :key="item.id"
                                style='text-align:center;'
                            >{{item.orgName}}</Option>
                        </Select>
                        <iSwitch
                            v-if="info.hospitalId != '' && info.hospitalId != null && info.hospitalId != 0"
                            v-model="info.ascription"
                            :true-value="1"
                            :false-value="0"
                            size="large"
                        >
                            <span slot="open">公有</span>
                            <span slot="close">私有</span>
                        </iSwitch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>服务项目名称：
                </Col>
                <Col :xs="21">
                    <FormItem prop="serviceName">
                        <Input
                            class="w-input"
                            v-model="info.serviceName"
                            :maxlength="60"
                            placeholder="请输入服务项目名称"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>操作规范：
                </Col>
                <Col :xs="21">
                    <FormItem prop="serviceDes">
                        <Input
                            class="w-input"
                            v-model="info.serviceDes"
                            type="textarea"
                            :maxlength="100"
                            placeholder="请填写具体操作规范"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>年服务次数：
                </Col>
                <Col :xs="21">
                    <FormItem prop="numberYear">
                        <Select class="w-select" v-model="info.numberYear">
                            <Option
                                v-for="(item,index) of numberYear"
                                :value="item"
                                :key="index"
                                style='text-align:center;'
                            >{{item}}/次</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>执行机构/医生：
                </Col>
                <Col :xs="21">
                    <FormItem prop="executingAgency">
                        <Select class="w-select" v-model="info.executingAgency">
                            <Option
                                v-for="item of executingAgencyList"
                                :key="item.id"
                                :value="item.id"
                                style='text-align:center;'
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>收费标准(单次)：
                </Col>
                <Col :xs="21">
                    <FormItem prop="amt">
                        <InputNumber class="w-number" 
                            v-model="info.amt" 
                            :maxlength="20"
                            placeholder="请输入收费标准"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>政府补贴(单次)：
                </Col>
                <Col :xs="21">
                    <FormItem prop="governmentsubsidycost">
                        <InputNumber
                            class="w-number"
                            v-model="info.governmentsubsidycost"
                            :maxlength="20"
                            placeholder="请输入政府补贴"
                        />
                    </FormItem>
                </Col>
            </Row>
            <!-- <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>实收金额：
                </Col>
                <Col :xs="21">
                    <FormItem prop="amountReceived">
                        <Input class="w-number" @on-focus="blurInput" v-model="info.amountReceived" :maxlength="20"/>
                        <label class="c-notice">提示：根据收费标准和政府补贴自动计算</label>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>自付金额：
                </Col>
                <Col :xs="21">
                    <FormItem prop="residentowncost">
                        <Input class="w-number" v-model="info.residentowncost" :maxlength="20"/>
                        <label class="c-notice">提示：根据收费标准和政府补贴自动计算</label>
                    </FormItem>
                </Col>
            </Row>-->
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>是否启用：
                </Col>
                <Col :xs="21">
                    <FormItem prop="packagestatus">
                        <iSwitch v-model="info.packagestatus" :true-value="1" :false-value="0">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </iSwitch>
                    </FormItem>
                </Col>
            </Row>
            <!--  服务关联表单 -->
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>关联表单：
                </Col>
                <Col :xs="21">
                    <FormItem prop="numberYear">
                        <Select class="w-select" v-model="info.formType" @on-change='fromTypeChange'>
                            <Option
                                v-for="(item,index) of formTypeList"
                                :value="item.value"
                                :key="index"
                                style='text-align:center;'
                            >{{item.title}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>关联模式：
                </Col>
                <Col :xs="21">
                    <FormItem prop="numberYear">
                        <Select class="w-select" v-model="info.pattern">
                            <Option
                                v-for="(item,index) of formModule"
                                :value="index+1"
                                :key="index"
                                style='text-align:center;'
                            >{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon">*</i>关联内容：
                </Col>
                <Col :xs="21">
                    <FormItem prop="numberYear">
                        <Select class="w-select" v-model="info.formRelation">
                            <Option
                                v-for="(item,index) of formContent"
                                :value="item.id"
                                :key="index"
                                style='text-align:center;'
                            >{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>备注：
                </Col>
                <Col :xs="21">
                    <FormItem prop="remarks">
                        <Input
                            class="w-input"
                            v-model="info.remarks"
                            type="textarea"
                            placeholder="备注"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="3" class="text-r">&nbsp;</Col>
                <Col :xs="21">
                    <Button type="primary" @click="submit('formInline')">提交</Button>
                    <Button type="primary" @click="reback">返回</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import cookie from "@/utils/cookie.js";
import { Avatar } from "iview";
export default {
    data() {
        return {
            id: null,
            info: {
                serviceName: null,
                // residentowncost: null,
                governmentsubsidycost: null,
                amt: null,
                packagestatus: 1,
                ascription: 1,
                hospitalId: null,
                serviceDes: null,
                provinceId: null,
                cityId: null,
                areaId: null,
                remarks: null,
                numberYear: 1,
                executingAgency: 1,
                nature: 1,
                formType:null,
                pattern: null,
                formRelation:null
                // amountReceived: null
            },
            pageNo: null,
            numberYear: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            natureList: [
                { id: 1, name: "增值付费项目" },
                { id: 2, name: "基本公共卫生服务承担项目" }
            ],
            executingAgencyList: [
                { id: 1, name: "服务中心" },
                { id: 2, name: "签约医院" }
            ],

            provinceList: [],
            provinceStatus: false,
            cityList: [],
            cityStatus: false,
            areaList: [],
            areaStatus: false,
            hospitalList: [],
            hospitalStatus: false,
            searchKey: "",
            hospitalId: "",
            identity: null,
            identityCoding: null,
            ownArea: null,

            infoRules: {
                serviceName: [
                    {
                        required: true,
                        message: "服务项目名称不能为空",
                        trigger: "blur"
                    }
                ],
                amt: [
                    {
                        required: true,
                        message: "收费标准不能为空",
                        trigger: "blur"
                    }
                ],
                governmentsubsidycost: [
                    {
                        required: true,
                        message: "政府补贴不能为空",
                        trigger: "blur"
                    }
                ]
                // amountReceived: [
                //     {
                //         required: true,
                //         message: "实收金额不能为空",
                //         trigger: "blur"
                //     }
                // ],
                // residentowncost: [
                //     {
                //         required: true,
                //         message: "自付金额不能为空",
                //         trigger: "blur"
                //     }
                // ],
            },
            switch1: false,

            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,
            // 服务关联表单
            formTypeList: [
                {
                    value: 0,
                    title: "暂不关联"
                },
                // {
                //     value: 1,
                //     title: "家庭医生慢病随访表单"
                // },
                // {
                //     value: 2,
                //     title: "健康宣教"
                // },
                // {
                //     value: 3,
                //     title: "院后随访关联表单"
                // }
            ],
            // 关联模式
            formModule: ["私人团队签约",'家医团队签约','院后随访签约'],
            // 关联内容
            formContent: [
                {
                    id : 0,
                    title:"无"
                }
            ]

        };
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

        let id = parseInt(this.$route.query.id);
        this.pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
            
            // 关联表单列表
            this.$axios.post(api.itemformiselection,{

            }).then(res => {
                if(res.data.success) {
                    let ret = res.data.object;
                    ret.forEach(item =>{
                        this.formTypeList.push({
                            value: Number(item.id),
                            title: item.name
                        })
                    })
                } else {
                    this.$Message.error("加载关联表单失败")
                }
            })
        if (isNaN(id)) {
            this.editTt = `添加服务项目`;
        } else {
            this.editTt = `修改服务项目`;
            this.id = id;
            console.log(this.id)
            this.$axios
                .post(api.fdspackageitemselectbyid, { id: this.id })
                .then(resp => {
                    if (resp.data.success) {
                        this.info = resp.data.object;
                        console.log(this.info);
                        if(this.info.amt){
                            this.info.amt = resp.data.object.amt
                        }
                        if(this.info.amt){
                            this.info.governmentsubsidycost = resp.data.object.governmentsubsidycost
                        }
                        if (this.info.provinceId) {
                            this.cityList = this.$store.getters.getCityList(
                                this.info.provinceId
                            );
                        }
                        if (this.info.cityId) {
                            this.areaList = this.$store.getters.getAreaList(
                                this.info.cityId
                            );
                        }
                        this.formContent = []
                        this.formContent.push({
                            title : this.info.patternName,
                            id : Number(this.info.formRelation)
                        })
                        if (this.info.areaId) {
                            var params = {};
                            params.provinceCode = parseInt(
                                this.info.provinceId == 0
                                    ? null
                                    : this.info.provinceId
                            );
                            this.$axios
                                .post(api.hospitalselectbyprovincecode, params)
                                .then(resp => {
                                    this.hospitalList = resp.data.object;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    } else {
                        console.log("查询失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.identity = cookie.getCookie("idtt");
        this.identityCoding = cookie.getCookie("idttC");
        this.ownArea = JSON.parse(cookie.getCookie("ownArea"));
        if (this.ownArea.province) {
            this.provinceStatus = true;
            this.provinceList.push(this.ownArea.province);
            this.info.provinceId = this.ownArea.province.id;
        }
        if (this.ownArea.city) {
            this.cityStatus = true;
            this.cityList.push(this.ownArea.city);
            this.info.cityId = this.ownArea.city.id;
        }
        if (this.ownArea.area) {
            this.areaStatus = true;
            this.areaList.push(this.ownArea.area);
            this.info.areaId = this.ownArea.area.id;
        }
        if (this.identity == 1) {
            this.provinceList = this.$store.getters.getProvinceList;
        } else if (this.identity == 2) {
            this.cityList = this.$store.getters.getCityList(
                this.info.provinceId
            );
        } else if (this.identity == 3) {
            this.areaList = this.$store.getters.getAreaList(this.info.cityId);
        } else if (this.identity == 4) {
            var params = {};
            params.provinceCode = parseInt(this.info.provinceId);
            params.cityCode = parseInt(this.info.cityId);
            params.districtCode = parseInt(this.info.areaId);
            this.$axios
                .post(api.hospitalselectbyprovincecode, params)
                .then(resp => {
                    let list = resp.data.object;
                    list.map((el, i) => {
                        let tmpObj = {};
                        tmpObj.id = parseInt(el.id);
                        tmpObj.name = el.orgName;
                        this.hospitalList.push(tmpObj);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (this.identity == 5) {
            this.info.hospitalId = parseInt(this.identityCoding);
            this.hospitalStatus = true;
            this.$axios
                .post(api.managementInfo, {
                    hospitalId: parseInt(this.identityCoding)
                })
                .then(resp => {
                    this.hospitalList.push({
                        id: resp.data.object.hospitalId,
                        name: resp.data.object.orgName
                    });
                })
                .catch(err => {});
        }

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/servicePackage/pindex",
                title: "服务包管理"
            },
            {
                path: "/index/operation/servicePackage/itemList",
                title: "服务项目管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    components: { Avatar },
    methods: {
        // 通过关联表单加载关联内容数据
        fromTypeChange (val) {
            console.log(val);
            this.formContent = []
            this.loadingFormContentList(val)
            
        },
        // 加载关联内容数据
        loadingFormContentList (id) {
            let url = ''
            if(id != 0) {
                if(id == 2) {
                    url = api.queryarticlelist
                } else {
                    url = api.itemformlist
                }
            } else {
                this.formContent = []
                this.formContent.push({
                    id : 0,
                    title:"无"
                })
            }
            let params = {
                id,
                pageNo: 1,
                pageSize: 99,
                hospitalId: this.info.hospitalId
            }
            if(!Boolean(url)) {
                return ""
            }
            if(!Boolean(this.info.hospitalId)) {
                this.$Message.info("请先选择医院后再查看关联表单数据!")
                return ""
            }
            console.log(url);
            // return ""
            this.$axios.post(url, params).then(res => {
                console.log(res);
                if(res.data.success) {
                    let ret = res.data.object;
                    console.log(ret);
                    console.log(id);
                    if(id == 2) {
                        this.formContent.push({
                            id : 0,
                            title:"无"
                        })
                        ret.list.forEach(item =>{
                            this.formContent.push(item)
                        })
                    } else {
                        this.formContent.push({
                            id : 0,
                            title:"无"
                        })
                        ret.list.forEach(item => {
                            this.formContent.push({
                                id: item.id,
                                title: item.formName
                            })
                        })
                    }
                } else {
                    this.$Message.error("加载关联内容失败")
                }
            })
        },
        changeProvince() {
            this.info.cityId = null;
            this.info.areaId = null;
            this.info.hospitalId = null;
            this.hospitalList = [];
            this.cityList = this.$store.getters.getCityList(
                this.info.provinceId
            );
        },
        changeCity() {
            this.info.areaId = null;
            this.info.hospitalId = null;
            this.hospitalList = [];
            this.areaList = this.$store.getters.getAreaList(this.info.cityId);
        },
        changeArea() {
            this.info.hospitalId = null;
            this.hospitalList = [];
            if (this.info.areaId) {
                var params = {};
                params.provinceCode = this.info.provinceId;
                params.cityCode = this.info.cityId;
                params.districtCode = this.info.areaId;
                this.$axios
                    .post(api.hospitalselectbyprovincecode, params)
                    .then(resp => {
                        this.hospitalList = resp.data.object;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        submit(name) {
            this.$refs[name].validate(valid => {
                // if (valid) {
                    let msg = this.id ? "修改" : "添加";
                    let subApi = this.id
                        ? api.fdspackageitemupdate
                        : api.fdspackageiteminsert;
                    let params = {};
                    params.id = this.id ? this.id : null;
                    params.serviceName = this.info.serviceName;
                    // params.residentowncost = this.info.residentowncost;
                    params.governmentsubsidycost = this.info.governmentsubsidycost;
                    params.amt = this.info.amt;
                    params.packagestatus = parseInt(this.info.packagestatus);
                    params.ascription = parseInt(this.info.ascription);
                    params.hospitalId =
                        this.info.hospitalId == 0 ||
                        this.info.hospitalId == undefined
                            ? ""
                            : parseInt(this.info.hospitalId);
                    params.serviceDes = this.info.serviceDes;
                    params.provinceId =
                        this.info.provinceId == 0 ||
                        this.info.provinceId == undefined
                            ? ""
                            : parseInt(this.info.provinceId);
                    params.cityId =
                        this.info.cityId == 0 || this.info.cityId == undefined
                            ? ""
                            : parseInt(this.info.cityId);
                    params.areaId =
                        this.info.areaId == 0 || this.info.areaId == undefined
                            ? ""
                            : parseInt(this.info.areaId);
                    params.remarks = this.info.remarks;
                    params.numberYear = parseInt(this.info.numberYear);
                    params.executingAgency = parseInt(
                        this.info.executingAgency
                    );
                    params.nature = parseInt(this.info.nature);
                    // 服务 关联表单
                    params.formType = this.info.formType;

                    // 关联模式
                    params.pattern = this.info.pattern
                    // 关联内容
                    params.formRelation = this.info.formRelation
                    console.log("传递数据",params);
                    // params.amountReceived = this.info.amountReceived;
                    if(params.governmentsubsidycost && params.amt){
                        if(params.governmentsubsidycost > params.amt){
                            this.$Message.error('政府补贴金额不得大于收费标准金额')
                            return
                        }
                        if(params.formType == null){
                            this.$Message.error('请选择关联表单')
                            return
                        }
                        if(params.pattern == null){
                            this.$Message.error('请选择关联模式')
                            return
                        }
                        if(params.formRelation == null){
                            this.$Message.error('请选择关联内容')
                            return
                        }
                    }
                    this.$axios
                        .post(subApi, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.success(msg + "成功");
                                //   公用方法
                                this.functionJS.queryNavgationTo(
                                    this,
                                    "/index/operation/servicePackage/itemList",
                                    {
                                        pageNo: this.pageNo,
                                        province: this.province,
                                        city: this.city,
                                        area: this.area,
                                        hospital: this.hospital,
                                        isBack: 2
                                    }
                                );
                            } else {
                                this.$Message.fail(msg + "失败，请重试");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                // } else {
                //     this.$Message.error("数据不正确");
                // }
            });
        },
        reback() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/servicePackage/itemList",
                {
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        },
        alertMsg(msg) {
            this.$Message.error({
                render: h => {
                    return h("span", {
                        domProps: {
                            innerHTML: msg
                        },
                        style: { color: "#f00" }
                    });
                },
                duration: 3
            });
        },
        changeHospital(val) {
            let param = {};
            param.hospitalId = val;
            this.$axios
                .post(api.getDeptListByHospitalId, param)
                .then(resp => {
                    this.info.deptTypeId = "";
                    if (resp.data.success) {
                        this.deptList = resp.data.object;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        blurInput(e) {
            e.target.blur();
        }
    }
};
</script>
<style lang="less" scoped>
.doctorreviewedit {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .padding-l {
        padding-left: 5px;
    }
    .padding-r {
        padding-right: 5px;
    }
    .padding-t {
        padding-top: 15px;
    }
    .padding-b {
        padding-bottom: 15px;
    }
    .borderRight {
        border-right: 1px solid #e5e5e5;
    }
    .borderLeft {
        border-left: 1px solid #e5e5e5;
    }
    .borderBottom {
        border-bottom: 1px solid #e5e5e5;
    }
    .borderTop {
        border-top: 1px solid #e5e5e5;
    }
    .w-select {
        width: 150px;
    }
    .w-select-hos {
        width: 200px;
    }
    .w-input {
        width: 400px;
    }
    .w-number {
        width: 100px;
    }
    .req-icon {
        font-size: 18px;
        color: red;
        display: inline-block;
        height: 18px;
        width: 18px;
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
    }
    .text-r {
        text-align: right;
    }
    .c-notice {
        color: #999999;
    }
}
</style>
<style lang="less">
.upload-avatar {
    display: inline-block;
    vertical-align: middle;
    width: 32px !important;
    height: 32px !important;
    margin-bottom: 3px;
    //   div {
    //     border: 0 !important;
    //   }
}
.avatar-box {
    position: relative;
    display: inline-block;
    .avatar-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        width: 32px;
        height: 32px;
    }
}
.avatar-box:hover .avatar-cover {
    display: block;
    text-align: center;
}
.avatar-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
    line-height: 32px;
}
.progress {
    width: 32px;
}
</style>