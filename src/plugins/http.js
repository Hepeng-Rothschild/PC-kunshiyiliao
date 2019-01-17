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
		// console.log("解密之后",aesUtils.decrypt("7c70035d4e7f4a1ba5a0eb737c7cf2d9","54bef10750df41d5ac9f2d0a4fe100bf","31bc44de89e434e0e10abe0f3中电国康医到服",'NJ7NYIIBLFLgQMI5sjni1g=='));
		// console.log("config",config);
		// console.log("noEncrypt",noEncrypt);
		// let url = config.url.slice(config.url.lastIndexOf('/')+1);
		// if(noEncrypt.indexOf(url) > -1){ //是否加密自定义请求头
		// 	config.headers.cusEncrypt = "no";
		// }else{
		// 	config.headers.cusEncrypt = "yes";
		// }
		if (store.state.env == "production" || store.state.env == "test") {
			let access_token = cookie.getCookie('access_token');
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
		// console.log(store.state.iv);
		// store.commit("setIv",'设置的IV');
		// console.log("IV",store.state.iv);
		// let url = response.config.url;
		// let RegObj = new RegExp('operate/login','ig');
		// if(RegObj.test(url)){
		// 	console.log("登陆接口",response);
		// }
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