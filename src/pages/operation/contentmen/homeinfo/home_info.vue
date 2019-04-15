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
                <span class="main_yy_name">是否开通互联网医院</span>
                <iSwitch v-model="switch1" @on-change="change"/>
            </div>
            <!--互联网医院公众号-->
            <div class="main_moban">
                <span>互联网医院公众号</span>
                <Select v-model="y_gzh" style="width:150px;" :disabled="status">
                    <Option :value="0">请选择</Option>
                    <Option
                        v-for="item in gzh"
                        :value="item.appid"
                        :key="item.appid"
                    >{{ item.nick }}</Option>
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
                <!-- <Input
                    placeholder="医院联盟排序"
                    style="width:120px;"
                    v-model.trim="hospitalSort"
                    :disabled="hospitalFlag"
                /> -->
                <InputNumber :max="99999" :min="1" v-model="hospitalSort" placeholder="医院联盟排序" :disabled="hospitalFlag"
                style="width:120px;"
                ></InputNumber>
                <p>备注:只能填写数字，1代表置顶以此类推</p>
            </div>
            <!-- 预约挂号排序 -->
            <div class="main_info">
                <span>预约挂号排序</span>
                <!-- <Input
                    placeholder="预约挂号排序"
                    style="width:120px;"
                    v-model.trim="appointmentRegistration"
                /> -->
                <InputNumber :max="99999" :min="1" v-model="appointmentRegistration" placeholder="预约挂号排序" 
                style="width:120px;"></InputNumber>
                <p>备注:只能填写数字，1代表置顶以此类推</p>
            </div>
            <!--是否开通处方流转-->
            <div class="main_yy">
                <span class="main_yy_name">是否开通处方流转</span>
                <iSwitch v-model="switch3"/>
            </div>
            <!--处方流转平台接口ID-->
            <div class="main_info">
                <span>处方流转平台接口ID</span>
                <Input v-model="y_uid" placeholder="请输入Id" style="width: 370px"/>
            </div>
            <!--是否加入远程门诊-->
            <div class="main_yy">
                <span class="main_yy_name">是否加入远程门诊</span>
                <iSwitch v-model="switch4"/>
            </div>
            <!-- 是否是否强制用券 -->
            <div class="main_yy">
                <span class="main_yy_name">是否强制用券</span>
                <iSwitch v-model="usedCoupon"/>
            </div>
            <!-- 预约挂号支付 -->
            <div class="main_yy">
                <span class="main_yy_name">预约挂号支付</span>
                <iSwitch v-model="registerPayStatus"/>
            </div>
            <!-- lis数据查询 -->
            <div class="main_yy">
                <span class="main_yy_name">lis数据查询</span>
                <CheckboxGroup v-model="lisPattern" >
                    <Checkbox
                        v-for="item,index in lisPatternList"
                        :key="index"
                        :label="item.id"
                    >{{item.name}}</Checkbox>
                </CheckboxGroup>
            </div>
            <!-- pace数据查询 pacePattern-->
            <div class="main_yy">
                <span class="main_yy_name">pacs数据查询</span>
                <CheckboxGroup v-model="pacePattern" >
                     <Checkbox
                        v-for="item,index in pacePatternList"
                        :key="index"
                        :label="item.id"
                    >{{item.name}}</Checkbox>
                </CheckboxGroup>
            </div>
            <!-- 预约挂号卡模式 -->
            <div class="main_yy">
                <span class="main_yy_name">预约挂号卡模式</span>
                <CheckboxGroup v-model="registerPatternValue" >
                    <Checkbox
                        v-for="item,index in registerPatternList"
                        :key="index"
                        :label="item.id"
                    >{{item.name}}</Checkbox>
                </CheckboxGroup>
            </div>
            <!-- 预约挂号池是否为第三方 -->
            <div class="main_yy">
                <span class="main_yy_name">预约挂号池是否为第三方</span>
                <iSwitch v-model="registerIthirdparty"/>
            </div>
            <!-- 预约挂号池第三方数据 -->
            <div v-show="registerIthirdparty">
                <!-- 服务类型 -->
                <div class="main_yy">
                    <span class="main_yy_name">服务类型</span>

                    <Select v-model="serviceTypeValue" style="width:120px;margin-right:10px;">
                        <Option
                            v-for="(item,index) in serviceType"
                            :value="item.value"
                            :key="index"
                            :disabled="item.disabled"
                        >{{ item.key }}</Option>
                    </Select>

                    <Button type="primary" @click="addManagement">添加服务</Button>
                </div>

                <Modal v-model="registerFlag" :title="modalTitle" @on-ok="ok" @on-cancel="cancel">
                    <!--  服务名  -->
                    <div class="main_info">
                        <span>服务名</span>
                        <Input v-model="serviceName" style="width: 300px" placeholder="请输入服务名称"/>
                    </div>
                    <!-- 服务路径 -->
                    <div class="main_info">
                        <span>服务路径</span>
                        <Input v-model="serviceUrl" style="width: 300px" placeholder="请输入服务路径"/>
                    </div>
                    <!-- 第三方参数 -->
                    <div class="main_info">
                        <span>第三方参数</span>
                        <Input v-model="requestVal" style="width: 300px" placeholder="请输入第三方参数 "/>
                    </div>
                    <!-- 第三方厂家 -->
                    <div class="main_info">
                        <span>第三方厂家</span>
                        <Select v-model="thirdValue" style="width:150px;">
                            <Option
                                v-for="(item,index) in thirdList"
                                :value="item.id"
                                :key="index"
                            >{{ item.className }}</Option>
                        </Select>
                    </div>
                    <!-- 是否开启 -->
                    <div class="main_enable">
                        <span style="min-width:100px;">是否启用</span>
                        <iSwitch v-model="enable" size="large">
                            <span slot="open">启用</span>
                            <span slot="close">禁用</span>
                        </iSwitch>
                    </div>
                </Modal>

                <!-- 添加的服务列表 -->
                <div
                    v-show="AddserviceList.length"
                    v-for="item,index in AddserviceList"
                    :key="index"
                >
                    <!--  服务名  -->
                    <div class="main">
                        <h2>
                            <span>服务类型：{{ serviceType[item.serviceType-1].key}}</span>
                            <Button type="primary" @click="appendItem(item,index)">编辑服务</Button>
                        </h2>
                    </div>
                    <div class="main_info">
                        <span>服务名</span>
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
                        <span>{{ sumId(item.thirdpartyEnum) }}</span>
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
        vueEditor
    },
    data() {
        return {
            // modaltitle
            modalTitle: "添加服务",
            info: {
                // 机构简介
                content: ""
            },
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
            serviceType: [
                {
                    value: 1,
                    key: "His",
                    disabled: false
                },
                {
                    value: 2,
                    key: "预约挂号池",
                    disabled: false
                },
                {
                    value: 3,
                    key: "妇幼",
                    disabled: false
                }
            ],
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
            urlCode: '{"urlCode":"' + code.urlCode.richText + '"}'
        };
    },
    methods: {
        // 机构简介
        afterChange(val) {
            this.info.content = val;
        },
        // 是否开通互联网医院关连数据
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
            this.registerFlag = true;
        },
        // 计算数组中数据不为空时返回空字符串
        computedLis (arr) {
            if (arr.length != 0) {
               return arr.join(",")
            }
            return ""
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
            // 挂号池为第三方时未添加服务类型 无法保存
            if (this.registerIthirdparty) {
                if (!Boolean(this.AddserviceList.length)) {
                    this.$Message.error("请添加服务类型");
                    return "";
                }
            }
            // 当机构电话输入其他字符时不允许修改
            if(!Number(this.y_phone) && this.y_phone != '') {
                this.$Message.error("请检查机构电话是否输入正确");
                return ""
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
                //公众号
                appid: this.y_gzh,
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
                // 预约挂号服务
                list: this.AddserviceList,
                // lisPattern数据查询
                lisPattern,
                // pacsPattern数据查询
                pacsPattern
            };
            console.log(params);
            // 当医院关闭互联网医院时把appid清空
            if (!this.switch1) {
                params.appid = null;
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
        ok() {
            if (
                !this.serviceName ||
                !this.serviceUrl ||
                !this.thirdValue
            ) {
                this.$Message.error("请完整填写必填项");
                return "";
            }
            let a = 0;
            if(!this.enable) {
                a = 1 
            }
            let params = {
                //服务名称
                serviceName: this.serviceName,
                // 服务路径
                serviceUrl: this.serviceUrl,
                // 第三方参数
                requestVal: this.requestVal,
                // 医院ID
                hospitalId: this.id,
                // 服务类型
                serviceType: this.serviceTypeValue,
                // 是否启用
                enable: a,
                // 第三方厂家
                thirdpartyEnum: this.thirdValue
            };
                console.log(params)
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
            this.serviceName = "";
            this.requestVal = "";
            this.serviceUrl = "";
            this.enable = false;
            this.modalTitle = "添加服务";
            this.serviceType[this.serviceTypeValue - 1].disabled = true;
            this.serviceTypeValue = null;
        },
        // 编辑服务
        appendItem(item, index) {
            this.modalTitle = "编辑服务";
            this.registerFlag = true;
            this.serviceTypeValue = item.serviceType;
            this.serviceName = item.serviceName;
            this.requestVal = item.requestVal;
            this.serviceUrl = item.serviceUrl;
            this.thirdValue = item.thirdpartyEnum;
            this.enable = !Boolean(item.enable);
        },
        //
        cancel() {
            // 初始化
            this.serviceName = "";
            this.requestVal = "";
            this.serviceUrl = "";
            this.enable = false;
            this.serviceTypeValue = null;
            this.modalTitle = "添加服务";
            this.thirdValue = ''
        },
        // 根据ID查找它的名字
        sumId(id) {
            let res = "";
            this.thirdList.forEach((item, index) => {
                if (Number(id) == Number(item.id)) {
                    res = item.className;
                }
            });
            // console.log('thirdList::',this.thirdList);
            return res;
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
                    this.gzh = ret;
                }
            });
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
                    console.log(ret)
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

                    // 第三方厂家
                    this.thirdList = ret.thirdpartyListMap;
                    this.thirdList.map((el)=>{
                      el.id = parseInt(el.id);
                    })
                    //添加的服务列表
                    this.AddserviceList = ret.listThirdparty || [];
                      if(Boolean(this.AddserviceList)) {
                        this.AddserviceList.forEach(item => {
                          this.serviceType.forEach(i => {
                              if(Number(item.serviceType) == Number(i.value)) {
                                  i.disabled = true
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
        }
    }
}
</style>