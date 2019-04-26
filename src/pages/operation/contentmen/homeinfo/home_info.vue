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
                <Modal title="预览图片" v-model="visible" footer-hide>
                    <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
                </Modal>
                <span>添加图片</span>
            </div>
            <!--机构等级-->
            <div class="main_type">
                <span>机构等级</span>
                <Select v-model="y_type" style="width:100px" clearable>
                    <Option
                        v-for="item in types"
                        :value="item.dictType"
                        :key="item.dictType"
                    >{{ item.dictName }}</Option>
                </Select>
            </div>
            <!--医联体上级医院-->
            <div class="main_info">
                <span>医联体上级医院</span>
                <Select v-model="y_search1" style="width:200px;">
                    <Option value="0">请选择</Option>
                    <Option
                        :value="item.orgCode"
                        v-for="(item) in ylt"
                        :key="item.orgCode"
                    >{{ item.orgName }}</Option>
                </Select>
            </div>
            <!--背景模板-->
            <div class="main_moban">
                <span>背景模板</span>

                <Select v-model="y_module" style="width:100px;" clearable>
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
                        :height="100"
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
                <Input
                    v-model="y_phone"
                    placeholder="请输入机构电话"
                    style="width: 370px"
                    :maxlength="12"
                />
            </div>
            <!--机构地址-->
            <div class="main_info">
                <span>机构地址</span>
                <Input v-model="y_dizhi" placeholder="请输入机构地址" style="width: 370px"/>
            </div>
            <!--是否开通互联网医院-->
            <div class="main_yy">
                <span class="main_yy_name">开通互联网医院</span>
                <iSwitch v-model="switch1" @on-change="change"/>
            </div>
            <!--医院关联公众号-->
            <div class="main_moban" style='flex-wrap:wrap;height:auto;'>
                <span>医院关联公众号</span>
                <div v-for='item,index in appidList' :key = 'index'>
                    <Select v-model="item.value" style="width:150px;margin-right:4px;" :disabled="status" @on-change='relationwx' clearable @on-clear='relationwx'>
                        <Option
                            v-for ="item in gzh"
                            :value="item.appid"
                            :key="item.appid"
                            :disabled='item.status'
                        >{{ item.nick }}</Option>
                    </Select>
                </div>
                <button class="cus-btn" @click='addAppid'>+</button>
            </div>
            <!-- 医院公众号支付 -->
            <div class="main_moban" style='flex-wrap:wrap;height:auto;'>
                <span>医院公众号支付</span>
                <Select v-model="y_gzh" style="width:150px;" :disabled="status" clearable>
                    <Option
                        v-for="item in selectGzh"
                        :value="item.appid"
                        :key="item.appid"
                    >{{ item.nick }}</Option>
                </Select>
            </div>
            <!--是否加入医院联盟-->
            <div class="main_yy">
                <span class="main_yy_name">加入医院联盟</span>
                <iSwitch v-model="switch2" :disabled="status" @on-change="change2"/>
            </div>
            <!--医院联盟排序-->
            <div class="main_info">
                <span>医院联盟排序</span>
                <InputNumber :max="99999" :min="1" v-model="hospitalSort" placeholder="医院联盟排序" :disabled="hospitalFlag"
                style="width:120px;"
                ></InputNumber>
                <p style='margin-left:8px;'>备注:只能填写数字，1代表置顶以此类推</p>
            </div>
            <!-- 预约挂号排序 -->
            <div class="main_info">
                <span>预约挂号排序</span>
                <InputNumber :max="99999" :min="1" v-model="appointmentRegistration" placeholder="预约挂号排序" 
                style="width:120px;"></InputNumber>
                <p style='margin-left:8px;'>备注:只能填写数字，1代表置顶以此类推</p>
            </div>
            <!--是否开通处方流转-->
            <div class="main_yy">
                <span class="main_yy_name">开通处方流转</span>
                <iSwitch v-model="switch3"/>
            </div>
            <!--处方流转平台接口ID-->
            <div class="main_info">
                <span>处方流转平台接口ID</span>
                <Input v-model="y_uid" placeholder="请输入Id" style="width: 370px"/>
            </div>
            <!--是否加入远程门诊-->
            <imyswitch :status='switch4' title='加入远程门诊' @statuschange='switch4Change' v-if='title'></imyswitch>
            <!-- 是否是否强制用券 -->
            <imyswitch :status='usedCoupon' title='是否强制用券' @statuschange='usedCouponChange' v-if='title'></imyswitch>
            <!-- 预约挂号支付 -->
            <imyswitch :status='registerPayStatus' title='预约挂号支付' @statuschange='registerPayStatusChange' v-if='title'></imyswitch>
            <!-- 预约挂号池是否为第三方 -->
            <imyswitch :status='registerIthirdparty' title='预约挂号池是否为第三方' @statuschange='registerIthirdpartyChange' v-if='title'></imyswitch>
            <!-- 预约挂号卡模式 -->
            <!-- 预约挂号池第三方数据 -->
            <checkboxs :listMap='registerPatternList' :checkList='registerPatternValue' title='预约挂号卡模式' v-if='title' @selectChange='registerPatternChange'  :id = 'makeSearch' @selectHome='lisPatternHome'></checkboxs>
            <!-- lis数据查询 -->
            <checkboxs :listMap='lisPatternList' :checkList='lisPattern' title='lis数据查询' v-if='title' @selectChange='lisPatternChange' :id = 'lisSearch' @selectHome='lisPatternHome'></checkboxs>
            <!-- pace数据查询 pacePattern-->
            <checkboxs :listMap='pacePatternList' :checkList='pacePattern' title='pacs数据查询' v-if='title' @selectChange='pacePatternChange' :id = 'pacsSearch' @selectHome='lisPatternHome'></checkboxs>
            <div>
                <!-- 服务类型 -->
                <div class="main_yy">
                    <span class="main_yy_name">服务类型</span>
                    <Select v-model="serviceTypeValue" style="width:120px;margin-right:10px;">
                        <Option
                            v-for="(item,index) in serviceType"
                            :value="item.id"
                            :key="index"
                            :disabled="item.disabled"
                        >{{ item.name }}</Option>
                    </Select>
                    <Button type="primary" @click="addManagement">添加服务</Button>
                </div>

                <!-- 服务类型添加框 -->
                <Modal v-model="registerFlag" :title="modalTitle" @on-ok="ok('formValidate')" @on-cancel="cancel" :mask-closable="false">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                        <!--  服务名  -->
                        <!-- <div class="main_info">
                            <FormItem label="服务名称" prop="serviceName">
                                <Input v-model="formValidate.serviceName" placeholder="请输入服务名称" style='width:230px;'></Input>
                            </FormItem>
                        </div> -->
                        <!-- 服务路径 -->
                        <div class="main_info">
                            <FormItem label="服务路径" prop="serviceUrl">
                                <Input v-model="formValidate.serviceUrl" placeholder="请输入服务路径" style='width:230px;'></Input>
                            </FormItem>
                        </div>
                        <!-- 第三方参数 -->
                        <div class="main_info">
                            <FormItem label="第三方参数">
                                <Input v-model="formValidate.requestVal" placeholder="请输入第三方参数" style='width:230px;'></Input>
                            </FormItem>
                        </div>
                        <!-- 第三方厂家 -->
                        <div class="main_info">
                            <FormItem label="第三方厂家" prop='thirdValue'>
                                <Select v-model="formValidate.thirdValue" style='width:230px;'>
                                    <Option
                                        v-for="(item,index) in thirdList"
                                        :value="item.code"
                                        :key="index"
                                    >{{ item.className }}</Option>
                                </Select>
                            </FormItem>
                        </div>
                        <!-- 是否开启 -->
                        <div class="main_enable">
                             <FormItem label="是否启用">
                                <iSwitch v-model="formValidate.enable" size="large">
                                    <span slot="open">启用</span>
                                    <span slot="close">禁用</span>
                                </iSwitch>
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
                <!-- 添加的服务列表 -->
                <div v-show="AddserviceList.length" v-for="item,index in AddserviceList" :key="index">
                    <!--  服务名  -->
                    <div class="main">
                        <h2>
                            <span>服务类型：{{ item.serverTypeName  }}</span>
                            <Button type="primary" @click="appendItem(item,index)">编辑服务</Button>
                        </h2>
                    </div>
                    <div class="main_info">
                        <span>服务名称</span>
                        <span>{{ item.serviceName }}</span>
                    </div>
                    <!-- 服务路径 -->
                    <div class="main_info">
                        <span>服务路径</span>
                        <span>{{ item.serviceUrl }}</span>
                    </div>
                    <!-- 第三方参数 -->
                    <div class="main_info">
                        <span>第三方参数</span>
                        <span>{{ item.requestVal }}</span>
                    </div>
                    <!-- 第三方厂家 -->
                    <div class="main_info">
                        <span>第三方厂家</span>
                        <span>{{ item.className }}</span>
                    </div>
                    <!-- 是否启用 -->
                    <div class="main_info">
                        <span>是否启用</span>
                        <span>{{ item.enable == 1 ? '禁用' : "启用" }}</span>
                    </div>
                </div>
            </div>
            <!--保存-->
            <div class="main_save">
                <Button type="primary" @click="save">保存</Button>
                <Button @click="$router.push('/index/operation/home')">取消</Button>
            </div>
        </div>
    </div>
