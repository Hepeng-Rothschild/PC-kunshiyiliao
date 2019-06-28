<template>
    <div class="clinicPayment">
        <!-- clinicPayment -->
        <header>
            <Row>
                <Col span="8">
                    <span>开始时间</span>
                    <DatePicker type="date" v-model="getParams.startDate" style='width:120px;'></DatePicker>
                    <TimePicker type="time" v-model="getParams.startTime" format='HH:mm' style='width:120px;'></TimePicker>
                </Col>
                <Col span="8">
                    <span>结束时间</span>
                    <DatePicker type="date" v-model="getParams.endDate" style='width:120px;'></DatePicker>
                    <TimePicker type="time" v-model="getParams.endTime" format='HH:mm' style='width:120px;'></TimePicker>
                </Col>
                <Col span='5'>
                    <Input v-model.trim="getParams.searchKey" placeholder = "输入流水号/发票号/姓名" />
                </Col>
                <Col span='8' style='padding-top:10px;'>
                    <Checkbox v-model="getParams.single">只显示异常</Checkbox >
                    <Button type='primary' @click='loadingCardRechargeList(1)'>查询</Button>
                    <Button type='success' @click='cliniction(1)'>自动对账</Button>
                </Col>
            </Row>
        </header>
        <Table stripe :row-class-name="rowClassName" :columns="columns1" :data="data1" style='margin:10px 0;'></Table>
        <Page
            :total="count"
            :current="pageNo"
            :pageSize="pageSize"
            style="margin-top:10px;text-align:center;"
            @on-change='pageChange'
        />
        <Modal v-model="clinicStatus" footer-hide width='800' :mask-closable="false" :closable="false">
            <!-- 自动对账 -->
            <div v-show='buttonStatus == 1' style='padding:30px 10px;'>
                <h1 style='text-align:center;'>自动对账提示</h1>
                <p style='font-size:16px;margin:10px 0;text-align:center;'>自动对账将下载医院HIS数据，自动完成对账，异常数据可手动调整处理。</p>
                <!-- 进度条 -->
                <Progress :percent="progressStart" status="active" style='margin:10px 0;' v-show='autoLoad' >
                </Progress>
                <div style='width:400px;margin:0 auto;text-align:center;'>
                    <Button type='primary' @click='ok' :loading="autoLoad">确定对账</Button>
                    <Button @click='cancelPayment'>取消对账</Button>
                    <Button @click='cancel'>返回</Button>
                </div>
            </div>
            <!-- 手动对账 -->
            <div v-show='buttonStatus == 2' style='padding:30px 10px;'>
                <h1 style='text-align:center;margin-bottom:10px;'>手动调整</h1>
                <div>
                    <span>交易流水号：</span>
                    <Input v-model.trim="manualParams.modalSearchKey" placeholder="请输入交易流水号查询" style="width: 200px" />
                    <Button type='primary' @click='searchSerialNumber'>查询</Button>
                </div>
                <div style='margin:20px 0;display:flex;
                flex-direction:row;justify-content:space-around;'>
                    <Card style='width:200px;'>
                        <p slot="title" style='text-align:center;'>支付平台状态：</p>
                        <p style='text-align:center;'>{{manualParams.PlatformStatus}}</p>
                    </Card>
                    <Card style='width:200px;margin:0 10px;'>
                        <p slot="title" style='text-align:center;'>互联网平台状态：</p>
                        <Select v-model="manualParams.interPlatformStatus" style="width:130px" >
                            <Option
                                v-for="(item,index) in stautParams"
                                :value="index"
                                :key="index"
                                style='text-align:center'
                            >{{ item }}</Option>
                        </Select>
                    </Card>
                    <!-- <Card style='width:200px;'>
                        <p slot="title" style='text-align:center;'>医院HIS交易状态：</p>
                        <Select v-model="manualParams.hisPlatformStatus" style="width:130px" >
                            <Option
                                v-for="(item,index) in stautParams"
                                :value="index"
                                :key="index"
                                style='text-align:center'
                            >{{ item }}</Option>
                        </Select>
                    </Card> -->
                </div>
                <div style='width:400px;margin:0 auto;text-align:center;'>
                    <!-- <Button type='primary' @click='changePlatform'>更改平台状态</Button> -->
                    <Button type='primary' @click='changeHisStatus'>更改医院HIS状态</Button>
                    <Button @click='cancel'>取消</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { DatePicker, TimePicker, Card, Progress } from 'iview'
