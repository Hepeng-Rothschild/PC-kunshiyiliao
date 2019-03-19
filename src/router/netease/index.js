
// 最近消息列表（会话）
const session = {
    path: '/session',
    name: 'session',
    component(resolve) {
        require(['@/pages/netEase/Session'], resolve)
    }
};
// 系统消息
const sysmsgs = {
    path: '/sysmsgs',
    name: 'sysmsgs',
    component(resolve) {
        require(['@/pages/netEase/SysMsgs'], resolve)
    }
};
// 聊天记录
const chat = {
    path: '/chat/:sessionId',
    name: 'chat',
    component(resolve) {
        require(['@/pages/netEase/Chat'], resolve)
    }
};
// 聊天历史记录
const chathistory = {
    path: '/chathistory/:sessionId',
    name: 'chathistory',
    component(resolve) {
        require(['@/pages/netEase/ChatHistory'], resolve)
    }
};
// 直播间
const room = {
    path: '/room',
    name: 'room',
    component(resolve) {
        require(['@/pages/netEase/Room'], resolve)
    }
};
// 直播聊天页
const roomChat = {
    path: '/roomChat/:chatroomId',
    name: 'roomChat',
    component(resolve) {
        require(['@/pages/netEase/RoomChat'], resolve)
    }
};
// 通讯录
const contacts = {
    path: '/contacts',
    name: 'contacts',
    component(resolve) {
        require(['@/pages/netEase/Contacts'], resolve)
    }
};
// 好友名片
const namecard = {
    path: '/namecard/:userId',
    name: 'namecard',
    component(resolve) {
        require(['@/pages/netEase/NameCard'], resolve)
    }
};
// 好友名片-设置备注
const namecardremark = {
    path: '/namecardremark/:userId',
    name: 'namecardremark',
    component(resolve) {
        require(['@/pages/netEase/NameCardRemark'], resolve)
    }
};
// 好友名片-搜索好友/群
const searchuser = {
    path: '/searchuser/:searchType',
    name: 'searchuser',
    component(resolve) {
        require(['@/pages/netEase/SearchUser'], resolve)
    }
};
// 邀请好友-加入群
const teaminvite = {
    path: '/teaminvite/:teamId',
    name: 'teaminvite',
    component(resolve) {
        require(['@/pages/netEase/TeamInvite'], resolve)
    }
};
// 通用页面
const general = {
    path: '/general',
    name: 'general',
    component(resolve) {
        require(['@/pages/netEase/General'], resolve)
    }
};
// 群列表
const teamlist = {
    path: '/teamlist/:teamType',
    name: 'teamlist',
    component(resolve) {
        require(['@/pages/netEase/TeamList'], resolve)
    }
};
// 群名片
const teamcard = {
    path: '/teamcard/:teamId',
    name: 'teamcard',
    component(resolve) {
        require(['@/pages/netEase/TeamCard'], resolve)
    }
};
// 群管理
const teammanage = {
    path: '/teammanage/:teamId',
    name: 'teammanage',
    component(resolve) {
        require(['@/pages/netEase/TeamManage'], resolve)
    }
};
// 群设置
const teamsetting = {
    path: '/teamsetting',
    name: 'teamsetting',
    component(resolve) {
        require(['@/pages/netEase/TeamSetting'], resolve)
    }
};
// 群成员列表
const teammembers = {
    path: '/teammembers/:teamId',
    name: 'teammembers',
    component(resolve) {
        require(['@/pages/netEase/TeamMembers'], resolve)
    }
};
// 群成员名片
const teammembercard = {
    path: '/teammembercard/:member',
    name: 'teammembercard',
    component(resolve) {
        require(['@/pages/netEase/TeamMemberCard'], resolve)
    }
};
// 发送群消息回执页
const teamSendMsgReceipt = {
    path: '/teamSendMsgReceipt/:teamId',
    name: 'TeamSeamMsgReceipt',
    component(resolve) {
        require(['@/pages/netEase/TeamSendMsgReceipt'], resolve)
    }
};
// 群消息回执详情页
const msgReceiptDetail = {
    path: '/msgReceiptDetail/:msgInfo',
    name: 'msgReceiptDetail',
    component(resolve) {
        require(['@/pages/netEase/TeamMsgReceiptDetail'], resolve)
    }
}
export default {
    session,
    sysmsgs,
    chat,
    chathistory,
    room,
    roomChat,
    contacts,
    namecard,
    namecardremark,
    searchuser,
    teaminvite,
    general,
    teamlist,
    teamcard,
    teammanage,
    teamsetting,
    teammembers,
    teammembercard,
    teamSendMsgReceipt,
    msgReceiptDetail
}