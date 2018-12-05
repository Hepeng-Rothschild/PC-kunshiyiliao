<template>
	<!--服务管理-->
	<div class = 'addManagement'>
		<tmpHeader />
		<div class = "addManag">
			
			<h4 @click = 'btn'>添加服务</h4>
			<div class = 'fuwu'>
				<!--线上服务-->
				<div class = 'xsfw'>
					<p>线上服务</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="yi" name='快速咨询' />
							<label for="yi">快速咨询</label>
						</div>
						<div>
							<input type="checkbox"  id="yii" name='在线药房' />
							<label for="yii">在线药房</label>
						</div>
					</div>
					<!--第二行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="ei" name='专家问诊'/>
							<label for="ei">专家问诊</label>
						</div>
						<div>
							<input type="checkbox"  id="eii" name='在线续方'/>
							<label for="eii">在线续方</label>
						</div>
					</div>
				</div>
			</div>
				<!--门诊服务-->
			<div class = 'fuwu'>
				<!--门诊服务-->
				<div class = 'xsfw'>
					<p>门诊服务</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="mi" name='预约挂号' />
							<label for="mi">预约挂号</label>
						</div>
						<div>
							<input type="checkbox"  id="mii" name='门诊缴费' />
							<label for="mii">门诊缴费</label>
						</div>
						<div>
							<input type="checkbox"  id="miii" name='检查预约' />
							<label for="miii">检查预约</label>
						</div>
						<div>
							<input type="checkbox"  id="miii" name='科室导航' />
							<label for="miii">科室导航</label>
						</div>
					</div>
					<!--第二行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="ai" name='候诊服务'/>
							<label for="ei">候诊服务</label>
						</div>
						<div>
							<input type="checkbox"  id="aii" name='报告查询'/>
							<label for="eii">报告查询</label>
						</div>
						<div>
							<input type="checkbox"  id="yai" name='体检预约' />
							<label for="yai">体检预约</label>
						</div>
						<div>
							<input type="checkbox"  id="yaii" name='满意度查询' />
							<label for="yaii">满意度查询</label>
						</div>
					</div>
				</div>
			</div>
				<!--住院服务-->
			<div class = 'fuwu'>
				<!--住院服务-->
				<div class = 'xsfw'>
					<p>住院服务</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='费用查询' />
							<label for="">费用查询</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='住院报告' />
							<label for="">住院报告</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='住院病历' />
							<label for="">住院病历</label>
						</div>
					</div>
					
				</div>
			</div>
				<!--共卫服务-->
			<div class = 'fuwu'>
				<!--共卫服务-->
				<div class = 'xsfw'>
					<p>共卫服务</p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='健康档案' />
							<label for="">健康档案</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='家医签约' />
							<label for="">家医签约</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='家医履约' />
							<label for="">家医履约</label>
						</div>
					</div>
				</div>
			</div>
				<!--第三方服务-->
			<div class = 'fuwu'>
				<!--同第三方服务-->
				<div class = 'xsfw'>
					<p>第三方服务 <span style='color:#9d9d9d;margin-left:20px;'>对接第三方检验、体检、互联网平台的上门服务，数据接口</span></p>
					<!--第一行-->
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='体检预约' />
							<label for="">体检预约</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='体检评估' />
							<label for="">体检评估</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='合理用药' />
							<label for="">合理用药</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='护士上门' />
							<label for="">护士上门</label>
						</div>
					</div>
					<div class="select_wufu">
						<div>
							<input type="checkbox"  id="" name='检查检验预约' />
							<label for="">检查检验预约</label>
						</div>
						<div>
							<input type="checkbox"  id="" name='其他' />
							<label for="">其他</label>
						</div>
					</div>
				</div>
			</div>
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
					name:"reviewlist13"
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