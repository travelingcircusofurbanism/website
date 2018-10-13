<template>
  <div class="footer">
    <p>
      All content copyright Mariko Sugita, except where noted.</br>
      <a href="mailto:travelingcircusofurbanism@gmail.com">Get in touch!</a>
    </p>
    <p class="images">
      <a href="mailto:travelingcircusofurbanism@gmail.com">
        <img src="~/assets/icons/email.svg" width="30px" height="30px" />
      </a>
      <a href="https://twitter.com/tcurbanism" target="_blank">
        <img src="~/assets/icons/twitter.svg" width="25px" height="25px" />
      </a>
      <a href="https://www.facebook.com/travelingcircusofurbanism/" target="_blank">
        <img src="~/assets/icons/facebook.svg" width="25px" height="25px" />
      </a>
      <a href="https://www.travelingcircusofurbanism.com/feed.xml" target="_blank">
        <img src="~/assets/icons/rss.svg" width="25px" height="25px" />
      </a>
    </p>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/variables.scss';

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

    .images {
      & > * {
        opacity: .7;
        padding: 10px;
        transition: all .2s;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

</style>
