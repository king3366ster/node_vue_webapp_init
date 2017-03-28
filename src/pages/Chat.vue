<template>
  <div class="g-inherit m-article">
    <x-header class="m-tab" :left-options="{backText: ' '}">
      <h1 class="m-tab-top">聊天记录-{{$route.params.sessionId}}</h1>
      <a slot="left"></a>
      <group class="m-tab-right" slot="right">
        <datetime v-model="selectedDate" format="YYYY-MM-DD HH:mm" @on-change="selectDate" title="">date</datetime>
      </group>
    </x-header>
    <div id="chat-list" class="m-chat-main">
      <ul class="m-chat-list">
        <li class="u-msg item-time">---- 昨天 21:20 ----</li>
        <li class="u-msg item-you">
          <a class="msg-head" href="#/namecard/2"><img src="/res/im/default-icon.png"></a>
          <span class="msg-text">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-you">
          <a class="msg-head" href="#/namecard/2"><img class="msg-head" src="/res/im/default-icon.png"></a>
          <span class="msg-text">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-you">
          <a class="msg-head" href="#/namecard/2"><img class="msg-head" src="/res/im/default-icon.png"></a>
          <span class="msg-text">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-time">---- 21:20 ----</li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
        <li class="u-msg item-me">
          <img class="msg-head" src="/res/im/default-icon.png">
          <span class="msg-text" v-touch:hold="recallMsg">啦啦啦爱啦啦啦</span>
        </li>
      </ul>
    </div>
    <chat-editor></chat-editor>
  </div>
</template>

<script>
import ChatEditor from '../components/ChatEditor'

export default {
  components: {
    ChatEditor
  },
  // 文档被挂载
  mounted () {
    this.$nextTick(() => {
      // 滚到页面最底端
      let dom = document.getElementById('chat-list')
      dom.scrollTop = dom.scrollHeight
    })
  },
  computed: {
    sessionId () {
      return this.$route.params.sessionId
    }
  },
  data () {
    return {
      selectedDate: ''
    }
  },
  methods: {
    selectDate (event) {
      this.selectedDate = event
    },
    recallMsg () {
      alert('撤回消息')
    }
  }
}
</script>