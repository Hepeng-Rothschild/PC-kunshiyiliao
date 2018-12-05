<template>
	<div class='contentHome'>
		<!--标题-->
		<h3 class='contentHomeTitle'>
			<a href = "###">患者端运营</a>
			<span>></span>
			<span>内容管理</span>
			<router-link class = 'homeBtn' to = '/operation/home_article'>发布</router-link>
			<!--<button class = 'homeBtn'>发布</button>-->
		</h3>
		<!--选择类型-->
		<div class = 'homeSelect'>
			<!--类型选择-->
			<div class = 'selectType'>
				<span>类型</span>
				<select name = "type" v-model = 'type1'>
					<option value = "全部" selected>全部</option>
					<option value = "文章">文章</option>
					<option value = "视频">视频</option>
				</select>
			</div>
			<!--发布选择-->
			<div class = 'selectType'>
				<span>状态</span>
				<select name = "type" v-model = 'type2'>
					<option value = "全部" selected>全部</option>
					<option value = "已发布">已发布</option>
					<option value = "未发布">未发布</option>
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
			<tr v-for = 'item,index in arr'>
				<th>{{ item.num }}</th>
				<th>{{ item.sort }}</th>
				<th>{{ item.title }}</th>
				<th>{{ item.type }}</th>
				<th>{{ item.lanmu }}</th>
				<th :class = "{'red':item.release==='未发布'}">{{ item.release }}</th>
				<!--<th class = "red" v-show = '!item.release'>未发布</th>
				<th v-show = 'item.release'>已发布</th>-->
				<th>{{ item.read }}</th>
				<th>{{ item.coll}}</th>
				<th>{{ item.time }}</th>
				<th class = 'modi' @click="modal1 = true">
					<span style = 'color: black;' @click = 'changeItem(item)'>修改</span>
					<span v-show = 'item.release == "已发布"' style = 'color: black;' @click = 'bottomShelf(item,index)'>下架</span>
					<span v-show = 'item.release == "未发布"' style = 'color: red;' @click = 'topShelf(item,index)'>上架</span>
					<span style = 'color: black;' @click = 'roof(item,index,$event)'>置顶</span>
					<!--<a href = "###" style = 'color: black;' @click = 'changeItem(item)'>修改</a>
					<a href = "###" v-show = 'item.release == "已发布"' style = 'color: black;' @click = 'bottomShelf(item,index)'>下架</a>
					<a href = "###" v-show = 'item.release == "未发布"' style = 'color: red;' @click = 'topShelf(item,index)'>上架</a> 
					<a href = "###" style = 'color: black;' @click = 'roof(item,index)'>置顶</a>-->
				</th>
			</tr>
		</table>
		<!--分页器-->
		<div class = 'paging'>
			<Page :total = "100"  />		
		</div>
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
	export default {
		created () {
			let route = this.$route.params.currentData;
			if (route) {
				this.tableList.push(route)
			}
		},
		components:{
			Page
		},
		data () {
			return {
				modal1: false,
				currentIndex:-1,
				type1:"全部",
				type2:"全部",
				allSelect:"全部",
				val:"",
				flag:false,
				content:"",
				tableList:[
					{
						time:"2019-12-1 16：55",
						title:"冬至保暖需要什么？",
						sort:1,
						num:"01",
						type:"文章",
						release:'已发布',
						read:"100",
						coll:"100",
						id:"1",
						lanmu:"宝宝健康"
					},
					{
						time:"2019-12-1 16：55",
						title:"孩子如何预防感冒？医生告诉你妙招",
						sort:2,
						num:"02",
						type:"视频",
						release:'未发布',
						read:"100",
						coll:"100",
						id:"1",
						lanmu:"医师讲"
					}
				]
			}
		},
		methods : {
			btn () {
				console.log(this.type1,this.type2,this.val)
			},
			bottomShelf (item,index) {
				this.content = "下架"
				this.currentIndex = index
				this.modal1 = true;
			},
			topShelf (item,index) {
				this.content = "上架"
				this.modal1 = true;
				this.currentIndex = index
			},
			roof (item,index,event) {
				console.log(event);
				this.content = "置顶",
				this.modal1 = true;
				this.currentIndex = index
			},
			changeItem (item) {
				this.$router.push({
					name:"reviewlist5",
					params: {
			          item
			        }
				})
			},
			ok () {
//              this.$Message.info('Clicked ok');
					let a = this.tableList[this.currentIndex];
                console.log(this.currentIndex);
				if (this.content == '上架') {
					this.tableList[this.currentIndex].release = '已发布'
				} else if (this.content == '下架') {
					this.tableList[this.currentIndex].release = '未发布'
				} else if (this.content = '置顶') {
//					let obj = 
					this.tableList.splice(this.currentIndex, 1);
					this.tableList.pop(a);
					
//					console.log(this.currentIndex);
//					console.log(this.tableList);
				}
				console.log(a);
			},
            cancel () {
//              this.$Message.info('Clicked cancel');
            }
		},
		computed : {
			arr () {
				let ilist = [];
				if (this.type1 == '全部' && this.type2 == '全部') {
					return ilist = this.tableList
				} else if (this.type1 == '全部') {
					return ilist = this.tableList.filter(item => {
					  	return item.release == this.type2
					})
				} else if (this.type2 == '全部') {
					return ilist = this.tableList.filter(item => {
					  	return item.type == this.type1
					})
				} else {
					return ilist = this.tableList.filter(item => {
					  	return item.type == this.type1 && item.release == this.type2
					})
				}
			}
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