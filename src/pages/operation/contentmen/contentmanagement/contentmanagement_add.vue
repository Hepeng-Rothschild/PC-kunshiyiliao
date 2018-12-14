<template>
	<div class='home_article'>
		<!--标题-->
		<div class='article_title'>
			<span>文章</span>
		</div>
		<!--编辑-->
		<div class='home_edit'>
			<!--主标题-->
			<div class='edit_input'>
				<div class='edit_input_left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>新闻标题</span>
				</div>
				<div class='edit_input_right'>
					<input type="text" placeholder="请输入新闻标题" v-model='title' maxlength="30" />
					<span>{{title.length}}/30</span>
				</div>
			</div>
			<!--副标题-->
			<div class='edit_input'>
				<div class='edit_input_left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>副标题</span>
				</div>
				<div class='edit_input_right'>
					<input type="text" placeholder="请输入新闻标题" v-model='ftitle' maxlength="30" />
					<span>{{ftitle.length}}/30</span>
				</div>
			</div>
			<!--列表小图-->
			<div class='listImg'>
				<div class='listImgTitle'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>列表小图</span>
				</div>
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
						<Upload ref="upload" 
							:show-upload-list="false" 
							:default-file-list="defaultList" 
							:on-success="handleSuccess" 
							:format="['jpg','jpeg','png']" 
							:max-size="2048" 
							:on-format-error="handleFormatError" 							:before-upload="handleBeforeUpload" 
							multiple 
							type="drag" 
							
							:action = "uploadUrl"
							:headers = 'fromData'
							:data = 'uploadData'
							
							style="display: inline-block;width:58px;">
							
					<div style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="ios-camera" size="20"></Icon>
						
					</div>
				</Upload>
				<Modal title="预览图片" v-model="visible">
					<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
				</Modal>
			</div>
			<!--栏目-->
			<div class='lanmu'>
				<div class='listImgTitle'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>栏目</span>
				</div>
				<select v-model='select'>
					<option value="1">头条</option>
					<option value="2">今日热点</option>
					<option value="3">医学前沿</option>
					<option value="4">宝宝喂养</option>
					<option value="5">科普</option>
					<option value="6">决策者说</option>
				</select>
			</div>
			<!--排序-->
			<div class='sort'>
				<div class='listImgTitle'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>排序</span>
				</div>
				<input type="text" v-model='num' />
				<p>备注：只能填写数字，1代表置顶以此类推</p>
			</div>
			<!--新闻内容-->
			<div class='article_content'>
				<div class='listImgTitle'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>新闻内容</span>
				</div>
				<div class='articletext'>
					<editor id="editor_id" height="500px" width="700px" :content.sync="editorText"
			            :afterChange="afterChange()"
			            pluginsPath="@/../static/kindeditor/plugins/"
			            :loadStyleMode="false"
			            @on-content-change="onContentChange">
					</editor>
				</div>

			</div>
			<!--新闻来源-->
			<div class='edit_input'>
				<div class='edit_input_left'>
					<span style='color:red;'>&nbsp;&nbsp;</span>
					<span>新闻来源</span>
				</div>
				<div class='edit_input_right'>
					<input type="text" placeholder="请输入新闻的来源,未填写显示未知" v-model='source' maxlength="30" />
					<span>{{source.length}}/30</span>
				</div>
			</div>
			<!--是否发布-->
			<div class='fabu'>
				<div class='edit_input_left'>
					<span style='color:red;'>&nbsp;&nbsp;</span>
					<span>是否发布</span>
				</div>
				<iSwitch v-model="switch1" />
			</div>
			<!--保存/取消-->
			<div class='queding'>
				<button @click='save'>保存</button>
				<button @click = '$router.back()'>取消</button>
			</div>
		</div>
	</div>
</template>

