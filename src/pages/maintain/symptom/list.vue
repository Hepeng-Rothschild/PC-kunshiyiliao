<template>
    <div class="symptomlist">
        <Row>
            <Col :xs="24">
                <Input class="w-input" v-model="searchKey" placeholder="症状名称"/>
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
                <Button @click="add">添加</Button>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="symptomList"></Table>
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
                { title: "症状名称", key: "symptom", align: "center" },
                {
                    title: "针对人群",
                    key: "gender",
                    align: "center",
                    render: (h, params) => {
                        let gender = params.row.gender;
                        let peoples =
                            gender == 1 ? "男" : gender == 2 ? "女" : "所有";
                        return h("span", {
                            domProps: {
                                innerHTML: peoples
                            }
                        });
                    }
                },
                {
                    title: "状态",
                    key: "status",
                    align: "center",
                    render: (h, params) => {
                        let status = params.row.status;
                        let statusText = status == 1 ? "正常" : "已删除";
                        return h("span", {
                            domProps: {
                                innerHTML: statusText
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
                        let index = params.row._index;
                        let status = params.row.status;
                        let btnText = "恢复";
                        status == 1 && (btnText = "删除");
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
                                                    "/index/maintain/symptom/edit",
                                                query: {
                                                    id,
                                                    pageNo: this.pageNo
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
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
                                            this.changeStatus(id,index,status);
                                        }
                                    }
                                },
                                btnText
                            )
                        ];
                    }
                }
            ],
            symptomList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        pageNo = pageNo ? pageNo : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
    },
    methods: {
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.searchKey = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.getSymptomList, params)
                .then(resp => {
                    this.count = resp.data.object.count;
                    this.symptomList = resp.data.object.list;
                    for (let i = 0; i < this.symptomList.length; i++) {
                        let item = this.symptomList[i];
                        this.symptomList[i].iNum = i + 1;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        add() {
            this.$router.push({
                path: "/index/maintain/symptom/edit",
                query: { pageNo: this.pageNo }
            });
        },
        changeStatus(id,index,status) {
            let params = {},tmpStatus,noticeMsg;
            params.id = id;
            if(status == 1){
                params.status = "0";
                tmpStatus = 0;
                noticeMsg = "删除";
            }else{
                params.status = "1";
                tmpStatus = 1;
                noticeMsg = "恢复";
            }
            this.$axios
            .post(api.changeSymptomStatus, params)
            .then(resp => {
                if(resp.data.success){
                    this.symptomList[index].status = tmpStatus;
                }else{
                    this.$Message.info(noticeMsg+"失败，请重试")
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
};
</script>
<style lang="less" scoped>
.symptomlist {
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