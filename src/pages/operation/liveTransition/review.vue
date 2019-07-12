<template>
    <div class = 'review'>
        <header>
            <div style='float:right;'>
                <Button type="primary">转换点播</Button>
                <Button type="info" v-show = 'data1.length > 1'>合并分片</Button>
                <Button @click='back'>返回</Button>
            </div>
            <h2>直播录制</h2>
        </header>
        <div class = 'info'>
            <span>直播医生：{{ params.doctorName }}</span>
            <span>所在医院：{{ params.doctorTime }}</span>
            <span>直播标题：{{ params.doctorTitle }}</span>
            <span>当前状态：{{ params.doctorStatus }}</span>
        </div>
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin-top:20px;">
            <Col span="24">
                <h3 style='font-weight:bold;margin:10px 0;'>分页列表：</h3>
                <Table stripe :columns="columns1" :data="data1"></Table>
            </Col>
        </Row>
        
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data () {
        return {
            params: {
                doctorName: "",
                doctorTitle: "",
                doctorStatus: "",
                doctorTime: ""
            },
            columns1: [
                {
                    title:"序号",
                    key:"name",
                    align:"center",
                },
                {
                    title:"分片名称",
                    key:"name",
                    align:"center",
                },
                {
                    title:"分片大小",
                    key:"name",
                    align:"center",
                },
                {
                    title:"生成时间",
                    key:"name",
                    align:"center",
                }
            ],
            data1: []
        }
    },
    created () {
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
        this.loadingDetail();
    },
    methods: {
        back () {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/liveTransition/list",
                query
            );
        },
        loadingDetail() {
            let query = this.$route.query;
            let url = ''
            let params = {
                id: query.id
            }
            console.log(url);
            console.log(params);
            return ""
            this.$axios.post(url, params).then(res => {
                if(res.data.success) {
                    let ret = res.data;



                } else {
                    this.$Message.error("加载直播详情失败")
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.review {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    font-size:12px;
    .info {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-around;
        margin-top:20px;
        flex-wrap:wrap;
        span {
            display:inline-block;
            width:20%;
            line-height:40px;
            text-align:center;
        }
    }
}
</style>
