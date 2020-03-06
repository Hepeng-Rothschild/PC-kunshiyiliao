import communalApi from "./communalApi";
let testApi = {
    ...communalApi
};
import weixin from './weixinApi';
for(let key in weixin){
    testApi[key] = weixin[key]
}
export default testApi;