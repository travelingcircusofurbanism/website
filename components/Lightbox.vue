<template>
  <div
    v-if="!isMobile"
    class="lightbox"
    :class="{on: displayImageSrc ? true : false}"
    @click="close"
  >
    <div
      v-if="displayImageSrc"
      :style="{'background-image': `url('${ displayImageSrc }')`}"
      class="lightboximage"
    ></div>
    <div class="loader" v-if="loading"></div>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data () {
    return {
      displayImageSrc: null,
      loading: false,
    }
  },
  computed: {
    src () { return this.$store.state.lightboxSrc },
    isMobile () { return this.$store.state.isMobile },
    fullSizeSrc () {
     return this.src.indexOf('/') === 0 ?
        this.src.replace('generated/resized', 'full') :
        this.src
    },
  },
  watch: {
    src () {
      if (this.isMobile) return
      this.displayImageSrc = this.src
      this.loading = false
      if (!this.src) return
      this.loading = true
      const fullSizeImage = new Image()
      fullSizeImage.addEventListener('load', this.fullSizeImageLoaded, false)
      fullSizeImage.src = this.fullSizeSrc
    }
  },
  mounted () {},
  methods: {
    close () {
      this.$store.commit('setLightboxSrc', null)
    },
    fullSizeImageLoaded () {
      this.loading = false
      this.displayImageSrc = this.fullSizeSrc
    }
  },
}
</script>
<style lang="scss" scoped>

  .lightbox {
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background: rgba(black, .8);
    padding: 2%;
    transition: all .3s;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
    cursor: zoom-out;

    &.on {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .lightboximage {
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 1;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    $radius: 50px;
    $width: 10px;
    width: $radius;
    height: $radius;
    border-radius: $radius / 2;
    border-right: $width solid rgba(#eee, .8);
    border-left: $width solid rgba(#eee, .8); 
    border-top: $width solid transparent;
    border-bottom: $width solid transparent;   
    z-index: 2;
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
    from {
        transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }
    to {
        transform: translateX(-50%) translateY(-50%) rotate(360deg);
    }
  }


</style>
