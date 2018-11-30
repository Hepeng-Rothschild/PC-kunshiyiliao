/**
 * @file 公共api接口
*/
const apiData = {
	dev: {
		authorApi: 'http://10.32.16.85:8080'
	},
	test: {
		authorApi: 'http://testapi.vipkid-inc.com'
	},
	production: {
		authorApi: 'http://api.vipkid-inc.com'
	}
};
let url = apiData.dev;
export default {
	// 获取登陆验证信息
	getAuthorizen: url + '/api/auth'
};
