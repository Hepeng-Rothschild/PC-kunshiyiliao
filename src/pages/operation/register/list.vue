<template>
    <div class="doctorreviewlist">
        <tempHeader :index='0'></tempHeader>
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
                    <Input class="w-input" v-model="searchKey" :placeholder="'请输入'+keyPlaceHolder"/>
                </div>
                <div class="margin-up-down">
                    <Input class="w-input" v-model="deptKey" placeholder="请输入科室关键字"/>
                </div>
                <div class="margin-up-down">
                    <Select class="w-select" clearable v-model="dictType" placeholder="职称级别">
                        <Option
                            v-for="item in titleList"
                            :value="item.dictType"
                            :key="item.dictType"
                        >{{item.dictName}}</Option>
                    </Select>
                </div>
                <div class="margin-up-down">
                    <Button type="primary" @click="loadPage(1)">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
                </div>
                <div class="margin-up-down">
                    <Button type="primary" @click="addDoc">添加排班信息</Button>
                </div>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
        <Modal
            title="提示："
            v-model="registertimesFlag"
            class-name="vertical-center-modal"
            footer-hide
        >
            <p v-html="timesHtml" style="text-align:center;"></p>
        </Modal>
    </div>
</template>
<script>
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
import tempHeader from "@/components/tmpHeader";
export default {
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            searchKey: "",
            keyPlaceHolder: "医生姓名",
            deptKey: "",
            titleList: "",
            dictType: "",
            weeks: ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            days: ["", "上午", "下午"],
            registertimesFlag: false,
            columns: [
                { title: "序号", key: "iNum", align: "center" },
                { title: "专家姓名", key: "doctorName", align: "center" },
                {
                    title: "医院科室",
                    key: "hospitaldept",
                    align: "center",
                    render: (h, params) => {
                        let item = params.row.hospitaldept;
                        return h("span", {
                            domProps: {
                                innerHTML: item
                            }
                        });
                    }
                },
                { title: "就诊地址", key: "address", align: "center" },
                {
                    title: "预约挂号门诊时间",
                    key: "registerTimes",
                    align: "center",
                    render: (h, params) => {
                        let id = params.row.id;
                        let tmpTimes = params.row.registerTimes;
                        return h("span", {
                            domProps: {
                                innerHTML: tmpTimes
                            },
                            style: { cursor: "pointer" },
                            on: {
                                click: () => {
                                    this.showTimesModal(id);
                                }
                            }
                        });
                    }
                },
                { title: "预约期限", key: "term", align: "center" },
                { title: "备注信息", key: "remarks", align: "center" },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    render: (h, params) => {
                        let id = params.row.id;
                        return [
                            h(
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
                                                "/index/operation/register/detail",
                                                {
                                                    id,
                                                    pageNo: this.pageNo,
                                                    searchKey: this.searchKey,
                                                    deptKey: this.deptKey,
                                                    dictType: this.dictType
                                                }
                                            );

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
                                             //   公用方法
                                            this.functionJS.queryNavgationTo(
                                                this,
                                                "/index/operation/register/edit",
                                                {
                                                    id,
                                                    pageNo: this.pageNo,
                                                    searchKey: this.searchKey,
                                                    deptKey: this.deptKey,
                                                    dictType: this.dictType
                                                }
                                            );

                                        }
                                    }
                                },
                                "编辑"
                            )
                        ];
                    }
                }
            ],
            doctorList: [
                {
                    iNum: 1,
                    avatar: require("@/assets/images/header/code_box.png"),
                    operat: ""
                }
            ],
            doctorTimesList: {},
            timesHtml: "",
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
        fourLevelLinkage,
        tempHeader
    },
    mounted() {
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        //获取职称列表
        this.$axios
            .post(api.getTitle)
            .then(resp => {
                this.titleList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
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
            params.dept = this.deptKey;
            params.title = this.dictType;
            params.doctorName = this.searchKey;
            params.hospitalName = "";
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log("预约挂号 params",params);
            this.$axios
                .post(api.registerList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        this.doctorList = resp.data.object.list;
                        for (let i = 0; i < this.doctorList.length; i++) {
                            let item = this.doctorList[i];
                            this.doctorList[i].iNum = i + 1;
                            this.doctorList[i].hospitaldept =
                                item.hospitalName + "<br>" + item.dept;
                            let tmpTimes = item.registerTimes;
                            this.doctorTimesList[item.id] = tmpTimes;
                            let tmphtml = ``;
                            let max =
                                tmpTimes.length >= 2 ? 2 : tmpTimes.length;
                            for (let j = 0; j < max; j++) {
                                tmphtml +=
                                    this.weeks[tmpTimes[j].week] +
                                    "&nbsp;&nbsp;" +
                                    this.days[tmpTimes[j].day];
                                if (j == 0) {
                                    tmphtml += "<br/>";
                                }
                            }
                            this.doctorList[i].registerTimes = tmphtml;
                        }
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showTimesModal(id) {
            let tmpArr = this.doctorTimesList[id];
            let tmpHtml = ``;
            tmpArr.forEach((element, i) => {
                tmpHtml += `${this.weeks[element.week]}&nbsp;&nbsp;
                ${
                    this.days[element.day]
                }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
                if (i % 2 == 1) tmpHtml += `<br>`;
            });
            this.timesHtml = tmpHtml;
            this.registertimesFlag = true;
        },
        addDoc() {
             //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/edit",
                {
                    pageNo: this.pageNo,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType
                }
            );

        }
    },
    created() {
        sessionStorage.setItem("index", 0);
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.deptKey = this.$route.query.deptKey
            ? this.$route.query.deptKey
            : "";
        this.dictType = this.$route.query.dictType
            ? this.$route.query.dictType
            : "";

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/register/list",
                title: "预约挂号"
            }
        ];
        this.$emit("changeBreadList", breadList);
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
    .margin-up-down {
        display: inline-block;
        margin-top: 10px;
    }
}
</style>