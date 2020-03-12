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
                    <i-input class="input" v-model.trim="filterObj.code" placeholder="请输入药品编码"></i-input>
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
                    <i-select class="select" v-model.trim="filterObj.status" placeholder="请选择在用状态">
                        <i-option value="all">全部</i-option>
                        <i-option value="1">在用</i-option>
                        <i-option value="0">未启用</i-option>
                        <i-option value="2">停用</i-option>
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
                <i-button type="primary" @click="handleBatch">批量导入</i-button>
                <!-- <a>下载药品信息导入模版</a> -->
            </div>
        </header>
        <!-- 列表 -->
        <div class="table">
            <Table 
                size="small" 
                :columns="columns" 
                :data="data1"
                @on-selection-change="selectChange"
                :loading="loading"
                no-data-text="未查询到符合条件的记录"
                stripe>

            </Table>
                
            <div class="page-wrapper">
                <div class="des">
                    显示第{{filterObj.pageSize * (filterObj.pageNo - 1) + 1}}到第{{filterObj.pageSize * filterObj.pageNo}}条记录，总共{{count}}条记录 每页显示
                    <i-select class="select" v-model.trim="filterObj.pageSize" placeholder="请输入在用状态">
                        <i-option value="10">10</i-option>
                        <i-option value="20">20</i-option>
                        <i-option value="50">50</i-option>
                    </i-select>
                    条记录
                </div>
                <Page
                    :total="count"
                    :current="filterObj.pageNo"
                    :page-size="filterObj.pageSize"
                    @on-change="loadPage"
                    class="pages"
                />
            </div>
        </div>
        <!-- 编辑/查看/新建弹窗 -->
        <Modal
            v-model="showMedicalModal"
            width="800"
            @on-cancel="() => {$refs['formInline'].resetFields()}"
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
                        <i-col :span="item.span" v-for="(item, index) in medicalFormObj" :key="item.key">
                            <FormItem :prop="item.key" :label="item.label" :rules="item.rules">
                                <div v-if="modalType === 'review'" style="overflow-x: auto;">
                                    <span v-if="item.key !== 'status'">{{formData[item.key]}}</span>
                                    <span v-else>{{['未启用', '在用', '停用'][formData[item.key]]}}</span>
                                </div>
                                <template v-else>
                                    <Input
                                        v-if="item.type === 'input'"
                                        v-model="formData[item.key]"
                                        :disabled="item.disabled"
                                        clearable
                                        :placeholder="item.placeholder" />
                                    <Select
                                        v-if="item.type === 'select'"
                                        v-model="formData[item.key]"
                                        clearable
                                        filterable>
                                        <Option
                                            v-for="(selectItem, index) in item.selections"
                                            :key="index"
                                            :value="selectItem.value">{{selectItem.label}}</Option>
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
                                </template>
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
                <div class="btn-group" v-if="modalType !== 'review'">
                    <Button class="save" type="primary" :loading="saveLoading"  @click="handleSave">保存</Button>
                    <Button class="close" @click="() => {showMedicalModal = false; $refs['formInline'].resetFields()}">关闭</Button>
                </div>
            </div>
        </Modal>
        <!-- 删除确认弹窗 -->
        <Modal
            v-model="showDelModal"
            title="确认删除弹窗"
            class="drugmanagement-commondrug-list-delModal">
            <p>删除后不可恢复，确认删除所选项吗？</p>
            <div slot="footer">
                <Button class="cancel-btn btn" @click="showDelModal = false">取消</Button>
                <Button class="save-btn btn" type="primary" :loading="delLoading" @click="handleDel">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
