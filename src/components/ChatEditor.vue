<template>
  <div class="m-chat-editor">
    <div class="m-chat-editor-main">
      <span class="u-editor-input">
        <textarea v-model="msgToSent"></textarea>
      </span>
      <span class="u-editor-icon"><i class="icon icon-emoji"></i></span>
      <span class="u-editor-icon">
        <input type="file">
        <i class="icon icon-file"></i>
      </span>
      <span class="u-editor-send" @click="sendMsg">
        <input type="button" value="发送">
      </span>
    </div>
    lalala <input type="" name="">	
  </div>
</template>

<script>

export default {
  data () {
    return {
      msgToSent: ''
    }
  },
  methods: {
    sendMsg () {
      alert(this.msgToSent)
      this.msgToSent = ''
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
    .u-editor-input + .u-editor-icon, .u-editor-icon + .u-editor-icon, .u-editor-icon + .u-editor-send {
      margin-left: 2%;
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
    .u-editor-icon {
      position: relative;
      width: 1.6rem;
      height: 1.6rem;
      input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        opacity: 0;
      }
    }
    .icon {
      display: inline-block;
      width: inherit;
      height: inherit;
      background-size: 20rem;
      background-image: url(/res/im/icons.png);
    }
    .icon-emoji {
      background-position: 0 -11.8rem;
    }
    .icon-file {
      background-position: 0 -4.8rem;
    }
    .u-editor-send {
      input {
        width: 3rem;
        line-height: 1.8rem;
        height: 1.8rem;
        padding: 0 0.4rem;
        color: #fff;
        border: 1px solid #c1e5ff;
        border-radius: 0.4rem;
        background-color: #0091e4;
      }
    }
  }
</style>
