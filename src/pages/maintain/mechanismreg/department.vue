<template>
  <div class="mechanismregdepartment">
    <span @click="add">医院基本信息</span>
    <span>院内科室</span>
    <div class="container">
      <div class="container-main">
        <Button
          type="primary"
          @click="$router.push('/index/maintain/mechanismreg/mechanismregDepartment/add')"
        >添加科室</Button>
        <!-- 列表 -->
        <div class="list">
          <Table border :columns="column" :data="list" stripe></Table>
        </div>
      </div>
      <div class="department-table" v-if="editdepartment">
        <Form ref="formValidate" :model="formValidate">
          <!-- 科室名称 -->
          <div class="department">
            <div class="left">
              <span>科室名称:</span>
            </div>
            <FormItem prop="departmentName">
              <Input v-model.trim="formValidate.departmentName" style="width: 300px"></Input>
            </FormItem>
          </div>
          <!-- his编码 -->
          <div class="department">
            <div class="left">
              <span>HIS编码:</span>
            </div>
            <FormItem prop="hisCode">
              <Input v-model.trim="formValidate.hisCode" style="width: 300px"></Input>
            </FormItem>
          </div>
          <!-- 科室简介 -->
          <div class="department">
            <div class="left">
              <span>科室简介:</span>
            </div>
            <FormItem prop="departmentIntroduce">
              <Input
                v-model.trim="formValidate.departmentIntroduce"
                type="textarea"
                :rows="4"
                style="width: 300px"
              ></Input>
            </FormItem>
          </div>
        </Form>
        <div class="button-bottom">
          <Button type="primary">保存</Button>
          <Button @click="editdepartment = false" style="margin-left:30px">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editdepartment:false,
      formValidate: {
        // 科室名称
        departmentName: "",
        // his 编码
        hisCode: "",
        // 科室简介
        departmentIntroduce: ""
      },
      list: [{ sum: "1", firstDepartment: "sadsa", secondDepartment: "dasd" }],
      column: [
        {
          title: "序号",
          key: "sum",
          align: "center"
          // width: 60
        },
        {
          title: "一级科室",
          key: "firstDepartment",
          align: "center"
          // width: 300
        },
        {
          title: "二级科室",
          key: "secondDepartment",
          align: "center"
          // width: 300
        },
        {
          title: "操作",
          align: "center",
          key: "action",
          // width: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  on: {
                    click: () => {
                      this.edit();
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delete();
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 修改内容
    edit() {
      this.editdepartment = true
    },
    // 跳转到新增机构
    add() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/mechanismreg/mechanismregAdd",
        {
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          hospital: this.hospital,
          isBack: 2
        }
      );
    }
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
      margin-bottom: 100px;
    }
    .department-table {
      width: 500px;
      height: 300px;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      border: 1px solid black;
      .button-bottom {
        text-align: center;
        button {
          width: 80px;
          height: 30px;
        }
      }
      .department {
        display: flex;
        text-align: center;
        flex-direction: row;
        .left {
          font-size: 20px;
          span:last-child {
            font-weight: 600;
          }
        }
        input {
          display: inline-block;
          width: 400px;
          border: 1px solid black;
          line-height: 30px;
          outline: none;
          background: #fff;
          text-indent: 5px;
        }
      }
    }
  }
}
</style>
