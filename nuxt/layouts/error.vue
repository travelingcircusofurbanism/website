<template>
  <div class="error-center">
    <h1>We haven't traveled there yet!</h1>
    <a class="subtle button blue" href="/">Back to home</a>
    <br />
    <div class="centered">
      <div>Or, you can check out some of our all-time favorite posts!</div>
      <EmbeddedPostPreview
        v-for="calloutPost, key in calloutPosts"
        :key="key"
        v-bind="calloutPost"
      />
    </div>
  </div>
</template>

<script>
import EmbeddedPostPreview from '~/components/EmbeddedPostPreview'
import axios from 'axios'

export default {
  props: ['error'],
  data() {
    return {
      calloutPosts: [
        {
          slug: 'subjectivemapworkshop',
          city: 'tokyo',
          title: ' Subjective Map Workshop #Shibuya',
          description:
            'In 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...',
          url: '/tokyo/subjectivemapworkshop',
          public: true,
          date: '12/9/2017',
          category: 'essay',
          mapPosition: {
            location: 'Shibuya',
            bearing: 0,
            center: [139.70405059999996, 35.6617773],
            zoom: 12,
            pitch: 0,
          },
          image:
            'https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg',
          languages: { en: true, ja: false },
        },

        {
          slug: 'theurbanistSF',
          city: 'san francisco',
          title:
            ' Walk, listen, and learn - an insight from The Urbanist San Francisco tour',
          description:
            "A few weeks ago I finally had the great opportunity to join a tour that I've been following online for a long time - The Urbanist SF, which contains some essential items for all the city lovers and urban...",
          url: '/san francisco/theurbanistSF',
          public: true,
          date: '7/19/2018',
          category: 'interview',
          mapPosition: [
            {
              location: 'Philz coffee',
              bearing: 0,
              center: [-122.41433330000001, 37.7523861],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'The Women’s Building',
              bearing: 0,
              center: [-122.4226539, 37.7615596],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Colpa press',
              bearing: 0,
              center: [-122.41727709999998, 37.7540722],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Dolores Park',
              bearing: 0,
              center: [-122.42585099999997, 37.7613424],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Birite Market',
              bearing: 0,
              center: [-122.424711, 37.761345],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Timbuk2',
              bearing: 0,
              center: [-122.41563300000001, 37.7590263],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Candi me',
              bearing: 0,
              center: [-122.41975939999998, 37.75871660000001],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Balmy Alley',
              bearing: 0,
              center: [-122.41241450000001, 37.75180280000001],
              zoom: 12,
              pitch: 0,
            },
            {
              location: 'Clarion Alley',
              bearing: 0,
              center: [-122.42079430000001, 37.7629824],
              zoom: 12,
              pitch: 0,
            },
          ],
          image: '/posts/san francisco/theurbanistSF/med/theurbanistSF01.jpg',
          languages: { en: true, ja: true },
        },

        {
          slug: 'arcosanti',
          city: 'arcosanti',
          title:
            ' Arcosanti, an experimental urban laboratory and desert “utopia”',
          description:
            'A few weeks ago I had a great opportunity to visit Arcosanti.  Soleri’s life-long pursuit of “arcology”   It felt almost surreal to visit this experimental town in the middle of nowhere - our car suddenly...',
          url: '/arcosanti/arcosanti',
          public: true,
          date: '6/27/2018',
          category: 'place',
          image: '/posts/arcosanti/arcosanti/med/arcosanti00.jpg',
          mapPosition: {
            location: 'Arcosanti',
            bearing: 0,
            center: [-112.10055469999998, 34.3425315],
            zoom: 12,
            pitch: 0,
          },
          languages: { en: true, ja: true },
        },
      ],
    }
  },
  components: { EmbeddedPostPreview },
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.centered {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: $unit * 5;
}

a.subtle.button {
  color: white !important;
  text-decoration: none;
}

.error-center {
  text-align: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $unit * 10;

  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }

  @include width(mobile) {
    padding: $unit * 2;
  }
}

.leftalign {
  text-align: left;
}
</style>
