<template>
  <div class="table-editor">
    <!-- <editor
      id="editor_id"
      height="500px"
      width="700px"
      :content.sync="editorText"
      :afterChange="afterChange()"
      pluginsPath="@/../static/kindeditor/plugins/"
      :loadStyleMode="false"
      @on-content-change="onContentChange"
    ></editor> -->
    <vueEditor id="editorDemo" :textHtml="textHtml" :urlCode="urlCode" @valueHandle="afterChange"></vueEditor>
  </div>
</template>

<script>
import api from "@/api/commonApi.js";
import vueEditor from "@/components/vueEditor";
export default {
  name: "table-editor",
  data() {
    return {
      urlCode:'{"urlCode":"102"}', //上传图片的code码
      textHtml:""
    };
  },
  methods: {
    afterChange(val) {
      this.textHtml = val;
      console.log(this.textHtml);
    }
  },
  components:{
    vueEditor
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