import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      mapMarkers: [],
      highlightedLocation: null
    },
    mutations: {
      setMapMarkers (state, newMarkers) {
        if (!newMarkers) return
        state.highlightedLocation = null
        state.mapMarkers = newMarkers
      },
      setHighlight (state, location) {
        state.highlightedLocation = location
      }
    }
  })
}