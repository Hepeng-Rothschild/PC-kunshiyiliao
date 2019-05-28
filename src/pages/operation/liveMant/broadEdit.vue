<template>
    <div class="broadAdd">
        <div class="val">
            <h1 class="createdTitle">编辑直播</h1>
            <!-- 直播标题 -->
            <Form ref="params" :model="params" :rules="ruleValidate" :label-width="80">
                <!--  -->
                <h2>基本信息</h2>
                <FormItem label="直播标题" prop="title">
                    <Input v-model.trim="params.title" placeholder="请输入直播标题" style="width: 300px" maxlength='60'></Input>
                </FormItem>
                <!-- 开始时间 -->
                <div class="timers" style="display:flex;flex-direction:row;">
                    <FormItem label="直播时间" prop="startTime">
                        <DatePicker
                            type="date"
                            placeholder="选择年月日"
                            style="width: 200px"
                            v-model="params.startTime"
                            format='yyyy年MM月dd日'
                            @on-change ='pickerChange'
                        ></DatePicker>
                    </FormItem>
                    <FormItem prop="startTimers">
                        <TimePicker
                            type="time"
                            placeholder="选择时间"
                            style="width: 168px"
                            v-model="params.startTimers"
                            @on-change ='pickerChange'
                             :disabled-hours="startdisabledHours"
                            hide-disabled-options
                        ></TimePicker>
                    </FormItem>
                </div>
                <!-- 结束时间 -->
                <div class="timers" style="display:flex;flex-direction:row;">
                    <FormItem label="结束时间" prop="endTime">
                        <DatePicker
                            type="date"
                            placeholder="选择年月日"
                            style="width: 200px"
                            v-model="params.endTime"
                            format='yyyy-MM-dd'
                            @on-change ='pickerChange'
                        ></DatePicker>
                    </FormItem>
                    <FormItem prop="endTimers">
                        <TimePicker
                            type="time"
                            placeholder="选择时间"
                            style="width: 168px"
                            v-model="params.endTimers"
                            :disabled-hours="disabledHours"
                            hide-disabled-options
                        ></TimePicker>
                    </FormItem>
                </div>
                <!-- 直播医生 -->
                <div class="spacing" style='display:flex;flex-direction:row;align-items:center;'>
                    <span>
                        <span style="color:red;">*</span>直播医生
                    </span>
                    <span v-if='doctorName' style='font-size:16px;margin:0 10px;'>医生：{{doctorName}}&nbsp;&nbsp;</span>
                    <span v-if='doctorhospitaName' style='font-size:16px;margin:0 10px;'>医院：{{doctorhospitaName}}</span>
                    <Button type="primary" @click="modalStatusclick">添加医生</Button>
                    <!-- 模态框 -->
                    <Modal title="添加主播医生" width="1000" footer-hide v-model="modalStatus" :styles="{top: '0px'}">
                        <div>
                            <!-- 查询条件 -->
                            <Row>
                                <Col span="24">
                                <fourLevelLinkage
                                    @changeProvince="changeProvince"
                                    @changeCity="changeCity"
                                    @changeArea="changeArea"
                                    @changeHospital="changeHospital"
                                ></fourLevelLinkage>
                                    <Input
                                        v-model.trim="search"
                                        placeholder="搜索主播医生"
                                        style="width: 200px"
                                    />
                                    <Button type="primary" icon="ios-search" @click='doctorList'>查询</Button>
                                </Col>
                            </Row>
                            <!-- 显示列表 -->
                            <Row
                                type="flex"
                                justify="space-around"
                                class="code-row-bg"
                                style="margin-top:20px;"
                            >
                                <Col span="24">
                                    <Table stripe :columns="columns" :data="data1"></Table>
                                    <Page
                                        :total="count"
                                        size="small"
                                        :current="pageNo"
                                        :page-size="pageSize"
                                        @on-change="loading"
                                        style='margin-top:10px;text-align:center;'
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                </div>
                <h2>设置信息</h2>
                <!-- 直播封面 -->
                <div class="main_imgs">
                    <div class="main_title_info">
                        <span style="margin:0 10px;">
                            <span style="color:red;">&nbsp;</span>直播封面
                        </span>
                    </div>
                    <div class="input">
                        <div class="demo-upload-list" v-for="item in uploadList">
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
                            <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
                        </Modal>
                    </div>
                </div>
                <!-- 直播形式 -->
                <FormItem label="直播形式" prop="livexs">
                    <Select v-model="params.livexs" style="width:160px">
                        <Option
                            v-for="item in livexsList"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <!-- 直播类型 -->
                <FormItem label="直播类型" prop="liveType">
                    <Select v-model="params.liveType" style="width:160px">
                        <Option
                            v-for="item in liveTypeList"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <!-- 直播对象 -->
                <FormItem label="直播对象" prop="liveObj">
                    <Select v-model="params.liveObj" style="width:160px">
                        <Option
                            v-for="item in liveObjList"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <!-- 课堂类型 -->
                <FormItem label="课堂类型" prop="type">
                    <Select v-model="params.type" style="width:160px">
                        <Option
                            v-for="item in columnList"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <!-- 是否付费 -->
                <div class="spacing">
                    <span style="margin-right:10px;">直播类型</span>
                    <RadioGroup v-model="liveMoneyTypes" @on-change='radioChange'>
                        <Radio label="0">免费</Radio>
                        <Radio label="1">付费</Radio>
                    </RadioGroup>
                </div>
                <!-- 原始价格 -->
                <div class="spacing" v-show="liveMoneyTypes==1">
                    原始价格
                    <InputNumber
                        :max="9999"
                        :min="1"
                        v-model="params.oldPrice"
                        style="width:200px;"
                        @on-change='computedMaxPrice'
                    ></InputNumber>
                    <span>折后价格需要小于原始价格</span>
                </div>
                <!-- 折后价格 -->
                <div class="spacing" v-show="liveMoneyTypes==1">
                    折后价格
                    <InputNumber
                        :max="9999"
                        :min="1"
                        v-model="params.newPrice"
                        style="width:200px;"
                    ></InputNumber>
                    <span>请先输入原始价格再选择折后价格</span>
                </div>
                <!-- 推广力度 -->
                <div class="spacing">
                    推广力度
                    <InputNumber
                        :max="99999"
                        :min="1"
                        v-model="params.Intensity"
                        style="width:200px;"
                    ></InputNumber>
                </div>
                <h2>课堂介绍</h2>
                <!-- 讲堂介绍 -->
                <div class="vueeditor spacing">
                    <span style="display:inline-block;width:60px;">讲堂介绍</span>
                    <Input
                        v-model="params.content"
                        type="textarea"
                        placeholder="请简要描述本次直播课堂介绍"
                        :rows="4"
                    />
                </div>
            </Form>
            </div>
            <!-- 创建/取消 -->
            <Button type="primary" @click="handleSubmit('params')">提交</Button>
            <Button @click="back">取消</Button>
        </div>
    </div>
