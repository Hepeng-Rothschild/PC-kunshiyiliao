<template>
    <div class="Institutional_information">
        <tmpHeader/>
        <div class="main">
            <!--机构名称 -->
            <div class="main_info">
                <span>机构名称</span>
                <Input :value="info.title" style="width: 370px" disabled/>
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
                <Select v-model="info.grade" style="width:100px" clearable>
                    <Option
                        v-for="item in types"
                        :value="item.dictType"
                        :key="item.dictType"
                        style='text-align:center;'
                    >{{ item.dictName }}</Option>
                </Select>
            </div>
            <!--医联体上级医院-->
            <div class="main_info">
                <span>医联体上级医院</span>
                <Select v-model="info.orgParentCode" style="width:200px;">
                    <Option value="0">请选择</Option>
                    <Option
                        :value="item.orgCode"
                        v-for="(item) in ylt"
                        :key="item.orgCode"
                        style='text-align:center;'
                    >{{ item.orgName }}</Option>
                </Select>
            </div>
            <!--背景模板-->
            <div class="main_moban">
                <span>背景模板</span>
                <Select v-model="info.cssTemplate" style="width:100px;" clearable>
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
                <Input v-model.trim="info.route" placeholder="请输入机构乘车路线" style="width: 370px"/>
            </div>
            <!--机构电话-->
            <div class="main_info">
                <span>机构电话</span>
                <Input
                    v-model="info.telephone"
                    placeholder="请输入机构电话"
                    style="width: 370px"
                    :maxlength="12"
                />
            </div>
            <!--机构地址-->
            <div class="main_info">
                <span>机构地址</span>
                <Input v-model="info.hosAddr" placeholder="请输入机构地址" style="width: 370px"/>
            </div>
            <!--是否开通互联网医院-->
            <div class="main_yy">
                <span class="main_yy_name">开通互联网医院</span>
                <iSwitch v-model="info.internetHospital" @on-change="change"/>
            </div>
            <!--医院关联公众号-->
            <div class="main_moban" style='flex-wrap:wrap;height:auto;'>
                <span>医院关联公众号</span>
                <div v-for='item,index in info.appidList' :key = 'index'>
                    <Select v-model="item.value" style="width:150px;margin-right:4px;" :disabled="status" @on-change='relationwx' clearable @on-clear='relationwx'>
                        <Option
                            v-for ="item in gzh"
                            :value="item.appid"
                            :key="item.appid"
                            :disabled='item.status'
                            style='text-align:center;'
                        >{{ item.nick }}</Option>
                    </Select>
                </div>
                <button class="cus-btn" @click='addAppid'>+</button>
                <button class="cus-btn" @click='unAppid'>-</button>
            </div>
            <!-- 医院公众号支付 -->
            <div class="main_moban" style='flex-wrap:wrap;height:auto;'>
                <span>医院公众号支付</span>
                <Select v-model="info.wxappPay" style="width:150px;" :disabled="status" clearable>
                    <Option
                        v-for="item in selectGzh"
                        :value="item.appid"
                        :key="item.appid"
                        style='text-align:center;'
                    >{{ item.nick }}</Option>
                </Select>
            </div>
            <!--是否加入医院联盟-->
            <div class="main_yy">
                <span class="main_yy_name">加入医院联盟</span>
                <iSwitch v-model="info.unionHospital" :disabled="status" @on-change="change2"/>
            </div>
            <!--医院联盟排序-->
            <div class="main_info">
                <span>医院联盟排序</span>
                <InputNumber :max="99999" :min="1" v-model="info.internetHospitalSort" placeholder="医院联盟排序" :disabled="hospitalFlag"
                style="width:120px;"
                ></InputNumber>
                <p style='margin-left:8px;'>备注:只能填写数字，1代表置顶以此类推</p>
            </div>
            <!-- 预约挂号排序 -->
            <div class="main_info">
                <span>预约挂号排序</span>
                <InputNumber :max="99999" :min="1" v-model="info.appointmentRegistration" placeholder="预约挂号排序" 
                style="width:120px;"></InputNumber>
                <p style='margin-left:8px;'>备注:只能填写数字，1代表置顶以此类推</p>
            </div>
            <!--是否开通处方流转-->
            <div class="main_yy">
                <span class="main_yy_name">开通处方流转</span>
                <iSwitch v-model="info.ipres"/>
            </div>
            <!--处方流转平台接口ID-->
            <div class="main_info">
                <span>处方流转平台接口ID</span>
                <Input v-model="info.prescriptionId" placeholder="请输入Id" style="width: 370px"/>
            </div>
            <!--是否加入远程门诊-->
            <imyswitch :status='info.iremote' title='加入远程门诊' @statuschange='switch4Change' v-if='info.title'></imyswitch>
            <!-- 是否是否强制用券 -->
            <imyswitch :status='info.usedCoupon' title='是否强制用券' @statuschange='usedCouponChange' v-if='info.title'></imyswitch>
            <!-- 预约挂号支付 -->
            <imyswitch :status='info.registerPayStatus' title='预约挂号支付' @statuschange='registerPayStatusChange' v-if='info.title'></imyswitch>
            <!-- 预约挂号池是否为第三方 -->
            <imyswitch :status='info.registerIthirdparty' title='预约挂号池是否为第三方' @statuschange='registerIthirdpartyChange' v-if='info.title'></imyswitch>
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
            info: {
                // 机构名称
                title:"",
                // 机构等级
                grade:"",
                // 医联体上级医院
                orgParentCode:"",
                // 背景模板
                cssTemplate:"",
                // 机构简介
                content: "",
                // 乘车路线
                route:"",
                // 机构电话
                telephone:"",
                // 机构地址
                hosAddr:"",
                // 互联网医院
                internetHospital:false,
                // 医院关联公众号
                appidList:[],
                // 支付公众号
                wxappPay:"",
                // 医院聪明
                unionHospital:false,
                // 联盟排序
                internetHospitalSort:"",
                // 预约挂号排序
                appointmentRegistration:"",
                // 是否开通处方流转
                ipres:false,
                // 处方流转平台接口ID
                prescriptionId:"",
                // 远程门诊
                iremote:false,
                // 强制用卷
                usedCoupon:false,
                // 预约挂号支付
                registerPayStatus: false,
                // 预约挂号池是否为第三方
                registerIthirdparty: false,
            },
            // 所有的公众号列表
            gzh: [],
            // 当前医院已经关联的公众号列表
            selectGzh:[],
            // 医联体列表
            ylt: [],
            // 机构等级列表
            types: [],
            // 上传图片相关
            uploadList: [],
            visible: false,
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
            hospitalFlag: false,
            urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
            
        };
    },
    methods: {
        // 机构简介
        afterChange(val) {
            this.info.content = val;
        },
        // 强制用卷
        usedCouponChange (status) {
            this.info.usedCoupon = status
        },
        // 预约挂号支付
        registerPayStatusChange (status) {
            this.info.registerPayStatus = status
        },
        // 是否加入远程门诊
        switch4Change (status) {
            this.info.iremote = status
        },
        // 预约挂号池是否为第三方
        registerIthirdpartyChange (status) {
            this.info.registerIthirdparty = status
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
            let applen = this.info.appidList.length
            if (gzhlen <= applen) {
                this.$Message.error('当前仅有'+gzhlen+'个公众号可选择')
                return ""
            }
            this.info.appidList.forEach(item => {
                this.gzh.forEach(i => {
                    if(i.appid == item.value) {
                        i.status = true;
                    }
                })
            })
            this.info.appidList.push({
                value : "",
                status : false
            })
            this.relationwx();
        },
        unAppid () {
            if (this.status) {
                this.$Message.error("请开通互联网医院")
                return ""
            }
            if(this.info.appidList.length != 1) {
                this.info.appidList.splice(this.info.appidList.length-1,1);
            } else {
                this.$Message.error("请至少关联一个公众号")
            }
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
            this.info.appidList.forEach(item => {
                this.gzh.forEach((i,m) => {
                    if (item.value == i.appid) {
                        list.push(i)
                        i.status = true
                    }
                })
            })
            this.info.wxappPay = ''
            this.selectGzh = list
        },
        // 是否开通互联网医院关联数据
        change(status) {
            if (status) {
                this.status = false;

            } else {
                this.info.appidList.forEach(item => {
                    item.value = ''
                })
                this.status = true;
                this.info.wxappPay = null;
                this.info.unionHospital = false;
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
              //关联的多个公众号的appid
            let appid = []
            if(this.info.internetHospital) {
                this.info.appidList.forEach(item => {
                    if(Boolean(item.value)) {
                        appid.push(item.value);
                    }
                })
            }
            // 全部参数
            let params = {
                hospitalId: this.id,
                //上级编码
                orgParentCode: this.info.orgParentCode,
                // 医院图标
                hosIcon: images,
                //机构等级
                grade: this.info.grade,
                //模板
                cssTemplate: this.info.cssTemplate,
                //路线
                route: this.info.route,
                //电话
                telephone: this.info.telephone,
                //简介
                hosIntroduction: this.info.content,
                //地址
                hosAddr: this.info.hosAddr,
                //互联网医院
                internetHospital: Number(this.info.internetHospital),
                // 关联公众号列表
                appidList: appid,
                //公众号支付
                wxappPay: this.info.wxappPay,
                //医院联盟
                unionHospital: Number(this.info.unionHospital),
                //处方平台UID
                prescriptionId: this.info.prescriptionId,
                // 预约挂号排序
                appointmentRegistration:String(this.info.appointmentRegistration),
                //处方流转
                ipres: Number(this.info.ipres),
                // 医院排序
                internetHospitalSort: this.info.internetHospitalSort,
                // 开启远程门诊
                iremote: Number(this.info.iremote),
                // 是否强制用卷
                usedCoupon: Number(this.info.usedCoupon),
                // 预约挂号支付
                registerPayStatus: Number(this.info.registerPayStatus),
                // 预约挂号池是否为第三方
                registerIthirdparty: Number(this.info.registerIthirdparty),
            };
            if(this.title == '') {
                this.$Message.error("医院数据加载失败，请重试")
                return ""
            }
            // 当医院关闭互联网医院时把appid清空
            if (!this.info.internetHospital) {
                params.wxappPay = '';
                params.appidList = []
            } else if(this.info.internetHospital) {
                if(!Boolean(params.wxappPay) || params.appidList.length == 0){
                    this.$Message.error("请选择医院关联公众号与医院公众号支付")
                    return ""
                }
            }
            // 远程门诊状态缓存
            if (this.info.iremote) {
                localStorage.setItem("doctor", "show");
            } else {
                localStorage.setItem("doctor", "");
            }
            this.$axios
                .post(api.managementEdit, params)
                .then(res => {
                    console.log(res);
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
            if (this.info.internetHospital) {
                localStorage.setItem("status", "show");
            } else {
                localStorage.setItem("status", "");
            }
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
                    this.gzh = ret;
                }
            });
            // 医院关联公众号
            this.$axios.post(api.hospitalwxapplist, {
                hospitalId:this.id
            }).then(res => {
                if(res.data.message) {
                    let ret = res.data.object;
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
                    this.info.title = ret.orgName
                    // 机构等级
                    this.info.grade = ret.grade
                    // 医联体上级医院
                    this.info.orgParentCode = ret.orgParentCode
                    // 背景模板
                    this.info.cssTemplate = ret.cssTemplate
                    // 简介
                    this.info.content = ret.hosIntroduction;
                    //路线
                    this.info.route = ret.route
                    //电话
                    this.info.telephone = ret.telephone
                    // 地址
                    this.info.hosAddr = ret.hosAddr
                    // appidList关联公众号列表
                    let appidList = ret.appidList || []
                   
                    //互联网医院
                    this.info.internetHospital = Boolean(ret.internetHospital)
                    if (Boolean(ret.internetHospital)) {
                        this.status = false;
                        localStorage.setItem("status", "show");
                        // wxappPay公众号支付
                        this.info.wxappPay = ret.wxappPay
                         // 医院关联公众号回显
                        if (Boolean(appidList.length)) {
                            appidList.forEach(i => {
                                this.info.appidList.push({
                                    value : i,
                                    status : true,
                                })
                            })
                        } else {
                            this.info.appidList.push({
                                value : '',
                                status : false
                            })
                        }
                    } else {
                        this.status = true;
                        localStorage.setItem("status", "");
                        this.info.appidList.push({
                            value : '',
                            status : false
                        })
                    }
                    // 医院联盟
                    this.info.unionHospital = Boolean(ret.unionHospital);
                    // 排序
                    this.info.internetHospitalSort = ret.internetHospitalSort;
                    // hospitalFlag
                    if (Boolean(ret.unionHospital)) {
                        this.hospitalFlag = false;
                    } else {
                        this.hospitalFlag = true;
                    }
                    // 处方流转
                    this.info.ipres = Boolean(ret.ipres);
                    // 流转平台id
                    this.info.prescriptionId = ret.prescriptionId
                    // 开启远程门诊
                    this.info.iremote = Boolean(ret.iremote);
                    if (Boolean(ret.iremote)) {
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
                    this.info.appointmentRegistration = appointmentRegistration;

                    // 是否强制用卷
                    this.info.usedCoupon = Boolean(ret.usedCoupon);
                    // 预约挂号支付
                    this.info.registerPayStatus = Boolean(ret.registerPayStatus);
                    // 预约挂号池是否为第三方
                    this.info.registerIthirdparty = Boolean(ret.registerIthirdparty);
                    
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