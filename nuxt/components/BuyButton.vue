<template>
  <form
    action="https://www.paypal.com/cgi-bin/webscr"
    method="post"
    target="_blank"
    :class="{fullwidth: isButton}"
  >
    <input type="hidden" name="cmd" value="_s-xclick" />
    <input type="hidden" name="hosted_button_id" value="MM4R7DRB7AF8Q" />
    <div :class="{inline: !isButton, fakeLink: !isButton, center: isButton }">
      <slot>
        <button class="button blue" type="submit">
          <span
            class="cta"
          >{{ buttonText || (displayLanguage === 'ja' ? '今すぐ購入' : 'Get your copy!')}}</span>
        </button>
        <div
          class="price"
        >{{displayLanguage === 'ja' ? '￥800 送料込 (Paypalで支払う)' : '800 Yen, or about $7.30 USD. Worldwide shipping included. (Payment through Paypal)'}}</div>
      </slot>
    </div>
    <!-- <input
      type="image"
      src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
      border="0"
      name="submit"
      alt="PayPal - The safer, easier way to pay online!"
    />-->
    <img
      alt
      border="0"
      src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
      width="1"
      height="1"
    />
  </form>

  <!--<div
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
      >{{displayLanguage === 'ja' ? '￥800（送料込）' : '$8 USD (Worldwide shipping included)'}}</div>
    </slot>
  </div>-->
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
      // prices: `{"usd": 8, "jpy":800}`,
    }
  },
  computed: {
    displayLanguage() {
      return this.$store.state.language
    },
  },
  mounted() {
    // if (this.displayLanguage === 'ja') Snipcart.api.cart.currency('jpy')
    // else Snipcart.api.cart.currency('usd')
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

form {
  display: inline-block;
  margin: 0 auto;
}
.fullwidth {
  width: 100%;
}

button {
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  font-family: $font-stack;
}
.button {
  padding: 1em 3em;
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
  color: $active;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 4 * $unit;
}
</style>
