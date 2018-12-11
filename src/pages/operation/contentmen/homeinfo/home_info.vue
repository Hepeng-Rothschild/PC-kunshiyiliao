<template>
  <div class="Institutional_information">
    <tmpHeader/>
    <div class="main">
      <!--机构名称 -->
      <div class="main_info">
        <span>机构名称</span>
        <input type="text" value="蚌埠中医院" disabled v-model="y_name">
      </div>
      <!--机构首图-->
      <div class="main_imgs">
        <span>机构首图</span>
        <div class="demo-upload-list" v-for="item in uploadList">
          <div v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </div>
          <div v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </div>
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
        <Modal title="View Image" v-model="visible">
          <img
            :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
            v-if="visible"
            style="width: 100%"
          >
        </Modal>
        <span>添加图片</span>
      </div>
      <!--机构等级-->
      <div class="main_type">
        <span>机构等级</span>
        <select v-model="y_type">
          <option :value="item.dictType" v-for="item,index in types">{{ item.dictName }}</option>
        </select>
      </div>
      <!--医联体上级医院-->
      <div class="main_info">
        <span>医联体上级医院</span>
        <select v-model="y_search1">
          <option :value="item.orgCode" v-for="item,index in ylt">{{ item.orgName }}</option>
        </select>
      </div>
      <!--背景模板-->
      <div class="main_moban">
        <span>背景模板</span>
        <select v-model="y_module">
          <option value="2">默认模板</option>
          <option value="1">中医院模板</option>
        </select>
      </div>
      <!--机构简介-->
      <div class="main_jianjie">
        <span>机构简介</span>
        <div>
          <editor
            id="editor_id"
            height="500px"
            width="700px"
            :content.sync="editorText"
            :afterChange="afterChange()"
            pluginsPath="@/../static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"
          ></editor>
        </div>
      </div>
      <!--机构路线-->
      <div class="main_info">
        <span>机构路线</span>
        <input type="text" placeholder="请输入机构乘车路线" v-model="y_luxin">
      </div>
      <!--机构电话-->
      <div class="main_info">
        <span>机构电话</span>
        <input type="text" placeholder="多个电话用,分隔" v-model="y_phone">
      </div>
      <!--机构地址-->
      <div class="main_info">
        <span>机构地址</span>
        <input type="text" placeholder="请输入机构地址" v-model="y_dizhi">
      </div>
      <!--是否开通互联网医院-->
      <div class="main_yy">
        <span class="main_yy_name">是否开通互联网医院</span>
        <iSwitch v-model="switch1"/>
      </div>
      <!--互联网医院公众号-->
      <div class="main_moban">
        <span>互联网医院公众号</span>
        <select v-model="y_gzh">
          <option :value="item.appid" v-for="item,index in gzh">{{ item.nick }}</option>
        </select>
      </div>
      <!--是否加入医院联盟-->
      <div class="main_yy">
        <span class="main_yy_name">是否加入医院联盟</span>
        <iSwitch v-model="switch2"/>
      </div>
      <!--是否开通处方流转-->
      <div class="main_yy">
        <span class="main_yy_name">是否开通处方流转</span>
        <iSwitch v-model="switch3"/>
      </div>
      <!--处方流转平台接口ID-->
      <div class="main_info">
        <span>处方流转平台接口ID</span>
        <input type="text" placeholder="请输入Id" v-model="y_uid">
      </div>
      <!--保存-->
      <div class="main_save">
        <div @click="save">保存</div>
        <div @click="$router.push('/index/operation/home')">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
	import vueEditor from '@/components/vueEditor';
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader'
  import { Switch,Upload ,Icon } from 'iview'
  import cookie from '@/utils/cookie.js';
	import api from "@/api/commonApi";
	export default{
		components:{
			tmpHeader,
			iSwitch:Switch,
			Upload,
			Icon,
			vueEditor
		},
		data () {
			return {
				id: 'tinymce-editor',
				height: 300,
				tinymceHtml: '',
				defaultList: [],
				types:[],
        imgName: '',
        visible: false,
        uploadList: [],
        switch1:true,
        switch2:true,
        switch3:true,
        y_name:"",
        y_type:6001,
        y_module:"2",
        y_luxin:"",
        y_search:"",
        y_phone:"",
        y_dizhi:"",
        y_gzh:"",
        y_uid:"",
        y_search1:'',
        gzh:[],
        ylt:[],
        editorText: '请输入要编辑的内容...',
        uploadModal: true,
        uploadData: {json:'{"urlCode":"203","flag":"1"}'},
        activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
        uploadUrl:api.fileAll,
				images:"",
				
				id:sessionStorage.getItem('hospitalId'),
			}
		},
		methods: {
      onContentChange (val) {
        this.editorText = val
      },
      afterChange () {
      },
			save () {
				let images = this.images;
				if (!images) {
					images = this.uploadList[0].url
					let len = this.fileBaseUrl.length
					let parentlen = images.length
					images = images.substr(len, parentlen)
					
				}
					let switch1 = 0;
					if (this.switch1) {
						switch1 = 1;
					}
					let switch2 = 0;
					if (this.switch2) {
						switch2 = 1;
					}
					let switch3 = 0;
					if (this.switch3) {
						switch3 = 1;
					}

				let params = {
					hospitalId:this.id,
					//上级编码
					orgParentCode:this.y_search1,
					// 医院图标
					hosIcon:images,
					//机构等级
					grade:this.y_type,
					//模板
					cssTemplate:this.y_module,
					//路线
					route:this.y_luxin,
					//电话
					telephone:this.y_phone,
					//简介
					hosIntroduction:this.editorText,
					//地址
					hosAddr:this.y_dizhi,
					//公众号
					appid:this.y_gzh,
					//处方平台UID
					prescriptionId:this.y_uid,
					//互联网医院
					swiinteinternetHospitalrnetHospitaltch1:switch1,
					//医院联盟
					internetHospital:switch2,
					//处方流转
					ipres:switch3
				}
				this.$axios.post(api.managementEdit,params).then(res => {
					if (res.data.code) {
						this.$Message.info('修改成功');
					}
					}).catch(err => {
						console.log(err);
					})
			},
			valueHandle (param) {
				this.tinymceHtml = param;
			},
			handleView (name) {
          this.imgName = name;
          this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        file.url =  this.fileBaseUrl + res.object[0].fileName;
        this.images = res.object[0].fileName
        file.name = res.object[0].fileName;
      },
      handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Message.info('只能上传一张图片');
        }
        return check;
      }
    },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    // 医院等级
    this.$axios.post(api.managementAll, {}).then(res => {
      if (res.data) {
        let ret = res.data.object;
        this.types = ret;
      }
    });
    // 医院信息
    this.$axios
      .post(api.managementInfo, {
        hospitalId: this.id
      })
      .then(res => {
        console.log(res);
        if (res.data.object) {
          let ret = res.data.object;
          // 名字
          this.y_name = ret.orgName;
          // 图片
          this.uploadList.push({
            name: "a42bdcc1178e62b4694c830f028db5c0",
            percentage: 100,
            status: "finished",
            uid: 1544263544970,
            url: this.fileBaseUrl + ret.hosIcon
            // url:ret.hosIcon
          });
          // 公众号
          this.$axios.post(api.managementGzh).then(res => {
            if (res.data) {
              let ret = res.data.object;
              this.gzh = ret;
            }
          });
          // 医联体
          this.$axios.post(api.managementYlt).then(res => {
            if (res.data) {
              let ret = res.data.object;
              this.ylt = ret;
            }
          });

          // m机构等级
          this.y_type = ret.grade;
          // 医联体
          this.y_search1 = ret.orgParentCode;
          // 模板
          this.y_module = ret.cssTemplate;
          // 简介
          this.editorText = ret.hosIntroduction;
          //路线
          this.y_luxin = ret.route;
          //电话
          this.y_phone = ret.telephone;
          // 地址
          this.y_dizhi = ret.hosAddr;
          // 公众号
          this.y_gzh = ret.appid;
          //uid
          //互联网医院
          this.switch1 = Boolean(ret.internetHospital);
          // 医院联盟
          this.switch2 = Boolean(ret.internetHospital);
          //医联体上级医院
          // 处方流转
          this.switch3 = Boolean(ret.ipres);
          this.y_uid = ret.prescriptionId;
          console.log(ret);
        }
      });
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
.Institutional_information {
  width: 100%;
  .main {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    margin: 0 auto;
    .main_info {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 30px;
      margin: 5px auto;
      span {
        display: inline-block;
        min-width: 100px;
        line-height: 30px;
      }
      input {
        display: inline-block;
        width: calc(100% - 300px);
        outline: none;
        text-indent: 5px;
      }
    }
    .main_yy {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 30px;
      margin: 5px auto;
      .main_yy_name {
        display: inline-block;
        min-width: 100px;
        margin-right: 10px;
      }
    }
    .main_imgs,
    .main_type,
    .main_moban {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 30px;
      margin: 5px auto;
      span {
        display: inline-block;
        min-width: 100px;
      }
    }
    .main_imgs {
      height: auto;
    }
    .main_jianjie {
      display: flex;
      flex-direction: row;
      width: 80%;
      height: auto;
      margin: 5px auto;
      span {
        display: inline-block;
        min-width: 100px;
      }
      div {
        margin: 0;
      }
    }
    .main_save {
      width: 300px;
      margin: 20px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      div:first-child {
        background: dodgerblue;
      }
      div {
        width: 100px;
        height: 30px;
        background: gray;
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
      }
    }
  }
}
</style>