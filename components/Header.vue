<template>
  <div id="header" :class="{hide: scrollDirection === 'down'}">
    <nuxt-link exact to="/" class="logo">
      <h1>Traveling Circus of Urbanism</h1>
    </nuxt-link>
    <br />
    <div class="sublinks">
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/author">Author</nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      prevScrollTop: 0,
      scrollDirection: 'up',

    }
  },
  mounted () {
    this.$nextTick(() => {
      // window.querySelector('.content')
    })
  },
  // compareScrollTop
}

</script>

<style scoped lang="scss">

  a, a:hover, a:visited, a:active {
    display: inline-block;
    color: white;
    background: $text;
    text-decoration: none;
    transition: .2s;
    pointer-events: auto;
  }

  a:hover {
    background: $active;
  }

  #header {
    position: fixed;
    display: inline-block;
    top: $header-offset;
    left: $header-offset;
    z-index: 10;
    height: initial;
    pointer-events: none;

    @include width (mobile) {
      display: block;
      width: 100%;
      position: relative;
      top: 0;
      left: 0;
      overflow: hidden;
      transition: all .4s;

      &.hide {
        bottom: 100%;
      }
    }
  }

  .logo {
    display: inline-block;
    text-transform: uppercase;
    font-family: 'Unica One', 'Raleway', sans-serif;
    padding: $unit * 4 $unit * 4;
    font-weight: 600;
    border-left: $unit solid $active;

    @include width (mobile) {
      width: 100%;
      padding: $unit * 4 $unit * 3;
    }
  }

  h1 {
    font-size: 2rem;
    margin: 0;

    @include width (mobile) {
      font-size: 1.5rem;
    }
  }

  .sublinks {
    display: inline-block;
    margin-top: $unit;
    font-weight: 400;

    @include width (mobile) {
      margin-top: 0;
      display: flex;
    }

    a {
      padding: $unit * 2 $unit * 4;
      margin-right: $unit;

      @include width (mobile) {
        background: $offwhite;
        color: darken($offwhite, 60%);
        text-align: center;
        flex: 1;
        margin-right: 0;
        padding: $unit * 1.5 $unit * 3;
      }
    }
  }
</style>
