import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = new Vuex.Store({
  state: {
    // 切页动画状态
    isLoading: false,
    direction: 'forward'
  },
  mutations,
  actions,
  getters,
  plugins: []
})

export default store
