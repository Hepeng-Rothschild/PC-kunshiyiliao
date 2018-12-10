//测试环境api
//本地测试环境
const fileBaseUrl = "https://ydjk-dev.oss-cn-beijing.aliyuncs.com/"; //ftp文件存放地址

const uploadUrl = "/operateapi/hospitaluploadoperatefiles"; //上传文件api
const fileImag = '/organization/uploadHospitalNewFiles' //上传医院图片接口

// 机构管理
const management = '/operateapi/hospitalqueryhospitaloperatelist'  //机构管理医院列表
const managementInfo = '/operateapi/hospitalqueryhospitaloperatedtobyid'   //医院详细信息
const managementAll = '/operateapi/hospitalqueryhospitallevellist' //医院等级列表
const managementGzh = '/operateapi/hospitalquerywxappnamelist'   //查询医院公众号
const managementYlt = '/operateapi/hospitalqueryhospitalnamelist' //查询医院医联体

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
export default {
    login,
    uploadUrl,
    fileImag,
    fileAll,
    //机构管理
    management,
    managementInfo,
    managementAll,
    managementGzh,
    managementYlt,
    
    //动态新闻
    news,
    fileAll,
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

}