/**
 * @file store
 */
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import addressConfig from '@/config/address.js';


// 状态管理vuex
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		env:"production", // dev/test/production
		version:"1.0",
		// 国际化默认中文 （cookie里面取，然后存到store里面）
		locale: 'zh-CN',

		topMenuList: new Array(),
		leftMenuList: new Array(),
		//所有省市区
		address: addressConfig.address,
		iv: '54bef10750df41d5ac9f2d0a4fe100bf',
		salt: '7c70035d4e7f4a1ba5a0eb737c7cf2d9',
		accessToken: null,
		identityList:[
			{ id: 1, name: "超级管理员" },
			{ id: 2, name: "省级管理员" },
			{ id: 3, name: "市级管理员" },
			{ id: 4, name: "区级管理员" },
			{ id: 5, name: "机构管理员" }
		]
	},
	getters,
	mutations,
	actions
});
