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
                    <Input v-model.trim="getParams.searchKey" placeholder = "输入流水号/发票号/姓名"  />
                </Col>
                <Col span='8' style='padding-top:10px;'>
                    <Checkbox v-model="getParams.single">只显示异常</Checkbox >
                    <Button type='primary' @click='search'>查询</Button>
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
        <Modal v-model="clinicStatus" footer-hide width='800'>
            <!-- 自动对账 -->
            <div v-show='buttonStatus == 1' style='padding:30px 10px;'>
                <h2 style='text-align:center;'>自动对账提示</h2>
                <p style='font-size:16px;margin:10px 0;text-align:center;'>自动对账将下载医院HIS数据，自动完成对账，异常数据可手动调整处理。</p>
                <div style='width:150px;margin:0 auto;'>
                    <Button type='primary' @click='ok'>确定</Button>
                    <Button @click='cancel'>取消</Button>
                </div>
            </div>
            <!-- 手动对账 -->
            <div v-show='buttonStatus == 2' style='padding:30px 10px;'>
                <h2 style='text-align:center;margin-bottom:10px;'>手动调整</h2>
                <div>
                    <span>交易流水号：</span>
                    <Input v-model.trim="modalSearchKey" placeholder="请输入交易流水号查询" style="width: 200px" />
                    <Button type='primary'>查询</Button>
                </div>
                <div style='margin:20px 0;display:flex;
                flex-direction:row;justify-content:space-around;'>
                    <Card style='width:200px;'>
                        <p slot="title" style='text-align:center;'>支付平台状态：</p>
                        <p style='text-align:center;'>已支付</p>
                    </Card>
                    <Card style='width:200px;margin:0 10px;'>
                        <p slot="title" style='text-align:center;'>互联网平台状态：</p>
                        <Select v-model="interPlatformStatus" style="width:130px" >
                            <Option
                                v-for="item in orderStatusList"
                                :value="item.id"
                                :key="item.id"
                                style='text-align:center'
                            >{{ item.name }}</Option>   
                        </Select>
                    </Card>
                    <Card style='width:200px;'>
                        <p slot="title" style='text-align:center;'>医院HIS交易状态：</p>
                        <Select v-model="hisPlatformStatus" style="width:130px" >
                            <Option
                                v-for="item in orderStatusList"
                                :value="item.id"
                                :key="item.id"
                                style='text-align:center'
                            >{{ item.name }}</Option>   
                        </Select>
                    </Card>
                </div>
                <div style='width:400px;margin:0 auto;'>
                    <Button type='primary'>更改平台状态</Button>
                    <Button type='primary'>更改医院HIS状态</Button>
                    <Button @click='cancel'>取消</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { DatePicker, TimePicker, Card } from 'iview'
// 诊间交费
export default {
    components: {
        DatePicker,
        TimePicker,
        Card
    },
    data () {
        return {
            getParams: {
                // 开始时间
                startDate: '',
                startTime: "",
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
                    key: "Name",
                    title: "序号",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "流水号",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "支付流水号",
                    align: "center",
                },
                {
                    key: "Name",
                    title: "姓名",
                    align: "center",
                },
                {
                    key: "Name",
                    title: "平台交易时间",
                    align: "center",
                },
                {
                    key: "Name",
                    title: "对账状态",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "支付平台",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "支付金额",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "互联网平台",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "互联网金额",
                    align: "center"
                },
                {
                    key: "Name",
                    title: "His状态",
                    align: "center",
                },
                {
                    key: "Name",
                    title: "His金额",
                    align: "center",
                },
                {
                    key: "Name",
                    title: "操作人员",
                    align: "center",
                },
                {
                    key: "Name",
                    title: "操作",
                    align: "center",
                    render:(h,params) =>{
                        return [
                            h("a",{
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        // function全局方法
                                        this.cliniction(2)
                                    }
                                }
                            }, '操作')
                        ]
                    }
                }
            ],
            data1: [{}],
            // 分页数据
            count: 10,
            pageNo: 1,
            pageSize: 10,
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
            // 平台状态
            PlatformStatus: '',
            // 互联网平台状态
            interPlatformStatus: "",
            // HIS状态
            hisPlatformStatus: "",
            // 弹窗查询流水号
            modalSearchKey:"",
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
    methods: {
        // 分页器改变
        pageChange(index){
            this.pageNo = index;
        },
        ok () {
            this.clinicStatus = false
        },
        cancel () {
            this.clinicStatus = false
        },
        // 查询数据
        search () {

        },
        // 对账功能逻辑
        cliniction (status) {
            this.buttonStatus = status
            this.clinicStatus = true
        },
        // 显示异常数据
        rowClassName (row, index) {
            if (index === 1) {
                return 'demo-error-row';
            } 
            return '';
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
