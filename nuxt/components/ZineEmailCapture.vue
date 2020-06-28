<template>
  <div class="zineemailcapture highlightbox">
    <template v-if="!showThanks">
      <div>
        <h2>
          {{
            displayLanguage === 'ja' ? '' : 'Sorry, this is sold out right now!'
          }}
        </h2>
      </div>
      <div>
        Leave your email here and we'll let you know when it's back in stock, or
        when we make new things!
      </div>
      <div class="sub">Absolutely no spam, we promise.</div>
      <form @submit.prevent="submit" ref="form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          ref="email"
        />
        <button type="submit">Keep Me Informed!</button>
      </form>
    </template>
    <template v-else>
      <div>
        <h2>Thanks!</h2>
        We'll let you know when this or something new is available.
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      showThanks: false,
      scriptUrl:
        'https://script.google.com/macros/s/AKfycbzbyTEiRZdkS-OJTOu4S7s4AXZK6XIxOtAoE1jPWzisN0qqe5I/exec',
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  computed: {
    displayLanguage() {
      return this.$i18n.locale
    },
  },
  mounted() {},
  methods: {
    submit(e) {
      if (this.emailRegex.exec(this.$refs.email.value))
        fetch(this.scriptUrl, {
          method: 'POST',
          body: new FormData(this.$refs.form),
        })
          .then(response => console.log('Success!', response))
          .catch(error => console.error('Error!', error.message))
      this.showThanks = true
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.zineemailcapture {
  text-align: center;
  margin: $unit * 5 auto;
  max-width: $unit * 80;
}

form {
  display: flex;
  margin: $unit * 4 auto 0 auto;
  align-items: stretch;
  height: $unit * 7;

  @include width(mobile) {
    display: block;
    height: auto;
  }

  & > * {
    flex: 1;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid $active;
    border-radius: 0;
    padding: 0 $unit * 2;
    margin: 0;
    color: $text;

    @include width(mobile) {
      height: $unit * 7;
      width: 100%;
    }
  }
  input {
    text-align: left;
    flex: 2;
  }
  button {
    background: $active;
    color: white;
    margin-left: $unit * 2;
    white-space: nowrap;

    @include width(mobile) {
      margin-left: auto;
    }
  }
}
.fullwidth {
  width: 100%;
}

.highlightbox {
  background: rgba($active, 0.2);
  border: 1px solid $active;
  padding: $unit * 6;

  h2,
  h3,
  h4 {
    margin-top: 0;
  }
}
</style>
