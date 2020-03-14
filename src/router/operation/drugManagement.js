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
const commondrugBatchOne = {
    path: 'operation/drugmanagement/commondrug/batchone',
    name: 'commondrugbatchone',
    meta: {
        index: 11,
        title: '药品管理-统一药品目录维护上传-第一步'
    },
    component: () => import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/commondrug/uploadPages/stepOne")
}
const commondrugBatchTwo = {
    path: 'operation/drugmanagement/commondrug/batchtwo',
    name: 'commondrugbatchtwo',
    meta: {
        index: 12,
        title: '药品管理-统一药品目录维护上传-第二步'
    },
    component: () => import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/commondrug/uploadPages/stepTwo")
}
const commondrugBatchThree = {
    path: 'operation/drugmanagement/commondrug/batchthree',
    name: 'commondrugbatchthree',
    meta: {
        index: 12,
        title: '药品管理-统一药品目录维护上传-第三步'
    },
    component: () => import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/commondrug/uploadPages/stepThree")
}
// 医疗机构药品目录对照
const departmentdrug = {
    path: 'operation/drugmanagement/departmentdrug/list',
    name: 'departmentdrug',
    meta: {
        index: 2,
        title: '医疗机构药品目录对照-列表页'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/departmentdrug/list")
}
const departmentdrugadd = {
    path: 'operation/drugmanagement/departmentdrug/add',
    name: 'departmentdrugadd',
    meta: {
        index: 21,
        title: '医疗机构药品目录对照-新建页'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/departmentdrug/add")
}
const departmentdrugreview = {
    path: 'operation/drugmanagement/departmentdrug/review/:id',
    name: 'departmentdrugreview',
    meta: {
        index: 22,
        title: '医疗机构药品目录对照-查看页'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/departmentdrug/review")
}
const departmentdrugedit = {
    path: 'operation/drugmanagement/departmentdrug/edit/:id',
    name: 'departmentdrugedit',
    meta: {
        index: 22,
        title: '医疗机构药品目录对照-编辑页'
    },
    component: () =>
        import(/* webpackChunkName: 'operation-drugmanagement' */"@/pages/operation/drugmanagement/departmentdrug/edit")
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
    commondrugBatchOne,
    commondrugBatchTwo,
    commondrugBatchThree,
    // 医疗机构药品目录对照
    departmentdrug,
    departmentdrugadd,
    departmentdrugreview,
    departmentdrugedit,
    // 药店药品目录对照
    storedrug,
}