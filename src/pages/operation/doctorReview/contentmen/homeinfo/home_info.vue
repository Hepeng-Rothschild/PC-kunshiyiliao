<template>
	<div class = 'Institutional_information'>
		<tmpHeader />
		<div class="main">
			<!--机构名称 -->
			<div class="main_info">
				<span>机构名称</span>
				<input type="text" value='蚌埠中医院' disabled v-model = 'y_name'/>
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
					
			        :action="fileImages"
			        :headers ="fromData"
			        :data="filetype"

			        style="display: inline-block;width:58px;">
			        <div style="width: 58px;height:58px;line-height: 58px;">
			            <Icon type="ios-camera" size="20"></Icon>
			        </div>
			    </Upload>
			    <Modal title="View Image" v-model="visible">
			        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
			    </Modal>
				<span>添加图片</span>
			</div>
			<!--机构等级-->
			<div class="main_type">
				<span>机构等级</span>
				<select v-model='y_type'>
					<option value="一级医疗机构">一级医疗机构</option>
					<option value="二级医疗机构">二级医疗机构</option>
					<option value="三级医疗机构">三级医疗机构</option>
				</select>
			</div>
			<!--医联体上级医院-->
			<div class="main_info">
				<span>医联体上级医院</span>
				<input type="text" placeholder='机构搜索' v-model = 'y_search1'/>
			</div>
			<!--背景模板-->
			<div class="main_moban">
				<span>背景模板</span>
				<select v-model = 'y_module'>
					<option value="默认模板">默认模板</option>
					<option value="中医院模板">中医院模板</option>
				</select>
			</div>
			<!--机构简介-->
			<div class="main_jianjie">
				<span>机构简介</span>
				<div>
					<vue-editor :id="id" :height="height" @valueHandle="valueHandle"></vue-editor>
				</div>
			</div>
			<!--机构路线-->
			<div class="main_info">
				<span>机构路线</span>
				<input type="text" placeholder='请输入机构乘车路线' v-model = 'y_luxin'/>
			</div>
			<!--机构电话-->
			<div class="main_info">
				<span>机构电话</span>
				<input type="text" placeholder='多个电话用,分隔' v-model = 'y_phone'/>
			</div>
			<!--机构地址-->
			<div class="main_info">
				<span>机构地址</span>
				<input type="text" placeholder='请输入机构地址' v-model='y_dizhi'/>
			</div>
			<!--是否开通互联网医院-->
			<div class="main_yy">
				<span class = 'main_yy_name'>是否开通互联网医院</span>
					<iSwitch v-model="switch1" />
			</div>
			<!--互联网医院公众号-->
			<div class="main_moban">
				<span>互联网医院公众号</span>
				<select v-model='y_gzh'>
					<option value="选择公众号">选择公众号</option>
					<option value="蚌埠中医院互联网医院">蚌埠中医院互联网医院</option>
					<option value="医到健康">医到健康</option>
				</select>
			</div>
			<!--是否加入医院联盟-->
			<div class="main_yy">
				<span class = 'main_yy_name'>是否加入医院联盟</span>
					<iSwitch v-model="switch2" />
			</div>
			<!--是否开通处方流转-->
			<div class="main_yy">
				<span class = 'main_yy_name'>是否开通处方流转</span>
					<iSwitch v-model="switch3" />
			</div>
			<!--处方流转平台接口ID-->
			<div class="main_info">
				<span>处方流转平台接口ID</span>
				<input type="text" placeholder='请输入Id' v-model = 'y_uid'/>
			</div>
			<!--保存-->
			<div class = 'main_save'>
				<div @click = 'save'>保存</div>
				<div>取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vueEditor from '@/components/vueEditor';
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader'
	import { Switch,Upload ,Icon } from 'iview'
	import api from "@/api/commonApi";
	export default{
		components:{
			tmpHeader,
			iSwitch:Switch,
			Upload,
			Icon,
			vueEditor
		},
		created () {
			 console.log(this.$route.params.item);
		},
		data () {
			return {
				id: 'tinymce-editor',
				height: 300,
				tinymceHtml: '',
				defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                switch1:true,
                switch2:true,
                switch3:true,
                y_name:"蚌埠中医院",
                y_type:"一级医疗机构",
                y_module:"默认模板",
                y_luxin:"",
                y_search:"",
                y_phone:"",
                y_dizhi:"",
                y_gzh:"选择公众号",
                y_uid:"",
                y_search1:'',
                fileImages:api.fileAll,
                fromData:{'ContentType':'application/x-www-form-urlencoded'},
                filetype:{type:1},
			}
		},
		methods: {
			save () {
				let params = {
					name:this.y_name,
					type:this.y_type,
					module:this.y_module,
					luxian:this.y_luxin,
					search:this.y_search,
					search1:this.y_search1,
					phone:this.y_phone,
					dizhi:this.y_dizhi,
					gzh:this.y_gzh,
					uid:this.y_uid,
					switch1:this.switch1,
					switch2:this.switch2,
					switch3:this.switch3
				}
				console.log(params);
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
            	console.log(res,file);
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
		},
		 mounted () {
            this.uploadList = this.$refs.upload.fileList;
           
        }
	}
</script>

<style scoped lang="less">
  .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
.Institutional_information{
	width:100%;
	.main{
		width:80%;
		display:flex;
		flex-direction:column;
		padding:30px 0;
		margin:0 auto;
		.main_info{
			display:flex;
			flex-direction:row;
			width:80%;
			height:30px;
			margin:5px auto;
			span{
				display:inline-block;
				min-width:100px;
				line-height:30px;
			}
			input{
				display:inline-block;
				width:calc(100% - 300px);
				outline:none;
				text-indent:5px;
			}
		}
		.main_yy{
			display:flex;
			flex-direction:row;
			width:80%;
			height:30px;
			margin:5px auto;
			.main_yy_name{
				display:inline-block;
				min-width:100px;
				margin-right:10px;
			}
		}
		.main_imgs,.main_type,.main_moban{
			display:flex;
			flex-direction:row;
			width:80%;
			height:30px;
			margin:5px auto;
			span{
				display:inline-block;
				min-width:100px;
			}
		}
		.main_imgs{
			height:auto;
		}
		.main_jianjie{
			display:flex;
			flex-direction:row;
			width:80%;
			height:auto;
			margin:5px auto;
			span{
				display:inline-block;
				min-width:100px;
			}
			div{
				margin:0;
			}
		}
		.main_save{
			width:300px;
			margin:20px auto;
			display:flex;
			flex-direction:row;
			justify-content: space-around;
			div:first-child{
				background: dodgerblue;
			}
			div{
				width:100px;
				height:30px;
				background: gray;
				color:#fff;
				text-align:center;
				line-height:30px;
				border-radius:4px;
			}
		}
	}
}
</style>