<template>
  <div class="bluebanner content-top-full">
    <slot name="ja" v-if="$i18n.locale === 'ja'" class="ja"></slot>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: [],

  components: {},

  data() {
    return {}
  },

  computed: {
    isDev() {
      return this.$store.state.viewingAsDev
    },
    isMobile() {
      return this.$store.state.isMobile
    },
    userLanguage() {
      return this.$i18n.locale
    },
  },

  mounted() {},

  beforeDestroy() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.content-top-full {
  width: 100%;
  box-sizing: content-box;
  margin: 0 -1 * $content-padding;
  padding: $unit * 2 $content-padding;

  @include width(mobile) {
    margin: 0 -1 * $content-padding-mobile;
    padding: $content-padding-mobile;
    padding: $unit $content-padding-mobile;
  }
}

.bluebanner {
  background: $active;
  color: white;
  text-align: center;
  line-height: 1.7;
  font-size: 1em;

  @include width(mobile) {
    font-size: 0.9em;
  }

  a,
  a:hover,
  a:active,
  a:visited {
    color: white;
    color: inherit;
    text-decoration: none;
    display: inline-block;
    padding: $unit * 0.5 $unit * 1.5;
    margin: $unit $unit * 0.2;
    border: 1px solid rgba(white, 0.3);
    background: rgba(white, 0.1);
    transition: all 0.2s;
  }
  a:hover {
    background: rgba(white, 0.2);
  }
}
</style>
