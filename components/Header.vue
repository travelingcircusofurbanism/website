<template>
  <div id="header">
    <nuxt-link exact to="/">
      <h1>I am Header</h1>
    </nuxt-link>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>


<script>

</script>

<style scoped>

  #header {
    position: fixed;
    display: inline-block;
    top: 0;
    left: 0;
    z-index: 10;
    height: initial;
  }

</style>
