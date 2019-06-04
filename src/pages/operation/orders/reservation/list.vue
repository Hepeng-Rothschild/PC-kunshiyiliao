<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
                <div class="margin-up-down">
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
                </div>
                <div class="margin-up-down">
                    <span>状态:</span>
                    <Select class="w-select" clearable v-model="status">
                        <Option
                            v-for="(item,index) in statusList"
                            :value="index"
                            :key="index"
                            style='text-align:center'
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>日期:</span>
                    <DatePicker
                        type="date"
                        :clearable="false"
                        @on-change="changeStart"
                        v-model="startDate"
                        placeholder="开始日期"
                        format="yyyy-MM-dd"
                        style="width: 200px"
                    ></DatePicker>
                    <span>至</span>
                    <DatePicker
                        type="date"
                        :clearable="false"
                        @on-change="changeEnd"
                        v-model="endDate"
                        placeholder="结束日期"
                        format="yyyy-MM-dd"
                        style="width: 200px"
                    ></DatePicker>
                    <Select class="w-select" v-model="selectTimeStatus" style='width:120px;'  placeholder="请选择查询方式">
                        <Option
                            v-for="(item,index) in timeList"
                            :value="index+1"
                            :key="index"
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人"/>
                    <Select v-model="deptmentValue" clearable style="width:155px" placeholder="请选择科室" >
                        <Option v-for="item in deptmentList" :value="item.dictName" :key="item.dictType" style='text-align:center'>{{ item.dictName }}</Option>
                    </Select>
                    <Button type="primary" @click="loadPage(1)">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
                </div>
                <div class="margin-up-down">
                    <br>
                </div>
                <div class="margin-up-down">
                    <span>履约率</span>
                    <Input class="w-num-input" @on-focus="blurInput" v-model="lvyue"/>
                    <span>爽约率</span>
                    <Input class="w-num-input" @on-focus="blurInput" v-model="shuangyue"/>
                    <!-- <Button>扫码报到</Button> -->
                    <Button @click='soureStatus(5)'>批量替诊</Button>
                    <Button @click='soureStatus(6)'>批量停诊</Button>
                    <Button @click='fileDownload'>导出所有数据</Button>
                </div>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="orderList" @on-selection-change="mySelectRow"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
        <Modal
            v-model="orderModalStatus"
            width="1000"
            :mask-closable="false"
            footer-hide>
            <!-- 预约报到信息确认 -->
            <div class = 'bookingofficeInfo'>
                <h1 style='text-align:center;font-weight:bold;'>{{ orderModalTitle }}</h1>
                <!-- 预约挂号基本信息 -->
                <div v-if='timeStatus < 5'>
                    <h2>预约码：{{orderParams.orderNumber}}</h2>
                    <h2>就诊人：{{orderParams.memberName}}</h2>
                    <h2>就诊科室：{{orderParams.department}}</h2>
                    <h2>就诊医生：{{orderParams.doctorName}}</h2>
                    <h2>就诊时间：{{orderParams.appointmentTime}}</h2>
                    <h2>医事服务费：{{orderParams.registrationFee}}</h2>
                    <h2>就诊卡号：{{orderParams.cardNumber}}</h2>
                </div>
                <!-- 预约挂号替诊变更 -->
                <div v-if='timeStatus == 2'>
                    <h2>选择替诊科室：
                        <Select class="w-select" @on-change='Selectdepartment' v-model="departmentVal" style='width:130px;'>
                            <Option
                                v-for="(item,index) in departmentList"
                                :value="item.dicId"
                                :key="index"
                                style='text-align:center;'
                            >{{ item.childDept }}</Option>
                        </Select>
                    </h2>
                    <h2 style='margin-top:10px;'>选择替诊医生：
                        <Select class="w-select" v-model="doctorVal" style='width:130px;'>
                            <Option
                                v-for="(item,index) in doctorList"
                                :value="item.doctor_id"
                                :key="index"
                                style='text-align:center;'
                            >{{item.doctor_name}}</Option>
                        </Select>
                    </h2>
                </div>
                <!-- 预约挂号停诊操作 -->
                <div v-if='timeStatus == 4'>
                    <h2>停诊原因：
                        <Select class="w-select" v-model="orderParams.closeReasonSelect" style='width:130px;margin:10px 0;'>
                            <Option
                                v-for="(item,index) in closeReason"
                                :value="index+1"
                                :key="index"
                                style='text-align:center;'
                            >{{item}}</Option>
                        </Select>
                        <Input v-model="orderParams.closeReasonInput" type="textarea" :autosize="{minRows: 2,maxRows: 5 }" placeholder="请输入其他原因" maxlength='70' v-show='orderParams.closeReasonSelect == 4'/>
                    </h2>
                </div>
                <!-- 预约扗号批量替诊 -->
                <div v-if='timeStatus == 5'>
                    <p>所选择以下预约挂号信息，统一调整替诊医生。</p>
                    <Table class="m-table" height="200" stripe :columns="columnsObj" :data="SelectList" ></Table>
                    <h2 style='margin-top:10px;'>选择替诊科室：
                        <Select class="w-select" @on-change='Selectdepartment' v-model="departmentVal" style='width:130px;'>
                            <Option
                                v-for="(item,index) in departmentList"
                                :value="item.id"
                                :key="index"
                                style='text-align:center;'
                            >{{item.childDept}}</Option>
                        </Select>
                    </h2>
                    <h2 style='margin-top:10px;'>选择替诊医生：
                        <Select class="w-select" v-model="doctorVal" style='width:130px;'>
                            <Option
                                v-for="(item,index) in doctorList"
                                :value="item.doctor_id"
                                :key="index"
                                style='text-align:center;'
                            >{{item.doctor_name}}</Option>
                        </Select>
                    </h2>
                </div>
                <!-- 预约扗号批量停诊 -->
                <div v-if='timeStatus == 6'>
                    <p>所选择以下预约挂号信息，统一停诊操作。</p>
                    <Table class="m-table" height="200" stripe :columns="columnsObj" :data="SelectList" ></Table>
                    <h2>停诊原因：
                        <Select class="w-select" v-model="orderParams.closeReasonSelect" style='width:130px;margin:10px 0;'>
                            <Option
                                v-for="(item,index) in closeReason"
                                :value="index+1"
                                :key="index"
                                style='text-align:center;'
                            >{{item}}</Option>
                        </Select>
                        <Input v-model="orderParams.closeReasonInput" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入其他原因" maxlength='70' v-show='orderParams.closeReasonSelect == 4'/>
                    </h2>
                    <!-- <h2>短信消息内容：
                        <span style='font-size:12px;font-weight:normal;'>尊敬的郝俊林您好，您预约的蚌埠第三人民医院医院，皮肤科科室，蒋琼大夫，由原因，预约挂号已经取消，给您带来不便请谅解！</span>
                    </h2> -->
                </div>
            </div>
            <div style='margin-top:10px;width:200px;margin:10px auto;'>
                <Button @click='closeOrder'>关闭</Button>
                <Button :type='ButtonStyle' @click='saveOrder'>{{ buttonName }}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { DatePicker } from "iview";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
