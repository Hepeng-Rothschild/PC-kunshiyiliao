/**
 * @file store
 */
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// 状态管理vuex
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 国际化默认中文 （cookie里面取，然后存到store里面）
		locale: 'zh-CN',
		// 例子
		mapList: [
			{
				id: 1,
				title: 'hello world'
			}
		]
	},
	getters,
	mutations,
	actions
});
