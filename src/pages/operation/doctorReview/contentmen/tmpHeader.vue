<template>
	<header>
		<ul>
			<li>
				<router-link to='/index/maintain/Institutional_information'>医院信息</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/i_banner'>Banner</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/i_keshi'>院内科室</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/news'>动态新闻</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/t_keshi'>特色科室</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/expert'>专家介绍</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/service_management'>服务管理</router-link>
			</li>
			<li>
				<router-link to='/index/maintain/k_department'>预约科室</router-link>
			</li>
		</ul>
	</header>
</template>

<script>
	export default {

	}
</script>
<style scoped lang="less">
	header {
		width: 100%;
		height: 30px;
		margin: 30px 0;
		ul {
			li {
				float: left;
				a {
					display: block;
					background: #aeaeae;
					color: #fff;
					padding: 6px 8px;
					cursor: pointer;
					user-select: none;
				}
				.router-link-exact-active {
					color: #7893c8;
					background: #fff;
				}
			}
			li:last-child {
				margin: 0;
			}
		}
	}
</style>