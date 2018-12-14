<template>
  <div class="add">
    <div class="container">
      <header>
        <div>添加账号</div>
      </header>
      <div class="main">
        <!-- 登录账号 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>登录账号</span>
          </div>
          <input type="text">
        </div>
        <!-- 登录密码 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>登录密码</span>
          </div>
          <input type="password">
        </div>
        <!-- 用户姓名 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户姓名</span>
          </div>
          <input type="text" placeholder="请填写身份证上的名字">
          <div class="sex">
            <span style="color:red;">*</span>
            <span style="margin-right:20px;">性别</span>
            <input type="radio" name="sex" id="boy">
            <label for="boy">男</label>
            <input type="radio" name="sex" id="griy">
            <label for="griy">女</label>
          </div>
        </div>
        <!-- 联系电话 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>联系电话</span>
          </div>
          <input type="text" placeholder="请填写常用手机号码">
        </div>
        <!-- 机构名称 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称</span>
          </div>
          <select name id>
            <option value>中医院</option>
          </select>
        </div>
        <!-- 用户角色 -->
        <div class="pass">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <select name id>
            <option value>用户角色</option>
          </select>
        </div>
        <!-- 备注 -->
        <div class="remarks">
          <div class="left">
            <span style="color:red;">*</span>
            <span>用户角色</span>
          </div>
          <textarea name id cols="30" rows="10"></textarea>
        </div>
        <!-- 保存 -->
        <div class="save">
          <div style = 'cursor:pointer;' @click = "$router.back()">取消</div>
          <div style = 'cursor:pointer;'>保存</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.add {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    header {
      div {
        border-left: 2px solid blue;
        padding-left: 10px;
        font-size: 18px;
      }
    }
    .main {
      width: 80%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .pass {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        .left {
          width: 100px;
        }
        select{
          display:inline-block;
          width:100px;
          line-height:30px;
          outline:none;
          border-radius:4px;
        }
        input {
          display:inline-block;
          line-height:30px;
          width: 400px;
          outline: none;
          background: #fff;
          border: 1px solid #ddd;
          border-radius:4px;
          text-indent: 5px;
        }
        .sex {
          margin: 0 20px;
          input {
            width: 15px;
            height: 15px;
          }
        }
      }
      .remarks {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        .left {
          width: 100px;
        }
        textarea {
          display:inline-block;
          outline:none;
          text-indent:10px;
          width: 400px;
        }
      }
      .save {
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin:20px auto;
        div {
          width: 100px;
          line-height: 30px;
          text-align: center;
        }
        div:first-child {
          background: #fff;
          border: 1px solid #cacaca;
          border-radius: 4px;
        }
        div:last-child {
          background: #3399ff;
          color: #fff;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>

