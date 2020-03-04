<template>
    <div class="management">
        <tmpHeader :index="3"/>
        <!-- 功能管理 -->
        <div class = 'wrapper' v-for="(item,index) in list"
            :key="index">
            <span class ='name'>{{ item.title }}</span>
            <iSwitch size="large" v-model="item.status">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </iSwitch>
        </div>

        <div class = 'wrapper'>
            <span class ='name'>功能未开通时是否显示菜单</span>
            <Select v-model="showVal" style="width:150px;">
                <Option v-for="(item,index) in showList" :value="index" :key="index">{{ item }}</Option>
            </Select>
        </div>

        <!-- <div class = 'wrapper'>
            <span class ='name'>首页推荐医生显示数量</span>
            <InputNumber :max="10" :min="1" v-model="params.doctorShowNumber" style="width:200px;"></InputNumber>
        </div>
        <div class = 'wrapper'>
            <span class ='name'>首页推荐医生显示规则</span>
            <Select v-model="params.doctorVal" style="width:200px;">
                <Option v-for="(item,index) in doctorList" :value="index" :key="index">{{ item }}</Option>
            </Select>
            <Select v-model="params.doctorVal" style="width:100px;margin:0 20px;">
                <Option v-for="(item,index) in doctorList" :value="index" :key="index">{{ item }}</Option>
            </Select>
        </div>
        <div class = 'wrapper'>
            <span class ='name'>公众号承载机构类型</span>
            <Select v-model="params.mengentType" style="width:100px">
                <Option v-for="(item,index) in mengentList" :value="index" :key="index">{{ item }}</Option>
            </Select>
        </div>  -->
        
        <!-- <fourLevelLinkage
          @changeProvince="changeProvince"
          @changeCity="changeCity"
          @changeArea="changeArea"
          @changeHospital="changeHospital"
          :province="province"
          :city="city"
          :area="area"
          :hospital="hospital"
        ></fourLevelLinkage>
        -->
        <!-- <FormItem label="banner图片"> -->
        <div class = 'wrapper'>
            <span class ='name'>注册页面LOGO上传</span>
            <div class="input">
                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                <div v-if="item.status === 'finished'">
                    <img :src="item.url" />
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
                <img :src=" uploadList[0].url " v-if="visible" style="width: 100%" />
                </Modal>
            </div>
        </div>
        <!-- </FormItem> -->
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="4">
                <Button type="primary" @click="save">保存</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
import code from "@/configs/base.js";
import api from "@/api/commonApi";
import tmpHeader from "../tmpHeader";
import aesUtils from "@/plugins/aes-utils.js";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import store from "@/store";
export default {
    components: {
        tmpHeader,
        fourLevelLinkage
    },
    data() {
        return {
            // province: null,
            // city: null,
            // area: null,
            // hospital: null,
            // isBack: 2,

            appid: "",
            list: [
                {
                    title: "OCR管理",
                    status: false
                }
            ],
            showVal:"",
            showList: ['不显示','显示正常菜单','显示灰色菜单'],
            doctorList: ['默认随机','患者评分','接诊量','自定义'],
            mengentList:['单体机构','多个机构'],
            params: {
                // 首页医生显示数量
                doctorShowNumber: "",
                // 医生显示规则
                doctorVal:"",
                // 公众号承载机构类型
                mengentType:""
            },
            visible:false,
            uploadList: [],
            id: "",
            uploadModal: true,
            uploadData: { json: '{"urlCode":"' + code.urlCode.appLogo + '"}' },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: "",
            sourceImages: ""
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/publicHosting/index",
                title: "公众号托管"
            },
            {
                path: "/index/operation/wxopeningmanagement/index",
                title: "公众号管理"
            }
        ];
        let iv = store.state.iv;
        let salt = store.state.salt;
        this.appid = aesUtils.decrypt(
            salt,
            iv,
            "wxAppid",
            localStorage.getItem("appid")
        );
    },
    mounted() {
        this.$axios
            .post(api.findKbaWxappFunctionByAppid, {
                appid: this.appid
            })
            .then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    console.log('ret: ', ret);
                    // OCR管理状态
                    this.list[0].status = Boolean(ret.ocrStatus);
                    // 是否支付
                    // this.list[1].status = Boo/lean(ret.ipay)
                    // 是否显示菜单
                    this.showVal = Number(ret.showmenu)
                    if (ret.appLogo) {
                        this.sourceImages = ret.appLogo;
                        this.uploadList.push({
                            name: "a42bdcc1178e62b4694c830f028db5c0",
                            percentage: 100,
                            status: "finished",
                            uid: 1544263544971,
                            url: this.fileBaseUrl + this.pictureFormat(ret.appLogo)
                        });
                    }
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        // changeProvince(val) {
        //     this.province = val;
        // },
        // changeCity(val) {
        //     this.city = val;
        // },
        // changeArea(val) {
        //     this.area = val;
        // },
        // changeHospital(val) {
        //     this.hospital = val;
        // },
        // 保存
        save() {
            let images = "";
            if (this.images !== "") {
                images = this.images;
            }
            let params = {
                appid: this.appid,
                // OCR管理状态
                ocrStatus: Number(this.list[0].status),
                // 是否显示菜单
                showmenu: this.showVal.toString(),
                appLogo:images,
            };
            console.log(params);
            this.$axios.post(api.insertOrUpdate,params).then(res => {
                if (res.data.code) {
                    let ret = res.data.data;
                    console.log(res);
                    this.$Message.info("修改成功");
                } else {
                    this.$Message.error("修改失败,请重试");
                }
            });
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
            file.url = this.fileBaseUrl + res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            file.name = res.object[0].fileName;
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
        }
    },
};
</script>
<style lang="less" scoped>
.management {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .code-row-bg {
        margin-top: 20px;
    }
    .wrapper{
        width:100%;
        height:auto;
        display:flex;
        flex-direction:row;
        align-items:center;
        padding:0 10px;
        margin:15px 0;
        .name {
            min-width:200px;
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
}
</style>
