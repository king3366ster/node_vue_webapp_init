<template>
  <ul id="chat-list" class="m-chat-list p-chat-list">
    <li class="u-msg item-time" v-if="canLoadMore">
      ---- 上拉加载更多 ----
    </li>
    <li class="u-msg item-time" v-else>
      ---- 已无更多记录 ----
    </li>
    <chat-item
      v-for="msg in msglist"
      :type="type"
      :rawMsg="msg"
      :userInfos="userInfos"
      :myInfo="myInfo"
      :key="msg.idClient"
      @msg-loaded="msgLoaded"
    ></chat-item>
  </ul>
</template>
<script type="text/javascript">
  import util from '../../utils'
  import config from '../../configs'
  import emojiObj from '../../configs/emoji'
  import ChatItem from './ChatItem'

  export default {
    components: {
      ChatItem
    },
    props: {
      type: String, // 类型，chatroom, session
      canLoadMore: [String, Boolean],
      msglist: {
        type: Array,
        default () {
          return []
        }
      },
      userInfos: {
        type: Object,
        default () {
          return {}
        }
      },
      myInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        isFullImgShow: false,
        msgLoadedTimer: null
      }
    },
    methods: {
      recallMsg (vNode) {
        if (this.$store.state.currSessionId) {
          if (vNode && vNode.data && vNode.data.attrs) {
            let attrs = vNode.data.attrs
            if (attrs.flow === 'out') {
              if (confirm('确定需要撤回消息')) {
                alert('消息撤回Demo尚待开发,idClient:' + attrs.idClient)
              }
            }
          }
        }
      },
      showFullImg (src) {
        this.$store.dispatch('showFullscreenImg', {
          src
        })
      },
      msgLoaded () {
        clearTimeout(this.msgLoadedTimer)
        this.msgLoadedTimer = setTimeout(() => {
          this.$emit('msgs-loaded')
          this.msgLoadedTimer = null
        }, 20)
      }
    }
  }
</script>

<style type="text/css">
  .p-chat-list {
    .u-icon {
      width: 1.4rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      vertical-align: bottom;
    }
  }
</style>