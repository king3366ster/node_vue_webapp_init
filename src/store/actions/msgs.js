import store from '../'
import config from '../../configs'
import util from '../../utils'

export function onRoamingMsgs (obj) {
  store.commit('updateMsgs', obj.msgs)
}

export function onOfflineMsgs (obj) {
  store.commit('updateMsgs', obj.msgs)
}

export function onMsg (msg) {
  store.commit('putMsg', msg)
  if (msg.sessionId === store.state.currSessionId) {
    store.commit('updateCurrSessionMsgs', {
      type: 'put',
      msg
    })
    // 发送已读回执
    store.dispatch('sendMsgReceipt')
  }
}

function onFailedMsg (msg) {
  msg.failed = true
  onMsg(msg)
}

function onSendMsgDone (error, msg) {
  store.dispatch('hideLoading')
  if (error) {
    alert(error)
    onFailedMsg(msg)
    return
  }
  onMsg(msg)
}

export function sendMsg ({state, commit}, obj) {
  const nim = state.nim
  obj = obj || {}
  let type = obj.type || ''
  store.dispatch('showLoading')
  switch (type) {
    case 'text':
      nim.sendText({
        scene: obj.scene,
        to: obj.to,
        text: obj.text,
        done: onSendMsgDone
      })
      break
    case 'custom':
      nim.sendCustomMsg({
        scene: obj.scene,
        to: obj.to,
        content: JSON.stringify(obj.content),
        done: onSendMsgDone
      })
  }
}

export function sendFileMsg ({state, commit}, obj) {
  const nim = state.nim
  let {scene, to, fileInput} = obj
  let type = 'file'
  if (/\.(png|jpg|bmp|jpeg|gif)$/i.test(fileInput.value)) {
    type = 'image'
  } else if (/\.(mov|mp4|ogg|webm)$/i.test(fileInput.value)) {
    type = 'video'
  }
  store.dispatch('showLoading')
  nim.sendFile({
    scene,
    to,
    type,
    fileInput,
    uploadprogress: function (data) {
      // console.log(data.percentageText)
    },
    uploaderror: function () {
      console && console.log('上传失败')
    },
    uploaddone: function(error, file) {
      // console.log(error);
      // console.log(file);
    },
    beforesend: function (msg) {
      // console && console.log('正在发送消息, id=', msg);
    },
    done: function (error, msg) {
      onSendMsgDone (error, msg)
    }
  })
}

// 发送消息已读回执
export function sendMsgReceipt ({state, commit}) {
  // 如果有当前会话
  let currSessionId = store.state.currSessionId
  if (currSessionId) {
    // 只有点对点消息才发已读回执
    if (util.parseSession(currSessionId).scene === 'p2p') {
      let msgs = store.state.currSessionMsgs
      const nim = state.nim
      if (state.sessionMap[currSessionId]) {
        nim.sendMsgReceipt({
          msg: state.sessionMap[currSessionId].lastMsg,
          done: function sendMsgReceiptDone (error, obj) {
            // do something
          }
        })
      }
    }
  }
}

function sendMsgReceiptDone(error, obj) {
    console.log('发送消息已读回执' + (!error?'成功':'失败'), error, obj);
}

export function getHistoryMsgs ({state, commit}, obj) {
  const nim = state.nim
  if (nim) {
    let {scene, to} = obj
    let options = {
      scene,
      to,
      reverse: false,
      asc: true,
      limit: config.localMsglimit || 20,
      done: function getHistoryMsgsDone (error, obj) {
        if (obj.msgs) {
          if (obj.msgs.length === 0) {
            commit('setNoMoreHistoryMsgs')
          } else {
            commit('updateCurrSessionMsgs', {
              type: 'concat',
              msgs: obj.msgs
            })
          }
        }
        store.dispatch('hideLoading')
      }
    }
    if (state.currSessionLastMsg) {
      options = Object.assign(options, {
        lastMsgId: state.currSessionLastMsg.idServer,
        endTime: state.currSessionLastMsg.time,
      })
    }
    store.dispatch('showLoading')
    nim.getHistoryMsgs(options)
  }
}

export function resetNoMoreHistoryMsgs ({commit}) {
  commit('resetNoMoreHistoryMsgs')
}