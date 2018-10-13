import Vue from 'vue'


import '../nuxt/assets/main.scss'


import _6f6c098b from '../nuxt/layouts/default.vue'

const layouts = { "_default": _6f6c098b }



export default {
  head: {"titleTemplate":function(titleChunk) {
      return (
        (titleChunk ? titleChunk + ' | ' : '') + `Traveling Circus of Urbanism`
      )
    },"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Urban narratives and practices, collected through travel"},{"hid":"og:description","property":"og:description","content":"Urban narratives and practices, collected through travel"},{"hid":"og:type","property":"og:type","content":"website"},{"property":"og:site_name","content":"Traveling Circus of Urbanism"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Fwww.travelingcircusofurbanism.com\u002Fassets\u002Fsitethumbnail.jpg"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"script":[],"style":[]},
  render(h, props) {
    
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  methods: {
    
    
    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
    
  },
  components: {
    
  }
}
