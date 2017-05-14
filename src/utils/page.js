import config from '../configs'

const pageMap = {
  'login': config.loginUrl,
  'regist': config.registUrl,
}

var scrollTimer = null

var page = {
  turnPage: function (message, url) {
    if (message) {
      alert(message)
    }
    if (url) {
      if (pageMap[url]) {
        url = pageMap[url]
      }
      window.location.href = url
    }
  },
  scrollChatListDown: function (pos) {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      // 滚到页面最底端
      let dom = document.getElementById('chat-list')
      if (typeof pos === 'number') {
        dom.scrollTop = pos
      } else {
        dom.scrollTop = Math.max(9999, dom.scrollHeight)
      }
    }, 0)
  },
  getChatListHeight: function () {
    return document.getElementById('chat-list').scrollHeight
  },
  getChatListScroll: function () {
    return document.getElementById('chat-list').scrollTop
  },
}

export default page