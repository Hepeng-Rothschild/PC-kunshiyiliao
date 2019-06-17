<template>
    <div class="list">
        <header style='margin:5px 0;'>
            <Input
                v-model.trim="searchKey"
                placeholder="输入名称进行查询"
                style="width: 260px"
                clearable
            />
            <Button type="primary" icon="ios-search" @click="getTabList(1)">查询</Button>
            <Button type="info" @click='addInterface'>新增用户</Button>
        </header>
        <div class='main'>
            <Table size="small" :columns="list" :data="data1" stripe></Table>
                <Page
                    :total="count"
                    :current="pageNo"
                    :page-size="pageSize"
                    @on-change="loadPage"
                    style="margin-top:20px;text-align:center;"
                />
        </div>
        <Modal
            v-model="ModalStatus"
            footer-hide
            width='500'
            :title="ModalTitle">
            <p style='word-break:break-all;'>{{ ModalContent }}</p>
        </Modal>
            
    </div>
</template>
<script>
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            count: 10,
            pageNo: 1,
            pageSize: 10,
            list: [
                {
                    title: "编号",
                    key: "num",
                    align: "center",
                },
                {
                    title: "公司名称",
                    key: "corporateName",
                    align: "center",
                },
                {
                    title: "用途",
                    key: "purpose",
                    align: "center",
                },
                {
                    title: "aesKey",
                    key: "aesKey",
                    align: "center",
                    width: 130,
                    render : (h,params) => {
                        let aes = params.row.aesKey;
                        return h('div', [
                    　　　　[
                    　　　　h('a', {
                    　　　　　　style: {
                    　　　　　　　　display: 'inline-block',
                    　　　　　　　　width: params.column._width*0.8+'px',
                    　　　　　　　　overflow: 'hidden',
                    　　　　　　　　textOverflow: 'ellipsis',
                    　　　　　　　　whiteSpace: 'nowrap',
                    　　　　　　},
                                on: {
                                    click :() =>{
                                        this.showModal("查看aesKey",aes) 
                                    }
                                }
                    　　　　　　}, aes)
                    　　　　]
                    　　])
                    }
                },
                {
                    title: "token",
                    key: "token",
                    align: "center",
                    width: 130,
                    render:(h,params) => {
                        let token = params.row.token;
                        return h('div', [
                    　　　　[
                    　　　　h('a', {
                    　　　　　　style: {
                    　　　　　　　　display: 'inline-block',
                    　　　　　　　　width: params.column._width*0.8+'px',
                    　　　　　　　　overflow: 'hidden',
                    　　　　　　　　textOverflow: 'ellipsis',
                    　　　　　　　　whiteSpace: 'nowrap',
                    　　　　　　},
                                on: {
                                    click :() =>{
                                        this.showModal("查看token",token) 
                                    }
                                }
                                
                    　　　　　　}, token)
                    　　　　]
                    　　])
                    }
                },
                {
                    title: "访问用户名",
                    key: "userName",
                    align: "center",
                },
                {
                    title: "操作",
                    align: "center",
                    render: (h,params) => {
                        let a = params.row.id
                        return h('div', [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.editInterface(a)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                },
            ],
            data1: [],
            searchKey: "",
            // 弹窗相关
            ModalStatus: false,
            ModalTitle: "aesKey",
            ModalContent:""

        };
    },
    created() {
         let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/nterfaceManagement/list",
                title: "接口管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        this.pageNo = Boolean(pageNo) ? pageNo : 1;
        this.getTabList(this.pageNo)
    },
    methods: {
        // 生成访问随机码
        generationCode(num) {
            let arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
            let result = [];
            for (let i = 0; i < num; i++) {
                let random = Math.floor(Math.random()*62)
                if(result.length < num) {
                    result.push(arr[random])
                }
            }
            return result.join('')
            // console.log('result', result);
        },
        // 分页器改变
        loadPage (index) {
            this.pageNo = index;
            console.log(index);
            this.getTabList(index)
        },
        showModal(title, content) {
            this.ModalStatus =  true
            this.ModalTitle = title
            this.ModalContent = content
        },
        // 加载列表数据
        getTabList (pageNo) {
            let url = api.apiservicepage
            let params = {
                pageNo,
                pageSize: this.pageSize,
                searchKey: ''
            }
            this.searchKey == '' ? params.searchKey = null : params.searchKey = this.searchKey
            console.log("接口管理请求参数",params);
            this.$axios.post(url, params).then(res => {
                if (res.data.success) {
                    let ret = res.data.object;
                    console.log(ret.list);
                    this.count = ret.count;
                    ret.list.forEach((item,index) => {
                        item.num = this.addZeros(index)
                    })
                    this.data1 = ret.list;

                } else {
                    this.$Message.info("加载列表数据失败")
                }
            })
        },
        // 跳转新增界面
        addInterface () {
            this.functionJS.queryNavgationTo(this, "/index/maintain/nterfaceManagement/add", {
                pageNo: this.pageNo
            });
        },
        // 跳转至编辑
        editInterface(id) {
            let path = '/index/maintain/nterfaceManagement/edit'
            let query = {
                pageNo: this.pageNo,
                id
            }
            this.functionJS.queryNavgationTo(this, path, query);
        }
    }
};
</script>
<style lang="less" scoped>
.list {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>
