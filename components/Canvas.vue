<template>
  <div
    id="canvas"
    :class="{closed: closed}"
  >
    <Map
      v-if="active === 'map'"
      class="fill" 
      @close="close"
      @open="open"
    />
  </div>
</template>

<script>
import Map from '~/components/CanvasFills/Map'

export default {
  components: { Map, },
  data () {
    return {
      active: 'map',
      closed: false,
    }
  },
  methods: {
    close () { this.closed = true },
    open () { this.closed = false },
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
      transition: 1s;

      &.closed {
        height: 0;
      }
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
