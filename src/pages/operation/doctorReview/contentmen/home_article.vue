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
							:on-format-error="handleFormatError" 							:on-exceeded-size="handleMaxSize" 							:before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
					<div style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="ios-camera" size="20"></Icon>
						
					</div>
				</Upload>
				<Modal title="View Image" v-model="visible">
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
					<option value="健康资讯">健康资讯</option>
					<option value="宝宝健康">宝宝健康</option>
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
					<vue-editor :id="id" :height="height" @valueHandle="valueHandle" class='inputAll'></vue-editor>
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
				<button>取消</button>
			</div>
		</div>
	</div>
</template>

<script>
	import vueEditor from '@/components/vueEditor';
	import { Switch, Upload, Icon } from 'iview'
	export default {
		components: {
			vueEditor,
			iSwitch: Switch,
			Upload,
			Icon
		},
		created() {
			let route = this.$route.params.item;
			if(route) {
				this.select = route.lanmu;
				this.title = route.title;
				this.num = route.sort

			}
			let myDate = new Date();
		},
		data() {
			return {
				id: 'tinymce-editor',
				height: 200,
				title: "",
				ftitle: "",
				select: "健康资讯",
				num: "",
				source: "",
				switch1: true,
				test: "",
				img: [],
				defaultList: [
					{
						'name': 'a42bdcc1178e62b4694c830f028db5c0',
						'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
					}
				],
				imgName: '',
				visible: false,
				uploadList: []
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		},
		methods: {
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
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if(!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
					});
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
				} else if(!this.test) {
					this.$Message.info('新闻内容不能为空');
				} else {
					let release = '未发布';
					if(this.switch1) {
						release = '已发布'
					}
					//获取当前时间
					let myDate = new Date();
					let idate = myDate.toLocaleDateString() + ' ' + this.addZero(myDate.getHours()) + " : " + this.addZero(myDate.getMinutes());

					//把页面上的参数获取到
					let params = {
						time: idate,
						title: this.title,
						sort: this.num,
						num: "02",
						type: '文章',
						release,
						read: "0",
						coll: "0",
						id: "2",
						lanmu: this.select,
						msg: this.test
					}
					this.$router.push({
						name: "reviewlist4",
						params: {
							currentData: params
						}
					})
				}
				console.log(params)
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