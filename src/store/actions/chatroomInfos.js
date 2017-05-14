import store from '../'
import config from '../../configs'

// 用于demo记录封面
export function initChatroomInfos ({state, commit}, obj) {
  commit('initChatroomInfos', obj)
}

export function getChatroomInfo ({state, commit, dispatch}) {
  const chatroom = state.currChatroom
  if (chatroom) {
    dispatch('showLoading')
    chatroom.getChatroom({
      done: function getChatroomDone (error, info) {
        if (error) {
          alert(error)
          dispatch('hideLoading')
          return
        }
        info = info.chatroom || {creator: ''}
        let creator = info.creator
        chatroom.getChatroomMembersInfo({
          accounts: [creator],
          done: function getChatroomMembersInfoDone (error, user) {
            dispatch('hideLoading')
            if (error) {
              alert(error)
              return
            }
            commit('getChatroomInfo', Object.assign(info,  {actor: user.members[0]}))
          }
        })
      }
    })
  }
}

export function getChatroomMembers ({state, commit, dispatch}) {
  const chatroom = state.currChatroom
  if (chatroom) {
    dispatch('showLoading')
    chatroom.getChatroomMembers({
      guest: false,
      limit: 100,
      done: function getChatroomMembersDone (error, obj) {
        dispatch('hideLoading')
        if (error) {
          alert(error)
          return
        }
        commit('updateChatroomMembers', Object.assign(obj, {type: 'put'}))
      }
    })
  }
}

export function clearChatroomMembers ({state, commit}) {
  commit('updateChatroomMembers', {type: 'destroy'})
}