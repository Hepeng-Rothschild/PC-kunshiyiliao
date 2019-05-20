<template>
    <li
        class="u-msg"
        :class="{
      'item-me': msg.flow==='out',
      'item-you': msg.flow==='in',
      'item-time': msg.type==='timeTag',
      'item-tip': msg.type==='tip',
      'session-chat': type==='session'
    }"
    >
        <div v-if="msg.type==='timeTag'">---- {{msg.showText}} ----</div>
        <div v-else-if="msg.type==='tip'" class="tip">{{msg.showText}}</div>
        <div
            v-else-if="msg.flow==='in' || msg.flow==='out'"
            :idClient="msg.idClient"
            :time="msg.time"
            :flow="msg.flow"
            :type="msg.type"
            v-touch:hold="revocateMsg"
        >
            <a class="msg-head" v-if="msg.avatar" :href="msg.link">
                <img class="icon u-circle" :src="msg.avatar">
            </a>
            <p class="msg-user" v-else-if="msg.type!=='notification'">
                <em>{{msg.showTime}}</em>
                {{msg.from}}
            </p>

            <span v-if="msg.type==='text'" class="msg-text" v-html="msg.showText"></span>
            <span v-else-if="msg.type==='custom-type1'" class="msg-text" ref="mediaMsg"></span>
            <span v-else-if="msg.type==='custom-type3'" class="msg-text" ref="mediaMsg"></span>
            <span
                v-else-if="msg.type==='image'"
                class="msg-text"
                ref="mediaMsg"
                @click.stop="showFullImg(msg.originLink)"
            ></span>
            <span v-else-if="msg.type==='video'" class="msg-text" ref="mediaMsg"></span>
            <span
                v-else-if="msg.type==='audio'"
                class="msg-text msg-audio"
                :class="{'unreadAudio': msg.unreadAudio}"
                :style="'width: ' + msg.width"
                @click="playAudio(msg, $event)"
                v-html="msg.showText"
            ></span>
            <span v-else-if="msg.type==='file'" class="msg-text">
                <a :href="msg.fileLink" target="_blank">
                    <i class="u-icon icon-file"></i>
                    {{msg.showText}}
                </a>
            </span>
            <span v-else class="msg-text" v-html="msg.showText"></span>
            <span v-if="msg.status==='fail'" class="msg-failed">
                <i class="weui-icon-warn"></i>
            </span>
        </div>
    </li>
</template>

