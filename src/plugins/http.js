/**
 * @file ajax
 * @date 20180703
 * @author wangwenfa
 */
import axios from 'axios';
// import qs from 'qs';
import cookie from '../utils/cookie.js';

const defaultHeaders = {
	Accept: 'application/json, text/plain, */*; charset=utf-8',
	'Content-Type': 'application/json; charset=utf-8',
	Pragma: 'no-cache',
	'Cache-Control': 'no-cache'
};

// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(
  	config => {
		config.headers.Authorization = "Bearer "+ cookie.getCookie('access_token')	
		// if (token && config.method.toUpperCase() === 'POST') {
		// 	let data = qs.parse(config.data);
		// 	config.data = qs.stringify({
		// 		...data,
		// 		token: token
		// 	});
		// } else if (token && config.method.toUpperCase() === 'GET') {
		// 	config.params = {
		// 		...config.params,
		// 		token: token
		// 	};
		// }
    	return config;
  	},
	err => {
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
  	response => {
		// console.log('response',response)
		if (response.data.code === 401) {
			window.location.href = response.data.location;
			return Promise.reject(response);
		}
    	return response;
  	},
  	error => {
    	if (error.response) {
        	// console.log('^^error^^',error.response)
      		switch (error.response.status) {}
    	}
    	return Promise.reject(error.response.data);
	  }
);

export default axios;
