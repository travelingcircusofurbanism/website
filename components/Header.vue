<template>
  <div id="header">
    <nuxt-link exact to="/">
      <h1>I am Header</h1>
    </nuxt-link>
    <div>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/contact">Contact</nuxt-link>
    </div>
  </div>
</template>


<script>

</script>

<style scoped>

  a, a:hover, a:visited, a:active {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background: black;
    text-decoration: none;
    transition: .2s;
  }

  a:hover {
    background: #222;
  }

  #header {
    position: fixed;
    display: inline-block;
    top: 30px;
    left: 30px;
    z-index: 10;
    height: initial;
  }

</style>
