<template>
    <div class = 'add'>
        <h2 style='font-weight:bold;margin:10px 0;'>新增医疗小组</h2>
        <header>
            <fourLevelLinkage
                @changeProvince="changeProvince"
                @changeCity="changeCity"
                @changeArea="changeArea"
                @changeHospital="changeHospital"
                :province="province"
                :city="city"
                :area="area"
                :hospital="hospital"
                :isBack="isBack"
            ></fourLevelLinkage>
            <AutoComplete
                v-model="info.depantmentName"
                :data="departmentList"
                @on-search="handleSearch1"
                @on-select='handleSelect1'
                placeholder="查询院内科室"
                style="width:200px">
                <Option
                    v-for="item in departmentList"
                    :value="item.childDept"
                    :key="item.id"
                >{{item.childDept}}</Option>
            </AutoComplete>
        </header>
        <div class = 'main'>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <!-- 医疗团队名称 -->
                <FormItem prop="name" label='医疗团队名称'>
                    <Input v-model.trim="formValidate.name" placeholder="请输入医疗团队名称" style="width: 300px"></Input>
                </FormItem>
                <!-- 医疗团队类型 -->
                <FormItem prop="medicalType" label='医疗团队类型'>
                    <Select class="w-select-identity" placeholder="请选择医疗团队类型" style="width:180px;"v-model="formValidate.medicalType">
                        <Option
                            v-for="item in medicalList"
                            :value="item.id"
                            :key="item.id"
                            style='text-align:center;'
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label='团队图标'>
                    <div class="input">
                        <div class="demo-upload-list" v-for="item in uploadList">
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
                    </div>
                </FormItem>
                <!-- 医疗团队电话 -->
                <FormItem prop="phone" label='医疗团队电话'>
                    <Input v-model.trim="formValidate.phone" placeholder="请输入医疗团队电话" style="width: 300px"></Input>
                </FormItem>
                <!-- 排序 -->
                <FormItem label='排序'>
                    <Input v-model.trim="formValidate.sort" placeholder="请输入团队排序" style="width: 110px"></Input>
                </FormItem>
                <!-- 医疗团队备注 -->
                <FormItem label='医疗团队备注'>
                    <Input
                        v-model="formValidate.remarks"
                        type="textarea"
                        :rows="6"
                        placeholder="请输入医疗团队备注"
                        style="width:400px;"
                    />
                </FormItem>
                <!-- 团队管理范围 -->
                <FormItem label='团队管理范围'>
                    <Input
                        v-model="formValidate.teamControlLimi"
                        type="textarea"
                        :rows="6"
                        placeholder="请输入团队管理范围"
                        style="width:400px;"
                    />
                </FormItem>
            </Form>
            <div>
                <Input v-model.trim="searchKey" placeholder="请输入医生名称关键字" style="width: 200px"></Input>
                <Button type="primary" @click='search'>查询</Button>
            </div>
            <div class = 'footerList'>
                <div class="left">
                    <p>可以选择的医疗团队成员</p>
                    <Table stripe :columns="member" :data="memberDate"></Table>
                    <Page :total="count"  :page-size='pageSize' :current = 'pageNo' style='margin:10px 0;' @on-change='pageChange'/>
                    <p style='color:red;'>查询出医生列表后，点击添加，在右侧的列表显示</p>
                </div>
                <div class="right">
                    <p>已经添加的医疗团队成员</p>
                    <Table stripe :columns="addMember" :data="addMemberDate"></Table>
                    <p style='color:red;'>团队角色必须由团队负责人，并且只能有一个团队负责人</p>
                </div>
            </div>
            <Button type="primary" @click='save("formValidate")'>提交</Button>
            <Button @click='reback'>取消</Button>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    components:{
        fourLevelLinkage
    },
    data () {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,
            
            // 所选科室
            info:{
                depantmentName:"",
                depantment:""
            },
            // 科室列表
            departmentList:[],
            // 医疗团队类型
            medicalList:[
                {
                    id:'1',
                    name:"家医签约团队"
                },
                {
                    id:'2',
                    name:"出院随访签约团队"
                }
            ],
            // 所选数据
            formValidate:{
                // 医疗团队名称
                name:"",
                // 医疗团队类型
                medicalType:"",
                // 医疗团队电话
                phone:"",
                // 排序
                sort:"",
                // 备注
                remarks:"",
                // 团队管理范围
                teamControlLimi:""
            },
            // 限制条件
            ruleValidate:{
                // 名称
                name:[
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入医疗团队名称",
						// 触发事件
						trigger: "blur"
					}
                ],
                // 类型
                medicalType:[
					{
						required: true,
						message: "请选择医疗团队类型",
						trigger: "change"
					}
                ],
                // 电话
                phone:[
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入医疗团队名称",
						// 触发事件
						trigger: "blur"
					}
                ],
            },
            // 医生查询条件
            searchKey:"",
            // 医生列表分页
            pageNo:1,
            pageSize:8,
            count:10,
            // 左侧医疗团队成员
            member:[
                {
                    title:"序号",
                    align:"center",
                    key:"sum"
                },
                {
                    title:"医生姓名",
                    align:"center",
                    key:"doctorName"
                },
                {
                    title:"科室",
                    align:"center",
                    key:"deptType"
                },
                {
                    title:"职称",
                    align:"center",
                    key:"title"
                },
                {
                    title:"联系电话",
                    align:"center",
                    key:"phone"
                },
                {
                    title:"操作",
                    align:"center",
                    render:(h,params) => {
                        let row = params.row;
                        return [
                            h('a', {
                                on:{
                                    'click':() => {
                                        console.log(row);
                                        this.addMemberDate.push(row)
                                        this.memberDate.splice(row._index,1);
                                        this.roleList[0].disabled = this.disabledRole()
                                    }
                                }
                            }, '添加')
                        ]
                    }
                }
            ],
            memberDate:[],
            // 角色列表
            roleList:[
                {
                    id:"1",
                    name:"队长",
                    disabled:false
                },
                {
                    id:"0",
                    name:"其他",
                    disabled:false
                }
            ],
            // 右侧医疗团队成员
            addMember:[
                {
                    title:"序号",
                    align:"center",
                    key:"sum"
                },
                {
                    title:"医生姓名",
                    align:"center",
                    key:"doctorName"
                },
                {
                    title:"科室",
                    align:"center",
                    key:"deptType"
                },
                {
                    title:"职称",
                    align:"center",
                    key:"title"
                },
                {
                    title:"联系电话",
                    align:"center",
                    key:"phone"
                },
                {
                    title:"团队角色",
                    align:"center",
                    width:120,
                    render: (h, params) => {
                            return h('Select', {
                                    props:{
                                    // 监听的值
                                        value: params.row.role,
                                    },
                                    on: {
                                        // 事件触发
                                        'on-change':(event) => {
                                            this.addMemberDate[params.row._index].role = event;
                                            params.row.role = event
                                            console.log(params.row);
                                            this.roleList[0].disabled = this.disabledRole()
                                            console.log(this.disabledRole());
                                        }
                                    },
                                },
                                this.roleList.map(function(type){//这个数组需要在data中定义,里面是一个个对象,每个对象里面应当包含value属性(因为要用到)
                                    return h('Option', {
                                        props:{
                                            value:type.id,
                                            disabled:type.disabled
                                        }
                                    }, type.name);
                                })
                            )
                        },
                },
                {
                    title:"操作",
                    align:"center",
                    key:"sum",
                    render:(h,params) => {
                        let row = params.row
                        return [
                            h('a',{
                                on:{
                                    'click':() => {
                                        row.role = ''
                                        this.addMemberDate.splice(row._index,1)
                                        this.roleList[0].disabled = this.disabledRole()
                                        console.log(row);
                                    }
                                }

                            },'移除')
                        ]
                    }
                }
            ],
            addMemberDate:[],
            // 上传图标相关
            visible: false,
            uploadList: [],
            defaultList: [],
            uploadModal: true,
            uploadData: { json: '{"urlCode":"' + code.urlCode.doctorGroup + '"}' },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: ""
        }
    },
    created (){
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/docrorGroup",
                title: "医疗小组"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted (){
        this.uploadList = this.$refs.upload.fileList;
        this.loadDoctorPage(1);
    },
    methods:{
        changeProvince(val) {
            this.province = val;
        },
        changeCity(val) {
            this.city = val;
        },
        changeArea(val) {
            this.area = val;
        },
        changeHospital(val) {
            this.hospital = val;
        },
        // 院内科室
        handleSearch1 (val) {
            this.departmentList = []
            if(!Boolean(this.hospital)) {
                this.$Message.error("请先选择医院后再查询科室");
                return ""
            }
            if(Boolean(val)){
                let params = {
                    hospitalId: this.hospital,
                    pageNo:1,
                    pageSize: 10,
                    searchKey:val.trim()
                };
                this.$axios
                    .post(api.medicine, params)
                    .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        this.departmentList = ret.list
                        console.log(ret);
                        }
                }).catch(err => {
                    console.log(err);
                });
            }
            
        },
        handleSelect1 (val) {
            this.departmentList.forEach(item => {
                if(val == item.childDept) {
                    this.info.depantment = item.childType
                }
            })
        },
        // '查询医生列表
        search () {
            if(!Boolean(this.searchKey)) {
                this.$Message.error("请输入医生姓名查询医生")
                return ""
            }
            this.loadDoctorPage(this.pageNo);
        },
        // 医生列表分页器
        pageChange (index) {
            this.loadDoctorPage(index);
        },
        disabledRole(){
            return this.addMemberDate.some(item =>{
                return parseInt(item.role) == 1
            })
        },
        // 提交 保存
        save (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 医院id
                    if(!Boolean(this.hospital)) {
                        this.$Message.error("请选择医院后再操作")
                        return ""
                    }
                    // 小组成员非空
                    if(!Boolean(this.addMemberDate.length)) {
                        this.$Message.error("请添加小组成员");
                        return ""
                    }
                    // 有且只能有一个队长
                    let team = this.addMemberDate.some(item =>{
                        return parseInt(item.role) == 1
                    })
                    if(!team) {
                        this.$Message.error("请检查团队内是否有队长或存在多个队长")
                        return ""
                    }
                    // 成员角色必须分配
                    let teams = this.addMemberDate.every(item =>{
                        return Boolean(item.role)
                    })
                    if(!teams) {
                        this.$Message.error("请选择团队的成员的角色")
                        return ""
                    }
                    // 成员列表
                    let detailList = []
                    this.addMemberDate.forEach(item =>{
                        detailList.push({
                            doctorId:item.doctorId,
                            role:item.role
                        })
                    })
                    let params = {
                        "hospitalId":this.hospital,
                        "teamType":this.formValidate.medicalType,
                        "teamName":this.formValidate.name,
                        "teamDept":this.info.depantment,
                        "teamPhone":this.formValidate.phone,
                        "teamIcon":this.images,
                        "teamControlLimit":this.formValidate.teamControlLimi,
                        "priority":this.formValidate.sort,
                        "teamRemark":this.formValidate.remarks,
                        "status":"1",
                        "detailList":detailList
                    }
                    console.log(params);
                    this.$axios.post(api.teaminsert,params).then(res => {
                        if(res.data.success) {
                            this.$Message.success("添加成功")
                            setTimeout(()=>{
                                let query = this.$route.query
                                this.functionJS.queryNavgationTo(
                                    this,
                                    "/index/operation/doctorGroup",
                                    {
                                        pageNo:query.pageNo ? parseInt(query.pageNo): 1,
                                        province: query.province ? parseInt(query.province): "",
                                        city: query.city ? parseInt(query.city): "", 
                                        area: query.area ? parseInt(query.area): "",
                                        hospital: query.hospital ? parseInt(query.hospital): "",
                                        isBack: 2
                                    }
                                );
                            },800)
                        }
                    })
                } else {
                    this.$Message.error('请完整填写必款项!');
                }
            })
        },
        // 返回上一页
        reback () {
            let query =this.$route.query
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/doctorGroup",
                {
                    pageNo:query.pageNo ? parseInt(query.pageNo): 1,
                    province: query.province ? parseInt(query.province): "",
                    city: query.city ? parseInt(query.city): "", 
                    area: query.area ? parseInt(query.area): "",
                    hospital: query.hospital ? parseInt(query.hospital): "",
                    isBack: 2
                }
            );
        },
        // 查询医生列表
        loadDoctorPage(pageNo) {
            this.memberDate = []
            this.pageNo = pageNo;
            var params = {};
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.searchKey = this.searchKey.trim();
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            // console.log("params",params)
            this.$axios
                .post(api.doctorList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        resp.data.object.list.forEach((item,index) => {
                            item.sum = this.addZeros(index)
                            let flag = this.addMemberDate.some(items =>{
                                return parseInt(item.doctorId) == items.doctorId
                            })
                            if (!flag) {
                                this.memberDate.push(item)
                            }
                        })
                        if(!Boolean(this.memberDate.length)) {
                            this.$Message.error("未查询到该医生或已经添加到小组内")
                        }
                        console.log('this.memberDate: ', resp.data.object);
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 上传图相关事件
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            console.log(res);
            res = this.uploadFileDecrypt(res);
            file.url = this.fileBaseUrl + res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            file.name = res.object[0].fileName;
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "格式错误",
                desc: "文件 " + file.name + " 上传失败,请重试"
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
    }
}
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
    .add{
        margin-left: 1%;
        padding: 10px;
        width: 98%;
        background: #ffffff;
        box-sizing: border-box;
        .main{
            margin-top:10px;
            .footerList{
                width:100%;
                display:flex;
                flex-direction:row;
                margin-top:20px;
                justify-content: space-between;
                .left,.right{
                    display:flex;
                    flex-direction:column;
                    width:48%;
                    p{
                        text-align:center;
                    }
                }
            }
        }
    }
</style>
