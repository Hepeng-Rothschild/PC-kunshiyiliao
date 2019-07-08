<template>
    <div class = 'followEdit'>
        <tmpHeader />
        <br />
        <Button type='info' @click="addAnswer">添加问题</Button>
        <Button @click="back">返回随访表单</Button>
        <Table stripe :columns="columns1" :data="data1" style="margin:10px 0;"></Table>
        <Page :total="count" @on-change="pageChange" :current="pageNo" :page-size='pageSize' style='text-align:center;' />
        
        <Modal
            v-model="Status"
            :title="modalTitle"
            :mask-closable='false'
            :closable='false'
            footer-hide
            :styles="{top: '20px'}"
            width='800'>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="题号" prop="questionNumber">
                    <Input v-model.trim="formValidate.questionNumber" placeholder="请输入题号" style='width:300px;'></Input>
                </FormItem>
                <FormItem label="问题" prop="question">
                    <Input v-model.trim="formValidate.question" placeholder="请输入问题" style='width:300px;'></Input>
                </FormItem>
                <FormItem label="选择题答案" prop="sections">
                    <Input v-model.trim="formValidate.sections" placeholder="请输入选择题答案" style='width:300px;'></Input>
                    <span style='color:red;'>多个答案用 && 隔开 例:A、良好&&B、一般&&C、未愈合</span>
                </FormItem>
                <FormItem label="题目类型" prop="questionType">
                    <Select v-model="formValidate.questionType" style="width:200px">
                        <Option v-for="(item, index) in followList" :value="index + 1" :key="index" style='text-align:center;'>{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="必填项" v-show='formValidate.questionType == 2'>
                    <Input v-model.trim="formValidate.answerSelect" placeholder="请输入必填项" style='width:100px;' maxlength="1"></Input>
                    <span style='color:red;'>如果选择A必填就写A</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Modal>

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
            Status: false,
            modalTitle:"添加题目",
            pageNo: 1,
            pageSize: 10,
            count: 10,
            id: sessionStorage.getItem("hospitalId"),
            data1: [],
            columns1: [
                {
                    title:"序号",
                    key:'isum',
                    align:'center'
                },
                {
                    title:"题号",
                    key:'questionNumber',
                    align:'center'
                },
                {
                    title:"问题名称",
                    key:'question',
                    align:'center'
                },
                {
                    title:"题目类型",
                    key:'questionType',
                    align:'center',
                    render:(h,params) => {
                        let row = params.row;
                        let type = this.followList[row.questionType - 1]
                        return [
                            h('span', {
                            }, type)
                        ]
                    }
                },
                {
                    title:"操作",
                    align:"center",
                    render: (h,params) => {
                        let row = params.row;
                        return [
                        h('a',{
                            on: {
                                click: () => {
                                    let id = row.id;
                                    let url = api.formcontentquerybyid
                                    let params = {
                                        formId:this.formId,
                                        id,
                                    }
                                    this.Status = true;
                                    this.$axios.post(url, params).then(res => {
                                        console.log(res);
                                        if(res.data.success) {
                                            let ret = res.data.object;
                                            this.formValidate.questionNumber = ret.questionNumber + ''
                                            this.formValidate.question = ret.question
                                            this.formValidate.sections = ret.sections
                                            this.formValidate.questionType = Number(ret.questionType)
                                            this.formValidate.answerSelect = ret.answerSelect
                                            this.formValidate.id = ret.id

                                        } else {
                                            let message = res.data.object.same || res.data.object.file || '查询失败'
                                            this.$Message.error(message)
                                        }
                                    })
                                   
                                }
                            }
                        },'编辑')
                        ]
                    }
                }
            ],
            formValidate: {
                questionNumber: "",
                question: "",
                sections:"",
                questionType:"",
                answerSelect:"",
                id : ""
            },
            ruleValidate: {
                questionNumber: [{ required: true, message: '请输入题号', trigger: 'blur' }],
                question: [{ required: true, message: '请输入问题', trigger: 'blur' }],
                sections: [{ required: true, message: '请输入选择题答案', trigger: 'blur' }],
                questionType: [{ required: true, message: '请输入题目类型', trigger: 'change', type:'number'}],
                answerSelect: [
                        { required: true, message: '请输入填空题答案', trigger: 'blur' },
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
            },
            followList: ['单项选择题', '选择题加填空题', '填空题', '多项选择题'],
            formId:""
        }
    },
    created() {
        let breadList = [
        { path: "/index", title: "首页" },
        {
            path: "/index/operation/mechanism/index",
            title: "机构运营"
        },
        {
            path: "/index/operation/followForm/index",
            title: "随访表单"
        }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        this.formId = this.$route.query.id || null
        this.loadingFollow(1)
    },
    methods: {
        addAnswer () {
            this.Status = true
            this.modalTitle = "添加题目"
        },
        back () {
            let params = {}
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/followForm/index",
                params
            );
        },
        pageChange (index) {
            this.loadingFollow(index)
        },
        loadingFollow(pageNo) {
            this.pageNo = pageNo
            let url = api.formcontentlist
            let params = {
                pageNo,
                pageSize: this.pageSize,
                hospitalId: this.id,
                formId: this.formId
            };
            this.$axios.post(url,params).then(res => {
                if(res.data.success) {
                    let ret = res.data.object;
                    this.count = ret.count
                    ret.list.forEach((item,index) => {
                        item.isum = this.addZeros(index)
                    })
                    this.data1 = ret.list;
                    console.log(ret);
                } else {
                    this.$Message.error("加载随访表单列表失败!")
                }
            })
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = ''
                    let params = {}
                    params.questionNumber = this.formValidate.questionNumber
                    params.question = this.formValidate.question
                    params.sections = this.formValidate.sections
                    params.questionType = this.formValidate.questionType
                    params.answerSelect = this.formValidate.answerSelect
                    params.formId = this.formId;

                    if(!Boolean(this.formValidate.id)) {
                        url = api.formcontentinsertformcontent
                    } else {
                        url = api.formcontentupdateformcontent
                        params.id = this.formValidate.id
                    }
                    this.$axios.post(url, params).then(res => {
                        console.log(res);
                        if(res.data.success) {
                            let ret = res.data.object
                            this.Status = false;
                            let message = ret.success || "保存成功"
                            this.loadingFollow(1)
                            this.$Message.success(message)
                        } else {
                            let message = res.data.object.same || res.data.object.file || '保存失败'
                            this.$Message.error(message)
                        }
                    })
                } else {
                    this.$Message.error('请完整填写必填项!');
                }
            })
        },
        handleReset (name) {
            this.Status = false
            this.$refs[name].resetFields();
            this.formValidate.questionNumber =''
            this.formValidate.question =''
            this.formValidate.sections =''
            this.formValidate.questionType =''
            this.formValidate.answerSelect =''
        }
    }
}
</script>
<style lang="less" scoped>
.followEdit{
    width: 98%;
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
}
</style>
