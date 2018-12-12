<template>
  <div class="Theone">
      <div class="container">
          <tmptab :active = '0'></tmptab>
          <div class="download">
              下载医生信息表模板
          </div>
          <div class = 'uploading'>
              <Upload
                multiple
                type="drag"
                :action = "uploadUrl"
                :headers = 'fromData'
                :data = 'uploadData'
                :on-success="handleSuccess"
               >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传填写好的医生信息表</p>
                    <p>xls格式,且文件大小不能超过2M</p>
                </div>
            </Upload>
          </div>
          <button class = 'next' @click = 'next'>下一步</button>
      </div>
  </div>
</template>
<script>
import { Upload } from 'iview'
import tmptab from './tmptab'
import api from "@/api/commonApi";
export default {
    components:{
        Upload,
        tmptab
    },
    data () {
        return {
            uploadUrl:api.uploadXls, 
            uploadData: {json:'{"urlCode":"203","flag":"1"}'}
        }
    },
    methods :{
        handleSuccess (res,file) {
            console.log(res)
            console.log(file)
        },
        next () {
            this.$router.push({
                name:"mechanismregeditbatchtwo"
            })
        }
    }

};
</script>
<style lang="less" scoped>
.Theone {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container{
      width:100%;
      display:flex;
      flex-direction: column;
        .uploading{
            width:60%;
            margin:0 auto;
        }
        .download{
            margin:20px auto;
            text-align:center;
            cursor:pointer;
        }
        .next{
            width:100px;
            line-height:30px;
            border:none;
            outline:none;
            border-radius:4px;
            color:#fff;
            background: skyblue;
        }
    }
}
</style>
