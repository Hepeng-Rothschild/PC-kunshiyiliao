<template>
    <div class = 'list'>
        <header>
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
            <Input v-model="searchKey" placeholder="请输入医疗团队名称" style="width: 300px;margin:0 10px;"/>
            <Button type="default" @click='search'>查询</Button>
            <Button type="warning" @click="goAdd" style='margin-left:10px;'>新增医生工作组</Button>
        </header>
        <Table stripe :columns="columns1" :data="doctorList"></Table>
        <Page :total="count" :current="pageNo" :pageSize="pageSize" @on-change='pageChange' style='margin-top:10px;text-align:center;'/>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    components:{
        fourLevelLinkage
    },
    data () {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,

            searchKey:"",
            pageNo:1,
            pageSize:10,
            count:10,
            columns1:[
                {
                    title:"序号",
                    align:"center",
                    key:"sum",
                    width:100
                },
                {
                    title:"所在医院",
                    align:"center",
                    key:"hospitalName",
                    width:120
                },
                {
                    title:"科室",
                    align:"center",
                    key:"deptName",
                    width:120
                },
                {
                    title:"医疗团队名称",
                    align:"center",
                    key:"teamName",
                    width:120
                },
                {
                    title:"团队类型",
                    align:"center",
                    key:"teamType",
                    width:120
                },
                {
                    title:"团队负责人",
                    align:"center",
                    key:"teamLeader",
                    width:120
                },
                {
                    title:"团队人数",
                    align:"center",
                    key:"teamNum",
                    width:100
                },
                {
                    title:"团队电话",
                    align:"center",
                    key:"teamPhone",
                    width:120
                },
                {
                    title:"团队签约数",
                    align:"center",
                    key:"teamSigningNum",
                    width:100
                },
                {
                    title:"排序",
                    align:"center",
                    key:"priority",
                    width:100
                },
                {
                    title:"操作",
                    align:"center",
                    fixed:"right",
                    width:100,
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
                                            this.functionJS.queryNavgationTo(
                                                this,
                                                "/index/operation/doctorReview",
                                                {
                                                    pageNo: this.pageNo,
                                                    province: this.province,
                                                    city: this.city,
                                                    area: this.area,
                                                    hospital:this.hospital,
                                                    isBack: 2,
                                                    id:id
                                                }
                                            );
                                        }
                                    }
                                },
                                "查看"
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
                                            this.functionJS.queryNavgationTo(
                                                this,
                                                "/index/operation/doctorEdit",
                                                {
                                                    pageNo: this.pageNo,
                                                    province: this.province,
                                                    city: this.city,
                                                    area: this.area,
                                                    hospital:this.hospital,
                                                    isBack: 2,
                                                    id:id
                                                }
                                            );
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ];
                    }
                },

            ],
            doctorList:[]
        }
    },
    created(){
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
    mounted() {
        this.loadDoctorGroup(this.pageNo);
    },
    methods:{
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
        // 添加新小组
        goAdd () {
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/doctorAdd",
                {
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital:this.hospital,
                    isBack: 2
                }
            );
        },
        // 分布页码改变
        pageChange (index) {
            this.loadDoctorGroup(index)
        },
        // 关键字查询
        search () {
            this.loadDoctorGroup(1)
        },
        loadDoctorGroup(pageNo){
           this.pageNo = pageNo;
            var params = {};
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.searchKey = this.searchKey ? this.searchKey : null;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log(params);
            
            this.$axios.post(api.teamlist,params).then(res => {
                console.log(res);
                if(res.data.success) {
                    let ret = res.data.object
                    ret.list.forEach((item, index) =>{
                        item.sum = this.addZeros(index)
                        item.teamType = item.teamType == 1? "家医签约团队" : "出院随访签约团队"
                    })
                    this.doctorList = ret.list
                    this.count = ret.count;
                }
                
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .list{
        margin-left: 1%;
        padding: 10px;
        width: 98%;
        background: #ffffff;
        box-sizing: border-box;
        header{
            display:flex;
            flex-direction:row;
            align-items:center;
            margin-bottom:10px;

        }
    }
</style>
