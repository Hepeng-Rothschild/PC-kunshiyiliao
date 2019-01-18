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
		// let jsonStr = JSON.stringify(config.data);
		// let jsonStr = JSON.stringify({aaa:'aaa',bbb:'bbb'});
		// config.data = aesUtils.encrypt("54bef10750df41d5ac9f2d0a4fe100bf","7c70035d4e7f4a1ba5a0eb737c7cf2d9","中电国康医到服务",jsonStr);
		// config.data = aesUtils.encrypt("54bef10750df41d5ac9f2d0a4fe100bf","7c70035d4e7f4a1ba5a0eb737c7cf2d9","中电国康医到服务",jsonStr);
		// console.log("解密之后",aesUtils.decrypt("7c70035d4e7f4a1ba5a0eb737c7cf2d9","54bef10750df41d5ac9f2d0a4fe100bf","31bc44de89e434e0e10abe0f3中电国康医到服",'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'));
		// console.log("config",config);
		// console.log("noEncrypt",noEncrypt);
		// let url = config.url.slice(config.url.lastIndexOf('/')+1);
		// if(noEncrypt.indexOf(url) > -1){ //是否加密自定义请求头
		// 	config.headers.cusEncrypt = "no";
		// }else{
		// 	config.headers.cusEncrypt = "yes";
		// }
		if (store.state.env == "production" || store.state.env == "test") {
			let access_token = window.localStorage.getItem('access_token');
			if (access_token != undefined)
				config.headers.Authorization = "Bearer " + access_token;
		}
		
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	response => {
		let iv = store.state.iv;
		let salt = store.state.salt;
		let key = cookie.getCookie("randmId");
		let url = response.config.url;
		let RegObj = new RegExp('operate/login','ig');
		if(!RegObj.test(url)){
			let tmpData = response.data.object;
			if(tmpData){
				response.data.object = JSON.parse(aesUtils.decrypt(salt,iv,key,tmpData));
			}
		}
		
		if (response.data.code === 401) {
			router.push("/login")
			return Promise.reject(response);
		}
		return response;
	},
	error => {
		if (error.response) {
			switch (error.response.status) { }
		}
		return Promise.reject(error.response.data);
	}
)
export default axios;