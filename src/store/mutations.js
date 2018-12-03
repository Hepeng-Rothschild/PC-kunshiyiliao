/**
 * @file mutations
 */
import * as Types from './mutation-types';

export default {
	[Types.ADDTODO] (state, todo) {
		state.mapList.push(todo);
	},
	[Types.CHANGELOCALE] (state, locale) {
		state.locale = locale;
	},
	// 设置顶级菜单
	setTopMenuList(state){
		state.topMenuList = [
			{id:1,name:'运营平台'},
			{id:2,name:'运维平台'},
			{id:3,name:'统计平台'},
			{id:4,name:'监管平台'}
		]
	},
	// 设置左侧菜单
	setLeftMenuList(state,name){
		switch(name){
			case 1:
			state.leftMenuList = [
				{id:1,level:1,name:"医生认证1",childLists:[
					{id:2,level:2,name:"审核列表1",path:"/operation/index"},
					{id:3,level:2,name:"审核列表2",path:"/operation/list1"},
					{id:4,level:2,name:"审核列表3",path:"/operation/list2"},
					{id:5,level:2,name:"审核列表4",path:"/operation/list3"},
				]}
			]
			break;
			case 2:
			state.leftMenuList = [
				{id:1,level:1,name:"医生认证2",childLists:[
					{id:2,level:2,name:"审核列表1"},
					{id:3,level:2,name:"审核列表2"},
					{id:4,level:2,name:"审核列表3"},
					{id:5,level:2,name:"审核列表4"}
				]}
			]
			break;
			case 3:
			state.leftMenuList = [
				{id:1,level:1,name:"医生认证3",childLists:[
					{id:2,level:2,name:"审核列表1"},
					{id:3,level:2,name:"审核列表2"},
					{id:4,level:2,name:"审核列表3"},
					{id:5,level:2,name:"审核列表4"}
				]}
			]
			break;
			case 4:
			state.leftMenuList = [
				{id:1,level:1,name:"医生认证4",childLists:[
					{id:2,level:2,name:"审核列表1"},
					{id:3,level:2,name:"审核列表2"},
					{id:4,level:2,name:"审核列表3"},
					{id:5,level:2,name:"审核列表4"}
				]}
			]
			break;
			default:
			state.leftMenuList = [
				{id:1,level:1,name:"医生认证1",childLists:[
					{id:2,level:2,name:"审核列表1",path:"/operation/index"},
					{id:3,level:2,name:"审核列表2",path:"/operation/list1"},
					{id:4,level:2,name:"审核列表3",path:"/operation/list2"},
					{id:5,level:2,name:"审核列表4",path:"/operation/list3"},
				]}
			]
		}
	}
};