</template>
<script>
import { DatePicker, TimePicker } from "iview";
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import code from "@/configs/base.js";
export default {
    components: {
        DatePicker,
        TimePicker,
        fourLevelLinkage
    },
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            // 医生查询数据
            search: "",
            // 直播价格
            liveMoneyTypes: "0",
            params: {
                // 标题
                title: "",
                // 开始时间
                startTime: "",
                startTimers: "",
                // 结束时间
                endTime: "",
                endTimers: "",
                // 直播形式
                livexs:"",
                // 直播类型
                liveType:"",
                // 课堂类型
                type: "",
                // 直播对象
                liveObj:"",
                // 医生
                doctor: "",
                // 价格
                oldPrice: 0,
                newPrice: 0,
                // 力度
                Intensity: "",
                // 介绍
                content: "",
                id:""
            },
            ruleValidate: {
                // 登录账号
                title: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入直播标题",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择开始日期",
                        trigger: "change"
                    }
                ],
                startTimers: [
                    {
                        required: true,
                        type: "string",
                        message: "请选择开始时间",
                        trigger: "change"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择结束日期",
                        trigger: "change"
                    }
                ],
                endTimers: [
                    {
                        required: true,
                        type: "string",
                        message: "请选择结束时间",
                        trigger: "change"
                    }
                ],
                type: [
                    {
                        required: true,
                        message: "请选择课堂类型",
                        trigger: "change"
                    }
                ],
                liveType: [
                    {
                        required: true,
                        message: "请选择直播类型",
                        trigger: "change"
                    }
                ],
                liveObj: [
                    {
                        required: true,
                        message: "请选择直播对象",
                        trigger: "change"
                    }
                ],
                livexs: [
                    {
                        required: true,
                        message: "请选择直播形式",
                        trigger: "change"
                    }
                ]
            },
            columnList: [],
            // 医生弹出框
            modalStatus: false,
            // 添加医生列表数据
            data1: [],
            // 页码
            pageNo: 1,
            // 页数
            pageSize: 10,
            // 添加医生总数
            count:10,
            // 医生表头数据
            columns: [
                {
                    title: "序号",
                    key: "sum",
                    align: "center"
                },
                {
                    title: "姓名",
                    key: "doctorName",
                    align: "center"
                },
                {
                    title: "所在医院",
                    key: "hospitalName",
                    align: "center"
                },
                {
                    title: "科室",
                    key: "deptType",
                    align: "center"
                },
                {
                    title: "职称",
                    key: "title",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 60,
                    render: (h, params) => {
                        let row = params.row
                        let doctorId = row.doctorId
                        let hospitalId = row.hospitalId
                        let doctorName = row.doctorName
                        let doctorhospitaName = row.hospitalName
                        return h(
                            "a",
                            {
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        this.doctorhospitaid = hospitalId
                                        this.doctorId = doctorId
                                        this.doctorName = doctorName
                                        this.doctorhospitaName = doctorhospitaName
                                        this.modalStatus = false
                                    }
                                }
                            },
                            "添加"
                        );
                    }
                }
            ],
            doctorhospitaid:"",
            doctorId:"",
            doctorName:"",
            doctorhospitaName:"",

            defaultList: [],
            visible: false,
            uploadList: [],
            uploadModal: true,
            urlCode: '{"urlCode":"' + code.urlCode.liveStart + '"}',
            uploadData: { json: '{"urlCode":"' + code.urlCode.onDemand + '"}' },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: "",

            // 直播类型
            liveTypeList:[
                {
                    id:"0",
                    name:"医师讲堂"
                }
            ],
            // 直播形式
            livexsList:[
                {
                    id:"0",
                    name:"图文直播"
                },
                {
                    id:"1",
                    name:"视频直播"
                }
            ],
            // 直播对象
            liveObjList:[
                {
                    id:"0",
                    name:"患者"
                },
                {
                    id:"1",
                    name:"医生"
                }
            ],
            disabledHours:[],
            startdisabledHours:[],
            // 折后价格最大限制
            oldMoney:0,
            // options3: {
            //     disabledDate (date) {
            //         return date && date.valueOf() < Date.now() - 86400000;
            //     }
            // },
            // options4: {
            //     disabledDate (date) {
            //         return date && date.valueOf() < Date.now() - 86400000;
            //     }
            // },

        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
            },
            {
                path: "/index/operation/liveMant/broadAdd",
                title: "添加直播"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        // 加载课堂类型
        this.columnDate();
        // 加载直播详情
        this.getLiveData();
        // 禁用时间
        this.getCurrentTimeDisabled();
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
        changeHospital(val) {
            this.hospital = val;
        },
        // 当付费状态改变时清除原始价格与折后价格
        radioChange (val) {
            // 原始价格
            this.params.oldPrice = 0;
            // 折后价格
            this.params.newPrice = 0;
        },
        // 折后价格不得大于原始价格
        computedMaxPrice (val) {
            this.oldMoney = val
        },
        // 获取当前时间禁用选择当前时间以前的时间
        getCurrentTimeDisabled(){
            this.startdisabledHours = []
            this.disabledHours = []
            let currentTime = new Date();
            // 当前时间
            let hours = currentTime.getHours();
            // 当前日期
            let currentday = currentTime.getDate();
            for(let i=0;i < hours;i++) {
                this.startdisabledHours.push(i)
                this.disabledHours.push(i)
            }
        },
        // 结束时间与开始时间不能相同
        pickerChange (val){
            this.startdisabledHours = []
            this.disabledHours = []
            let currentTime = new Date();
            // 当前时间
            let hours = currentTime.getHours();
            // 当前日期
            let currentday = currentTime.getDate();

            let selectTime = new Date(this.params.startTime);
            let selectDay = selectTime.getDate();
            if(Number(currentday) == Number(selectDay)) {
                this.getCurrentTimeDisabled();
            } else {
                this.startdisabledHours = []
            }
            this.disabledHours = []
            let disTime = val.split(":")[0]
            if(this.getData(this.params.startTime) == this.getData(this.params.endTime)) {
                for(let i=0;i <= disTime;i++){
                    this.disabledHours.push(i)
                }
            }
            console.log(this.disabledHours);
        },
        // 创建
        handleSubmit(name) {
            if (!this.doctorId) {
                this.$Message.error("请选择主播医生")
                return ""
            }
            this.$refs[name].validate(valid => {
                if (valid) {
                    let params = {
                        id:this.params.id,
                        // 结束时间
                        aboutEndTime: this.getData(this.params.endTime) +' '+this.params.endTimers,
                        // 折后价格
                        discountPrice: this.params.newPrice,
                        // 医生ID
                        doctorId: this.doctorId,
                        doctorName:this.doctorName,
                        // 推广力度
                        fictitiousNum: this.params.Intensity,
                        //图片
                        headImg: this.images,
                        // 医院ID
                        hospitalId: this.doctorhospitaid,
                        // 是否付费
                        icharge: this.liveMoneyTypes,
                        // 介绍
                        introduce: this.params.content,
                        // 直播形式
                        liveForm: this.params.livexs,
                        // 开始时间
                        aboutStartTime:this.getData(this.params.startTime) +' '+this.params.startTimers,
                        // 直播类型
                        liveType: this.params.liveObj,
                        // 原始价格
                        originalPrice:this.params.oldPrice,
                        // 标题
                        title: this.params.title,
                        // 课堂类型
                        type: this.params.type,
                        playStatus:"3"
                    }
                    if (params.icharge == 0) {
                        params.discountPrice = 0;
                        params.originalPrice = 0;
                    }
                    
                    console.log("发送参数",params);
                    this.$axios.post(api.updatelive, params).then(res =>{
                        if (res.data.success) {
                            this.$Message.success("修改成功!")
                            setTimeout(()=>{
                                this.back();
                            },800)
                        } else {
                            this.$Message.error("修改失败!")
                        }
                    })
                    
                } else {
                    this.$Message.error("请完整填写必填项!");
                }
            });
        },
        // 模态框显示
        modalStatusclick() {
            this.modalStatus = true;
            this.doctorList()
        },
        // 查询医生列表
        doctorList(){
            this.$axios
                .post(api.doctorList, {
                    searchKey: this.search.trim(),
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                })
                .then(resp => {
                    if (resp.data.success) {
                        let ret = resp.data.object.list;
                        ret.forEach((item,index) =>{
                            item.sum = this.addZeros(index)
                        })
                        this.count = resp.data.object.count;
                        this.data1 = ret;
                    } else {
                        this.$Message.error("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 返回
        back() {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/liveMant/list",
                query
            );
        },
        // 加载栏目列表
        columnDate() {
            this.$axios.post(api.lecturecolumnlist).then(resp => {
                if (resp.data.success) {
                    let ret = resp.data.object;
                    ret.forEach(item => {
                        item.id = String(item.id)
                    })
                    this.columnList = ret;
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
        },
        // 页码改变
        loading(index) {
            this.pageNo = index;
            this.doctorList()
        },
        // 转换日期格式 
        getData(data){
            let datas = new Date(data)
            var curr_date = datas.getDate();
            var curr_month = datas.getMonth() + 1; 
            var curr_year = datas.getFullYear();
            function add(num){
                if(Number(num)<10) {
                    return '0' + num
                }
                return num
            }
            return curr_year + "-" + add(curr_month)+'-' + add(curr_date)
        },
        // 查询修改直播数据
        getLiveData () {
            let query = this.$route.query;
            this.$axios.post(api.livebyid, {
                id:query.id
            }).then(resp => {
                if(resp.data.success) {
                    let ret = resp.data.object;
                    console.log(ret);
                    // 标题
                    this.params.title = ret.title
                    this.params.id = ret.id;

                    let aboutEndTime = ret.aboutStartTime.split(" ");
                    let liveStartTime = ret.aboutEndTime.split(" ")
                        // 结束时间
                    this.params.endTime = liveStartTime[0];
                    this.params.endTimers = liveStartTime[1];
                        // 开始时间
                    this.params.startTime = aboutEndTime[0];
                    this.params.startTimers = aboutEndTime[1];
                        // 折后价格
                    this.params.newPrice = ret.discountPrice
                        // 医生ID
                    this.doctorId = ret.doctorId
                    this.doctorName = ret.doctorName
                        // 推广力度
                    this.params.Intensity = ret.fictitiousNum

                    // 医院名称
                    this.doctorhospitaName = ret.hospitalName
                    this.doctorhospitaid = ret.hospitalId
                        //图片
                    if (ret.headImg) {
                        this.images = ret.headImg;
                        this.uploadList.push({
                            name: "a42bdcc1178e62b4694c830f028db5c0",
                            percentage: 100,
                            status: "finished",
                            uid: 1544263544971,
                            url: this.fileBaseUrl + this.pictureFormat(ret.headImg)
                        });
                    }
                        // 医院ID
                    this.doctorhospitaid = ret.hospitalId
                        // 是否付费
                    this.liveMoneyTypes = String(ret.icharge)
                        // 介绍
                    this.params.content = ret.introduce
                        // 直播形式
                    this.params.livexs = String(ret.liveForm)
                        // 直播类型
                    this.params.liveType = String(ret.liveType)
                    // 直播对象
                    this.params.liveObj = String(ret.liveType)
                        // 课堂类型
                    this.params.type = String(ret.type)
                        // 原始价格
                    this.params.oldPrice = ret.originalPrice
                    
                }
            })
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
.broadAdd {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    font-size: 12px;
    .val {
        h1,h2{
            font-weight:bold;
        }
        .spacing {
            margin: 6px 10px;
        }
        .createdTitle {
            border-bottom: 1px solid #f2f2f2;
            margin-bottom: 20px;
        }
    }
    .main_imgs {
        display: flex;
        flex-direction: row;
        align-items: center;
        .main_title_info {
            min-width: 100px;
        }
    }
    .vueeditor {
        display: flex;
        flex-direction: row;
        align-items: center;
        div {
            min-width: 600px;
        }
    }
}
</style>
