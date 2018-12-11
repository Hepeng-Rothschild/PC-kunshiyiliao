<template>
	<!--服务管理-->
	<div class = 'addManagement'>
		<tmpHeader />
		<div class = "addManag">
			<h4 @click = 'btn'>添加服务</h4>
			<div class = 'fuwu'>
				<!--线上服务-->
				<div class = 'xsfw' v-for = 'item,index in allMenuList'>
					<p>{{ item.menuName }}</p>
					<!--第一行-->
					<div class="select_wufu" ref = 'all'>
						<div v-for = 'items,index in item.dtoList' >
							<!-- <input type = "checkbox" :data-id = 'items.id' v-show = 'items.selected != 0' :checked = 'items.selected'/> -->
							<!-- <input type = "checkbox" :data-id = 'items.id' :value = 'items.id' v-model = 'checkedNames'/> -->
							<input type="checkbox" :value = 'items.id' v-if = '!items.selected' :data-id = 'items.id' :id="'a' + items.id">
							<input type="checkbox" :value = 'items.id'  v-if = 'items.selected' checked :data-id = 'items.id' :id="'a' + items.id">
							<!-- <span v-show = 'items.selected == 0'>{{ items.selected }}</span>
							<span v-show = 'items.selected != 0'>{{ items.selected }}</span> -->
							<label :for="'a' + items.id">{{ items.menuName }}</label>
						</div>
					</div>
				</div>
			</div>
				<!--保存-->
			<div class="expert_save">
				<span @click = 'navto'>保存</span>
				<span @click = 'btn'>取消</span>
			</div>
		</div>
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader';
	import api from "@/api/commonApi";
	export default{
		data () {
			return {
				arr:[],
				allMenuList:[],
				checkedNames:[],
				id:sessionStorage.getItem('hospitalId')
			}
		},
		components: {
			tmpHeader
		},
		methods: {
			btn () {
			},
			navto () {
				let wrap = document.getElementsByClassName('addManag')[0];
				let el = wrap.getElementsByTagName('input');
				let len = el.length;
				let arr = [];
				for (let i = 0;i < len;i++) {
					if (el[i].checked) {
						console.log(el[i].getAttribute('data-id'));
						arr.push(el[i].getAttribute('data-id'));
					}
				}


				this.$axios.post(api.setserver,{
					hospitalId:this.id,
					ids:arr
				}).then(res => {
					if (res.data.code) {
						this.$Message.info('修改成功');
						setTimeout(() => {
							this.$router.push({
								name:"reviewlist13"
							})
						},500)
						
					}
				})

				
			
			}
		},
		mounted () {
			
			this.$axios.post(api.getServer, {
				"hospitalId": this.id,
			}).then(res => {
				
				if (res.data) {
					let ret = res.data.object
					this.allMenuList = ret;
					console.log(ret);
					
				}
				
			}).catch(err => {
				console.log(err)
			})
			
		},
		// 数据更新后的DOM结构
		updated () {
			let wrap = document.getElementsByClassName('addManag')[0];
				let el = wrap.getElementsByTagName('input');
				let len = el.length;
				let arr = [];
				for (let i = 0;i < len;i++) {
					if (el[i].checked) {
						arr.push(el[i]);
					}
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
			border-bottom:1px solid rgb(242, 242, 242);
			.xsfw{
				margin:10px 0;
				.select_wufu{
					margin:0 30px;
					display:flex;
					flex-direction:row;
					padding:14px 20px;
					align-items:center;
					flex-wrap:wrap;
					div{
						width:20%;
						margin:10px 20px;
						display:flex;
						flex-direction:row;
						align-items:center;
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