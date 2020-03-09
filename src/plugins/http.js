/**
 * @file ajax
 * @date 20180703
 * @author wangwenfa
 */
import Vue from 'vue';
import router from './../router';
import axios from 'axios';
import store from '../store';
// import qs from 'qs';
import cookie from '../utils/cookie.js';
import aesUtils from '../plugins/aes-utils.js';
import noEncrypt from '../api/noEncryptApi.js';

const defaultHeaders = {
	Accept: 'application/json, text/plain, */*; charset=utf-8',
	'Content-Type': 'application/json; charset=utf-8',
	Pragma: 'no-cache',
	'Cache-Control': 'no-cache'
};

// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;

// http request 拦截器
axios.interceptors.request.use(
	config => {
		// console.log("请求的config::",config);
		if (store.state.env == "production" || store.state.env == "test") {
			let RegObj = new RegExp('(operate/login)|(filemd5)', 'ig');

			Vue.prototype.fromData = {
				'ContentType':'multipart/form-data',
				'Authorization':"Bearer "+ window.localStorage.getItem('access_token')
			}
			
			let fileObj = new RegExp("hospital/uploadOperateFiles", 'ig')
			if (!RegObj.test(config.url)) {
				if (!fileObj.test(config.url)) {
					let iv = store.state.iv;
					let salt = store.state.salt;
					let key = cookie.getCookie("randmId");
					let access_user = aesUtils.decrypt(salt, iv, key, cookie.getCookie("access_user"));
					config.headers["OPERATE-USER"] = access_user;
					config.headers["FORM-ENCODE"] = 1;
					let tdata = JSON.stringify(config.data);
					tdata = aesUtils.encrypt(salt, iv, key, tdata);
					config.data = { data: tdata };
				}

			}
			
			let access_token = window.localStorage.getItem('access_token');
			
			if (access_token != undefined)
				config.headers.Authorization = "Bearer " + access_token;
				

		}
		// console.log("发送的所有数据",config);
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	response => {
		if (response.data.code === 401) {
			alert("Token已失效,请重新登录重试!")
			router.push("/login")
			return Promise.reject(response);
		}
		let iv = store.state.iv;
		let salt = store.state.salt;
		let key = cookie.getCookie("randmId");
		let url = response.config.url;
		let RegObj = new RegExp('operate/login', 'ig');
		if (!RegObj.test(url) && response.data.encryption) {
			let tmpData = response.data.object;
			if (tmpData) {
				response.data.object = JSON.parse(aesUtils.decrypt(salt, iv, key, tmpData));
			}
		}
		console.log("返回的数据:::",response);
		return response;
	},
	error => {
		return Promise.reject(error);
	}
)
export default axios;