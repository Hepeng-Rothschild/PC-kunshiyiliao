//索引管理
import indexInfomation from './IndexInformation'
// 配置仓
import configurationWarehouse from './configurationWarehouse'
// 运维端系统管理
import systemMangmentRouter from './systemManagement'

export default {
     //索引管理
     indexManagementIndex: indexInfomation.indexManagementIndex,
     residentRegisterList: indexInfomation.residentRegisterList,
     //医生注册信息
     doctorRegisterList: indexInfomation.doctorRegisterList,
     doctorRegisterBatchOne: indexInfomation.doctorRegisterBatchOne,
     doctorRegisterBatchTwo: indexInfomation.doctorRegisterBatchTwo,
     doctorRegisterBatchThree: indexInfomation.doctorRegisterBatchThree,
     //机构注册信息
     mechanismregList: indexInfomation.mechanismregList,
     mechanismregAdd: indexInfomation.mechanismregAdd,
     mechanismregEdit: indexInfomation.mechanismregEdit,
     mechanismregBatchOne: indexInfomation.mechanismregBatchOne,
     mechanismregBatchTwo: indexInfomation.mechanismregBatchTwo,
     mechanismregBatchThree: indexInfomation.mechanismregBatchThree,

    //系统管理
    systemManagementIndex:systemMangmentRouter.systemManagementIndex,
    adminList:systemMangmentRouter.adminList,
    adminAdd:systemMangmentRouter.adminAdd,
    adminReset:systemMangmentRouter.adminReset,
    adminEdit:systemMangmentRouter.adminEdit,
    adminJurisdiction:systemMangmentRouter.adminJurisdiction,
    // 权限管理
    jurisdictionList:systemMangmentRouter.jurisdictionList,
    jurisdictionAdd:systemMangmentRouter.jurisdictionAdd,
    //接口权限管理
    interfacePermiseList:systemMangmentRouter.interfacePermiseList,
    interfacePermiseEdit:systemMangmentRouter.interfacePermiseEdit,
    //菜单管理
    menuManagementList:systemMangmentRouter.menuManagementList,
    menuManagementEdit:systemMangmentRouter.menuManagementEdit,
    // 支付方式
    paymentHome:systemMangmentRouter.paymentHome,
    paymentSelect:systemMangmentRouter.paymentSelect,
    //敏感词
    sensitiveWordEdit:systemMangmentRouter.sensitiveWordEdit,

    //配置仓
    configurationWarehouseIndex: configurationWarehouse.configurationWarehouseIndex,
    //字典管理
    dictionary: configurationWarehouse.dictionary,
    //疾病/症状管理
    diseaseList: configurationWarehouse.diseaseList,
    diseaseEdit: configurationWarehouse.diseaseEdit,
    symptomList: configurationWarehouse.symptomList,
    symptomEdit: configurationWarehouse.symptomEdit,
    starClass: configurationWarehouse.starClass,
    
}
