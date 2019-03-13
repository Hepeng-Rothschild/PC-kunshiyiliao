/**
 * @file mutations
 */
import menuList from './mutations/menuList';
import aesUtils from '@/plugins/aes-utils.js';
import cookie from '@/utils/cookie.js';

export default {
	// 设置显示的顶级菜单
	setTopMenuList(state){
		if(state.env == 'dev'){
			state.topMenuList = menuList.topMenu;
		}else{
			let top = window.localStorage.getItem("top");
			if(top){
				
				state.topMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),top));
			}
		}
	},
	// 设置显示的左侧菜单
	setLeftMenuList(state,name){
		if(state.env != "dev"){
			let sunList = window.localStorage.getItem("sun"+name);
			if(sunList)
				state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),sunList));
		}else{
			
			switch(name){
				case 1:
					state.leftMenuList = menuList.operationLeftMenu
				break;
				case 2:
					state.leftMenuList = menuList.maintainLeftMenu
				break;
				case 3:
					state.leftMenuList = menuList.statisticsLeftMenu
				break;
				case 4:
					state.leftMenuList = menuList.supervisionLeftMenu
				break;
				default:
					state.leftMenuList = menuList.operationLeftMenu
			}
		}
	},
	setAccessToken(state,val){
		state.accessToken = val;
	}
};
