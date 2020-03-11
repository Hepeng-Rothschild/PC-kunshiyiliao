<template>
  <div class="mechanismregdepartment">
    <span>医院基本信息</span>
    <span>院内科室</span>
    <div class="container">
      <span>选择院内开通科室</span>
      <div class="container-main">
        <div class="select-department">
          <div>
            <Collapse v-model="Collapse">
              <Panel name="1">
                外科
                <div slot="content"></div>
              </Panel>
              <Panel name="2">
                儿科
                <div slot="content"></div>
              </Panel>
              <Panel name="3">
                内科
                <div slot="content">
                  <Checkbox v-model="xxg">心血管内科</Checkbox>
                  <Checkbox v-model="sj">神经内科</Checkbox>
                  <Checkbox v-model="xh">消化内科</Checkbox>
                  <Checkbox v-model="my">免疫科</Checkbox>
                  <Checkbox v-model="nfm">内分泌科</Checkbox>
                  <Checkbox v-model="hx">呼吸科</Checkbox>
                  <Checkbox v-model="sb">肾病内科</Checkbox>
                  <Checkbox v-model="xg">血液科</Checkbox>
                  <Checkbox v-model="gr">感染内科</Checkbox>
                  <Checkbox v-model="gm">过敏反应科</Checkbox>
                  <Checkbox v-model="ln">老年病科</Checkbox>
                  <Checkbox v-model="gy">高压氧科</Checkbox>
                  <Checkbox v-model="pt">普通内科</Checkbox>
                </div>
              </Panel>
              <Panel name="4">
                妇科
                <div slot="content"></div>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div class="button-bottom">
          <Button type="primary">保存</Button>
          <Button @click="$router.go(-1)" style="margin-left:30px">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Collapse: "3",
      xxg: false,
      sj: false,
      xh: false,
      nfm: false,
      my: false,
      hx: false,
      sb: false,
      xg: false,
      gr: false,
      gm: false,
      ln: false,
      gy: false,
      pt: false
    };
  },
  mounted () {
    // 获取医院开通科室列表
    
  },
  methods: {

  }
};
</script>
<style lang='less' scoped>
.mechanismregdepartment {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  box-sizing: border-box;
  .container {
    width: 100%;
    height: 800px;
    background: #ffffff;
    // display: flex;
    flex-direction: column;
    .container-main {
      flex-direction: column;
      width: 80%;
      .button-bottom {
        margin-top: 100px;
        margin-left: 50px;
        text-align: left;
        button {
          width: 200px;
          height: 50px;
        }
      }
      .select-department {
        width: 500px;
        height: 100%;
        border: 1px solid black;
        .ivu-collapse-content-box {
          .ivu-checkbox-wrapper {
            padding: 15px;
            margin: 0px;
          }
        }
      }
    }
  }
}
</style>
