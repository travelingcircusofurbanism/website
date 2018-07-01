<template>
  <div id="canvas">
    <Map v-if="active === 'map'" class="fill" />
  </div>
</template>

<script>
import Map from '~/components/CanvasFills/Map'

export default {
  components: { Map, },
  data () {
    return {
      active: 'map',
    }
  }
}
</script>

<style scoped lang="scss">

  #canvas {
    background: #555;
    z-index: 2;
    position: relative;
    overflow: hidden;

    @include width (mobile) {
      height: 35vh;
    }

    & > .fill {
      position: relative;
      height: 100vh;
      width: 100%;

      @include width (mobile) {
        height: 100%;
      }
    }
  }
  
</style>
