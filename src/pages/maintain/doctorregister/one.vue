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
            <p>上传填写好的机构信息表</p>
          </div>
        </Upload>
      </div>
      <button class="next" :class="{'disabled':disabled}" @click="next">下一步</button>
    </div>
  </div>
</template>
<script>
import { Upload } from "iview";
import tmptab from "./tmptab";
import api from "@/api/commonApi";
export default {
  components: {
    Upload,
    tmptab
  },
  data() {
    return {
      uploadUrl: api.uploadXls,
      uploadData: { json: '{"urlCode":"9997"' },
      disabled: true,
      errorData: {}
    };
  },
  mounted() {
    // console.log(this.fromData);
  },
  methods: {
    download() {
      this.$axios
        .post(api.downloadTxt, {
          type: 1
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data;
            window.open(ret.message)
          }
        });
    },
    handleSuccess(res, file) {
      if (res.code) {
        let ret = res.object[0];
        this.disabled = false;
        this.errorData = ret;
        this.$Message.info("上传成功");
      } else {
        this.$Message.info("上传失败,请重试");
      }
    },
    next() {
      if (!this.disabled) {
        this.$router.push({
          name: "doctorregisterbatchtwo",
          params: {
            fail: this.errorData
          }
        });
      } else {
        this.$Message.info("请选择批量上传的文件");
      }
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
      background: skyblue;
      transition: all 0.5s;
    }
    .disabled {
      background: #ccc;
    }
  }
}
</style>
