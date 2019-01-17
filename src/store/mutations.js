/**
 * @file mutations
 */
import Vue from 'vue';
import * as Types from './mutation-types';
import menuList from './mutations/menuList';

export default {
	[Types.ADDTODO] (state, todo) {
		state.mapList.push(todo);
	},
	[Types.CHANGELOCALE] (state, locale) {
		state.locale = locale;
	},
	// 设置显示的顶级菜单
	setTopMenuList(state){
		state.topMenuList = menuList.topMenu
	},
	// 设置显示的左侧菜单
	setLeftMenuList(state,name){
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
	},
	//设置加密的IV
	setKey(state,key){
		state.key = key;
	},
	//设置用户所包含的权限菜单
	setTopMenu(state,topMenu){
		state.topMenu = topMenu;
	},
	setOperationLeftMenu(state,operationLeftMenu){
		state.operationLeftMenu = operationLeftMenu;
	},
	setMaintainLeftMenu(state,maintainLeftMenu){
		state.maintainLeftMenu = maintainLeftMenu;
	},
	setStatisticsLeftMenu(state,statisticsLeftMenu){
		state.statisticsLeftMenu = statisticsLeftMenu;
	},
	setSupervisionLeftMenu(state,supervisionLeftMenu){
		state.supervisionLeftMenu = supervisionLeftMenu;
	},
};
