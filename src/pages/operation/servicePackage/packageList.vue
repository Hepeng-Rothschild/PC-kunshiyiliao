<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
                <Select
                    class="w-select"
                    @on-change="changeProvince"
                    placeholder="省"
                    v-model="province"
                >
                    <Option value="0">全国</Option>
                    <Option
                        v-for="item in provinceList"
                        :value="item.value"
                        :key="item.value"
                    >{{item.name}}</Option>
                </Select>
                <Select class="w-select" @on-change="changeCity" placeholder="市" v-model="city">
                    <Option
                        v-for="(item,index) in cityList"
                        :value="item.id"
                        :key="item.id"
                    >{{item.name}}</Option>
                </Select>
                <Select class="w-select" placeholder="区" v-model="area">
                    <Option v-for="item in areaList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                <Select class="w-select" placeholder="医院" v-model="hospitalId">
                    <Option
                        v-for="item in hospitalList"
                        :value="item.id"
                        :key="item.id"
                    >{{item.name}}</Option>
                </Select>
                <span>服务包名称</span>
                <Input class="w-input" v-model="itemName" placeholder="请输入服务包名称"/>
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
                <Button type="warning" @click="goAdd">添加服务项</Button>
                <Button type="default" @click="goImport">批量导入</Button>
            </Col>
        </Row>
        <Table class="m-table" :columns="columns" :data="dataList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import { Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            hospitalList: [],
            itemName: "",
            province: "0",
            city: "0",
            area: "0",
            hospitalId: "",

            columns: [
                {
                    title: "序号",
                    key: "iNum",
                    align: "center",
                    width: 60,
                    render: (h, params) => {
                        return h("span", {
                            domProps: {
                                innerHTML: params.row._index + 1
                            }
                        });
                    }
                },
                {
                    title: "服务包名称",
                    key: "itemName",
                    align: "center",
                    width: 120
                },
                {
                    title: "创建时间",
                    key: "createTime",
                    align: "center",
                    width: 120
                },
                {
                    title: "创建机构/者",
                    key: "createPerson",
                    align: "center",
                    width: 120
                },
                {
                    title: "服务项目/个",
                    key: "count",
                    align: "center",
                    width: 120
                },
                {
                    title: "收费标准(元/次)",
                    key: "amt",
                    align: "center",
                    width: 120
                },
                {
                    title: "实收金额",
                    key: "amountReceived",
                    align: "center",
                    width: 90
                },
                {
                    title: "自付金额",
                    key: "residentowncost",
                    align: "center",
                    width: 90
                },
                {
                    title: "政府补贴",
                    key: "governmentsubsidycost",
                    align: "center",
                    width: 90
                },
                {
                    title: "是否启用",
                    key: "packagestatus",
                    align: "center",
                    width: 90,
                    render:(h,params)=>{
                        let text = "";
                        if(params.row.packagestatus == 1){
                            text = "启用";
                        }else{
                            text = "禁用";
                        }
                        return h("span",{
                            domProps:{
                                innerHTML:text
                            }
                        })
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 130,
                    render: (h, params) => {
                        let id = params.row.id;
                        var btnTxt = "查看";
                        if (params.row.authStatus == "审核中") {
                            btnTxt = "审核";
                        }
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.goEdit(id);
                                        }
                                    }
                                },
                                "查看"
                            ),
                            " | ",
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.goEdit(id);
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ];
                    }
                }
            ],
            dataList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1,
            modalConfirm: false,
            confirmInfo: "",
            delIndex: null,
            delId: null
        };
    },
    components: {
        Select,
        Option
    },
    mounted() {
        this.provinceList = this.$store.getters.getProvinceList;
        let pageNo = this.$route.query.pageNo;
        pageNo = pageNo ? pageNo : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
    },
    methods: {
        changeProvince() {
            this.city = "0";
            this.cityList = this.$store.getters.getCityList(this.province);
        },
        changeCity() {
            this.area = "0";
            this.areaList = this.$store.getters.getAreaList(this.city);
        },
        goAdd() {
            this.$router.push({ path: "/index/operation/servicePackage/pAdd" });
        },
        goEdit(id) {
            this.$router.push({
                path: "/index/operation/servicePackage/pEdit",
                query: { id }
            });
        },
        goImport() {},
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.province = parseInt(
                this.province == 0 ? null : this.province
            );
            params.city = parseInt(this.city == 0 ? null : this.city);
            params.area = parseInt(this.area == 0 ? null : this.area);
            params.itemName = this.itemName ? this.itemName : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.servicepackagepage, params)
                .then(resp => {
                    this.count = resp.data.object.count;
                    this.dataList = resp.data.object.list;
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
        width: 200px;
    }
    .m-table {
        margin: 10px 0;
    }
}
</style>