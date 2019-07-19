<template>
    <div class = 'livemant'>
        <!-- 查询内容 -->
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin-top:20px;">
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
                <Input
                    suffix="ios-search"
                    placeholder="输入主讲人或标题进行查询"
                    style="width: 200px"
                    v-model="search"
                    clearable
                />
                <Select v-model="liveStatus" style="width:130px" >
                    <Option
                        v-for="item in livexsList"
                        :value="item.id"
                        :key="item.id"
                        style='text-align:center'
                    >{{ item.name }}</Option>
                </Select>
                <Button type="primary" icon="ios-search" @click="broadData(1)" >查询</Button>
            </Col>
        </Row>
        <!-- 表格列表 -->
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin-top:20px;">
            <Col span="24">
                <Table stripe :columns="columns1" :data="data1"></Table>
            </Col>
        </Row>
        <!-- 页码 -->
        <Page
            :total="count"
            :current="pageNo"
            :page-size="pageSize"
            style="margin-top:10px;text-align:center;"
            @on-change="loading"
        />
    </div>
</template>
<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
// 直播转换点播列表
export default {
    components: {
        fourLevelLinkage
    },
    data () {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,
            // 分页相关
            pageNo: 1,
            pageSize: 10,
            count: 10,
            // 查询内容
            search: "",
            // 直播形式
            liveListForm: [
                {
                    id:"0",
                    name:"轻直播"
                },
                {
                    id:"1",
                    name:"语音直播"
                },
                {
                    id:"2",
                    name:"视频直播"
                },
            ],
            // 直播列表
            columns1: [
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
                    title: "直播类型",
                    key: "liveForm",
                    align: "center",
                    render:(h,params)=>{
                        let status = params.row.liveForm
                        let content = ""
                        this.liveListForm.forEach(item => {
                            if(Number(item.id) == Number(status)) {
                                content = item.name
                            }
                        })
                        return h('span', {

                        }, content)
                    }
                },
                {
                    title: "当前状态",
                    key: "playStatus",
                    align: "center",
                    render:(h,params) => {
                        let status = params.row.playStatus
                        let content = ""
                        // this.livexsList.forEach(item => {
                        //     if(Number(item.id)==Number(status)) {
                        //         content = item.name
                        //     }
                        // })
                        return h('span', {

                        }, content)
                    }
                },
                {
                    title: "直播时间",
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
                                            "/index/operation/liveTransition/review",
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
            // 直播列表数据
            data1: [],
        }
    },
    created () {
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
                path: "/index/operation/liveTransition/list",
                title: "直播录制"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        this.broadData(1)
    },
    methods:{
        // 加载直播列表
        broadData(pageNo) {
            this.pageNo = pageNo
            let date = {
                provinceCode: this.province,
                cityCode: this.city,
                areaCode: this.area,
                hospitalId: this.hospital,
                pageNo,
                pageSize: this.pageSize,
                searchKey: this.search,
                playStatus:this.liveStatus
            }
            this.$axios.post(api.livelist, date).then(res => {
                if(res.data.success) {
                    let ret = res.data.object
                    ret.list.forEach((item, index) => {
                        item.iSum = this.addZeros(index);
                    });
                    this.count = ret.count
                    console.log(ret);
                    this.data1 = ret.list
                }
            })
        },
        // 分页器改变获取数据
        loading(index) {
            this.broadData(index);
        }
    }
    
}
</script>
<style lang="less" scoped>
.livemant {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>
