<template>
    <div class="tead-history">
        <Row>
            <Col>
                <h1>{{sessionName}}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button type="primary" @click="reback">返回</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <chatList
                    type="session"
                    :msglist="msglist"
                    :userInfos="userInfos"
                    :myInfo="myInfo"
                    @msgs-loaded="msgsLoaded"
                ></chatList>
            </Col>
        </Row>
        <Row>
            <Col>
                <chatEditor :scene="scene" :to="to"></chatEditor>
            </Col>
        </Row>
    </div>
</template>

<script>
import chatList from "@/components/chatList";
import util from '@/utils'
import pageUtil from '@/utils/page'
export default {
    data() {
        return {
            currPagePos: 0
        };
    },
    components: {
        chatList
    },
    computed: {
        sessionId() {
            return 'team-'+this.$route.query.sessionId;
        },
        sessionName() {
            return "历史记录";
        },
        myInfo() {
            return this.$store.state.myInfo;
        },
        userInfos() {
            return this.$store.state.userInfos;
        },
        msglist() {
            let msgs = this.$store.state.currSessionMsgs;
            console.log('history msglist:::',msgs);
            let msglist = [];
            for(let i=0;i<msgs.length;i++){
                let item = Object.assign({},msgs[i]);
                if(item.type != 'timeTag'){
                    item.avatar = this.myInfo.avatar
                    if (item.flow === "in") {
                        if (item.from !== this.$store.state.userUID) {
                            item.avatar =
                                (this.userInfos[item.from] &&
                                    this.userInfos[item.from].avatar) ||
                                config.defaultUserIcon;
                            item.nick =
                                (this.userInfos[item.from] &&
                                    this.userInfos[item.from].nick) ||
                                '匿名';
                            item.link = `/index/namecard/${item.from}`;
                            //todo  如果是未加好友的人发了消息，是否能看到名片
                        } else {
                            item.avatar = this.myInfo.avatar;
                            item.nick = this.myInfo.nick;
                        }
                    } else if (item.flow === "out") {
                        item.avatar = this.myInfo.avatar;
                        item.nick = this.myInfo.nick;
                    }
                    msglist.push(item);
                }
            };
            return msglist;
        },
        scene() {
            return util.parseSession(this.sessionId).scene;
        },
        to() {
            return util.parseSession(this.sessionId).to;
        },
        canLoadMore() {
            return !this.$store.state.noMoreHistoryMsgs;
        }
    },
    methods: {
        getHistoryMsgs() {
            console.log('获取历史消息');
            if (this.canLoadMore) {
                console.log('执行获取历史消息');
                this.$store.dispatch("getHistoryMsgs", {
                    scene: this.scene,
                    to: this.to
                });
            }
        },
        loadMore() {
            if (pageUtil.getChatListScroll() <= 5) {
                this.getHistoryMsgs();
            }
        },
        onClickBack: function() {
            // location.href = `#/chat/${this.sessionId}`
            window.history.go(-1);
        },
        reback() {
            window.history.go(-1);
        }
    },
    beforeMount() {
        // 如果是刷新页面，重定向至聊天页面
        if (this.$store.state.isRefresh) {
            this.functionJS.queryNavgationTo(this,'/index/teamChat',{sessionId:this.$route.query.sessionId});
        }
    },
    mounted() {
        console.log('mounted 获取历史消息');
        this.$store.dispatch("resetNoMoreHistoryMsgs");
        this.getHistoryMsgs();
    },
    updated() {
        let tempPagePos = pageUtil.getChatListHeight();
        pageUtil.scrollChatListDown(tempPagePos - this.currPagePos);
        this.currPagePos = tempPagePos;
    }
};
</script>

<style scoped>
</style>