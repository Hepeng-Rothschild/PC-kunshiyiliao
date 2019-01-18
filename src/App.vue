<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script> 
import api from "./api/commonApi.js";
import cookie from "./utils/cookie";
import Vue from 'vue';
export default {
	name: 'App',
	data(){
		return {
			accessToken:null,
		};
	},
	updated(){
		this.$store.commit("setAccessToken",window.localStorage.getItem("access_token"));
	},
	watch:{
		'$store.state.accessToken'(val){
			if(this.$store.state.env != "dev"){
				Vue.prototype.fromData = {
					'ContentType':'multipart/form-data',
					'Authorization':"Bearer "+ val
				};
			}
		}
	}
};
</script>
<style lang="less" scoped>
</style>
