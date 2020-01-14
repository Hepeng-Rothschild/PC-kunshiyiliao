<template>
    <div class="contentHome">
        <!--标题-->
        <!--选择类型-->
        <div class="homeSelect">
            <!--类型选择-->
            <div class="selectType">
                <span>类型</span>
                <Select v-model="type1" style="width:100px" clearable>
                    <Option
                        v-for="item in cityList"
                        :value="item.id"
                        :key="item.id"
                        style='text-align:center'
                    >{{ item.label }}</Option>
                </Select>
            </div>
            <!--发布状态-->
            <div class="selectType">
                <span>状态</span>
                <Select v-model="type2" style="width:100px" clearable>
                    <Option
                        v-for="(item,index) in cityLists"
                        :value="item.id"
                        :key="index"
                        style='text-align:center'
                    >{{ item.label }}</Option>
                </Select>
            </div>
            <!--搜索输入-->
            <div class="search">
                <Input v-model.trim="val" placeholder="请输入文章名称进行检索" style="width: 200px;" clearable/>
            </div>
            <!--搜索按钮-->
            <Button type="primary" icon="ios-search" @click="search" style='margin:0 10px;'>搜索</Button>
            <Button type="info" @click="add">新增</Button>
        </div>
        <div class="main">
            <Table stripe :columns="column" :data="tableList" ></Table>
        </div>
        <!--分页器-->
        <div class="paging">
            <Page :total="contentSize" @on-change="pageChange" :current="pageNo"/>
        </div>
    </div>
</template>

