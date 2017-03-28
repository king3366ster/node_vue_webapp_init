<template>
  <div class="g-inherit m-article">
    <x-header class="m-tab" :left-options="{backText: ' '}">
      <h1 class="m-tab-top">个人名片-{{$route.params.userId}}</h1>
      <a slot="left"></a>
    </x-header>
    <group class="u-card">
      <x-input
        class="u-ipt-default"
        type="text"
        :required="true"
        v-model="alias"
        placeholder="请输入备注名">
        <span slot="label">备注：</span>
      </x-input>
    </group>
    <div>
      <x-button type="primary" action-type="button" @click.native="setAlias">设置备注名</x-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      alias: ''
    }
  },
  methods: {
    setAlias () {
      alert(this.alias)
      window.history.go(-1)
    }
  }
}
</script>
