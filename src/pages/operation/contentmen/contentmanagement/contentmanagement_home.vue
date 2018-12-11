<template>
	<div class='contentHome'>
		<!--标题-->
		<!--选择类型-->
		<div class = 'homeSelect'>
			<!--类型选择-->
			<div class = 'selectType'>
				<span>类型</span>
				<select name = "type" v-model = 'type1'>
					<option value = "null" selected>全部</option>
					<option value = "0">文章</option>
					<option value = "1">视频</option>
				</select>
			</div>
			<!--发布选择-->
			<div class = 'selectType'>
				<span>状态</span>
				<select name = "type" v-model = 'type2'>
					<option value = "null" selected>全部</option>
					<option value = "1">已发布</option>
					<option value = "0">未发布</option>
				</select>
			</div>
			<!--搜索输入-->
			<div class = 'search'>
				<input type="text"  placeholder = "文章名称" v-model = 'val'/>
			</div>
			<!--搜索按钮-->
			<button class = 'submit' @click = 'btn'>搜索</button>
		</div>
		<!--表格-->
		<table border="" cellspacing="" cellpadding="">
			<tr>
				<th>序号</th>
				<th>排序</th>
				<th>标题</th>
				<th>类型</th>
				<th>栏目</th>
				<th>状态</th>
				<th>阅读量</th>
				<th>收藏量</th>
				<th>时间</th>
				<th>操作</th>
			</tr>
			<tr v-for = 'item,index in tableList'>
				<th>{{ addZero(index) }}</th>
				<th>{{ item.priority }}</th>
				<th>{{ item.title }}</th>
				<th v-show = 'item.type == 0'>文章</th>
				<th v-show = 'item.type == 1'>视频</th>
				<th>{{ item.columnName }}</th>
				<th sytle = 'color:red;' v-show = 'item.idelete == 1'>未发布 </th>
				<th  v-show = 'item.idelete == 0'>已发布 </th>
				<th>{{ item.readAmount }}</th>
				<th>{{ item.countFollow}}</th>
				<th>{{ item.updateTime }}</th>
				<th class = 'modi'>
					<span style = 'color: black;cursor:pointer' @click = 'changeItem(item)'>修改</span>
					<span v-show = 'item.idelete == 1' style = 'color: red;cursor:pointer' @click = 'bottomShelf(item,index)'>上架</span>
					<span v-show = 'item.idelete == 0' style = 'color: black;cursor:pointer' @click = 'topShelf(item,index)'>下架</span>
					<span style = 'color: black;cursor:pointer' @click = 'roof(item,index,$event)'>置顶</span>
				</th>
			</tr>
		</table>
		<!--分页器-->
		<!--<div class = 'paging'>
			<Page :total = "tableList.length" :page-size ='10' @on-change = 'pageChange'/>		
		</div>-->
		<!--info-->
		<div class = 'info' v-show = 'flag'>
			<h3>提示</h3>
			<p>确定{{ content }}?</p>
			<div class = 'info_tishi'>
				<span @click = 'flag = false'>否</span>
				<span>是</span>
			</div>
		</div>
		<Modal
		        v-model="modal1"
		        title="提示"
		        @on-ok="ok"
		        @on-cancel="cancel">
		        <p>确定{{ content }}?</p>
		    </Modal>
		</div>
</template>