<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            type1: "",
            type2: "",
            val: "",
            tableList: [],
            contentSize: 10,
            pageNo: 1,
            // 文章类型列表
            cityList: [
                {
                    value: "文章",
                    label: "文章",
                    id: 1
                }
            ],
            // 发布状态列表
            cityLists: [
                {
                    value: "未发布",
                    label: "未发布",
                    id: 0
                },
                {
                    value: "已发布",
                    label: "已发布",
                    id: 1
                }
            ],
            query: {},
            column:[
                {
                    title:"序号",
                    key:"sum",
                    align:"center",
                    width:60
                },
                {
                    title:"标题",
                    key:"title",
                    align:"center",
                    width:300,
                    render: (h,params) => {
                       let a = params.row.title;
                       return h('div', [
                    　　　　[
                    　　　　h('span', {
                    　　　　　　style: {
                    　　　　　　　　display: 'inline-block',
                    　　　　　　　　width: params.column._width*0.8+'px',
                    　　　　　　　　overflow: 'hidden',
                    　　　　　　　　textOverflow: 'ellipsis',
                    　　　　　　　　whiteSpace: 'nowrap',
                    　　　　　　},
                    　　　　　　}, a)
                    　　　　]
                    　　])
                   }
                },
                {
                    title:"类型",
                    key:"type",
                    align:"center",
                    width:90,
                    render: (h,params) => {
                        let a = params.row.type == 1 ? "文章" : "视频";
                        return h('div', [
                        　　　　[
                        　　　　h('span', {
                        　　　　　　}, a)
                        　　　　]
                        　　])
                    }
                },
                {
                    title:"栏目",
                    key:"columnName",
                    align:"center",
                    // width:90
                },
                {
                    title:"阅读量",
                    key:"readAmount",
                    align:"center",
                    // width:90
                },
                {
                    title:"收藏量",
                    key:"countFollow",
                    align:"center",
                    // width:90
                },
                {
                    title:"排序",
                    key:"priority",
                    align:"center",
                    // width:90
                },
                {
                    title:"时间",
                    key:"updateTime",
                    align:"center",
                    width:160
                },
                {
                    title:"状态",
                    key:"enable",
                    align:"center",
                    width:90,
                    render: (h,params) => {
                        let a = params.row.enable == 1 ? "已发布" : "未发布";
                        let style = params.row.enable == 0 ? {color:'red'} : {};
                        return h('div', [
                        　　　　[
                        　　　　h('span', {
                        　　　　　　style,
                        　　　　　　}, a)
                        　　　　]
                        　　])
                    }
                },
                {
                    title:"操作",
                    align:"center",
                    width:130,
                    fixed:"right",
                    render: (h,params) => {
                        let item = params.row
                        let idelete = params.row.idelete
                        let name = idelete == 0 ? "下架" : "上架"
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(item)
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            "|",
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    style:{
                                        margin:'0 4' +'px'
                                    },
                                    on: {
                                        click: () => {
                                            if(idelete == 1) {
                                                this.topShelf(item)
                                            } else {
                                                this.bottomShelf(item)
                                            }
                                        }
                                    }
                                },
                                name
                            ),
                            "|",
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            this.roof(item)
                                        }
                                    }
                                },
                                "置顶"
                            )
                        ];
                    }
                }
            ]
        };
    },
    created() {
        this.type1 = isNaN(parseInt(this.$route.query.type1))?null:parseInt(this.$route.query.type1);
        this.type2 = isNaN(parseInt(this.$route.query.type2))?null:parseInt(this.$route.query.type2);
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/patient/index",
                title: "患者端运营"
            },
            {
                path: "/index/operation/contentmanagement_home",
                title: "内容管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        if (pageNo) {
            this.pageNo = Number(pageNo);
        }

        this.getContentData(this.pageNo,this.val,this.type1,this.type2);
    },
    methods: {
        // 添加新内容
        add() {
            let query = {
                pageNo: this.pageNo,
                type1: this.type1,
                type2: this.type2,
            };
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/contentmanagement_add",
                //公用方法
                query
            );
        },
        // 加载数据
        getContentData(pageNo, val, type, enable) {
            let params = {
                pageNo,
                pageSize: 10
            };
            params.title = Boolean(val) ? val : "";
            params.type = Boolean(type) ? type : "";
            params.enable = enable;
            this.$axios.post(api.contentWrap, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.contentSize = ret.count;
                    ret.list.forEach((item,index) => {
                        item.sum = this.addZeros(index);
                    })
                    this.tableList = ret.list;
                } else {
                    this.$Message.info("不允许访问");
                }
            });
        },
        // 分页器改变
        pageChange(index) {
            this.pageNo = index;
            this.getContentData(index, this.val, this.type1, this.type2);
        },
        //关键字查询列表
        search() {
            let type1 = this.type1;
            let type2 = this.type2;
            if (type1 == null) {
                type1 = "";
            }
            if (type2 == null) {
                type2 = "";
            }
            this.getContentData(1, this.val, type1, type2);
        },
        // 下架
        bottomShelf(item, index) {
            this.$axios
                .post(api.upWrap, {
                    id: item.articleId,
                    idelete: 1
                })
                .then(res => {
                    if (res.data.code) {
                        this.getContentData(
                            1,
                            this.val,
                            this.type1,
                            this.type2
                        );
                        this.$Message.info("操作成功");
                    } else {
                        this.$Message.info("操作失败,请重试");
                    }
                });
        },
        // 上架
        topShelf(item, index) {
            this.$axios
                .post(api.upWrap, {
                    id: item.articleId,
                    idelete: 0
                })
                .then(res => {
                    if (res.data.code) {
                        this.getContentData(
                            1,
                            this.val,
                            this.type1,
                            this.type2
                        );
                        this.$Message.info("操作成功");
                    } else {
                        this.$Message.info("操作失败,请重试");
                    }
                });
        },
        //置顶
        roof(item, index, event) {
            if (!Boolean(item.idelete)) {
                this.$axios
                    .post(api.root, {
                        priority: 1,
                        id: item.articleId
                    })
                    .then(res => {
                        if (res.data.code) {
                            this.getContentData(
                                1,
                                this.val,
                                this.type1,
                                this.type2
                            );
                            this.$Message.info("置顶成功");
                        } else {
                            this.$Message.info("置顶失败,请重试");
                        }
                    });
            } else {
                this.$Message.info("置顶失败,当前文章下架状态");
            }
        },
        //根据ID修改对应的新闻资讯
        edit(item) {
            let id = item.articleId;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/contentmanagement_edit",
                {
                    //公用方法
                    id,
                    pageNo: this.pageNo,
                    type1: this.type1,
                    type2: this.type2,
                }
            );
        }
    }
};
</script>

<style scoped lang = "less">
.contentHome {
    width: calc(100% - 20px);
    padding: 10px 0;
    margin: 0 auto;
    background: #fff;
    position: relative;
    height: 100vh;
    /*标题*/
    .contentHomeTitle {
        width: 100%;
        padding-left: 20px;
        background: #ccc;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid black;
        .homeBtn {
            text-align: center;
            width: 100px;
            height: 40px;
            color: #fff;
            line-height: 40px;
            float: right;
            margin-top: 5px;
            background: red;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-right: 30px;
            outline: none;
        }
    }
    .main {
        width: calc(100% - 20px);
        padding: 0 10px;
    }
    /*类型*/
    .homeSelect {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        /* justify-content: space-around; */
        align-items: center;
        .selectType {
            width: 200px;
            margin:0 10px;
            select {
                width: 80px;
            }
            span {
                margin-right: 15px;
            }
        }
        .search {
            width: 200px;
        }
        .submit {
            background: dodgerblue;
            padding: 5px 20px;
            border: none;
            outline: none;
            color: #fff;
        }
    }
    /*分页器*/
    .paging {
        width: 100%;
        margin: 10px auto;
        text-align: center;
    }
}
</style>