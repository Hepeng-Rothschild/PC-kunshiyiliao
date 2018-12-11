<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script> 
import api from "./api/commonApi.js";
import cookie from "./utils/cookie";
export default {
	name: 'App',
	data(){
		return {};
	}
};
</script>
<style lang="less" scoped>
</style>
