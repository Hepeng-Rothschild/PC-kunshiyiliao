<template>
	<div class="i_addKeshi">
		<tmpHeader />
		<div class="i-keshi_main">
		<!--左侧选择-->
			<div class="i-keshi_main-left" ref = 'oneList'>
				<ul class = 'allList' @dblclick = 'tab' v-for='item in tablsList'>
					<li>+{{ item.title }}</li>
					<ul class = 'oneList'>
						<li v-for = 'items in item.children' @dblclick = 'changes(items)'>+{{ items.childDept }}</li>
					</ul>
				</ul>
			</div>
		<!--右侧科室-->
			<div class="i-keshi_main-right">
				<h2>科室信息</h2>
				<!--科室名称-->
				<div class="keshi_name">
					<div class = 'left'>
						<span style='color:red;'>*&nbsp;&nbsp;</span>
						<span>科室名称</span>
					</div>
					<input type="text"  disabled v-model = 'title'/>
				</div>
				<!--科室就诊位置-->
				<div class="keshi_name">
					<div class = 'left'>
						<span style='color:red;'>&nbsp;&nbsp;&nbsp;</span>
						<span>科室就诊位置</span>
					</div>
					<input type="text" placeholder='门诊楼2楼1-7诊室' v-model = 'keshiname'/>
				</div>
				<!--科室图标-->
				<div class="keshi_name_fileImgs">
					<div class = 'left'>
						<span style='color:red;'>&nbsp;&nbsp;&nbsp;</span>
						<span>科室图标</span>
					</div>
					<div class = "input">
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
				<Upload
			        ref="upload"
			        :show-upload-list="false"
			        :default-file-list="defaultList"
			        :on-success="handleSuccess"
			        :format="['jpg','jpeg','png']"
			        :max-size="2048"
			        :on-format-error="handleFormatError"
			        :on-exceeded-size="handleMaxSize"
			        :before-upload="handleBeforeUpload"
			        multiple
			        type="drag"
			        action="//jsonplaceholder.typicode.com/posts/"
			        style="display: inline-block;width:58px;">
			        <div style="width: 58px;height:58px;line-height: 58px;">
			            <Icon type="ios-camera" size="20"></Icon>
			        </div>
			    </Upload>
			    <Modal title="View Image" v-model="visible">
			        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
			    </Modal>
				</div>
					<p style = 'color:rgb(102, 102, 102);'>注：如不上传，取平台科室默认图标</p>
				</div>
				<!--科室简介-->
				<div class="keshi_name_text">
					<div class = 'left'>
						<span style='color:red;'>&nbsp;&nbsp;&nbsp;</span>
						<span>科室简介</span>
					</div>
					<textarea name="" rows="" cols="" v-model='test1'></textarea>
				</div>
				<!--科室特色-->
				<div class="keshi_name_text">
					<div class = 'left'>
						<span style='color:red;'>&nbsp;&nbsp;&nbsp;</span>
						<span>科室特色</span>
					</div>
					<textarea name="" rows="" cols="" v-model='test2'></textarea>
				</div>
				<!--排序-->
				<div class="keshi_name_text">
					<div class = 'left'>
						<span style='color:red;'>&nbsp;&nbsp;&nbsp;</span>
						<span>排序</span>
					</div>
					<input type="text" v-model = 'isort' style='width:80px;outline:none;' />
					<p style = 'margin-left:5px;'>备注：只能填写数字，1代表置顶以此类推</p>
				</div>
				<!--是否显示-->
				<div class="keshi_name_text">
					<div class = 'left'>
						<span style='color:red;'>&nbsp;&nbsp;&nbsp;</span>
						<span>是否显示</span>
					</div>
					<iSwitch v-model="switch1" style='margin-left:10px;'/>
				</div>
				<!--保存-->
				<div class = 'save'>
					<div @click = 'save'>保存</div>
					<div>取消</div>
				</div>
			
			</div>
		</div>
		
	</div>
</template>

