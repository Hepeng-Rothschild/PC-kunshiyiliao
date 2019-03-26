<template>
    <div class="add">
        <div class="container">
            <header>
                <div>添加账号</div>
            </header>
            <div class="main">
                <!-- 登录账号 -->
                <div class="pass">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>登录账号</span>
                    </div>
                    <Input v-model.trim="text" placeholder="请输入登录账号" style="width: 300px"/>
                </div>
                <!-- 登录密码 -->
                <div class="pass">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>登录密码</span>
                    </div>
                    <Input
                        v-model.trim="pass"
                        placeholder="请设置登录密码"
                        style="width: 300px"
                        type="password"
                        :maxlength="16"
                    />
                </div>
                <!-- 用户昵称 -->
                <div class="pass">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>用户昵称</span>
                    </div>
                    <Input v-model.trim="niceName" placeholder="请设置用户昵称" style="width: 300px"/>
                </div>
                <!-- 用户头像 -->
                <div class="main_imgs">
                    <div class="main_title_info">
                        <span style="color:red;">&nbsp;&nbsp;</span>
                        <span>用户头像</span>
                    </div>
                    <div class="input">
                        <div class="demo-upload-list" v-for="(item,index) in uploadList" :key='index'>
                            <div v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon
                                        type="ios-eye-outline"
                                        @click.native="handleView(item.name)"
                                    ></Icon>
                                    <Icon
                                        type="ios-trash-outline"
                                        @click.native="handleRemove(item)"
                                    ></Icon>
                                </div>
                            </div>
                            <div v-else>
                                <Progress
                                    v-if="item.showProgress"
                                    :percent="item.percentage"
                                    hide-info
                                ></Progress>
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
                            <img :src="uploadList[0].url " v-if="visible" style="width: 100%">
                        </Modal>
                    </div>
                </div>
                <!-- 用户姓名 -->
                <!-- <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户姓名</span>
          </div>
          <Input v-model.trim="name" placeholder="请填写身份证上的名字" style="width: 300px"/>
          <div class="sex">
            <span style="color:red;">*</span>
            <span style="margin-right:20px;">性别</span>
            <RadioGroup v-model="sex">
              <Radio label="boy">男</Radio>
              <Radio label="griy">女</Radio>
            </RadioGroup>
          </div>
                </div>-->
                <!-- 用户身份 -->
                <div class="pass">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>用户身份</span>
                    </div>
                    <div>
                        <Select class="w-select-identity" placeholder="用户身份" v-model="identityAdd">
                            <!-- <Option value="0">全国</Option> -->
                            <Option
                                v-for="item in identityList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                    </div>
                </div>
                <!-- 用户所属 -->
                <div class="pass">
                    <div class="left">
                        <span style="color:red;">*</span>
                        <span>用户所属</span>
                    </div>
                    <div>
                        <Select
                            class="w-select"
                            @on-change="changeProvince"
                            placeholder="省"
                            v-model="provinceId"
                            :clearable="!provinceStatus"
                            :disabled="provinceStatus"
                            v-if="identityAdd >= 2 || identityAdd == 5"
                        >
                            <!-- <Option value="0">全国</Option> -->
                            <Option
                                v-for="item in provinceList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeCity"
                            placeholder="市"
                            v-model="cityId"
                            :clearable="!cityStatus"
                            :disabled="cityStatus"
                            v-if="identityAdd >= 3 || identityAdd == 5"
                        >
                            <Option
                                v-for="(item) in cityList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select"
                            @on-change="changeArea"
                            placeholder="区/县"
                            v-model="areaId"
                            :clearable="!areaStatus"
                            :disabled="areaStatus"
                            v-if="identityAdd >= 4 || identityAdd == 5"
                        >
                            <Option
                                v-for="item in areaList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                        <Select
                            class="w-select-hos"
                            placeholder="医院"
                            v-model="hospitalId"
                            :clearable="!hospitalStatus"
                            :disabled="hospitalStatus"
                            v-if="identityAdd == 5"
                        >
                            <Option
                                v-for="item in hospitalList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.orgName}}</Option>
                        </Select>
                    </div>
                </div>
                <!-- 是否开启 -->
                <div class="pass">
                    <div class="left">
                        <span style="color:red;">&nbsp;</span>
                        <span>是否开启</span>
                    </div>
                    <iSwitch v-model="switch1" size="large">
                        <span slot="open">启用</span>
                        <span slot="close">禁用</span>
                    </iSwitch>
                </div>
                <!-- 机构名称 -->
                <!-- <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称</span>
          </div>
          <Select v-model="Organizationname" style="width:150px">
            <Option v-for="item in hosipal" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
                </div>-->
                <!-- 用户角色 -->
                <!-- <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <Select v-model="role" style="width:150px">
            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
                </div>-->
                <!-- 备注 -->
                <!-- <div class="remarks">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>备注</span>
          </div>
          <Input v-model="remarks" type="textarea" :rows="4"/>
                </div>-->
                <!-- 保存 -->
                <div class="save">
                    <Button type="primary" @click="save">添加</Button>
                    <Button @click="back">取消</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import { RadioGroup, Radio } from "iview";
