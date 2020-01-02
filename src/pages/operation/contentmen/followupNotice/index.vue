<template>
  <div class="followupNotice">
    <tmpHeader />
    <br />
    <Button type="info" @click='addFollow'>添加新告知书</Button>
    <Table stripe :columns="columns1" :data="data1" style="margin:10px 0;"></Table>
    <!-- <Page :total="count" @on-change="pageChange" :current="pageNo" :page-size='pageSize' style='text-align:center;' /> -->

    <Modal
        v-model="modalStatus"
        :title="modalTitle"
        :mask-closable='false'
        :closable='false'
        footer-hide
        :styles="{top: '20px'}"
        width='800'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="告知书标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入告知书标题" style='width:370px;'></Input>
            </FormItem>
            <FormItem label="告知书类型" prop="type">
                <Select v-model="formValidate.type" style="width:200px">
                    <Option v-for="(item, index) in followList" :value="index+1" :key="index" style='text-align:center;'>{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem label="告知书内容" prop="content">
                <vueEditor
                    id="editor_id"
                    :textHtml="formValidate.content"
                    :urlCode="urlCode"
                    @valueHandle="afterChange"
                    :height='100'
                    style='margin:0;'
                ></vueEditor>
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
import code from "@/configs/base.js";
import vueEditor from "@/components/vueEditor";
export default {
  components: {
    tmpHeader,
    vueEditor
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      count: 10,
      id: sessionStorage.getItem("hospitalId"),
      columns1: [
        {
          title: "序号",
          key: "isum",
          align: "center"
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            let row = params.row;
            return [
              h(
                "a",
                {
                  on: {
                    click: () => {
                        this.modalStatus = true;
                        this.modalTitle = '编辑新告知书'
                        this.$axios.post(api.agreementquerybyid,{
                            id: row.id
                        }).then(res => {
                            console.log(res);
                            if(res.data.success) {
                                let ret = res.data.object;
                                this.formValidate.content = ret.content
                                this.formValidate.title = ret.title
                                this.formValidate.id = ret.id
                                this.formValidate.type = ret.type
                            } else {
                                this.$Message.error('加载告知书详情失败')
                            }
                        })
                    }
                  }
                },
                "编辑"
              )
            ];
          }
        }
      ],
      data1: [],
      formValidate: {
        content : "",
        title : "",
        id : "",
        type : null
      },
      ruleValidate:{
        title: [{ required: true, message: '请输入告知书标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入告知书内容', trigger: 'blur' }],
        type: [{ required: true, message: '请输入告知书类型', trigger: 'change' ,type:'number' }]
      },
      modalStatus: false,
      modalTitle :"新增告知书",
      followList:["签约随访"],
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
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
        path: "/index/operation/followupNotice/index",
        title: "随访告知书"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  mounted () {
    this.loadingData(1)
  },
  methods: {
    afterChange(val) {
      this.formValidate.content = val;
      console.log(val);
    },
    pageChange(index) {
        this.loadingData(index)
    },
    // 添加按钮
    addFollow () {
        this.modalStatus = true;
        this.modalTitle = '添加新告知书'
    },
    // 保存按钮
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let url = '';
                let params = {
                  hospitalId: this.id,
                  content: this.formValidate.content,
                  title: this.formValidate.title,
                  type: this.formValidate.type,
                }
                if(!Boolean(this.formValidate.id)) {
                  url = api.agreementinsertagreement
                } else {
                  url = api.agreementupdateagreement
                  params.id = this.formValidate.id
                }
                console.log('告知书参数',params);
                this.$axios.post(url, params).then(res => {
                    console.log(res);
                    if(res.data.success) {
                      this.handleReset('formValidate')
                      this.loadingData(1)
                      this.$Message.success('保存成功')
                    } else {
                      let message = res.data.object.same || res.data.object.file || "操作失败"
                      this.$Message.error(message)
                    }
                })
            } else {
                this.$Message.error('请完整填写必填项!');
            }
        })
    },
    handleReset (name) {
        this.modalStatus = false;
        this.$refs[name].resetFields();
        this.formValidate.content = ''
        this.formValidate.title = ''
        this.formValidate.id = ''
        this.formValidate.type = ''
    },
    loadingData (pageNo) {
        let url = api.agreementlist
        let params = {
            pageNo,
            pageSize: this.pageSize,
            hospitalId: this.id,
        }
        this.pageNo = pageNo;
        this.$axios.post(url, params).then(res => {
            if(res.data.success) {
              console.log(res);
                let ret = res.data.object;
                ret.forEach((item,index) => {
                    item.isum = this.addZeros(index)
                })
                this.data1 = ret
                console.log('告知书列表',ret);
            } else {
                this.$Message.error('查询告知书列表失败')
            }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.followupNotice {
  width: 98%;
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
}
</style>
