// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { Button, Message, Notice, Modal, Row, Col, Icon, Input, Table, Page, Form, FormItem, InputNumber, Upload } from 'iview';
import VueI18n from 'vue-i18n';
import axios from './plugins/http';
import cookie from './utils/cookie';
import commonApi from './api/commonApi';
// 全局公共样式
import 'iview/dist/styles/iview.css';
import './assets/css/base.css';

//注册全局过滤器
import * as filters from "@/plugins/filter.js";
Object.keys(filters).forEach(key => {
	Vue.filter(key,filters[key]);
});

//注册全局函数
import {GetDate} from "@/commons/function.js";
Vue.prototype.GetDate = GetDate;

//kindeditor
import VueKindEditor from '@/plugins/kindeditor.js'
import '@/../static/kindeditor/themes/default/default.css'
import '@/../static/kindeditor/kindeditor-all.js'
import '@/../static/kindeditor/lang/zh-CN.js'
Vue.use(VueKindEditor)
//设置title
router.beforeEach((to, from, next) => {
	// if(store.state.env == "production" || store.state.env == "test"){
	// 	if(to.path != "/login"){
	// 		let access_token = cookie.getCookie("access_token");
	// 		if(access_token != undefined){
	// 			let title = to.meta.title?to.meta.title:"互联网医院管理系统";
	// 			document.title = title;
	// 			next();
	// 		}else{
	// 			next("/login");
	// 		}
	// 	}else{
	// 		next();
	// 	}
	// }else{
		next();
	// }
});
// const SSOHEART = require('./plugins/sso.heart-1.0.1.min.js');
// 设置心跳，需要和迎双确定参数
// SSOHEART.ssoHeart.init('http://sso.vipkid.work:8080/cas');

// Ajax
Vue.use({
	install (vue, options) {
		vue.prototype.$axios = axios;
  	}
});

// 设置iview部分全局组件
Vue.component('Button', Button);
Vue.component('Modal', Modal);
Vue.component('Col', Col);
Vue.component('Row', Row);
Vue.component('Icon', Icon);
Vue.component('Input', Input);
Vue.component('InputNumber', InputNumber);
Vue.component('Table', Table);
Vue.component('Page', Page);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Upload', Upload);
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Modal = Modal;

// 国际化
Vue.use(VueI18n);

// import 

const i18n = new VueI18n({
	// 语言标识
	locale: 'zh-CN',
	// this.$i18n.locale  通过切换locale的值来实现语言切换
	messages: {
		// 中文语言包
		'zh-CN': require('./commons/lang/zh'),
		// 英文语言包
		'en-US': require('./commons/lang/en')
	}
});

//资源所在地址
if(store.state.env == "production"){
	Vue.prototype.fileBaseUrl = "https://ydjk-pro.oss-cn-beijing.aliyuncs.com/";
	Vue.prototype.fromData = {
		'ContentType':'multipart/form-data',
		'Authorization':"Bearer "+ cookie.getCookie('access_token')
	};
}else if(store.state.env == "dev"){
	Vue.prototype.fileBaseUrl = "https://ydjk-dev.oss-cn-beijing.aliyuncs.com/";
	Vue.prototype.fromData = {
		'ContentType':'multipart/form-data'
	};
}else if(store.state.env == "test"){
	Vue.prototype.fileBaseUrl = "https://ydjk-test.oss-cn-beijing.aliyuncs.com/";
	Vue.prototype.fromData = {
		'ContentType':'multipart/form-data',
		'Authorization':"Bearer "+ cookie.getCookie('access_token')
	};
}


Vue.config.productionTip = false;
Vue.prototype.tryCatch = function(jsonStr){
	let tmpObj = null;
	try{
		tmpObj = JSON.parse(jsonStr);
		switch(tmpObj.constructor){
			case "Array":
				tmpObj.forEach((el,i) => {
					tmpObj[i].fileName = (el.fileName || "");
					tmpObj[i].smallFileName = (el.smallFileName || "");
				});
				break;
			case "Object":
				tmpObj.fileName = (tmpObj.fileName || "");
				tmpObj.smallFileName = (el.smallFileName || "");
				break;
		}
		return tmpObj;
	}
	catch(err){
	    return tmpObj;
	}
}
/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	router,
	store,
	components: { App },
	template: '<App/>'
});
