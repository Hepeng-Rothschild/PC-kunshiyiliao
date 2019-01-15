<template>
    <div class="diseaselist">
        <Row>
            <Col :xs="24">
                <Input class="w-input" v-model="searchKey" placeholder="菜单名称"/>
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
                <Button @click="add">添加</Button>
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
                { title: "序号", key: "iNum", align: "center" },
                { title: "菜单名称", key: "menuName", align: "center" },
                {
                    title: "前端路径",
                    key: "path",
                    align: "center",
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
                    align: "center"
                },
                {
                    title: "层级",
                    key: "level",
                    align: "center"
                },
                {
                    title: "类型",
                    key: "function",
                    align: "center",
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
                                            this.$router.push({
                                                path:
                                                    "/index/maintain/system/m_manage/ed",
                                                query: {
                                                    id,
                                                    func:func,
                                                    level,
                                                    pageNo: this.pageNo
                                                }
                                            });
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
            params.searchKey = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.operatemenupage, params)
                .then(resp => {
                    this.count = resp.data.object.count;
                    this.dataList = resp.data.object.list;
                    for (let i = 0; i < this.dataList.length; i++) {
                        let item = this.dataList[i];
                        this.dataList[i].iNum = i + 1;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        add() {
            this.$router.push({
                path: "/index/maintain/system/m_manage/ed",
                query: { pageNo: this.pageNo }
            });
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