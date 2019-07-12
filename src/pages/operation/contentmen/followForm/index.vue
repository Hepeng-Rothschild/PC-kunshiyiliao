<template>
  <div class="followForm">
    <tmpHeader />
    <br />
    <Button type="info" @click='addForm'>添加表单</Button>
    <Table stripe :columns="columns1" :data="data1" style="margin:10px 0;"></Table>
    <Page :total="count" @on-change="pageChange" :current="pageNo" :page-size='pageSize' style='text-align:center;' />

    <Modal
        v-model="modalStatus"
        :title="modalTitle"
        :mask-closable='false'
        :closable='false'
        footer-hide
        :styles="{top: '20px'}"
        width='600'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="表单名称" prop="formName">
                <Input v-model="formValidate.formName" placeholder="请输入表单名称" style='width:370px;'></Input>
            </FormItem>
            <FormItem label="表单类型" prop="pattern">
                <Select v-model="formValidate.pattern" style="width:200px">
                    <Option v-for="(item, index) in followList" :value="item.id" :key="index" style='text-align:center;'>{{ item.name }}</Option>
                </Select>
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
  data() {
    return {
      modalStatus: false,
      modalTitle:"添加表单",
      pageNo: 1,
      pageSize: 10,
      count: 10,
      id: sessionStorage.getItem("hospitalId"),
      columns1: [
          {
            title:"序号",
            key:"isum",
            align:"center",
          },
          {
            title:"表单名称",
            key:'formName',
            align:"center",
          },
          {
            title:"表单类型",
            key:'formTypeName',
            align:"center",
          },
          {
            title:"操作",
            align:"center",
            render: (h, params) => {
                let row = params.row;
                return [
                    h(
                        'a',{
                        on: {
                            click: () => {
                                let id = row.id;
                                let params = {
                                    id
                                }
                                this.functionJS.queryNavgationTo(
                                    this,
                                    "/index/operation/followForm/edit",
                                    params
                                );
                            }
                        }
                    }, 
                    '查看问题'),
                    " | ",
                    h(
                        'a',{
                            on: {
                                click: () => {
                                    this.modalStatus = true
                                    this.modalTitle = '修改表单'
                                    this.formValidate.pattern = String(row.pattern)
                                    this.formValidate.formName = row.formName
                                    this.formValidate.id = row.id
                                }
                            }
                    }, 
                    '编辑表单'),
                ]
            }
        }
      ],
      data1: [],
      formValidate: {
        pattern : null,
        formName : "",
        id: ""
      },
      ruleValidate: {
        formName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
        pattern: [{ required: true, message: '请输入表单类型', trigger: 'change'}]
      },
      followList:[]
    };
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
    this.searchFormType();
  },
  mounted() {
    this.loadingFollow(1)
  },
  methods: {
    addForm () {
        this.modalStatus = true
        this.modalTitle = '添加表单'
    },
    pageChange (index) {
        this.loadingFollow(index)
    },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let url = ''
                let params = {}
                params.formName = this.formValidate.formName
                params.pattern = this.formValidate.pattern
                params.hospitalId = this.id
                if(!Boolean(this.formValidate.id)){
                    url = api.itemforminsertform
                } else {
                    url = api.itemformupdatetform
                    params.id = this.formValidate.id
                }
                this.$axios.post(url, params).then(res => {
                    if(res.data.success) {
                        this.handleReset('formValidate')
                        this.loadingFollow(1)
                        this.$Message.success('保存成功')
                    } else {
                        this.$Message.error('保存失败')
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
        this.formValidate.pettern = '';
        this.formValidate.formName = ''
        this.formValidate.id = ''
    },
    // 查询所有表单数据
    loadingFollow(pageNo) {
        this.pageNo = pageNo
        let url = api.itemformlist;
        let params = {
            pageNo,
            pageSize: this.pageSize,
            hospitalId: this.id
        };
        this.$axios.post(url,params).then(res => {
            if(res.data.success) {
                let ret = res.data.object;
                console.log("表单列表", ret);
                this.count = ret.count;
                ret.list.forEach((item, index) => {
                    item.isum = this.addZeros(index)
                    this.followList.forEach(is => {
                        if (Number(item.pattern) == Number(is.id)) {
                            item.formTypeName = is.name
                        }
                    })
                })
                this.data1 = ret.list;
            } else {
                this.$Message.error("加载随访表单列表失败!")
            }
        })
    },
    // 查询所有随访表单类型
    searchFormType() {
        let url = api.itemformiselection
        this.$axios.post(url,{}).then(res => {
            if(res.data.success) {
                let ret = res.data.object;
                this.followList = ret
                console.log("表单类型",ret);
            } else {
                this.$Message.error("加载关联表单失败")
            }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.followForm {
  width: 98%;
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
}
</style>
