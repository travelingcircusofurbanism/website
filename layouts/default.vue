<template>
  <div class="master">
    <Header/>
    <Canvas/>
    <nuxt/>
  </div>
</template>

<script>
  import Canvas from '~/components/Canvas'
  import Header from '~/components/Header'

  export default {
    components: { Canvas, Header }
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
