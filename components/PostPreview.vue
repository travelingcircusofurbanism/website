<template>
  <div
    class="post-preview"
    v-on="{mouseover: mouseOver, mouseout: mouseOut}"
  >
    <nuxt-link :to="url">
      <div
        :style="{'background-image': `url('${image}')`}"
        class="previewimage"
      ></div>
    </nuxt-link>
    <div>
      <nuxt-link :to="url" class="titlelink">
        <h4>{{ title }}</h4>
      </nuxt-link>
      <p class="sub">
        {{ capitalizeFirstLetter(category) }} ・
        <span v-if="mapPosition && !Array.isArray(mapPosition) && mapPosition.location">
          <nuxt-link :to="'/at/' + mapPosition.location" class="sublink">{{ mapPosition.location }}</nuxt-link>,
        </span>
        <nuxt-link :to="'/' + city" class="sublink">{{ capitalizeFirstLetter(city) }}</nuxt-link> ・
        {{
          new Date(date)
            .toLocaleDateString('en-US',
              { year: 'numeric', month: 'long', day: 'numeric' })
        }}

      </p>
      <div>
        {{ description }}
        <nuxt-link :to="url">Keep Reading →</nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: [ 'url', 'image', 'title', 'category', 'city', 'date', 'description', 'mapPosition' ],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    capitalizeFirstLetter (s) {
      if (!s) return ''
      return s.substring(0,1).toUpperCase() + s.substring(1)
    },
    mouseOver () {
      this.$store.commit('setHighlight', this.location || this.city)
    },
    mouseOut () {
      this.$store.commit('setHighlight')
    }
  }
}

</script>

<style lang="scss" scoped>

.post-preview {
  margin-bottom: $unit * 10;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: $unit * 5;

  .previewimage {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  @include width (mid) {
    grid-template-columns: 1fr;

    .previewimage {
      height: $unit * 50;
    }
  }

  .titlelink {
    text-decoration: none;
  }
}

h4 {
  color: $text !important;
  margin-top: 0;
  margin-bottom: 12px;
}

</style>
