//开发环境api
const fileBaseUrl = "https://ydjk-dev.oss-cn-beijing.aliyuncs.com/"; //ftp文件存放地址

const uploadUrl = "/operateapi/hospitaluploadoperatefiles"; //上传文件api
// const login = "/operateapi/operate/login"; //登陆接口
const news = '/operateapi/organizationinsertnew'; //动态新闻列表分页


const fileUpload = "/operateapi/hospitaloperateuploadfiles"; //上传接口
const login = "/operateapi/operate/login"; //登陆接口
const getprovince = "/operateapi/authenticationqueryprovince"; //获取省级列表
const gettitle = "/operateapi/authenticationquerytitle"; //获取职称列表
const getreviewdoctorlist = "/operateapi/authenticationdoctorpage"; //获取审核医生列表
const delreviewdoctor = "/operateapi/authenticationdelete"; //删除审核医生列表
const delreviewdoctorinfo = "/operateapi/authenticationquerydoctor"; //审核医生列表详情
const reviewdoctor = "/operateapi/authenticationupdate"; //医生审核
const reviewdoctorupdate = "/operateapi/authenticationupdatedoctorbyoperate"; //医生审核修改信息
const hospitallist = "/operateapi/authenticationqueryhospital"; //医生审核
const registerlist = "/operateapi/registerpagedoctor"; //预约挂号列表
const registerdoctordetail = "/operateapi/registerselectdoctorbyid"; //预约医生详情
const changeregisterstatus = "/operateapi/registerupdatestatus"; //改变预约状态
const registerdoclist = "/operateapi/registerselectdoctornotscheduling"; //预约挂号专家列表
const registerdocupdate = "/operateapi/registerupdate"; //预约挂号修改
const registerdocinsert = "/operateapi/registerinsertdoctorappointment"; //预约挂号添加
export default {
    fileBaseUrl,
    login,
    news,
    uploadUrl,
    fileUpload,
    getprovince,
    gettitle,
    getreviewdoctorlist,
    delreviewdoctor,
    delreviewdoctorinfo,
    reviewdoctor,
    hospitallist,
    reviewdoctorupdate,
    registerlist,
    registerdoctordetail,
    changeregisterstatus,
    registerdoclist,
    registerdocupdate,
    registerdocinsert,

}