
// 所有群聊列表
const teamList = {
    path: '/index/chatList',
    name: 'chatList',
    component(resolve) {
        require(['@/pages/chat/teamList'], resolve)
    }
};
const teamChat = {
    path: '/index/teamChat',
    name: 'teamChat',
    component(resolve) {
        require(['@/pages/chat/teamChat'], resolve)
    }
};
const teamHistory = {
    path: '/index/teamHistory',
    name: 'teamHistory',
    component(resolve) {
        require(['@/pages/chat/teamHistory'], resolve)
    }
};
const teamManager = {
    path: '/index/teamManager',
    name: 'teamManager',
    component(resolve) {
        require(['@/pages/chat/teamManager'], resolve)
    }
};
const neVideo = {
    path: '/index/video',
    name: 'neVideo',
    component(resolve) {
        require(['@/pages/video'], resolve)
    }
};
const nePublish = {
    path: '/index/video/publish',
    name: 'nePublish',
    component(resolve) {
        require(['@/pages/video/publish'], resolve)
    }
};
export default {
    teamList,
    teamChat,
    teamHistory,
    teamManager,
    neVideo,
    nePublish
}