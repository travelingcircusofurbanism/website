<template>
  <div class="sectionheadcontainer" v-if="!!$slots.default">
    <h3 class="sectionhead">
      <slot></slot>
    </h3>
    <div class="lineholder">
      <div class="line"></div>
    </div>
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
    isMobile() {
      return this.$store.state.isMobile
    },
  },

  mounted() {},

  beforeDestroy() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.sectionheadcontainer {
  padding: $unit 0;
  margin-top: $unit * 7;
  margin-bottom: $unit * 5;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  z-index: 2;

  &:first-child {
    margin-top: $unit * 3;
  }

  @include width(mobile) {
    margin-top: $unit * 2;
    margin-bottom: $unit * 3;
    padding-bottom: 0;
  }

  & > * {
    flex: 1;
  }
}

.sectionhead {
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 400;
  color: $active;
  padding: 0;
  margin: 0;
  padding-right: $unit * 5;
  white-space: nowrap;

  @include width(mobile) {
    font-size: 1.3rem;
    padding-right: $unit * 3;
  }
}

.lineholder {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.line {
  width: 100%;
  height: 1px;
  background: $active;
  opacity: 0.6;
}
</style>
