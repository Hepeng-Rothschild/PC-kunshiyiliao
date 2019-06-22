<template>
    <div class="add">
        <div class="container">
            <header>
                <div>添加账号</div>
            </header>
            <div class="main">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<!-- 登录账号 -->
					<div class="userName">
						<div class="left">
							<span style="color:red;">*</span>
							<span>登录账号</span>
						</div>
						<FormItem prop="userName">
							<Input v-model.trim="formValidate.userName" placeholder="请输入登录账号" style="width: 300px" @on-keyup="formValidate.userName = formValidate.userName.replace(/[^\w_]/g,'');" maxlength="64"></Input>
						</FormItem>
					</div>
					<!-- 登录密码 -->
					<div class="userName">
						<div class="left">
							<span style="color:red;">*</span>
							<span>登录密码</span>
						</div>
						<FormItem prop="passWord">
							<Input v-model.trim="formValidate.passWord" placeholder="请设置登录密码" style="width: 300px" type="password" :maxlength="16" autocomplete="new-password"></Input>
						</FormItem>
					</div>
					<!-- 用户昵称 -->
					<div class="userName">
						<div class="left">
							<span style="color:red;">*</span>
							<span>用户昵称</span>
						</div>
						<FormItem prop="nickName">
							<Input v-model.trim="formValidate.nickName" placeholder="请设置用户昵称" style="width: 300px"></Input>
						</FormItem>
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
							<Modal title="预览图片" v-model="visible" footer-hide :styles="{top: '20px'}">
								<img :src="uploadList[0].url " v-if="visible" style="width: 100%">
							</Modal>
						</div>
						</div>
					<!-- 用户身份 -->
					<div class="userName">
						<div class="left">
							<span style="color:red;">*</span>
							<span>用户身份</span>
						</div>
						<FormItem prop="identityAdd">
							<div>
								<Select class="w-select-identity" placeholder="用户身份" v-model="formValidate.identityAdd">
									<Option
										v-for="item in identityList"
										:value="item.id"
										:key="item.id"
                                        style='text-align:center;'
									>{{item.name}}</Option>
								</Select>
							</div>
						</FormItem>
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
								v-if="formValidate.identityAdd >= 2 || formValidate.identityAdd == 5"
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
								v-model="cityId"
								:clearable="!cityStatus"
								:disabled="cityStatus"
								v-if="formValidate.identityAdd >= 3 || formValidate.identityAdd == 5"
							>
								<Option
									v-for="(item) in cityList"
									:value="item.id"
									:key="item.id"
                                    style='text-align:center;'
								>{{item.name}}</Option>
							</Select>
							<Select
								class="w-select"
								@on-change="changeArea"
								placeholder="区/县"
								v-model="areaId"
								:clearable="!areaStatus"
								:disabled="areaStatus"
								v-if="formValidate.identityAdd >= 4 || formValidate.identityAdd == 5"
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
								v-model="hospitalId"
								:clearable="!hospitalStatus"
								:disabled="hospitalStatus"
								v-if="formValidate.identityAdd == 5"
							>
								<Option
									v-for="item in hospitalList"
									:value="item.id"
									:key="item.id"
                                    style='text-align:center;'
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
					<!-- 保存 -->
					<div class="save">
						<Button type="primary" @click="save('formValidate')">添加</Button>
						<Button @click="back">取消</Button>
					</div>
				</Form>
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
			formValidate:{
				userName: "",
                //密码
                passWord: "",
                // 用户昵称
				nickName: "",
				identityAdd: 5,
				identityAddCoding:""
			},
			ruleValidate:{
				// 登录账号
				userName:[
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入登录账号",
						// 触发事件
						trigger: "blur"
					}
				],
				// 登录密码
				passWord:[
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入登录密码",
						// 触发事件
						trigger: "blur"
					}
				],
				// 用户昵称
				nickName:[
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入用户昵称",
						// 触发事件
						trigger: "blur"
					}
				],
				// 用户身份
				identityAdd:[
					{
						required: true,
						message: "请选择用户身份",
						trigger: "change"
					}
				],
				// 关联机构
				identityCoding:[
					{
						required: true,
						message: "请选择用户身份",
						trigger: "change"
					}
				],
			},
            switch1: true,
			// 上传图片相关
            defaultList: [],
            imgName: "",
            visible: false,
            uploadList: [],
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
			// 区域列表
            provinceList: [],
            cityList: [],
			areaList: [],
			// 医院列表
            hospitalList: [],
			// 选中的区域
            provinceId: null,
            cityId: null,
            areaId: null,
            hospitalId: null,
            // 区域状态
            provinceStatus: false,
            cityStatus: false,
            areaStatus: false,
            hospitalStatus: false,
			// 用户身份
			identityAdd: 5,
			// 当前用户创建权限
			// 区域
			identityAddCoding: null,
			// 用户身份列表
			identity: null,
			// 机构代码/未用
			identityCoding: null,
			// 区县
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
		// this.identityCoding = cookie.getCookie("idttC");
		this.formValidate.identityCoding = cookie.getCookie("idttC");
		this.ownArea = JSON.parse(cookie.getCookie("ownArea"));
		console.log(this.ownArea)
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
            this.hospitalId = parseInt(this.formValidate.identityCoding);
            this.hospitalStatus = true;
            this.$axios
                .post(api.managementInfo, {
                    hospitalId: parseInt(this.formValidate.identityCoding)
                })
                .then(resp => {
                    this.hospitalList.push({
                        id: resp.data.object.hospitalId,
                        orgName: resp.data.object.orgName
                    });
                })
                .catch(err => {});
		}
		this.identityList.forEach(item => {
			item.id = item.id.toString();
		})

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
        save(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					// 必填项填写完成
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
                    
                    if (this.formValidate.identityAdd == 1) {

                    } else if (this.formValidate.identityAdd == 2) {
                        if (this.provinceId == null) {
                            this.$Message.info("请选择所属省");
                            return ;
                        }
                        this.formValidate.identityAddCoding = this.provinceId;
                    } else if (this.formValidate.identityAdd == 3) {
                        if (this.cityId == null) {
                            this.$Message.info("请选择所属市");
                            return ;
                        }
                        this.formValidate.identityAddCoding = this.cityId;
                    } else if (this.formValidate.identityAdd == 4) {
                        if (this.areaId == null) {
                            this.$Message.info("请选择所属区/县");
                            return ;
                        }
                        this.formValidate.identityAddCoding = this.areaId;
                    } else if (this.formValidate.identityAdd == 5) {
                        if (this.hospitalId == null) {
                            this.$Message.info("请选择所属机构");
                            return ;
                        }
                        this.formValidate.identityAddCoding = this.hospitalId;
                    }
                    let params = {
                        // 账号
                        userName: this.formValidate.userName,
                        // 密码
                        passWord: this.formValidate.passWord,
                        // 用户昵称
                        nickName: this.formValidate.nickName,
                        // 是否启用
                        status: Number(this.switch1),
                        // 用户头像
                        userIcon: images,
                        // 用户身份
                        identity: parseInt(this.formValidate.identityAdd),
                        // 所属机构
                        identityCoding: parseInt(this.formValidate.identityAddCoding)
                    };
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
                        })
				} else {
					// 必填项填写失败
					this.$Message.error("请检查必填荐是否填写完整！");
					flag = true;
				}
			})
            
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
                width: 800px;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 10px auto;
                .left {
					width: 100px;
					margin-right:80px;
                }
                .sex {
                    margin: 0 20px;
                    input {
                        width: 15px;
                        height: 15px;
                    }
                }
			}
			.userName{
				width:800px;
				display:flex;
				flex-direction:row;
				margin:10px auto;	
				.left{
					width:100px;
					line-height:32px;
				}
			}
            .main_imgs {
                display: flex;
                width: 800px;
                flex-direction: row;
                margin: 10px auto;
                align-items: center;
                .main_title_info {
					margin-right:80px;
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

