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
		env:"test", // dev/test/production
		version:"1.0",
		// 国际化默认中文 （cookie里面取，然后存到store里面）
		locale: 'zh-CN',

		topMenuList:new Array(),
		leftMenuList:new Array(),
		//所有省市区
		address:addressConfig.address
	},
	getters,
	mutations,
	actions
});
