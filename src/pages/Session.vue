<template>
  <div class="g-inherit m-main p-session">
    <group class="u-list">
      <cell class="u-list-item" title="消息中心" @click.native="enterSysMsgs">
        <img class="icon" slot="icon" width="24" :src="noticeIcon">
        <span v-show="sysMsgUnread > 0" class="u-unread">{{sysMsgUnread}}</span>
      </cell>
      <cell
        v-for="(session, index) in sessionlist"
        class="u-list-item"
        :title="session.name"
        :inline-desc="session.lastMsgShow"
        :key="session.id"
        :sessionId="session.id"
        v-touch:swipeleft="showDelBtn"
        v-touch:swiperight="hideDelBtn"
        @click.native="enterChat(session)" >
        <img class="icon" slot="icon" width="24" :src="session.avatar">
        <span>
          {{session.updateTimeShow}}
        </span>
        <span v-show="session.unread > 0" class="u-unread">{{session.unread}}</span>
        <span
          class="u-tag-del"
          :class="{active: delSessionId===session.id}"
          @click="deleteSession"
          ></span>
      </cell>
    </group>
  </div>
</template>

<script>
import util from '../utils'
import config from '../configs'

export default {
  data () {
    return {
      delSessionId: null,
      noticeIcon: config.noticeIcon
    }
  },
  computed: {
    sysMsgUnread () {
      let temp = this.$store.state.sysMsgUnread
      return temp.friend || 0
    },
    userInfos () {
      return this.$store.state.userInfos
    },
    sessionlist () {
      let sessionlist = this.$store.state.sessionlist.map(item => {
        item.name = ''
        item.avatar = ''
        if (item.scene === 'p2p') {
          let userInfo = this.userInfos[item.to]
          if (userInfo) {
            item.name = userInfo.alias || userInfo.nick || userInfo.account
            item.avatar = userInfo.avatar
          }
        }
        let lastMsg = item.lastMsg || {}
        if (lastMsg.type === 'text') {
          item.lastMsgShow = lastMsg.text || ''
        } else if (lastMsg.type === 'custom') {
          item.lastMsgShow = '[自定义消息]'
          try {
            let cnt = JSON.parse(lastMsg.content)
            if (cnt.type === 3) {
              item.lastMsgShow = '[贴图表情]'
            }
          } catch (e) {
          }
        } else if (util.mapMsgType(lastMsg.type)) {
          item.lastMsgShow = `[${util.mapMsgType(lastMsg.type)}]`
        } else {
          item.lastMsgShow = ''
        }
        if (item.updateTime) {
          item.updateTimeShow = util.formatDate(item.updateTime, true)
        }
        return item
      })
      return this.$store.state.sessionlist
    }
  },
  methods: {
    enterSysMsgs () {
      if (this.hideDelBtn())
        return
      location.href = '#/sysmsgs'
    },
    enterChat (session) {
      if (this.hideDelBtn())
        return
      if (session && session.id)
        location.href = `#/chat/${session.id}`
    },
    deleteSession (event) {
      if (this.delSessionId !== null) {
        this.$store.dispatch('deleteSession', this.delSessionId)
      }
    },
    showDelBtn (session) {
      if (session) {
        this.delSessionId = session.sessionId
      }
    },
    hideDelBtn () {
      if (this.delSessionId !== null) {
        // 用于判断是否前置状态是显示删除按钮
        this.delSessionId = null
        return true
      }
      return false
    }
  }
}
</script>

<style type="text/css">
  .p-session {
    .vux-cell-primary {
      max-width: 76%;
    }
  }
</style>