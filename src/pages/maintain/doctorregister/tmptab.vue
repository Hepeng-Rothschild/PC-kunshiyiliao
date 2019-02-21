<template>
  <div class="wrapper">
    <header>
      <div class="one" v-for="item,index in list">
        <div :class="{active:index <= active}">
          <em>{{ addZeros(index) }}</em>
          <span>{{ item }}</span>
        </div>
        <span class="triangle" :class="{active:index <= active}"></span>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  props: {
    active: { 
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: ["上传文件", "执行导入", "完成"]
    };
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  header {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 70px auto;
    .one {
      width: 25%;
      position: relative;
      div.active {
        background: #f70;
        color: #fff;
      }
      div {
        width: 100%;
        height: 50px;
        border-radius: 4px;
        font-size: 25px;
        text-align: center;
        line-height: 50px;
        user-select: none;
        background: #e8e8e8;
        color: #999;
      }
      span.active {
        border-left-color: #f70;
      }
      .triangle {
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: transparent;
        position: absolute;
        border-left-color: #e8e8e8;
        right: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
