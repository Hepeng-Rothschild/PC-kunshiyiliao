<template>
    <div class="livemant">
        <!-- 头部Table页 -->
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="24">
                <div class="tmpHeader">
                    <span
                        :class="{active:status == item.value }"
                        @click="status = item.value"
                        v-for="(item,index) in tabList"
                    >{{ item.title }}</span>
                </div>
            </Col>
        </Row>
        <!-- 查询内容 -->
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin-top:20px;">
            <Col span="8">
                <Input
                    suffix="ios-search"
                    placeholder="输入主讲人或标题进行查询"
                    style="width: 200px"
                    v-model="search"
                    clearable
                    v-show="status!=3"
                />
                <Button type="primary" @click="searchInput" v-show="status!=3">查询</Button>
                <Button @click="add">新增</Button>
            </Col>
            <Col span="14">&nbsp;</Col>
        </Row>
        <!-- 表格列表 -->
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin-top:20px;">
            <Col span="24">
                <Table stripe :columns="columns" :data="data1"></Table>
            </Col>
        </Row>
        <!-- 页码 -->
        <Page
            :total="count"
            :current="pageNo"
            :page-size="pageSize"
            style="margin-top:10px;"
            @on-change="loading"
            v-show="status!=3"
        />
        <!-- 模态框 -->
        <Modal v-model="modal1" :title="modalContent" @on-ok="ok" @on-cancel="cancel">
            <!-- 分类 -->
            <div class="w-modal">
                <span>
                    <b style="color:red;">*</b>分类
                </span>
                <Input
                    suffix="ios-search"
                    placeholder="请输入栏目名称"
                    style="width: 200px"
                    v-model="modalClass.name"
                />
            </div>
            <!-- 排序 -->
            <div class="w-modal">
                <span>
                    <b style="color:red;">*</b>排序
                </span>
                <InputNumber :max="10" :min="1" v-model="modalClass.priority"></InputNumber>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            // 查询内容
            search: "",
            // tab状态
            status: 1,
            pageNo: 1,
            pageSize: 10,
            count: 10,
            // tab列表
            tabList: [
                {
                    title: "直播",
                    value: 1
                },
                {
                    title: "点播",
                    value: 2
                },
                {
                    title: "栏目",
                    value: 3
                }
            ],
            // 表头信息
            columns: [],
            // 直播列表
            columns1: [
                {
                    title: "Name",
                    key: "name",
                    align: "center"
                },
                {
                    title: "Age",
                    key: "age",
                    align: "center"
                },
                {
                    title: "Address",
                    key: "address",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 60,
                    render: (h, params) => {
                        // let id = params.row.remoteClinicId;
                        return h(
                            "a",
                            {
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        //   公用方法
                                        // this.functionJS.queryNavgationTo(
                                        //     this,
                                        //     "/index/operation/orders/remoteClinic/detail",
                                        //     {
                                        //     }
                                        // );
                                    }
                                }
                            },
                            "编辑"
                        );
                    }
                }
            ],
            // 栏目列表
            modal: [
                {
                    title: "编号",
                    key: "iSum",
                    align: "center"
                },
                {
                    title: "课堂栏目",
                    key: "name",
                    align: "center"
                },
                {
                    title: "排序",
                    key: "priority",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    render: (h, params) => {
                        let id = params.row.id;
                        let data = params.row;
                        return h(
                            "a",
                            {
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        this.modal1 = true;
                                        this.modalContent = "编辑栏目";
                                        this.modalClass = {
                                            name: data.name,
                                            priority: data.priority,
                                            id: id
                                        };
                                    }
                                }
                            },
                            "编辑"
                        );
                    }
                }
            ],
            // 点播列表
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
                    key: "playStatus",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let id = params.row.id;
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
                                            "/index/operation/liveMant/liveEdit",
                                            {
                                                id,
                                                pageNo: this.pageNo,
                                                status: this.status
                                            }
                                        );
                                    }
                                }
                            },
                            "编辑"
                        );
                    }
                }
            ],
            // 列表数据
            data1: [],
            // 模态框
            modal1: false,
            // 模态框输入值
            modalClass: {
                name: "",
                priority: null
            },
            // 模态框头部内容
            modalContent: "添加栏目"
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
            },
            {
                path: "/index/operation/liveMant/list",
                title: "医师讲堂"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let query = this.$route.query.status;
        this.status = Boolean(this.$route.query.status)
            ? Number(this.$route.query.status)
            : this.tabList[0].value;
        this.pageNo = Boolean(this.$route.query.pageNo)
            ? Number(this.$route.query.pageNo)
            : 1;
        this.statusChange(this.status);
    },
    methods: {
        // 新增
        add() {
            let path = ''
            if (Number(this.status) == 3) {
                this.modal1 = true;
                this.modalContent = "添加栏目";
                return "";
            } else if (Number(this.status) == 2) {
                path = '/index/operation/liveMant/liveAdd'
            } else {
                path = '/index/operation/liveMant/broadAdd'
            }
            this.functionJS.queryNavgationTo(
                    this,
                    path,
                    {
                        status: this.status,
                        pageNo: this.pageNo
                    }
                );
        },
        // 栏目模态框的编辑与新增
        ok() {
            // 编辑栏目
            if (Boolean(this.modalClass.id)) {
                this.$axios
                    .post(api.lecturecolumnupdate, this.modalClass)
                    .then(resp => {
                        if (resp.data.success) {
                            let ret = resp.data.object;
                            // 清空栏目内容
                            this.modalClass = {
                                name: "",
                                priority: null
                            };
                            // 重新加载列表数据
                            this.modalData();
                            this.$Message.info("修改成功");
                        } else {
                            this.$Message.error("修改失败");
                        }
                    });
                return "";
            }
            // 新增栏目
            this.$axios
                .post(api.lecturecolumninsert, this.modalClass)
                .then(resp => {
                    if (resp.data.success) {
                        let ret = resp.data.object;
                        this.$Message.info("添加成功");
                        // 清空栏目内容
                        this.modalClass = {
                            name: "",
                            priority: null
                        };
                        this.modalData();
                    } else {
                        this.$Message.error("添加失败");
                    }
                });
        },
        cancel() {
            this.modalClass = {
                name: "",
                priority: null
            };
        },
        // 根据tabs状态的不同加载不同的数据
        statusChange(newVal) {
            if (Number(newVal) == 1) {
                // 直播
                this.columns = this.columns1;
                this.data1 = [];
                // this.broadData({ pageNo: this.pageNo, pageSize: this.pageSize, searchKey : this.search });
            } else if (Number(newVal) == 2) {
                // 点播
                this.columns = this.live;
                this.data1 = [];
                this.liveData({
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    searchKey: this.search
                });
            } else if (Number(newVal) == 3) {
                // 栏目
                this.columns = this.modal;
                this.modalData();
            }
        },
        broadData(params) {
            this.data1 = [];
            // this.$axios.post()
        },
        // 加载栏目数据
        modalData() {
            this.data1 = [];
            this.$axios.post(api.lecturecolumnlist).then(resp => {
                if (resp.data.success) {
                    let ret = resp.data.object;
                    ret.forEach((item, index) => {
                        item.iSum = this.addZeros(index);
                    });
                    this.data1 = ret;
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
        },
        // 加载点播数据
        liveData(params) {
            this.data1 = [];
            this.$axios
                .post(api.lecturedemandpage, {
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
                            item.playStatus = Boolean(item.playStatus)
                                ? arr[item.playStatus].content
                                : arr[1].content;
                            item.videoSource =
                                item.videoSource == 1 ? "网站地址" : "本地上传";
                        });
                        this.count = resp.data.object.count;
                        this.data1 = ret;
                    } else {
                        this.$Message.error("请求失败,请稍候重试");
                    }
                });
        },
        // 分页器改变获取数据
        loading(index) {
            this.pageNo = index;
            this.statusChange(this.status);
        },
        // 模糊查询
        searchInput() {
            this.statusChange(this.status);
        }
    },
    // 监听status   tab页的变化
    watch: {
        status(newVal, oldVal) {
            this.statusChange(newVal);
        }
    }
};
</script>
<style lang="less" scoped>
.w-modal {
    width: 100%;
    margin: 10px auto;
    span {
        display: inline-block;
        text-align: center;
        width: 100px;
    }
}
.livemant {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .tmpHeader {
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #f2f2f2;
        span {
            display: inline-block;
            line-height: 38px;
            padding: 0 15px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.5s;
        }
        span.active {
            color: skyblue;
            border-bottom: 2px solid skyblue;
        }
        span:hover {
            border-bottom: 2px solid skyblue;
            color: skyblue;
        }
    }
}
</style>
