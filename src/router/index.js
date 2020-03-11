import Vue from 'vue';
import VueRouter from 'vue-router';
import operation from './operation';
import maintain from './maintain';
import statistics from './statistics';
import supervision from './supervision';
import netease from './netease';
import chat from './chat';

let childrenPath = [
	{
		path: 'test',
		name: 'test',
		meta: {
			index: 1,
			title: 'test'
		},
		component: () => import(/* webpackChunkName: 'rsa' */'@/pages/testRsa')
	},
	{
		path: 'test_jump',
		name: 'test_jump',
		meta: {
			index: 2,
			title: 'test_jump'
		},
		component: () => import(/* webpackChunkName: 'rsa' */'@/pages/testRsa/jump')
	},
]
let path = {...operation, ...maintain, ...statistics, ...supervision, ...netease, ...chat}
for (let i in path) {
	childrenPath.push(path[i])
}

export default new VueRouter({
	mode: 'hash',
	routes: [
		{
			path: '/',
			meta: {
				index: 0,
				title: "互联网医院管理系统"
			},
			redirect: '/index'
		},
		{
			path: '/index',
			name: 'home',
			meta: {
				index: 1,
				title: "互联网医院管理系统"
			},
			component: () => import(/* webpackChunkName: 'index' */'@/pages/index'),
			
			children: childrenPath,
		},
		{
			path: '/login',
			name: 'login',
			meta: {
				index: 1,
				title: "登陆"
			},
			component: () => import(/* webpackChunkName: 'login' */'@/pages/login')
		},
		{
			path: '/public',
			name: 'publicmodel',
			meta: {
				index: 1,
				title: "公共平台"
			},
			component: () => import(/* webpackChunkName: 'rsa' */'@/pages/public/index'),
			redirect: '/public/index',
			children: [
				{
					path: 'index',
					name: 'publicIndex',
					meta: {
						index: 1,
						title: '提示'
					},
					component: () => import(/* webpackChunkName: 'rsa' */'@/pages/public/notice')
				}
			]
		},
		{
			path: '*',
			name: '404',
			meta: {
				index: 1,
				title: "404 NOT FOUND"
			},
			component: () => import(/* webpackChunkName: 'not-found' */'@/pages/public/404')
		}
	]
});
