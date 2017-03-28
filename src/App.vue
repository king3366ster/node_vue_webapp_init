<template>
  <div class="g-window">
    <nav-bar v-show="showNav"></nav-bar>
    <loading :show="isLoading" position="absolute"></loading>
    <!-- 切页动画设置 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import {Group, Cell, XHeader, XInput, XButton, XSwitch, Datetime, Loading, ViewBox, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider} from 'vux'

// 全局注册vux的组件
Vue.component('Group', Group)
Vue.component('Cell', Cell)
Vue.component('Datetime', Datetime)
Vue.component('ButtonTab', ButtonTab)
Vue.component('ButtonTabItem', ButtonTabItem)
Vue.component('Flexbox', Flexbox)
Vue.component('FlexboxItem', FlexboxItem)
Vue.component('Divider', Divider)
Vue.component('XInput', XInput)
Vue.component('XButton', XButton)
Vue.component('XHeader', XHeader)
Vue.component('XSwitch', XSwitch)

import NavBar from './components/NavBar'

export default {
  components: {
    NavBar,
    ViewBox,
    Loading
  },
  computed: {
    showNav () {
      const path = this.$route.path
      switch (path) {
        case '/':
          return true
        case '/session':
          return true
        case '/contacts':
          return true
        case '/live':
          return true
        case '/general':
          return true
        default:
          return false
      }
    }
  },
  data () {
    return {
      isLoading: false
    }
  }
}
</script>

