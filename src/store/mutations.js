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
		let top = window.localStorage.getItem("top");
		if(top){
			state.topMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),top));
		}
	},
	// 设置显示的左侧菜单
	setLeftMenuList(state,name){
		let operation,maintain,statistics,supervision;
		switch(name){
			case 1:
			// state.leftMenuList = menuList.operationLeftMenu
			operation = window.localStorage.getItem("operation");
			if(operation)
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),operation))
			break;
			case 2:
			// state.leftMenuList = menuList.maintainLeftMenu
			maintain = window.localStorage.getItem("maintain");
			if(maintain)
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),maintain))
			break;
			case 3:
			// state.leftMenuList = menuList.statisticsLeftMenu
			statistics = window.localStorage.getItem("statistics");
			if(statistics)
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),statistics))
			break;
			case 4:
			// state.leftMenuList = menuList.supervisionLeftMenu
			supervision = window.localStorage.getItem("supervision");
			if(supervision)
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),supervision))
			break;
			default:
			// state.leftMenuList = menuList.operationLeftMenu
			operation = window.localStorage.getItem("operation");
			if(operation)
			state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),operation))
		}
	},
	setAccessToken(state,val){
		state.accessToken = val;
	}
};
