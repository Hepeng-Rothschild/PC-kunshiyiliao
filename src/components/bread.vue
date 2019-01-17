<template>
  <div class="bread">
    <Breadcrumb class="w-bread" separator=">" v-if="breadList.length>0">
      <!-- <BreadcrumbItem v-for="(item,index) of breadList" :to="item.path" :key="index">{{item.title}}</BreadcrumbItem> -->
      <BreadcrumbItem v-for="(item,index) of breadList" :key="index">{{item.title}}</BreadcrumbItem>
    </Breadcrumb>
    <!-- <span>{{breadTitle}}</span> -->
  </div>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from "iview";
export default {
  data() {
    return {};
  },
  props:["breadList","breadTitle"],
  components: {
    Breadcrumb,
    BreadcrumbItem
  }
};
</script>
<style lang="less" scoped>
.bread{
  width:100%;
  height:48px;
  line-height:48px;
  background:#ffffff;
  margin:10px 0;
  padding:0 10px;
  .w-bread{
    width:40%;
    display:inline-block;
  }
}
</style>