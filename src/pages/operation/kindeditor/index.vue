<template>
  <div class="table-editor">
    <editor
      id="editor_id"
      height="500px"
      width="700px"
      :content.sync="editorText"
      :afterChange="afterChange()"
      pluginsPath="@/../static/kindeditor/plugins/"
      :uploadJson="uploadJson"
      :loadStyleMode="false"
      @on-content-change="onContentChange"
    ></editor>
    <div>editorTextCopy: {{ editorTextCopy }}</div>
  </div>
</template>

<script>
import api from "@/api/commonApi.js";
export default {
  name: "table-editor",
  data() {
    return {
      editorText: "请输入要编辑的内容...", // 双向同步的变量
      editorTextCopy: "", // content-change 事件回掉改变的对象 要提交到后台的数据
      uploadJson: ""
    };
  },
  methods: {
    onContentChange(val) {
      this.editorTextCopy = val;
    },
    afterChange() {}
  },
  created(){
    this.uploadJson = api.fillAll;
  }
};
</script>

<style lang="less" scoped>
.table-editor {
  margin-left: 1%;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
}
</style>