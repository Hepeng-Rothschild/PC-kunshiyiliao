<template>
    <div :id="imgWrap" class="set-permission">
        <Card>
            <Button type="primary" @click="$router.push({path:'/index/video'})">返回</Button>
        </Card>
        <Card v-for="(item,index) of imgList" :key="index">
            <img :src="item" title="点击看大图">
        </Card>
        <Card>
            <Button type="primary" @click="$router.push({path:'/index/video'})">返回</Button>
        </Card>
    </div>
</template>

<script>
import './../../plugins/preview';
export default {
    data(){
        return {
            imgWrap:"imgBox",
            imgList:[]
        }
    },
    created(){
        for(let i=1;i<=5;i++){
            let img = require('./../../assets/permissionImg/'+i+'.png');
            this.imgList.push(img);
        }
    },
    mounted(){
        new Preview({
            imgWrap:this.imgWrap
        })
        
    }
}
</script>
<style lang="less">
@import url("./../../assets/css/priviewImg.css");
</style>
<style lang="less" scoped>
.set-permission{
    img{
        max-width: 85%;
        cursor:pointer;
    }
}
</style>