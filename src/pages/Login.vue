<template>
  <div class="g-inherit m-album">
    <div class="g-center m-login">
      hello world
      <group>
        <x-input class="u-ipt-transparent" type="text" v-model="account" :required="true" placeholder="请输入账号">
          <span slot="label">账号：</span>
        </x-input>
        <x-input class="u-ipt-transparent" type="password" :required="true" v-model="password" placeholder="请输入密码">
          <span slot="label">密码：</span>
        </x-input>
      </group>
      <group class="u-card">
        <x-button type="default" action-type="button" @click.native="login">登录</x-button>
        <x-button type="transparent" action-type="button" @click.native="regist">注册</x-button>
      </group>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      location.href = '#/session'
    },
    regist () {
      location.href = '#/regist'
    }
  }
}
</script>