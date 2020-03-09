// 统一药品目录维护
const commondrug = {
    path: 'operation/drugmanagement/commondrug/list',
    name: 'commondrug',
    meta: {
        index: 1,
        title: '统一药品目录维护'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/commondrug/list")
}
// 医疗机构药品目录对照
const departmentdrug = {
    path: 'operation/drugmanagement/departmentdrug/list',
    name: 'departmentdrug',
    meta: {
        index: 2,
        title: '医疗机构药品目录对照'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/departmentdrug/list")
}

// 药店药品目录对照
const storedrug = {
    path: 'operation/drugmanagement/storedrug/list',
    name: 'storedrug',
    meta: {
        index: 2,
        title: '就诊卡充值'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/storedrug/list")
}
export default {
    // 统一药品目录维护
    commondrug,
    // 医疗机构药品目录对照
    departmentdrug,
    // 药店药品目录对照
    storedrug,
}