<script type="text/javascript">
import util from "@/utils";
import config from "@/configs";
import emojiObj from "@/configs/emoji";
var audio = {
    // 正在播放音频的 audio、target
    $node: null,
    $audio: null,
    timeout: "",
    imgPlay0:
        "https://yx-web-nosdn.netease.im/quickhtml%2Fassets%2Fyunxin%2Fdefault%2Fplay0.gif",
    imgPlay1:
        "https://yx-web-nosdn.netease.im/quickhtml%2Fassets%2Fyunxin%2Fdefault%2Fplay1.gif"
};
export default {
    props: {
        type: String, // 类型，chatroom, session
        rawMsg: {
            type: Object,
            default() {
                return {};
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
        },
        isHistory: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    data() {
        return {
            msg: "",
            isFullImgShow: false
        };
    },
    watch: {
        rawMsg(newVal, oldVal) {
            let newCustom = newVal && newVal.localCustom;
            if (!newCustom || !newVal || newVal.type !== "audio") {
                return;
            }
            let oldCustom = oldVal && oldVal.localCustom;
            if (newCustom !== oldCustom) {
                this.computedItem();
            }
        }
    },
    beforeMount() {
        this.computedItem();
    },
    mounted() {
        let item = this.msg;
        window.stopPlayAudio = this.stopPlayAudio.bind(this);
        // 有时序问题的操作
        this.$nextTick(() => {
            let media = null;
            if (item.type === "image") {
                // 图片消息缩略图
                media = new Image();
                media.src =
                    item.file.url + "?imageView&thumbnail=180x0&quality=85";
            } else if (item.type === "custom-type1") {
                // 猜拳消息
                media = new Image();
                media.className = "emoji-middle";
                media.src = item.imgUrl;
            } else if (item.type === "custom-type3") {
                // 贴图表情
                media = new Image();
                media.className = "emoji-big";
                media.src = item.imgUrl;
            } else if (item.type === "video") {
                if (/(mov|mp4|ogg|webm)/i.test(item.file.ext)) {
                    media = document.createElement("video");
                    media.src = item.file.url;
                    media.width = 640;
                    media.height = 480;
                    media.autoStart = false;
                    media.preload = "metadata";
                    media.controls = "controls";
                } else {
                    let aLink = document.createElement("a");
                    aLink.href = item.file.url;
                    aLink.target = "_blank";
                    aLink.innerHTML = `<i class="u-icon icon-file"></i>${
                        video.name
                    }`;
                    this.$refs.mediaMsg.appendChild(aLink);
                }
            }
            if (media) {
                if (this.$refs.mediaMsg) {
                    this.$refs.mediaMsg.appendChild(media);
                }
                media.onload = () => {
                    this.$emit("msg-loaded");
                };
                media.onerror = () => {
                    this.$emit("msg-loaded");
                };
            } else {
                this.$emit("msg-loaded");
            }
        }); // end this.nextTick
    },
    methods: {
        computedItem() {
            let item = Object.assign({}, this.rawMsg);
            // 标记用户，区分聊天室、普通消息
            if (this.type === "session") {
                if (item.flow === "in") {
                    if (item.from !== this.$store.state.userUID) {
                        item.avatar =
                            (this.userInfos[item.from] &&
                                this.userInfos[item.from].avatar) ||
                            config.defaultUserIcon;
                        item.link = `#/namecard/${item.from}`;
                        //todo  如果是未加好友的人发了消息，是否能看到名片
                    } else {
                        item.avatar = this.myInfo.avatar;
                    }
                } else if (item.flow === "out") {
                    item.avatar = this.myInfo.avatar;
                }
            }
            if (item.type === "timeTag") {
                // 标记发送的时间
                item.showText = item.text;
            } else if (item.type === "text") {
                // 文本消息
                item.showText = util.escape(item.text);
                if (/\[[^\]]+\]/.test(item.showText)) {
                    let emojiItems = item.showText.match(/\[[^\]]+\]/g);
                    emojiItems.forEach(text => {
                        let emojiCnt = emojiObj.emojiList.emoji;
                        if (emojiCnt[text]) {
                            item.showText = item.showText.replace(
                                text,
                                `<img class="emoji-small" src="${
                                    emojiCnt[text].img
                                }">`
                            );
                        }
                    });
                }
            } else if (item.type === "custom") {
                let content = JSON.parse(item.content);
                // type 1 为猜拳消息
                if (content.type === 1) {
                    let data = content.data;
                    let resourceUrl = config.resourceUrl;
                    // item.showText = `<img class="emoji-middle" src="${resourceUrl}/im/play-${data.value}.png">`
                    item.type = "custom-type1";
                    item.imgUrl = `${resourceUrl}/im/play-${data.value}.png`;
                    // type 3 为贴图表情
                } else if (content.type === 3) {
                    let data = content.data;
                    let emojiCnt = "";
                    if (emojiObj.pinupList[data.catalog]) {
                        emojiCnt =
                            emojiObj.pinupList[data.catalog][data.chartlet];
                        // item.showText = `<img class="emoji-big" src="${emojiCnt.img}">`
                        item.type = "custom-type3";
                        item.imgUrl = `${emojiCnt.img}`;
                    }
                } else {
                    item.showText = util.parseCustomMsg(item);
                    if (item.showText !== "[自定义消息]") {
                        item.showText += ",请到手机或电脑客户端查看";
                    }
                }
            } else if (item.type === "image") {
                // 原始图片全屏显示
                item.originLink = item.file.url;
            } else if (item.type === "video") {
                // ...
            } else if (item.type === "audio") {
                item.width =
                    (5.3 + Math.round(item.file.dur / 1000) * 0.03).toFixed(2) +
                    "rem";
                item.audioSrc = item.file.mp3Url;
                item.showText =
                    "<i>" + Math.round(item.file.dur / 1000) + '"</i> 点击播放';
                if (!this.isHistory && nim.useDb) {
                    item.unreadAudio = !item.localCustom;
                }
            } else if (item.type === "file") {
                item.fileLink = item.file.url;
                item.showText = item.file.name;
            } else {
                item.showText = `[${util.mapMsgType(
                    item
                )}],请到手机或电脑客户端查看`;
            }
            this.msg = item;
        },
        revocateMsg(vNode) {
            // 在会话聊天页
            if (this.$store.state.currSessionId) {
                if (vNode && vNode.data && vNode.data.attrs) {
                    let attrs = vNode.data.attrs;
                    if (attrs.type === "robot") {
                        return;
                    }
                    // 自己发的消息
                    if (attrs.flow === "out") {
                        let that = this;
                        this.$vux.confirm.show({
                            title: "确定需要撤回消息",
                            onCancel() {},
                            onConfirm() {
                                that.$store.dispatch("revocateMsg", {
                                    idClient: attrs.idClient
                                });
                            }
                        });
                    }
                }
            }
        },
        showFullImg(src) {
            this.$store.dispatch("showFullscreenImg", {
                src
            });
        },
        autoPlayNextUnreadAudio() {
            var parentNode = audio.$node && audio.$node.parentElement;
            if (!parentNode) {
                return;
            }
            var currentMsgNode = parentNode.parentElement;
            var nextMsgNode = currentMsgNode.nextElementSibling;
            var nextAudioNode;
            while (nextMsgNode) {
                if (~nextMsgNode.className.indexOf("item-you")) {
                    nextAudioNode = nextMsgNode.querySelector(".msg-audio");
                    if (nextAudioNode) {
                        break;
                    }
                }
                nextMsgNode = nextMsgNode.nextElementSibling;
            }
            if (
                nextMsgNode &&
                ~nextAudioNode.className.indexOf("unreadAudio")
            ) {
                nextAudioNode.click();
            }
        },
        playAudio(msg, event) {
            var $target;
            if (!~event.target.className.indexOf("msg-audio")) {
                $target = event.target.parentElement;
            } else {
                $target = event.target;
            }
            if (audio.$audio) {
                var targetChild1 = $target.childNodes[2];
                var sameNode = targetChild1 && targetChild1.tagName === "IMG";
                this.stopPlayAudio();
                if (sameNode) {
                    return;
                }
            }
            var duration = msg.file.dur;
            if (!duration) {
                return;
            }
            audio.$audio = document.createElement("audio");
            var $source = document.createElement("source");
            var audioType = msg.file.ext;
            $source.src = msg.file.url;
            $source.type =
                "audio/" + (audioType === "mp3" ? "mpeg" : audioType);
            audio.$audio.appendChild($source);
            audio.$audio.play();
            audio.$node = $target;
            $target.innerHTML = $target.innerHTML.replace(
                "点击播放",
                '<img src="' +
                    (msg.flow === "in" ? audio.imgPlay1 : audio.imgPlay0) +
                    '">'
            );
            audio.timeout = setTimeout(() => {
                audio.$audio = null;
                this.canclePlayAudio();
            }, duration);
            if (~audio.$node.className.indexOf("unreadAudio")) {
                msg.localCustom = '{"audio": "played"}';
                this.$store.dispatch("updateLocalMsg", msg);
                audio.$node.className = audio.$node.className.replace(
                    "unreadAudio",
                    ""
                );
                audio.$audio.onended = this.autoPlayNextUnreadAudio.bind(this);
            }
        },
        canclePlayAudio() {
            if (audio.$node.childNodes[2]) {
                audio.$node.removeChild(audio.$node.childNodes[2]);
            }
            audio.$node.innerHTML += "点击播放";
        },
        stopPlayAudio() {
            if (audio.$audio) {
                audio.$audio.pause();
                this.canclePlayAudio();
                clearTimeout(audio.timeout);
                audio.$audio = null;
                audio.$node = null;
                audio.timeout = "";
            }
        },
        toMsgUnReadDetail() {
            this.href = "#/msgReceiptDetail/" + this.msg.idServer;
        }
    }
};
</script>

<style lang="less" scoped>
.p-chat-history {
    .u-msg {
        .msg-link {
            display: none;
        }
    }
}
.p-room-chat-list {
    .u-msg {
        .msg-text {
            max-width: 80%;
        }
        .msg-link {
            bottom: 0;
            right: -4rem;
            font-size: 0.9rem;
        }
    }
}

.msg-unread {
    position: relative;
    float: right;
    top: 0.3rem;
    right: 0.5rem;
    font-size: 0.9rem;
    color: #0091e4;
}
</style>