<script>
	import vueEditor from '@/components/vueEditor';
	import { Switch, Upload, Icon } from 'iview'
	import api from "@/api/commonApi";
	export default {
		components: {
			vueEditor,
			iSwitch: Switch,
			Upload,
			Icon
		},
		data () {
			return {
				id: 'tinymce-editor',
				height: 200,
				title: "",
				ftitle: "",
				select: "1",
				num: "",
				source: "",
				switch1: true,
				test: "",
				img: [],
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
				id:sessionStorage.getItem('hospitalId'),
				
                editorText: '请输入要编辑的内容...',
				
				uploadModal: true,
				
                activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
                uploadUrl:api.fileAll,
				uploadData: {json:'{"urlCode":"201","flag":"1"}'},
				images:''
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		},
		methods: {
			onContentChange (val) {
		      this.editorText = val
		    },
		    afterChange () {
		    },
			valueHandle(val) {
				this.test = val;
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
            	file.url =  this.fileBaseUrl + res.object[0].fileName;
				this.images = JSON.stringify(res.object[0]);
				file.name = res.object[0].fileName;
			},
			handleFormatError(file) {
				this.$Message.info('上传失败');
			},
			handleBeforeUpload(file) {
				const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Message.info('只能上传一张图片');
                }
                return check;
			},
			//保存
			save() {
				//判断必填项是否已填
				if(!this.title) {
					this.$Message.info('主标题不能为空');
				} else if(!this.ftitle) {
					this.$Message.info('主标题副标题不能为空不能为空');
				} else if(!this.num) {
					this.$Message.info('主标题不排序不能为空能为空');
				} else if(!this.select) {
					this.$Message.info('请选择类型');
				} else {
					let release = 0;
					if(this.switch1) {
						release = 1
					}
					//把页面上的参数获取到
					let params = {
						ids:[this.select],
						operateArticle: {
							title: this.title,
							synopsis: this.ftitle,
							priority: this.num,
							content:this.editorText,
							source:this.source,
							enable: release
						}
					}
					let images = '';
					if (this.images && this.uploadList.length) {
						images = this.images;
					} else if (this.uploadList.length) {
						images = this.uploadList[0].url
					} else {
						images = ''
					}
					params.operateArticle.cover = images;
					
					console.log(params.operateArticle.cover);
					this.$axios.post(api.createdWrap, params).then(res => {
						if (res.data.code) {
							this.$Message.info('添加成功' );
							setTimeout(() => {
								this.$router.push({
									name: "contentmanagementHome"
								})
							},500)
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},
			addZero(num) {
				if(num < 10) {
					num = '0' + num
				}
				return num
			}
		}
	}
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
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
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
		background: rgba(0, 0, 0, .6);
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
	
	.home_article {
		width: 100%;
		height: 100%;
		background: #f2f2f2;
		.article_title {
			padding: 0 30px;
			margin: 5px 0;
			background: #fff;
			span {
				display: inline-block;
				font-size: 30px;
				font-weight: 500;
				color: deepskyblue;
				border-bottom: 4px solid deepskyblue;
			}
		}
		/*编辑列表*/
		.home_edit {
			width: 800px;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			padding: 30px 0;
			.edit_input {
				display: flex;
				flex-direction: row;
				margin: 10px 0;
				.edit_input_left {
					width: 100px;
					margin-right: 10px;
					line-height: 30px;
				}
				.edit_input_right {
					width: 400px;
					position: relative;
					height: 30px;
					border: 1px solid gray;
					input {
						border: none;
						outline: none;
						background: none;
						text-indent: 4px;
						height: 30px;
						width: 90%;
					}
					span {
						position: absolute;
						right: 5px;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		/*列表小图*/
		.listImg {
			margin: 10px 0;
			display: flex;
			flex-direction: row;
			line-height: 30px;
			position: relative;
			.listImgTitle {
				width: 100px;
				margin-right: 10px;
			}
			.addImg {
				display: block;
				width: 30px;
				height: 30px;
				background: #fff;
				margin-right: 10px;
				font-weight: bold;
				text-align: center;
				line-height: 30px;
			}
			.addFile {
				position: absolute;
				top: 0;
				left: 110px;
				display: block;
				width: 30px;
				height: 30px;
				opacity: 0;
			}
			#show {
				display: inline-block;
				width: 30px;
				height: 30px;
				border: none;
			}
		}
		/*栏目*/
		.lanmu {
			margin: 10px 0;
			display: flex;
			flex-direction: row;
			line-height: 30px;
			.listImgTitle {
				width: 100px;
				margin-right: 10px;
			}
			select {
				width: 120px;
				outline: none;
			}
		}
		/*排序*/
		.sort {
			margin: 10px 0;
			display: flex;
			flex-direction: row;
			line-height: 30px;
			.listImgTitle {
				width: 100px;
				margin-right: 10px;
			}
			input {
				width: 50px;
				height: 30px;
				display: block;
				outline: none;
			}
			p {
				margin-left: 10px;
			}
		}
		/*新闻内容*/
		.article_content {
			margin: 10px 0;
			display: flex;
			flex-direction: row;
			line-height: 30px;
			.listImgTitle {
				width: 100px;
				margin-right: 10px;
			}
			.inputAll {
				margin: 0;
			}
			.articletext {
				flex: 1;
			}
		}
		/*发布*/
		.fabu {
			margin: 10px 0;
			display: flex;
			flex-direction: row;
			line-height: 30px;
			.edit_input_left {
				width: 100px;
				margin-right: 10px;
			}
		}
		/*保存*/
		.queding {
			width:200px;
			display: flex;
			margin:0 auto;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			button {
				padding: 6px 20px;
				color: #fff;
				border: none;
				outline: none;
				border-radius: 4px;
			}
			button:first-child {
				background: #359aff;
			}
			button:last-child {
				background: #cacaca;
			}
			button:first-child:hover {
				background: #716bb2;
			}
			button:last-child:hover {
				background: #d98c8c;
			}
		}
	}
</style>