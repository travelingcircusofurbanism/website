<template>
  <div
    class="button blue snipcart-add-item"
    data-item-id="1"
    data-item-name="Zine Vol 0"
    :data-item-price="prices"
    data-item-url="https://www.travelingcircusofurbanism.com/zine"
    data-item-description="TCU Zine Volume 0: Thesis"
    data-item-image
  >
    <span class="cta">{{ displayLanguage === 'ja' ? '今すぐ購入' : 'Get your copy!'}}</span>
    <span
      class="price"
    >{{displayLanguage === 'ja' ? '￥700（送料込）' : '$7 USD (Worldwide shipping included)'}}</span>
  </div>
</template>

<script>
export default {
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
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  display: inline-block;
}

.cta {
  font-size: 1em;
  line-height: 1.1em;
  font-weight: 500;
}

.price {
  font-size: 1em;
  opacity: 0.6;
  font-weight: 200;
  margin-left: $unit;
}
</style>
