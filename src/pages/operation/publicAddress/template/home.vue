<template>
  <div class="templateHome">
    <tmpHeader/>
  </div>
</template>
<script>
import tmpHeader from "../tmpHeader";
export default {
  components: {
    tmpHeader
  }
};
</script>
<style lang="less" scoped>
.templateHome {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
}
</style>
