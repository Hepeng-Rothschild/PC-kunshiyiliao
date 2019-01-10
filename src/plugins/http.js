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
import JsEncrypt from 'jsencrypt/bin/jsencrypt';

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
		// let publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDe9wW1r64CS/uiRVUTyWNPBICv
		// Omk890SOSVZBYB1SbWa1oRX69UfhzzMVZaFugqwGOS61sTfmVEZpn4YVgq1UZkIN
		// WOY0Te82CfAGkg4XEfbLYaJwCYbDT5sAA6MgupjrRkyGxAk/J0fD6zUMv5ryD2PX
		// ZRbzIBrfExvdCbHX1wIDAQAB`;
		// let privateKey = `MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAN73BbWvrgJL+6JF
		// VRPJY08EgK86aTz3RI5JVkFgHVJtZrWhFfr1R+HPMxVloW6CrAY5LrWxN+ZURmmf
		// hhWCrVRmQg1Y5jRN7zYJ8AaSDhcR9sthonAJhsNPmwADoyC6mOtGTIbECT8nR8Pr
		// NQy/mvIPY9dlFvMgGt8TG90JsdfXAgMBAAECgYEAldpydPU5P4PwANUWZDETVNVS
		// 4/KfLoGGCxeRKGk/69lpkaNNkZjvEf5fd/8Ra6PZmGkwUp9kUaLMnErCJIzqjrDt
		// dGW2GjRN5xIPh5FNrCdthd4vcdOP3fVT2Xn4O5EJ9vHHaY1ZTtknMPpzJVMX5yTV
		// cyVJhNM2gR3L0w90htECQQDxaKeAup8PbyjWcR0GeEZLT/2p0MwPI6IfaXYkr1Si
		// 9BAXyho85TmsAwQnWRfqNg7mpFIki9Lv6o/K+hDhCvq/AkEA7HD73LNf2l12W37+
		// 7bCfniNgLnT38w3mW7tsRwL4HFTF6U3hu8lQE1UyOmk/LFKMl2MgsGcUR/OzVUjs
		// rlRg6QJBAJ7/KrNiNrjXobH7Nf644LNhr9RUrNGbyn+d2i43PCtHTAIfHkDVSLK+
		// GdJAn7umdxH5UBC59ugFOUeag9t0e8kCQGIyIkfsrzhvbIJfYdyxZ/kzU/S3W2q0
		// MSGT20o6r3SEuJVGZSOqXflJfszHfRcZSY5t+tuIU+H2ElqvKKzWGlECQQDmNc1n
		// TD/MibDKpC+EnfQXzwdX4dfs8EsPyCyrSECNFZ3ou1RmkQJKkesHs4yJNmJm8Axq
		// 7bMSug98gG5VlDa+`;
		// let jse = new jsEncrypt();
        // jse.setPublicKey(publicKey);
        // // 设置需要加密的字符串
        // let encrypted = jse.encrypt('Hello, world')
        // console.log('加密后的字符串 '+encrypted);
        // jse.setPrivateKey(privateKey);
        // // // 解密加密过的字符串
        // let decrypted = jse.decrypt(encrypted)
        // console.log('解密后的字符串 '+decrypted);
		if(store.state.env == "production" || store.state.env == "test"){
			let access_token = cookie.getCookie('access_token');
			if(access_token != undefined)
				config.headers.Authorization = "Bearer "+ access_token;
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
		if (response.data.code === 401) {
			router.push("/login")
			return Promise.reject(response);
		}
    	return response;
  	},
  	error => {
    	if (error.response) {
      		switch (error.response.status) {}
    	}
    	return Promise.reject(error.response.data);
	  }
)

export default axios;
