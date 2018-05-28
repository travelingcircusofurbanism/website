<template>
  <div
    class="post-preview"
    v-on="{mouseover: mouseOver, mouseout: mouseOut}"
  >
    <nuxt-link :to="url">
      <img :src="image" />
    </nuxt-link>
    <div>
      <nuxt-link :to="url">
        <h4>{{ title }}</h4>
      </nuxt-link>
      <p class="sub">
        {{ capitalizeFirstLetter(category) }} ・ 
        {{ location }},  
        <nuxt-link :to="'/' + city">{{ capitalizeFirstLetter(city) }}</nuxt-link> ・ 
        {{ 
          new Date(date)
            .toLocaleDateString('en-US', 
              { year: 'numeric', month: 'long', day: 'numeric' })
        }}

      </p>
      <div>{{ description + '...' }}</div>
    </div>
  </div>
</template>


<script>

export default {
  props: [ 'url', 'image', 'title', 'category', 'city', 'date', 'description', 'location' ],
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
      this.$store.commit('setHighlight', this.location)
    },
    mouseOut () {
      this.$store.commit('setHighlight')
    }
  }
}

</script>

<style lang="scss" scoped>

.post-preview {
  padding-bottom: $unit * 10;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: $unit * 5;

  @include width (mid) {
    grid-template-columns: 1fr;
    
    img {
      max-height: $unit * 50;
      display: block;
      width: auto;
      margin: 0 auto;
    }
  }

  & a {
    text-decoration: none;
  }
}

h4 {
  color: $text !important;
  margin-top: 0;
  margin-bottom: 12px;

  &:hover {
    text-decoration: underline;
  }
}

img {
  width: 100%;
}

</style>
