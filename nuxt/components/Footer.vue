<template>
  <div class="footer">
    <p class="images">
      <a href="mailto:travelingcircusofurbanism@gmail.com">
        <img src="~/assets/icons/email.svg" width="26px" height="26px" style="padding-top: 4px;" />
      </a>
      <a href="https://twitter.com/tcurbanism" target="_blank">
        <img src="~/assets/icons/twitter.svg" width="22px" height="22px" />
      </a>
      <a href="https://www.facebook.com/travelingcircusofurbanism/" target="_blank">
        <img src="~/assets/icons/facebook.svg" width="20px" height="20px" />
      </a>
      <a href="https://www.travelingcircusofurbanism.com/feed.xml" target="_blank">
        <img src="~/assets/icons/rss.svg" width="20px" height="20px" />
      </a>
    </p>
    <p>
      All content copyright Mariko Sugita, except where noted.
      <br />
      <a href="mailto:travelingcircusofurbanism@gmail.com">Get in touch!</a>
    </p>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.footer {
  grid-column: 1 / -1;
  margin: $content-padding * -1;
  margin-top: $content-padding * 2;
  color: rgba(white, 0.6);
  background: $text;
  padding: $content-padding;
  box-shadow: 0 5000vh 0 5000vh $text;

  * {
    text-align: center;
  }

  @include width(mobile) {
    margin: $content-padding-mobile * -1;
    margin-top: $content-padding-mobile * 2;
    padding: $content-padding-mobile;
  }

  .images {
    & > * {
      opacity: 0.7;
      padding: 10px;
      transition: all 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
