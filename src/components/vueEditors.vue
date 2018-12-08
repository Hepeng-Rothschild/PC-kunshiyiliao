<style scoped lang="less">
.tinymce-editor{
	width: 90%;
	margin: 0 5%;
}
</style>

<template>
	<div class="tinymce-editor">
		<editor :id="id" v-model = "tinymceHtml" :init="init" ></editor>
	</div>
</template>

<script>
/**
 * @file 富文本编辑器
 * @param id id属性（必传字段）
 * @param height 编辑器高度 (非必传)
 * @param plugins 扩展插件 (非必传) 插件需要此处import
 * @param toolbar 工具栏 (非必传)
 * @param valueHandle func方法将富文本value值传给父组件
 * @date 2018-07-27
 * @author wangwenfa
 */
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
export default {
	components: {
		Editor
	},
	props: {
		id: {
			type: String,
			required: true
		},
		height: {
			default: 500,
			type: Number
		},
		plugins: {
			default: '',
			type: String
		},
		toolbar: {
			default: '',
			type: String
		},
		tinymceHtmls: {
			default:'<p style="color:#666;">请输入内容...<p>',
			type: String
		}
	},
	data () {
		return {
			tinymceHtml: '<p style="color:#666;">请输入内容...<p>',
			init: {
				language_url: '../../static/tinymce/langs/zh_CN.js',
				language: 'zh_CN',
				skin_url: '../../static/tinymce/skins/lightgray',
				height: 500,
				plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
				toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
				branding: false,
				images_upload_handler: (blobInfo, success, failure) => {
					this.handleImgUpload(blobInfo, success, failure);
				}
			}
		};
	},
	created () {
		this.init.height = this.height;
		this.init.plugins = this.plugins ? (this.plugins + this.init.plugins) : this.init.plugins;
		
	},
	mounted () {
		tinymce.init({});
		this.tinymceHtml = this.tinymceHtmls;
		this.$emit('valueHandle', this.tinymceHtml);
		
	},
	methods: {
		handleImgUpload (blobInfo, success, failure) {
			let formdata = new FormData();
			formdata.set('userFile', blobInfo.blob());
			this.$axios.post('http://172.23.251.3:8084/hr/hr/uploadAttachment', formdata).then(res => {
				success(res.data.data[0].attachmentUrl);
			}).catch(res => {
				failure('error');
			});
		}
	},
	watch: {
		tinymceHtml (newValue, oldValue) {
			this.$emit('valueHandle', newValue);
		}
	}
};
</script>
<style lang="less" scoped>
	
</style>