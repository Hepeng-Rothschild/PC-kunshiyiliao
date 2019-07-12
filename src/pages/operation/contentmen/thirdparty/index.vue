<template>
    <div class="thirdPart">
        <tmpHeader/>
        <div class="main">
            <checkboxs
                :listMap="list"
                :checkList="iSelection"
                :title="item.name"
                @selectChange="patternChange"
                :id="item.id"
                @selectHome="lisPatternHome"
                v-for='item,index in HospitalThirdpartyEnum'
                :key='index'
            ></checkboxs>
            <!-- 服务类型添加框 -->
            <Modal
                v-model="registerFlag"
                :title="modalTitle"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')"
                :mask-closable="false"
            >
                <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                >
                    <!-- 服务路径 -->
                    <div class="main_info">
                        <FormItem label="服务路径" prop="serviceUrl">
                            <Input
                                v-model="formValidate.serviceUrl"
                                placeholder="请输入服务路径"
                                style="width:230px;"
                            ></Input>
                        </FormItem>
                    </div>
                    <!-- 第三方参数 -->
                    <div class="main_info">
                        <FormItem label="第三方参数">
                            <Input
                                v-model="formValidate.requestVal"
                                placeholder="请输入第三方参数"
                                style="width:230px;"
                            ></Input>
                        </FormItem>
                    </div>
                    <!-- 第三方厂家 -->
                    <div class="main_info">
                        <FormItem label="第三方厂家" prop="thirdValue">
                            <Select v-model="formValidate.thirdValue" style="width:230px;">
                                <Option
                                    v-for="(item,index) in thirdList"
                                    :value="item.code"
                                    :key="index"
                                    style='text-align:center;'
                                >{{ item.className }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <!-- 是否开启 -->
                    <div class="main_enable">
                        <FormItem label="是否启用">
                            <iSwitch v-model="formValidate.enable" size="large">
                                <span slot="open">启用</span>
                                <span slot="close">禁用</span>
                            </iSwitch>
                        </FormItem>
                    </div>
                </Form>
            </Modal>
            <Table stripe :columns="columns1" :data="HospitalThirdpartyList" style='margin-top:20px;'></Table>
        </div>
        <Button type="primary" @click='saveChage'>保存</Button>
    </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
    components: {
        tmpHeader,
        checkboxs: {
            template:
                "<div class = 'main_yy' style='align-items:center;width:100%;'>" +
                "<span class = 'main_yy_name' style='margin-right:10px;min-width:200px;text-align:right;' v-show='title'>{{ title }}</span>" +
                "<CheckboxGroup v-model='arr' @on-change='checkAllGroupChange' >" +
                "<Checkbox v-for='item,index in listMap' :key='index' :label='item.id'>{{ item.name }}</Checkbox>" +
                "</CheckboxGroup>" +
                "<Button type='primary' style='margin-left:30px;' @click='selectHome' v-show='arr.length'>选择厂家</Button>" +
                "</div>",
            props: {
                listMap: {
                    type: Array,
                    default: []
                },
                checkList: {
                    type: Array,
                    default: []
                },
                title: {
                    type: String,
                    default: ""
                },
                id: {
                    type: String,
                    default: ""
                }
            },
            data() {
                return {
                    arr: []
                };
            },
            created() {
                this.checkList.forEach(item => {
                    if(parseInt(item.serviceType) == parseInt(this.id)) {
                        item.serviceValue.split(",").forEach(item=>{
                            if(Boolean(item)) {
                                this.arr.push(item)
                            }
                        })
                    }
                })
            },
            methods: {
                checkAllGroupChange(i) {
                    let selectArr = i.join(",")
                    this.$emit("selectChange", selectArr,this.id);
                },
                // 选择厂家
                selectHome() {
                    this.$emit("selectHome", this.id);
                }
            }
        }
    },
    data() {
        return {
            //  左侧服务类型
            HospitalThirdpartyEnum:{},
            //  选中的服务
            iSelection:[],
            // 右侧服务列表
            list: [],
            // modal数据
            registerFlag: false,
            modalTitle: "添加服务",
            formValidate: {
                serviceName: "",
                serviceUrl: "",
                requestVal: "",
                thirdValue: "",
                enable: ""
            },
            // 表单验证条件
            ruleValidate: {
                serviceName: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入服务名称",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                // e服务路径
                serviceUrl: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请输入服务路径",
                        // 触发事件
                        trigger: "blur"
                    }
                ],
                // 第三方厂家
                thirdValue: [
                    {
                        // 是否校验
                        required: true,
                        // 提示文字
                        message: "请选择第三方厂家",
                        // 触发事件
                        trigger: "blur"
                    },
                ]
            },
            serviceTypeValue: "",
            // 已经添加的列表
            AddserviceList: [],
            // 第三方厂家列表
            thirdList: [],
            // 医院Id
            id: sessionStorage.getItem("hospitalId"),
            // 表头数据
            columns1: [
                {
                    title: "服务名称",
                    align: "center",
                    key:"serviceName",
                    width: 150,
                    render: (h, params) => {
                        let name = params.row;
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        display: "inline-block",
                                        width:
                                            params.column._width * 0.8 + "px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                },
                                name.serviceName
                            )
                        ]);
                    }
                },
                {
                    title: "服务路径",
                    align: "center",
                    key: "serviceUrl",
                    width: 150,
                    render: (h, params) => {
                        let name = params.row;
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        display: "inline-block",
                                        width:
                                            params.column._width * 0.8 + "px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                },
                                name.serviceUrl
                            )
                        ]);
                    }
                },
                {
                    title: "第三方参数",
                    align: "center",
                    width: 150,
                    key:"requestVal",
                    render: (h, params) => {
                        let name = params.row;
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        display: "inline-block",
                                        width:
                                            params.column._width * 0.8 + "px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                },
                                name.requestVal
                            )
                        ]);
                    }
                },
                {
                    title:"第三方厂家",
                    align:'center',
                    key:"className",
                    width: 150,
                    render: (h, params) => {
                        let name = params.row;
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        display: "inline-block",
                                        width:
                                            params.column._width * 0.8 + "px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                },
                                name.className
                            )
                        ]);
                    }
                },
                {
                    title:"状态",
                    align:'center',
                    key:"enable",
                    render: (h, params) => {
                        let name = params.row;
                        let status = Boolean(name.enable) ? "禁用" :"启用"
                        return h("div", [
                            h(
                                "span",{},
                                status
                            )
                        ]);
                    }
                },
                {
                    title: "操作",
                    align: "center",
                    render: (h, params) => {
                        let a = params.row;
                        return h("div", [
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.lisPatternHome(a.serviceType)
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ]);
                    }
                }
            ],
            HospitalThirdpartyList: []
            
        };
    },
    created () {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/mechanism/index",
                title: "机构运营"
            },
            {
                path: "/index/operation/thirdParty",
                title: "第三方服务"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
      this.loadingData();
    },
    methods: {
        // 选中的数据
        patternChange(list,id) {
            let flag = true;
            this.iSelection.forEach((item,index) => {
                if(parseInt(item.serviceType) == parseInt(id)) {
                    if (!Boolean(list)) {
                        this.iSelection.splice(index, 1)
                    } else {
                        item.serviceValue = list
                    }
                    flag = false;
                }
            })
            if (flag) {
                this.iSelection.push({
                    serviceType: id,
                    serviceValue: list,
                    hospitalId: parseInt(this.id)
                })
            }
        },
        // 选择厂家逻辑
        lisPatternHome(id) {
            if (Boolean(id)) {
                this.serviceTypeValue = id;
                this.registerFlag = true;
                this.modalTitle = '编辑服务'
                let items = {};
                // 循环已有的列表  查看是否已经添加过
                this.HospitalThirdpartyList.forEach(item => {
                    if (Number(item.serviceType) == Number(id)) {
                        items = item;
                    }
                });
                if (items.serviceName) {
                    this.serviceTypeValue = items.serviceType;
                    this.formValidate.serviceName = items.serviceName;
                    this.formValidate.requestVal = items.requestVal;
                    this.formValidate.serviceUrl = items.serviceUrl;
                    this.formValidate.thirdValue = String(items.thirdpartyEnum);
                    this.formValidate.enable = !Boolean(items.enable);
                }
                // 请求第三方厂家列表
                this.$axios
                    .post(api.hospitalgetenummap, {
                        parent: parseInt(id)
                    })
                    .then(res => {
                        if (res.data.success) {
                            let ret = res.data.object;
                            this.thirdList = ret;
                            console.log('第三方厂家列表',ret);
                        } else {
                            this.$Message.error("加载第三方厂家失败");
                        }
                    });
            }
        },
        // 保存按钮
        saveChage () {
            // 做勾选,但未选择厂家的限制
            let params = {
                hospitalId: this.id,
                // 服务列表
                thirdpartyList: this.HospitalThirdpartyList,
                // 勾选列表
                thirdpartyServiceList: this.iSelection
            }
            let name = '第三方'
            // 禁用未勾选服务的状态
            params.thirdpartyList.forEach(thirdList => {
                thirdList.enable = 1
            })
            console.log(params);
            let flag = true
            params.thirdpartyServiceList.forEach(item => {
                if(flag){
                    flag = true
                    // 将已经勾选的服务状态改为启用
                    params.thirdpartyList.forEach(thirdList => {
                        if (Number(thirdList.serviceType) == Number(item.serviceType)) {
                            thirdList.enable = 0
                        }
                    })
                    flag = params.thirdpartyList.some(s => {
                        return Number(s.serviceType) == Number(item.serviceType)
                    })
                }
            })
            if (!flag) {
                this.$Message.error("请完整填写数据查询厂家信息");
                return ""
            }
            this.$axios.post(api.updatethirdparty, params).then(res => {
                console.log(res);
                if (res.data.success) {
                    this.$Message.success('操作成功')
                    // 重新请求页面数据
                    this.loadingData();
                } else {
                    this.$Message.error("操作失败")
                }
            })
        }, 
        // 确定添加服务
        ok(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    // 必填项填写完成
                    // 当前服务状态
                    let a = 0;
                    if(!this.formValidate.enable) {
                        a = 1 
                    }
                    // 循环出厂家名称
                    let className = ''
                    this.thirdList.forEach(item => {
                        if(Number(this.formValidate.thirdValue) == Number(item.code)) {
                            className = item.className
                        }
                    })
                    // 找出服务名称
                    let serviceIndex = this.serviceTypeValue - 1
                    let serviceName = this.HospitalThirdpartyEnum[serviceIndex].name
                    let params = {
                        //服务名称
                        serviceName,
                        // 服务路径
                        serviceUrl: this.formValidate.serviceUrl,
                        // 第三方参数
                        requestVal: this.formValidate.requestVal,
                        // 医院ID
                        hospitalId: parseInt(this.id),
                        // 服务类型
                        serviceType: this.serviceTypeValue,
                        // 是否启用
                        enable: a,
                        // 第三方厂家
                        thirdpartyEnum: Number(this.formValidate.thirdValue),
                        className
                    };
                    console.log(params);
                        // 添加进数据组中
                    if (this.HospitalThirdpartyList.length > 0) {
                        let flag = true
                        this.HospitalThirdpartyList.forEach((item, index) => {
                            if (Number(item.serviceType) == Number(params.serviceType)) {
                                flag = false
                                this.HospitalThirdpartyList.splice(index,1,params)
                            }
                        });
                        if(flag) {
                            this.HospitalThirdpartyList.push(params);
                        }
                    } else {
                        this.HospitalThirdpartyList.push(params);
                    }
                    let arr = {
                        hospitalId: this.id,
                        thirdpartyList: this.HospitalThirdpartyList,
                        thirdpartyServiceList: this.iSelection
                    }
                    this.cancel('formValidate');
                } else {
                    // 清空输入值
                    this.cancel('formValidate')
                    // 必填项填写失败
                    this.$Message.error("请完整填写数据项");
                    return "";
                }
            });
            
        },
        // 取消
        cancel(name) { 
            this.formValidate.serviceName = "";
            this.formValidate.requestVal = "";
            this.formValidate.serviceUrl = "";
            this.formValidate.enable = false;
            this.modalTitle = '添加服务'
            this.thirdList = [];
            this.$refs[name].resetFields();
            // 初始化
            this.serviceTypeValue = null;
            this.formValidate.thirdValue = null;
        },
        // 加载数据
        loadingData(){
            this.$axios.post(api.thirdparty, {
                    hospitalId: this.id
                }).then(res => {
                    if(res.data.success) {
                        let ret = res.data.object;
                        //   左侧服务类型
                        this.HospitalThirdpartyEnum = ret.HospitalThirdpartyEnum;
                        //   右侧服务列表
                        this.list = ret.RegisterPatternEnum
                        //   选中的服务
                        this.iSelection = ret.iSelection || []
                        //   已经添加的服务列表
                        this.HospitalThirdpartyList = ret.HospitalThirdpartyList || []
                        console.log("加载数据",ret);
                    } else {
                        this.$Message.error("加载第三方服务失败！")
                    }
                })
        }
    }
};
</script>
<style lang="less" scoped>
.thirdPart {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .main {
        display: flex;
        flex-direction: column;
        width: calc(90% - 40px);
        margin: 10px auto;
        padding: 0 20px;
        .main_yy {
            display: flex;
            flex-direction: row;
            width: 80%;
            height: 30px;
            margin: 5px;
            .main_yy_name {
                display: inline-block;
                min-width: 100px;
                margin-right: 10px;
            }
        }
    }
}
</style>
