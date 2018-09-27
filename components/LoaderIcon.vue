<template>
  <img
    src="/assets/loading.svg"
    class="loader"
    :class="{off: !active || preFadeIn, absolute}"
  />
</template>

<script>
import supercluster from 'supercluster'

export default {
	props: {
    active: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: true,
    }
  },
  data () {
    return {
      preFadeIn: true,
    }
  },
  mounted () {
    this.preFadeIn = false
  },
}

</script>

<style lang="scss" scoped>

  .loader {
    transition: opacity 1s;

    &.absolute {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:not(.absolute) {
      display: block;
      margin: 0 auto;
    }
    
    &.off {
      opacity: 0;
    }
  }

</style>
