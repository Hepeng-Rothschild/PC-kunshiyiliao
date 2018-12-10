//开发环境
const fileImag = '/organization/uploadHospitalNewFiles' //上传医院图片接口

const fileAll = '/operateapi/hospitaloperateuploadfiles' // 上传文件
const uploadUrl = "/operateapi/hospitaluploadoperatefiles"; //上传文件api

const login = "/operateapi/operate/login"; //登陆接口

//动态新闻
const news = '/operateapi/organizationpagenews'; //动态新闻列表分页
const getNews = '/operateapi/organizationselectnew' //获取动态新闻详情信息

const setNews = '/operateapi/organizationinsertnew'


//新闻列表
const addNews = '/operateapi/organizationupdatenew'; //修改新闻详情
const newsA = '/operateapi/organizationinsertnew' ; // 新增新闻



//内容管理
const contentWrap = '/operateapi/articlepagebyarticle'  // 内容管理列表
const createdWrap = '/operateapi/articleinsert'   // 创建新闻
const changeWrap = '/operateapi/articleupdate'   // 修改新闻
const getWrap = '/operateapi/articleselectbyid' //查询新闻
const upWrap = '/operateapi/articleideletebatch' //下架
const root = '/operateapi/articlepriority';   //新闻置顶

//专家列表
const zj = '/operateapi/organizationpageexpertdoctor'   //专家列表分页


//特色科室
const tesekeshi = '/operateapi/organizationqueryspecialdept'   //特色科室


const fileimages ='/operateapi/organizationuploadoperatefiles' 

//banner接口
const bannerHome = '/operateapi/bannerquerypagehospitalbannerlist' //Banner分页
const bannerAdd = '/operateapi/bannerinserthospitalbanner'  //banner添加
const bannerChange = '/operateapi/bannerupdatehospitalbanner' //banner 编辑
const getIdBanner = '/operateapi/bannerqueryhospitalbannerbyid' //banner查找

//服务管理
const _server = '/operateapi/hospitalmenuqueryhospitalmenulistbyid'  //服务管理列表
const getServer = '/operateapi/hospitalmenuqueryhospitalmenulist' //服务管理-编辑

//预约科室接口
const kDepartment = '/operateapi/organizationpageappointmentdept' //预约科室列表
const getDepartment = '/operateapi/organizationselectdeptlist'  //查看科室列表
const departmentDetail = '/operateapi/organizationquerydepbyid' //查看科室详情
const departmentChange = '/operateapi/organizationupdateappointmentdept' //修改预约科室详情




export default {
    login,
    fileImag,
    fileimages,
    fileAll,
    
    //内容管理
    contentWrap,
    createdWrap,
    root,
    changeWrap,
    getWrap,
    upWrap,
    //动态新闻
    news,
    addNews,
    newsA,
    zj,
    getNews,
    //特色科室
    tesekeshi,
    //banner接口
    bannerHome,
    bannerAdd,
    getIdBanner,
    bannerChange,
    //服务管理
    _server,
    getServer,
    //预约科室
    kDepartment,
    getDepartment,
    departmentDetail,
    departmentChange,
    
}
