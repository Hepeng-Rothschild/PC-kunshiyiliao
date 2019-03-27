<template>
    <ul id="chat-list" class="chatlist">
        <li
            v-for="(msg,index) of msglist"
            :class="{
                'for-me':msg.flow == 'in',
                'for-you':msg.flow == 'out',
                'for-time':msg.type == 'timeTag'
            }"
        >
            <div v-if="msg.type==='timeTag'">---- {{msg.text}} ----</div>
            <div
                v-else-if="msg.flow==='in' || msg.flow==='out'"
            >
                <a v-if="msg.avatar">
                    <img :src="msg.avatar">
                    <span>{{msg.nick}}</span>
                </a>
                <span v-if="msg.type==='text'" class="msg-text" v-html="msg.text"></span>
                <span v-if="msg.status==='fail'" class="msg-failed">
                    失败
                </span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: {
        type: String, // 类型，chatroom, session
        msglist: {
            type: Array,
            default() {
                return [];
            }
        },
        userInfos: {
            type: Object,
            default() {
                return {};
            }
        },
        myInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        msgLoaded() {
            clearTimeout(this.msgLoadedTimer);
            this.msgLoadedTimer = setTimeout(() => {
                this.$emit("msgs-loaded");
            }, 20);
        }
    }
};
</script>

<style lang="less" scoped>
.chatlist {
    li{
        display:inline-block;
    }
    .for-me {
        display: flex;
        justify-content: flex-start;
        text-align:left;
        div{
            width:70%;
        }
    }
    .for-you {
        display: flex;
        justify-content: flex-end;
        text-align:right;
        div{
            width:70%;
        }
    }
    .for-time{
        display:flex;
        text-align:center;
        div{
            width:100%;
        }
    }
}
</style>