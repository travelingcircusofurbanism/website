import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      allPosts: [],
      enPosts: [],
      allPublicPosts: [],
      enPublicPosts: [],
      mapMarkers: [],
      currentView: [],
      highlight: [],
      doubleHighlight: '',
      isMobile: false,
      language: 'en',
      currentCity: null,
      isDev: false,
      panMap: false,
    },

    mutations: {

      setView (state, newView) {
        // first, grab the city
        try {
          state.currentCity = newView.center || newView[0].center ?
            null :
            Array.isArray(newView) ?
              newView.reduce((acc, curr) => {
                if (acc === null) return null
                if (acc !== 'none' && acc !== curr.city)
                  return null
                else return curr.city
              }, 'none') :
              newView.city
        } catch (e) {}

        state.currentView = parseMapPositionObjectsFromAnything(newView)
      },

      setMapMarkers (state, newMarkers) {
        state.highlight = []
        state.mapMarkers = parseMapPositionObjectsFromAnything(newMarkers)
      },

      setHighlight (state, mapPositions) {
        const parsedLocations = parseLocationNames(mapPositions)
        state.highlight = parsedLocations
      },

      setDoubleHighlight(state, locationName) {
        state.doubleHighlight = locationName
      },

      setCity (state, city) {
        state.currentCity = city
      },

      setMobile (state, width) {
        const mobileBreakpoint = 768
        state.isMobile = parseInt(width) <= mobileBreakpoint
      },

      setLanguage (state, lang) {
        state.language = (lang.toLowerCase().indexOf('ja') !== -1) ? 'ja' : 'en'
        state.mapMarkers = parseMapPositionObjectsFromAnything(
          state.language === 'ja' ? 
            state.allPublicPosts :
            state.enPublicPosts
        )
      },
      
      setDev (state, isDev) {
        state.isDev = isDev
      },

      setPan (state, shouldPan) {
        state.panMap = state.isMobile ? false : shouldPan
      },

      setPosts (state, posts) {
        state.allPosts = posts
        state.allPublicPosts = posts.filter(p => p.public === true)
        state.enPosts = posts.filter(p => p.languages.en === true)
        state.enPublicPosts = posts.filter(p => p.languages.en === true && p.public === true)
      },
    },
    actions: {
      nuxtServerInit(context, { isStatic }) {
        const posts = require('~/static/generated/posts.json')
        context.commit('setPosts', posts)
        context.commit('setMapMarkers', posts.filter(p => p.public === true))
        context.commit('setDev', !isStatic)
      }
    }
  })
}

function parseLocationNames(source) {
  // comes in as an array of mapPosition object or an array of names, or a single one of either
  if (!source) source = []
  if (!Array.isArray(source))
    source = [source]
  return source
    .map(p => p.location || p)
    .filter(l => l)
}

function parseMapPositionObjectsFromAnything (source) {
  // comes in as:
  //  a mapPosition object
  //  an array of mapPostition objects
  //  a post
  //  an array of posts
  //    posts can have a mapPosition object
  //    or an array of mapPosition objects
  
  if (!source || source.length === 0 || Object.keys(source).length === 0)
    return []
  let parsedMapPositions = source.center || source[0].center ?
    // we can directly use a mapPosition object or an array of mapPosition objects
    source :
    // or, pull mapPosition object or an array of mapPosition objects from posts
    Array.isArray(source) ?
      // if we have multiple posts, for each...
      source.map(post =>
        // if it's not an array of mapPositions, make it one
        Array.isArray(post.mapPosition) ?
          post.mapPosition : [post.mapPosition]
      )
        // then smash 'em all together
        .reduce((acc, curr) => acc.concat(curr), []) :
      // otherwise, we just use it straight up.
      source.mapPosition

  if (!Array.isArray(parsedMapPositions))
    parsedMapPositions = [parsedMapPositions]
  parsedMapPositions = parsedMapPositions.filter(m => m)
  return parsedMapPositions
}