export default { 
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,

            shuangyue: "", //爽约率
            lvyue: "", //履约率
            searchKey: "",
            status: "",
            startDate: "",
            endDate: "",
            // statusList: ["退诊", "取消", "履约", "爽约"],
            statusList: ["待付款", "即将就诊", "已取消", "已退款", '已完成', '未就诊', '已报到','已停诊'],
            // 替诊科室
            departmentVal: "",
            departmentList: [],
            hospitalId: "",
            // 替诊医生 
            doctorVal: "",
            doctorList: [],

            columns: [
                { title: "编号", key: "iNum", align: "center", width: 60 ,type: 'selection'},
                {
                    title: "订单号",
                    key: "orderNum",
                    align: "center",
                    width: 140
                },
                {
                    title: "医院",
                    key: "hospitalName",
                    align: "center",
                    width: 140
                },
                { title: "科室", key: "dept", align: "center", width: 120 },
                {
                    title: "医生",
                    key: "doctorName",
                    align: "center",
                    width: 100
                },
                {
                    title: "就诊人",
                    key: "memberName",
                    align: "center",
                    width: 100
                },
                {
                    title: "预约电话",
                    key: "telephone",
                    align: "center",
                    width: 120
                },
                { title: "挂号费", key: "cost", align: "center", width: 90 },
                {
                    title: "订单时间",
                    key: "createTime",
                    align: "center",
                    width: 150
                },
                {
                    title: "预约时间",
                    key: "appointmentTime",
                    align: "center",
                    width: 140
                },
                {
                    title: "状态",
                    key: "status",
                    align: "center",
                    width: 90,
                    render: (h, params) => {
                        let status = params.row.status;
                        let statusText;
                        switch (status) {
                            case 0:
                                // statusText = "即将就诊";
                                statusText = "待付款";
                                break;
                            case 1:
                                // statusText = "退诊";
                                statusText = "即将就诊";
                                break;
                            case 2:
                                statusText = "已取消";
                                // statusText = "完成";
                                break;
                            case 3:
                                // statusText = "履约";
                                 statusText = "已退款";
                                break;
                            case 4:
                                // statusText = "爽约";
                                 statusText = "已完成";
                                break;
                            case 5:
                                // statusText = "报到";
                                 statusText = "未就诊";
                                break;
                            case 6:
                                // statusText = "待付款";
                                statusText = "已报到";
                                break;
                            case 7:
                                // statusText = "待付款";
                                statusText = "已停诊";
                                break;
                            // default:
                            //     statusText = "履约";
                        }
                        return h("span", {}, statusText);
                    }
                },
                {
                    title:"操作",
                    width: 150,
                    align:'center',
                    fixed:"right",
                    render:(h,params) => {
                        let orderId = params.row.orderId;
                        let status = params.row.status;
                        this.hospitalId = params.row.hospitalId
                        let row = params.row
                        let name = ''
                        let style = {}
                        if(Number(status) == 6) {
                            name = '撤回'
                        } else if (Number(status == 1)) {
                            name = "报到"
                        } else {
                            style.color = 'gray'
                            name = "报到"
                        }
                        let stopStyle = {}
                        if(Number(status) == 1) {
                            stopStyle.color = 'red'
                        } else {
                            stopStyle.color = 'gray'
                        }
                        let content = [
                            h('a', {
                                style,
                                on: {
                                    click: () => {
                                        if(status == 1 || status == 6) {
                                            this.orderParams.status = status;
                                            this.soureStatus(1, orderId)
                                        }
                                    }
                                }
                            },name),
                            "|",
                            h('a',{
                                // 替诊\
                                style: stopStyle,
                                on: {
                                    click: () => {
                                        if(Number(status) == 1) {
                                            this.soureStatus(2, orderId)
                                            // 加载医院下科室
                                            this.Hospitaldepartment(this.hospitalId)
                                        }
                                    }
                                }
                            },"替诊"),
                            "|",
                            h('a', {
                                    style: stopStyle,
                                on: {
                                    click: () => {
                                        if(Number(status) == 1) {
                                            this.soureStatus(4,orderId)
                                        }
                                    }
                                }
                            },"停诊")
                        ]
                        return content
                    }
                }
            ],
            orderList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1,
            // 条件搜索查询科室
            deptmentValue:"",
            deptmentList:[],
            // 报到弹出层
            orderModalStatus:false,
            ButtonStyle:"primary",
            orderModalTitle:"",
            buttonName:"完成",
            // 报到数据
            orderParams: {
                orderId:"",
                closeReasonSelect:"",
                closeReasonInput:"",
                status:"",
                // 预约码
                orderNumber:"",
                // 就诊人
                memberName:"",
                // 就诊科室
                department:"",
                // 就诊医生
                doctorName:"",
                // 就诊时间
                appointmentTime:"",
                // 服务费
                registrationFee:"",
                // 就诊卡号
                cardNumber:"",

            },
            timeStatus: 4,
            selectTimeStatus:1,
            timeList: ['预约就诊日期','预约登记日期'],
            closeReason: ['医生临时手术','医生出差调整','医院工作调整','其他'],
            // 批量停诊/替诊的数据表头
            columnsObj:[
                { title: "订单号", key: "orderNum", align: "center", width: 140 },
                { title: "科室", key: "dept", align: "center", width: 120 },
                { title: "医生", key: "doctorName", align: "center", width: 100 },
                { title: "就诊人", key: "memberName", align: "center", width: 100 },
                { title: "预约电话", key: "telephone", align: "center", width: 140},
                { title: "预约时间", key: "appointmentTime", align: "center"},
            ],
            // 批量停诊/替诊的数据列表 
            SelectList:[]
            
        };
    },
    components: {
        DatePicker,
        fourLevelLinkage
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
        this.isBack = this.$route.query.isBack
            ? parseInt(this.$route.query.isBack)
            : 1;
        // this.startDate = this.GetDate(-2);
        this.startDate='2019-02-07'
        this.endDate = this.GetDate(0);
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/ordersmanagement/index",
                title: "订单管理"
            },
            {
                path: "/index/operation/orders/reservation/list",
                title: "预约挂号订单"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        pageNo = pageNo ? pageNo : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);

        this.loadingDepartment();
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
            this.loadingDepartment();
        },
        changeStart(val) {
            this.startDate = val;
        },
        changeEnd(val) {
            this.endDate = val;
        },
        // 选中的列表数据
        mySelectRow (selection) {
            // selection已选择的数据
            this.SelectList = selection;
            if(this.SelectList.length > 0) {
                this.hospitalId = this.SelectList[0].hospitalId
            } else {
                this.hospitalId = ""
            }
            console.log(this.SelectList);
        },
        // 根据不同的状态弹层显示不同的信息
        soureStatus(val,orderId){
            this.orderParams.orderId = orderId
            if(Number(val) < 5) {
                this.$axios.post(api.querybyorderid, {
                    orderId
                }).then(res =>{
                    if(res.data.success) {
                        let ret = res.data.object;
                        this.orderParams.orderNumber = ret.orderNumber
                        // 就诊人
                        this.orderParams.memberName = ret.memberName
                        // 就诊科室
                        this.orderParams.department = ret.department
                        // 就诊医生
                        this.orderParams.doctorName = ret.doctorName
                        // 就诊时间
                        this.orderParams.appointmentTime = ret.appointmentTime +''+ret.timeStart+'-'+ret.timeEnd
                        // 服务费
                        this.orderParams.registrationFee = ret.registrationFee
                        // 就诊卡号
                        this.orderParams.cardNumber = ret.cardNumber
                    }else {
                        this.$Message.error("加载失败")
                    }
                }).catch(err =>{
                    console.log(err);
                    // this.$Message.error("加载失败")
                })
            }
            this.timeStatus = val;
            if(Number(val) == 1) {
                // 根据不同的状态让按钮显示不同的文字
                if(Number(this.orderParams.status) == 5) {
                    this.buttonName = '确认撤回'
                    this.ButtonStyle = 'warning'
                } else if (Number(this.orderParams.status == 0)) {
                    this.buttonName = '确认报到'
                    this.ButtonStyle = 'primary'
                }
                this.orderModalTitle = '预约报到信息确认'
                
            } else if(Number(val) == 2) {
                this.orderModalTitle = '预约挂号替诊变更'
                this.buttonName = '确认替诊'
                this.ButtonStyle = 'primary'
            } else if(Number(val) == 4){
                this.orderModalTitle = '预约挂号停诊操作'
                this.buttonName = '确认停诊'
                this.ButtonStyle = 'error'
            } else if(Number(val) == 5) {
                this.orderModalTitle = '预约挂号批量替诊变更'
                this.buttonName = '确认替诊'
                this.ButtonStyle = 'primary'
                let flag = this.SelectList.some(item => {
                    return item.status == 1
                })
                
                if (this.SelectList.length <= 0) {
                    // 当未选中数据不显示弹层
                    this.$Message.error("请选择批量数据")
                    return ""
                }
                if(!flag) {
                    // 当未选中数据包含无法替诊的数据
                    this.$Message.error("选择中包含无法批量替诊的数据,请重新选择")
                    return ""
                }
                this.Hospitaldepartment(this.hospitalId)
            } else if (Number(val) == 6) {
                this.orderModalTitle = '预约挂号批量停诊操作'
                this.buttonName = '确认停诊'
                this.ButtonStyle = 'error'
                let flag = this.SelectList.some(item => {
                    return item.status == 1
                })
                
                if (this.SelectList.length <= 0) {
                    // 当未选中数据不显示弹层
                    this.$Message.error("请选择批量数据")
                    return ""
                }
                if(!flag) {
                    // 当未选中数据包含无法替诊的数据
                    this.$Message.error("选择中包含无法批量停诊的数据,请重新选择")
                    return ""
                }
            }
            this.orderModalStatus = true
        },
        // 关闭预约报到信息确认框
        closeOrder () {
            this.orderModalStatus = false;
            this.orderParams.closeReasonSelect = ''
            this.orderParams.closeReasonInput = ''
            this.orderParams.orderId =''
            this.orderParams.closeReasonSelect =''
            this.orderParams.closeReasonInput =''
            // status:"",
            this.orderParams.status =''
            // // 预约码
            this.orderParams.orderNumber =''
            // // 就诊人
            this.orderParams.memberName =''
            // // 就诊科室
            this.orderParams.department =''
            // // 就诊医生
            this.orderParams.doctorName =''
            // // 就诊时间
            this.orderParams.appointmentTime =''
            // // 服务费
            this.orderParams.registrationFee =''
            // // 就诊卡号
            this.orderParams.cardNumber =''
            // 停诊选择与输入内容
            this.orderParams.closeReasonSelect = ''
            this.orderParams.closeReasonInput = ''
            // 替诊科室/医生
            this.departmentVal = ''
            this.doctorVal = ''

        },
        // 根据不同的状态进行具体逻辑处理
        saveOrder () {
            var url = ''
            // 点击的哪个按钮
            let val = this.timeStatus
            let params = {}
            if(Number(val) == 1) {
                url = api.cordreport;
                params.orderId = this.orderParams.orderId
                if(Number(this.orderParams.status) == 6) {
                    params.status = '1'
                } else {
                    params.status = '0'
                }
            } else if(Number(val) == 2) {
                url = api.replacedoctor
                let date = {}
                params = []
                if(!Boolean(this.departmentVal)) {
                    this.$Message.error("请选择替诊科室")
                    return ""
                }
                if(!Boolean(this.doctorVal)) {
                    this.$Message.error("请选择替诊医生")
                    return ""
                }
                // 医生信息
                date.afterDoctorId = this.doctorVal
                for(let i = 0;i < this.doctorList.length;i++) {
                    if(Number(this.doctorList[i].doctor_id) == Number(this.doctorVal)) {
                        date.afterDoctorName = this.doctorList[i].doctor_name
                    }
                }
                // 科室ID
                date.departmentId = this.departmentVal;
                for(let i = 0;i < this.departmentList.length;i++) {
                    if(this.departmentList[i].dicId==this.departmentVal) {
                        date.afterDeptName = this.departmentList[i].childDept
                    }
                }
                date.orderId = this.orderParams.orderId
                // 替诊 => 2
                date.status = '2';
                params.push(date)
            } else if (Number(val) == 4) {
                // 停诊=>3
                url = api.closeappointment
                let date = {}
                params = []
                if(!Boolean(this.orderParams.closeReasonSelect)) {
                    this.$Message.error("请选择或输入退诊原因")
                    return ""
                }
                // 选择的停诊原因
                // orderParams.closeReasonSelect
                // 输入的停诊原因
                // orderParams.closeReasonInput
                date.orderId = this.orderParams.orderId
                date.status = '3';
                if(Number(this.orderParams.closeReasonSelect) == 4) {
                    if(!Boolean(this.orderParams.closeReasonInput)) {
                        this.$Message.error("请选择或输入退诊原因")
                        return ""
                    }
                    date.reason = this.orderParams.closeReasonInput
                } else {
                    date.reason = this.closeReason[this.orderParams.closeReasonSelect]
                }
                params.push(date)
            } else if (Number(val) == 5) {
                url = api.replacedoctor
                let date = {}
                params = []

                if(!Boolean(this.departmentVal)) {
                    this.$Message.error("请选择替诊科室")
                    return ""
                }
                if(!Boolean(this.doctorVal)) {
                    this.$Message.error("请选择替诊医生")
                    return ""
                }
                // 医生信息
                let afterDoctorId = this.doctorVal
                // 
                let afterDoctorName = ''
                for(let s = 0;s < this.doctorList.length;s++) {
                    if(Number(this.doctorList[s].doctor_id)==Number(this.doctorVal)) {
                        afterDoctorName = this.doctorList[s].doctor_name
                    }
                }
                // 科室信息
                let departmentId = this.departmentVal;
                let afterDeptName = ''
                for(let j = 0;j < this.departmentList.length;j++) {
                    if(this.departmentList[j].dicId == this.departmentVal) {
                        afterDeptName = this.departmentList[j].childDept
                    }
                }
                for(let i = 0;i < this.SelectList.length;i++) {
                    params.push({
                        status:"2",
                        afterDoctorId,
                        afterDoctorName,
                        departmentId,
                        afterDeptName,
                        orderId:this.SelectList[i].orderId
                    })
                }
                // 批量替诊=>2
                this.Hospitaldepartment(this.hospitalId)
            } else if (Number(val) == 6) {
                url = api.closeappointment
                params = []
                // 批量停诊 => 3
                let reason = ''
                if(!Boolean(this.orderParams.closeReasonSelect)) {
                    this.$Message.error("请选择或输入停诊原因")
                    return ""
                }
                if(Number(this.orderParams.closeReasonSelect) == 4) {
                    if(!Boolean(this.orderParams.closeReasonInput)) {
                        this.$Message.error("请选择或输入停诊原因")
                        return ""
                    }
                    reason = this.orderParams.closeReasonInput
                } else {
                    reason = this.closeReason[this.orderParams.closeReasonSelect]
                }
                for(let i=0;i<this.SelectList.length;i++) {
                    params.push({
                        status:"3",
                        reason,
                        orderId:this.SelectList[i].orderId
                    })
                }
            }
            console.log(params);
            this.$axios.post(url,params).then(res =>{
                if (res.data.success) {
                    this.$Message.success("修改成功")
                    this.loadPage(this.pageNo)
                } else {
                    this.$Message.error("修改失败!")
                }
                this.closeOrder();
            }).catch(err => {
                console.log(err);
            })
            
        },
        // 通过医院ID加载科室
        Hospitaldepartment(hospitalId){
            let params = {
                    hospitalId,
                    pageNo:1,
                    pageSize:100
                }
            this.$axios.post(api.kDepartment, params)
            .then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.departmentList = ret.list
                    console.log(ret);
                } else {
                    this.$Message.error('加载医院科室失败')
                }
            })
            .catch(err => {
                this.$Message.error('加载医院科室失败')
            });
        },
        // 通过科室加载科室下医生
        Selectdepartment () {
            let params = {
                departmentId:this.departmentVal,
                hospitalId:this.hospitalId,
            }
            this.packageAxios(this,api.hospitalidanddepartmentid,params,(res)=>{
                if (res.data.success) {
                    let ret = res.data.object;
                    this.doctorList = ret;
                } else {
                    this.$Message.error("加载医生数据失败!")
                }
            })
        },
        // 页面查询的科室选择框
        loadingDepartment(){
            let url = api.querydeptname
            let params = {
                hospitalId : this.hospital
            }
            this.packageAxios(this,url,params,(res)=>{
                console.log(res);
                if(res.data.success) {
                    let ret = res.data.object;
                    
                    this.deptmentList = ret;
                } else {
                    this.$Message.error("加载失败")
                }
            })
        },
        // 下载导出信息
        fileDownload () {
            let url = api.cordwriteexcel
            var params = {};
            params.status = this.status
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;

            params.deptName = this.deptmentValue
            //查询的时间区间
            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            startDate = startDate.toLocaleDateString().replace(/\//g, "-");
            endDate = endDate.toLocaleDateString().replace(/\//g, "-");
            
            if(Number(this.selectTimeStatus) ==1) {
                params.startTime = startDate;
                params.endTime = endDate;
            } else {
                params.appointmentStartTime = startDate
                params.appointmentEndTime = endDate
            }
            // 模糊查询
            params.searchKey = this.searchKey.trim() ? this.searchKey.trim() : null;
            params.pageNo = 1;
            params.pageSize = this.count;

            this.$axios.post(url, params, { responseType: "arraybuffer" }).then(res =>{
                if (res.data) {
                    let ret = res.data;
                    var blob = new Blob([ret],{ type:"application/vnd.ms-excel" });
                    let objUrl = URL.createObjectURL(blob);
                    window.location.href = objUrl;
                }
            })
        },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.status = this.status
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;

            params.deptName = this.deptmentValue

            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            startDate = startDate.toLocaleDateString().replace(/\//g, "-");
            endDate = endDate.toLocaleDateString().replace(/\//g, "-");
            params.startTime = startDate;
            // params.startTime = "2018-11-01";
            params.endTime = endDate;
            params.searchKey = this.searchKey.trim() ? this.searchKey.trim() : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;

            if(Number(this.selectTimeStatus) == 1) {
                params.startTime = startDate;
                params.endTime = endDate;
            } else {
                params.appointmentStartTime = startDate
                params.appointmentEndTime = endDate
            }
            console.log("预约挂号订单 params", params);
            this.$axios
                .post(api.orderManageAppointRegistList, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpObj = resp.data.object.page;
                        let lvyue = resp.data.object.lvyue;
                        let shuangyue = resp.data.object.shuangyue;
                        this.lvyue = parseInt(lvyue * 100) + "%";
                        this.shuangyue = parseInt(shuangyue * 100) + "%";
                        console.log(resp);
                        this.count = tmpObj.count;
                        this.orderList = tmpObj.list;
                        for (let i = 0; i < this.orderList.length; i++) {
                            this.orderList[i].iNum = i + 1;
                            this.orderList[i].dept =
                                this.orderList[i].parentDept +
                                "-" +
                                this.orderList[i].childDept;
                            this.orderList[i].cost = this.orderList[
                                i
                            ].cost.toFixed(2);
                            this.orderList[i].appointmentTime =
                                this.orderList[i].appointmentTime +
                                "  " +
                                (this.orderList[i].day == 1 ? "上午" : "下午");
                        }
                        console.log(this.orderList);
                    } else {
                        this.$Message.info("网络错误，请刷新重试");
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
.bookingofficeInfo{
    width:80%;
    height:auto;
    display:flex;
    margin:0 auto;
    flex-direction:column;
    h2{
        font-weight:bold;
    }
}
.doctorreviewlist {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .w-select {
        width: 100px;
    }
    .w-select-hos {
        width: 200px;
    }
    .w-input {
        width: 220px;
    }
    .w-num-input {
        width: 100px;
    }
    .m-table {
        margin: 10px 0;
    }
    .first {
        display: inline-block;
        min-width: 160px;
        text-align: left;
    }
    .second {
        display: inline-block;
        min-width: 500px;
        text-align: center;
    }
    .third {
        display: inline-block;
        min-width: 350px;
        text-align: center;
    }
    .fourth {
        display: inline-block;
    }
    .margin-up-down {
        display: inline-block;
        margin: 10px 0;
    }
}
</style>