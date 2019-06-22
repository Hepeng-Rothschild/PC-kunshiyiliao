// 配置仓
const configurationWarehouseIndex = {
    path:'maintain/configurationWarehouse/index',
    name:'configurationWarehouseIndex',
    meta:{
        index:1,
        title:'配置仓'
    },
    redirect: '/index/maintain/dictionary/tree'
}
const dictionary = {
    path:'maintain/dictionary/tree',
    name:'dictionary',
    meta:{
        index:2,
        title:'字典管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-dictionaries' */"@/pages/maintain/dictionary/tree")
}
const diseaseList = {
    path:'maintain/disease/list',
    name:'diseaseList',
    meta:{
        index:2,
        title:'疾病管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-disease' */"@/pages/maintain/disease/list")
}
const diseaseEdit = {
    path:'maintain/disease/edit',
    name:'diseaseEdit',
    meta:{
        index:3,
        title:'疾病编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-disease' */"@/pages/maintain/disease/edit")
}
const symptomList = {
    path:'maintain/symptom/list',
    name:'symptomList',
    meta:{
        index:2,
        title:'症状管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-symptom' */"@/pages/maintain/symptom/list")
}
const symptomEdit = {
    path:'maintain/symptom/edit',
    name:'symptomEdit',
    meta:{
        index:3,
        title:'症状编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-symptom' */"@/pages/maintain/symptom/edit")
}
const starClass = {
    path:'maintain/starClass/list',
    name:'starClassList',
    meta:{
        index:3,
        title:'评价管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-starclass' */"@/pages/maintain/starClass/list")
}

export default {
    // 评价管理
    starClass,
    // 症状编辑
    symptomEdit,
    // 症状管理
    symptomList,
    // 疾病编辑
    diseaseEdit,
    // 疾病管理
    diseaseList,
    // 字典管理
    dictionary,
    // 配置仓
    configurationWarehouseIndex,

}