// 订单管理
import orderManagement from './orderManagement'
// 医生端运营
import doctorOperation from './doctorOperation'
// 患者端运营
import oatientOperation from './oatientOperation'
// 机构运营
import InstitutionalOperation from './InstitutionalOperation'
// 服务包管理
import servicePackage from './servicePackage'
// 公众号管理
import publicManagement from './publicManagement'
// 系统管理
import systemManagement from './systemManagement'
// 互联网医院
import InternetHospital from './internetHospital'
// 药店端系统管理
import pharmacyManagement from './pharmacyManagement'

let operationPathManagement = {...pharmacyManagement,...orderManagement, ...doctorOperation, ...oatientOperation, ...InstitutionalOperation, ...servicePackage, ...publicManagement, ...systemManagement, ...InternetHospital}
// 药品目录管理
import drugmanagement from './drugManagement'

let operationPath = {
    ...orderManagement,
    ...doctorOperation,
    ...oatientOperation,
    ...InstitutionalOperation,
    ...servicePackage,
    ...publicManagement,
    ...systemManagement,
    ...InternetHospital,
    ...drugmanagement
}

export default {
    operationPath,
    operationPathManagement
} 