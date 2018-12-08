//开发环境api
const fileBaseUrl = "https://ydjk-dev.oss-cn-beijing.aliyuncs.com/"; //ftp文件存放地址
const uploadUrl = "/operateapi/hospitaluploadoperatefiles"; //上传文件api
const login = "/operateapi/operate/login"; //登陆接口
const news = '/operateapi/organizationinsertnew'; //动态新闻列表分页
export default {
    fileBaseUrl,
    login,
    news,
    uploadUrl
}