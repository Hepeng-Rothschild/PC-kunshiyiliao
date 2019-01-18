/**
 * @file mutations
 */
import Vue from 'vue';
import * as Types from './mutation-types';
import menuList from './mutations/menuList';
import aesUtils from '@/plugins/aes-utils.js';
import cookie from '@/utils/cookie.js';

export default {
	[Types.ADDTODO] (state, todo) {
		state.mapList.push(todo);
	},
	[Types.CHANGELOCALE] (state, locale) {
		state.locale = locale;
	},
	// 设置显示的顶级菜单
	setTopMenuList(state){
		// state.topMenuList = menuList.topMenu;
		state.topMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),window.localStorage.getItem("top")));
	},
	// 设置显示的左侧菜单
	setLeftMenuList(state,name){
		switch(name){
			case 1:
			// state.leftMenuList = menuList.operationLeftMenu
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),window.localStorage.getItem("operation")))
			break;
			case 2:
			// state.leftMenuList = menuList.maintainLeftMenu
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),window.localStorage.getItem("maintain")))
			break;
			case 3:
			// state.leftMenuList = menuList.statisticsLeftMenu
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),window.localStorage.getItem("statistics")))
			break;
			case 4:
			// state.leftMenuList = menuList.supervisionLeftMenu
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),window.localStorage.getItem("supervision")))
			break;
			default:
			// state.leftMenuList = menuList.operationLeftMenu
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),window.localStorage.getItem("operation")))
		}
	},
	setAccessToken(state,val){
		console.log("修改accesstoken");
		state.accessToken = val;
	}
};
