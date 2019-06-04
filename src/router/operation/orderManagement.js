// 订单管理
const ordersManagement = { //订单管理
	path: 'operation/ordersmanagement/index',
	name: 'ordersManagement',
	meta: {
		index: 1,
		title: '订单管理'
	},
	redirect: '/index/operation/orders/reservation/list'
}
const reservationOrders = { //预约挂号订单
	path: 'operation/orders/reservation/list',
	name: 'reservationOrders',
	meta: {
		index: 2,
		title: '预约挂号订单管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement' */"@/pages/operation/orders/reservation/list")
}
const remoteClinicOrders = { //远程门诊订单
	path: 'operation/orders/remoteClinic/list',
	name: 'remoteClinicOrders',
	meta: {
		index: 2,
		title: '远程门诊订单管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement' */"@/pages/operation/orders/remoteClinic/list")
}
const remoteClinicOrdersDetail = { //远程门诊订单详情
	path: 'operation/orders/remoteClinic/detail',
	name: 'remoteClinicOrdersDetail',
	meta: {
		index: 3,
		title: '远程门诊订单详情'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement' */"@/pages/operation/orders/remoteClinic/detail")
}
// 家医签约管理
const contractManagement = {
	path: 'operation/contractManagement/list',
	name: 'contractManagement',
	meta: {
		index: 2,
		title: '家医签约管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement' */"@/pages/operation/contractManagement/list")
}
export default{
    //订单管理
    ordersManagement,
    // 预约挂号订单
	reservationOrders,
	// 家医签约管理
    contractManagement,
    // 远程门诊订单
    remoteClinicOrders,
    // 远程门诊订单详情
	remoteClinicOrdersDetail,
}