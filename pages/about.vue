<template>
  <section class="content">
    <h1 class="title">
      What is the traveling circus of urbanism?
    </h1>
    <p>
      Traveling Circus of Urbanism is a platform for other urban narratives that are collected from the world through traveling.
      This is an exploration of various urban practices with a global perspective, in a way to challenge the focus on localism and ignorance of urbanists for what is happening in the world.
    </p>
    <p>
      <strong>Travel</strong> is a way to unravel the essence of places,
      seeing them from different perspectives and revealing how <a href="https://www.unc.edu/courses/2006spring/geog/021/001/massey.pdf">they are globally connected.</a>
    </p>
    <p>
      <strong>A circus</strong> moves from a city to another, telling stories that are collected from its journey.
    </p>
    <p>
      <strong>Urbanism</strong> is about how people live in cities and interact with our urban environments. 
    </p>
    <p>
      It covers a wide range of topics such as urban design, inclusive urbanism, community development, urban art and culture,  politics and urban sustainability and more.
    </p>
    <Footer />
  </section>
</template>

<script>
import Footer from '~/components/Footer'
export default {
  head() { return { title: 'About' } },
  components: { Footer, },
  mounted () {
    this.$store.commit('setMapMarkers')
  }
}
</script>

<style scoped lang="scss">
</style>
