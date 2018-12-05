const topMenu = [
    {id:1,name:'运营平台'},
    {id:2,name:'运维平台'},
    {id:3,name:'统计平台'},
    {id:4,name:'监管平台'}
];
const operationLeftMenu = [
    {id:1,level:1,name:"运营端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1",path:"/index/operation/index"},
        {id:3,level:2,name:"审核列表2",path:"/index/operation/list1"},
        {id:4,level:2,name:"审核列表3",path:"/index/operation/list2"},
        {id:5,level:2,name:"审核列表4",path:"/index/operation/list3"},
        {id:5,level:2,name:"KindEditor-Demo",path:"/index/operation/kindeditor"},
    ]}
];
const maintainLeftMenu = [
    {id:1,level:1,name:"运维端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1"},
        {id:3,level:2,name:"审核列表2"},
        {id:4,level:2,name:"审核列表3"},
        {id:5,level:2,name:"审核列表4"}
    ]}
];
const statisticsLeftMenu = [
    {id:1,level:1,name:"统计端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1"},
        {id:3,level:2,name:"审核列表2"},
        {id:4,level:2,name:"审核列表3"},
        {id:5,level:2,name:"审核列表4"}
    ]}
];
const supervisionLeftMenu = [
    {id:1,level:1,name:"监管端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1"},
        {id:3,level:2,name:"审核列表2"},
        {id:4,level:2,name:"审核列表3"},
        {id:5,level:2,name:"审核列表4"}
    ]}
];
export default {
    topMenu,
    operationLeftMenu,
    maintainLeftMenu,
    statisticsLeftMenu,
    supervisionLeftMenu,
}