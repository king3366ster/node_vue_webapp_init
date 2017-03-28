<template>
  <div class="g-inherit m-main">
    <group class="u-list">
      <cell class="u-list-item" title="消息中心" @click.native="enterSysMsgs">
        <span slot="icon">icon</span>
        <span>2017-11-11</span>
      </cell>
      <cell
        class="u-list-item"
        title="讨论组"
        inline-desc="123456:哈哈哈"
        v-for="(session, index) in sessionList"
        :key="session"
        :sessionId="index"
        v-touch:swipeleft="showDelBtn"
        v-touch:swiperight="hideDelBtn"
        @click.native="enterChat(index)" >
        <span slot="icon">icon</span>
        <span>
          2017-11-11
        </span>
        <span
          class="u-tag-del"
          :class="{active: sessionDel===index}"
          @click="deleteChat"
          ></span>
      </cell>
    </group>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      sessionDel: -1,
      sessionList: [1,2,3,4,5,6,7,8,9,0]
    }
  },
  methods: {
    enterSysMsgs () {
      if (this.hideDelBtn()) return
      location.href = '#/sysmsgs'
    },
    enterChat (sessionId) {
      if (this.hideDelBtn()) return
      location.href = `#/chat/${sessionId}`
    },
    deleteChat () {
      alert(`del sessionId ${this.sessionDel}`)
    },
    showDelBtn (data) {
      if (data && data.sessionId >= 0) {
        this.sessionDel = data.sessionId
      }
    },
    hideDelBtn () {
      if (this.sessionDel >= 0) {
        this.sessionDel = -1 
        // 用于判断是否前置状态是显示删除按钮
        return true
      }
      return false
    }
  }
}
</script>