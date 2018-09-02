<template>
  <div class="master">
    <div class="error-center">
      <div class="content">
        <h1 v-if="error.statusCode === 404">We haven't traveled there yet!</h1>
        <h1 v-else>An error occurred</h1>
        <br />
        <div v-if="error.statusCode === 404">That page wasn't found, sorry.</div>
        <br />
        <nuxt-link to="/">Back to Home</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/Header'

  export default {
    props: ['error'],
    components: { Header },
    computed: {
    },
    mounted() {
    },
    methods: {
    }
  }

</script>

<style lang="scss">

  .content {
    height: auto;
    min-height: 0;
  }

  .error-center {
    text-align: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .master {
    display: flex;
    overflow: hidden;
    width: 100vw;
    height: 100vh;

    & > * {
      flex: 1;
      max-width: 50%;
      overflow: hidden;
      overflow-y: auto;
      height: 100vh;
    }

    @include width (mobile) {
      display: block;
      height: auto;

      & > * {
        max-width: 100%;
        overflow-y: visible;
        height: auto;
      }
    }
  }

</style>
