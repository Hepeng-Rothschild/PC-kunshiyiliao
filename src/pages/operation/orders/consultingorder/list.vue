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
                    <span>类型:</span>
                    <Select class="w-select" clearable v-model="status" style='width:100px;'>
                        <Option
                            v-for="(item,index) in statusList"
                            :value="index"
                            :key="index"
                            style='text-align:center'
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>问诊类型:</span>
                    <Select class="w-select" clearable v-model="inquiryTypestatus" style='width:100px;'>
                        <Option
                            v-for="(item,index) in inquiryType"
                            :value="index"
                            :key="index"
                            style='text-align:center'
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>状态:</span>
                    <Select class="w-select" clearable v-model="zhuangtaistatus" style='width:100px;'>
                        <Option
                            v-for="(item,index) in zhuangtai"
                            :value="index"
                            :key="index"
                            style='text-align:center'
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>职称级别:</span>
                    <Select class="w-select" clearable v-model="dcotorTitle" style='width:100px;'>
                        <Option
                            v-for="item in titleList"
                            :value="item.dictType"
                            :key="item.dictType"
                            style='text-align:center'
                        >{{item.dictName}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>数据来源:</span>
                    <Select class="w-select" clearable v-model="appid" style='width:150px;'>
                        <Option
                            v-for="item in wxList"
                            :value="item.appid"
                            :key="item.appid"
                            style='text-align:center'
                        >{{item.nick}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>预约日期:</span>
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
                    <span>关键字:</span>
                    <Input class="w-input" v-model="searchKey" placeholder="订单号、医院、科室、医生、就诊人" style='width:290px;'/>
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
            inquiryTypestatus:null,//订单类型
            zhuangtaistatus:null,//问诊状态
            dcotorTitle:null,//医生职称
            titleList: "",
            wxList:'',
            appid:null,
            /* 0:咨询,1:问诊,2:复诊,3:续方,4:药品咨询 */
            statusList: [
                "咨询",
                "问诊",
                "复诊",
                "续方",
                "药品咨询",
            ],
            inquiryType: [ 
                "图文", 
                "语音",
                "视频",
            ],
            zhuangtai:[  
                "问诊中", 
                "已完成",
                "已退诊",
                "待接诊",
                "待付款",
                "已取消",
            ],
            columns: [
                { title: "编号", key: "iNum", align: "center", width: 60 },
                {
                    title: "订单时间",
                    key: "createTime",
                    align: "center",
                    width: 100
                },
                {
                    title: "机构名称",
                    key: "hospitalName",
                    align: "center",
                    width: 160
                },
                {
                    title: "科室名称",
                    key: "dept",
                    align: "center",
                    width: 120
                },
                {
                    title: "医生姓名",
                    key: "doctorName",
                    align: "center",
                    width: 100
                },
                {
                    title: "患者姓名",
                    key: "name",
                    align: "center",
                    width: 100
                },
                {
                    title: "联系电话",
                    key: "phonenumber",
                    align: "center",
                    width: 160,
                    render: (h, params) => {
                        if(params.row.phonenumber == null){
                            return h('div', {},'暂无')
                        }
                    }
                },
                {
                    title: "订单类型",
                    key: "serviceType",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let status = params.row.serviceType;
                        return h("span", {}, this.statusList[status]);
                    }
                },
                {
                    title: "问诊类型",
                    key: "inquiryType",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let status = params.row.inquiryType;
                        return h("span", {}, this.inquiryType[status]);
                    }
                },
                {
                    title: "状态",
                    key: "status",
                    align: "center",
                    // width: 80,
                    render: (h, params) => {
                        let status = params.row.status;
                        return h("span", {}, this.zhuangtai[status]);
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 80,
                    // fixed: 'right',
                    render: (h, params) => {
                        let id = params.row.serviceId;
                        let startDate = new Date(this.startDate);
                        let endDate = new Date(this.endDate);
                        startDate = startDate.toLocaleDateString().replace(/\//g, "-");
                        endDate = endDate.toLocaleDateString().replace(/\//g, "-");
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
                                            this,"/index/operation/orders/consultingorder/detail",
                                            {
                                                // id,
                                                pageNo: this.pageNo,
                                                searchKey: this.searchKey,
                                                startDate: startDate,
                                                endDate: endDate,
                                                status: this.status,
                                                province: this.province,
                                                city: this.city,
                                                area: this.area,
                                                hospital: this.hospital,
                                                isBack: 2,
                                                serviceId:id
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
        // this.getdcotorTitle()
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.startDate = this.$route.query.startDate
            ? this.$route.query.startDate
            : this.GetDate(-30);
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
                path: "/index/operation/orders/consultingorder/list",
                title: "咨询问诊订单"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.$axios.post(api.getTitle).then(resp => {
            this.titleList = resp.data.object;
        }).catch(err => {
            console.log(err);
        });
        this.$axios.post(api.wxList,{pageNo: 1,pageSize: 10}).then(resp => {
            this.wxList = resp.data.object.list;
        }).catch(err => {
            console.log(err);
        });
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
        // //获取机构和医生职称
        // getdcotorTitle(){
        //     this.$axios.post(api.operatefindDoctorListByDeptAndHos).then(resp => {
        //         if (resp.data.code == 1) {
        //             console.log('机构',resp)
        //         } else {
        //             this.$Message.info("网络错误，请刷新重试");
        //         }
        //     }).catch(err => {
        //         console.log(err);
        //     });
        // },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.serviceType = this.status >= 0 ? this.status : null;
            params.status = this.zhuangtaistatus;
            params.dcotorTitle = this.dcotorTitle;
            params.inquiryType = this.inquiryTypestatus;
            params.appid = this.appid;
            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            startDate = startDate.toLocaleDateString().replace(/\//g, "-");
            endDate = endDate.toLocaleDateString().replace(/\//g, "-");
            params.createTimeStart = startDate;
            params.createTimeEnd = endDate;
            params.searchKey = this.searchKey.trim() ? this.searchKey.trim() : null;
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log("咨询问诊params", params);
            this.$axios.post(api.operateinqfindPageByOperate, params).then(resp => {
                if (resp.data.success) {
                    let tmpObj = resp.data.object;
                    console.log('咨询问诊列表',tmpObj)
                    this.count = tmpObj.count;
                    this.orderList = tmpObj.list;
                    for (let i = 0; i < this.orderList.length; i++) {
                        this.orderList[i].iNum = i + 1;
                    }
                } else {
                    this.$Message.info("网络错误，请刷新重试");
                }
            }).catch(err => {
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