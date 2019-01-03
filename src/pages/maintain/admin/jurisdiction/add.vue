<template>
  <div class="add">
    <div class="main">
      <Form ref="formInline" :model="info" :rules="infoRules" :label-width="150">
        <FormItem prop="itemName" label="角色名称">
          <Input
            class="w-input"
            v-model.trim="info.itemName"
            :maxlength="20"
            placeholder="请输入角色名称"
            style="width:300px;"
          />
        </FormItem>
        <FormItem prop="desc" label="角色说明">
          <Input
            v-model.trim="info.desc"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 10}"
            placeholder="最多输入40个汉字"
            :maxlength="40"
          />
        </FormItem>
        <FormItem label="权限" prop="interest">
          <CheckboxGroup v-model="info.interest">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <div class="save">
        <Button @click = 'back'>取消</Button>
        <Button type="primary" @click = 'save'>保存</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { CheckboxGroup, Checkbox } from "iview";
export default {
  components: {
    CheckboxGroup,
    Checkbox
  },
  data() {
    return {
      info: {
        itemName: null,
        desc: ""
      },
      infoRules: {
        itemName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "角色说明不能为空",
            trigger: "blur"
          }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "最少选择一个",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods:{
      back () {
          this.$router.back();
      },
      save () {
          console.log(this.info);
      }
  }
};
</script>
<style lang="less" scoped>
.add {
  width: 98%;
  padding: 10px;
  margin-left: 1%;
  margin: 0 auto;
  background: #fff;
  .main{
      .save{
          width:200px;
          display: flex;
          flex-direction: row;
          align-items:center;
          justify-content: space-around;
          margin:0 auto;
      }
  }
}
</style>

