<template>
  <div class="g-inherit m-article">
    <x-header class="m-tab" :left-options="{backText: ' '}">
      <button-tab class="m-tab-top" v-model="sysType">
        <button-tab-item class="u-tab-top">系统消息</button-tab-item>
        <button-tab-item class="u-tab-top">自定义消息</button-tab-item>
      </button-tab>
      <a slot="left"></a>
      <a slot="right" @click.stop="clearMsgs">清空</a>
    </x-header>
    <div class="m-article-main">
      <group class="u-list" v-if="sysType===0">
        <cell
          v-for="msg in sysMsgs"
          class="u-list-item"
          :title="msg.showText"
          :value="msg.showTime"
          :key="msg.idServer">
          <img class="icon" slot="icon" width="24" :src="msg.avatar">
        </cell>
      </group>
      <group class="u-list" v-if="sysType===1">
        <cell
          v-for="(msg, index) in customSysMsgs"
          class="u-list-item"
          :title="msg.showText"
          :value="msg.showTime"
          :key="msg.idServer">
          <img class="icon" slot="icon" width="24" :src="msg.avatar">
        </cell>
      </group>
    </div>
  </div>
</template>

<script>

export default {
  // 进入该页面，文档被挂载
  mounted () {
    this.$store.dispatch('markSysMsgRead')
  },
  updated () {
    this.$store.dispatch('markSysMsgRead')
  },
  data () {
    return {
      sysType: 0 // 系统消息 0, 自定义消息 1,
    }
  },
  computed: {
    userInfos () {
      return this.$store.state.userInfos
    },
    sysMsgs () {
      let sysMsgs = this.$store.state.sysMsgs.map(msg => {
        switch (msg.type) {
          case 'addFriend':
            msg.showText = `${msg.friend.alias || msg.friend.account} 添加您为好友~`
            msg.avatar = this.userInfos[msg.from].avatar
            break
          case 'deleteFriend':
            msg.showText = `${msg.from} 将您从好友中删除`
            msg.avatar = this.userInfos[msg.from].avatar
            break
        }
        return msg
      })
      return sysMsgs
    },
    customSysMsgs () {
      let customSysMsgs = this.$store.state.customSysMsgs.filter(msg => {
        if (msg.scene === 'p2p') {
          let content = JSON.parse(msg.content)
          msg.showText = `${content.content}`
          msg.avatar = this.userInfos[msg.from].avatar
          return msg
        }
        return false
      })
      return customSysMsgs
    }
  },
  methods: {
    clearMsgs () {
      this.$store.dispatch('resetSysMsgs', {
        type: this.sysType
      })
    }
  }
}
</script>