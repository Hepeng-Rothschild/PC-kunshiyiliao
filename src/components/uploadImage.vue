<template>
    <div class="f_calssify">
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            :action="uploadUrl"
            :headers="fromData"
            :data="uploadData"
            style="display: inline-block;width:58px;"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="预览图片" v-model="visible" footer-hide width='420'>
            <img :src="uploadList[0].url " v-if="visible" style="width: 100%;height:400px;">
        </Modal>
    </div>
</template>

<script>
import code from "@/configs/base.js";
import cookie from "./../utils/cookie.js";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            imgName: "",
            visible: false,
            uploadList: [],
            defaultList: [],
            uploadModal: true,
            uploadData: { json: '{"urlCode":"' + 0 + '"}' },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: ""
        };
    },
    props: {
      img : {
        type:String,
        default : function(){
          return ""
        }
      },
      uploadCode : {
        type : String,
        default : function () {
          return ""
        }
      }
    },
    methods: {
        handleView(name) {
          this.imgName = name;
          this.visible = true;
        },
        handleRemove(file) {
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
          res = this.uploadFileDecrypt(res);
          if(res.code != 401) {
            file.url = this.fileBaseUrl + res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            this.$emit("imgFn", this.images)
            file.name = res.object[0].fileName;
          } else {
            this.$Message.error("Token不合法,请重新登录重试!")
            // this.$axios.
            setTimeout(() => {
              this.logout();
            }, 500)
          }
        },
        handleFormatError(file) {
          this.$Notice.warning({
            title: "格式错误",
            desc: "文件 " + file.name + " 上传失败,请重试"
          });
        },
        handleMaxSize(file) {
          this.$Notice.warning({
            title: "文件过大",
            desc: `文件${file.name}过大，文件最大限制为2000KB`
          });
        },
        handleBeforeUpload(file) {
          const check = this.uploadList.length < 1;
          if (!check) {
            this.$Message.info("只能上传一张图片");
          }
          return check;
        },
        logout() {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("top");
          window.localStorage.removeItem("sun1");
          window.localStorage.removeItem("sun2");
          window.localStorage.removeItem("sun3");
          window.localStorage.removeItem("sun4");
          window.localStorage.removeItem("sun5");
          window.localStorage.clear();
          window.sessionStorage.clear();
          cookie.delCookie("username");
          cookie.delCookie("userIcon");
          cookie.delCookie("randmId");
          cookie.delCookie("operateUserId");
          cookie.delCookie("idtt");
          cookie.delCookie("idttC");
          cookie.delCookie("access_user");
          cookie.delCookie("ownArea");

          window.location.href = '#/login';
          window.close();
      },
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        if(Boolean(this.img)) {
            this.images = this.img
            this.uploadList.push({
                name: "a42bdcc1178e62b4694c830f028db5c0",
                percentage: 100,
                status: "finished",
                uid: 1544263544971,
                url: this.fileBaseUrl + this.pictureFormat(this.img)
            });
        }
        this.uploadData = { json: '{"urlCode":"' + this.uploadCode + '"}' }
    }
};
</script>

<style scoped lang="less">

.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>