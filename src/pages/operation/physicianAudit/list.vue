<template>
    <div class="physicianAudit">
        <!-- 查询内容 -->
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
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin:20px 0;">
            <Col span="24">
            <fourLevelLinkage
                    @changeProvince="changeProvince"
                    @changeCity="changeCity"
                    @changeArea="changeArea"
                    @changeHospital="changeHospital"
                    :province="province"
                    :city="city"
                    :area="area"
                    :hospital="hospital"
                    :isBack="isBack"
                ></fourLevelLinkage>
                <Select v-model="liveStatus" style="width:160px" v-show='status==1' clearable>
                    <Option
                        v-for="item in livexsList"
                        :value="item.id"
                        :key="item.id"
                        style='text-align:center;'
                    >{{ item.name }}</Option>
                </Select>
                <Input
                    suffix="ios-search"
                    placeholder="输入主讲人审核人或标题进行查询"
                    style="width: 230px"
                    v-model="search"
                    clearable
                />
                <Button type="primary" icon="ios-search" @click="searchInput">查询</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="data1"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change='loadingDate' style="margin-top:10px;"/>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    components:{
        fourLevelLinkage
    },
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack:1,

            search: "",
            columns:[],
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
                            return h("img", {
                                attrs: {
                                    src: avatar || "",
                                    style: "width:40px;height:40px;"
                                }
                            })
                        } else {
                            return h("span", {
                                attrs:{
                                    style:"color:gray;"
                                }
                            },'暂无图片')
                        }
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
                                                province: this.province,
                                                city: this.city,
                                                area: this.area,
                                                hospital: this.hospital,
                                                isBack:2,
                                                status:this.status
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
            status: 2,
            tabList: [
                 {
                    title: "点播",
                    value: 2
                },
                {
                    title: "直播",
                    value: 1
                },
            ],
            data1: [],
            count: 10,
            pageNo: 1,
            pageSize: 10,
            // 状态列表
            livexsList:[
                {
                    id:"1",
                    name:"待审核"
                },
                {
                    id:"2",
                    name:"审核通过"
                },
                {
                    id:"3",
                    name:"审核未通过"
                },
                {
                    id:"4",
                    name:"下架"
                },
                {
                    id:"5",
                    name:"正在直播"
                },
                {
                    id:"6",
                    name:"已完成"
                },
                {
                    id:"7",
                    name:"已撤回"
                },
                {
                    id:"8",
                    name:"已关闭"
                }
            ],
            liveStatus:"",
            verify: [
                {
                    title: "编号",
                    key: "iSum",
                    align: "center"
                },
                {
                    title: "直播标题",
                    key: "title",
                    align: "center"
                },
                {
                    title: "主播医生",
                    key: "doctorName",
                    align: "center"
                },
                {
                    title: "所在医院",
                    key: "hospitalName",
                    align: "center"
                },
                {
                    title: "直播状态",
                    key: "playStatus",
                    align: "center",
                    render:(h,params)=>{
                        let status = params.row.playStatus
                        let content = ""
                        this.livexsList.forEach(item=>{
                            if(Number(item.id)==Number(status)) {
                                content=item.name
                            }
                        })
                        return h('span',{

                        },content)
                    }
                },
                {
                    title: "预计直播时间",
                    key: "aboutStartTime",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 60,
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
                                            "/index/operation/physicianAudit/liveReview",
                                            {
                                                province: this.province,
                                                city: this.city,
                                                area: this.area,
                                                hospital: this.hospital,
                                                isBack:2,
                                                id,
                                                pageNo: this.pageNo,
                                                status: this.status,
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
        };
    },
    created() {
        this.province = this.$route.query.province
            ? parseInt(this.$route.query.province)
            : null;
        this.city = this.$route.query.city
            ? parseInt(this.$route.query.city)
            : null;
        this.area = this.$route.query.area
            ? parseInt(this.$route.query.area)
            : null;
        this.hospital = this.$route.query.hospital
            ? parseInt(this.$route.query.hospital)
            : null;
        this.isBack = this.$route.query.isBack
            ? parseInt(this.$route.query.isBack)
            : 1;
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
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
        this.status = query.status ? query.status : 2
        this.statusChange(this.status);
    },
    methods: {
        changeProvince(val) {
            this.province = val;
        },
        changeCity(val) {
            this.city = val;
        },
        changeArea(val) {
            this.area = val;
        },
        changeHospital(val) {
            this.hospital = val;
        },
        searchInput() {
            this.statusChange(this.status);
        },
        // 加载点播数据
        liveData(params) {
            this.$axios
                .post(api.lecturedemandpagebyexaminelist, {
                    provinceCode: this.province,
                    cityCode: this.city,
                    areaCode: this.area,
                    hospitalId: this.hospital,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    searchKey: params.searchKey ? params.searchKey.trim() : params.searchKey,

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
        },
        // 加载直播数据
        verifyData (params) {
            this.data1 = []
             // 加载直播列表
            this.$axios.post(api.livelist, {
                provinceCode: this.province,
                cityCode: this.city,
                areaCode: this.area,
                hospitalId: this.hospital,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                searchKey: this.search,
                playStatus:this.liveStatus
            }).then(res => {
                if(res.data.success) {
                    let ret = res.data.object
                    ret.list.forEach((item, index) => {
                        item.iSum = this.addZeros(index);
                    });
                    this.count = ret.count
                    this.data1 = ret.list
                }
            })
        },
        statusChange (newVal) {
            this.data1 = []
            if(newVal==2) {
                this.columns = this.live
                this.liveData({ pageNo: this.pageNo, pageSize: this.pageSize });
            } else if(newVal==1) {
                this.columns = this.verify
                this.verifyData({ pageNo: this.pageNo, pageSize: this.pageSize })
            }

        },
        // 分页器改变加载数据
        loadingDate (index) {
            this.pageNo = index;
            this.statusChange(this.status);
        },
    },
    // 监听status   tab页的变化
    watch: {
        status(newVal, oldVal) {
            this.pageNo = 1
            this.statusChange(newVal);
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
