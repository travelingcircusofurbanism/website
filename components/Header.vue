<template>
  <div id="header">
    <nuxt-link exact to="/" class="logo">
      <h1>Traveling Circus of Urbanism</h1>
    </nuxt-link>
    <div class="sublinks">
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/contact">Author</nuxt-link>
    </div>
  </div>
</template>


<script>

</script>

<style scoped lang="scss">

  a, a:hover, a:visited, a:active {
    display: inline-block;
    color: white;
    background: $text;
    text-decoration: none;
    transition: .2s;
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
  }

  .logo {
    text-transform: uppercase;
    font-family: 'Unica One', 'Raleway', sans-serif;
    padding: $unit * 4 $unit * 4;
    font-weight: 600;
    border-left: $unit solid $active;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  .sublinks {
    display: inline-block;
    margin-top: $unit;
    font-weight: 400;

    a {
      padding: $unit * 2 $unit * 4;
      margin-right: $unit;
    }
  }
</style>
