<template>
  <div class="master">
    <Header />
    <div class="error-center">
      <div>
        Whoops! Nothing here.
        <br />
        <a href="/">Back to Home</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/Header'

  export default {
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
