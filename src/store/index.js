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
		address:addressConfig.address,
		Rsa:{ //公钥
			my_key:`-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/GTvHeZv0+WAQR5dwt02TWbONgZqflwkcHT3xnY9cFYi0KiOsc5elZ2Ie6SM60RNBrDid19chCap682kxRy94vQzKyfwhKLJz5gF3vpJS3q+QcvbSapRy/1ln54kqaw3KZNC05kDwO+dfAmHTeQ95rIZVa0bDnxmYnVlvb0zOgwIDAQAB-----END PUBLIC KEY-----`
		},
		Rsas:{//私钥
			my_key:`-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL8ZO8d5m/T5YBBHl3C3TZNZs42Bmp+XCRwdPfGdj1wViLQqI6xzl6VnYh7pIzrRE0GsOJ3X1yEJqnrzaTFHL3i9DMrJ/CEosnPmAXe+klLer5By9tJqlHL/WWfniSprDcpk0LTmQPA7518CYdN5D3mshlVrRsOfGZidWW9vTM6DAgMBAAECgYAGlYX7v3LiI91tcioDli00EHkhPP/o07laoJ9LvdP8pjlJi9Ii1PC6oC8/RWUTV7TEJHzm41LkLoMTLWPIcN1vyiUTu/54nH2GsQ8X77z91CgyBwEubo4RKd6E421OoIAJ5F80mQvJf471z+6C4URYVWY29tIEEtLccKxHm/wO8QJBAPvMGlqkWpifPF8iAcDtlpQom0JLdR4D+oDrH5qat2GL0oz3/swV4EWFmftd1GgPdGkyoo18DxO1OizlXwoVEVUCQQDCScXazHugYqwCecOr6JUo9y2Dv9X1qav5I16HLxEacDy6eK+5h4OtxSg+FDr0EGRMycs86llLy9md8sjwesB3AkEAnGMn+yQZILHFzVBRxoHKBDs0MviqxPmznF5sQpnVS8CMBQICPr9Xi9ZuzLB6PCddJflM/JMQyizE9R2A6cIsAQJAPOCOzVMbPZMNYK00oY38Bt0Edu7KJPKoPyVU/jjCPC2E6czdCt4qZW2MgX8nRchJFUJ5mzm3Byf1pScozSk5WwJARfzCejsvFBvjUEVpQ2Q9Gm0pGJlacEWXoxDtYSqMbgUdWQHTFvqUAI+owCxgyPk7C2hKttzSW6KhxNieBuwHWA==-----END PRIVATE KEY-----`
		}
	},
	getters,
	mutations,
	actions
});
