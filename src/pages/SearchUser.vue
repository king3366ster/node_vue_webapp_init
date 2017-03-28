<template>
  <div class="g-inherit m-article">
    <x-header class="m-tab" :left-options="{backText: ' '}">
      <button-tab class="m-tab-top" v-model="searchType">
        <button-tab-item class="u-tab-top">搜索用户</button-tab-item>
        <button-tab-item class="u-tab-top">搜索群</button-tab-item>
      </button-tab>
      <a slot="left"></a>
    </x-header>
    <group class="u-card">
      <x-input
        class="u-ipt-default"
        type="text"
        :required="true"
        v-model="searchText"
        placeholder="请输入搜索内容">
        <span slot="label">搜索：</span>
      </x-input>
    </group>
    <div>
      <x-button type="primary" action-type="button" @click.native="searchUser">搜索</x-button>
    </div>
    <group class="u-card u-list">
      <cell
        class="u-list-item"
        title="XXX"
        inline-desc="cs:哈哈哈"
        v-for="(user, index) in userList"
        :key="user"
        :userId="index"
        is-link
        link="/namecard/3">
        <span slot="icon">icon</span>
      </cell>
    </group>
  </div>
</template>

<script>

export default {
  mounted () {
    this.$nextTick(() => {
      this.searchType = parseInt(this.$route.params.searchType)
    })
  },
  data () {
    return {
      searchType: 0, // 用户 0 群 1
      searchText: '',
      userList: [1,2,2,2,2,2,2,2,2,2,2,2,2,2]
    }
  },
  methods: {
    searchUser () {
      alert('search')
    }
  }
}
</script>
