<template>
  <div class="g-inherit m-article">
    <x-header class="m-tab" :left-options="{backText: ' '}">
      <h1 class="m-tab-top">个人名片-{{$route.params.userId}}</h1>
      <a slot="left"></a>
    </x-header>

    <group class="u-card">
      <cell title="WWW" inline-desc="吴老爷和吴夫人">
        <img class="icon" slot="icon" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      </cell>
    </group>
    <group class="u-card">
      <cell title="备注名" is-link link="/namecardremark/3"></cell>
    </group>
    <group class="u-card">
      <x-switch class="u-switch" title="消息提醒" v-model="notify" @on-change="changeNote"></x-switch>
    </group>
    <group class="u-card">
      <x-switch class="u-switch" title="黑名单" v-model="blacken" @on-change="changeBlack"></x-switch>
    </group>
    <div>
      <x-button type="primary" action-type="button" @click.native="enterChat">聊天</x-button>
      <x-button type="primary" action-type="button" @click.native="enterHistory">历史记录</x-button>
      <x-button type="warn" action-type="button" @click.native="delFriend">删除好友</x-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      notify: true,
      blacken: false
    }
  },
  methods: {
    changeNote () {
      alert(`通知${this.notify}`)
    },
    changeBlack () {
      alert(`黑名单${this.blacken}`)
    },
    enterChat () {
      location.href = '#/chat/2'
    },
    enterHistory () {
      location.href = '#/chatHistory/2'
    },
    addFriend () {
      alert('添加好友')
    },
    delFriend () {
      alert('删除好友')
    }
  }
}
</script>

<style type="text/css">
  .u-card {
    .icon {
      display: inline-block;
      margin-right: 0.8rem;
      width: 2rem;
      height: 2rem;
    }
  }

</style>