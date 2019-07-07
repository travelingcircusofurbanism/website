<template>
  <div id="canvas" :class="{closed: closed}">
    <div
      v-if="activeImage"
      class="fill imagefill"
      :style="{'background-image': `url(${activeImage})`}"
    ></div>
    <Map v-else class="fill" @close="close" @open="open" />
  </div>
</template>

<script>
import Map from '~/components/Map/Map'

export default {
  components: { Map },
  data() {
    return {
      closed: false,
    }
  },
  computed: {
    activeImage() {
      return this.$store.state.canvasImage
    },
  },
  methods: {
    close() {
      this.closed = true
    },
    open() {
      this.closed = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

#canvas {
  background: #333;
  z-index: 2;
  position: relative;
  overflow: hidden;

  @include width(mobile) {
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

    @include width(mobile) {
      height: 100%;
    }

    &.imagefill {
      background-position: center center;
      background-size: cover;
    }
  }
}
</style>
