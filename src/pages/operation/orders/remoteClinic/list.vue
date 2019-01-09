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
                            :value="index"
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
            /* 0:待付款,1:待确认,2:待接诊,3:已结束4:已退款(医生拒绝)5:已取消(没有付款),6.患者爽约,7:申请医生爽约,8:远程医生爽约 */
            statusList: [
                "待支付",
                "待确认",
                "待接诊",
                "已结束",
                "已退费",
                "已取消",
                "患者爽约",
                "申请医生爽约",
                "远程医生爽约"
            ],
            columns: [
                { title: "编号", key: "iNum", align: "center", width: 60 },
                {
                    title: "订单号",
                    key: "orderNumber",
                    align: "center",
                    width: 130
                },
                {
                    title: "远程医院",
                    key: "remoteHospitalName",
                    align: "center"
                },
                {
                    title: "远程科室",
                    key: "remoteDepartmentName",
                    align: "center"
                },
                { title: "远程医生", key: "remoteDoctorName", align: "center" },
                {
                    title: "申请医生",
                    key: "applyDoctorName",
                    align: "center"
                },
                {
                    title: "就诊人",
                    key: "memberName",
                    align: "center"
                },
                {
                    title: "预约电话",
                    key: "telephone",
                    align: "center",
                    width: 120
                },
                {
                    title: "远程门诊费用",
                    key: "cost",
                    align: "center",
                    width: 80
                },
                {
                    title: "状态",
                    key: "remoteType",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        let status = params.row.remoteType;
                        return h("span", {}, this.statusList[status]);
                    }
                },
                {
                    title: "预约时间",
                    key: "remoteDate",
                    align: "center",
                    width: 100
                },
                {
                    title: "结束时间",
                    key: "suggestionTime",
                    align: "center",
                    width: 100
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 60,
                    render: (h, params) => {
                        let id = params.row.remoteClinicId;
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
            orderList: [{ iNum: 1 }],
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
        this.startDate = this.GetDate(-2);
        this.endDate = this.GetDate(0);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        pageNo = pageNo ? pageNo : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
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
            params.remoteType = this.status == 999 ? null : this.status;
            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            startDate = startDate.toLocaleDateString().replace(/\//g, "-");
            endDate = endDate.toLocaleDateString().replace(/\//g, "-");
            params.remoteDateStrar = startDate;
            params.remoteDateEnd = endDate;
            params.searchKey = this.searchKey ? this.searchKey : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.ordermanagementlistbyremoteorder, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpObj = resp.data.object;
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