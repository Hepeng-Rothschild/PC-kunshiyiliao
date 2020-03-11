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
    path: 'operation/drugmanagement/batchone',
    name: 'drugmanagementbatchone',
    meta: {
        index: 11,
        title: '药品管理-统一药品目录维护上传-第一步'
    },
    component: () => import(/* webpackChunkName: 'operation-drugmanagement-upload' */"@/pages/operation/drugmanagement/uploadPages/stepOne")
}
const commondrugBatchTwo = {
    path: 'operation/drugmanagement/batchtwo',
    name: 'drugmanagementbatchtwo',
    meta: {
        index: 12,
        title: '药品管理-统一药品目录维护上传-第二步'
    },
    component: () => import(/* webpackChunkName: 'operation-drugmanagement-upload' */"@/pages/operation/drugmanagement/uploadPages/stepTwo")
}
const commondrugBatchThree = {
    path: 'operation/drugmanagement/batchthree',
    name: 'drugmanagementbatchThree',
    meta: {
        index: 12,
        title: '药品管理-统一药品目录维护上传-第三步'
    },
    component: () => import(/* webpackChunkName: 'operation-drugmanagement-upload' */"@/pages/operation/drugmanagement/uploadPages/stepThree")
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
    commondrugBatchOne,
    commondrugBatchTwo,
    commondrugBatchThree,
    // 医疗机构药品目录对照
    departmentdrug,
    // 药店药品目录对照
    storedrug,
}