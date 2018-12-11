/**
 * @file 所有api接口 dev 开发环境 
*/
import dev from "./devApi";
import test from "./testApi";
import production from "./productionApi";
const apiData = {
	dev,
	test,
	production
};
let url = apiData.production;

// export default {
// 	// 获取登陆验证信息
// 	getAuthorizen: url + '/api/auth'
// };
export default url;
