<template>
    <div class="list">
        <!-- 头部搜索 -->
        <header>
            <span>版本号</span>
            <Input
                v-model.trim="params.uId"
                placeholder="请输入版本号进行查询"
                style="width: 200px;margin:0 20px;"
                clearable
            />
            <Button type="primary" icon="ios-search" @click="search">查询</Button>
            <Button type="primary" @click="add" style="margin-left:20px;">添加新版本</Button>
        </header>
        <!-- 列表 -->
        <div class="table">
            <Table size="small" :columns="columns1" :data="data1" stripe></Table>
            <Page
                :total="count"
                :current="pageNo"
                :page-size="pageSize"
                @on-change="loadPage"
                class="pages"
            />
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            params: {
                uId: ""
            },
            pageNo: 1,
            pageSize: 10,
            count: 10,
            columns1: [
                { title: "编号", key: "sum", align: "center", width: 60 },
                {
                    title: "版本ID",
                    key: "versionId",
                    align: "center",
                    width: 180
                },
                {
                    title: "版本名",
                    key: "versionName",
                    align: "center",
                    width: 140
                },
                {
                    title: "版本号",
                    key: "versionNumber",
                    align: "center",
                    width: 140
                },
                { title: "类型", key: "type1", align: "center", width: 180 },
                {
                    title: "下载路径",
                    key: "downloadPath",
                    align: "center",
                    width: 180
                },
                {
                    title: "版本内容",
                    key: "content",
                    align: "center",
                    width: 220
                },
                {
                    title: "操作",
                    key: "iOperate",
                    align: "center",
                    width: 120,
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
                                            // function全局方法
                                            this.functionJS.queryNavgationTo(
                                                this,
                                                "/index/operation/versionManagement/edit",
                                                {
                                                    pageNo: this.pageNo,
                                                    id
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
            data1: []
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/versionManagement/home",
                title: "版本管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        if (Boolean(pageNo)) {
            this.pageNo = Number(pageNo);
        }
        this.loadingData(this.pageNo);
    },
    methods: {
        loadPage(index) {
            this.pageNo = index;
            if (this.params.uId) {
                this.loadingData(this.pageNo, this.params.uId);
            } else {
                this.loadingData(this.pageNo);
            }
        },
        search() {
            this.loadingData(this.ageNo, this.params.uId);
        },
        loadingData(pageNo, val) {
            let params = {
                pageNo,
                pageSize: this.pageSize
            };
            if (Boolean(val)) {
                params.searchKey = val.trim();
            }
            this.$axios.post(api.versionlist, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.count = ret.count;
                    ret.list.forEach((item, index) => {
                        item.sum = index + 1;
                        if (item.type == 1) {
                            item.type1 = "IOS";
                        } else {
                            item.type1 = "安卓";
                        }
                    });
                    this.data1 = ret.list;
                } else {
                    this.$Message.info("没有访问权限");
                }
            });
        },
        add() {
            // function全局方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/versionManagement/add",
                {
                    pageNo: this.pageNo
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.list {
    width: 98%;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
    }
    .pages {
        margin-top: 20px;
    }
}
</style>
