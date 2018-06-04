<template>
	<p class="sub">
		<nuxt-link :to="'/is/' + category.toLowerCase()" class="sublink">{{ capitalize(category) }}</nuxt-link> ・
		<span v-if="mapPosition && !Array.isArray(mapPosition) && mapPosition.location">
			<nuxt-link :to="'/at/' + mapPosition.location" class="sublink">{{ mapPosition.location }}</nuxt-link>,
		</span>
		<nuxt-link :to="'/' + city" class="sublink">{{ capitalize(city) }}</nuxt-link> ・
		{{
			new Date(date)
				.toLocaleDateString('en-US',
					{ year: 'numeric', month: 'long', day: 'numeric' })
		}}
	</p>
  </div>
</template>

<script>
import { capitalize } from '~/assets/commonFunctions.js'

export default {
  props: [ 'category', 'mapPosition', 'city', 'date', ],
  methods: {
    capitalize,
  }
}

</script>

<style lang="scss" scoped>
</style>
