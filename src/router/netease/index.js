
// 最近消息列表（会话）
const session = {
    path: '/index/session',
    name: 'session',
    component(resolve) {
        require(['@/pages/netEase/Session'], resolve)
    }
};
// 系统消息
const sysmsgs = {
    path: '/index/sysmsgs',
    name: 'sysmsgs',
    component(resolve) {
        require(['@/pages/netEase/SysMsgs'], resolve)
    }
};
// 聊天记录
const chat = {
    path: '/index/chat/:sessionId',
    name: 'chat',
    component(resolve) {
        require(['@/pages/netEase/Chat'], resolve)
    }
};
// 聊天历史记录
const chathistory = {
    path: '/index/chathistory/:sessionId',
    name: 'chathistory',
    component(resolve) {
        require(['@/pages/netEase/ChatHistory'], resolve)
    }
};
// 直播间
const room = {
    path: '/index/room',
    name: 'room',
    component(resolve) {
        require(['@/pages/netEase/Room'], resolve)
    }
};
// 直播聊天页
const roomChat = {
    path: '/index/roomChat/:chatroomId',
    name: 'roomChat',
    component(resolve) {
        require(['@/pages/netEase/RoomChat'], resolve)
    }
};
// 通讯录
const contacts = {
    path: '/index/contacts',
    name: 'contacts',
    component(resolve) {
        require(['@/pages/netEase/Contacts'], resolve)
    }
};
// 好友名片
const namecard = {
    path: '/index/namecard/:userId',
    name: 'namecard',
    component(resolve) {
        require(['@/pages/netEase/NameCard'], resolve)
    }
};
// 好友名片-设置备注
const namecardremark = {
    path: '/index/namecardremark/:userId',
    name: 'namecardremark',
    component(resolve) {
        require(['@/pages/netEase/NameCardRemark'], resolve)
    }
};
// 好友名片-搜索好友/群
const searchuser = {
    path: '/index/searchuser/:searchType',
    name: 'searchuser',
    component(resolve) {
        require(['@/pages/netEase/SearchUser'], resolve)
    }
};
// 邀请好友-加入群
const teaminvite = {
    path: '/index/teaminvite/:teamId',
    name: 'teaminvite',
    component(resolve) {
        require(['@/pages/netEase/TeamInvite'], resolve)
    }
};
// 通用页面
const general = {
    path: '/index/general',
    name: 'general',
    component(resolve) {
        require(['@/pages/netEase/General'], resolve)
    }
};
// 群列表
const teamlist = {
    path: '/index/teamlist/:teamType',
    name: 'teamlist',
    component(resolve) {
        require(['@/pages/netEase/TeamList'], resolve)
    }
};
// 群名片
const teamcard = {
    path: '/index/teamcard/:teamId',
    name: 'teamcard',
    component(resolve) {
        require(['@/pages/netEase/TeamCard'], resolve)
    }
};
// 群管理
const teammanage = {
    path: '/index/teammanage/:teamId',
    name: 'teammanage',
    component(resolve) {
        require(['@/pages/netEase/TeamManage'], resolve)
    }
};
// 群设置
const teamsetting = {
    path: '/index/teamsetting',
    name: 'teamsetting',
    component(resolve) {
        require(['@/pages/netEase/TeamSetting'], resolve)
    }
};
// 群成员列表
const teammembers = {
    path: '/index/teammembers/:teamId',
    name: 'teammembers',
    component(resolve) {
        require(['@/pages/netEase/TeamMembers'], resolve)
    }
};
// 群成员名片
const teammembercard = {
    path: '/index/teammembercard/:member',
    name: 'teammembercard',
    component(resolve) {
        require(['@/pages/netEase/TeamMemberCard'], resolve)
    }
};
// 发送群消息回执页
const teamSendMsgReceipt = {
    path: '/index/teamSendMsgReceipt/:teamId',
    name: 'TeamSeamMsgReceipt',
    component(resolve) {
        require(['@/pages/netEase/TeamSendMsgReceipt'], resolve)
    }
};
// 群消息回执详情页
const msgReceiptDetail = {
    path: '/index/msgReceiptDetail/:msgInfo',
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