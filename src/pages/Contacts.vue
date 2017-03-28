<template>
  <div class="g-inherit m-main">
    <div class="m-cards">
      <flexbox>
        <flexbox-item class="u-search-box">
          <a href="#/searchUser/0">
            添加好友
          </a>
        </flexbox-item>
        <flexbox-item class="u-search-box">
          <a href="#/searchUser/1">
            搜索高级群
          </a>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="m-list">
      <group class="u-card" title="群">
        <cell title="高级群" link="/chat/2" is-link>
          <span class="icon icon-team-advanced" slot="icon"></span>
        </cell>
        <cell title="讨论组" link="/chat/3" is-link>
          <span class="icon icon-team" slot="icon"></span>
        </cell>
      </group>
      <group class="u-card" title="好友">
        <cell title="WWW" is-link link="/namecard/2">
          <img class="icon" slot="icon" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
        <cell title="XXX" is-link link="/namecard/3">
          <img class="icon" slot="icon" width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
      </group>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Info'
    }
  }
}
</script>

<style type="text/css">
  .m-main {
    .m-list {
      padding-top: 8rem; 
    }
  }
  .u-search-box {
    position: relative;
    display: inline-block;
    padding: 1em;
    text-align: center;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .u-card {
    .icon {
      display: inline-block;
      margin-right: 0.4rem;
      width: 1.2rem;
      height: 1.2rem;
      background-size: 20rem;
      background-image: url(/res/im/icons.png);
    }
    .icon-team-advanced {
      background-position: 0 -3rem;
    }
    .icon-team {
      background-position: -2.1rem -3rem;
    }
  }
</style>