<template>
  <div>
    <template v-if="historyMsgList.length>0">
      <wx-chat-history-item
        v-for="(hmsg,index) in historyMsgList"
        :hContent="hmsg.body"
        :hDirection="hmsg.chatDirection"
        :hCTime="hmsg.createTime"
        :hDoctorId="hmsg.doctorId"
        :key="hmsg.index"
        :i="index"
        @showOpinions="showOpinion"
      ></wx-chat-history-item>
    </template>
  </div>
</template>
<script type="text/javascript">
  // import wxChatItem from './wxChatItem'
  import wxChatHistoryItem from './wxChatHistoryItem'

  export default {
    components: {
      // wxChatItem,
      wxChatHistoryItem
    },
    props: {
      historyMsgList:{
        type:Array,
        default (){
          return  {}
        }
      },
    },
    data () {
      return {}
    },
    methods: {
      showOpinion(obj){
        this.$emit('showOpinionEvent',obj);
      },
    }
  }
</script>