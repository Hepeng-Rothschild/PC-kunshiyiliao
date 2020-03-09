<template>
    <div class="list">
        <!-- 头部搜索 -->
        <header>
            <div class="filter-part">
                <div class="filter-item">
                    <label>药品通用名：</label>
                    <i-input class="input" v-model.trim="filterObj.ypmc" placeholder="请输入药品通用名"></i-input>
                </div>
                <div class="filter-item">
                    <label>药品编码：</label>
                    <i-input class="input" v-model.trim="filterObj.id" placeholder="请输入药品编码"></i-input>
                </div>
                <div class="filter-item">
                    <label>厂家：</label>
                    <i-input class="input" v-model.trim="filterObj.scqymc" placeholder="请输入厂家"></i-input>
                </div>
                <div class="filter-item">
                    <label>批准文号：</label>
                    <i-input class="input" v-model.trim="filterObj.pzwh" placeholder="请输入批准文号"></i-input>
                </div>
                <div class="filter-item">
                    <label>在用状态：</label>
                    <i-select class="select" v-model.trim="filterObj.status" placeholder="请输入在用状态">
                        <i-option value="all">全部</i-option>
                        <i-option :value="1">在用</i-option>
                        <i-option :value="0">未启用</i-option>
                        <i-option :value="2">停用</i-option>
                    </i-select>
                </div>
                <div class="filter-btn-group">
                   <i-button type="primary" @click="handleSearch">查询</i-button>
                   <i-button @click="handleReset">重置</i-button>
                </div>
            </div>
            <div class="fun-part">
                <i-button type="primary" @click="handleAddMedical">添加药品</i-button>
                <i-button type="primary" @click="handleBatchDelete">批量删除</i-button>
                <i-button type="primary">批量导入</i-button>
                <a>下载药品信息导入模版</a>
            </div>
        </header>
        <!-- 列表 -->
        <div class="table">
            <Table 
                size="small" 
                :columns="columns" 
                :data="data1"
                @on-selection-change="selectChange"
                stripe></Table>
                
            <div class="page-wrapper">
                <div class="des">
                    显示第{{pageSize * (pageNo - 1) + 1}}到第{{pageSize * pageNo}}条记录，总共{{count}}条记录 每页显示
                    <i-select class="select" v-model.trim="pageSize" placeholder="请输入在用状态">
                        <i-option :value="1">1</i-option>
                        <i-option :value="5">5</i-option>
                        <i-option :value="10">10</i-option>
                        <i-option :value="20">20</i-option>
                        <i-option :value="50">50</i-option>
                    </i-select>
                    条记录
                </div>
                <Page
                    :total="count"
                    :current="pageNo"
                    :page-size="pageSize"
                    @on-change="loadPage"
                    class="pages"
                />
            </div>
        </div>
        <!-- 编辑/查看/新建弹窗 -->
        <Modal
            v-model="showMedicalModal"
            width="800"
            class="drugmanagement-commondrug-list-MedicalModal">
            <p slot="header">
                <span>{{{add: '添加药品', edit: '编辑药品', review: '查看药品'}[modalType]}}</span>
            </p>
            <div class="body">
                <h3>基本信息</h3>
                <Form 
                    ref="formInline"
                    :model="formData"
                    label-position="right"
                    :label-width="90">
                    <Row gutter="40">
                        <i-col :span="item.span" v-for="(item, index) in medicalFormObj" :key="index">
                            <FormItem :prop="item.key" :label="item.label" :rules="item.rules">
                                <Input 
                                    v-if="item.type === 'input'"
                                    v-model="formData[item.key]"
                                    :placeholder="item.placeholder" />
                                <Select 
                                    v-if="item.type === 'select'"
                                    v-model="formData[item.key]">
                                    <Option
                                        v-for="(selectItem, index) in item.selections"
                                        :key="index"
                                        :value="selectItem.value">
                                        {{selectItem.label}}
                                    </Option>
                                </Select>
                                <RadioGroup 
                                    v-if="item.type === 'radio'"
                                    v-model="formData[item.key]">
                                    <Radio
                                        v-for="(selectItem, index) in item.selections"
                                        :key="index"
                                        :label="selectItem.value">
                                        {{selectItem.label}}
                                    </Radio>
                                </RadioGroup>
                                <Input
                                    v-if="item.type === 'textarea'"
                                    v-model="formData[item.key]"
                                    :rows="4"
                                    :placeholder="item.placeholder"
                                    type="textarea" />
                            </FormItem>
                        </i-col>
                        <!-- <i-col :span="12">
                            <FormItem prop="ypwh" label="药品文号：">
                                <Input v-model="formData.ypwh" placeholder="请输入药品文号" />
                            </FormItem>
                        </i-col>
                        <i-col :span="24">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                            </FormItem>
                        </i-col> -->
                    </Row>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
