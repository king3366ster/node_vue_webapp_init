import store from '../'
import {onUpdateFriend, onDeleteFriend} from './friends'

export function onSysMsgs (sysMsgs) {
  console.log(sysMsgs)
  store.commit('updataSysMsgs', sysMsg)
}

export function onSysMsg (sysMsg) {
  store.commit('updataSysMsgs', [sysMsg])
  switch (sysMsg.type) {
    // 在其他端添加或删除好友
    case 'addFriend':
      onUpdateFriend(null, {
        account: sysMsg.from
      })
      break
    case 'deleteFriend':
      onDeleteFriend(null, {
        account: sysMsg.from
      })
      break
  }
}

export function onSysMsgUnread (obj) {
  store.commit('updataSysMsgUnread', obj)
}

export function onCustomSysMsgs (customSysMsgs) {
  console.log(customSysMsgs)
  store.commit('updataCustomSysMsgs', customSysMsgs)
}

// 不传obj则全部重置
export function markSysMsgRead ({state, commit}, obj) {
  const nim = state.nim
  let sysMsgs = []
  if (obj && obj.sysMsgs) {
    sysMsgs = obj.sysMsgs
  } else {
    sysMsgs = state.sysMsgs
  }
  if (Array.isArray(sysMsgs) && sysMsgs.length > 0) {
    nim.markSysMsgRead({
      sysMsgs,
      done: function (error, obj) {
      }
    })
  }
}

export function resetSysMsgs ({state, commit}, obj) {
  commit('resetSysMsgs', obj)
}