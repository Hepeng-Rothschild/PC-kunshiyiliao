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
                        placeholder="请输入职称/医院名称/医生名称"
                        style='width:200px;'
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
                    <Button type="info" class="primary" @click="add">添加接诊医生排班</Button>
                </div>
            </Col>
        </Row>
        <!-- 主体列表 -->
        <div class="main">
            <Table :columns="column" :data="list" stripe></Table>
        </div>
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

            remoteClinicLength: 10,
            pageNo: 1,
            pageSize: 10,
            searchKey: "",
            // 列表
            list: [],
            column: [
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
                }
            ],
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
                path: "/index/operation/interScheduling",
                title: "互联网排班"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
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
                path: "/index/operation/interSchedulingAdd",
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
        // 修改
        edit(item) {
            this.$router.push({
                path: "/index/operation/interSchedulingEdit",
                query: {
                    id: item.doctorId,
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2,
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
            let url = api.doctorschedulingpage
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            if (Boolean(searchKey)) {
                params.searchKey = searchKey.trim();
            }
            // console.log("互联网排班 params", params);
            
            this.$axios.post(url, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.remoteClinicLength = ret.count;
                    ret.list.forEach((item,index) => {
                        item.sum = this.addZeros(index)
                    })
                    console.log(ret.list);
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