// 诊间交费
export default {
    components: {
        DatePicker,
        TimePicker,
        Card,
        Progress
    },
    data () {
        return {
            // 头部参数
            getParams: {
                // 开始时间
                startDate: '',
                startTime: "00:00",
                // 结束时间
                endDate: "",
                endTime: "",
                // 查询条件
                searchKey:"",
                // 异常
                single : false,
            },
            // 列表数据
            columns1: [
                {
                    key: "isum",
                    title: "序号",
                    align: "center",
                    width:60
                },
                {
                    key: "serialNumber",
                    title: "流水号",
                    align: "center",
                    width: 230
                },
                {
                    key: "pay_numberv",
                    title: "支付流水号",
                    align: "center",
                    width: 100
                },
                {
                    key: "memberName",
                    title: "姓名",
                    align: "center",
                    width:100
                },
                {
                    key: "createTime",
                    title: "平台交易时间",
                    align: "center",
                    width:180
                },
                {
                    key: "checkingStatus",
                    title: "对账状态",
                    align: "center",
                    width:100,
                    render:(h, params) => {
                        let checked = params.row;
                        let arr = ['未对账','已对账','对账中']
                        // let name = checked.checkingStatus == 1 ? '已对账' : "未对账";
                        let name = arr[checked.checkingStatus]
                        return [
                            h("span", name)
                        ]
                    }
                },
                // {
                //     key: "platformHisStatus",
                //     title: "支付平台与His对账状态",
                //     align: "center",
                //     width: 150,
                //     render:(h, params) => {
                //         let checked = params.row;
                //         let name = this.stautParams[checked.platformHisStatus]
                //         return [
                //             h("span", name)
                //         ]
                //     }
                // },
                {
                    key: "thirdAmount",
                    title: "支付金额",
                    align: "center",
                    width: 100
                },
                {
                    key: "platformThridStatus",
                    title: "支付平台与第三方对账状态",
                    align: "center",
                    width: 150,
                    render:(h, params) => {
                        let checked = params.row;
                        let name = this.stautParams[checked.platformThridStatus]
                        return [
                            h("span", name)
                        ]
                    }

                },
                {
                    key: "payAmount",
                    title: "互联网金额",
                    align: "center",
                    width:120
                },
                // {
                //     key: "hisStatus",
                //     title: "His状态",
                //     align: "center",
                //     width:100
                // },
                // {
                //     key: "hisAmount",
                //     title: "His金额",
                //     align: "center",
                //     width:100
                // },
                {
                    key: "operateorName",
                    title: "操作人员",
                    align: "center",
                    width:100
                },
                {
                    title: "操作",
                    align: "center",
                    width: 80,
                    fixed:"right",
                    render:(h,params) =>{
                        let row = params.row;
                        return [
                            h("a",{
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        // function全局方法
                                        this.cliniction(2,row)
                                    }
                                }
                            }, '操作')
                        ]
                    }
                }
            ],
            data1: [],
            // 分页数据
            count: 20,
            pageNo: 1,
            pageSize: 20,
            // 弹窗状态
            clinicStatus: false,

            // 点击来源
            buttonStatus: 1,
            orderStatusList: [
                {
                    name: "支付成功",
                    id:'1'
                },
                {
                    name: "未支付",
                    id:'2'
                },
                {
                    name: "支付失败",
                    id:'3'
                },
                {
                    name: "支付取消",
                    id:'4'
                },
                {
                    name: "已退费",
                    id:'5'
                },
            ],
            // 订单对账状态
            manualParams: {
                // 平台状态
                PlatformStatus: '已支付',
                // 互联网平台状态
                interPlatformStatus: "",
                // HIS状态
                hisPlatformStatus: "",
                // 弹窗查询流水号
                modalSearchKey:"",
                // id
                transId:""
            },
            stautParams: ['未对账','对账成功','未获取到数据','金额不符','状态不符'],
            // // 自动对账状态
            autoLoad:false,
            // 进度条
            progressStart: 0,
            uuid :'',

        }
    },
    created () {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/clinicPayment",
                title: "互联网医院"
            },
            {
                path: "/index/operation/clinicPayment",
                title: "诊间缴费对账"
            }
        ];
        this.getParams.startDate = this.GetDate(0);
        this.getParams.endDate = this.GetDate(0);
        let date = new Date();
        this.getParams.endTime = date.getHours() + ':' + date.getMinutes()
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        this.loadingCardRechargeList(this.pageNo)
    },
    methods: {
        // 分页器改变
        pageChange(index){
            this.pageNo = index;
            this.loadingCardRechargeList(index)
        },
        // 自动对账确定按钮
        ok () {
            this.autoLoad = true
            this.autorecon();
        },
        // 自动对账
        autorecon() {
            let url = api.clinicandpaycost
            let params = {}
            this.$axios.post(url, params).then(res => {
                if (res.data.code == 1) {
                    let ret = res.data.object;
                    this.uuid = ret.key
                    this.progressbord()
                    console.log('自动对账',res);
                } else if (res.data.code == 2) {
                   this.$Message.info("正在对账,请勿重复对账!")
                } else {
                    this.$Message.error("对账失败")
                }
            })
        },
        // 请求进度条
        progressbord() {
            let url = api.speedofprogress;
            let params = {
                uuid: this.uuid
            }
            this.$axios.post(url, params).then(res => {
                if(res.data.success) {
                    let ret = res.data.object;
                    console.log("进度条", ret);
                    let err = Boolean(ret.ERROR_COUNT) ? Number(ret.ERROR_COUNT) : 0
                    let start = Number(ret.EXECUTE_START)
                    let count = Boolean(ret.EXECUTE_COUNT) ? Number(ret.EXECUTE_COUNT) : 0
                    let currentTotal = err + count
                    console.log('currentTotal: ', currentTotal);
                    
                    // 进度条参数
                    let progressEnd = Number(ret.TOTAL_COUNT) || 0
                    console.log('progressEnd: ', progressEnd);
                    let progressStart = parseInt((currentTotal * 100) / progressEnd);
                    console.log('progressStart: ', progressStart);

                    this.progressStart = progressStart
                    if(start != 1) {
                        return ""
                    }
                    // 当已对账数量+异常数据 = 总数的时候停止递归然后调用取消对账接口
                    if(currentTotal == ret.TOTAL_COUNT) {
                        this.$axios.post(api.deleteredis, {
                            uuid: this.uuid
                        }).then(res => {
                            if (res.data.success) {
                                this.clinicStatus = false;
                                this.autoLoad = false;
                                this.progressStart = 100
                                this.loadingCardRechargeList(this.pageNo);
                                this.$Message.success("对账成功")
                            }
                        })
                        return ""
                        // 不等于总数时继续递归调用进度条接口
                    } else if(currentTotal != ret.TOTAL_COUNT) {
                        console.log("继续对账");
                        if (this.autoLoad) {
                            this.progressbord();
                        }
                    }
                }
            })
        },
        // 点击弹窗取消,初始化弹窗里的值
        cancel () {
            this.clinicStatus = false
            //支付状态
            this.manualParams.PlatformStatus = ''
            this.manualParams.interPlatformStatus = ''
            this.manualParams.hisPlatformStatus = ''
            this.manualParams.modalSearchKey = ''
        },
        // 取消对账
        cancelPayment() {
            if(!this.uuid) {
                this.clinicStatus = false;
                return ""
            }
            this.$axios.post(api.deleteredis, {
                uuid: this.uuid
            }).then(res => {
                if (res.data.success) {
                    this.$Message.success ("取消对账成功");
                    this.clinicStatus = false
                    this.autoLoad = false
                }
            })
        },
        // 对账功能逻辑
        cliniction (status, row) {
            this.buttonStatus = status
            this.clinicStatus = true
            if(status == 2) {
                console.log('row', row);
                this.manualParams.PlatformStatus = row.checkingStatus == 1 ? '已对账' : "未对账";
                // 互联网平台状态
                this.manualParams.interPlatformStatus = row.platformThridStatus
                // HIS状态
                this.manualParams.hisPlatformStatus = row.platformHisStatus
                // id
                this.manualParams.transId = row.transId
                console.log(this.manualParams);
            }
        },
        //更改平台状态
        changePlatform () {
            console.log('更改平台状态');
            let url = api.updatestatus
            let params = {}
            return ""
            this.$axios.post(url, params).then(res => {
                if (res.data.success) {
                    // this.$Message.info('由于对账信息较多,请等待5-10分钟重新查看!');
                } else {
                    this.$Message.error("更改平台状态失败")
                }
                this.clinicStatus = false
            })
        },
        // 查询账单流水号
        searchSerialNumber () {
            let url = api.querybyserialnumber;
            let params = {
                serialNumber: this.manualParams.modalSearchKey
            }
            console.log(params);
            return ""
            this.$axios.post(url,params).then(res => {
                if(res.data.success) {
                    let ret = res.data;
                    console.log(ret);
                }
            })
        },
        //更改His平台状态
        changeHisStatus () {
            console.log('更改His平台状态');
            let url = ''
            let params = {}
            return ""
            this.$axios.post(url, params).then(res => {
                if (res.data.success) {
                    
                } else {
                    this.$Message.error("更改His平台状态失败")
                }
                this.clinicStatus = false
            })
        },
        // 加载页面列表数据
        loadingCardRechargeList (pageNo) {
            /*
                加载页面列表对账信息
            */
           this.pageNo = pageNo
            let url = api.clinicandpaycostpage
            let params = {
                pageNo: pageNo,
                pageSize: this.pageSize,
                startTime: this.getData(this.getParams.startDate) + ' ' + this.getParams.startTime,
                endTime: this.getData(this.getParams.endDate) + ' ' + this.getParams.endTime,
                hisStatus: Number(this.getParams.single)
            }
            if (Boolean(this.getParams.searchKey)) {
                params.searchKey = this.getParams.searchKey.trim();
            }
            console.log('诊间交费参数', params);
            this.$axios.post(url,params).then(ress => {
                if(ress.data.success) {
                    let ret = ress.data.object;
                    this.count = ret.count
                    console.log(ret);
                    ret.list.forEach((item, index) => {
                        item.isum = this.addZeros(index)
                    })
                    this.data1 = ret.list
                } else {
                    this.$Message.info("请确认当前账号是否绑定机构")
                }
            })
        },
        // 显示异常数据
        rowClassName (row, index) {
            if (row.checkingStatus != 1) {
                return 'demo-error-row';
            } 
            return '';
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
        }
    }
};
</script>

<style lang="less" scoped>
.clinicPayment {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>
<style>
    .ivu-table .demo-error-row td{
        /* background-color: red; */
        color: red;
    }
    .ivu-table .demo-error-row td a{
        color:red
    }
</style>
