//测试环境api

const login = "/operateapi/operate/login"; //登陆接口
const news = '/operateapi/organizationinsertnew'; //动态新闻列表分页
const fileAll = "/operateapi/hospitaloperateuploadfiles"; //上传接口
const getProvince = "/operateapi/authenticationqueryprovince"; //获取省级列表
const getTitle = "/operateapi/authenticationquerytitle"; //获取职称列表
const getReviewDoctorList = "/operateapi/authenticationdoctorpage"; //获取审核医生列表
const delReviewDoctor = "/operateapi/authenticationdelete"; //删除审核医生列表
const delReviewDoctorInfo = "/operateapi/authenticationquerydoctor"; //审核医生列表详情
const reviewDoctor = "/operateapi/authenticationupdate"; //医生审核
const reviewDoctorUpdate = "/operateapi/authenticationupdatedoctorbyoperate"; //医生审核修改信息
const hospitalList = "/operateapi/authenticationqueryhospital"; //医生审核
const registerList = "/operateapi/registerpagedoctor"; //预约挂号列表
const registerDoctorDetail = "/operateapi/registerselectdoctorbyid"; //预约医生详情
const changeRegisterStatus = "/operateapi/registerupdatestatus"; //改变预约状态
const registerDoctorList = "/operateapi/registerselectdoctornotscheduling"; //预约挂号专家列表
const registerDoctorUpdate = "/operateapi/registerupdate"; //预约挂号修改
const registerDoctorInsert = "/operateapi/registerinsertdoctorappointment"; //预约挂号添加

// 机构管理
const management = '/operateapi/hospitalqueryhospitaloperatelist'  //机构管理医院列表
const managementInfo = '/operateapi/hospitalqueryhospitaloperatedtobyid'   //医院详细信息
const managementAll = '/operateapi/hospitalqueryhospitallevellist' //医院等级列表
const managementGzh = '/operateapi/hospitalquerywxappnamelist'   //查询医院公众号
const managementYlt = '/operateapi/hospitalqueryhospitalnamelist' //查询医院医联体

/* ********************************************* */

//动态新闻
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

/* ********************************************* */

export default {
    login,
    fileAll,
    //机构管理
    management,
    managementInfo,
    managementAll,
    managementGzh,
    managementYlt,
    
    //动态新闻
    news,
    getProvince,
    getTitle,
    getReviewDoctorList,
    delReviewDoctor,
    delReviewDoctorInfo,
    reviewDoctor,
    hospitalList,
    reviewDoctorUpdate,
    registerList,
    registerDoctorDetail,
    changeRegisterStatus,
    registerDoctorList,
    registerDoctorUpdate,
    registerDoctorInsert,

    /* ********************************************** */
    
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
    setNews,
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
    /* ********************************************** */
}