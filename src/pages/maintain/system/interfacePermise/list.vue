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
                { title: "序号", key: "iNum", align: "center", width: 100 },
                { title: "权限路径", key: "name", align: "center", width: 450 },
                {
                    title: "备注",
                    key: "remark",
                    align: "center",
                    width: 400
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 250,
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
                                                "/index/maintain/system/iface_permise/ed",
                                                {
                                                    id,
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
            dataList: [],
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
                path: "/index/maintain/system/iface_permise/lt",
                title: "权限管理"
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
            let params = {};
            params.searchKey = this.searchKey.trim();
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.operateauthlist, params)
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
                "/index/maintain/system/iface_permise/ed",
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