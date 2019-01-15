<template>
    <div class="diseaselist">
        <Row>
            <Col :xs="24">
                <Input class="w-input" v-model="searchKey" placeholder="权限/备注"/>
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
                { title: "权限路径", key: "name", align: "center" },
                {
                    title: "备注",
                    key: "remark",
                    align: "center"
                },
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
                                            this.$router.push({
                                                path:
                                                    "/index/maintain/system/iface_permise/ed",
                                                query: {
                                                    id,
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
            dataList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    mounted() {
        let pageNo = this.$route.query.pageNo?parseInt(this.$route.query.pageNo):1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
    },
    methods: {
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = parseInt(pageNo);
            let params = {};
            params.searchKey = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.operateauthlist, params)
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
                path: "/index/maintain/system/iface_permise/ed",
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