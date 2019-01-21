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
		let operation,maintain,statistics,supervision;
		switch(name){
			case 1:
			if(state.env == 'dev'){
				state.leftMenuList = menuList.operationLeftMenu
			}else{
			operation = window.localStorage.getItem("operation");
				if(operation)
				state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),operation))
			}
			break;
			case 2:
			if(state.env == 'dev'){
				state.leftMenuList = menuList.maintainLeftMenu
			}else{
				maintain = window.localStorage.getItem("maintain");
				if(maintain)
				state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),maintain))
			}
			break;
			case 3:
			if(state.env == 'dev'){
				state.leftMenuList = menuList.statisticsLeftMenu
			}else{
				statistics = window.localStorage.getItem("statistics");
				if(statistics)
				state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),statistics))
			}
			break;
			case 4:
			if(state.env == 'dev'){
				state.leftMenuList = menuList.supervisionLeftMenu
			}else{
				supervision = window.localStorage.getItem("supervision");
				if(supervision)
				state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),supervision))
			}
			break;
			default:
			if(state.env == 'dev'){
				state.leftMenuList = menuList.operationLeftMenu
			}else{
				operation = window.localStorage.getItem("operation");
				if(operation)
				state.leftMenuList = JSON.parse(aesUtils.decrypt(state.salt,state.iv,cookie.getCookie("randmId"),operation))
			}
		}
	},
	setAccessToken(state,val){
		state.accessToken = val;
	}
};
