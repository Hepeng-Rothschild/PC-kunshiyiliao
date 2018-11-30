/**
 * @file actions
 */
import * as Types from './mutation-types';

export default {
	addTodo ({ commit }, todo) {
		commit(Types.ADDTODO, todo);
	},
	changeLocale ({ commit }, locale) {
		commit(Types.CHANGELOCALE, locale);
	}
};
