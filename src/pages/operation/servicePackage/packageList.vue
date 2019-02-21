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
                    ></fourLevelLinkage>
                </div>
                <div class="margin-up-down">
                    <span>服务包名称</span>
                    <Input class="w-input" v-model="itemName" placeholder="请输入服务包名称"/>
                </div>
                <div class="margin-up-down">
                    <Button type="primary" @click="loadPage(1)">
                        <Icon type="ios-search" size="14" style="margin-right:5px;"/>查询
                    </Button>
                </div>
                <div class="margin-up-down">
                    <Button type="warning" @click="goAdd">添加服务包</Button>
                </div>
                <!-- <Button type="default" @click="goImport">批量导入</Button> -->
            </Col>
        </Row>
        <Table class="m-table" :columns="columns" :data="dataList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            itemName: "",

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
                    title: "服务项目归属",
                    key: "attribution",
                    align: "center",
                    width: 200,
                    render: (h, params) => {
                        return h("span", {
                            domProps: {
                                innerHTML: params.row.attribution
                            }
                        });
                    }
                },
                {
                    title: "创建时间",
                    key: "createTime",
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
                    title: "服务价格(元/次)",
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
                    render: (h, params) => {
                        let text = "";
                        if (params.row.packagestatus == 1) {
                            text = "启用";
                        } else {
                            text = "禁用";
                        }
                        return h("span", {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
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
        fourLevelLinkage
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/servicePackage/pindex",
                title: "服务包管理"
            },
            {
                path: "/index/operation/servicePackage/pList",
                title: "服务包管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
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
        goAdd() {
            this.$router.push({
                path: "/index/operation/servicePackage/pAdd",
                query: { pageNo: this.pageNo }
            });
        },
        goEdit(id) {
            this.$router.push({
                path: "/index/operation/servicePackage/pEdit",
                query: { id, pageNo: this.pageNo }
            });
        },
        goImport() {},
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};

            // params.provinceCode = this.province ? this.province : null;
            // params.cityCode = this.city ? this.city : null;
            // params.areaCode = this.area ? this.area : null;
            // params.hospitalId = this.hospital ? this.hospital : null;

            params.provinceId = this.province ? this.province : null;
            params.cityId = this.city ? this.city : null;
            params.areaId = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;

            params.itemName = this.itemName ? this.itemName : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log("服务包 params", params);
            this.$axios
                .post(api.servicepackagepage, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        this.dataList = [];
                        resp.data.object.list.map((el, i) => {
                            /* 这儿注释代码不许删除掉 */
                            // let promise = new Promise((resolve, reject) =>{
                            //     this.getAttribution(resolve,el.provinceId,el.cityId,el.areaId,el.hospitalId);
                            // });
                            // promise.then(val=>{
                            //     el.attribution = val;
                            //     this.dataList.push(el)
                            // })
                            let promise = new Promise((resolve, reject) => {
                                this.attribution(resolve, el);
                            });
                            promise.then(val => {
                                el.attribution = val;
                                this.dataList.push(el);
                            });
                        });
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        attribution(resolve, opt) {
            let attribution = "";
            if (opt.hospitalId) {
                attribution += opt.hospitalName;
            } else {
                if (opt.provinceId) {
                    attribution += opt.province;
                    if (opt.cityId) {
                        let pat = new RegExp(opt.province);
                        !pat.test(opt.city) &&
                            (attribution += "&nbsp;&nbsp;" + opt.city);
                        if (opt.areaId) {
                            attribution += "&nbsp;&nbsp;" + opt.area;
                        }
                    }
                }
            }
            resolve(attribution);
        },
        /* getAttribution 函数不许删除 */
        getAttribution(resolve, provinceId, cityId, areaId, hospitalId) {
            let attribution = "";
            if (hospitalId) {
                var params = {};
                params.provinceCode = parseInt(
                    provinceId == 0 ? null : provinceId
                );
                this.$axios
                    .post(api.hospitalselectbyprovincecode, params)
                    .then(resp => {
                        let tmpHospitalList = resp.data.object;
                        for (let item of tmpHospitalList) {
                            if (item.id == hospitalId) {
                                attribution += item.orgName;
                                resolve(attribution);
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                if (provinceId) {
                    let tmpProvinceList = this.$store.getters.getProvinceList;
                    for (let item of tmpProvinceList) {
                        if (item.value == provinceId) {
                            attribution += item.name;
                        }
                    }
                }
                if (cityId) {
                    let tmpCityList = this.$store.getters.getCityList(
                        provinceId
                    );
                    for (let item of tmpCityList) {
                        if (item.id == cityId) {
                            attribution += "&nbsp;&nbsp;" + item.name;
                        }
                    }
                }
                if (areaId) {
                    let tmpAreaList = this.$store.getters.getAreaList(cityId);
                    for (let item of tmpAreaList) {
                        if (item.id == areaId) {
                            attribution += "&nbsp;&nbsp;" + item.name;
                        }
                    }
                }
                // return attribution;
                resolve(attribution);
            }
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
        width: 200px;
    }
    .m-table {
        margin: 10px 0;
    }
    .margin-up-down {
        display: inline-block;
        margin: 10px 0;
    }
}
</style>