<script>
import tmpHeader from '@/pages/operation/contentmen/tmpHeader';
import {Switch,Upload ,Icon} from 'iview'
import api from "@/api/commonApi";
	export default{
		components:{
			tmpHeader,
			iSwitch:Switch,
			Upload,
			Icon
		},
		data () {
			return {
				title:"",
				keshiname:"",
				test1:"",
				test2:"",
				switch1:true,
				isort:'',
				defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                tablsList:[],
                rightDetail:[],
				currentId:-1,
				id:sessionStorage.getItem('hospitalId')
			}
		},
		mounted () {
			this.uploadList = this.$refs.upload.fileList;
			
			this.$axios.post(api.get_department,{
				"hospitalId": this.id,
				'id':336
			}).then(res => {
				let ret = res.data.object;
				if (ret) {
					let arr = []
					for (let i in ret[0]) {
						arr.push({
							title:i,
							children:ret[0][i]
						})
						this.tablsList = arr
					}
				}
			})
		},
	  	methods: {
	  		tab (e) {
	  			let el = e.target;
	  			let chilrens = el.parentNode.getElementsByTagName('ul');
	  			let ref = this.$refs.oneList;
	  			if (chilrens.length >0) {
	  				let flag = chilrens[0].style.display;
		  			if (flag =='' || flag =='none') {
		  				chilrens[0].style.display = 'block';
		  			} else {
		  				chilrens[0].style.display = 'none';
		  			}
	  			}
	  			let ichildren = ref.getElementsByTagName('li');
	  			for(let i = 0; i < ichildren.length; i++){
	  				ichildren[i].classList.remove('active');
	  				if(ichildren[i].localName){
	  				}
	  			}
	  			el.classList.add('active');
	  			
	  		},
	  		save () {
	  			let display = true;
	  			if (this.switch1) display = false;
	  			let params = {
	  				departmenticon:this.keshiname,
	  				deptDetails:this.test1,
	  				deptPosition:this.test2,
	  				display,
	  				priority:this.isort,
	  				id:336,
	  				hospitalId:this.id
	  			}
	  			

	  			if (params.name === ''){
	  				this.$Message.info('科室名称不能为空');
	  			} else {
	  				this.$axios.post(api.departmentChange, {
	  					
	  				}).then(res => {
	  					let ret = res.data
	  					console.log(ret);
	  				})
	  			} 
	  			
	  			console.log(params);
	  		},
	  		changes (item) {
	  			let id = item.id;
	  			this.currentId = id;
	  			console.log(item);
	  			this.$axios.post(api.departmentDetail,{
					"hospitalId": this.id,
					id
				}).then(res => {
					let ret = res.data.object;
					
					let switch2 = true;
					if (ret.display != 1) {
						switch2 = false
					}
					this.title = ret.dictType;
					this.test1 = ret.deptDetails;
					this.test2 = ret.deptPosition
					this.switch1 = switch2;
					this.isort = ret.priority || 0;
					
					console.log(ret);
				})
	  		},
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        }
	}
</script>

<style scoped lang="less">
 .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
.i_addKeshi{
	width:100%;
	.i-keshi_main{
		width:80%;
		height:auto;
		margin:0 auto;
		display:flex;
		flex-direction:row;
		.i-keshi_main-left{
			width:200px;
			height:500px;
			border:1px solid black;
			margin-right:20px;
			ul{
				width:100%;
				li{
					width:100%;
					padding-left:20px;
					user-select:none;
					cursor:pointer;
				}
				li.active{
					background:#41c7db;
				}
			}
			.oneList{
				display:none;
				li{
					padding-left:40px;
				}
				li.active{
					background:#41c7db;
				}
			}
			.twoList{
				display:none;
				li{
					padding-left:60px;
				}
				li.active{
					background:#41c7db;
				}
			}
		}
		
		.i-keshi_main-right{
			flex:1;
			/*border:1px solid red;*/
			display:flex;
			flex-direction:column;
			padding:30px 0;
			h2{
				margin-left:10px;
				font-size:20px;
				padding-left:15px;
				border-left:3px solid blue;
			}
			
			.keshi_name{
				display:flex;
				flex-direction:row;
				height:50px;
				align-items:center;
				.left{
					min-width:100px;
				}
				input{
					display: inline-block;;
					outline:none;
					width:400px;
					height:36px;
					text-indent:10px;
				}
				
			}
			.keshi_name_fileImgs{
				display:flex;
				flex-direction:row;
				.left{
					min-width:100px;
				}
				
				p{
					margin-left:20px;
				}
			}
			.keshi_name_text{
				display:flex;
				flex-direction:row;
				margin-top:20px;
				.left{
					min-width:100px;
				}
				textarea{
					outline:none;
					width:400px;
					height:100px;
				}
			}
			.save{
				width:200px;
				height:30px;
				display:flex;
				flex-direction:row;
				justify-content: space-around;
				margin:0 auto;
				div:first-child{
					background:#359aff;
				}
				div{
					width:80px;
					height:30px;
					background:#c9c9c9;
					border-radius:20px;
					text-align:center;
					line-height:30px;
					color:#fff;
					cursor:pointer;
				}
			}
		}
	}
}

</style>