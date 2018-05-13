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

<style lang="scss">

  .master {
    display: flex;
    overflow: hidden;
    width: 100vw;
    height: 100vh;

    & > * {
      flex: 1;
      max-width: 50%;
      overflow: hidden;

      &:not(#map){
        overflow-y: auto;
        height: 100vh;
      }
    }
  }

</style>
