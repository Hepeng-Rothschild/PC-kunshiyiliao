<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
                <div class="first">
                    <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人"/>
                    <Button type="primary" @click="loadPage(1)">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
                </div>
                <div class="second">
                    <span>状态:</span>
                    <Select class="w-select" v-model="status">
                        <Option value="9">全部</Option>
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
            </Col>
        </Row>
        <br>
        <Row>
            <Col :xs="24">
                <span>医院</span>
                <Select class="w-select" @on-change="changeHospital" v-model="hospitalId">
                    <Option value="0">全部</Option>
                    <Option
                        v-for="(item,index) in hospitalList"
                        :value="item.id"
                        :key="index"
                    >{{item.orgName}}</Option>
                </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>履约率</span>
                <Input class="w-num-input" @on-focus="blurInput" v-model="lvyue"/>
                <span>爽约率</span>
                <Input class="w-num-input" @on-focus="blurInput" v-model="shuangyue"/>
            </Col>
        </Row>
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
            shuangyue: "", //爽约率
            lvyue: "", //履约率
            searchKey: "",
            status: "9",
            startDate: "",
            endDate: "",
            statusList: ["退诊", "取消", "履约", "爽约"],
            hospitalList: [],
            hospitalId: "0",
            columns: [
                { title: "编号", key: "iNum", align: "center" },
                { title: "订单号", key: "orderNum", align: "center" },
                { title: "医院", key: "hospitalName", align: "center" },
                { title: "科室", key: "dept", align: "center" },
                { title: "医生", key: "doctorName", align: "center" },
                { title: "就诊人", key: "memberName", align: "center" },
                { title: "预约电话", key: "telephone", align: "center" },
                { title: "挂号费", key: "cost", align: "center" },
                { title: "订单时间", key: "createTime", align: "center" },
                { title: "预约时间", key: "appointmentTime", align: "center" },
                {
                    title: "状态",
                    key: "status",
                    align: "center",
                    render: (h, params) => {
                        let status = params.row.status;
                        let statusText;
                        console.log(status);
                        switch(status){
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
        //获取医院列表
        this.$axios
            .post(api.hospitalList)
            .then(resp => {
                this.hospitalList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
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
        changeHospital(val) {
            this.hospitalId = parseInt(val);
            this.loadPage(1);
        },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.status = this.status == 9 ? "" : this.status;
            params.hospitalId = this.hospitalId == 0 ? null : this.hospitalId;

            let startDate = new Date(this.startDate)
            let endDate = new Date(this.endDate)
            startDate = startDate.toLocaleDateString().replace(/\//g,"-");
            endDate = endDate.toLocaleDateString().replace(/\//g,"-");
            params.startTime = startDate;
            // params.startTime = "2018-11-01";
            params.endTime = endDate;
            params.searchKey = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.orderManageAppointRegistList, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpObj = resp.data.object.page;
                        let lvyue = resp.data.object.lvyue;
                        let shuangyue = resp.data.object.shuangyue;
                        this.lvyue = (lvyue*100)+'%';
                        this.shuangyue = (shuangyue*100)+'%';
                        this.count = tmpObj.count;
                        this.orderList = tmpObj.list;
                        for (let i = 0; i < this.orderList.length; i++) {
                          this.orderList[i].iNum = i+1;
                            this.orderList[i].dept =
                                this.orderList[i].parentDept +
                                "-" +
                                this.orderList[i].childDept;
                              this.orderList[i].cost = this.orderList[i].cost.toFixed(2);
                              this.orderList[i].appointmentTime = this.orderList[i].appointmentTime + '  ' + (this.orderList[i].day==1?'上午':'下午');
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
        min-width: 300px;
        text-align: left;
    }
    .second {
        display: inline-block;
        min-width: 200px;
        text-align: center;
    }
    .third {
        display: inline-block;
        min-width: 500px;
        text-align: center;
    }
}
</style>