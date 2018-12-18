/**
 * @file 所有api接口 dev 开发环境 
*/
import dev from "./devApi";
import test from "./testApi";
import store from "../store";
import production from "./productionApi";
const apiData = {
	dev,
	test,
	production
};
let url;
if(store.state.env == "production"){
	url = apiData.production;
}else{
	url = apiData.test;
}

// export default {
// 	// 获取登陆验证信息
// 	getAuthorizen: url + '/api/auth'
// };
export default url;
