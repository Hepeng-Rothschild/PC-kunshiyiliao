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
                    <Select class="w-select" clearable v-model="status" style='width:130px;'>
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
                </div>
                <div class="margin-up-down">
                    <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人"/>
                    <Button type="primary" @click="loadPage(1)">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
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

            searchKey: "",
            startDate: "",
            endDate: "",
            status: null,
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
                    width: 140
                },
                {
                    title: "远程医院",
                    key: "remoteHospitalName",
                    align: "center",
                    width: 140
                },
                {
                    title: "远程科室",
                    key: "remoteDepartmentName",
                    align: "center",
                    width: 100
                },
                {
                    title: "远程医生",
                    key: "remoteDoctorName",
                    align: "center",
                    width: 100
                },
                {
                    title: "申请医生",
                    key: "applyDoctorName",
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
                    width: 80,
                    fixed: 'right',
                    render: (h, params) => {
                        let id = params.row.remoteClinicId;
                        let startDate = new Date(this.startDate);
                        let endDate = new Date(this.endDate);
                        startDate = startDate
                            .toLocaleDateString()
                            .replace(/\//g, "-");
                        endDate = endDate
                            .toLocaleDateString()
                            .replace(/\//g, "-");
                        return h(
                            "a",
                            {
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        //   公用方法
                                        this.functionJS.queryNavgationTo(
                                            this,
                                            "/index/operation/orders/remoteClinic/detail",
                                            {
                                                id,
                                                pageNo: this.pageNo,
                                                searchKey: this.searchKey,
                                                startDate: startDate,
                                                endDate: endDate,
                                                status: this.status,
                                                province: this.province,
                                                city: this.city,
                                                area: this.area,
                                                hospital: this.hospital,
                                                isBack: 2
                                            }
                                        );
                                    }
                                }
                            },
                            "详情"
                        );
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
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.startDate = this.$route.query.startDate
            ? this.$route.query.startDate
            : this.GetDate(-2);
        this.endDate = this.$route.query.endDate
            ? this.$route.query.endDate
            : this.GetDate(0);
        this.status =
            this.$route.query.status == null
                ? null
                : parseInt(this.$route.query.status);
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
        //上来就加载第一页数据
        this.loadPage(pageNo);

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/ordersmanagement/index",
                title: "订单管理"
            },
            {
                path: "/index/operation/orders/remoteClinic/list",
                title: "远程门诊订单"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {},
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
            params.remoteType = this.status >= 0 ? this.status : null;
            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            startDate = startDate.toLocaleDateString().replace(/\//g, "-");
            endDate = endDate.toLocaleDateString().replace(/\//g, "-");
            params.remoteDateStrar = startDate;
            params.remoteDateEnd = endDate;
            params.searchKey = this.searchKey.trim() ? this.searchKey.trim() : null;
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;

            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log("远程门诊订单 params", params);
            this.$axios
                .post(api.ordermanagementlistbyremoteorder, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpObj = resp.data.object;
                        console.log(tmpObj)
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
    .margin-up-down {
        display: inline-block;
        margin: 10px 0;
    }
}
</style>