<template>
  <div class="master">
    <Map/>
    <nuxt/>
  </div>
</template>

<script>
  import Map from '~/components/map.vue'
  export default {
    components: { Map }
  }
</script>

<style scoped>

  .master > * {
    display: inline-block;
    width: 50%;
  }

</style>