import cookie from "@/utils/cookie.js";
export default {
    components: {
        RadioGroup,
        Radio
    },
    data() {
        return {
            switch1: true,
            // 账号
            text: "",
            // 密码
            pass: "",
            // 姓名
            name: "",
            // 手机号码
            phone: "",
            // 昵称
            niceName: "",
            sex: "",
            // 机构名称
            Organizationname: "",
            //用户角色
            role: "",
            // 备注
            remarks: "",
            // 机构名称
            hosipal: [
                {
                    value: "New York",
                    label: "New York"
                }
            ],
            // //用户角色列表
            roleList: [
                {
                    value: "New York",
                    label: "New York"
                }
            ],
            readonly: true,
            defaultList: [],
            imgName: "",
            visible: false,
            uploadList: [],
            // id: sessionStorage.getItem("appid"),
            uploadModal: true,
            uploadData: {
                json: '{"urlCode":"' + code.urlCode.userImage + '"}'
            },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: "",

            identityList: [
                // {id:1,name:'超级管理员'},
                // { id: 2, name: "省级管理员" },
                // { id: 3, name: "市级管理员" },
                // { id: 4, name: "区级管理员" },
                // { id: 5, name: "机构管理员" }
            ],
            provinceList: [],
            cityList: [],
            areaList: [],
            hospitalList: [],

            provinceId: null,
            cityId: null,
            areaId: null,
            hospitalId: null,
            
            provinceStatus: false,
            cityStatus: false,
            areaStatus: false,
            hospitalStatus: false,

            identityAdd: 5,
            identityAddCoding: null,
            identity: null,
            identityCoding: null,
            ownArea: null,
        };
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        // 关闭input框的自动填充
        setTimeout(() => {
            this.text = "";
            this.pass = "";
        });
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/admin/user/list",
                title: "账号管理"
            }
        ];
        this.$emit("changeBreadList", breadList);

        this.identity = cookie.getCookie("idtt");
        this.identityCoding = cookie.getCookie("idttC");
        this.ownArea = JSON.parse(cookie.getCookie("ownArea"));
        if (this.ownArea.province) {
            this.provinceStatus = true;
            this.provinceList.push(this.ownArea.province);
            this.provinceId = this.ownArea.province.id;
        }
        if (this.ownArea.city) {
          this.cityStatus = true;
            this.cityList.push(this.ownArea.city);
            this.cityId = this.ownArea.city.id;
        }
        if (this.ownArea.area) {
          this.areaStatus = true;
            this.areaList.push(this.ownArea.area);
            this.areaId = this.ownArea.area.id;
        }

        if (this.identity == 1) {
            this.identityList.push({ id: 2, name: "省级管理员" });
            this.identityList.push({ id: 3, name: "市级管理员" });
            this.identityList.push({ id: 4, name: "区级管理员" });
            this.identityList.push({ id: 5, name: "机构管理员" });
            this.provinceList = this.$store.getters.getProvinceList;
        } else if (this.identity == 2) {
            this.identityList.push({ id: 3, name: "市级管理员" });
            this.identityList.push({ id: 4, name: "区级管理员" });
            this.identityList.push({ id: 5, name: "机构管理员" });
            this.cityList = this.$store.getters.getCityList(this.provinceId);
        } else if (this.identity == 3) {
            this.identityList.push({ id: 4, name: "区级管理员" });
            this.identityList.push({ id: 5, name: "机构管理员" });
            this.areaList = this.$store.getters.getAreaList(this.cityId);
        } else if (this.identity == 4) {
            this.identityList.push({ id: 5, name: "机构管理员" });
            var params = {};
            params.provinceCode = parseInt(this.provinceId);
            params.cityCode = parseInt(this.cityId);
            params.districtCode = parseInt(this.areaId);
            this.$axios
                .post(api.hospitalselectbyprovincecode, params)
                .then(resp => {
                    let list = resp.data.object;
                    list.map((el, i) => {
                        this.hospitalList.push({id:parseInt(el.id),orgName:el.orgName});
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (this.identity == 5) {
            this.identityList.push({ id: 5, name: "机构管理员" });
            this.hospitalId = parseInt(this.identityCoding);
            this.hospitalStatus = true;
            this.$axios
                .post(api.managementInfo, {
                    hospitalId: parseInt(this.identityCoding)
                })
                .then(resp => {
                    this.hospitalList.push({
                        id: resp.data.object.hospitalId,
                        orgName: resp.data.object.orgName
                    });
                })
                .catch(err => {});
        }

        this.provinceList = this.$store.getters.getProvinceList;
    },
    methods: {
        changeProvince() {
            this.cityId = null;
            this.areaId = null;
            this.hospitalId = null;
            this.cityList = this.$store.getters.getCityList(this.provinceId);
            this.hospitalList = null;
        },
        changeCity() {
            this.areaId = null;
            this.hospitalId = null;
            this.areaList = this.$store.getters.getAreaList(this.cityId);
            this.hospitalList = null;
        },
        changeArea() {
            this.hospitalId = null;
            this.hospitalList = null;
            var params = {};
            params.provinceCode = parseInt(
                this.provinceId == 0 ? null : this.provinceId
            );
            this.$axios
                .post(api.hospitalselectbyprovincecode, params)
                .then(resp => {
                    this.hospitalList = resp.data.object;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        save() {
            let images = "";
            // 上传
            if (this.images != "") {
                images = this.images;
            } else if (this.sourceImages != "" && this.uploadList.length) {
                images = this.sourceImages;
                // 默认
            } else {
                images = "";
            }
            if (this.identityAdd == 1) {
            } else if (this.identityAdd == 2) {
                if (this.provinceId == null) {
                    this.$Message.info("请选择所属省");
                    return ;
                }
                this.identityAddCoding = this.provinceId;
            } else if (this.identityAdd == 3) {
                if (this.cityId == null) {
                    this.$Message.info("请选择所属市");
                    return ;
                }
                this.identityAddCoding = this.cityId;
            } else if (this.identityAdd == 4) {
                if (this.areaId == null) {
                    this.$Message.info("请选择所属区/县");
                    return ;
                }
                this.identityAddCoding = this.areaId;
            } else if (this.identityAdd == 5) {
                if (this.hospitalId == null) {
                    this.$Message.info("请选择所属机构");
                    return ;
                }
                this.identityAddCoding = this.hospitalId;
            }
            let params = {
                // 账号
                userName: this.text,
                //密码
                passWord: this.pass,
                // 用户昵称
                nickName: this.niceName,
                status: Number(this.switch1),
                // 用户头像
                userIcon: images,
                identity: this.identityAdd,
                identityCoding: this.identityAddCoding
            };
            if (this.text == "") {
                this.$Message.info("登录账号不能为空");
            } else if (this.pass == "") {
                this.$Message.info("登录密码不能为空");
            } else if (params.niceName == "") {
                this.$Message.info("用户昵称不能为空");
            } else {
                this.$axios.post(api.adminAdd, params).then(res => {
                    if (res.data.code) {
                        let a = res.data.object.fail || res.data.object.success;
                        this.$Message.info(a);
                        let pageNo = this.$route.query.pageNo;
                        if (!res.data.object.fail) {
                            setTimeout(() => {
                                 this.functionJS.queryNavgationTo(this, '/index/maintain/admin/user/list',{
                                    pageNo
                                 });
                                
                            }, 800);
                        }
                    } else {
                        this.$Message.info("不允许访问");
                    }
                });
            }
        },
        back() {
            let pageNo = this.$route.query.pageNo;
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/admin/user/list",
                {
                    pageNo
                }
            );
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
            if (res.code) {
                file.url = this.fileBaseUrl + res.object[0].fileName;
                this.images = JSON.stringify(res.object[0]);
                file.name = res.object[0].fileName;
            } else {
                this.$Message.info("上传失败,请重试");
            }
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
        },
        analysisImages(json) {
            try {
                json = JSON.parse(json);
                return json.fileName;
            } catch (error) {
                return "";
            }
        }
    }
};
</script>
<style lang="less" scoped>
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
// 关闭input文本框自动填充背景色黄色
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
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
.w-select {
    width: 100px;
}
.w-select-hos {
    width: 180px;
}
.w-select-identity {
    width: 100px;
}
.add {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 90%;
        margin: 0 auto;
        header {
            div {
                font-size: 18px;
            }
        }
        .main {
            width: 90%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            .pass {
                width: 600px;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 10px auto;
                .left {
                    width: 100px;
                }
                .sex {
                    margin: 0 20px;
                    input {
                        width: 15px;
                        height: 15px;
                    }
                }
            }
            .main_imgs {
                display: flex;
                width: 600px;
                flex-direction: row;
                margin: 10px auto;
                align-items: center;
                .main_title_info {
                    min-width: 100px;
                }
            }
            .remarks {
                display: flex;
                width: 600px;
                flex-direction: row;
                margin: 10px auto;
                .left {
                    width: 100px;
                }
                textarea {
                    display: inline-block;
                    outline: none;
                    text-indent: 10px;
                    width: 400px;
                }
            }
            .save {
                width: 300px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 20px auto;
                div {
                    width: 100px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                }
                div:first-child {
                    background: #fff;
                    border: 1px solid #cacaca;
                    border-radius: 4px;
                }
                div:last-child {
                    background: #3399ff;
                    color: #fff;
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>