<script>
	import { Page } from 'iview'
	import api from "@/api/commonApi";
	export default {
		components:{
			Page
		},
		data () {
			return {
				modal1: false,
				currentIndex:-1,
				type1:"null",
				type2:"null",
				allSelect:"null",
				val:null,
				flag:false,
				content:"",
				tableList:[
//					{
//						time:"2019-12-1 16：55",
//						title:"冬至保暖需要什么？",
//						sort:1,
//						num:"01",
//						type:"文章",
//						release:'已发布',
//						read:"100",
//						coll:"100",
//						id:"1",
//						lanmu:"宝宝健康"
//					},
//					{
//						time:"2019-12-1 16：55",
//						title:"孩子如何预防感冒？医生告诉你妙招",
//						sort:2,
//						num:"02",
//						type:"视频",
//						release:'未发布',
//						read:"100",
//						coll:"100",
//						id:"1",
//						lanmu:"医师讲"
//					}
				],
				arr1:[],
				len:10
			}
		},
		mounted () {
			this.$axios.post(api.contentWrap, {
			  "pageNo":1,
			  "pageSize":5,
			  "type":0,
			  "enable":1
			}).then(res => {
				if(res.data.object){
					let ret = res.data.object.list;
					this.tableList = ret
				}
			})
		},
		methods : {
			homeBtn () {
				this.$router.push({
					name:"contentmanagementAdd"
				})
			},
			pageChange (e) {
				
			},
			//关键字查询列表
			btn () {
				this.$axios.post(api.contentWrap, {
					"pageNo":1,
					"pageSize":10,
					"type":this.type1,
					"enable":this.type2,
					"title":this.val
				}).then(res => {
					if(res.data.object){
						let ret = res.data.object.list;
						this.tableList = ret
					}
				})
			},
			// 下架
			bottomShelf (item,index) {
				console.log(item)
				this.$axios.post(api.upWrap,{
					ids:[item.articleId],
					idelete:0
				}).then(res => {
					if (res.data.code) {
						item.idelete = 0
						this.$Message.info('下架成功' );
						console.log(res.data);
					}
				})
			},
			// 上架
			topShelf (item,index) {
				this.$axios.post(api.upWrap,{
					ids:[item.articleId],
					idelete:1
				}).then(res => {
					if (res.data.code) {
						item.idelete = 1;
						this.$Message.info('上架成功' );
						console.log(res.data);
					}
				})
			},
			//置顶
			roof (item,index,event) {
				this.$axios.post(api.root, {
					"priority":1,
					"id": item.articleId
				}).then(res => {
					if (res.data.code) {
						 this.$Message.info('置顶成功');
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//根据ID修改对应的新闻资讯
			changeItem (item) {
				let id = item.articleId;
				console.log(item);
				this.$router.push({
					name:"createNews",
					params: {
		          		id
			        }
				})
			},
			//模态框
			ok () {
//              this.$Message.info('Clicked ok');
				let a = this.tableList[this.currentIndex];
            		console.log(this.currentIndex);
				
				console.log(a);
			},
            cancel () {
            },
            addZero (num) {
            	num = num +1;
            	if (num < 10) {
            		return '0' + num
            	}
            	return num
            }
		},
		computed : {
		},
		watch : {
			type1:{
				deep:true,
				handler (val) {
					this.allSelect = val;
				}
			},
			type2:{
				deep:true,
				handler (val) {
					this.allSelect = val;
				}
			}
		}
	}
</script>

<style scoped lang = "less">
	.contentHome {
		width: 100%;
		height: auto;
		margin:0 auto;
		position:relative;
		background: #f2f2f2;
		height:100vh;
		/*提示*/
		.info{
			width:200px;
			height:100px;
			background:#fff;
			text-align:center;
			display:flex;
			flex-direction:column;
			justify-content:space-between;
			position:absolute;
			border-radius:10px;
			left:50%;
			top:200px;
			transform: translateX(-50%);
			border:1px solid black;
			.info_tishi{
				display:flex;
				flex-direction:row;
				align-items:center;
				span{
					display:inline-block;
					width:40%;
					height:30px;
					line-height:30px;
					background: palevioletred;
					border-radius:5px;
					color:black;
					margin:0 5%;
				}
			}
		}
		/*标题*/
		.contentHomeTitle {
			width: 100%;
			padding-left:20px;
			background: #ccc;
			height: 50px;
			line-height:50px;
			border-bottom: 2px solid black;
			.homeBtn {
				text-align:center;
				width: 100px;
				height: 40px;
				color: #fff;
				line-height:40px;
				float:right;
				margin-top:5px;	
				background: red;
				border: 1px solid #ddd;
				border-radius: 6px;
				margin-right: 30px;
				outline:none;
			}
		}
		/*类型*/
		.homeSelect {
			width: 100%;
			height:50px;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			.selectType {
				width:200px;
				select {
					width:80px;
				}
				span {
					margin-right:15px;
				}
			}
			.search{
				width:200px;
				border-radius:10px;
				border:1px solid black;
				background: #fff;
				input{
					border:none;
					outline:none;
					text-indent:1em;
					background:none;
				}
			}
			.submit{
				background:dodgerblue;
				padding:5px 20px;	
				border:none;
				outline:none;		
				color:#fff;	
			}
		}
		/*表单*/
		table{
			width:calc(100% - 60px);
			padding:0 30px;
			margin:0 auto;
			tr{
				th{
					text-align:center;
					.modi {
						a {
							color:black;
						}
						span{
							cursor:pointer;
						}
					}
				}
				.red{
					color:red;
				}
			}
		}
		/*分页器*/
		.paging{
			width:100%;
			margin:10px auto;
			text-align:center;
		}
	}
</style>