<template>
	<!--开通科室-->
	<div class = 'addManagement'>
		<div class = "addManag">
			<tmpHeader />
			<h4 @click = 'btn'>选择院内开通科室</h4>
			<div class = 'fuwu'>
				<!--内科-->
				<div class = 'xsfw'>
					<p>内科</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="yi" name='快速咨询' />
							<label for="yi">普通内科</label>
						</div>
						<div>
							<input type="checkbox"  id="yii" name='在线药房' />
							<label for="yii">感染内科</label>
						</div>
						<div>
							<input type="checkbox"  id="yii" name='在线药房' />
							<label for="yii">呼吸内科</label>
						</div>
						<div>
							<input type="checkbox"  id="yii" name='在线药房' />
							<label for="yii">心内科</label>
						</div>
					</div>
					<!--第二行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="ei" name='专家问诊'/>
							<label for="ei">消化内科</label>
						</div>
						<div>
							<input type="checkbox"  id="eii" name='在线续方'/>
							<label for="eii">消化内科</label>
						</div>
					</div>
				</div>
			</div>
				<!--外科-->
			<div class = 'fuwu'>
				<!--外科-->
				<div class = 'xsfw'>
					<p>外科</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="mi" name='预约挂号' />
							<label for="mi">基本外科</label>
						</div>
						<div>
							<input type="checkbox"  id="mii" name='门诊缴费' />
							<label for="mii">泌尿外科</label>
						</div>
						<div>
							<input type="checkbox"  id="miii" name='检查预约' />
							<label for="miii">神经外科</label>
						</div>
						<div>
							<input type="checkbox"  id="miii" name='科室导航' />
							<label for="miii">心外科</label>
						</div>
					</div>
					<!--第二行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="ai" name='候诊服务'/>
							<label for="ei">乳腺外科</label>
						</div>
					</div>
				</div>
			</div>
				<!--妇产科-->
			<div class = 'fuwu'>
				<!--妇产科-->
				<div class = 'xsfw'>
					<p>妇产科</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='费用查询' />
							<label for="">妇科</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='住院报告' />
							<label for="">产科</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='住院病历' />
							<label for="">妇科内分泌科</label>
						</div>
					</div>
					
				</div>
			</div>
				<!--儿科-->
			<div class = 'fuwu'>
				<!--儿科-->
				<div class = 'xsfw'>
					<p>儿科</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='健康档案' />
							<label for="">小儿呼吸科</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='家医签约' />
							<label for="">小儿感染科</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='家医履约' />
							<label for="">小儿骨科</label>
						</div>
					</div>
				</div>
			</div>
				<!--儿科-->
			<div class = 'fuwu'>
				<!--儿科-->
				<div class = 'xsfw'>
					<p>儿科</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='体检预约' />
							<label for="">健康档案</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='体检评估' />
							<label for="">家医签约</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='合理用药' />
							<label for="">家医履约</label>
						</div>
					</div>
				</div>
			</div>
			<p style='text-align:center;'>注：已通科室如有医生信息，不能取消，需将科室内医生先移除后，方可操作。</p>
				<!--保存-->
			<div class="expert_save">
				<span @click = 'navto'>保存</span>
				<span>取消</span>
			</div>
		</div>
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader';
	export default{
		data () {
			return {
				arr:[]
			}
		},
		components: {
			tmpHeader
		},
		methods: {
			btn () {
				console.log(this.arr);
			},
			navto () {
				this.$router.push({
					name:"reviewlist19"
				})
			}
		}
	}
</script>

<style scoped lang="less">
.addManagement{
	width:100%;
	.addManag{
		display:flex;
		flex-direction:column;
		padding:20px;
		h4{
			padding-left:4px;
			border-left:2px solid blue;
		}
		.fuwu{
			width:calc(100% - 100px);
			margin: 0 auto;
			display:flex;
			flex-direction: column;
			border-bottom:2px solid gray;
			.xsfw{
				margin:10px 0;
				.select_wufu{
					margin:0 30px;
					display:flex;
					flex-direction:row;
					padding:14px 20px;
					align-items:center;
					
					div{
						margin:0 20px;
						input{
							outline:none;
							border:none;
						}
						label{
							user-select:none;
						}
					}
					
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