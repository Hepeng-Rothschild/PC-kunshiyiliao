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
                    v-show="status!=3"
                ></fourLevelLinkage>
                <Input
                    suffix="ios-search"
                    placeholder="输入主讲人或标题进行查询"
                    style="width: 200px"
                    v-model="search"
                    clearable
                    v-show="status != 3"
                />
                <Select v-model="liveStatus" style="width:130px" v-show="status ==1">
                    <Option
                        v-for="item in livexsList"
                        :value="item.id"
                        :key="item.id"
                        style='text-align:center'
                    >{{ item.name }}</Option>
                </Select>
                <Button type="primary" icon="ios-search" @click="searchInput" v-show="status!=3">查询</Button>
                <Button type='info' @click="add">新增</Button>
            </Col>
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
            isBack: 1,

            // 查询内容
            search: "",
            
            // 直播状态
            liveStatus:"",
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
            // tab状态
            status: 1,
            pageNo: 1,
            pageSize: 10,
            count: 10,
            // tab列表
            tabList: [
                {
                    title: "点播",
                    value: 2
                },
                {
                    title: "直播",
                    value: 1
                },
                {
                    title: "栏目",
                    value: 3
                },
                
            ],
            // 表头信息
            columns: [],
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
                    title: "直播状态",
                    key: "playStatus",
                    align: "center",
                    render:(h,params)=>{
                        let status = params.row.playStatus
                        let content = ""
                        this.livexsList.forEach(item=>{
                            if(Number(item.id)==Number(status)) {
                                content = item.name
                            }
                        })
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
                                            "/index/operation/liveMant/broadReview",
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
                    align: "center",
                    width:200,
                    render:(h,params) => {
                        let title = params.row.title
                        return h('span', {
                            style:{
                                display: 'inline-block',
                　　　　　　　　width: params.column._width*0.8+'px',
                　　　　　　　　overflow: 'hidden',
                　　　　　　　　textOverflow: 'ellipsis',
                　　　　　　　　whiteSpace: 'nowrap',
                            }
                        }, title)
                    }
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
                                                status: this.status,
                                                province: this.province,
                                                city: this.city,
                                                area: this.area,
                                                hospital: this.hospital,
                                                isBack:2,
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
            // 直播列表数据
            data1: [],
            // 模态框
            modal1: false,
            // 模态框输入值
            modalClass: {
                name: "",
                priority: null
            },
            // 模态框头部内容
            modalContent: "添加栏目",
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
                // path='/index/operation/liveMant/broadEdit'
            }
            this.functionJS.queryNavgationTo(
                    this,
                    path,
                    {
                        status: this.status,
                        pageNo: this.pageNo,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        hospital: this.hospital,
                        isBack:2,
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
            let params = {
                province: this.province,
                city: this.city,
                area: this.area,
                hospital: this.hospital,
                isBack:2,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                searchKey: this.search
            }
            this.data1 = [];
            this.count = 10
            
            if (Number(newVal) == 1) {
                // 直播
                this.columns = this.columns1;
                this.broadData();
            } else if (Number(newVal) == 2) {
                // 点播
                this.columns = this.live;
                this.liveData(params);
            } else if (Number(newVal) == 3) {
                // 栏目
                this.columns = this.modal;
                this.modalData();
            }
            
        },
        // 加载直播列表
        broadData(params) {
            let date = {
                provinceCode: this.province,
                cityCode: this.city,
                areaCode: this.area,
                hospitalId: this.hospital,
                pageNo: this.pageNo,
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
            let date = {
                provinceCode: this.province,
                cityCode: this.city,
                areaCode: this.area,
                hospitalId: this.hospital,
                pageNo: params.pageNo,
                pageSize: params.pageSize,
                searchKey: params.searchKey.trim()
            }
            this.$axios
                .post(api.lecturedemandpage, date)
                .then(resp => {
                    if (resp.data.success) {
                        let ret = resp.data.object.list;
                        ret.forEach((item, index) => {
                            item.iSum = this.addZeros(index);
                            this.livexsList.forEach(s => {
                                if(s.id == item.playStatus) {
                                    item.playStatus = s.name
                                }
                            })
                            item.videoSource = item.videoSource == 1 ? "网站地址" : "本地上传";
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
            this.pageNo = 1
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
