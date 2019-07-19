<template>
  <div id="devoverlay" v-if="isDev">
    Dev menu!
    <select v-if="!viewingAsDev" v-model="userLang">
      <option value="en">EN User</option>
      <option value="ja">JA User</option>
    </select>
    <input type="checkbox" @click="toggleDevView" :checked="viewingAsDev" />
    <span @click="toggleDevView">View As Dev</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLang: this.$store.state.language,
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
  watch: {
    userLang(newLang) {
      this.$store.dispatch('setLanguage', newLang)
      this.$store.dispatch('setOnlyShowLanguage')
    },
  },
  mounted() {
    // console.log(this.isDev)
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
  }
}
</style>
