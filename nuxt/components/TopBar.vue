<template>
  <div>
    <div v-if="!isMobile" class="topbar content-top-full" :class="{searchopen: searchOpen}">
      <Breadcrumb :collapse="searchOpen || !breadcrumbs || breadcrumbs.length < 1" />
      <SearchSelector
        :collapse="!searchOpen && breadcrumbs && breadcrumbs.length > 0"
        @open="searchOpen = true"
        @close="searchOpen = false"
      />
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
import SearchSelector from '~/components/SearchSelector'
import Breadcrumb from '~/components/Breadcrumb'

export default {
  components: { SearchSelector, Breadcrumb },
  props: {},
  data() {
    return {
      searchOpen: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.topbar {
  position: fixed;
  top: 0;
  left: 50vw;
  width: 50vw;
  display: flex;
  z-index: 3;
  overflow: hidden;
  font-size: 0.9em;
  height: $unit * 8;
  color: $text;

  &.searchopen {
    height: 100vh;
    overflow-y: auto;
  }
}

.spacer {
  position: relative;
  z-index: 2;
  height: $unit * 8;
  width: 100%;
  background: $shade;
}
</style>
