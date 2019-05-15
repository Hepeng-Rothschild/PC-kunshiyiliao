<template>
    <div class = 'review'>
        <div class="main">
            <div class = 'text'>
                <span>医疗团队名称：</span>
                <span>{{ params.teamName }}</span>
            </div>
            <div class = 'text'>
                <span>医疗团队类型：</span>
                <span>{{ params.teamType ==1? "家医签约团队" : "出院随访签约团队" }}</span>
            </div>
            <div class = 'text'>
                <span>医疗团队电话：</span>
                <span>{{ params.teamPhone }}</span>
            </div>
            <div class = 'text'>
                <span>医院名称：</span>
                <span>{{ params.hospitalName }}</span>
            </div>
            <div class = 'text'>
                <span>科室名称：</span>
                <span>{{ params.deptName }}</span>
            </div>
            <div class = 'text'>
                <span>排序：</span>
                <span>{{ params.priority }}</span>
            </div>
            <div class = 'adminScope'>
                <span>医疗团队管理范围：</span>
                <span>{{ params.teamControlLimit }}</span>
            </div>
            <div class = 'adminScope'>
                <span>医疗团队备注：</span>
                <span>{{ params.teamRemark }}</span>
            </div>
            <div class = 'adminScope'>
                <span>是否启用：</span>
                <span>{{ params.status ==1? "是" :"否"}}</span>
            </div>
            <div class = 'adminScope'>
                <p>医疗团队中的医护人员</p>
                <Table stripe :columns="addMember" :data="addMemberDate"></Table>
            </div>
        </div>
        <Button @click='reback'>返回上一页</Button>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data () {
        return {
            // 医护人员列表
            addMember: [
                {
                    title:"序号",
                    align:"center",
                    key:"sum"
                },
                 {
                    title:"医生姓名",
                    align:"center",
                    key:"doctorName"
                },
                {
                    title:"科室",
                    align:"center",
                    key:"deptName"
                },
                {
                    title:"职称",
                    align:"center",
                    key:"title"
                },
                {
                    title:"联系电话",
                    align:"center",
                    key:"doctorPhone"
                },
                {
                    title:"团队角色",
                    align:"center",
                    key:"sum",
                    render:(h,params)=>{
                        let row = params.row;
                        let role = row.role ==1 ? "队长" : "其他"
                        return [
                            h('span',{
                                
                            }, role)
                        ]
                    }
                },
            ],
            addMemberDate: [],
            params: {}
        }
    },
    created () {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/docrorGroup",
                title: "医生工作组"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        let id = this.$route.query.id;
        this.$axios.post(api.teamquery, {
            id
        }).then(res => {
            if(res.data.success) {
                let ret = res.data.object;
                this.params = ret
                console.log(ret);
                ret.list.forEach((item,index) => {
                    item.sum = this.addZeros(index)
                })
                this.addMemberDate = ret.list
            }
        }).catch(err => {
            this.$Message.error("加载团队信息失败")
        })
    },
    methods:{
        // 返回上一页
        reback () {
            let query = this.$route.query
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/doctorGroup",
                {
                    pageNo:query.pageNo ? parseInt(query.pageNo): 1,
                    province: query.province ? parseInt(query.province): "",
                    city: query.city ? parseInt(query.city): "", 
                    area: query.area ? parseInt(query.area): "",
                    hospital: query.hospital ? parseInt(query.hospital): "",
                    isBack: 2
                }
            );
        }
    }
}
</script>
<style lang="less" scoped>
    .review{
        margin-left: 1%;
        padding: 10px;
        width: 98%;
        background: #ffffff;
        box-sizing: border-box;
        .main{
            display:flex;
            flex-direction:row;
            flex-wrap: wrap;
            .text{
                margin:10px 0;
                width:25%;
            }
            .adminScope{
                margin:10px 0;
                width:100%;
            }
        }
    }
</style>
