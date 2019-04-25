<template>
    <div class="video-list">
        <Row>
            <Col :xs="24">
                <Card title="选择直播间" padding="10px" shadow>
                    <CellGroup>
                        <Cell v-for="(item,index) of liveList" :key="index">
                            {{item.name}}
                            <router-link :to="{name:'nePublish',params:{url:item.url}}">GO</router-link>
                        </Cell>
                    </CellGroup>
                </Card>
            </Col>
            <Col :xs="24">
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            liveList:[
                {id:1,name:'live1',url:'rtmp://p0b5f21d0.live.126.net/live/e74f955781fd4f3b974572f422eee780?wsSecret=9ceb1229eeb7e00f8b49266baa91a7b2&wsTime=1556009784'}
            ]
        };
    },
    mounted() {
    },
    methods: {
        publish(){
            
        }
    }
};
</script>

<style lang="less" scoped>
.video-list {
}
</style>