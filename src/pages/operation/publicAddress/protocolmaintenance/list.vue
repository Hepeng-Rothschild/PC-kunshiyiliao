<template>
  <div class="followupNotice">
    <tmpHeader :index="4"/>
    <br />
    <Button type="info" @click='addFollow'>添加协议</Button>
    <Table stripe :columns="columns1" :data="data1" style="margin:10px 0;"></Table>
    <Page :total="count" @on-change="pageChange" :current="pageNo" :page-size='pageSize' style='text-align:center;' />

    <Modal
        v-model="modalStatus"
        :title="modalTitle"
        :mask-closable='false'
        :closable='false'
        footer-hide
        :styles="{top: '20px'}"
        width='1000'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="协议名称" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入协议名称" style='width:370px;'></Input>
            </FormItem>
            <FormItem label="协议类型" prop="type">
                <Select v-model="formValidate.type" style="width:200px">
                    <Option v-for="(item, index) in followList" :value="item.code" :key="index" style='text-align:center;'>{{ item.message }}</Option>
                </Select>
            </FormItem>
            <FormItem label="是否启用">
                <iSwitch size="large"  v-model="formValidate.iclick" >
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </iSwitch>
            </FormItem>
            <FormItem label="协议内容" prop="content">
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
import tmpHeader from "../tmpHeader";
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import vueEditor from "@/components/vueEditor";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
  components: {
    tmpHeader,
    vueEditor
  },
  data() {
    return {
      urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
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
          title: "协议标题",
          key: "protocolName",
          align: "center"
        },
        {
          title: "协议类型",
          key: "protocolType",
          align: "center"
        },
        // {
        //   title: "适用机构",
        //   key: "title",
        //   align: "center"
        // },
        {
          title: "状态(是否启用)",
          key: "protocolStatus",
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
                        // this.modalStatus = true;
                        // this.modalTitle = '修改协议'
                        // this.$axios.post(api.wxprotocolfindById,{
                        //     id: row.id
                        // }).then(res => {
                        //     console.log(res);
                        //     if(res.data.success) {
                        //         let ret = res.data.object;
                        //         this.formValidate.content = ret.protocol
                        //         this.formValidate.title = ret.protocolName
                        //         this.formValidate.id = ret.id
                        //         this.formValidate.type = ret.protocolType
                        //         if(ret.protocolStatus == 1){
                        //           this.formValidate.iclick = true
                        //         }else{
                        //           this.formValidate.iclick = false
                        //         }
                        //     } else {
                        //         this.$Message.error('加载协议详情失败')
                        //     }
                        // })
                        this.change(row)
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
        type : null,
        iclick: false
      },
      ruleValidate:{
        title: [{ required: true, message: '请输入协议标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入协议内容', trigger: 'blur' }],
        type: [{ required: true, message: '请输入协议类型', trigger: 'change' ,type:'number' }]
      },
      modalStatus: false,
      modalTitle :"新增协议",
      followList:[],
      appid:'',
    };
  },
  created () {
        let iv = store.state.iv;
        let salt = store.state.salt;
        this.appid = aesUtils.decrypt(salt,iv,"wxAppid",localStorage.getItem("appid"))
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/publicHosting/index",
                title: "公众号托管"
            },
            {
                path: "/index/operation/publicAddress/list",
                title: "公众号管理"
            }
      ];
      this.$emit("changeBreadList", breadList);
  },
  mounted () {
    this.loadingData(1)
    this.getwxTypeEnums()
  },
  methods: {
    // 点击编辑
    change(item) {
      this.functionJS.queryNavgationTo(this,'/index/operation/protocolmaintenance/edit',{
        id: item.id,pageNo:this.pageNo,txt:'修改协议'
      })
    },
    afterChange(val) {
      this.formValidate.content = val;
      console.log(val);
    },
    pageChange(index) {
        this.loadingData(index)
    },
    // 添加按钮
    addFollow () {
        // this.modalStatus = true;
        // this.$forceUpdate();
        // this.modalTitle = '添加协议'
        this.functionJS.queryNavgationTo(this,'/index/operation/protocolmaintenance/edit',{pageNo:this.pageNo,txt:'添加协议'})
    },
    // 保存按钮
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let url = '';
                let iclickstatus
                if(this.formValidate.iclick == false){
                    iclickstatus = 0
                }else{
                    iclickstatus = 1
                }
                console.log(this.formValidate.id)
                let params = {
                  appid: this.appid,
                  protocolStatus:iclickstatus,
                  protocol: this.formValidate.content,
                  protocolName: this.formValidate.title,
                  protocolType: this.formValidate.type,
                }
                if(this.modalTitle == '新增协议'){
                  if(!Boolean(this.formValidate.id)) {
                    url = api.wxprotocolinsert
                  } else {
                    url = api.wxprotocolinsert
                    params.id = this.formValidate.id
                  }
                }else{
                  if(!Boolean(this.formValidate.id)) {
                    url = api.wxprotocolupdate
                  } else {
                    url = api.wxprotocolupdate
                    params.id = this.formValidate.id
                  }
                }
                console.log('协议参数',params);
                this.$axios.post(url, params).then(res => {
                    console.log(res);
                    if(res.data.success) {
                      this.handleReset('formValidate')
                      this.loadingData(1)
                      this.$Message.success('保存成功')
                    } else {
                      this.$Message.error(res.data.message)
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
    //获取协议类型
    getwxTypeEnums(){
      this.$axios.post(api.wxprotocolfindProtocolTypeEnums).then(res => {
            console.log(res)
            if(res.data.code == 1){
              this.followList = res.data.object
            }else{
              this.$Message.error('获取协议类型失败')
            }
        })
    },
    //获取列表
    loadingData (pageNo) {
        let url = api.wxprotocolpage
        let params = {
            pageNo,
            pageSize: this.pageSize,
            appid: this.appid,
        }
        console.log('入参',params)
        this.pageNo = pageNo;
        this.$axios.post(url, params).then(res => {
              console.log(res)
            if(res.data.success) {
              console.log(res);
                let ret = res.data.object;
                ret.list.forEach((item,index) => {
                    item.isum = this.addZeros(index)
                    item.protocolStatus = item.protocolStatus == 1 ? "是" :"否" 
                    if(item.protocolType == 1){
                      item.protocolType = '注册协议'
                    }
                })
                this.data1 = ret.list
            } else {
                this.$Message.error('查询协议列表失败')
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
