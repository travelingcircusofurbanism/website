<template>
  <div class="footer">
     <p>
       All content copyright Mariko Sugita, except where noted.</br>
       Static site built using <a href="https://nuxtjs.org/guide" target="_blank">Nuxt.js</a> and hosted with <a href="https://github.com/mariko9012" target="_blank">Github Pages</a>.
     </p>
  </div>
</template>

<style scoped lang="scss">

  .footer {
    margin: $content-padding * -1;
    margin-top: $content-padding * 2;
    color: white;
    background: $text;
    padding: $content-padding;
    * {
      text-align: center;
    }

    @include width (mobile) {
      margin: $content-padding-mobile * -1;
      margin-top: $content-padding-mobile * 2;
      padding: $content-padding-mobile;
    }
  }

</style>
