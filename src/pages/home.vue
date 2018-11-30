<style  scoped lang="less">

</style>

<template>
	<div class="inner-con">
		<Header></Header>
		<h3>{{tinymceHtml}}</h3>
		<div>
			<vue-editor :id="id" :height="height" @valueHandle="valueHandle"></vue-editor>
		</div>
	</div>
</template>
<script>
import vueEditor from '../components/vueEditor';
import Header from '../components/Header';
import { Button } from 'iview';
import { mapGetters, mapActions } from 'vuex';
export default {
	components: {
		Button,
		vueEditor,
		Header
	},
	data () {
		return {
			id: 'tinymce-editor',
			height: 300,
			tinymceHtml: ''
		};
	},
	computed: {
	},
	methods: {
		valueHandle (param) {
			this.tinymceHtml = param;
		},
		logout(){
          this.$axios.get(url.logout)
        },
        goHome(){
          this.$router.push({path:'/'})
        },
        cut(val){
          if(val == 'en_US'){
            this.$i18n.locale = 'zh_CN'
            this.$store.commit('local','zh_CN')
            cookie.setCookie('language','zh_CN',7*24*3600,' vipkid-inc.com')
          }else{
            this.$i18n.locale = 'en_US'
            this.$store.commit('local','en_US')
            cookie.setCookie('language','en_US',7*24*3600,' vipkid-inc.com')
          }
          this.headerShow = !this.headerShow
          window.location.reload(true)
        },
        search(val){
          if(!val)return;
          const {href} = this.$router.resolve({
            name:'searchResult'
          })
          window.open(href+'?keyword='+val,'_blank')
        },
	}
};
</script>
