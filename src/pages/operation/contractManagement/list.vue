<template>
    <div class="fileManagement">
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
                    <span>签约状态：</span>
                    <Select class="w-select" clearable v-model="authStatus" style="width:120px;">
                        <Option
                            v-for="(item,index) in statusList"
                            :value="index"
                            :key="index"
                        >{{item}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <span>机构名称：</span>
                    <Input
                        v-model.trim="params.hospitalName"
                        placeholder="请输入机构名称检索"
                        style="width: 200px"
                        clearable
                    />
                </div>
                <div class="margin-up-down">
                    <span>患者姓名：</span>
                    <Input
                        v-model.trim="params.memberName"
                        placeholder="请输入患者姓名检索"
                        style="width: 200px"
                        clearable
                    />
                </div>
                <div class="margin-up-down">
                    <span>身份证号：</span>
                    <Input
                        v-model.trim="params.fdsOrderId"
                        placeholder="请输入患者身份证号码检索"
                        style="width: 200px"
                        clearable
                    />
                </div>
                <Button type="primary" icon="ios-search" @click="search">查询</Button>
            </Col>
        </Row>
        <div class="table">
            <Table size="small" :columns="columns1" :data="data1" stripe></Table>
            <Page
                :total="count"
                :current="pageNo"
                :page-size="pageSize"
                @on-change="loadPage"
                class="pages"
            />
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    components: {
        fourLevelLinkage
    },
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,

            statusList: [
                "审核中",
                "签约成功",
                "签约拒绝",
                "解约",
                "系统自动拒绝"
            ],
            authStatus: 1,
            params: {
                // 医院名
                hospitalName: null,
                // 患者
                memberName: null,
                // 身份证
                fdsOrderId: null
            },
            pageNo: 1,
            pageSize: 10,
            count: 10,
            columns1: [
                { title: "编号", key: "iNum", align: "center", width: 60 },
                {
                    title: "患者姓名",
                    key: "memberName",
                    align: "center",
                    width: 180
                },
                { title: "性别", key: "gender", align: "center", width: 80 },
                {
                    title: "身份证号",
                    key: "idcard",
                    align: "center",
                    width: 180
                },
                {
                    title: "电话",
                    key: "telephone",
                    align: "center",
                    width: 160
                },
                {
                    title: "签约医生",
                    key: "doctorName",
                    align: "center",
                    width: 140
                },
                {
                    title: "签约状态",
                    key: "status",
                    align: "center",
                    width: 140
                },
                {
                    title: "签约日期",
                    key: "contractStartTime",
                    align: "center",
                    width: 180
                },
                {
                    title: "签约机构",
                    key: "hospitalName",
                    align: "center",
                    width: 140
                }
            ],
            data1: []
        };
    },
    mounted() {
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
        this.loadingData(this.pageNo, this.pageSize, 1);
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/contractManagement/list",
                title: "家医签约管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
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
        loadPage(index) {
            this.pageNo = index;
            if (
                this.params.hospitalName ||
                this.params.memberName ||
                this.params.fdsOrderId
            ) {
                this.loadingData(
                    this.pageNo,
                    this.pageSize,
                    this.authStatus,
                    this.params.hospitalName,
                    this.params.memberName,
                    this.params.fdsOrderId
                );
            } else {
                this.loadingData(this.pageNo, this.pageSize, this.authStatus);
            }
        },
        loadingData(
            pageNo,
            pageSize,
            status,
            hospitalName,
            memberName,
            fdsOrderId
        ) {
            let params = {
                pageNo,
                pageSize,
                ieffective: status
            };
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            // 医院名
            params.hospitalName = hospitalName.trim();
            // 患者
            params.memberName = memberName.trim();
            // 医院名
            params.idcard = fdsOrderId;
            console.log("家庭医生签约 params", params);
            this.$axios.post(api.contractManagementList, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.count = ret.count;
                    ret.list.forEach((item, index) => {
                        item.iNum = index + 1;
                        if (item.gender == 1) {
                            item.gender = "男";
                        } else {
                            item.gender = "女";
                        }
                        item.status = this.statusList[item.ieffective];
                    });
                    this.data1 = ret.list;
                } else {
                    this.$Message.info("没有访问权限");
                }
            });
        },

        search() {
            this.loadingData(
                1,
                this.pageSize,
                this.authStatus,
                this.params.hospitalName,
                this.params.memberName,
                this.params.fdsOrderId
            );
            // this.loadPage(1);
        }
    }
};
</script>
<style lang="less" scoped>
.fileManagement {
    width: 98%;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    .pages {
        margin-top: 20px;
    }
    .margin-up-down {
        display: inline-block;
        margin: 10px 0;
    }
}
</style>
