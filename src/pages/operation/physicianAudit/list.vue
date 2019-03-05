<template>
    <div class="physicianAudit">
        <!-- 查询内容 -->
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin:20px 0;">
            <Col span="8">
                <Input
                    suffix="ios-search"
                    placeholder="输入主讲人或标题进行查询"
                    style="width: 200px"
                    v-model="search"
                    clearable
                />
                <Button type="primary" @click="searchInput">查询</Button>
            </Col>
            <Col span="14">&nbsp;</Col>
        </Row>
        <Table stripe :columns="live" :data="data1"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" style="margin-top:10px;"/>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            search: "",
            live: [
                {
                    title: "编号",
                    key: "iSum",
                    align: "center"
                },
                {
                    title: "标题",
                    key: "title",
                    align: "center"
                },
                {
                    title: "首页图片",
                    key: "headImg",
                    align: "center",
                    render: (h, params) => {
                        let avatar = this.pictureFormat(params.row.headImg);
                        if (Boolean(avatar)) {
                            avatar = this.fileBaseUrl + avatar;
                        }
                        return h("img", {
                            attrs: {
                                src: avatar || "",
                                style: "width:40px;height:40px;"
                            }
                        });
                    }
                },
                {
                    title: "主讲人姓名",
                    key: "doctorName",
                    align: "center"
                },
                {
                    title: "播放来源",
                    key: "videoSource",
                    align: "center"
                },
                {
                    title: "课堂类型",
                    key: "columnName",
                    align: "center"
                },
                {
                    title: "状态",
                    key: "status",
                    align: "center"
                },
                {
                    title: "审核人",
                    key: "auditorName",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let id = params.row.id;
                        let playStatus = params.row.playStatus
                        let columnName = params.row.columnName
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
                                            "/index/operation/physicianAudit/search",
                                            {
                                                id,
                                                playStatus,
                                                columnName,
                                                pageNo: this.pageNo,
                                            }
                                        );
                                    }
                                }
                            },
                            "查看"
                        );
                    }
                }
            ],
            data1: [],
            count: 10,
            pageNo: 1,
            pageSize: 10
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
                path: "/index/operation/physicianAudit/list",
                title: "讲堂审核"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        let query = this.$route.query;
        this.liveData({ pageNo: this.pageNo, pageSize: this.pageSize });
    },
    methods: {
        searchInput() {
            this.liveData({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                searchKey: this.search
            });
        },
        // 加载点播数据
        liveData(params) {
            this.$axios
                .post(api.lecturedemandpagebyexaminelist, {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                    searchKey: params.searchKey
                })
                .then(resp => {
                    if (resp.data.success) {
                        let ret = resp.data.object.list;
                        let arr = [
                            {},
                            {
                                val: 1,
                                content: "待审核"
                            },
                            {
                                val: 2,
                                content: "审核通过"
                            },
                            {
                                val: 3,
                                content: "审核未通过"
                            },
                            {
                                val: 4,
                                content: "下架"
                            }
                        ];
                        ret.forEach((item, index) => {
                            item.iSum = this.addZeros(index);
                            item.status = Boolean(item.playStatus)
                                ? arr[item.playStatus].content
                                : arr[1].content;
                            item.videoSource =
                                item.videoSource == 1 ? "网站地址" : "本地上传";
                        });
                        ret;
                        this.count = resp.data.object.count;
                        this.data1 = ret;
                    } else {
                        this.$Message.error("请求失败,请稍候重试");
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
.physicianAudit {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>
