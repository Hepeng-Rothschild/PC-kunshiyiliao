<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
                <div class="second">
                    <span>状态:</span>
                    <Select class="w-select" v-model="status">
                        <Option value="999">全部</Option>
                        <Option
                            v-for="(item,index) in statusList"
                            :value="index+1"
                            :key="index"
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="third">
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
                </div>
                <div class="first">
                    <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人"/>
                    <Button type="primary" @click="loadPage(1)">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
                </div>
            </Col>
        </Row>
        <br>
        <Table class="m-table" stripe :columns="columns" :data="orderList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import { Select, Option, DatePicker } from "iview";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            searchKey: "",
            startDate: "",
            endDate: "",
            status: "999",
            statusList: [
                "待支付",
                "待确认",
                "待接诊",
                "已结束",
                "已取消",
                "已退费",
                "患者爽约",
                "申请医生爽约",
                "远程医生爽约"
            ],
            columns: [
                { title: "编号", key: "iNum", align: "center" },
                { title: "订单号", key: "orderNum", align: "center" },
                { title: "远程医院", key: "hospitalName", align: "center" },
                { title: "远程科室", key: "dept", align: "center" },
                { title: "远程医生", key: "doctorName", align: "center" },
                { title: "申请医生", key: "memberName", align: "center" },
                { title: "就诊人", key: "memberName", align: "center" },
                { title: "预约电话", key: "telephone", align: "center" },
                { title: "远程门诊费用", key: "cost", align: "center" },
                {
                    title: "状态",
                    key: "status",
                    align: "center",
                    render: (h, params) => {
                        let status = params.row.status;
                        return h("span", {}, this.statusList[status]);
                    }
                },
                { title: "预约时间", key: "appointmentTime", align: "center" },
                { title: "结束时间", key: "createTime", align: "center" },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 130,
                    render: (h, params) => {
                        let id = params.row.id;
                        return h(
                            "a",
                            {
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:
                                                "/index/operation/orders/remoteClinic/detail",
                                            query: {
                                                id,
                                                pageNo: this.pageNo
                                            }
                                        });
                                    }
                                }
                            },
                            "详情"
                        );
                    }
                }
            ],
            orderList: [
                {'iNum':1}
            ],
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    components: {
        Select,
        Option,
        DatePicker
    },
    created() {
        this.startDate = this.GetDate(-1);
        this.endDate = this.GetDate(0);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        pageNo = pageNo ? pageNo : 1;
        //上来就加载第一页数据
        // this.loadPage(pageNo);
    },
    methods: {
        changeStart(val) {
            this.startDate = val;
        },
        changeEnd(val) {
            this.endDate = val;
        },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.status = this.status == 9 ? "" : this.status;
            params.hospitalId = this.hospitalId == 0 ? null : this.hospitalId;

            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            startDate = startDate.toLocaleDateString().replace(/\//g, "-");
            endDate = endDate.toLocaleDateString().replace(/\//g, "-");
            params.startTime = startDate;
            // params.startTime = "2018-11-01";
            params.endTime = endDate;
            params.searchKey = this.searchKey ? this.searchKey : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.orderManageAppointRegistList, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpObj = resp.data.object.page;
                        let lvyue = resp.data.object.lvyue;
                        let shuangyue = resp.data.object.shuangyue;
                        this.lvyue = lvyue * 100 + "%";
                        this.shuangyue = shuangyue * 100 + "%";
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
                    } else {
                        this.$Message.info("网络错误，请刷新重试");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.doctorreviewlist {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .w-select {
        width: 100px;
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
        min-width: 320px;
        text-align: right;
    }
    .second {
        display: inline-block;
        min-width: 150px;
        text-align: left;
    }
    .third {
        display: inline-block;
        min-width: 460px;
        text-align: center;
    }
}
</style>