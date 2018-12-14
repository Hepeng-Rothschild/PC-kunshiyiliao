<template>
  <div class="edit">
    <div class="container">
      <header>
        <div>添加账号</div>
      </header>
      <div class="main">
        <!-- 登录账号 -->
        <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>登录账号</span>
          </div>
          <input type="text">
        </div>
        <!-- 登录密码 -->
        <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>登录密码</span>
          </div>
          <input type="password">
        </div>
        <!-- 用户姓名 -->
        <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>用户姓名</span>
          </div>
          <input type="password">
          <p class = 'info'>请填写身份证上的名字</p>
        </div>
        <!-- 联系电话 -->
        <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>联系电话</span>
          </div>
          <input type="password">
          <p>请填写常用手机号码</p>
        </div>
        <!-- 机构名称 -->
        <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>机构名称</span>
          </div>
          <select name="" id="">
            <option value="1">蚌埠中医院</option>
          </select>
          <p>请填写系统使用机构名称</p>
        </div>
        <!-- 用户角色 -->
         <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>用户角色</span>
          </div>
          <select name="" id="">
            <option value="1">运营人员</option>
          </select>
        </div>
        <!-- 备注 -->
        <div class="item">
          <div class="item-left">
            <span style='color:red;'>*</span>
            <span>用户角色</span>
          </div>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <!-- 保存 -->
        <div class = 'save'>
            <div>取消</div>
            <div>保存</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="less" scoped>
.edit {
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
    .main{
      width:100%;
      margin:20px auto;
      display:flex;
      flex-direction:column;

      .item{
        width:500px;
        display:flex;
        flex-direction:row;
        align-items:center;
        
        margin:0 auto;
        .item-left{
          width:100px;
        }
        .info{
          text-align:center;
          color:#999;
        }
        input{
          display:inline-block;
          width:300px;
          line-height:30px;
          background: #fff;
          outline:none;
        }
      }

      .save{
        display:flex;
        flex-direction: row;
        width:300px;
        justify-content: space-around;
        div:last-child{
          background: skyblue;
        }
        div{
          width:80px;
          height:50px;
          border-radius:4px;
          border:1px solid #ddd;
          background: #fff;
        }
      }

    }
  }
}
</style>

