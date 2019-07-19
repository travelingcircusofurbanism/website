<template>
  <div
    class="japanese-available content-top-full"
    v-if="
      (!hideJapaneseDialog && (userLanguage !== 'en' || isDev)) ||
        onlyShowLanguage
    "
  >
    <template v-if="onlyShowLanguage === 'ja'">
      <img src="~/assets/icons/japanFlag.svg" class="flag-icon">
      <span>日本語での投稿のみ表示しています。</span>
      <div style="display: inline-block">
        <span class="button invert" @click="onlyShow()">全ての投稿を表示</span>
      </div>
    </template>
    <template v-else>
      <div class="closebutton" @click="hideJapaneseDialogClicked">✕</div>
      <img src="~/assets/icons/japanFlag.svg" class="flag-icon">
      <span>日本語での投稿があります。</span>
      <div style="display: inline-block">
        <span class="button invert" @click="onlyShow('ja')">日本語のみ表示</span>
      </div>
    </template>
  </div>
</template>

<script>
const { get, set } = require('~/assets/storage').default

export default {
  data() {
    return {
      hideJapaneseDialog: true,
    }
  },
  computed: {
    isDev() {
      return this.$store.state.viewingAsDev
    },
    onlyShowLanguage() {
      return this.$store.state.onlyShowLanguage
    },
    userLanguage() {
      return this.$store.state.language
    },
  },
  mounted() {
    if (
      (this.isDev || this.userLanguage === 'ja') &&
      !this.get('hideJapaneseDialog')
    )
      this.hideJapaneseDialog = false
  },
  methods: {
    get,
    set,
    hideJapaneseDialogClicked() {
      if (!this.isDev) this.set('hideJapaneseDialog', true)
      this.hideJapaneseDialog = true
    },
    onlyShow(lang) {
      this.$store.dispatch('setOnlyShowLanguage', lang)
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.japanese-available {
  position: relative;
  background: $active;
  color: white;
  // margin-bottom: $unit * 5;
  // margin-top: -3 * $unit;
  // margin-top: 0;
  text-align: center;
  line-height: 2.5;

  @include width(mobile) {
    margin-bottom: $content-padding-mobile;
    margin-top: -3 * $unit;
  }
  .closebutton {
    position: absolute;
    color: white;
    line-height: 1;
    padding: 10px;
    top: 0;
    right: 0;

    &:hover {
      cursor: pointer;
      background: rgba(white, 0.2);
    }
  }
}
</style>
