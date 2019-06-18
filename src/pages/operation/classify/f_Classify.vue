<template>
    <div class="f_calssify">
      <uploadImages :uploadCode='uploadCode' :img='img' @imgFn='imgFn'></uploadImages>
    </div>
</template>

<script>
import code from "@/configs/base.js";
import api from "@/api/commonApi";
import uploadImages from '@/components/uploadIMage'
export default {
  components : {
    uploadImages,
  },
    data() {
        return {
          list: [],
          img: '{"fileName":"operate/lecture/head/img/20190605150410646555863.jpg","smallFileName":"operate/lecture/head/img/s_20190605150410646555863.jpg"}',
          uploadCode: code.urlCode.hospitalBanner
        };
    },
    methods : {
      imgFn (file) {
        this.img = file
        console.log(file);
      }
    }
};
</script>

<style scoped lang="less">
.f_calssify {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>