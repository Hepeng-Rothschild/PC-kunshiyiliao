// 诊间缴费对账
const clinicPayment = {
	path: 'operation/clinicPayment',
	name: 'clinicPayment',
	meta: {
		index: 2,
		title: '诊间缴费对账'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-clinicPayment' */"@/pages/operation/internetHospital/clinicPayment/list")
}   
// 住院押金续交
const renewalDeposit = {
	path: 'operation/renewalDeposit',
	name: 'renewalDeposit',
	meta: {
		index: 2,
		title: '住院押金续交'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-renewalDeposit' */"@/pages/operation/internetHospital/renewalDeposit/list")
}   

// 就诊卡充钱
const CardRecharge = {
	path: 'operation/CardRecharge',
	name: 'CardRecharge',
	meta: {
		index: 2,
		title: '就诊卡充值'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-CardRecharge' */"@/pages/operation/internetHospital/cardRecharge/list")
}   
export default {
    // 就诊卡充值
    CardRecharge,
    // 住院押金续交
    renewalDeposit,
    // 诊间缴费对账
    clinicPayment,
}