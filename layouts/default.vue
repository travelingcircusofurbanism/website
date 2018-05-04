<template>
  <div class="master">
    <Map/>
    <nuxt/>
  </div>
</template>

<script>
  import Map from '~/components/map'
  export default {
    components: { Map }
  }
</script>

<style>

  /* body { margin:0; padding:0; } */

  .master > * {
    display: inline-block;
    width: 50%;
  }

</style>