const filterObj = {
    ypmc: null,
    code: null,
    scqymc: null,
    pzwh: null,
    status: 'all',
    pageNo: 1,
    pageSize: '10',
};
const medicalFormObj = [
    {
        key: 'id',
        type: 'input',
        span: 12,
        label: '药品编码：',
        placeholder: '请输入药品编码',
        // rules: [ { required: true, message: '请输入药品编码', trigger: 'blur' } ],
        disabled: true,
    },
    {
        key: 'pzwh',
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
        selections: [],
        span: 12,
        label: '药品类别：',
        placeholder: '请选择药品类别',
        rules: [{ required: true, message: '请选择药品类别', trigger: 'blur' }]
    },
    {
        key: 'drugCalss',
        type: 'select',
        selections: [{value: '西药', label: '西药'}, {value: '中成药', label: '中成药'}],
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
        selections: [],
        span: 24,
        label: '在用状态：',
        placeholder: '请选择在用状态',
        rules: [{ required: true, message: '请选择在用状态', trigger: 'change' }]
    },
    {
        key: 'yypc',
        type: 'select',
        selections: [],
        span: 24,
        label: '用药频次：',
        placeholder: '请选择用药频次',
        rules: [{ required: true, message: '请选择在用状态', trigger: 'change' }]
    },
    {
        key: 'content',
        type: 'textarea',
        span: 24,
        label: '药品说明：',
        placeholder: '请输入药品说明',
    },
];
const formData = {
    id: null, //药品编码
    pzwh: null, //药品文号
    ypmc: null, //药品通用名
    ypmb: null, //商品名
    yplb: null, //药品类别
    drugCalss: null, // 药理分类
    zxdw: null, // 基本单位
    zxbzdw: null, // 包装单位
    ypjx: null, // 剂型
    attr1: null, // 最小剂量
    ypgg: null, // 规格
    attr2: null, // 计量单位
    scqymc: null, // 厂家名称
    ypyf: null, // 默认给药路径
    status: '0',// 在用状态
    yypc: null, // 用药频次
    content: null, // 药品说明
}
import api from "@/api/commonApi";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
    data() {
        return {
            params: {
                uId: ""
            },
            filterObj: this.deepClone(filterObj),
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
                {
                    title: "在用状态",
                    key: "status",
                    align: "center",
                    render: (h, params) => {
                        return ['未启用', '在用', '停用'][params.row.status]
                    }
                },
                {
                    title: "操作",
                    key: "iOperate",
                    width: 200,
                    render: (h, params) => {
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
                                (params.row.status === '0') ?
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
                                }, '删除') : null
                        ]);
                    }
                }
            ],
            data1: [],
            selections: [],
            showMedicalModal: false,
            modalType: '', // add新增 edit编辑 review查看
            formData: {},
            medicalFormObj: null,
            loading: false,
            showDelModal: false,
            curRecord: {},
            delLoading: false,
            saveLoading: false,
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
    computed: {
    },
    mounted() {
        this.findOperateDrugPage();
        this.findDrugDict();
    },
    methods: {
        loadPage(index) {
            this.filterObj.pageNo = index;
            this.findOperateDrugPage();
        },
        handleSearch() {
            this.filterObj.pageNo = 1;
            this.findOperateDrugPage(this.filterObj);
        },
        handleReset() {
            this.filterObj = this.deepClone(filterObj);
            this.findOperateDrugPage();
        },
        selectChange(selections) {
            this.selections = selections;
        },
        handleAddMedical() {
            if (!this.medicalFormObj) {
                this.$Message.info('字典接口无数据该功能不能使用');
            }
            this.modalType = 'add';
            this.medicalFormObj = this.deepClone(medicalFormObj);
            this.formData = this.deepClone(formData);
            const statusItem = this.getItemByKey('status');
            statusItem.selections = [{value: '0', label: '未启用'}, {value: '1', label: '在用'}];
            this.medicalFormObj.shift();
            this.showMedicalModal = true;
            console.log(this.formData)
        },
        getItemByKey(key) {
            const idItem = this.medicalFormObj.filter((item, index) => item.key === key)[0];
            return idItem;
        },
        getOriginItemByKey(key) {
            const idItem = medicalFormObj.filter((item, index) => item.key === key)[0];
            return idItem;
        },
        handleRemove(record) {
            this.removeType = 'single';
            this.showDelModal = true;
            this.curRecord = record.row;
        },
        handleBatchDelete() {
            if (!this.selections.length) {
                this.$Message.error('请选择删除项');
            } else {
                this.removeType = 'batch';
                this.showDelModal = true;
            }
        },
        handleDel() {
            if (this.removeType === 'single') {
                this.delDrug();
            } else if (this.removeType === 'batch') {
                this.delBatchDrug();
            }
        },
        handleBatch() {
            this.functionJS.queryNavgationTo(this, "/index/operation/drugmanagement/commondrug/batchone", {
            });
        },
        handleEdit(record) {
            if (!this.medicalFormObj) {
                this.$Message.info('字典接口无数据该功能不能使用');
            }
            this.modalType = 'edit';
            this.medicalFormObj = this.deepClone(medicalFormObj);
            const statusItem = this.getItemByKey('status');
            statusItem.selections = (record.status === '0' || !record.status)
                                    ? [{value: '0', label: '未启用'}, {value: '1', label: '在用'}]
                                    : [{value: '2', label: '停用'}, {value: '1', label: '在用'}];
            this.findKbaoOperateDrugEntity(record.row);
        },
        handleReview(record) {
            this.modalType = 'review';
            this.medicalFormObj = this.deepClone(medicalFormObj);
            this.findKbaoOperateDrugEntity(record.row);
            console.log(this.formData)
        },
        handleSave() {
            this.$refs['formInline'].validate((valid) => {
                console.log(valid)
                if (valid) {
                    console.log(this.formData);
                    if (this.modalType === 'add') {
                        this.insertKbaoOperateDrugEntity();
                    } else if (this.modalType === 'edit') {
                        this.updateKbaoOperateDrugEntity();
                    }
                }
            })
        },
        findOperateDrugPage(params = {}) {
            const reqData = Object.assign({}, this.filterObj, params);
            for (var k in reqData) {
                if (!reqData[k]) {
                    delete reqData[k]
                }
                if (k === 'status' && reqData[k] === 'all') {
                    delete reqData[k]
                }
            }
            console.log(reqData)
            this.loading = true;
            this.$axios.post(api.findOperateDrugPage, reqData).then(res => {
                this.loading = false;
                if (res.data.code === 1) {
                    let ret = res.data.object.list;
                    this.count = res.data.object.count;
                    this.data1 = ret;
                    if (!ret || !ret.length) {
                        this.$Message.info('未查询到符合条件的记录')
                    }
                } else {
                    this.$Message.error('请求异常');
                    return false;
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        findKbaoOperateDrugEntity(data) {
            this.$axios.post(api.findKbaoOperateDrugEntity, data).then(res => {
                if (res.data.code === 1) {
                    this.showMedicalModal = true;
                    this.formData = this.deepClone(res.data.object);
                    if (!ret || !ret.length) {
                        this.$Message.info('未查询到符合条件的记录')
                    }
                } else {
                    this.$Message.error('请求异常');
                    return false;
                }
            }).catch(() => {
            });
        },
        findDrugDict() {
            this.$axios.post(api.findDrugDict).then((res) => {
                if (!res.data.code) {
                    this.$Message.error('请求异常');
                    return false;
                }
                console.log('findDrugDict', res)
                const obj = res.data.object;
                // 药品类别
                this.getOriginItemByKey('yplb').selections = obj.ybflList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                // 药品剂型
                this.getOriginItemByKey('ypjx').selections = obj.jxlList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                // 包装单位
                this.getOriginItemByKey('zxbzdw').selections = obj.bzdwList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                // 基本单位
                this.getOriginItemByKey('zxdw').selections = obj.jbdwList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                // 计量单位
                this.getOriginItemByKey('attr2').selections = obj.jldwList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                // 给药路径
                this.getOriginItemByKey('ypyf').selections = obj.gyljList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                // 用药频次
                this.getOriginItemByKey('yypc').selections = obj.yypcList.map((item) => {
                    return {
                        value: item.dictName,
                        label: item.dictName
                    }
                });
                this.medicalFormObj = this.deepClone(medicalFormObj);
                // 选项复制操作
            }).catch((res) => {
                console.log(res)
            })
        },
        insertKbaoOperateDrugEntity() {
            this.saveLoading = true;
            console.log(JSON.stringify(this.formData));
            this.$axios.post(api.insertKbaoOperateDrugEntity, this.formData).then((res) => {
                console.log(res)
                this.saveLoading = false;
                if (!res.data.code) {
                    this.$Message.error('请求异常');
                    return false;
                }
                this.$Message.success('添加成功');
                this.showMedicalModal = false;
                this.findOperateDrugPage();
            }).catch((res) => {
                this.saveLoading = false;
                console.log(res)
            })
        },
        updateKbaoOperateDrugEntity() {
            this.saveLoading = true;
            this.$axios.post(api.updateKbaoOperateDrugEntity, this.formData).then((res) => {
                this.saveLoading = false;
                if (!res.data.code) {
                    this.$Message.error('请求异常');
                    return false;
                }
                this.$Message.success('更新成功');
                this.findOperateDrugPage();
            }).catch((res) => {
                this.saveLoading = false;
                console.log(res)
            })
        },
        delDrug() {
            let reqData = this.curRecord;
            console.log(reqData)
            this.delLoading = true;
            this.$axios.post(api.delDrug, reqData).then((res) => {
                this.delLoading = false;
                if (!res.data.code) {
                    this.$Message.error('请求异常');
                    return false;
                }
                this.$Message.success('删除成功');
                this.findOperateDrugPage();
                this.showDelModal = false;
            }).catch((res) => {
                console.log(res)
                this.delLoading = false;
            })
        },
        delBatchDrug() {
            let reqData = {ids: this.selections.map((item) => item.id).join(',')};
            console.log(reqData)
            this.delLoading = true;
            this.$axios.post(api.delBatchDrug, reqData).then((res) => {
                console.log(res)
                this.delLoading = false;
                if (res.data.code === 1) {
                    this.$Message.success('删除成功');
                    this.findOperateDrugPage();
                    this.showDelModal = false;
                } else {
                    this.$Message.error(res.data.object.join('\n'));
                    return false;
                }
            }).catch((res) => {
                console.log(res)
                this.delLoading = false;
            })
        },
        deepClone(obj) {
            return JSON.parse(JSON.stringify(obj))
        }
    },
    watch: {
        'filterObj.pageSize'(nv, ov) {
            this.findOperateDrugPage();
        },
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
                    width: 84px;
                    text-align: right;
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
.drugmanagement-commondrug-list-MedicalModal {
    /deep/ .ivu-modal-wrap {
        label.ivu-form-item-label {
            padding-right: 0;
        }
        .ivu-modal-footer {
            display: none;
        }
        .btn-group {
            text-align: center;
            .save {
                width: 100px;
                margin-right: 20px;
            }
            .close {
                margin-left: 20px;
                width: 100px;
            }
        }
    }
    
}
.drugmanagement-commondrug-list-delModal {
    /deep/ .ivu-modal-wrap {
        .btn {
            width: 80px;
        }
    }
}
</style>
