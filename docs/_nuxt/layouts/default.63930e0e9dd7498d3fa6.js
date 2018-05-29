webpackJsonp([1],{"5zde":function(t,e,a){a("zQR9"),a("qyJz"),t.exports=a("FeBl").Array.from},"6kS2":function(t,e,a){"use strict";var n=a("E2m7"),r=a("OLK5"),i=!1;var o=function(t){i||a("czmP")},s=a("VU/8")(n.a,r.a,!1,o,"data-v-49c7631e",null);s.options.__file="components/map.vue",e.a=s.exports},AhXS:function(t,e,a){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"header"}},[e("nuxt-link",{staticClass:"logo",attrs:{exact:"",to:"/"}},[e("h1",[this._v("Traveling Circus of Urbanism")])]),e("div",{staticClass:"sublinks"},[e("nuxt-link",{attrs:{to:"/about"}},[this._v("About")]),e("nuxt-link",{attrs:{to:"/contact"}},[this._v("Contact")])],1)],1)};n._withStripped=!0;var r={render:n,staticRenderFns:[]};e.a=r},DLCH:function(t,e,a){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"master"},[e("Map"),e("Header"),e("nuxt")],1)};n._withStripped=!0;var r={render:n,staticRenderFns:[]};e.a=r},E2m7:function(t,e,a){"use strict";var n=a("Dd8w"),r=a.n(n),i=a("fZjL"),o=a.n(i),s=a("Gu7T"),c=a.n(s),u=a("gRE1"),l=a.n(u),p=a("BO1k"),f=a.n(p);e.a={data:function(){return{map:null,currentMarkers:[],ready:!1}},computed:{mapMarkers:function(){return this.$store.state.mapMarkers},highlight:function(){return this.$store.state.highlightedLocation},uniqueLocations:function(){var t={},e=!0,a=!1,n=void 0;try{for(var r,i=f()(this.mapMarkers);!(e=(r=i.next()).done);e=!0){var o=r.value,s=o.locationName?o.locationName.toLowerCase():"";t[s]||(t[s]=[]),t[s].push(o)}}catch(t){a=!0,n=t}finally{try{!e&&i.return&&i.return()}finally{if(a)throw n}}return t},markerData:function(){if(this.uniqueLocations){var t={type:"FeatureCollection",features:[]},e=!0,a=!1,n=void 0;try{for(var r,i=f()(l()(this.uniqueLocations));!(e=(r=i.next()).done);e=!0){var o=r.value;o[0].locationName&&t.features.push({type:"Feature",geometry:{type:"Point",coordinates:[o[0].position.center[0],o[0].position.center[1]]},properties:{locationName:o[0].locationName,posts:[].concat(c()(o))}})}}catch(t){a=!0,n=t}finally{try{!e&&i.return&&i.return()}finally{if(a)throw n}}return t}},mapPosition:function(){if(this.uniqueLocations&&0!==o()(this.uniqueLocations).length){if(1===this.mapMarkers.length)return this.mapMarkers[0].position;var t=0,e=0,a=0,n=l()(this.uniqueLocations),i=n.length,s=!0,c=!1,u=void 0;try{for(var p,d=f()(n);!(s=(p=d.next()).done);s=!0){var h=p.value;t+=h[0].position.center[0],e+=h[0].position.center[1],a+=h[0].position.zoom}}catch(t){c=!0,u=t}finally{try{!s&&d.return&&d.return()}finally{if(c)throw u}}var v=r()({},n[0][0].position);return v.center=[t/i,e/i],v.zoom=a/i-1,v}}},watch:{mapPosition:function(t){this.tryUpdateMap(t)},markerData:function(t){var e=this;t&&(this.currentMarkers.forEach(function(t){t.remove()}),this.currentMarkers=[],this.markerData.features.sort(function(t,e){return t.geometry.coordinates[1]<e.geometry.coordinates[1]}).forEach(function(t){var a=new mapboxgl.Popup({offset:20,closeButton:!1,location:t.properties.locationName}).setHTML("<div>"+t.properties.locationName+"</div><a onClick=\"goTo('"+t.properties.url+"')\">"+t.properties.title+"</a>"),n=document.createElement("div");n.className="marker";var r=document.createElement("div");r.className="pin";var i=document.createElement("div");i.className="text";var o=document.createTextNode(t.properties.locationName);i.appendChild(o),n.appendChild(i),n.appendChild(r);var s=new mapboxgl.Marker(n).setLngLat(t.geometry.coordinates).setPopup(a).addTo(e.map);e.currentMarkers.push(s)}))},highlight:function(t,e){var a=this.currentMarkers.find(function(t){return t._popup.options.location===e});a&&a._element.classList.remove("highlight");var n=this.currentMarkers.find(function(e){return e._popup.options.location===t});n&&n._element.classList.add("highlight")}},mounted:function(){this.ready=!0,mapboxgl.accessToken=a("blTI").key,this.tryUpdateMap(this.mapPosition)},methods:{tryUpdateMap:function(t){if(!this.ready)return setTimeout(this.tryUpdateMap,200);var e=t||{bearing:0,center:[180,0],zoom:1,pitch:0};this.map?this.map.flyTo(e):(this.map=new mapboxgl.Map(r()({container:"map",style:"mapbox://styles/mariko9012/cjh4gkzlw31mc2sqsm3l0g4rk"},e)),this.map.once("styledata",function(){return console.log("LOADED")}))}}}},E3tz:function(t,e,a){var n=a("cWjV");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("72979fbe",n,!1,{sourceMap:!1})},Gu7T:function(t,e,a){"use strict";e.__esModule=!0;var n,r=a("c/Tr"),i=(n=r)&&n.__esModule?n:{default:n};e.default=function(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return(0,i.default)(t)}},Ma2J:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("ShCn"),r=a("DLCH"),i=!1;var o=function(t){i||a("E3tz")},s=a("VU/8")(n.a,r.a,!1,o,null,null);s.options.__file="layouts/default.vue",e.default=s.exports},OLK5:function(t,e,a){"use strict";var n=function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"map"}})};n._withStripped=!0;var r={render:n,staticRenderFns:[]};e.a=r},ShCn:function(t,e,a){"use strict";var n=a("6kS2"),r=a("YXP+");e.a={components:{Map:n.a,Header:r.default}}},TmV0:function(t,e,a){a("fZOM"),t.exports=a("FeBl").Object.values},"XW+4":function(t,e,a){var n=a("quik");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("d9ea394c",n,!1,{sourceMap:!1})},"YXP+":function(t,e,a){"use strict";var n=a("bBm1"),r=a.n(n),i=a("AhXS"),o=!1;var s=function(t){o||a("XW+4")},c=a("VU/8")(r.a,i.a,!1,s,"data-v-1a9bb128",null);c.options.__file="components/Header.vue",e.default=c.exports},ZJ0h:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"#map[data-v-49c7631e]{height:120vh;position:relative;top:-10vh;background:#ddd;z-index:2}",""])},bBm1:function(t,e){},blTI:function(t,e){t.exports={key:"pk.eyJ1IjoibWFyaWtvOTAxMiIsImEiOiJjaWt0cnk4MnMwMDB2eDFtMDh1bmozZ2gwIn0.zXoiIU4RmB7jKIgBrs0Vwg"}},"c/Tr":function(t,e,a){t.exports={default:a("5zde"),__esModule:!0}},cWjV:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".master{display:-webkit-box;display:-ms-flexbox;display:flex;overflow:hidden;width:100vw;height:100vh}.master>*{-webkit-box-flex:1;-ms-flex:1;flex:1;max-width:50%;overflow:hidden}.master>:not(#map){overflow-y:auto;height:100vh}",""])},czmP:function(t,e,a){var n=a("ZJ0h");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("e2d5292e",n,!1,{sourceMap:!1})},fBQ2:function(t,e,a){"use strict";var n=a("evD5"),r=a("X8DO");t.exports=function(t,e,a){e in t?n.f(t,e,r(0,a)):t[e]=a}},fZOM:function(t,e,a){var n=a("kM2E"),r=a("mbce")(!1);n(n.S,"Object",{values:function(t){return r(t)}})},gRE1:function(t,e,a){t.exports={default:a("TmV0"),__esModule:!0}},mbce:function(t,e,a){var n=a("lktj"),r=a("TcQ7"),i=a("NpIQ").f;t.exports=function(t){return function(e){for(var a,o=r(e),s=n(o),c=s.length,u=0,l=[];c>u;)i.call(o,a=s[u++])&&l.push(t?[a,o[a]]:o[a]);return l}}},quik:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"a[data-v-1a9bb128],a[data-v-1a9bb128]:active,a[data-v-1a9bb128]:hover,a[data-v-1a9bb128]:visited{display:inline-block;color:#fff;background:#222;text-decoration:none;-webkit-transition:.2s;transition:.2s}a[data-v-1a9bb128]:hover{background:#00adcc}#header[data-v-1a9bb128]{position:fixed;display:inline-block;top:30px;left:30px;z-index:10;height:auto}.logo[data-v-1a9bb128]{text-transform:uppercase;font-family:Unica One,Raleway,sans-serif;padding:24px;font-weight:600;border-left:6px solid #00adcc}h1[data-v-1a9bb128]{font-size:32px;font-size:2rem;margin:0}.sublinks[data-v-1a9bb128]{margin-top:6px;font-weight:400}.sublinks a[data-v-1a9bb128]{padding:12px 24px;margin-right:6px}",""])},qyJz:function(t,e,a){"use strict";var n=a("+ZMJ"),r=a("kM2E"),i=a("sB3e"),o=a("msXi"),s=a("Mhyx"),c=a("QRG4"),u=a("fBQ2"),l=a("3fs2");r(r.S+r.F*!a("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var e,a,r,p,f=i(t),d="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,m=void 0!==v,y=0,b=l(f);if(m&&(v=n(v,h>2?arguments[2]:void 0,2)),void 0==b||d==Array&&s(b))for(a=new d(e=c(f.length));e>y;y++)u(a,y,m?v(f[y],y):f[y]);else for(p=b.call(f),a=new d;!(r=p.next()).done;y++)u(a,y,m?o(p,v,[r.value,y],!0):r.value);return a.length=y,a}})}});