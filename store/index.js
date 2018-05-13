import Vuex from 'vuex'

const defaultMapPosition = {
  bearing: 0,
  center: [139.905913, 35.712899],
  zoom: 8.34,
  pitch: 0
}

export default () => {
  return new Vuex.Store({
    state: {
      mapPosition: defaultMapPosition
    },
    mutations: {
      setMapPosition (state, props) {
        if (!props)
          return state.mapPosition = defaultMapPosition
        const newPosition = {}
        for (let p in props)
          newPosition[p] = props[p]
        state.mapPosition = newPosition
      }
    }
  })
}