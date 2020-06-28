<template>
  <div class="buybutton">
    <div v-if="!paypalBuyId && !paypalBuyIdJa">
      Sorry, this is sold out for now! Check back later.
    </div>
    <form
      v-else
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_blank"
      :class="{ fullwidth: isButton }"
    >
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input
        type="hidden"
        name="hosted_button_id"
        :value="displayLanguage === 'ja' ? paypalBuyIdJa : paypalBuyId"
      />
      <div
        class="visiblebuycontent"
        :class="{ inline: !isButton, fakeLink: !isButton }"
      >
        <slot>
          <button class="button blue" type="submit">
            <span class="cta">{{
              buttonText ||
              (displayLanguage === 'ja' ? '今すぐ購入' : 'Get your copy!')
            }}</span>
          </button>
          <div class="price">
            {{
              displayLanguage === 'ja'
                ? '￥800 送料込 (Paypalで支払う)'
                : '$8 USD, worldwide shipping included. (Payment through Paypal)'
            }}
          </div>
        </slot>
      </div>

      <img
        alt
        border="0"
        src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isButton: {
      default: true,
    },
    buttonText: {},
    paypalBuyId: {},
    paypalBuyIdJa: {},
  },
  data() {
    return {}
  },
  computed: {
    displayLanguage() {
      return this.$i18n.locale
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.buybutton {
  display: inline-block;
  margin: 0 auto;
}

form {
  display: inline-block;
  margin: 0 auto;
}
.fullwidth {
  width: 100%;
}

.visiblebuycontent {
  // margin-top: $unit * 4;
  display: flex;
  align-items: center;
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
  margin-bottom: 0;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: $unit * 4;

  &:hover,
  div,
  a {
    cursor: pointer !important;
  }
}

.inline {
  display: inline;

  button {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
    color: $active;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.fakeLink {
  color: $active;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

// .center {
//   text-align: center;
// }

.cta {
  font-size: 1em;
  line-height: 1.1em;
  font-weight: 500;
}

.price {
  font-size: 0.9em;
  font-weight: 200;
  color: $active;
  max-width: 400px;
  line-height: 1.3;
  // margin: 0 auto;
  // margin-bottom: 4 * $unit;
}
</style>
