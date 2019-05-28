<template>
    <div class="chateditor">
        <Row>
            <Col :xs="24">
                <Input v-model="contents" type="textarea" placeholder="请输入..."/>
            </Col>
        </Row>
        <Row>
            <Col :xs="24">
                <Button type="primary" @click="sendTextMsg">发送</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            contents: "",
            type: "session"
        };
    },
    props: {
        scene: String,
        to: String
    },
    methods: {
        sendTextMsg() {
            if (/^\s*$/.test(this.contents.trim())) {
                this.contents = "";
                this.$Message.warning({
                    content: "请不要发送空消息"
                });
                return;
            } else if (this.contents.length > 800) {
                this.$Message.warning({
                    content: "请不要超过800个字"
                });
                return;
            }
            this.contents = this.contents.trim();
            this.$store.dispatch("sendMsg", {
                type: "text",
                scene: this.scene,
                to: this.to,
                text: this.contents
            });
            this.contents = "";
        }
    }
};
</script>
<style lang="less" scoped>
.chateditor {
    display: inline-block;
    width: 90%;
}
</style>