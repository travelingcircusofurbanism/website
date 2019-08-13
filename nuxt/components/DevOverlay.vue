<template>
  <div id="devoverlay" v-if="isDev && !hide">
    <input type="checkbox" @click="toggleDevView" :checked="viewingAsDev" />
    <span @click="toggleDevView">View As Dev</span>
    <button @click="hide = true">Hide</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: false,
    }
  },
  computed: {
    isDev() {
      return this.$store.state.isDev
    },
    viewingAsDev() {
      return this.$store.state.viewingAsDev
    },
  },
  methods: {
    toggleDevView() {
      this.$store.commit('setViewingAsDev', !this.viewingAsDev)
      this.$store.dispatch('updateShowablePosts')
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

#devoverlay {
  background: #000;
  z-index: 2000;
  position: fixed;
  padding: 3px 10px;
  overflow: hidden;
  top: 0;
  left: 0;
  color: white;
  font-size: 12px;

  @include width(mobile) {
    position: absolute;
    top: $unit * 8;
    select,
    button {
      background: white;
    }
  }
}
</style>
