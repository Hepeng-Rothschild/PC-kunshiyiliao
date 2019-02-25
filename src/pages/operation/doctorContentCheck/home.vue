<template>
    <div class="doctorContentHome">
        <Tabs :animated="false" v-model="tabId" @on-click="changeComponent">
            <TabPane :label="item.name" v-for="(item,index) of tabs" :key="item.id">
                <Row class="tt-row">
                    <Col :xs="24">
                        栏目：
                        <Select class="w-select" clearable v-model="sonTab">
                            <Option
                                v-for="item in sonTabList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                        状态：
                        <Select class="w-select" clearable v-model="publicationStatus">
                            <Option
                                v-for="item in publicationStatusList"
                                :value="item.id"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>&nbsp;&nbsp;&nbsp;&nbsp;
                        文章：
                        <Input class="w-input" v-model="articleText" placeholder="请输入文章名称关键字"/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="primary" @click="loadPage(1)">
                            <Icon type="ios-search" size="14"/>查询
                        </Button>
                        <Button class="abs-right" type="primary" @click="toAdd">新增</Button>
                    </Col>
                </Row>
                <Table class="list-table" stripe :columns="columns" :data="datas"></Table>
                <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { Tabs, TabPane, Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
    components: {
        Tabs,
        TabPane,
        Select,
        Option
    },
    data() {
        return {
            tabs: [
                { id: 1, name: "健康宣教" },
                { id: 2, name: "经典案例" },
                { id: 3, name: "热门推荐" }
            ],
            tabId: 0,
            sonTabList: [],
            sonTab: null,
            publicationStatusList: [
                { id: 0, name: "禁用" },
                { id: 1, name: "启用" }
            ],
            publicationStatus: null,
            articleText: "",
            columns: [],
            datas: [],
            listApi: null,
            healthEducation: [
                { title: "序号", key: "iNum", align: "center", width: 60 },
                { title: "排序", key: "priority", align: "center", width: 80 },
                { title: "标题", key: "title", align: "center", width: 140 },
                { title: "概要", key: "synopsis", align: "center", width: 220 },
                { title: "来源", key: "source", align: "center", width: 120 },
                {
                    title: "阅读量",
                    key: "readAmount",
                    align: "center",
                    width: 80
                },
                {
                    title: "栏目",
                    key: "type",
                    align: "center",
                    width: 140,
                    render: (h, params) => {
                        let typeText = "全部";
                        this.sonTabList.forEach(ele => {
                            if (ele.id == params.row.type) {
                                typeText = ele.name;
                            }
                        });
                        return h("span", {
                            domProps: {
                                innerHTML: typeText
                            }
                        });
                    }
                },

                {
                    title: "创建时间",
                    key: "createTime",
                    align: "center",
                    width: 180
                },
                {
                    title: "状态",
                    key: "enable",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        let enable = params.row.enable,
                            btnText = "";
                        if (enable == 1) {
                            btnText = "启用";
                        } else {
                            btnText = "禁用";
                        }
                        return h("span", {
                            domProps: {
                                innerHTML: btnText
                            }
                        });
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 140,
                    render: (h, params) => {
                        let id = params.row.id;
                        let text = "";
                        let enable = null;
                        if (params.row.enable == 1) {
                            text = "禁用";
                            enable = 0;
                        } else {
                            text = "启用";
                            enable = 1;
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
                                            this.toEdit(id);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            " | ",
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.changeEnable(
                                                params.index,
                                                params.row.id,
                                                api.educationUpdateFlag,
                                                enable
                                            );
                                        }
                                    }
                                },
                                text
                            )
                        ];
                    }
                }
            ],
            healthEducationSontab: [
                // {id:1,name:"常用"},
                // 修改了这里
                { id: 1, name: "最新" },
                { id: 2, name: "医生忠告" },
                { id: 3, name: "用药" },
                { id: 4, name: "日常" }
            ],
            healthEducationApi: api.educationArticleList,
            classicCase: [
                { title: "序号", key: "iNum", align: "center" },
                { title: "医生", key: "doctorName", align: "center" },
                { title: "职称", key: "title", align: "center" },
                { title: "科室", key: "dept", align: "center" },
                { title: "医院", key: "hospital", align: "center" },
                { title: "文章", key: "articleName", align: "center" },
                { title: "概要", key: "synopsis", align: "center" },
                {
                    title: "栏目",
                    key: "type",
                    align: "center",
                    render: (h, params) => {
                        let typeText = "全部";
                        this.sonTabList.forEach(ele => {
                            if (ele.id == params.row.type) {
                                typeText = ele.name;
                            }
                        });
                        return h("span", {
                            domProps: {
                                innerHTML: typeText
                            }
                        });
                    }
                },
                { title: "创建时间", key: "createTime", align: "center" },
                {
                    title: "状态",
                    key: "enable",
                    align: "center",
                    render: (h, params) => {
                        let enable = params.row.enable,
                            btnText = "";
                        if (enable == 1) {
                            btnText = "启用";
                        } else {
                            btnText = "禁用";
                        }
                        return h("span", {
                            domProps: {
                                innerHTML: btnText
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
                        let text = "";
                        let enable = null;
                        if (params.row.enable == 1) {
                            text = "禁用";
                            enable = 0;
                        } else {
                            text = "启用";
                            enable = 1;
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
                                            this.toEdit(id);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            " | ",
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.changeEnable(
                                                params.index,
                                                params.row.id,
                                                api.doctorclassicUpdateFlag,
                                                enable
                                            );
                                        }
                                    }
                                },
                                text
                            )
                        ];
                    }
                }
            ],
            classicCaseSontab: [],
            classicCaseApi: api.doctorclassicArticleList,
            hotRecommend: [
                { title: "序号", key: "iNum", align: "center" },
                { title: "文章", key: "title", align: "center" },
                { title: "概要", key: "synopsis", align: "center" },
                { title: "来源", key: "source", align: "center" },
                { title: "创建时间", key: "createTime", align: "center" },
                {
                    title: "栏目",
                    key: "type",
                    align: "center",
                    render: (h, params) => {
                        let typeText = "全部";
                        this.sonTabList.forEach(ele => {
                            if (ele.id == params.row.type) {
                                typeText = ele.name;
                            }
                        });
                        return h("span", {
                            domProps: {
                                innerHTML: typeText
                            }
                        });
                    }
                },
                { title: "阅读数量", key: "readAmount", align: "center" },
                {
                    title: "状态",
                    key: "enable",
                    align: "center",
                    render: (h, params) => {
                        let enable = params.row.enable,
                            btnText = "";
                        if (enable == 1) {
                            btnText = "启用";
                        } else {
                            btnText = "禁用";
                        }
                        return h("span", {
                            domProps: {
                                innerHTML: btnText
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
                        let text = "";
                        let enable = null;
                        if (params.row.enable == 1) {
                            text = "禁用";
                            enable = 0;
                        } else {
                            text = "启用";
                            enable = 1;
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
                                            this.toEdit(id);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            " | ",
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.changeEnable(
                                                params.index,
                                                params.row.id,
                                                api.recommendUpdateFlag,
                                                enable
                                            );
                                        }
                                    }
                                },
                                text
                            )
                        ];
                    }
                }
            ],
            hotRecommendSontab: [
                { id: 1, name: "头条" },
                { id: 2, name: "今日热点" },
                { id: 3, name: "医学前沿" },
                { id: 4, name: "决策者说" }
            ],
            hotRecommendApi: api.recommendArticleList,
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    created() {
        this.tabId = this.$route.query.tabId ? this.$route.query.tabId : 0;
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.sonTab = this.$route.query.sonTab
            ? parseInt(this.$route.query.sonTab)
            : null;
        this.publicationStatus =
            this.$route.query.publicationStatus == null
                ? null
                : parseInt(this.$route.query.publicationStatus);
        this.articleText = this.$route.query.articleText
            ? this.$route.query.articleText
            : "";

        this.tabId == 0 &&
            ((this.columns = this.healthEducation),
            (this.sonTabList = this.healthEducationSontab),
            (this.listApi = this.healthEducationApi));
        this.tabId == 1 &&
            ((this.columns = this.classicCase),
            (this.sonTabList = this.classicCaseSontab),
            (this.listApi = this.classicCaseApi));
        this.tabId == 2 &&
            ((this.columns = this.hotRecommend),
            (this.sonTabList = this.hotRecommendSontab),
            (this.listApi = this.hotRecommendApi));
        this.loadPage(pageNo);

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctorContentCheck/list",
                title: "健康宣教"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    methods: {
        toAdd() {
            let tmpUrl = "";
            this.tabId == 0 &&
                (tmpUrl = "/index/operation/doctorContentCheck/hel-add");
            this.tabId == 1 &&
                (tmpUrl = "/index/operation/doctorContentCheck/cls-add");
            this.tabId == 2 &&
                (tmpUrl = "/index/operation/doctorContentCheck/hot-add");
            //   公用方法
            this.functionJS.queryNavgationTo(this, tmpUrl, {
                tabId: this.tabId,
                pageNo: this.pageNo,
                sonTab: this.sonTab,
                publicationStatus: this.publicationStatus,
                articleText: this.articleText
            });
        },
        toEdit(id) {
            let tmpUrl = "";
            this.tabId == 0 &&
                (tmpUrl = "/index/operation/doctorContentCheck/hel-edit");
            this.tabId == 1 &&
                (tmpUrl = "/index/operation/doctorContentCheck/cls-edit");
            this.tabId == 2 &&
                (tmpUrl = "/index/operation/doctorContentCheck/hot-edit");
            //   公用方法
            this.functionJS.queryNavgationTo(this, tmpUrl, {
                id,
                tabId: this.tabId,
                pageNo: this.pageNo,
                sonTab: this.sonTab,
                publicationStatus: this.publicationStatus,
                articleText: this.articleText
            });
        },
        changeEnable(index, id, url, enable) {
            let engable = null;
            this.$axios
                .post(url, {
                    id,
                    enable
                })
                .then(res => {
                    if (res.data.success) {
                        this.datas[index].enable = enable;
                    } else {
                        this.$Message.info("修改状态失败,请重试");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changeComponent(index) {
            this.tabId = index;
            this.pageNo = 1;
            this.sonTab = null;
            this.publicationStatus = null;
            this.articleText = "";
            this.tabId == 0 &&
                ((this.columns = this.healthEducation),
                (this.sonTabList = this.healthEducationSontab),
                (this.listApi = this.healthEducationApi));
            this.tabId == 1 &&
                ((this.columns = this.classicCase),
                (this.sonTabList = this.classicCaseSontab),
                (this.listApi = this.classicCaseApi));
            this.tabId == 2 &&
                ((this.columns = this.hotRecommend),
                (this.sonTabList = this.hotRecommendSontab),
                (this.listApi = this.hotRecommendApi));
            this.loadPage(1);
        },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.type = this.sonTab ? parseInt(this.sonTab) : null;

            // 修改了这里的三目运算符
            // params.enable = this.publicationStatus
            //   ? parseInt(this.publicationStatus)
            //   : null;
            params.enable = this.publicationStatus;

            params.searchKey = this.articleText;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;

            this.$axios
                .post(this.listApi, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        let dataList = resp.data.object.list;
                        for (let key in dataList) {
                            dataList[key].iNum = parseInt(key) + 1;
                        }
                        this.datas = dataList;
                    } else {
                        console.log("网络连接失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped lang = "less">
.doctorContentHome {
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
    .list-table {
        margin-top: 15px;
    }
    .ivu-tabs {
        overflow: visible;
    }
    .tt-row {
        position: relative;
        .abs-right {
            position: absolute;
            right: 15px;
        }
    }
}
</style>