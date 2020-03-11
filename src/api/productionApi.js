import communalApi from "./communalApi";
let production =  {
    ...communalApi
};
import weixin from './weixinApi';
for(let key in weixin){
    production[key] = weixin[key]
}
export default production;