<template>
  <div class="master">
    <Map/>
    <Header/>
    <nuxt/>
  </div>
</template>

<script>
  import Map from '~/components/Map'
  import Header from '~/components/Header'
  export default {
    components: { Map, Header }
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
