<template>
  <li class="u-msg"
    :class="{
      'item-me': msg.flow==='out',
      'item-you': msg.flow==='in',
      'item-time': msg.type==='timeTag',
      'session-chat': type==='session'
    }">
    <div v-if="msg.type=='timeTag'">---- {{msg.showText}} ----</div>
    <div
      v-if="msg.flow==='in' || msg.flow==='out'"
      :idClient="msg.idClient"
      :time="msg.time"
      :flow="msg.flow"
      v-touch:hold="recallMsg"
    >
      <a class="msg-head" v-if="msg.avatar" :href="msg.link"><img :src="msg.avatar"></a>
      <p class="msg-user" v-else-if="msg.type!=='notification'"><em>{{msg.showTime}}</em>{{msg.from}}</p>

      <span v-if="msg.type==='text'" class="msg-text" v-html="msg.showText"></span>
      <span v-else-if="msg.type==='custom-type1'" class="msg-text" ref="imageMsg"></span>
      <span v-else-if="msg.type==='custom-type3'" class="msg-text" ref="imageMsg"></span>
      <span v-else-if="msg.type==='image'" class="msg-text" ref="imageMsg" @click.stop="showFullImg(msg.originLink)"></span>
      <span v-else-if="msg.type==='video'" class="msg-text" ref="videoMsg"></span>
      <span v-else-if="msg.type==='file'" class="msg-text"><a :href="msg.fileLink" target="_blank"><i class="u-icon icon-file"></i>{{msg.showText}}</a></span>
      <span class="msg-text notify" v-else-if="msg.type==='notification'">{{msg.showText}}</span>
      <span class="msg-text" v-else v-html="msg.showText"></span>
      <span v-if="msg.failed" class="msg-failed"><i class="weui-icon-warn"></i>发送失败</span>
    </div>
  </li>
</template>

<script type="text/javascript">
  import util from '../../utils'
  import config from '../../configs'
  import emojiObj from '../../configs/emoji'

  export default {
    props: {
      type: String, // 类型，chatroom, session
      rawMsg: {
        type: Object,
        default () {
          return {}
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
        msg: '',
        isFullImgShow: false
      }
    },
    mounted () {
      let item = this.rawMsg
      // 标记用户，区分聊天室、普通消息
      if (this.type === 'session') {
        if (item.flow === 'in') {
          item.avatar = this.userInfos[item.from].avatar
          item.link = `#/namecard/${item.from}`
        } else if (item.flow === 'out') {
          item.avatar = this.myInfo.avatar
        }
      }
      // 标记时间
      item.showTime = util.formatDate(item.time)
      if (item.type === 'timeTag') {
        // 标记发送的时间
        item.showText = item.text
      } else if (item.type === 'text') {
        // 文本消息
        item.showText = util.escape(item.text)
        if (/\[[^\]]+\]/.test(item.showText)) {
          let emojiItems = item.showText.match(/\[[^\]]+\]/g)
          emojiItems.forEach(text => {
            let emojiCnt = emojiObj.emojiList.emoji
            if (emojiCnt[text]) {
              item.showText = item.showText.replace(text, `<img class="emoji-small" src="${emojiCnt[text].img}">`)
            }
          })
        }
      } else if (item.type === 'custom') {
        let content = JSON.parse(item.content)
        // type 1 为猜拳消息
        if (content.type === 1) {
          let data = content.data
          let resourceUrl = config.resourceUrl
          // item.showText = `<img class="emoji-middle" src="${resourceUrl}/im/play-${data.value}.png">`
          item.type = 'custom-type1'
          item.imgUrl = `${resourceUrl}/im/play-${data.value}.png`
        } else if (content.type === 2) {
          item.showText = `[阅后即焚消息],请到手机或电脑客户端查看`
        // type 3 为贴图表情
        } else if (content.type === 3) {
          let data = content.data
          let emojiCnt = ''
          if (emojiObj.pinupList[data.catalog]) {
            emojiCnt = emojiObj.pinupList[data.catalog][data.chartlet]
            // item.showText = `<img class="emoji-big" src="${emojiCnt.img}">`
            item.type = 'custom-type3'
            item.imgUrl = `${emojiCnt.img}`
          }
        } else if (content.type === 4) {
          item.showText = `[白板消息],请到手机或电脑客户端查看`
        } else {
          item.showText = `[自定义消息]`
        }
      } else if (item.type === 'image') {
        // 原始图片全屏显示
        item.originLink = item.file.url
      } else if (item.type === 'video') {
        // ...
      } else if (item.type === 'file') {
        item.fileLink = item.file.url
        item.showText = item.file.name
      } else if (item.type === 'notification') {
        //对于系统通知，更新下用户信息的状态
        item.showText = util.generateChatroomSysMsg(item)
      } else {
        item.showText = `[${util.mapMsgType(item.type)}],请到手机或电脑客户端查看`
      }
      this.msg = item

      // 有时序问题的操作
      this.$nextTick(() => {
        let img = null
        let vdo = null
        if (item.type === 'image') {
          // 图片消息缩略图
          img = new Image()
          img.src = item.file.url + '?imageView&thumbnail=180x0&quality=85'
          this.$refs.imageMsg.appendChild(img)
        } else if (item.type === 'custom-type1') {
          // 猜拳消息
          img = new Image()
          img.className = 'emoji-middle'
          img.src = item.imgUrl
          this.$refs.imageMsg.appendChild(img)
        } else if (item.type === 'custom-type3') {
          // 贴图表情
          img = new Image()
          img.className = 'emoji-big'
          img.src = item.imgUrl
          this.$refs.imageMsg.appendChild(img)
        } else if (item.type === 'video') {
          if (/(mov|mp4|ogg|webm)/i.test(item.file.ext)) {
            vdo = document.createElement('video')
            vdo.src = item.file.url
            vdo.width = 640
            vdo.height = 480
            vdo.autoStart = false
            vdo.preload = 'metadata'
            vdo.controls = 'controls'
            this.$refs.videoMsg.appendChild(vdo)
          } else {
            let aLink = document.createElement('a')
            aLink.href = item.file.url
            aLink.target = '_blank'
            aLink.innerHTML = `<i class="u-icon icon-file"></i>${video.name}`
            this.$refs.videoMsg.appendChild(aLink)
          }
        }
        if (img || vdo) {
          let source = img || vdo
          source.onload = () => {
            this.$emit('msg-loaded')
          }
          source.onerror = () => {
            this.$emit('msg-loaded')
          }
        } else {
          this.$emit('msg-loaded')
        }
      }) // end this.nextTick
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
      }
    }
  }
</script>
