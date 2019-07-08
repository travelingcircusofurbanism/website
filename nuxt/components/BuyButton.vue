<template>
  <div
    :class="{inline: !isButton, fakeLink: !isButton, center: isButton }"
    class="snipcart-add-item"
    data-item-id="1"
    data-item-name="Zine Vol 0"
    :data-item-price="prices"
    data-item-url="https://www.travelingcircusofurbanism.com/zine"
    data-item-description="TCU Zine Volume 0: Thesis"
    data-item-image="/assets/zine/hero.jpg"
  >
    <slot>
      <div class="button blue">
        <span class="cta">{{ buttonText || (displayLanguage === 'ja' ? '今すぐ購入' : 'Get your copy!')}}</span>
      </div>
      <div
        class="price"
      >{{displayLanguage === 'ja' ? '￥700（送料込）' : '$7 USD (Worldwide shipping included)'}}</div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    isButton: {
      default: true,
    },
    buttonText: {},
  },
  data() {
    return {
      prices: `{"usd": 7, "jpy":700}`,
    }
  },
  computed: {
    displayLanguage() {
      return this.$store.state.language
    },
  },
  mounted() {
    if (this.displayLanguage === 'ja') Snipcart.api.cart.currency('jpy')
    else Snipcart.api.cart.currency('usd')
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.button {
  padding-left: 3em;
  padding-right: 3em;
  display: inline-block;
  margin-right: 0;
  margin-bottom: $unit;

  &:hover,
  div,
  a {
    cursor: pointer !important;
  }
}

.inline {
  display: inline;
}

.fakeLink {
  color: $active;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.center {
  text-align: center;
}

.cta {
  font-size: 1em;
  line-height: 1.1em;
  font-weight: 500;
}

.price {
  font-size: 1em;
  font-weight: 200;
  margin-bottom: $unit * 4;
  color: $active;
}
</style>
