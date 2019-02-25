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
                            :value="index+1"
                            :key="index"
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
                </div>
                <div class="margin-up-down">
                    <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人"/>
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
                </div>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="orderList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
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
            statusList: ["退诊", "取消", "履约", "爽约"],

            columns: [
                { title: "编号", key: "iNum", align: "center", width: 60 },
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
                                statusText = "即将就诊";
                                break;
                            case 1:
                                statusText = "退诊";
                                break;
                            case 2:
                                statusText = "取消";
                                break;
                            case 3:
                                statusText = "履约";
                                break;
                            case 4:
                                statusText = "爽约";
                                break;
                            case 5:
                                statusText = "待付款";
                                break;
                            default:
                                statusText = "履约";
                        }
                        return h("span", {}, statusText);
                    }
                }
            ],
            orderList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1
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
        this.startDate = this.GetDate(-2);
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
            params.status = this.status ? this.status : "";
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;

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
        },
        blurInput(e) {
            e.target.blur();
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