const filterObj = {
    ypmc: null,
    commonCode: null,
    scqymc: null,
    pzwh: null,
    status: 1,
};
const medicalFormObj = [
    {
        key: 'id',
        type: 'input',
        span: 12,
        label: '药品编码：',
        placeholder: '请输入药品编码',
        rules: [ { required: true, message: '请输入药品编码', trigger: 'blur' } ]
    },
    {
        key: 'ypwh',
        type: 'input',
        span: 12,
        label: '药品文号：',
        placeholder: '请输入药品文号',
        rules: [ { required: true, message: '请输入药品文号', trigger: 'blur' } ]
    },
    {
        key: 'ypmc',
        type: 'input',
        span: 12,
        label: '药品通用名：',
        placeholder: '请输入药品通用名',
        rules: [ { required: true, message: '请输入药品通用名', trigger: 'blur' } ]
    },
    {
        key: 'ypmb',
        type: 'input',
        span: 12,
        label: '商品名：',
        placeholder: '请输入药品商品名',
        rules: []
    },
    {
        key: 'yplb',
        type: 'select',
        selections: [{value: 1, label: '在用'}, {value: 0, label: '未启用'}, {value: 2, label: '停用'}],
        span: 12,
        label: '药品类别：',
        placeholder: '请选择药品类别',
        rules: [{ required: true, message: '请选择药品类别', trigger: 'blur' }]
    },
    {
        key: 'drugCalss',
        type: 'select',
        selections: [],
        span: 12,
        label: '药理分类：',
        placeholder: '请选择药理分类',
        rules: []
    },
    {
        key: 'zxdw',
        type: 'select',
        selections: [],
        span: 12,
        label: '基本单位：',
        placeholder: '请选择基本单位',
        rules: [{ required: true, message: '请选择基本单位', trigger: 'blur' }]
    },
    {
        key: 'zxbzdw',
        type: 'select',
        selections: [],
        span: 12,
        label: '包装单位：',
        placeholder: '请选择包装单位',
        rules: [{ required: true, message: '请选择包装单位', trigger: 'blur' }]
    },
    {
        key: 'ypjx',
        type: 'select',
        selections: [],
        span: 12,
        label: '剂型：',
        placeholder: '请选择剂型',
        rules: [{ required: true, message: '请选择剂型', trigger: 'blur' }]
    },
    {
        key: 'attr1',
        type: 'input',
        span: 12,
        label: '最小计量：',
        placeholder: '请输入最小计量',
        rules: []
    },
    {
        key: 'ypgg',
        type: 'input',
        span: 12,
        label: '规格：',
        placeholder: '请输入药品规格',
        rules: [{ required: true, message: '请输入药品规格', trigger: 'blur' }]
    },
    {
        key: 'attr2',
        type: 'select',
        selections: [],
        span: 12,
        label: '剂量单位：',
        placeholder: '请选择剂量单位',
        rules: []
    },
    {
        key: 'scqymc',
        type: 'input',
        span: 24,
        label: '厂家名称：',
        placeholder: '请输入厂家名称',
        rules: []
    },
    {
        key: 'ypyf',
        type: 'select',
        selections: [],
        span: 24,
        label: '默认给药路径：',
        placeholder: '请选择默认给药路径',
        rules: []
    },
    {
        key: 'status',
        type: 'radio',
        selections: [{value: '西药', label: '西药'}, {value: '中成药', label: '中成药'}],
        span: 24,
        label: '在用状态：',
        placeholder: '请选择在用状态',
        rules: [{ required: true, message: '请选择在用状态', trigger: 'blur' }]
    },
    {
        key: 'yypc',
        type: 'select',
        selections: [],
        span: 24,
        label: '用药频次：',
        placeholder: '请选择用药频次',
        rules: []
    },
    {
        key: 'content',
        type: 'textarea',
        span: 24,
        label: '药品说明：',
        placeholder: '请输入药品说明',
        rules: []
    },
];
import api from "@/api/commonApi";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
    data() {
        return {
            params: {
                uId: ""
            },
            filterObj: JSON.parse(JSON.stringify(filterObj)),
            pageNo: 1,
            pageSize: 10,
            count: 0,
            columns: [
                {type: 'selection', width: 60, align: 'center'},
                {type: 'index', title: '序号', width: 60, align: 'center'},
                { title: "药品通用名", key: "ypmc", align: "center" },
                { title: "药品编码", key: "id", align: "center"},
                { title: "剂型", key: "ypjx", align: "center"},
                { title: "规格", key: "ypgg", align: "center"},
                { title: "厂家", key: "scqymc", align: "center"},
                { title: "批准文号", key: "pzwh", align: "center"},
                { title: "在用状态", key: "status", align: "center"},
                {
                    title: "操作",
                    key: "iOperate",
                    align: "center",
                    width: 200,
                    render: (h, params) => {
                        let id = params.row.appid;
                        return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '0px 6px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEdit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '0px 6px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleReview(params)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '0px 6px',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleRemove(params)
                                        }
                                    }
                                }, '删除')
                        ]);
                    }
                }
            ],
            data1: [],
            selections: [],
            showMedicalModal: false,
            modalType: '', // add新增 edit编辑 review查看
            formData: {
                id: '', //药品编码
                pzwh: '', //药品文号
                ypmc: '', //药品通用名
                ypmb: '', //商品名
            },
            medicalFormObj,
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "",
                title: "药品目录管理"
            },
            {
                path: "/index/operation/drugmanagement/commondrug/list",
                title: "统一药品目录维护"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.loadingData(1);
    },
    methods: {
        loadPage(index) {
            this.pageNo = index;
            this.loadingData(index);
        },
        handleSearch() {
            this.loadingData(1, this.filterObj);
        },
        handleReset() {
            this.filterObj = JSON.parse(JSON.stringify(filterObj));
        },
        selectChange(selections) {
            this.selections = selections;
        },
        handleAddMedical() {
            this.modalType = 'add';
            this.showMedicalModal = true;
        },
        handleBatchDelete() {
            if (!this.selections.length) {
                this.$Message.error('请选择删除项');
            } else {
                alert('发起删除请求')
            }
        },
        handleEdit(record) {
            this.modalType = 'edit';
            this.showMedicalModal = true;
            console.log(record)
        },
        handleReview(record) {
            this.modalType = 'review';
            this.showMedicalModal = true;
            console.log(record)
        },
        handleRemove(record) {
            alert('删除药品逻辑')
            console.log(record)
        },
        loadingData(pageNo, val) {
            let params = {
                pageNo,
                pageSize: this.pageSize
            };
            
            if (Boolean(val)) {
                params.searchKey = val.trim();
            }
            this.$axios.post(api.wxList, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object.list;
                    ret.forEach((item, index) => {
                        item.sum = index + 1;
                    });
                    this.count = res.data.object.count;
                    this.data1 = ret;
                } else {
                    this.$Message.info("没有访问权限");
                }
            });
        }
    },
    watch: {
        pageSize(nv, ov) {
            this.loadingData(1);
        }
    }
};
</script>
<style lang="less" scoped>
.list {
    width: 98%;
    min-width: 1200px;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        .filter-part {
            display: flex;
            flex-wrap: wrap;
            .filter-item {
                display: flex;
                margin: 10px 10px 10px 0;
                label {
                    white-space: nowrap;
                    line-height: 32px;
                }
                .input {
                    width: 220px;
                }
                .select {
                    width: 70px;
                }
            }
            .filter-btn-group {
                margin: 10px 10px 10px 0;
                flex: 0 0 auto;
            }
        }
        .fun-part {
            margin-top: 15px;
            margin-bottom: 10px;
            a {
                vertical-align: bottom;
            }
        }
    }
    .table {
        .page-wrapper {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            .des {
                display: flex;
                align-items: center;
                .select {
                    width: 50px;
                }
            }
            .pages {
            }
        }
    }
}
.drugmanagement-commondrug-list-MedicalModal{
    display: inline;
    /deep/ .ivu-modal-wrap {
        label.ivu-form-item-label {
            padding-right: 0;
        }
        .ivu-modal-footer {
            display: none;
        }
    }
    
}
</style>
