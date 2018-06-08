import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      mapMarkers: [],
      highlight: [],
      isMobile: true,
    },
    mutations: {
      setMapMarkers (state, newMarkers) {
        // comes in as:
        //  a mapPosition object
        //  an array of mapPostition objects
        //  a post
        //  an array of posts
        //    posts can have a mapPosition object
        //    or an array of mapPosition objects 
        state.highlight = []  
        if (!newMarkers || newMarkers.length === 0 || Object.keys(newMarkers).length === 0)
          return state.mapMarkers = [] 
        let parsedMarkers = newMarkers.center || newMarkers[0].center ?
          // we can directly use a mapPosition object or an array of mapPosition objects
          newMarkers :
          // or, pull mapPosition object or an array of mapPosition objects from posts
          Array.isArray(newMarkers) ?
            // if we have multiple posts, for each...
            newMarkers.map(post =>
                // if it's not an array of mapPositions, make it one
                Array.isArray(post.mapPosition) ?
                  post.mapPosition : [post.mapPosition]
              )
              // then smash 'em all together
              .reduce((acc, curr) => acc.concat(curr), []) :
            // otherwise, we just use it straight up.
            newMarkers.mapPosition
            
        if (!Array.isArray(parsedMarkers))
          parsedMarkers = [parsedMarkers]
        parsedMarkers = parsedMarkers.filter(m => m)
        state.mapMarkers = parsedMarkers
      },

      setHighlight (state, mapPositions) {
        // comes in as an array of mapPosition object or an array of names, or a single one of either
        if (!mapPositions) mapPositions = []
        if (!Array.isArray(mapPositions))
          mapPositions = [mapPositions]

        const parsedLocations = mapPositions
          .map(p => p.location || p)
          .filter(l => l)

        state.highlight = parsedLocations
      },

      setMobile (state, width) {
        state.isMobile = parseInt(width) <= 768
      }
    }
  })
}