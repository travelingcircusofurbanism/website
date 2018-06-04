import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      mapMarkers: [],
      highlightedLocation: null
    },
    mutations: {
      setMapMarkers (state, newMarkers) {
        console.log(newMarkers)
        if (!newMarkers || newMarkers.length === 0 || Object.keys(newMarkers).length === 0) return
        state.highlightedLocation = null   
        state.mapMarkers = (newMarkers.center) ?
          // catch a single post's mapPosition object
          [{
            position: newMarkers,
            locationName: newMarkers.location
          }] :
          //or, a single post's mapPosition array
          (newMarkers[0].center) ?
            newMarkers.map(pos => ({
              position: pos,
              locationName: pos.location
            })):
            (newMarkers[0].position) ?
            // hard-coded marker data, use as-is
            newMarkers :
            // or, pull data from post objects
            newMarkers
              .map(post => (Array.isArray(post.mapPosition)) ?
                post.mapPosition.map(position => ({
                  position: { ...position },
                  locationName: position.location
                })) :
                [{
                  position: { ...post.mapPosition },
                  locationName: post.mapPosition.location
                }]
              )
              .reduce((acc, curr) => acc.concat(curr), [])
      },
      setHighlight (state, location) {
        state.highlightedLocation = location
      }
    }
  })
}