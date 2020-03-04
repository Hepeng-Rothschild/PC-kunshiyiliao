<template>
  <!--Banner-->
  <div class="i_addBanner">
    <h2 style="margin:10px 0;font-weight:bold;">{{text}}</h2>
    <div class="main">
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
    </div>
  </div>
</template>

<script>
import tmpHeader from "../tmpHeader";
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import vueEditor from "@/components/vueEditor";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store"
export default {
  components: {
    tmpHeader,
    vueEditor
  },
  data() {
    return {
        text:'',
        id: "",
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
        urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
        followList:[],
    };
  },
  created() {
    this.text = this.$route.query.txt
    if(this.text == '修改协议'){
      this.gettext()
    }
    this.getwxTypeEnums()
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
  methods: {
    //获取编辑信息
    gettext(){
      this.$axios.post(api.wxprotocolfindById,{id:this.$route.query.id}).then(res => {
          console.log(res);
          if(res.data.success) {
              let ret = res.data.object;
              this.formValidate.content = ret.protocol
              this.formValidate.title = ret.protocolName
              this.formValidate.id = ret.id
              this.formValidate.type = ret.protocolType
              if(ret.protocolStatus == 1){
                this.formValidate.iclick = true
              }else{
                this.formValidate.iclick = false
              }
          } else {
              this.$Message.error('加载协议详情失败')
          }
      })
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
    afterChange(val) {
      this.formValidate.content = val;
      console.log(val);
    },
    // 后退
    handleReset (name) {
        this.modalStatus = false;
        this.$refs[name].resetFields();
        this.formValidate.content = ''
        this.formValidate.title = ''
        this.formValidate.id = ''
        this.formValidate.type = ''
        let pageNo = this.$route.query.pageNo;
        this.functionJS.queryNavgationTo(this, "/index/operation/protocolmaintenance/list", {pageNo});
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
                if(this.text == '添加协议'){
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
  },
  mounted() {
  }
};
</script>


<style scoped lang="less">
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.i_addBanner {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main{
    width:70%;
    margin:0 auto;
  }
}
</style>