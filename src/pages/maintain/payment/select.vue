<template>
    <div class="management1">
        <h2 style='margin-bottom:10px;' >
            <span style='font-weight:bold;'>医院名称：{{ name }}</span>
            <Button type="primary" @click='addPayment("formValidate")'>添加支付方式</Button>
            <Button @click='back'>返回医院列表</Button>
        </h2>
        <Modal
            v-model="modalStatus"
            :title="modalTitle"
            @on-ok="handleSubmit('formValidate')"
            :styles="{top: '20px'}"
            :mask-closable='false'
            :closable="false"
            :width='650'
            @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <!-- 支付渠道 -->
                <FormItem label="支付渠道" prop="paymentType">
                    <Select
                        class="w-select-hos"
                        placeholder="请选择支付渠道"
                        v-model="formValidate.paymentChannel"
                        style='width:180px;'
                        @on-change='paymentChannelChange'
                    >
                        <Option
                            v-for="item in paymentTypeList"
                            :value="item.id"
                            :key="item.id"
                            style='text-align:center;'
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <!-- 支付类型 -->
                <FormItem label="支付类型" prop="paymentChannel">
                    <Select
                        class="w-select-hos"
                        placeholder="请选择支付类型"
                        v-model="formValidate.paymentType"
                        style='width:180px;'
                    >
                        <Option
                            v-for="item in paymentChannelList"
                            :value="item.code"
                            :key="item.code"
                            :disabled='item.disabled'
                            style='text-align:center;'
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <!-- 支付账号 -->
                <!-- 当支付类型为就诊卡时,支付账号,商户号,支付参数为非必填项 -->
                <!-- formValidate.paymentChannel == 3 -->
                <FormItem label="支付账号" prop="paymentAccount" v-show='formValidate.paymentChannel != 3'>
                    <Select
                        class="w-select-hos"
                        placeholder="请选择支付账号"
                        v-model="formValidate.paymentAccount"
                        style='width:180px;'
                    >
                        <Option
                            v-for="item in paymentAccountList"
                            :value="item.appid"
                            :key="item.appid"
                            style='text-align:center;'
                        >{{item.nick}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="支付账号"  v-show='formValidate.paymentChannel == 3'>
                    <Select
                        class="w-select-hos"
                        placeholder="请选择支付账号"
                        v-model="formValidate.paymentAccount"
                        style='width:180px;'
                    >
                        <Option
                            v-for="item in paymentAccountList"
                            :value="item.appid"
                            :key="item.appid"
                            style='text-align:center;'
                        >{{item.nick}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="交易类型" prop="transactionType">
                    <Select
                        class="w-select-hos"
                        placeholder="请选择交易类型"
                        v-model="formValidate.transactionType"
                        style='width:180px;'
                    >
                        <Option
                            v-for="item in transactionTypeList"
                            :value="item.id"
                            :key="item.id"
                            style='text-align:center;'
                        >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <!-- 显示端 -->
                <FormItem label="显示端" prop="displayType">
                    <Select
                        class="w-select-hos"
                        placeholder="请选择显示端"
                        v-model="formValidate.displayType"
                        style='width:180px;'
                    >
                        <Option
                            v-for="item in displayTypeList"
                            :value="item.id"
                            :key="item.id"
                            style='text-align:center;'
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <!-- 商户号 -->
                <FormItem label="商户号" prop="merchantIdentification" v-show='formValidate.paymentChannel != 3'>
                    <Input v-model="formValidate.merchantIdentification" placeholder="请输入商户号" style="width: 300px" />
                </FormItem>
                <FormItem label="商户号" v-show='formValidate.paymentChannel == 3'>
                    <Input v-model="formValidate.merchantIdentification" placeholder="请输入商户号" style="width: 300px" />
                </FormItem>
                <!-- 支付参数 -->
                <FormItem label="支付参数" prop="parameterConfig" v-show='formValidate.paymentChannel != 3'>
                    <Input v-model="formValidate.parameterConfig" placeholder="请输入支付参数" style="width: 300px" />
                </FormItem>
                <FormItem label="支付参数" v-show='formValidate.paymentChannel == 3'>
                    <Input v-model="formValidate.parameterConfig" placeholder="请输入支付参数" style="width: 300px" />
                </FormItem>
                <FormItem label="状态" prop="startType">
                    <iSwitch v-model="formValidate.startType" size="large">
                        <span slot="open">启用</span>
                        <span slot="close">禁用</span>
                    </iSwitch>
                </FormItem>
            </Form>
        </Modal>
        <Table stripe :columns="columns1" :data="list"></Table>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data() {
        return {
            modalTitle:"添加支付方式",
            modalStatus: false,
            // 数据
            formValidate: {
                // 支付渠道
                paymentType: "",
                // 支付类型
                paymentChannel: "",
                // 支付账号
                paymentAccount: "",
                // 交易类型
                transactionType: "",
                // 显示端
                displayType: "",
                // 商户号
                merchantIdentification: "",
                // 支付参数
                parameterConfig: "",
                // 状态
                startType: true
            },
            // 验证
            ruleValidate: {
                //支付渠道
                paymentType: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付渠道",
						// 触发事件
						trigger: "change"
					}
                ],
                // 支付类型
                paymentChannel: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付类型",
						// 触发事件
						trigger: "change"
					}
                ],
                // 支付账号
                paymentAccount: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付账号",
						// 触发事件
						trigger: "change"
					}
                ],
                // 交易类型
                transactionType: [
                    {
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付方式",
						// 触发事件
						trigger: "change"
					}
                ],
                // 显示端
                displayType: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择显示端",
						// 触发事件
						trigger: "change"
					}
                ],
                // 商户号
                merchantIdentification: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入商户号",
						// 触发事件
						trigger: "blur"
					}
                ],
                // 支付参数
                parameterConfig: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入支付参数",
						// 触发事件
						trigger: "blur"
					}
                ],
                // 状态
                startType: [
					{
						// 是否校验
						required: false,
						// 提示文字
						message: "请选择状态",
						// 触发事件
                        trigger: "change",
                        type:'boolean'
					}
				]
            },
            // 医院id
            hospitalId: '',
            // 医院名称
            name: "",
            // 支付方式列表
            list: [],
            columns1: [
                {
                    title: "支付渠道",
                    align: "center",
                    key: "paymentChannelName",
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
                                name.paymentChannelName
                            )
                        ]);
                    }
                },
                {
                    title: "支付类型",
                    align: "center",
                    key:"paymentTypeName",
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
                                name.paymentTypeName
                            )
                        ]);
                    }
                },
                {
                    title: "支付账号",
                    align: "center",
                    width: 150,
                    key:"paymentAccount",
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
                                name.paymentAccount
                            )
                        ]);
                    }
                },
                {
                    title:"显示端",
                    align:'center',
                    key:"displayTypeName",
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
                                name.displayTypeName
                            )
                        ]);
                    }
                },
                {
                    title:"商户号",
                    align:'center',
                    key:"merchantIdentification",
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
                                name.merchantIdentification
                            )
                        ]);
                    }
                },
                {
                    title:"支付参数",
                    align:'center',
                    key:"parameterConfig",
                    width: 150,
                    render: (h, params) => {
                        let name = params.row;
                        let par = JSON.parse(name.parameterConfig).mchKey || ''
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
                                par
                            )
                        ]);
                    }
                },
                {
                    title:"状态",
                    align:'center',
                    key:"startType",
                    render: (h, params) => {
                        let name = params.row;
                        let status = Boolean(name.startType) ? "启用" :"禁用"
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
                                            this.addPayment('formValidate',params.row.id)
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ]);
                    }
                }
            ],
            // 支付类型列表
            paymentTypeList: [],
            // 支付渠道列表
            paymentChannelList: [],
            // 支付账号列表
            paymentAccountList: [],
            // 交易类型列表
            transactionTypeList: [],
            // 显示端列表
            displayTypeList: [],
            // 就诊卡表单
            cart : {
                paymentType: [ { required: true, message: "请选择支付类型", trigger : "change"} ],
                paymentChannel: [ { required: true, message: "请选择支付渠道", trigger: "change"} ],
                displayType: [ {required: true, message: "请选择显示端", trigger: "change"} ],
                transactionType: [ { required: true, message: "请选择交易类型", trigger: "change" } ],
            },
            // 全部表单
            stop : {
                //支付类型
                paymentType: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付类型",
						// 触发事件
						trigger: "change"
					}
                ],
                // 支付渠道
                paymentChannel: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付渠道",
						// 触发事件
						trigger: "change"
					}
                ],
                // 支付账号
                paymentAccount: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付账号",
						// 触发事件
						trigger: "change"
					}
                ],
                // 交易类型
                transactionType:[
                    {
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择支付方式",
						// 触发事件
						trigger: "change"
					}
                ],
                // 显示端
                displayType: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请选择显示端",
						// 触发事件
						trigger: "change"
					}
                ],
                // 商户号
                merchantIdentification: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入商户号",
						// 触发事件
						trigger: "blur"
					}
                ],
                // 支付参数
                parameterConfig: [
					{
						// 是否校验
						required: true,
						// 提示文字
						message: "请输入支付参数",
						// 触发事件
						trigger: "blur"
					}
                ],
                // 状态
                startType: [
					{
						// 是否校验
						required: false,
						// 提示文字
						message: "请选择状态",
						// 触发事件
                        trigger: "change",
                        type:'boolean'
					}
				]
            }
           
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
                path: "/index/maintain/payment/index",
                title: "支付管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
         // 加载医院账号
        this.loadingData() 
    },
    mounted () {
        this.hospitalId = this.$route.query.id
        this.name = this.$route.query.name
        // 加载医院列表数据
        this.loadingHospitalId();
    },
    methods: {
        // 返回
        back(){
            let pageNo = this.$route.query
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/payment/index",
                pageNo
            );
        },
        // 填写完成
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                // 必填项填写完整
                if (valid) {
                    // 参数
                    let mchKey = {
                        mchKey: this.formValidate.parameterConfig
                    }
                    let params = {
                        paymentType: this.formValidate.paymentType,
                        paymentChannel: this.formValidate.paymentChannel,
                        paymentAccount: this.formValidate.paymentAccount,
                        displayType: this.formValidate.displayType,
                        merchantIdentification: this.formValidate.merchantIdentification,
                        parameterConfig: JSON.stringify(mchKey),
                        startType: Number(this.formValidate.startType),
                        transactionType:this.formValidate.transactionType,
                        hospitalId: this.hospitalId
                    }
                    console.log(params);
                    // 有id代表它是编辑的状态
                    if (Boolean(this.formValidate.id)) {
                        this.updateList(params)
                    } else {
                        this.saveChange(params);
                    }
                } else {
                    this.$Message.error('请检查必填项是否填写正确');
                }
            })
        },
        //添加支付方式
        addPayment (name,id) {
            this.modalStatus = true;
            this.formValidate.id = ''
            this.$refs[name].resetFields();
            this.modalTitle = '添加支付方式'
            // 当有id时表示它是从编辑页跳转过来的
            if(Boolean(id)) {
                this.modalTitle = '修改支付方式'
                this.formValidate.id = 1
                this.$axios.post(api.querybyid, {
                    id
                }).then(res => {
                    if (res.data.message) {
                        let ret = res.data.object;
                        let config = JSON.parse(ret.parameterConfig).mchKey
                        // 支付类型
                        this.formValidate.paymentType = String(ret.paymentType)
                        // 支付渠道
                        this.formValidate.paymentChannel = String(ret.paymentChannel)
                        // 通过支付类型,加载支付渠道
                        this.paymentChannelChange()
                        // 支付账号
                        this.formValidate.paymentAccount = ret.paymentAccount
                        // 交易类型
                        this.formValidate.transactionType = ret.transactionType
                        // 显示端
                        this.formValidate.displayType = String(ret.displayType)
                        // 商户号
                        this.formValidate.merchantIdentification = ret.merchantIdentification
                        // 支付参数
                        this.formValidate.parameterConfig = config
                        // 状态
                        this.formValidate.startType = Boolean(ret.startType)
                        this.formValidate.id = ret.id
                    } else {
                        this.$Message.error("查询详情失败")
                    }
                })
            }
        },
        // 选择支付类型后加载支付渠道
        paymentChannelChange() {
            // 当选择就诊卡的表单验证选择
            if(Number(this.formValidate.paymentChannel) == 3) {
                this.ruleValidate = this.cart
            } else {
                this.ruleValidate = this.stop
            }
            this.paymentChannelList = []
            if(this.formValidate.paymentChannel) {
                this.$axios.post(api.channelenummap, {
                    parent:this.formValidate.paymentChannel
                }).then(res => {
                    if (res.data.success) {
                        let ret = res.data.object
                        this.paymentChannelList = ret
                        this.onListLoading();
                        // console.log("fc支付渠道",ret);
                    } else {
                        this.$Message.error('通过支付类型加载支付渠道失败')
                    }
                })
            }
            
        },
        // 取消
        cancel () {
            this.formValidate.paymentType = ''
            this.formValidate.paymentChannel = ''
            this.formValidate.paymentAccount = ''
            this.formValidate.transactionType = ''
            this.formValidate.displayType = ''
            this.formValidate.merchantIdentification = ''
            this.formValidate.parameterConfig = ''
            this.formValidate.startType = false;
            this.$refs['formValidate'].resetFields();
            // 清空支付渠道
            this.paymentChannelList = []
        },
        // 请求支付类型,显示端,医院账号,交易类型
        loadingData () {
            // 请求医院账号
            this.$axios.post(api.wxappnamelist, {
                hospitalId:this.hospitalId
            }).then(res => {
                if(res.data.message) {
                    let ret = res.data.object;
                    this.paymentAccountList = ret
                    console.log("医院账号",ret);
                } else {
                    this.$Message.error("加载医院关联公众号失败,请重试")
                }
            })
            // 请求支付类型与显示端
            this.$axios.post(api.paymentchannelmap,{
                
            }).then(res => {
                if(res.data.success) {
                    let ret = res.data.object;
                    console.log(ret);
                    this.displayTypeList = ret.displayEnum || []
                    this.paymentTypeList = ret.paymentEnum || []
                    this.transactionTypeList = ret.transaction || []
                    this.paymentTypeList.forEach(item => {
                        item.disabled = false
                    })
                    this.onListLoading()
                    console.log("支付类型",ret);
                } else {
                    this.$Message.error("加载支付类型与显示端失败,请重试")
                }
            })
        },
        // 禁用已选择的支付渠道
        onListLoading() {
            this.paymentChannelList.forEach(item => {
                item.disabled = false
            })
            this.list.forEach(item => {
                this.paymentChannelList.forEach(s => {
                    if (Number(item.paymentChannel) == Number(s.code)) {
                        s.disabled = true
                    }
                })
            })
        },
        // 加载医院支付方式列表
        loadingHospitalId () {
            this.$axios.post(api.querylist, {
                hospitalId:this.hospitalId
            }).then(res => {
                console.log(res);
                if(res.data.success) {
                    let ret = res.data.object;
                    this.list = ret || []
                    console.log('支付方式列表',ret);
                } else {
                    this.$Message.error("加载医院支付方式列表失败,请重试")
                }
            })
        },
        // 新增支付类型
        saveChange (params) {
            this.$axios.post(api.insertpaymentchannel, params).then(res => {
                console.log(res);
                if(Boolean(res.data.code)) {
                    let ret = res.data.object
                    this.$Message.success(ret.success)
                    // 重新加载医院数据
                    this.loadingHospitalId();
                    this.$refs['formValidate'].resetFields();
                    this.ruleValidate = this.stop
                } else {
                    let message = res.data.object.same || "添加失败,请重试"
                    this.$Message.error(message)
                }
            })
        },
        // 修改支付类型
        updateList (params) {
            console.log('updateList');
            params.id = this.formValidate.id
            this.$axios.post(api.updatepaymentchannel, params).then(res => {
                if(Boolean(res.data.code)) {
                    this.$Message.success("修改成功")
                    // 重新加载医院数据
                    this.loadingHospitalId();
                    this.$refs['formValidate'].resetFields();
                    this.ruleValidate = this.stop
                } else {
                    this.$Message.error("修改失败")
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
.management1 {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>
