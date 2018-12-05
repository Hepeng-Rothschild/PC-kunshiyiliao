/**
 * @file mutations
 */
import * as Types from './mutation-types';
import menuList from './mutations/menuList';

export default {
	[Types.ADDTODO] (state, todo) {
		state.mapList.push(todo);
	},
	[Types.CHANGELOCALE] (state, locale) {
		state.locale = locale;
	},
	// 设置顶级菜单
	setTopMenuList(state){
		state.topMenuList = menuList.topMenu
	},
	// 设置左侧菜单
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
	}
};
