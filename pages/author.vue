<template>
  <section class="content">
    <h1 class="title">
      About the author
    </h1>
    <p>
      Hi! I'm Mariko, a city enthusiast currently traveling around the world.
      I'm a researcher, editor and writer on the urban issues, and I have been involved in the various international urban programs and initiatives all over the world.
    </p>

    <p>
      <strong>
        As an Urbanist,
      </strong>
      I'm most passionate about our cities. I’ve involved in many international educational projects like <a href="http://www.4cities.eu/" target="_blank">4CITIES</a>, <a href="https://www.urbandivercities.eu/" target="_blank">DIVERCITIES</a>, and have visited more than 120 organizations and 50 cities accross the globe for research. More specifically I’m interested in ethno-cultural diversity in our cities, and the notion of nationality and sense of belonging.
    </p>

    <p>
      <strong>
        As a project manager,
      </strong>
      Having worked in a design firm <a href="https://loftwork.com/en/" target="_blank">Loftwork</a> as a director and marketer, I organize various events and workshops in collaboration with the international organizations, such as 2 days workshop <a href="https://medium.com/digitalsocietyschool/global-goals-jam-2017-tokyo-6141f938b7d3" target="_blank">Global Goals Jam</a> and <a href="https://loftwork.com/jp/event/20170829_sgs_report" target="_blank">Social Good Summit Tokyo</a>, or more urbanism related events like <a href="https://medium.com/@mariko9012/subjective-map-workshop-shibuya-712e92d21051" target="_blank">subjective map workshop</a> and <a href="https://medium.com/@mariko9012/urbanist-meetup-tokyo-examining-the-role-of-urbanists-in-improving-urban-life-in-tokyo-df2e5bdea51a" target="_blank">urbanist meetup</a>.
    </p>

    <p>
      <strong>
        As a writer / translator,
      </strong>
        I work across the spectrum of urban design, urbanism and architecture. For the past 6 years, I’ve conducted various in depth field research/interviews across the world and have written the analytical articles and papers as a freelance writer.
    </p>

    <p>
      <strong>
        Personally,
      </strong>
      I'm a huge traveler – I’ve lived in ten different cities, in seven different countries. I’m always passionate about making my homes everywhere in the world!
    </p>
    <p>
      If you're interested in working together, or just to have a cup of coffee to know what I’m up to, please <a href="mailto:mariko9012@gmail.com">email me</a> or check out my <a href="https://www.linkedin.com/in/mariko-sugita-28327bb6/" target="_blank">LinkedIn page</a>!
    </p>

    <p class="sub">
      <i>Special thanks to <a href="http://www.jasperstephenson.com" target="_blank">Jasper Stephenson</a> for mentorship and coding help on this site!</i>
    </p>

    <Footer />
  </section>
</template>

<script>
import Footer from '~/components/Footer'
export default {
  head() { return { title: 'Author' } },
  components: { Footer, },
  mounted () {
    this.$store.commit(
      'setMapMarkers',
      [
        {
          bearing: 0,
          center: [139.69170639999993, 35.6894875],
          zoom: 1,
          pitch: 0,
          location: 'Tokyo'
        },
        {
          bearing: 0,
          center: [16.37381890000006, 48.2081743],
          zoom: 1,
          pitch: 0,
          location: 'Vienna'
        },
        {
          bearing: 0,
          center: [4.351710300000036, 50.8503396],
          zoom: 1,
          pitch: 0,
          location: 'Brussels'
        },
        {
          bearing: 0,
          center: [-3.7037901999999576, 40.4167754],
          zoom: 1,
          pitch: 0,
          location: 'Madrid'
        },
        {
          bearing: 0,
          center: [12.568337199999974, 55.6760968],
          zoom: 1,
          pitch: 0,
          location: 'Copenhagen'
        },
        {
          bearing: 0,
          center: [10.203921000000037, 56.162939],
          zoom: 1,
          pitch: 0,
          location: 'Aarhus'
        },
        {
          bearing: 0,
          center: [-95.71289100000001, 37.09024],
          zoom: 1,
          pitch: 0,
          location: 'US cities'
        },
        {
          bearing: 0,
          center: [120.9842195, 14.5995124],
          zoom: 1,
          pitch: 0,
          location: 'Manila'
        }
      ]
    )
  }
}
</script>

<style scoped lang="scss">
</style>
