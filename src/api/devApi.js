import communalApi from "./communalApi";
let devApi = {
    ...communalApi
};
import weixin from './weixinApi';
for(let key in weixin){
    devApi[key] = weixin[key]
}
export default devApi;