</template>

<script>
import vueEditor from "@/components/vueEditor";
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import code from "@/configs/base.js";
import cookie from "@/utils/cookie.js";
import api from "@/api/commonApi";
export default {
    components: {
        tmpHeader,
        vueEditor,
        "checkboxs": {
            template:
            "<div class = 'main_yy' style='align-items:center;'>" +
                "<span class = 'main_yy_name' style='margin-right:10px;min-width:100px;' v-show='title'>{{ title }}</span>"+
                "<CheckboxGroup v-model='arr' @on-change='checkAllGroupChange' >" +
                    "<Checkbox v-for='item,index in listMap' :key='index' :label='item.id'>{{ item.name }}</Checkbox>" +
                "</CheckboxGroup>" +
                "<Button type='primary' style='margin-left:30px;' @click='selectHome' v-show='arr.length'>选择厂家</Button>"+
            "</div>",
            props: {
                listMap: {
                    type: Array,
                    default: []
                },
                checkList: {
                    type: Array,
                    default: []
                },
                title: {
                    type:String,
                    default:""
                },
                id: {
                    type:String,
                    default:""
                }
            },
            data() {
                return {
                    arr:[]
                }
            },
            created(){
                this.arr = this.checkList
            },
            methods: {
                checkAllGroupChange(i) {
                    this.$emit("selectChange",i)
                },
                // 选择厂家
                selectHome () {
                    this.$emit("selectHome",this.id)
                }
            }
        },
        "imyswitch": {
            template: '<div class="main_yy">'+
                            '<span class="main_yy_name" style="margin-right:10px;min-width:100px;">{{ title }}</span>'+
                            '<iSwitch v-model="flag" @on-change="Change"/>'+
                    '</div>',
            props: ['status','title'],
            data () {
                return {
                    flag:false
                }
            },
            created () {
                this.flag = Boolean(this.status)
            },
            methods: {
                Change (status) {
                    this.$emit("statuschange",status)
                }
            }
        }
    },
    data() {
        return {
            modalTitle: "添加服务",
            info: {
                // 机构简介
                content: ""
            },
            // 医院关联 的公众号
            selectThis:'',
            height: 300,
            // 机构名称
            title: "",
            visible: false,
            uploadList: [],
            // 是否开通互联网医院
            switch1: false,
            // 是否加入医院联盟
            switch2: false,
            // 是否开通处方流转
            switch3: false,
            // 是否加入远程门诊
            switch4: false,
            // 强制用卷
            usedCoupon: false,
            // 预约挂号支付
            registerPayStatus: false,
            // 预约挂号池是否为第三方
            registerIthirdparty: false,
            // 预约挂号卡模式
            registerPattern: null,
            // 服务类型列表
            serviceType: [],
            // 模态框显示与否
            registerFlag: false,
            // 添加服务列表
            AddserviceList: [],
            // 选择中的服务类型
            serviceTypeValue: null,
            //  选择中的挂号卡模式
            registerPatternValue: [],
            // 选中的第三方厂家
            thirdValue: "",
            // 第三方厂家列表
            thirdList: [],
            // 预约挂号卡模式
            registerPatternList: [],
            serviceList: [],
            // 服务名
            serviceName: "",
            // 服务路径
            serviceUrl: "",
            // 第三方参数
            requestVal: "",
            // 是否启用
            enable: false,
            // lis数据查询
            lisPattern:[],
            lisPatternList:[],
            // pace数据查询
            pacePattern:[],
            pacePatternList:[],
            // 机构等级
            y_type: 6001,
            // 背景模板
            y_module: "2",
            // 机构路线
            y_luxin: "",
            // 机构电话
            y_phone: "",
            // 机构地址
            y_dizhi: "",
            // 互联网医院公众号
            appidList: [
                // {
                //     value : "",
                //     status : false,
                // }
            ],
            y_gzh: null,
            // 预约挂号排序
            appointmentRegistration:"",
            // 处方流转平台ID
            y_uid: "",
            // 医联体上级医院
            y_search1: "0",
            // 公众号列表
            gzh: [],
            // 医联体列表
            ylt: [],
            // 机构等级
            types: [],
            // 上传图片相关
            defaultList: [],
            imgName: "",
            uploadModal: true,
            uploadData: {
                json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}'
            },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: "",
            id: sessionStorage.getItem("hospitalId"),
            status: false,
            // 医院联盟排序
            hospitalSort: "",
            hospitalFlag: false,
            urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
            formValidate:{
                serviceName:"",
                serviceUrl:"",
                requestVal:"",
                thirdValue:"",
                enable:""
            },
            ruleValidate:{
                serviceName: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入服务名称",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                // e服务路径 
                serviceUrl: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入服务路径",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                // 第三方厂家
                thirdValue: [
                    {
                        required: true,
                        message: "请选择第三方厂家",
                        trigger: "change"
                    }
                ]
            },
            lisSearch:"",
            pacsSearch:"",
            makeSearch:""
        };
    },
    methods: {
        // 机构简介
        afterChange(val) {
            this.info.content = val;
        },
        // 预约挂号卡模式
        registerPatternChange (list) {
            this.registerPatternValue = list
        },
        // pace数据查询
        pacePatternChange (list) {
            this.pacePattern = list
        },
        // lis数据查询
        lisPatternChange (list) {
            this.lisPattern = list
        },
        // 添加厂家
        lisPatternHome (id) {
            this.serviceTypeValue = id;
            this.registerFlag = true;
            
            let items = {}
            this.AddserviceList.forEach(item => {
                if(Number(item.serviceType) == Number(id)) {
                    items = item
                }
            })
            if(items.serviceName) {
                this.serviceTypeValue = items.serviceType;
                this.formValidate.serviceName = items.serviceName;
                this.formValidate.requestVal = items.requestVal;
                this.formValidate.serviceUrl = items.serviceUrl;
                this.formValidate.thirdValue = String(items.thirdpartyEnum);
                this.formValidate.enable = !Boolean(items.enable);
            }
            // 请求第三方厂家列表
            this.$axios.post(api.hospitalgetenummap, {
                parent:parseInt(id),
            }).then(res => {
                if (res.data.success) {
                    let ret = res.data.object;
                    this.thirdList = ret
                    this.thirdList.map((el) => {
                        el.id = String(el.id);
                    })
                } else {
                    this.$Message.error("加载第三方厂家失败")
                }
            })
        },
        // 强制用卷
        usedCouponChange (status) {
            this.usedCoupon = status
        },
        // 预约挂号支付
        registerPayStatusChange (status) {
            this.registerPayStatus = status
        },
        // 是否加入远程门诊
        switch4Change (status) {
            this.switch4 = status
        },
        // 预约挂号池是否为第三方
        registerIthirdpartyChange (status) {
            this.registerIthirdparty = status
        },
        // 公众号列表限制
        addAppid () {
            if (this.status) {
                this.$Message.error("请开通互联网医院")
                return ""
            }
            // 所有公众号列表
            let gzhlen = this.gzh.length;
            // 添加的公众号列表
            let applen = this.appidList.length
            if (gzhlen <= applen) {
                this.$Message.error('当前仅有'+gzhlen+'个公众号可选择')
                return ""
            }
            this.appidList.forEach(item => {
                this.gzh.forEach(i => {
                    if(i.appid == item.value) {
                        i.status = true;
                    }
                })
            })
            this.appidList.push({
                value : "",
                status : false
            })
            this.relationwx();
        },
        // 已关联公众号列表
        relationwx () {
            let list = []
            // 初始化
            this.gzh.forEach((i,m) => {
                i.status = false
            })
            // 新选择的公众号
            this.appidList.forEach(item => {
                this.gzh.forEach((i,m) => {
                    if (item.value == i.appid) {
                        list.push(i)
                        i.status = true
                    }
                })
            })
            this.y_gzh = ''
            this.selectGzh = list
        },
        // 是否开通互联网医院关联数据
        change(status) {
            if (status) {
                this.status = false;

            } else {
                this.appidList.forEach(item => {
                    item.value = ''
                })
                this.status = true;
                this.y_gzh = null;
                this.switch2 = false;
                this.hospitalFlag = true;
            }
        },
        // 是否加入医院联盟控制医院排序
        change2(status) {
            if (status) {
                this.hospitalFlag = false;
            } else {
                this.hospitalFlag = true;
            }
        },
        // 当服务类型未选择不显示modal
        addManagement() {
            if (!Boolean(this.serviceTypeValue)) {
                this.$Message.error("请选择服务类型后再添加服务");
                return "";
            }
            this.lisPatternHome(this.serviceTypeValue)
        },
        // 计算数组中数据不为空时返回空字符串
        computedLis (arr) {
            if (arr.length != 0) {
               return arr.join(",")
            }
            return ""
        },
        flagPattern (id,data) {
            return data.some(item => {
                return item.serviceType == id
            })
        },
        // 医院修改完成
        save() {
            let images = "";
            if (this.images != "" && this.uploadList.length) {
                images = this.images;
            } else if (this.uploadList.length) {
                images = this.source;
            } else {
                images = "";
            }
            // lisPattern数据查询
            let lisPattern = this.computedLis(this.lisPattern);
            // pacsPattern数据查询
            let pacsPattern = this.computedLis(this.pacePattern);
            // registerPatternValue预约挂号卡模式
            let selectArr = this.computedLis(this.registerPatternValue);

                //关联的多个公众号的appid
            let appid = []
            if(this.switch1) {
                this.appidList.forEach(item => {
                    if(Boolean(item.value)) {
                        appid.push(item.value);
                    }
                })
            }

            // 当选择数据查询未添加服务时不允许保存
            if(Boolean(this.lisPattern.length)) {
                if(!this.flagPattern(this.lisSearch, this.AddserviceList)) {
                    this.$Message.error("请选择lis数据查询第三方厂家")
                    return ""
                }
            }   
            if(Boolean(this.pacePattern.length)) {
                if(!this.flagPattern(this.pacsSearch, this.AddserviceList)) {
                    this.$Message.error("请选择pacs数据查询第三方厂家")
                    return ""
                }
            }
            if(Boolean(this.registerPatternValue.length)) {
                if(!this.flagPattern(this.makeSearch, this.AddserviceList)) {
                    this.$Message.error("请选择预约挂号数据查询第三方厂家")
                    return ""
                }
            }
            // 全部参数
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
                //公众号支付
                wxappPay: this.y_gzh,
                // 关联公众号列表
                appidList: appid,
                //处方平台UID
                prescriptionId: this.y_uid,
                // 预约挂号排序
                appointmentRegistration:String(this.appointmentRegistration),
                //互联网医院
                internetHospital: Number(this.switch1),
                //医院联盟
                unionHospital: Number(this.switch2),
                //处方流转
                ipres: Number(this.switch3),
                // 医院排序
                internetHospitalSort: this.hospitalSort,
                // 开启远程门诊
                iremote: Number(this.switch4),
                // 是否强制用卷
                usedCoupon: Number(this.usedCoupon),
                // 预约挂号支付
                registerPayStatus: Number(this.registerPayStatus),
                // 预约挂号卡模式
                registerPattern: selectArr,
                // 预约挂号池是否为第三方
                registerIthirdparty: Number(this.registerIthirdparty),
                // 预约挂号服务类型
                list: this.AddserviceList,
                // lisPattern数据查询
                lisPattern,
                // pacsPattern数据查询
                pacsPattern
            };
            console.log(params);
            // 当医院关闭互联网医院时把appid清空
            if (!this.switch1) {
                params.wxappPay = '';
                params.appidList = []
            } else if(this.switch1) {
                if(!Boolean(params.wxappPay) || params.appidList.length == 0){
                    this.$Message.error("请选择医院关联公众号与医院公众号支付")
                    return ""
                }
            }
            // 远程门诊状态缓存
            if (this.switch4) {
                localStorage.setItem("doctor", "show");
            } else {
                localStorage.setItem("doctor", "");
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

            // 开通互联网医院状态缓存/动态新闻/预约科室/院内科室
            if (this.switch1) {
                localStorage.setItem("status", "show");
            } else {
                localStorage.setItem("status", "");
            }
        },
        // 添加服务
        ok(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                // 必填项填写完成
                    let a = 0;
                    if(!this.formValidate.enable) {
                        a = 1 
                    }
                    let res = ''
                    this.serviceType.forEach((item, index) => {
                        if (Number(this.serviceTypeValue) == Number(item.id)) {
                            res = item.name;
                        }
                    });
                    let className = ''
                    this.thirdList.forEach(item => {
                        if(Number(this.formValidate.thirdValue) == Number(item.code)) {
                            className = item.className
                        }
                    })
                    let params = {
                        //服务名称
                        serviceName: className,
                        // 服务路径
                        serviceUrl: this.formValidate.serviceUrl,
                        // 第三方参数
                        requestVal: this.formValidate.requestVal,
                        // 医院ID
                        hospitalId: this.id,
                        // 服务类型
                        serviceType: this.serviceTypeValue,
                        // 是否启用
                        enable: a,
                        // 第三方厂家
                        thirdpartyEnum: Number(this.formValidate.thirdValue),
                        // 服务类型名称
                        serverTypeName: res,
                        className
                    };
                        // 添加进数据组中
                    if (this.AddserviceList.length > 0) {
                            let flag = true
                        this.AddserviceList.forEach((item, index) => {
                            if (Number(item.serviceType) == Number(params.serviceType)) {
                                flag = false
                                this.AddserviceList[index] = params
                            } 
                        });
                        if(flag) {
                            this.AddserviceList.push(params);
                        }
                    } else {
                        this.AddserviceList.push(params);
                    }
                    // 初始化
                    this.formValidate.serviceName = "";
                    this.formValidate.requestVal = "";
                    this.formValidate.serviceUrl = "";
                    this.formValidate.enable = false;
                    this.modalTitle = "添加服务";
                    this.thirdList = []
                    this.formValidate.thirdValue = ''
                    this.serviceType.forEach(item => {
                        if(Number(item.id) == Number(this.serviceTypeValue)) {
                            item.disabled = true;
                        }
                    })
                    this.serviceTypeValue = null;
                } else {
                // 必填项填写失败
                    this.$Message.error("请完整填写表单");
                    return ""
                }
            })
            
        },
        // 编辑服务
        appendItem(item, index) {
            this.modalTitle = "编辑服务";
            // 服务类型
            this.serviceTypeValue = item.serviceType;
            this.formValidate.serviceName = item.serviceName;
            this.formValidate.requestVal = item.requestVal;
            this.formValidate.serviceUrl = item.serviceUrl;
            this.formValidate.thirdValue = String(item.thirdpartyEnum);
            this.formValidate.enable = !Boolean(item.enable);
            this.lisPatternHome(this.serviceTypeValue)
        },
        cancel() {
            this.formValidate.serviceName = "";
            this.formValidate.requestVal = "";
            this.formValidate.serviceUrl = "";
            this.formValidate.enable = false;
            this.modalTitle = "添加服务";
            this.thirdList = []
            // 初始化
            this.serviceTypeValue = null;
            this.formValidate.thirdValue = ''
        },
        // 上传图片相关事件
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
        // 加载医院等级,医联体,公众号数据
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
                    ret.forEach(item => {
                        item.status = false
                    })
                    console.log(ret)
                    this.gzh = ret;
                }
            });
            // 医院关联公众号
            this.$axios.post(api.hospitalwxapplist,{
                hospitalId:this.id
            }).then(res => {
                if(res.data.message) {
                    let ret = res.data.object;
                    console.log(ret);
                    this.selectGzh = ret;
                }
            })
        }
    },
    created() {
        localStorage.setItem("homeIndex", 0);
        // 获取医院等级,医联体,公众号数据
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
                    console.log("ret+++++++++++++++++++++++++++++++",ret)
                    // 医院图片
                    if (ret.hosIcon) {
                        this.source = ret.hosIcon;
                        this.uploadList.push({
                            name: "a42bdcc1178e62b4694c830f028db5c0",
                            percentage: 100,
                            status: "finished",
                            uid: 1544263544970,
                            url:
                                this.fileBaseUrl +
                                this.pictureFormat(ret.hosIcon)
                        });
                    }
                    this.serviceType = ret.serviceTypeMap
                    this.serviceType.forEach(item => {
                        if(item.name == '预约挂号') {
                            this.makeSearch = item.id
                        }
                        if(item.name == 'pacs查询') {
                            this.pacsSearch = item.id
                        }
                        if(item.name == 'lis查询') {
                            this.lisSearch = item.id
                        }
                    })
                    // ret.serviceTypeMap
                    // 医院名字
                    this.title = ret.orgName;
                    // 机构等级
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
                    
                    
                    // appidList关联公众号列表
                    let appidList = ret.appidList || []
                   
                    
                    //互联网医院
                    this.switch1 = Boolean(ret.internetHospital);
                    if (this.switch1) {
                        this.status = false;
                        localStorage.setItem("status", "show");
                        // wxappPay公众号支付
                        this.y_gzh = ret.wxappPay
                         // 医院关联公众号回显
                        if (Boolean(appidList.length)) {
                            appidList.forEach(i => {
                                this.appidList.push({
                                    value : i,
                                    status : true,
                                })
                            })
                        } else {
                            this.appidList.push({
                                value : '',
                                status : false
                            })
                        }
                    } else {
                        this.status = true;
                        localStorage.setItem("status", "");
                        this.appidList.push({
                            value : '',
                            status : false
                        })
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
                    // 开启远程门诊
                    this.switch4 = Boolean(ret.iremote);
                    if (this.switch4) {
                        localStorage.setItem("doctor", "show");
                    } else {
                        localStorage.setItem("doctor", "");
                    }
                    // 预约挂号排序
                    let appointmentRegistration = ret.appointmentRegistration;
                    if(!Number(appointmentRegistration)) {
                        appointmentRegistration = ''
                    }
                    this.appointmentRegistration = appointmentRegistration
                    // 是否强制用卷
                    this.usedCoupon = Boolean(ret.usedCoupon);
                    // 预约挂号支付
                    this.registerPayStatus = Boolean(ret.registerPayStatus);
                    //医联体上级医院
                    // 处方流转
                    this.switch3 = Boolean(ret.ipres);
                    this.y_uid = ret.prescriptionId;

                    // 预约挂号卡模式
                    // registerPatternValue  选中值
                    this.registerPatternValue = ret.registerPattern ? ret.registerPattern.split(",") : [];
                    // registerPatternList  所有值
                    this.registerPatternList = ret.listMap;

                    // lisPatternList列表查询
                    this.lisPatternList = ret.listMap
                    // lisPattern选中查询
                    this.lisPattern = ret.lisPattern ? ret.lisPattern.split(",") : []

                    // pacePatternList列表查询
                    this.pacePatternList = ret.listMap
                    // pacePattern选中查询
                    this.pacePattern = ret.pacsPattern ? ret.pacsPattern.split(",") : []

                    // 预约挂号池是否为第三方
                    this.registerIthirdparty = Boolean(ret.registerIthirdparty);
                    
            
                    //添加的服务列表
                    this.AddserviceList = ret.listThirdparty || [];
                        if(Boolean(this.AddserviceList)) {
                            this.AddserviceList.forEach(item => {
                                this.serviceType.forEach(i => {
                                    if(Number(item.serviceType) == Number(i.id)) {
                                        i.disabled = true
                                        item.serverTypeName = i.name
                                    }
                                })
                            })
                        }
                }
            });
    }
};
</script>

<style scoped lang="less">
.main_info {
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 50px;
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
.main_enable {
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 30px;
    margin: 5px auto;
    align-items: center;
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
            align-items:center;
            span {
                display: inline-block;
                min-width: 100px;
            }
            .cus-btn{
                width:30px;
                height:30px;
                line-height: 30px;
                color: #ffffff;
                font-size: 30px;
                border: 0;
                border-radius: 50%;
                background: #2d8cf0;
                border:none;
                outline:none;
                margin-left:10px;
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
        }
    }
}
</style>