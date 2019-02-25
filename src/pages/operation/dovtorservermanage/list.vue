<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
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
                <Input class="w-input" v-model="searchKey" placeholder="输入医生科室或职称关键字"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import { Switch } from "iview";
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
            columns: [
                { title: "序号", key: "iNum", align: "center", width: 60 },
                {
                    title: "医生姓名",
                    key: "doctorName",
                    align: "center",
                    width: 140
                },
                {
                    title: "所在医院",
                    key: "hospitalName",
                    align: "center",
                    width: 220
                },
                { title: "科室", key: "deptType", align: "center", width: 140 },
                { title: "职称", key: "title", align: "center", width: 140 },
                {
                    title: "联系电话",
                    key: "phone",
                    align: "center",
                    width: 140
                },
                {
                    title: "远程门诊",
                    key: "remoteClinic",
                    align: "center",
                    width: 140,
                    render: (h, params) => {
                        let iremote = params.row.iremote,
                            btnText = "已关闭",
                            _index = params.row._index,
                            id = params.row.doctorId;
                        if (iremote == 1) {
                            btnText = "已开启";
                        }
                        return h(
                            "Button",
                            {
                                attrs: {
                                    type: "primary"
                                },
                                on: {
                                    click: () => {
                                        this.changeRemoteClinic(
                                            id,
                                            iremote,
                                            _index
                                        );
                                    }
                                }
                            },
                            btnText
                        );
                    }
                },
                {
                    title: "排序",
                    key: "sort",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        let id = params.row.doctorId,
                            sort = params.row.sort,
                            sortStatus = params.row.sortStatus,
                            _index = params.row._index;
                        let content = h(
                            "span",
                            {
                                on: {
                                    click: e => {
                                        this.closeOther(_index);
                                        let tmpArr = this.doctorList[_index];
                                        tmpArr.sortStatus = true;
                                        this.$set(
                                            this.doctorList,
                                            _index,
                                            tmpArr
                                        );
                                    }
                                }
                            },
                            sort
                        );
                        if (sortStatus) {
                            content = h("Input", {
                                props: {
                                    type: "text",
                                    value: sort
                                },
                                on: {
                                    "on-blur": e => {
                                        if (this.controlTimes == 1) {
                                            this.controlTimes++;
                                            let val = e.target.value,
                                                _index = params.row._index;
                                            this.changeSort(id, val, _index);
                                        }
                                    },
                                    "on-enter": e => {
                                        if (this.controlTimes == 1) {
                                            this.controlTimes++;
                                            let val = e.target.value,
                                                _index = params.row._index;
                                            this.changeSort(id, val, _index);
                                        }
                                    }
                                }
                            });
                        }
                        return content;
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 140,
                    render: (h, params) => {
                        let id = params.row.doctorId;
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
                                            "/index/operation/doctormanage/edit",
                                            {
                                                id,
                                                pageNo: this.pageNo,
                                                searchKey: this.searchKey,
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
                            "管理服务"
                        );
                    }
                }
            ],
            doctorList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1,
            controlTimes: 1
        };
    },
    components: {
        fourLevelLinkage,
        "i-switch": Switch
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
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctormanage/list",
                title: "医生管理"
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
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.searchKey = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log(params);
            this.$axios
                .post(api.doctorList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        this.doctorList = resp.data.object.list;
                        for (let i = 0; i < this.doctorList.length; i++) {
                            this.doctorList[i].iNum = i + 1;
                            this.doctorList[i].sortStatus = false;
                        }
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        closeOther(_index) {
            this.doctorList.map((el, i) => {
                if (i != _index) {
                    let tmp = el;
                    el.sortStatus = false;
                    this.$set(this.doctorList, i, el);
                }
            });
        },
        changeSort(id, sort, _index) {
            let tmpArr = this.doctorList[_index];
            tmpArr.sortStatus = false;
            this.$set(this.doctorList, _index, tmpArr);
            sort = Number(sort);
            if (!Number.isInteger(sort) || sort < 1) {
                this.$Message.info("排序值只能为大于0的整数");
                sort = this.doctorList[_index].sort;
            }
            let params = {};
            params.id = parseInt(id);
            params.sort = parseInt(sort);
            this.$axios
                .post(api.doctorupdatedoctorsort, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpArr = this.doctorList[_index];
                        tmpArr.sort = sort;
                        this.$set(this.doctorList, _index, tmpArr);
                        this.controlTimes = 1;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changeRemoteClinic(id, iremote, _index) {
            let status, text;
            if (iremote == 1) {
                status = 0;
                text = "关闭";
            } else {
                status = 1;
                text = "开启";
            }
            let params = {};
            params.doctorId = parseInt(id);
            params.iremote = parseInt(status);
            this.$axios
                .post(api.remotedoctorupdateremotestatus, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.$Message.success(text + "成功");
                        this.doctorList[_index].iremote = status;
                    } else this.$Message.info(text + "失败，请重试");
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
    .w-select-hos {
        width: 180px;
    }
    .w-input {
        width: 200px;
    }
    .m-table {
        margin: 10px 0;
    }
}
</style>