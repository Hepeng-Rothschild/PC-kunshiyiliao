<template>
	<div class='newClassify'>
		<div class='newclassifyFlex'>
			<!--显示页-->
			<div class='newclassItem'>
				<div class='left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>显示页</span>
				</div>
				<select v-model = 'wenzhen'>
					<option value = "问诊就医">问诊就医</option>
					<option value = "药品处方">药品处方</option>
				</select>
				<p>备注：显示页种只能添加一种类型，重复无效</p>
			</div>
			<!--类型-->
			<div class='newclassItem'>
				<div class='left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>类型</span>
				</div>
				<select v-model='leixing'>
					<option value="文章">文章</option>
					<option value="视频">视频</option>
				</select>
			</div>
			<!--栏目-->
			<div class='lanmu'>
				<div class='left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>栏目</span>
				</div>
				<input type="text" placeholder="请填写栏目名称" v-model='lanmu'/>
			</div>
			<!--栏目子分类-->
			<div class='manu_fenlei'>
				<div class='left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<span>栏目子分类</span>
				</div>
				<div class='zifenlei'>
					<input type="text" v-model ='arr1'/>
					<input type="text" v-model='arr2'/>
					<input type="text" v-model='arr3'/>
					<input type="text" v-model='arr4'/>
					<input type="text" v-model='arr5'/>
				</div>
			</div>
			<p class='zifenleiInfo'>输入栏目子分类，最多可输入5种，空为不显示</p>
			<!--显示-->
			<div class="ishow">
				<div class='left'>
					<span style='color:red;'>*&nbsp;&nbsp;</span>
					<input type="checkbox"  v-model='check'/>
					<span>显示</span>
				</div>
			</div>
			<!--保存-->
			<div class='save'>
				<div @click ='save'>保存</div>
				<div @click="$router.back(-1)">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted () {
			
		},
		data () {
			return {
				wenzhen:"问诊就医",
				leixing:"文章",
				lanmu:"",
				check:false,
				arr1:"",
				arr2:"",
				arr3:"",
				arr4:"",
				arr5:""
			}
		},
		methods: {
			save () {
				let arr = [this.arr1, this.arr2, this.arr3, this.arr4 ,this.arr5];
				let params = {
					arr,
					check:this.check,
					lanmu:this.lanmu,
					wenzhen:this.wenzhen,
					leixing:this.leixing
				}
				let flag = arr.every(item => item != '')
				if (params.lanmu === '') {
					this.$Message.info('栏目不能为空');
				} else if (!flag) {
					this.$Message.info('栏目子分类不能为空');
				} else {
					this.$Message.info('ok');
					this.$router.push({
						name:"addClassify"
					})
				}
				// console.log("++++++++++++++++++++++",params);
			}
		}
	}
</script>

<style scoped lang="less">
	.newClassify {
		width: 100%;
		.newclassifyFlex {
			display: flex;
			flex-direction: column;
			width: 80%;
			margin: 0 auto;
			.newclassItem {
				display: flex;
				flex-direction: row;
				height: 40px;
				line-height: 40px;
				align-items: center;
				.left {
					padding: 0 4px;
					min-width: 80px;
				}
				select {
					width: 100px;
					margin-right: 40px;
				}
				p {
					color: rgb(188, 188, 188);
				}
			}
			.lanmu {
				display: flex;
				flex-direction: row;
				height: 40px;
				line-height: 40px;
				align-items: center;
				.left {
					padding: 0 4px;
					min-width: 80px;
				}
				input {
					outline: none;
					height: 30px;
					text-indent: 5px;
				}
			}
			.manu_fenlei {
				display: flex;
				flex-direction: row;
				height: 40px;
				line-height: 40px;
				align-items: center;
				.left {
					padding: 0 4px;
					min-width: 80px;
				}
				.zifenlei {
					display: flex;
					flex-direction: row;
					flex: 1;
					input {
						margin: 0 10px;
						width: 80px;
						height: 30px;
						outline: none;
						text-indent: 5px;
					}
					input:last-child {
						margin-right: none;
					}
				}
			}
			.zifenleiInfo {
				text-align: center;
				color: #c9d1db;
			}
			.ishow {
				display: flex;
				flex-direction: row;
				height: 40px;
				line-height: 40px;
				align-items: center;
				.left {
					padding: 0 4px;
					min-width: 80px;
				}
			}
			.save {
				width: 300px;
				display: flex;
				margin: 20px auto;
				justify-content: space-around;
				div {
					padding: 0 30px;
					border: 1px solid black;
					border-radius: 4px;
					cursor: pointer;
					user-select: none;
				}
			}
		}
	}
</style>