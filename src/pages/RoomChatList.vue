<template>
  <div class="m-chat-main">
    <chat-list
      type="chatroom"
      :chatroomId="chatroomId"
      :msglist="msglist"
      @msgs-loaded="msgsLoaded"
    ></chat-list>
    <chat-editor
      type="chatroom"
      :chatroomId="chatroomId"
    ></chat-editor>
  </div>
</template>

<script>

import ChatEditor from './components/ChatEditor'
import ChatList from './components/ChatList'
import util from '../utils'
import pageUtil from '../utils/page'

export default {
  components: {
    ChatEditor,
    ChatList
  },
  // 进入该页面，文档被挂载
  mounted () {
    // 此时设置当前会话
    pageUtil.scrollChatListDown()
  },
  updated () {
    pageUtil.scrollChatListDown()
  },
  data () {
    return {
    }
  },
  computed: {
    chatroomId () {
      let chatroomId = this.$route.params.chatroomId
      return chatroomId
    },
    msglist () {
      let msgs = this.$store.state.currChatroomMsgs
      return msgs
    },
    msgsLoaded () {
      pageUtil.scrollChatListDown()
    }
  },
}
</script>
