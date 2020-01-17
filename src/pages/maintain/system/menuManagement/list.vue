<template>
    <div class="diseaselist">
        <Row>
            <Col :xs="24">
                <Input class="w-input" v-model="searchKey" placeholder="菜单名称"/>
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
                <Button @click="add" type='info'>添加</Button>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="dataList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            searchKey: "",
            columns: [
                { title: "序号", key: "iNum", align: "center", width: 100 },
                {
                    title: "菜单名称",
                    key: "menuName",
                    align: "center",
                    width: 220
                },
                {
                    title: "前端路径",
                    key: "path",
                    align: "center",
                    width: 300,
                    render: (h, params) => {
                        let path = params.row.path;
                        let text = "无";
                        if (path) {
                            text = path;
                        }
                        return [
                            h("span", {
                                domProps: {
                                    innerHTML: text
                                }
                            })
                        ];
                    }
                },
                {
                    title: "备注",
                    key: "remark",
                    align: "center",
                    // width: 250
                },
                {
                    title: "层级",
                    key: "level",
                    align: "center",
                    width: 100
                },
                {
                    title: "类型",
                    key: "function",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let func = params.row.function;
                        let text = "菜单";
                        if (func == 2) {
                            text = "功能";
                        }
                        return [
                            h("span", {
                                domProps: {
                                    innerHTML: text
                                }
                            })
                        ];
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 120,
                   // fixed: 'right',
                    render: (h, params) => {
                        let id = params.row.id;
                        let func = params.row.function;
                        let level = params.row.level;
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
                                                "/index/maintain/system/m_manage/ed",
                                                {
                                                    id,
                                                    func: func,
                                                    level,
                                                    pageNo: this.pageNo,
                                                    searchKey: this.searchKey
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
            dataList: [
                {
                    iNum: 1,
                    menuName: "内容管理",
                    parentName: "运营平台--医生端",
                    path: "sdf/sadf/sadf",
                    level: 3,
                    remark: "这个的备注",
                    function: 1
                }
            ],
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    created() {
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/system/m_manage/lt",
                title: "菜单管理"
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
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = parseInt(pageNo);
            var params = {};
            params.searchKey = this.searchKey.trim();
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.operatemenupage, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        this.dataList = resp.data.object.list;
                        for (let i = 0; i < this.dataList.length; i++) {
                            let item = this.dataList[i];
                            this.dataList[i].iNum = i + 1;
                        }
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        add() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/system/m_manage/ed",
                {
                    pageNo: this.pageNo
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.diseaselist {
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