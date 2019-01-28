<template>
  <div class="Theone">
    <div class="container">
      <tmptab :active="0"></tmptab>
      <div class="download" @click="download">下载机构信息表模板</div>
      <div class="uploading">
        <Upload
          multiple
          type="drag"
          :action="uploadUrl"
          :on-success="handleSuccess"
          :headers="fromData"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>上传填好的机构信息表</p>
          </div>
        </Upload>
      </div>
      <div class="save">
        <Button type="primary" @click="next">下一步</Button>
        <Button @click="back">上一步</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Upload } from "iview";
import tmptab from "./tmptab";
import code from "@/config/base.js";
import api from "@/api/commonApi";
export default {
  components: {
    Upload,
    tmptab
  },
  data() {
    return {
      uploadUrl: api.mechanismregUpLoad,
      uploadData: { json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}' },
      disabled: true,
      errorData: {}
    };
  },
  created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/mechanismreg/list",
                title: "机构注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
  methods: {
    download() {
      this.$axios
        .post(api.downloadTxt, {
          type: 2
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data;
            window.open(ret.message);
          }
        });
    },
    handleSuccess(res, file) {
      res = this.uploadFileDecrypt(res);
      if (res.code) {
        let ret = res.object[0];
        this.disabled = false;
        this.errorData = ret;
        console.log(ret);
        this.$Message.info("上传成功");
        /* 移除上传文件列表的删除图标 start */
        let uploadListObj = window.document.getElementsByClassName(
          "ivu-upload-list"
        )[0];
        for (let i = 0; i < uploadListObj.children.length; i++) {
          let liList = uploadListObj.children[i];
          let removeIcon = liList.children[1];
          if (removeIcon) removeIcon.parentNode.removeChild(removeIcon);
        }
        /* 移除上传文件列表的删除图标 end */
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    next() {
      if (!this.disabled) {
        this.$router.push({
          name: "mechanismregeditbatchtwo",
          params: {
            fail: this.errorData
          }
        });
      } else {
        this.$Message.info("请选择批量上传的文件");
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "mechanismreglist",
        params: {
          pageNo
        }
      });
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
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .uploading {
      width: 60%;
      margin: 0 auto;
      height: 200px;
    }
    .download {
      margin: 20px auto;
      text-align: center;
      cursor: pointer;
    }
    .save {
      width: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>
