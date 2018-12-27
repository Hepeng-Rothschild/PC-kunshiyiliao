<template>
  <div class = 'add'>
    <tmpHeader/>
    <div class="main">
        
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  }
};
</script>
<style lang="less" scoped>
.add {
  width: 100%;
  display: flex;
  flex-direction: column;
  .main {
    width: 80%;
    margin: 0 auto;
  }
}

</style>
