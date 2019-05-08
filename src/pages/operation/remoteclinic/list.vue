<template>
    <div class="remoteClinic">
        <!-- 头部选择框 -->
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
                    <!-- 检索的医院名称 -->
                    <Input
                        class="w-input"
                        v-model="searchKey"
                        :placeholder="'请输入职称/医院名称/医生名称'"
                        clearable
                    />
                </div>
                <div class="margin-up-down">
                    <!-- 查询 -->
                    <Button type="primary" class="primary" @click="search">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
                </div>
                <div class="margin-up-down">
                    <!-- 添加接诊医生排班 -->
                    <Button type="primary" class="primary" @click="add">添加接诊医生排班</Button>
                </div>
            </Col>
        </Row>
        <!-- 主体列表 -->
        <div class="main">
            <Table :columns="column" :data="list" stripe></Table>
        </div>
        <Modal v-model="modal1" title="远程门诊时间" footer-hide width='400'>
            <p style="text-align:center;">
                周一：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.oneAm || "无"}}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.onePm || "无"}}</span>
            </p>
            <p style="text-align:center;">
                周二：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.twoAm || "无"}}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.twoPm || "无"}}</span>
            </p>
            <p style="text-align:center;">
                周三：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.threeAm || "无"}}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.threePm || "无"}}</span>
            </p>
            <p style="text-align:center;">
                周四：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.fourAm || "无"}}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.fourPm || "无" }}</span>
            </p>
            <p style="text-align:center;">
                周五：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.fiveAm || "无"}}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.fivePm || "无" }}</span>
            </p>
            <p style="text-align:center;">
                周六：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.sixAm || "无" }}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.sixPm || "无"}}</span>
            </p>
            <p style="text-align:center;">
                周日：
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >上午：&nbsp;{{ currentData.sevenAm || "无" }}</span>
                <span
                    style="margin-left:10px;text-align:left;display:inline-block;min-width:100px;"
                >下午：&nbsp;{{ currentData.sevenPm || "无" }}</span>
            </p>
        </Modal>
        <div class="total">
            <Page
                :total="remoteClinicLength"
                :current="pageNo"
                @on-change="change"
                :page-size="pageSize"
            />
        </div>
    </div>
</template>
<script>
// 医生端远程门诊
import tempHeader from "@/components/tmpHeader";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
export default {
    components: {
        tempHeader,
        fourLevelLinkage
    },
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,

            remoteClinicLength: 0,
            pageNo: 1,
            pageSize: 10,
            searchTypeList: [
                { id: 1, name: "医院名称" },
                { id: 2, name: "医生姓名" }
            ],
            searchType: 1,
            keyPlaceHolder: "医院名称",
            searchKey: "",
            dictType: "",
            titleList: "",
            modal1: false,
            modelList: [],
            currentData: [],
            list: [],
            column:[
                {
                    title:"序号",
                    key:"sum",
                    align: "center",
                    width:60
                },
                {
                    title:"专家姓名",
                    key:"doctorName",
                    align:"center",
                },
                {
                    title:"医院科室",
                    key:"deptName",
                    align:"center",
                },
                {
                    title:"远程门诊时间",
                    key:"deptName",
                    align:"center",
                    render:(h,params) => {
                        let row = params.row
                        let top = '上午：' + row.intervalTimeAmStart + '-' + row.intervalTimeAmEnd;
                        let bot = '下午：' + row.intervalTimePmStart + '-' + row.intervalTimeAmEnd;
                        return h('div', [
                            h('p', {
                                style: {
                                    cursor:"pointer"
                                },
                                attrs:{
                                    title:"点击查看"
                                },
                                on: {
                                    click : () => {
                                        this.showModel(row)
                                    }
                                }
                            }, top),
                            h('p', {
                                style: {
                                    cursor:"pointer"
                                },
                                on:{
                                    click : () => {
                                        this.showModel(row)
                                    }
                                }
                            }, bot)
                        ])
                    }
                },
                {
                    title:"预约期限",
                    key:"cycleDay",
                    align:"center",
                },
                {
                    title: "启用标示",
                    key: "iremote",
                    align: "center",
                    render: (h,params) => {
                        let name = params.row.iremote == 1 ? "启用" : "停用"
                        let style = params.row.iremote == 1 ? {} : {color:'red'}
                        return h('span', {
                            style
                        }, name)
                    }
                },
                {
                    title:"操作",
                    align:"center",
                    render:(h, params) => {
                        let item = params.row;
                        return h('a', {
                            on:{
                                click:() => {
                                    this.edit(item)
                                }
                            }
                        }, '编辑')
                    }
                },

            ]
        };
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
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/remoteclinic/list",
                title: "远程门诊"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.getInfoData();
        let pageNo = this.$route.query.pageNo;
        if (Boolean(pageNo)) {
            this.pageNo = pageNo;
        }
        this.getDoctorList(this.pageNo);
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
        // 显示model
        showModel(item) {
            let params = {};
            params.oneAm = item.oneAm;
            params.onePm = item.onePm;

            params.twoAm = item.twoAm;
            params.twoPm = item.twoPm;

            params.threeAm = item.threeAm;
            params.threePm = item.threePm;

            params.fourAm = item.fourAm;
            params.fourPm = item.fourPm;

            params.fiveAm = item.fiveAm;
            params.fivePm = item.fivePm;

            params.sixAm = item.sixAm;
            params.sixPm = item.sixPm;

            params.sevenAm = item.sevenAm;
            params.sevenPm = item.sevenPm;

            this.currentData = params;
            let flag = false;
            for (let i in params) {
                if (params[i]) {
                    flag = true;
                }
            }
            this.modal1 = flag;
            if (!flag) {
                this.$Message.info("远程门诊时间为空");
            }
        },
        // 页码改变
        change(index) {
            this.pageNo = index;
            if (this.searchKey != "") {
                this.getDoctorList(1, this.city, this.searchKey);
            } else {
                this.getDoctorList(index);
            }
        },
        // 新增
        add() {
            this.$router.push({
                path: "/index/operation/remoteclinic/add",
                query: {
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack:2,
                }
            });
        },
        // 页面加载时获取省级,职称列表
        getInfoData() {
            //获取省级列表
            this.$axios
                .post(api.getProvince)
                .then(resp => {
                    this.cityList = resp.data.object;
                    
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 修改
        edit(item) {
            this.$router.push({
                path: "/index/operation/remoteclinic/edit",
                query: {
                    id: item.id,
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack:2,
                }
            });
        },
        search() {
            let params = {
                city: this.city,
                // 医院/医生名称
                searchKey: this.searchKey
            };
            this.getDoctorList(1, this.city, this.searchKey);
        },
        getDoctorList(pageNo, provinceId, searchKey) {
            let params = {
                pageNo,
                pageSize: this.pageSize
            };
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            if (Boolean(searchKey)) {
                params.searchKey = searchKey.trim();
            }
            console.log("家庭医生签约 params", params);
            this.$axios.post(api.doctorRomteclinicList, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.remoteClinicLength = ret.count;
                    ret.list.forEach((item,index) => {
                        item.sum = this.addZeros(index)
                    })
                    this.list = ret.list;
                } else {
                    this.$Message.info("没有访问权限");
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.remoteClinic {
    width: 98%;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    .w-input {
        width: 300px;
    }
    header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
        .w-select {
            width: 100px;
            margin: 0 10px;
        }
        .primary {
            margin: 0 10px;
        }
    }
    .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }
    .margin-up-down {
        display: inline-block;
        margin-top: 10px;
    }
}
</style>
