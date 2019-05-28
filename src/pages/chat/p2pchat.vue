<template>
    <div class="g-inherit m-article">
        <header class="m-tab" :left-options="leftBtnOptions">
            <h1 class="m-tab-top">{{sessionName}}</h1>
            <a slot="left"></a>
            <div class="m-tab-right" slot="right">
                <span class="icon-history" @click="onHistoryClick"></span>
            </div>
        </header>
        <div class="m-chat-main">
            <chat-list
                type="session"
                :msglist="msglist"
                :userInfos="userInfos"
                :myInfo="myInfo"
                @msgs-loaded="msgsLoaded"
            ></chat-list>
            <chat-editor type="session" :scene="scene" :to="to"></chat-editor>
        </div>
    </div>
</template>

<script>
import ChatEditor from "@/components/p2pChatEditor";
import ChatList from "@/components/p2pChatList";
import util from "@/utils";
import pageUtil from "@/utils/page";

export default {
    components: {
        ChatEditor,
        ChatList
    },
    // 进入该页面，文档被挂载
    mounted() {
        // 此时设置当前会话
        this.$store.dispatch("setCurrSession", this.sessionId);
        pageUtil.scrollChatListDown();
    },
    updated() {
        pageUtil.scrollChatListDown();
    },
    // 离开该页面，此时重置当前会话
    destroyed() {
        this.$store.dispatch("resetCurrSession");
    },
    data() {
        return {
            leftBtnOptions: {
                backText: " ",
                preventGoBack: true
            }
        };
    },
    computed: {
        sessionId() {
            let sessionId = "p2p-" + this.$route.query.sessionId;
            return sessionId;
        },
        sessionName() {
            let sessionId = this.sessionId;
            let user = null;
            user = sessionId.replace(/^p2p-/, "");
            if (user === this.$store.state.userUID) {
                return "我的手机";
            } else {
                let userInfo = this.userInfos[user] || {};
                return util.getFriendAlias(userInfo);
            }
        },
        scene() {
            return util.parseSession(this.sessionId).scene;
        },
        to() {
            return util.parseSession(this.sessionId).to;
        },
        myInfo() {
            return this.$store.state.myInfo;
        },
        userInfos() {
            return this.$store.state.userInfos;
        },
        msglist() {
            let msgs = this.$store.state.currSessionMsgs;
            return msgs;
        }
    },
    methods: {
        onClickBack() {
            window.stopPlayAudio && window.stopPlayAudio();
            window.history.go(-1);
        },
        msgsLoaded() {
            pageUtil.scrollChatListDown();
        },
        onHistoryClick() {
            location.href = `#/chathistory/${this.sessionId}`;
        }
    }
};
</script>
<style lang="less" scoped>
.g-window .m-tab .m-tab-right {
    width: 5rem;
    right: -1rem;
}
.m-tab-right {
    display: flex;
    justify-content: flex-end;

    .icon-history,
    .icon-team {
        display: inline-block;
        margin-right: 0.8rem;
        width: 1.7rem;
        height: 1.7rem;
        background: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);
        background-size: 20rem;
        background-position: -5.8rem -11.3rem;
    }
    .icon-team {
        background-position: -7.9rem -11.3rem;
    }
}
.invalidHint {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-color: bisque;
    color: burlywood;
}
</style>
<style>
.g-window .vux-header .m-tab-top {
    width: 80%;
    margin: 0 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>