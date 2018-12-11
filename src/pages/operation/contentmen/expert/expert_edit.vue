<template>
	<div class = 'addExpert'>
	<!--导航-->
		<tmpHeader />
		<div class="main_expert">
			<!--专家姓名-->
			<div class="main_expert_item">
				<div class="main_expert_title">
					<span style = 'color:red;'>*&nbsp;&nbsp;</span>
					<span>专家姓名</span>
				</div>
				<input type="text" placeholder = "请输入专家姓名" v-model = 'name' disabled />
				<!-- <button>检索</button> -->
			</div>
			<!--机构名称-->
			<div class="main_expert_item">
				<div class="main_expert_title">
					<span style = 'color:red;'>&nbsp;&nbsp;</span>
					<span>机构名称</span>
				</div>
				<input type="text" value='蚌埠中医院' disabled v-model='yname'/>
			</div>
			<!--专家科室-->
			<div class="main_expert_experts">
				<div class="main_expert_title">
					<span style = 'color:red;'>&nbsp;&nbsp;</span>
					<span>专家科室</span>
				</div>
				<div class = 'iselected'>
					<select v-model='keshi' disabled>
						<option :value="keshi">{{ keshi }}</option>
					</select>
					<span>职称</span>
					<select v-model='zhiwu'  disabled>
						<option value="主任医师">主任医师</option>
						<option value="副主任医师">副主任医师</option>
						<option value="住院医师">住院医师</option>
						<option value="主治医师">主治医师</option>
					</select>
				</div>
			</div>
			<!--职务-->
			<div class="main_expert_item">
				<div class="main_expert_title">
					<span style = 'color:red;'>&nbsp;&nbsp;</span>
					<span>职务</span>
				</div>
				<input type="text" placeholder = "请输入专家职务"  style= 'width:200px;' v-model = 'post'/>
			</div>
			<!--专业特长-->
			<div class="main_expert_inputi">
				<div class="main_expert_title">
					<span style = 'color:red;'>*&nbsp;&nbsp;</span>
					<span>专业特长</span>
				</div>
				<div class = 'shuru'>
					<textarea name="" rows="" cols="" disabled v-model = 'doctorGood'></textarea>
				</div>
			</div>
			<!--个人简介-->
			<div class="main_expert_inputi">
				<div class="main_expert_title">
					<span style = 'color:red;'>*&nbsp;&nbsp;</span>
					<span>个人简介</span>
				</div>
				<div class = 'shuru'>
					<textarea name="" rows="" cols="" disabled v-model = 'personalIntroduction'></textarea>
				</div>
			</div>
			<!--排序-->
			<div class="main_expert_item">
				<div class="main_expert_title">
					<span style = 'color:red;'>&nbsp;&nbsp;</span>
					<span>排序</span>
				</div>
				<input type="text"  style = 'width:100px;' v-model='isort'/>
				<p style='margin-left:10px;'>备注:只能填写数字,1代表置顶以此类推</p>
			</div>
			<!--显示-->
			<div class="main_expert_item">
				<div class="main_expert_title">
					<span style = 'color:red;'>&nbsp;&nbsp;</span>
					<span>是否显示</span>
				</div>
				<iSwitch v-model="switch1" @on-change="change" />
			</div>
			<!--保存-->
			<div class="expert_save">
				<span @click = 'save'>保存</span>
				<span>取消</span>
			</div>
		</div>
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader';
	import { Switch } from 'iview'
	import api from "@/api/commonApi";
	export default{
		components: {
			tmpHeader,
			iSwitch:Switch
		},
		data () {
			return {
				id: 'tinymce-editor',
				id1: 'tinymce-editor1',
				height: 200,
				tinymceHtml: '',
				switch1:true,
				name:"",
				yname:"",
				keshi:"",
				zhiwu:"",
				isort:"",
				personalIntroduction:"",
				doctorGood:"",
				post:""
			}
		},
		mounted () {
			console.log(this.$route.params.item);
			let data = this.$route.params.item
			this.name = data.doctorName;
			this.yname = data.hospitalName;
			this.personalIntroduction = data.personalIntroduction;
			this.doctorGood = data.doctorGood;
			this.zhiwu = data.title
			this.post = data.post
			this.keshi = data.deptType
			this.isort = data.priority
		},
		methods: {
			//显示按钮
			change (status) {
                // this.$Message.info('开关状态：' + status);
            },
            save () {
				let switch1 = 0;
				if (this.switch1) {
					switch1 = 1
				}
				let hospitalId = sessionStorage.getItem('hospitalId');
				let doctorId = this.$route.params.item.doctorId
            	let params = {
					// 显示
					iexpert: switch1,
					//排序
					priority:this.isort,
					// 职务
					post:this.post,
					doctorId,
					hospitalId
				
            	}
            	if (params.name == '') {
            		this.$Message.info('专家姓名不能为空');	
            	} else {
					this.$axios.post(api.expertedit, params).then(res => {
						if (res.data.code) {
							this.$Message.info('修改成功');	
							setTimeout(() => {
								this.$router.push({
									name:"operationExpert"
								})
							}, 500)
						}
					})
            	}
            	console.log(params);
            }
		}
	}
</script>

<style scoped lang="less">
.addExpert{
	width:100%;
	
	.main_expert{
		width:80%;
		display:flex;
		flex-direction: column;
		margin:0 auto;
		.main_expert_item{
			display:flex;
			flex-direction:row;
			height:50px;
			align-items:center;
			.main_expert_title{
				min-width:100px;
			}
			input{
				display:inline-block;
				width:400px;
				height:30px;
				outline:none;
				text-indent:5px;
			}
			button{
				width:60px;
				height:30px;
				border-radius:10px;
				margin-left:20px;
				border:none;
				outline:none;
				background: rgb(51, 204, 255);
				color:#fff;
			}
		}
		.main_expert_experts{
			display:flex;
			flex-direction:row;
			height:50px;
			align-items:center;
			.main_expert_title{
				min-width:100px;
			}
			.iselected{
				select{
					width:150px;
				}
				span{
					display:inline-block;
					margin:0 20px;
				}
			}
		}
		.main_expert_inputi{
			display:flex;
			flex-direction:row;
			margin:10px 0;
			.main_expert_title{
				min-width:100px;
			}
			.shuru{
				textarea{
					width:400px;
					height:150px;
				}
				
			}
		}
		.expert_save{
			width:200px;
			height:50px;
			margin:10px auto;
			display:flex;
			flex-direction:row;
			justify-content: space-between;
			span{
				display:inline-block;
				width:60px;
				height:30px;
				color:#fff;
				border-radius:4px;
				text-align:center;
				line-height:30px;
				background:#00BFFF;
				cursor:pointer;
			}
		}
	}
}
</style>