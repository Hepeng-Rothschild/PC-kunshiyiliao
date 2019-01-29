<template>
  <div class="table-editor">
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