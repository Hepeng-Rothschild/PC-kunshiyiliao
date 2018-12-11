<template>
  <div class="table-editor"> 
    <editor id="editor_id" height="500px" width="700px" :content.sync="editorText"
            :afterChange="afterChange()"
            :afterUpload="afterload()"
            pluginsPath="@/../static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"></editor>
    <div> editorTextCopy: {{ editorTextCopy }} </div>
  </div>
</template>

<script>
export default {
  name: 'table-editor',
  data () {
    return {
      editorText: '请输入要编辑的内容...', // 双向同步的变量
      editorTextCopy: ''  // content-change 事件回掉改变的对象 要提交到后台的数据
    }
  },
    methods: {
    onContentChange (val) {
      this.editorTextCopy = val;
    },
    afterChange () {
    },
    afterload(){
      console.log(123)
    }
  }
}
</script>

<style lang="less" scoped>
  .table-editor{
    margin-left:1%;
    width:98%;
    background:#ffffff;
    box-sizing: border-box;
  }
</style>