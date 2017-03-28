<template>
  <div class="g-inherit m-main">
    <group class="u-card">
      <cell title="WWW" inline-desc="吴老爷和吴夫人">
        <img class="icon" slot="icon" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      </cell>
    </group>
    <group class="u-card">
      <cell title="昵称">111111</cell>
      <cell title="性别">未知</cell>
      <cell title="生日">未设置</cell>
      <cell title="手机">未设置</cell>
      <cell title="邮箱">未设置</cell>
      <cell title="签名">未设置</cell>
    </group>
    <div>
      <x-button type="warn" action-type="button" @click.native="unlogin">注销</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      msg: 'Info'
    }
  },
  methods: {
    unlogin () {
      alert('unlogin')
      location.href = "#/login"
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