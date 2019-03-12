<template>
  <div id="devoverlay" v-if="isDev">
    Dev menu!
    <select v-model="userLang">
      <option value="en">EN User</option>
      <option value="ja">JA User</option>
    </select>
    <input type="checkbox" v-model="showDrafts" />Drafts
    <input type="checkbox" v-model="asDev" />View As Dev
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLang: this.$store.state.language,
      showDrafts: true,
      asDev: true,
    }
  },
  computed: {
    isDev() {
      return this.$store.state.isDev
    },
  },
  watch: {
    userLang(newLang) {
      this.$store.dispatch('setLanguage', newLang)
    },
    asDev(newSetting) {
      this.$store.commit('setDev', newSetting)
    },
  },
  methods: {},
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

  @include width(mobile) {
  }
}
</style>
