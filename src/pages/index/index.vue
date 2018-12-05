<template>
	<div id="app">
		<Row>
			<Col class="top" :xs="24" :md="4">
		        <img class="logo" src="@/assets/images/logo.png">
				<span class="logo-text">互联网医院平台</span>
			</Col>
			<Col :xs="24" :md="20">
		        <top-menu></top-menu>
			</Col>
		</Row>
		<Row>
			<Col :xs="24" :md="4">
        		<left-menu class="left-menu"></left-menu>
			</Col>
			<Col :xs="24" :md="20">
        		<router-view></router-view>
			</Col>
		</Row>
	</div>
</template>

<script>
import topMenu from "@/components/topMenu";    
import leftMenu from "@/components/leftMenu";    
export default {
	name: 'App',
	data(){
		return {};
	},
	components:{
        topMenu,
        leftMenu
    }
};
</script>
<style lang="less" scoped>
#app{
	.top{
		.logo{
			width:60px;
			margin:5px;
		}
		.logo-text{
			text-align:center;
			display: inline-block;
			width:60%;
		}
	}
	.left-menu{
		width:100% !important;
	}
}
</style>
