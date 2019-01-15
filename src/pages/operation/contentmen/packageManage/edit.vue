<template>
    <!--服务管理-->
    <div class="addManagement">
        <tmpHeader/>
        <div class="addManag">
            <h4 @click="btn" class="little-tittle">查看
                <Button class="editBtn" type="primary" v-if="!editFlag" @click="toEdit">编辑</Button>
                <Button class="editBtn" type="primary" v-if="editFlag" @click="toDetail">取消</Button>
            </h4>
            <div class="fuwu">
                <!--线上服务-->
                <div class="xsfw" v-for="(item,index) of allServerList">
                    <p>{{ item.name }}</p>
                    <!--第一行-->
                    <div class="select_wufu" ref="all">
                        <template v-if="editFlag">
                            <div v-for="(items,index) in item.child">
                                <input
                                    type="checkbox"
                                    :value="items.id"
                                    :checked="items.selected == 1"
                                    :data-id="items.id"
                                    :id="'a' + items.id"
                                >
                                <label :for="'a' + items.id">{{ items.menuName }}</label>
                            </div>
                        </template>
                        <template v-else-if="!editFlag">
                            <div v-if="items.selected == 1" v-for="(items,index) in item.child">
                                <label :for="'a' + items.id">{{ items.menuName }}</label>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <!--保存-->
            <div class="expert_save">
                <Button type="primary" @click="navto">保存</Button>
                <Button type="primary" @click="reback">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            arr: [],
            allServiceList: [
                {
                    name: "基础服务",
                    child: [
                        {
                            id: 4,
                            menuName: "咨询服务",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/zixunfuwu.png",
                            level: 1,
                            priority: 999,
                            shortcut: 0
                        },
                        {
                            id: 5,
                            menuName: "问诊服务",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/wenzhenfuwu.png",
                            level: 1,
                            priority: 998,
                            shortcut: 0
                        },
                        {
                            id: 6,
                            menuName: "复诊服务",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/fuzhenfuwu.png",
                            level: 1,
                            priority: 996,
                            shortcut: 0
                        },
                        {
                            id: 7,
                            menuName: "续方服务",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/xufangfuwu.png",
                            level: 1,
                            priority: 995,
                            shortcut: 0
                        },
                        {
                            id: 8,
                            menuName: "医生小组",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/yishengxiaozu.png",
                            level: 1,
                            priority: 994,
                            shortcut: 0
                        },
                        {
                            id: 9,
                            menuName: "处方审核",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/chufangshenhe.png",
                            level: 1,
                            priority: 993,
                            shortcut: 0
                        },
                        {
                            id: 10,
                            menuName: "用药咨询",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/yongyaozixun.png",
                            level: 1,
                            priority: 992,
                            shortcut: 0
                        },
                        {
                            id: 11,
                            menuName: "预约管理",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/yuyueguanli.png",
                            level: 1,
                            priority: 991,
                            shortcut: 0
                        },
                        {
                            id: 12,
                            menuName: "我的直播",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: "doctormenu/wodezhibo.png",
                            level: 1,
                            priority: 990,
                            shortcut: 0
                        },
                        {
                            id: 23,
                            menuName: "远程门诊",
                            remark: null,
                            prentId: 1,
                            function: "0",
                            menuicon: null,
                            level: 1,
                            priority: 956,
                            shortcut: 0
                        }
                    ]
                },
                {
                    name: "健康服务",
                    child: [
                        {
                            id: 13,
                            menuName: "签约服务",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/qianyuefuwu.png",
                            level: 1,
                            priority: 999,
                            shortcut: 0
                        },
                        {
                            id: 14,
                            menuName: "健康档案",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/jiankangdangan.png",
                            level: 1,
                            priority: 998,
                            shortcut: 0
                        },
                        {
                            id: 15,
                            menuName: "公卫服务",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/gongweifuwu.png",
                            level: 1,
                            priority: 997,
                            shortcut: 0
                        },
                        {
                            id: 16,
                            menuName: "健康宣教",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/jiankangxuanjiao.png",
                            level: 1,
                            priority: 996,
                            shortcut: 0
                        },
                        {
                            id: 17,
                            menuName: "履约计划",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/lvyuejihua.png",
                            level: 1,
                            priority: 995,
                            shortcut: 0
                        },
                        {
                            id: 18,
                            menuName: "履约执行",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/lvyuezhixing.png",
                            level: 1,
                            priority: 994,
                            shortcut: 0
                        },
                        {
                            id: 19,
                            menuName: "医患互动",
                            remark: null,
                            prentId: 2,
                            function: null,
                            menuicon: "doctormenu/yihuanhudong.png",
                            level: 1,
                            priority: 993,
                            shortcut: 0
                        }
                    ]
                },
                {
                    name: "日常工具",
                    child: [
                        {
                            id: 20,
                            menuName: "医学计算器",
                            remark: null,
                            prentId: 3,
                            function: null,
                            menuicon: "doctormenu/yixuejisuanqi.png",
                            level: 1,
                            priority: 999,
                            shortcut: 0
                        },
                        {
                            id: 21,
                            menuName: "用药指南",
                            remark: null,
                            prentId: 3,
                            function: null,
                            menuicon: "doctormenu/yongyaozhinan.png",
                            level: 1,
                            priority: 998,
                            shortcut: 0
                        },
                        {
                            id: 22,
                            menuName: "发布消息",
                            remark: null,
                            prentId: 3,
                            function: null,
                            menuicon: "doctormenu/fabuxiaoxi.png",
                            level: 1,
                            priority: 997,
                            shortcut: 0
                        }
                    ]
                }
            ],
            docServiceList: [
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                13,
                14,
                16,
                17,
                18,
                19,
                23
            ],
            id: sessionStorage.getItem("hospitalId"),
            editFlag: false
        };
    },
    components: {
        tmpHeader
    },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/mechanism/index",
                title: "机构运营"
            },
            {
                path: "/index/operation/home",
                title: "机构管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
    methods: {
        toEdit() {
            this.editFlag = true;
        },
        toDetail() {
            this.editFlag = false;
        },
        btn() {},
        navto() {
            let wrap = document.getElementsByClassName("addManag")[0];
            let el = wrap.getElementsByTagName("input");
            let len = el.length;
            let arr = [];
            for (let i = 0; i < len; i++) {
                if (el[i].checked) {
                    arr.push(el[i].getAttribute("data-id"));
                }
            }

            this.$axios
                .post(api.setserver, {
                    hospitalId: this.id,
                    ids: arr
                })
                .then(res => {
                    if (res.data.code) {
                        this.$Message.info("修改成功");
                        setTimeout(() => {
                            this.$router.push({
                                path: "/index/operation/servicePackage/list"
                            });
                        }, 500);
                    }
                });
        },
        reback() {
            this.$router.push({
                path: "/index/operation/servicePackage/list"
            });
        }
    },
    mounted() {
        this.id = this.$route.query.id;
        this.$axios
            .post(api.doctorServerManage)
            .then(resp => {
                if (resp.data.success) {
                    let tmpData = resp.data.object;
                    // this.allServiceList = tmpData;
                }
            })
            .catch(err => {
                console.log(err);
            });
        let param = {};
        param.doctorId = this.id;
        this.$axios
            .post(api.doctorServerManageById, param)
            .then(resp => {
                // this.docServiceList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 数据更新后的DOM结构
    updated() {
        let wrap = document.getElementsByClassName("addManag")[0];
        let el = wrap.getElementsByTagName("input");
        let len = el.length;
        let arr = [];
        for (let i = 0; i < len; i++) {
            if (el[i].checked) {
                arr.push(el[i]);
            }
        }
    },
    computed: {
        allServerList() {
            for (let i = 0; i < this.allServiceList.length; i++) {
                //循环获取child
                for (let j = 0; j < this.allServiceList[i].child.length; j++) {
                    //循环child对比id
                    let index = this.docServiceList.indexOf(
                        this.allServiceList[i].child[j].id
                    );
                    if (index != -1) {
                        this.allServiceList[i].child[j].selected = 1;
                    } else {
                        this.allServiceList[i].child[j].selected = 0;
                    }
                }
            }
            return this.allServiceList;
        }
    }
};
</script>

<style scoped lang="less">
.addManagement {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .addManag {
        display: flex;
        flex-direction: column;
        padding: 20px;
        h4 {
            padding-left: 4px;
            border-left: 2px solid blue;
        }
        .fuwu {
            width: calc(100% - 100px);
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid rgb(242, 242, 242);
            .xsfw {
                margin: 10px 0;
                .select_wufu {
                    margin: 0 30px;
                    display: flex;
                    flex-direction: row;
                    padding: 14px 20px;
                    align-items: center;
                    flex-wrap: wrap;
                    div {
                        width: 20%;
                        margin: 10px 20px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        input {
                            outline: none;
                            border: none;
                        }
                        label {
                            user-select: none;
                        }
                    }
                }
            }
        }
        .expert_save {
            width: 200px;
            height: 50px;
            margin: 10px auto;
        }
        .little-tittle {
            position: relative;
            .editBtn {
                position: absolute;
                right: 30px;
            }
        }
    }
}
</style>