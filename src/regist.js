import Vue from 'vue'

// 添加Fastclick移除移动端点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 添加手势触摸事件，使用方法如 v-touch:swipeleft
import VueTouch from './plugins/touchEvent'
Vue.use(VueTouch)

import md5 from './utils/md5'
import cookie from './utils/cookie'

import config from './configs'
import util from './utils'
import axios from 'axios'

var formData = new Vue({
  el: '#form-data',
  data: {
    account: '',
    password: '',
    nickname: '',
    errorMsg: ''
  },
  methods: {
    regist () {
      if (this.account === '') {
        this.errorMsg = '帐号不能为空'
        return
      } else if (this.account.length > 20) {
        this.errorMsg = '帐号最多限20位'
        return
      } else if (/[^a-zA-Z0-9]/.test(this.account)) {
        this.errorMsg = '帐号限字母或数字'
        return
      } else if (this.nickname.length > 10) {
        this.errorMsg = '昵称限10位中文、英文或数字'
        return
      } else if (this.password === '') {
        this.errorMsg = '密码不能为空'
        return
      } else if (this.password.length < 6) {
        this.errorMsg = '密码至少需要6位'
        return
      }
      this.errorMsg = ''
      // 本demo做一次假登录
      // 真实场景应在此向服务器发起ajax请求
      let sdktoken = md5(this.password)
      axios.post(
        `${config.postUrl}/api/createDemoUser`,
        util.object2query({
          username: this.account,
          password: sdktoken,
          nickname: this.nickname
        }),
        {
          headers: {
            'appkey': config.appkey,
            'content-type': 'application/x-www-form-urlencoded',
          }
        }
      ).then(res => {
        let data = res.data
        if (data.res === 200) {
          cookie.setCookie('uid', this.account)
          cookie.setCookie('sdktoken', sdktoken)
          location.href = config.appUrl
        } else {
          this.errorMsg = data.errmsg
        }
      }).catch(err => {
        this.errorMsg = '网络断开或其他未知错误'
      })
    },
    login () {
      location.href = config.loginUrl
    }
  },
})
