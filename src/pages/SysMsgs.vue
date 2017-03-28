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
      <group class="u-list">
        <cell
          class="u-list-item"
          title="讨论组"
          inline-desc="123456:哈哈哈"
          v-for="(msg, index) in msgList"
          :key="msg"
          :idClient="index"
          v-touch:swiperight="hideDelBtn"
          v-touch:swipeleft="showDelBtn">
          <span slot="icon">icon</span>
          <span>
            同意 拒绝
          </span>
          <span
            class="u-tag-del"
            :class="{active: idClientDel===index}"
            @click="deleteMsg"
            ></span>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      sysType: 0, // 系统消息 0, 自定义消息 1,
      msgList: [1,2,3,2,3,2,3,2,3,2,3,2,3],
      idClientDel: -1
    }
  },
  methods: {
    clearMsgs () {
      alert(this.sysType)
    },
    deleteMsg () {
      alert(`del idClient ${this.idClientDel}`)
    },
    showDelBtn (data) {
      if (data && data.idClient >= 0) {
        this.idClientDel = data.idClient
      }
    },
    hideDelBtn () {
      if (this.idClientDel >= 0) {
        this.idClientDel = -1 
        // 用于判断是否前置状态是显示删除按钮
        return true
      }
      return false
    }
  }
}
</script>