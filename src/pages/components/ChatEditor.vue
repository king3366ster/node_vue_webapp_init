<template>
  <div class="m-chat-editor">
    <chat-emoji
      v-bind:type="type"
      v-bind:scene="scene"
      v-bind:to="to"
      v-show="isEmojiShown"
      v-on:add-emoji="addEmoji"
      v-on:hide-emoji="hideEmoji"
    ></chat-emoji>
    <div class="m-chat-editor-main">
      <span class="u-editor-input">
        <textarea v-model="msgToSent"></textarea>
      </span>
      <span class="u-editor-icons">
        <span class="u-editor-icon" @click.stop="showEmoji">
          <i class="u-icon icon-emoji"></i>
        </span>
        <span class="u-editor-icon" @change="sendFileMsg">
          <input type="file" ref="fileToSent">
          <i class="u-icon icon-image"></i>
        </span>
        <span class="u-editor-icon" @click.stop="sendPlayMsg">
          <i class="u-icon-2 icon-play"></i>
        </span>
      </span>
      <br/>
      <span class="u-editor-send" @click="sendTextMsg">发<br/>送</span>
    </div>
  </div>
</template>

<script>
import ChatEmoji from './ChatEmoji'
import util from '../../utils'

export default {
  components: {
    ChatEmoji
  },
  updated () {
    window.document.body.addEventListener('click', () => {
      this.isEmojiShown = false
    })
  },
  props: {
    type: String,
    scene: String,
    to: String
  },
  data () {
    return {
      isEmojiShown: false,
      msgToSent: ''
    }
  },
  methods: {
    sendTextMsg () {
      if (/^\s*$/.test(this.msgToSent)) {
        alert('请不要刷屏')
        return
      } else if (this.msgToSent.length > 800) {
        alert('请不要超过800个字')
        return
      }
      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'text',
          scene: this.scene,
          to: this.to,
          text: this.msgToSent
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'text',
          text: this.msgToSent
        })
      }
      this.msgToSent = ''
    },
    sendPlayMsg () {
      // 发送猜拳消息
      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'custom',
          scene: this.scene,
          to: this.to,
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random()*3)
            }
          }
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'custom',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random()*3)
            }
          }
        })
      }
    },
    sendFileMsg () {
      let ipt = this.$refs.fileToSent
      if (ipt.value) {
        if (this.type === 'session') {
          this.$store.dispatch('sendFileMsg', {
            scene: this.scene,
            to: this.to,
            fileInput: ipt
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomFileMsg', {
            fileInput: ipt
          })
        }
      }
    },
    showEmoji () {
      this.isEmojiShown = true
    },
    hideEmoji () {
      this.isEmojiShown = false
    },
    addEmoji (emojiName) {
      this.msgToSent += emojiName
      this.hideEmoji()
    }
  }
}
</script>

<style type="text/css">
  .m-chat-editor-main {
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 0.4rem;
    height: 100%;
    width: 100%;
    text-align: center;
    .u-editor-input, .u-editor-icon, .u-editor-send {
      position: relative;
      display: inline-block;
      vertical-align: bottom;
      width: 8%;
    }
    .u-editor-input {
      width: 64%;
      textarea {
        display: flex;
        box-sizing: border-box;
        padding: 0.2rem;
        font-size: 1rem;
        width: 100%;
        height: auto;
        min-height: 3.2rem;
        text-align: left;
        border: 1px solid #ccc;
        border-radius: 0.4rem;
      }
    }
    .u-editor-icons {
      position: relative;
      width: 24%;
      margin-left: 2%;
      text-align: left;
    }
    .u-editor-icon {
      position: relative;
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 2%;
      input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        opacity: 0;
      }
    }
    .u-editor-send {
      width: 8%;
      height: 3rem;
      line-height: 1.5rem;
      color: #fff;
      padding: 0.2rem;
      border-radius: 0.2rem;
      background-color: #0091e4;
      text-align: center;
    }
  }
</style>
