<template>
    <div class="feeStandard">
        <div class="main">
            <tmpHeader/>
            <Button type="info" style="width:100px;margin-top:10px;" @click='modalShow'>添加新项目</Button>
            <br>
            <Table stripe :columns="columns1" :data="data1"></Table>
            <Page
                :total="count"
                :current="pageNo"
                :pageSize="pageSize"
                style="margin-top:10px;text-align:center;"
                @on-change='pageChange'
            />
            <Modal
                v-model = "modalStatus"
                width='900'
                :closable='false'
                :styles="{top: '0px'}"
                :mask-closable="false"
                footer-hide>
                <h3 style='text-align:center;'>{{ ModalTitle }}互联网收费项目</h3>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <Row>
                        <Col span="12">
                            <FormItem prop="projectCategory" label="选择项目">
                                <Select v-model="formValidate.projectCategory" style='width:150px;' @on-change='projectCategoryChange'>
                                    <Option style='text-align:center;' :value="item.id" v-for='item in projectCategoryList' :key='item.id'>{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="title" label="关联职称">
                                <Select v-model="formValidate.title"  style='width:150px;'>
                                    <Option
                                        v-for="item in titleList"
                                        :value="item.dictType"
                                        :key="item.dictType"
                                        style='text-align:center'
                                    >{{item.dictName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="项目名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="输入项目名称" style='width:300px;'></Input>
                    </FormItem>
                    <FormItem label="项目规格">
                        <Input v-model="formValidate.norms" placeholder="输入项目规格" style='width:300px;'></Input>
                    </FormItem>
                    <Row>
                        <Col span="12">
                            <FormItem label="项目物价码">
                                <Input v-model="formValidate.priceCode" placeholder="输入项目物价码" style='width:300px;'></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="收费依据">
                                <Input v-model="formValidate.charge" placeholder="输入收费依据" style='width:300px;'></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem prop="chargingUnit" label="收费单位">
                                <Select v-model="formValidate.chargingUnit" style='width:150px;'>
                                    <Option style='text-align:center;' :value="item.id" :key='item.id' v-for='item in chargingUnit'>{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="priceBasis" label="收费单价(元)">
                                <InputNumber :max="9999" :min="0" v-model="formValidate.priceBasis" placeholder="0.00" style='width:80px;'></InputNumber>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="备注说明" >
                        <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </FormItem>
                    <Row>
                        <Col span="8">
                            <FormItem label="使用业务模块" prop="modular">
                                <!-- 咨询列表 -->
                                <Select v-model="formValidate.modular" style='width:150px;' v-show='formValidate.projectCategory == 1'>
                                    <Option  style='text-align:center;' :value="item.id" v-for='item,index in 
                                    consultList' :key='index'>{{ item.name }}</Option>
                                </Select>
                                <!-- 问诊列表 -->
                                <Select v-model="formValidate.modular" style='width:150px;' v-show='formValidate.projectCategory == 2'>
                                    <Option  style='text-align:center;' :value="item.id" v-for='item,index in inquiryList' :key='index'>{{ item.name }}</Option>
                                </Select>
                                <!-- 未选择时的列表 -->
                                <Select v-model="formValidate.modular" style='width:150px;' v-if='!formValidate.projectCategory'>
                                    <Option  style='text-align:center;' :value="index" v-for='item,index in modular' :key='index'>{{ item }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <!-- ... -->
                        <!-- <Col span='8'>
                            <FormItem prop="consult" label="咨询类型">
                                <Select v-model="formValidate.consult" style='width:150px;'>
                                    <Option  style='text-align:center;' :value="item.id" v-for='item,index in consultTypeList' :key='index'>{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='8'>
                            <FormItem prop="consultPrice" label="咨询价格">
                                <InputNumber :max="9999" :min="0" v-model="formValidate.consultPrice" placeholder="0.00" style='width:80px;'></InputNumber>
                            </FormItem>
                        </Col> -->
                    </Row>
                    <FormItem label="是否启用">
                        <iSwitch size="large" v-model="formValidate.status">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </iSwitch>
                        <span style='margin-left:10px;color:#FF9800;'>每个职称对应每个业务模块有且只有一个收费项目启用，停用后可能会导致业务模块不能检索到医生。</span>
                    </FormItem>
                </Form>
                <div style='width:300px;margin:0 auto;'>
                    <Button type='primary' @click='handleSubmit("formValidate")'>{{buttonName}}</Button>
                    <Button @click='handleReset("formValidate")'>取消</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
    components: {
        tmpHeader
    },
    data () {
        return {
            // 列表数据
            columns1: [
                {
                    key: "sum",
                    title: "序号",
                    align: "center",
                    width:80
                },
                {
                    key: "itemName",
                    title: "收费项目名称",
                    align: "center",
                    width: 150
                },
                {
                    key: "itemType",
                    title: "项目类别",
                    align: "center",
                    width: 100
                },
                {
                    key: "itemCode",
                    title: "物价编码",
                    align: "center",
                    width: 150
                },
                {
                    key: "itemSpec",
                    title: "项目规格",
                    align: "center",
                    width: 150
                },
                {
                    key: "itemFeeUnit",
                    title: "单位",
                    align: "center",
                  
                },
                {
                    key: "itemFeePrice",
                    title: "单价(元)",
                    align: "center",
                    width:100
                },
                {
                    key: "serviceType",
                    title: "使用业务模块",
                    align: "center",
                    width:120
                },
                {
                    key: "itemUsed",
                    title: "状态",
                    align: "center",
                  
                },
                {
                    title: "操作",
                    align: "center",
                    width:100,
                    render:(h,params) => {
                        let row = params.row;
                        return [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.modalStatus = true
                                        this.buttonName = '确认修改'
                                        this.ModalTitle = '修改'
                                        this.$axios.post(api.chargequerybyid, {
                                            "hospitalId": this.formValidate.hospitalId,
                                            "id": row.id
                                        }).then(res => {
                                            if(res.data.success) {
                                                let ret = res.data.object;
                                                console.log("加载详情", ret);
                                                this.formValidate.priceCode = ret.itemCode;
                                                this.formValidate.charge = ret.itemFeeBasis;
                                                this.formValidate.priceBasis = ret.itemFeePrice
                                                this.formValidate.chargingUnit = ret.itemFeeUnit
                                                this.formValidate.name = ret.itemName;
                                                this.formValidate.norms = ret.itemSpec
                                                this.formValidate.projectCategory = ret.itemType
                                                this.formValidate.status = Boolean(Number(ret.itemUsed))
                                                this.formValidate.reason = ret.remark
                                                this.formValidate.modular = ret.serviceType
                                                this.formValidate.title = ret.title
                                                this.formValidate.id = ret.id

                                                // this.formValidate.consult = ret.consult
                                                // this.formValidate.consultPrice = ret.consultPrice

                                            } else {
                                                this.$Message.error("加载项目详情失败")
                                            }
                                        })
                                    }
                                }
                            }, '编辑')
                        ]
                    }
                }
            ],
            data1: [],
            // 分页数据
            count: 10,
            pageNo: 1,
            pageSize: 10,
            // 弹出窗状态
            modalStatus: false,

            ModalTitle : "新增",

            // 表单验证以及项目详细数据
            formValidate: {
                // 项目类型
                projectCategory: "",
                // 职称
                title: "",
                // 项目名称
                name: "",
                // 项目规格
                norms: "",
                // 物价码
                priceCode: "",
                // 收费依据
                charge: "",
                // 收费单位
                chargingUnit: "",
                // 收费依据
                priceBasis: "",
                // 备注
                reason: "",
                // 业务模块
                modular: "",
                // 启用标识
                status: true,
                // 标识Id
                id: "",
                // 医院ID
                hospitalId: sessionStorage.getItem("hospitalId"),
                // 咨询类型
                consult : "",
                // 咨询价格
                consultPrice: ""
            },
            ruleValidate: {
                projectCategory: [{ required: true, message: '请选择项目', trigger: 'change' }],
                title: [{ required: true, message: '请选择职称', trigger: 'change' }],
                name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
                chargingUnit: [{ required: true, message: '请选择收费单位', trigger: 'change' }],
                priceBasis: [{ required: true, message: '请输入收费单价', trigger: 'blur', type:'number' }],
                modular: [{ required: true, message: '请选择项目', trigger: 'change', type:'number'}],
                consult: [{ required: true, message: '请选择咨询类型', trigger: 'change'}],
                consultPrice: [{ required: true, message: '请输入咨询价格', trigger: 'blur', type:'number' }]
            },
            // 项目类型列表
            projectCategoryList: [
                {
                    name:"网络咨询",
                    id:'1'
                },
                {
                    name:"网络问诊",
                    id:'2'
                }
            ],
            // 职称列表
            titleList: [],
            // 收费单位列表
            chargingUnit: [],
            // 业务模块
            modular: [],
            Allmodular: ["咨询","问诊","复诊","续方","药品咨询"],
            // 咨询列表
            consultList: [
                {
                    name: "咨询",
                    id: 0
                },
                {
                    name: "药品咨询",
                    id: 4
                }
            ],
            // 问诊列表
            inquiryList: [
                {
                    name: "问诊",
                    id: 1
                },
                {
                    name: "复诊",
                    id: 2
                },
                {
                    name: "续方",
                    id: 3
                },
                
            ],
            buttonName: "确认添加",
            // 咨询类型
            consultTypeList: [
                {
                    id:"1",
                    name:"图文咨询"
                },
                {
                    id:"2",
                    name:"视频咨询"
                },
                {
                    id:"3",
                    name:"语音咨询"
                }
            ]

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
                path: "/index/operation/home",
                title: "机构管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        // 职称列表
        this.getTitleList();
        // 页面数据
        this.getDate()
    },
    methods: {
        // 分页器改变
        pageChange(index) {
            this.pageNo = index;
            this.getDate();
        },
        // 新增项目
        modalShow () {
            this.modalStatus = true
            this.ModalTitle = '新增'
            this.buttonName = '确认添加'
        },
        // 保存修改
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = api.chargeinsert;
                    let params = {
                        "hospitalId": this.formValidate.hospitalId,
                        "itemCode": this.formValidate.priceCode,
                        "itemFeeBasis": this.formValidate.charge,
                        "itemFeePrice": this.formValidate.priceBasis,
                        "itemFeeUnit": this.formValidate.chargingUnit,
                        "itemName": this.formValidate.name,
                        "itemSpec": this.formValidate.norms,
                        "itemType": this.formValidate.projectCategory,
                        "itemUsed": Number(this.formValidate.status),
                        "remark": this.formValidate.reason,
                        "serviceType": String(this.formValidate.modular),
                        "title": this.formValidate.title,
                        // consult: this.formValidate.consult,
                        // consultPrice: this.formValidate.consultPrice,
                    }
                    if(Boolean(this.formValidate.id)) {
                        params.id = this.formValidate.id
                        url = api.chargeupdate
                    }
                    console.log("修改参数",params);
                    this.$axios.post(url, params).then(res => {
                        if(res.data.success) {
                            this.$Message.success(res.data.object.success)
                            // 重新加载列表
                            this.getDate();
                            // 弹窗数据初始化
                            this.handleReset('formValidate')
                        } else {
                            this.$Message.error(res.data.message)
                        }
                    })
                } else {
                    this.$Message.error('请完整填写必填项!');
                }
            })
        },
        // 取消保存
        handleReset (name) {
            this.$refs[name].resetFields();
            this.buttonName = '确认添加'
            this.formValidate.projectCategory = ''
            // 职称
            this.formValidate.title = ''
            // 项目名称
            this.formValidate.name = ''
            // 项目规格
            this.formValidate.norms = ''
            // 物价码
            this.formValidate.priceCode = ''
            // 收费依据
            this.formValidate.charge = ''
            // 收费单位
            this.formValidate.chargingUnit = ''
            // 收费依据
            this.formValidate.priceBasis = ''
            // 备注
            this.formValidate.reason = ''
            // 业务模块
            this.formValidate.modular = ''
            // 启用标识
            this.formValidate.status = false
            // 标识Id
            this.formValidate.id = ''
            this.modalStatus = false
            this.formValidate.consult = ''
             this.formValidate.consultPrice = ''
        },
        //获取职称列表
        getTitleList () {
            this.$axios
                .post(api.getTitle)
                .then(resp => {
                    this.titleList = resp.data.object;
                })
                .catch(err => {
                    console.log(err);
                });
                // 加载收费列表
            this.$axios.post(api.feeunitenum).then(resp => {
                if(resp.data.success) {
                    let ret = resp.data;
                    this.chargingUnit = ret.object;
                }
            })
        },
        // 加载列表数据
        getDate () {
            let params = {
                "hospitalId": this.formValidate.hospitalId,
                "pageNo": this.pageNo,
                "pageSize": this.pageSize
            }
            let url = api.chargepage
            this.$axios.post(url, params).then(res => {
                if (res.data.success) {
                    let ret = res.data.object;
                    console.log("列表数据",ret);
                    ret.list.forEach((item,index) => {
                        // 序号
                        item.sum = this.addZeros(index)
                        // 项目类型
                        this.projectCategoryList.forEach(i => {
                            if(Number(item.itemType) == Number(i.id)) {
                                item.itemType = i.name
                            }
                        })
                        // 收费单位 列表 
                        this.chargingUnit.forEach(s => {
                            if(Number(item.itemFeeUnit) == Number(s.id)) {
                                item.itemFeeUnit = s.name
                            }
                        })
                        // 选择模块
                        this.Allmodular.forEach((m,f) => {
                            if(Number(item.serviceType) == Number(f)) {
                                item.serviceType = m
                            }
                        })
                        item.itemUsed = item.itemUsed == 1 ? "启用" : "禁用"
                    })
                    this.data1 = ret.list;
                    this.count = ret.count
                }
            })
            
        },
        // 根据项目类型切换不同的业务模块
        projectCategoryChange () {
            this.formValidate.modular = ''
        }
    }
};
</script>
<style lang="less" scoped>
.feeStandard {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .main {
        display: flex;
        flex-direction: column;
    }
}
</style>
