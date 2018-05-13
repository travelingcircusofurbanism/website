<template>
  <section class="content">
    <h1>{{ title }}</h1>
    <h3>
      {{ 
        new Date(date)
          .toLocaleDateString('en-US', 
            { year: 'numeric', month: 'long', day: 'numeric' })
      }}
    </h3>
    <h4>Tags: {{ tags.join(', ') }}</h4>
    <article v-html="md"></article>
    <nuxt-link exact to="/">Home</nuxt-link>
  </section>
</template>

<script>

export default {
  components: {},
  asyncData ({ route, redirect, env }) {
    const path = '/posts/' + route.path
      .replace(/\//g, '') + '/'
    let data, md
    try {
      data = require(`~/static${ path }data.js`)
      md = require(`~/static${ path }content.md`)
    } catch (e) {
      return redirect('/')
    }
    return {
      md,
      ...data,
    }
  },
  mounted () {
    // code to tell map to move to our location
    this.$store.commit('setMapPosition', this.mapPosition || {})
  }
}
</script>

<style scoped lang="scss">
</style>
