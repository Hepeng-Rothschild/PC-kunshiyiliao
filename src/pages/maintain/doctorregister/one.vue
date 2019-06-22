<template>
  <div class="Theone">
    <div class="container">
      <tmptab :active="0"></tmptab>
      <div class="download" @click="download">下载医生信息表模板</div>
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
            <p>上传填写好的医生信息表</p>
          </div>
        </Upload>
      </div>
      <div>
        <button class="next" :class="{'disabled':disabled}" @click="next">下一步</button>
        <span @click="back" style="user-select:none;cursor:pointer;">上一步</span>
      </div>
    </div>
  </div>
</template>
<script>
import tmptab from "./tmptab";
import code from "@/configs/base.js";
import api from "@/api/commonApi";
export default {
  components: {
    tmptab
  },
  data() {
    return {
      uploadUrl: api.uploadXls,
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
        path: "/index/maintain/doctorregister/list",
        title: "医生注册信息"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  mounted() {},
  methods: {
    download() {
      this.$axios
        .post(api.downloadTxt, {
          type: 1
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data;
            console.log(ret);
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
        // FUNCTION公用 方法
        this.functionJS.paramsNavgationTo(this, "doctorregisterbatchtwo", {
          fail: this.errorData
        });
      } else {
        this.$Message.info("请选择批量上传的文件");
      }
    },
    back() {
      let pageNo = this.$route.query.pageNo;
      // FUNCTION公用 方法
      this.functionJS.queryNavgationTo(this, "/index/maintain/doctorregister/list", {
        pageNo
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
    .next {
      width: 100px;
      line-height: 30px;
      border: none;
      outline: none;
      border-radius: 4px;
      color: #fff;
      background: #2d8cf0;
      transition: all 0.5s;
    }
    .disabled {
      background: #ccc;
    }
  }
}
</style>
