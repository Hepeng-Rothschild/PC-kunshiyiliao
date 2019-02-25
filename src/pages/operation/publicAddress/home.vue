<template>
    <div class="list">
        <!-- 头部搜索 -->
        <header>
            <span>公众号</span>
            <Input
                v-model.trim="params.uId"
                placeholder="请输入检索内容"
                style="width: 200px;margin:0 20px;"
                clearable
            />
            <Button type="primary" icon="ios-search" @click="search">查询</Button>
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
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
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
                { title: "编号", key: "sum", align: "center" },
                { title: "公众号", key: "nick", align: "center" },
                { title: "Appid", key: "appid", align: "center" },
                {
                    title: "操作",
                    key: "iOperate",
                    align: "center",
                    render: (h, params) => {
                        let id = params.row.appid;
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            // FunctionJS方法
                                            this.functionJS.paramsNavgationTo(
                                                this,
                                                "wxbannerList"
                                            );
                                            let iv = store.state.iv;
                                            let salt = store.state.salt;
                                            localStorage.setItem(
                                                "appid",
                                                aesUtils.encrypt(
                                                    salt,
                                                    iv,
                                                    "wxAppid",
                                                    id
                                                )
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
                path: "/index/operation/publicHosting/index",
                title: "公众号托管"
            },
            {
                path: "/index/operation/publicAddress/list",
                title: "公众号管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.loadingData(1);
    },
    methods: {
        loadPage(index) {
            this.pageNo = index;
            this.loadingData(index);
        },
        search() {
            this.loadingData(1, this.params.uId);
        },
        loadingData(pageNo, val) {
            let params = {
                pageNo,
                pageSize: this.pageSize
            };
            if (val != "") {
                params.searchKey = val;
            }
            this.$axios.post(api.wxList, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object.list;
                    ret.forEach((item, index) => {
                        item.sum = index + 1;
                    });
                    this.count = res.data.object.count;
                    this.data1 = ret;
                } else {
                    this.$Message.info("没有访问权限");
                }
            });
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
