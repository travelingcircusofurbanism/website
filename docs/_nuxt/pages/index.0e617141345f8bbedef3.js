webpackJsonp([1],{"/TYz":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("5Te9"),n=o("UNk/"),a=o("XyMi"),s=!1;var r=function(t){s||o("XAC0")},c=Object(a.a)(i.a,n.a,n.b,!1,r,"data-v-2a183b29",null);c.options.__file="pages/index.vue",e.default=c.exports},"/lr8":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".post-preview[data-v-a4266606]{padding-bottom:60px;display:grid;grid-template-columns:40% 1fr;grid-gap:30px}.post-preview .previewimage[data-v-a4266606]{height:100%;width:100%;background-size:cover;background-repeat:no-repeat;background-position:50%}@media (max-width:1300px){.post-preview[data-v-a4266606]{grid-template-columns:1fr}.post-preview .previewimage[data-v-a4266606]{height:300px}}@media (max-width:768px){.post-preview .previewimage[data-v-a4266606]{height:180px}}.post-preview .titlelink[data-v-a4266606]{text-decoration:none}h4[data-v-a4266606]{color:#222!important;margin-top:0;margin-bottom:12px}",""])},"0PK1":function(t,e){t.exports=[]},"1kxQ":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("pFYg"),n=o.n(i),a=void 0;function s(){if("object"===("undefined"==typeof localStorage?"undefined":n()(localStorage)))try{localStorage.setItem("localStorage",1),localStorage.removeItem("localStorage"),a=!0}catch(t){a=!1,console.log("LocalStorage is unavailable. Reverting to Cookies as a fallback.")}else a=!1}function r(t,e){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new Date;i.setTime(i.getTime()+31536e6*(o?-1:1));var n="expires="+i.toUTCString();document.cookie=t+"="+e+";"+n+";path=/"}e.default={set:function(t,e){void 0===a&&s(),a?localStorage.setItem(t,e):r(t,e)},remove:function(t){void 0===a&&s(),a?localStorage.removeItem(t):r(t,"",!0)},get:function(t){return void 0===a&&s(),a?localStorage.getItem(t):function(t){for(var e=t+"=",o=decodeURIComponent(document.cookie).split(";"),i=0;i<o.length;i++){for(var n=o[i];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(e))return n.substring(e.length,n.length)}return""}(t)}}},"1uoF":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".intro[data-v-2a183b29]{margin:-48px;margin-bottom:48px;padding:72px;background:#f6f6f3;line-height:1.4;color:#4b4939;text-align:center;font-size:19.2px;font-size:1.2rem}@media (max-width:768px){.intro[data-v-2a183b29]{margin:-18px;margin-bottom:18px;padding:27px}}",""])},"2+3J":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".selector[data-v-07a8c045]{margin-bottom:60px}.buttonlist[data-v-07a8c045]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center}.buttonlist [data-v-07a8c045]{-ms-flex-negative:0;flex-shrink:0;margin:0 6px 12px}.buttonlist .sub[data-v-07a8c045]{padding:12px 0}@media (max-width:768px){.buttonlist [data-v-07a8c045]{margin:0 3px 6px}.buttonlist .sub[data-v-07a8c045]{padding:6px 0}}",""])},"52BU":function(t,e,o){var i={"./Copenhagen.json":"W1tB","./Madrid.json":"Ssj1","./Manila.json":"qbLw","./arcosanti.json":"vNdf","./austin.json":"lVi9","./denver.json":"0PK1","./kuala lumpur.json":"K8CU","./locations.json":"Xf+a","./los angeles.json":"V4Qm","./nowhere.json":"sao2","./portland.json":"c/SV","./posts.json":"GTTH","./tokyo.json":"eGme","./vancouver.json":"SYNZ","./vienna.json":"6qk1"};function n(t){return o(a(t))}function a(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(i)},n.resolve=a,t.exports=n,n.id="52BU"},"5Te9":function(t,e,o){"use strict";var i=o("yqLL"),n=o("Envs"),a=o("l1Je"),s=o("1kxQ").default,r=s.get,c=s.set;e.a={head:function(){return{title:"Home"}},components:{Footer:i.default,PostList:n.a,CitySelector:a.a},asyncData:function(){var t=o("GTTH");return{posts:t,cityPosts:o("52BU")("./"+t[0].city+".json")}},data:function(){return{showIntro:!1}},mounted:function(){this.$store.commit("setMapMarkers",this.cityPosts),this.get("visited")||(this.showIntro=!0,this.set("visited",!0))},methods:{get:r,set:c}}},"5pgI":function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"selector"},[o("h3",{staticClass:"sectionhead"},[t._v(t._s(t.capitalize(this.type)))]),o("div",{staticClass:"buttonlist"},[t._l(t.citiesToShow,function(e,i){return o("nuxt-link",{key:i,staticClass:"button secondary",attrs:{to:"/"+e,exact:""}},[t._v("\n      "+t._s(t.capitalize(e))+"\n    ")])}),t.orderedCities.length<t.cutoff?o("div",{staticClass:"sub"},[t._v("And more to come...")]):t._e()],2),t.orderedCities.length>t.cutoff&&!t.showAll?o("div",{staticClass:"button secondary full",on:{click:function(e){t.showAll=!0}}},[t._v("\n    Show All Cities\n  ")]):t._e()])},n=[];i._withStripped=!0},"6Bn+":function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n});var i=function(){var t=this.$createElement;this._self._c;return this._m(0)},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("p",[this._v("\n     All content copyright Mariko Sugita, except where noted."),e("br"),this._v("\n     Static site built using "),e("a",{attrs:{href:"https://nuxtjs.org/guide",target:"_blank"}},[this._v("Nuxt.js")]),this._v(" and hosted with "),e("a",{attrs:{href:"https://github.com/mariko9012",target:"_blank"}},[this._v("Github Pages")]),this._v(".\n   ")])])}];i._withStripped=!0},"6qk1":function(t,e){t.exports=[{slug:"Introduction",city:"vienna",title:" Urbanism-Related Things to do and read @Vienna",description:" \n\n Things to do, places to go\n\n1. An art & cultural center in the bread factory — Brotfabrik. Perfect example for an adaptive reuse without being too touristic.\n\n2. Das Packhaus: The temporary use project...",url:"/vienna/Introduction",public:!0,date:"4/13/2015",category:"place",mapPosition:{bearing:0,center:[16.37381890000006,48.2081743],zoom:12,pitch:0},image:"/posts/vienna/Introduction/resized/jacek-dylag-579742-unsplash.jpg",languages:{en:!0,ja:!1}}]},A4bo:function(t,e,o){"use strict";var i=o("l4kH"),n=o("zNXz"),a=o("XyMi"),s=!1;var r=function(t){s||o("Jw1V")},c=Object(a.a)(i.a,n.a,n.b,!1,r,"data-v-a4266606",null);c.options.__file="components/PostPreview.vue",e.a=c.exports},ANEC:function(t,e,o){var i=o("rCfz");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o("rjj0").default)("95a67818",i,!1,{sourceMap:!1})},DgXV:function(t,e,o){"use strict";var i=o("A4bo");e.a={props:{posts:{type:Array,required:!0},perPage:{type:Number,required:!1,default:5},title:{type:String,required:!1}},components:{PostPreview:i.a},data:function(){return{shownPostCount:this.perPage}},computed:{totalPosts:function(){return this.posts.length},postsToShow:function(){return this.posts.slice(0,this.shownPostCount)}},mounted:function(){},methods:{}}},Envs:function(t,e,o){"use strict";var i=o("DgXV"),n=o("xSm0"),a=o("XyMi"),s=!1;var r=function(t){s||o("wGRZ")},c=Object(a.a)(i.a,n.a,n.b,!1,r,"data-v-5264528e",null);c.options.__file="components/PostList.vue",e.a=c.exports},GTTH:function(t,e){t.exports=[{slug:"Introduction",city:"los angeles",title:" Things to do and read for urbanists @Los Angeles",description:" \n Things to do, places/project to check out\n\n1. Downtown Los Angeles's Art Walk\n\n2. A public program that lets people to build a community parklet easily: People St program\n\n3. A 10-year economic development...",url:"/los angeles/Introduction",public:!0,date:"6/26/2018",category:"place",mapPosition:[{location:"Broadway",bearing:0,center:[-118.481293,34.0250545],zoom:12,pitch:0},{location:"Augustus F. Hawkins natural park",bearing:0,center:[-118.2464493,33.9900691],zoom:12,pitch:0},{location:"EIGHTYTWO",bearing:0,center:[-118.23744390000002,34.0454001],zoom:12,pitch:0},{location:"HAUSER & WIRTH",bearing:0,center:[-118.23487999999998,34.046146],zoom:12,pitch:0},{location:"Art Share L.A.",bearing:0,center:[-118.23640720000003,34.0445952],zoom:12,pitch:0},{location:"GALLERIES AT SCI-ARC",bearing:0,center:[-118.23289219999998,34.0450119],zoom:12,pitch:0},{location:"Hollyhock House",bearing:0,center:[-118.29440799999998,34.0999515],zoom:12,pitch:0},{location:"Ennis House",bearing:0,center:[-118.29278959999999,34.1161926],zoom:12,pitch:0},{location:"Skid Row Housing Trust",bearing:0,center:[-118.2480433,34.0434704],zoom:12,pitch:0}],image:"/posts/los angeles/Introduction/resized/losangeles02.jpg",languages:{en:!0,ja:!1}},{slug:"Seaholm_EcoDistrict",city:"austin",title:" Seaholm EcoDistrict - Austin's sustainable urban renewal",description:" \nSeaholm EcoDistrict is an 85-acre urban development on the edge of downtown - it once used to be the city-owned power plant and a water treatment facility. After the power plant was decommissioned in...",url:"/austin/Seaholm_EcoDistrict",public:!0,date:"5/31/2018",category:"place",mapPosition:{location:"Seaholm EcoDistrict",bearing:0,center:[-97.7518561,30.2660292],zoom:12,pitch:0},image:"/posts/austin/Seaholm_EcoDistrict/resized/Seaholm01.jpg",languages:{en:!0,ja:!1}},{slug:"CreativeReuse",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Creative Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/CreativeReuse",public:!0,date:"5/28/2018",category:"place",mapPosition:{location:"Austin Creative Reuse",bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0},image:"/posts/austin/CreativeReuse/resized/CreativeReuse01.jpg",languages:{en:!0,ja:!1}},{slug:"Introduction",city:"austin",title:" Urbanism-Related Things to do and read @Austin",description:" \n Things to do, places to go\n\n1. Austin’s “new urbanist enclave”, Mueller\nRead: How One City Turned Industrial Zones Into Green Enclaves\n\n2. Fostering conservation and reuse through creativity, education...",url:"/austin/Introduction",public:!0,date:"5/28/2018",category:"place",mapPosition:[{location:"Mueller",bearing:0,center:[-97.70094159999996,30.29841529999999],zoom:12,pitch:0},{location:"CRAFT",bearing:0,center:[-97.70247119999999,30.2526366],zoom:12,pitch:0},{location:"Movability",bearing:0,center:[-97.74069420000001,30.2682578],zoom:12,pitch:0},{location:"Austin Creative Reuse",bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0}],image:"/posts/austin/Introduction/resized/Austin01.jpeg",languages:{en:!0,ja:!1}},{slug:"Mueller",city:"austin",title:" Mueller - a former industrial zone to a sustainable enclave",description:"  Mueller doesn't look like anywhere else in Austin\n\nDuring my stay in Austin, I had a chance to visit a neighborhood called Mueller - Austin's 700-acre wide 'showplace' of new urbanism and enlightened...",url:"/austin/Mueller",public:!0,date:"5/28/2018",category:"place",mapPosition:{location:"Mueller",bearing:0,center:[-97.70094159999996,30.29841529999999],zoom:12,pitch:0},image:"/posts/austin/Mueller/resized/Meuller01.jpg",languages:{en:!0,ja:!1}},{slug:"Books",city:"nowhere",title:" 9 beautiful books on urban analysis and research",description:" \nThere are many great books out there on urban planning and design, but I realized not many of them quite sum up the full scope of roles of urban analysis and research. I believe that analytical process...",url:"/nowhere/Books",public:!0,date:"5/25/2018",category:"essay",image:"/posts/nowhere/Books/resized/Book01.jpg",languages:{en:!0,ja:!1}},{slug:"renovationschooltokyo",city:"tokyo",title:" What I learned at “Renovation School” in Tokyo",description:" \n\nHave you ever heard of the “Renovation School” in Japan?\n\nYou might already know that Japan is experiencing a rapid degeneration due to the declining population. This decline raises a lot of social...",url:"/tokyo/renovationschooltokyo",public:!0,date:"5/14/2018",category:"essay",mapPosition:{location:"Ikegami",bearing:0,center:[139.7029729,35.5720944],zoom:12,pitch:0},image:"/posts/tokyo/renovationschooltokyo/resized/Renovationschool01.jpg",languages:{en:!0,ja:!1}},{slug:"HackMyCity",city:"tokyo",title:" Event report: “Hack My City” — Connecting the Urban Scales from XS to XL",description:" \n\n\nIn March 2018, some of my colleagues and I had an opportunity to invite some of the most prominent practitioners in the field of urban community planning in Japan to our one-day event “Hack my City”...",url:"/tokyo/HackMyCity",public:!0,date:"3/13/2018",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*IEAJ4RS-SlSJcmKu.jpg",languages:{en:!0,ja:!1}},{slug:"alternativespot",city:"kuala lumpur",title:" 2 alternative spots to visit in Kuala Lumpur",description:" \n\nFew months ago I found this interesting website ALTERNATIVE ASIA, which introduces the interesting independent art spaces in the south east Asian countries. Most of these spaces are owned and managed...",url:"/kuala lumpur/alternativespot",public:!0,date:"2/16/2018",category:"place",mapPosition:[{location:"Fab Space",bearing:0,center:[101.711938,3.146229],zoom:12,pitch:0},{location:"APW Bangstar",bearing:0,center:[101.67408690000002,3.1243255],zoom:12,pitch:0}],image:"https://cdn-images-1.medium.com/max/8000/1*RWd-sME5koYGLTK8jrDlrA.jpeg",languages:{en:!0,ja:!1}},{slug:"urbanistmeetuptokyo",city:"tokyo",title:" Urbanist MeetUp Tokyo: Examining the role of “urbanists” in improving urban life in Tokyo",description:" \n\n\nLast year, I organized an “Urbanist Meetup Tokyo”, and this post aims to discuss the importance of interdisciplinary collaboration among the people who understand urbanity and love the cities we live...",url:"/tokyo/urbanistmeetuptokyo",public:!0,date:"12/12/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/1*KhR9gu4HI_5x8PeRTYHBdw.jpeg",languages:{en:!0,ja:!1}},{slug:"Interview Illutron",city:"Copenhagen",title:" Interview: ILLLUTRON, a maker space that moves across the Copenhagen port",description:" \n\n\nI manage to have an interview with Vanessa Carpenter— the co-founders of ILLUTRON, which is a maker space that is anchored at the port in Copenhagen, Denmark. It is a renovated 400-ton old ship and...",url:"/Copenhagen/Interview Illutron",public:!0,date:"9/26/2017",category:"interview",mapPosition:{location:"Illutron",bearing:0,center:[12.61235350000004,55.6930383],zoom:12,pitch:0},image:"/posts/Copenhagen/Interview Illutron/resized/illutron01.jpg",languages:{en:!0,ja:!1}},{slug:"globalgoalsjam17",city:"tokyo",title:" Design sprints for sustainable development goals: a recap from Global Goals Jam 2017 #Tokyo",description:" \n\n\nOn 16th-17th September 2017, I had the honor of hosting the first edition of the #GlobalGoalsJam — we invited various professionals, designers, creators, and students from more than 10 countries to...",url:"/tokyo/globalgoalsjam17",public:!0,date:"9/17/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/1000/1*K1mn1ASdXth8VQYs1zMJ_w.jpeg",languages:{en:!0,ja:!1}},{slug:"Interview ChristianDimmer",city:"tokyo",title:" Interview — Christian Dimmer, Urban Studies Prof of Waseda University",description:" \nI had a great opportunity to interview Christian Dimmer, a space / environment designer who is teaching Urbanism at Waseda University. He has been living in Tokyo for over 15 years to understand Japanese...",url:"/tokyo/Interview ChristianDimmer",public:!0,date:"11/24/2016",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*Y41HHAW-LzUp2QoP.jpg",languages:{en:!0,ja:!1}},{slug:"Introduction",city:"vienna",title:" Urbanism-Related Things to do and read @Vienna",description:" \n\n Things to do, places to go\n\n1. An art & cultural center in the bread factory — Brotfabrik. Perfect example for an adaptive reuse without being too touristic.\n\n2. Das Packhaus: The temporary use project...",url:"/vienna/Introduction",public:!0,date:"4/13/2015",category:"place",mapPosition:{bearing:0,center:[16.37381890000006,48.2081743],zoom:12,pitch:0},image:"/posts/vienna/Introduction/resized/jacek-dylag-579742-unsplash.jpg",languages:{en:!0,ja:!1}},{slug:"subjectivemapworkshop",city:"tokyo",title:" Subjective Map Workshop #Shibuya",description:" \nIn 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...",url:"/tokyo/subjectivemapworkshop",public:!0,date:"5/9/1991",category:"essay",mapPosition:{location:"Shibuya",bearing:0,center:[139.70405059999996,35.6617773],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg",languages:{en:!0,ja:!1}}]},Jw1V:function(t,e,o){var i=o("/lr8");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o("rjj0").default)("4dd0de06",i,!1,{sourceMap:!1})},K8CU:function(t,e){t.exports=[{slug:"alternativespot",city:"kuala lumpur",title:" 2 alternative spots to visit in Kuala Lumpur",description:" \n\nFew months ago I found this interesting website ALTERNATIVE ASIA, which introduces the interesting independent art spaces in the south east Asian countries. Most of these spaces are owned and managed...",url:"/kuala lumpur/alternativespot",public:!0,date:"2/16/2018",category:"place",mapPosition:[{location:"Fab Space",bearing:0,center:[101.711938,3.146229],zoom:12,pitch:0},{location:"APW Bangstar",bearing:0,center:[101.67408690000002,3.1243255],zoom:12,pitch:0}],image:"https://cdn-images-1.medium.com/max/8000/1*RWd-sME5koYGLTK8jrDlrA.jpeg",languages:{en:!0,ja:!1}}]},"MYt/":function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",{staticClass:"sub"},[o("nuxt-link",{staticClass:"sublink",attrs:{to:"/is/"+t.category.toLowerCase()}},[t._v(t._s(t.capitalize(t.category)))]),t._v(" ・\n\t\t"),t.mapPosition&&!Array.isArray(t.mapPosition)&&t.mapPosition.location?o("span",[o("nuxt-link",{staticClass:"sublink",attrs:{to:"/at/"+t.mapPosition.location.toLowerCase()}},[t._v(t._s(t.mapPosition.location))]),t._v(",\n\t\t")],1):t._e(),o("nuxt-link",{staticClass:"sublink",attrs:{to:"/"+t.city}},[t._v(t._s(t.capitalize(t.city)))]),t._v(" ・\n\t\t"+t._s(new Date(t.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}))+"\n\t")],1)},n=[];i._withStripped=!0},SYNZ:function(t,e){t.exports=[]},Ssj1:function(t,e){t.exports=[]},"UNk/":function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"content"},[t.showIntro?o("div",{staticClass:"intro"},[o("strong",[t._v("This is a blog by "),o("nuxt-link",{staticClass:"subtle",attrs:{to:"/author",exact:""}},[t._v("Mariko Sugita")]),t._v(",")],1),t._v(" city enthusiast and nomadic urban researcher. It's about urban culture, design, planning, history, spaces, and more – "),o("strong",[t._v("all about cities!")])]):t._e(),o("CitySelector"),o("PostList",{attrs:{posts:t.posts,title:"Recent Posts"}}),o("Footer")],1)},n=[];i._withStripped=!0},V4Qm:function(t,e){t.exports=[{slug:"Introduction",city:"los angeles",title:" Things to do and read for urbanists @Los Angeles",description:" \n Things to do, places/project to check out\n\n1. Downtown Los Angeles's Art Walk\n\n2. A public program that lets people to build a community parklet easily: People St program\n\n3. A 10-year economic development...",url:"/los angeles/Introduction",public:!0,date:"6/26/2018",category:"place",mapPosition:[{location:"Broadway",bearing:0,center:[-118.481293,34.0250545],zoom:12,pitch:0},{location:"Augustus F. Hawkins natural park",bearing:0,center:[-118.2464493,33.9900691],zoom:12,pitch:0},{location:"EIGHTYTWO",bearing:0,center:[-118.23744390000002,34.0454001],zoom:12,pitch:0},{location:"HAUSER & WIRTH",bearing:0,center:[-118.23487999999998,34.046146],zoom:12,pitch:0},{location:"Art Share L.A.",bearing:0,center:[-118.23640720000003,34.0445952],zoom:12,pitch:0},{location:"GALLERIES AT SCI-ARC",bearing:0,center:[-118.23289219999998,34.0450119],zoom:12,pitch:0},{location:"Hollyhock House",bearing:0,center:[-118.29440799999998,34.0999515],zoom:12,pitch:0},{location:"Ennis House",bearing:0,center:[-118.29278959999999,34.1161926],zoom:12,pitch:0},{location:"Skid Row Housing Trust",bearing:0,center:[-118.2480433,34.0434704],zoom:12,pitch:0}],image:"/posts/los angeles/Introduction/resized/losangeles02.jpg",languages:{en:!0,ja:!1}}]},W1tB:function(t,e){t.exports=[{slug:"Interview Illutron",city:"Copenhagen",title:" Interview: ILLLUTRON, a maker space that moves across the Copenhagen port",description:" \n\n\nI manage to have an interview with Vanessa Carpenter— the co-founders of ILLUTRON, which is a maker space that is anchored at the port in Copenhagen, Denmark. It is a renovated 400-ton old ship and...",url:"/Copenhagen/Interview Illutron",public:!0,date:"9/26/2017",category:"interview",mapPosition:{location:"Illutron",bearing:0,center:[12.61235350000004,55.6930383],zoom:12,pitch:0},image:"/posts/Copenhagen/Interview Illutron/resized/illutron01.jpg",languages:{en:!0,ja:!1}}]},WVck:function(t,e,o){"use strict";var i=o("fZjL"),n=o.n(i),a=o("nNrl"),s=(o.n(a),o("GTTH"));e.a={props:{hide:{required:!1,type:String},type:{required:!1,type:String,default:"cities"}},data:function(){return{showAll:!1,cutoff:10}},computed:{orderedCities:function(){var t=this,e={};return s.forEach(function(o){t.hide&&o.city.toLowerCase()===t.hide.toLowerCase()||(e[o.city]=e[o.city]?e[o.city]+1:1)}),n()(e).sort(function(t,o){return e[t]<e[o]})},citiesToShow:function(){return this.showAll?this.orderedCities:this.orderedCities.slice(0,this.cutoff)}},methods:{capitalize:a.capitalize}}},XAC0:function(t,e,o){var i=o("1uoF");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o("rjj0").default)("233dd378",i,!1,{sourceMap:!1})},"Xf+a":function(t,e){t.exports=["illutron","austin creative reuse","mueller","craft","movability","seaholm ecodistrict","fab space","apw bangstar","broadway","augustus f. hawkins natural park","eightytwo","hauser & wirth","art share l.a.","galleries at sci-arc","hollyhock house","ennis house","skid row housing trust","100banch","ikegami","shibuya"]},"c/SV":function(t,e){t.exports=[]},dRMS:function(t,e){},eGme:function(t,e){t.exports=[{slug:"renovationschooltokyo",city:"tokyo",title:" What I learned at “Renovation School” in Tokyo",description:" \n\nHave you ever heard of the “Renovation School” in Japan?\n\nYou might already know that Japan is experiencing a rapid degeneration due to the declining population. This decline raises a lot of social...",url:"/tokyo/renovationschooltokyo",public:!0,date:"5/14/2018",category:"essay",mapPosition:{location:"Ikegami",bearing:0,center:[139.7029729,35.5720944],zoom:12,pitch:0},image:"/posts/tokyo/renovationschooltokyo/resized/Renovationschool01.jpg",languages:{en:!0,ja:!1}},{slug:"HackMyCity",city:"tokyo",title:" Event report: “Hack My City” — Connecting the Urban Scales from XS to XL",description:" \n\n\nIn March 2018, some of my colleagues and I had an opportunity to invite some of the most prominent practitioners in the field of urban community planning in Japan to our one-day event “Hack my City”...",url:"/tokyo/HackMyCity",public:!0,date:"3/13/2018",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*IEAJ4RS-SlSJcmKu.jpg",languages:{en:!0,ja:!1}},{slug:"urbanistmeetuptokyo",city:"tokyo",title:" Urbanist MeetUp Tokyo: Examining the role of “urbanists” in improving urban life in Tokyo",description:" \n\n\nLast year, I organized an “Urbanist Meetup Tokyo”, and this post aims to discuss the importance of interdisciplinary collaboration among the people who understand urbanity and love the cities we live...",url:"/tokyo/urbanistmeetuptokyo",public:!0,date:"12/12/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/1*KhR9gu4HI_5x8PeRTYHBdw.jpeg",languages:{en:!0,ja:!1}},{slug:"globalgoalsjam17",city:"tokyo",title:" Design sprints for sustainable development goals: a recap from Global Goals Jam 2017 #Tokyo",description:" \n\n\nOn 16th-17th September 2017, I had the honor of hosting the first edition of the #GlobalGoalsJam — we invited various professionals, designers, creators, and students from more than 10 countries to...",url:"/tokyo/globalgoalsjam17",public:!0,date:"9/17/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/1000/1*K1mn1ASdXth8VQYs1zMJ_w.jpeg",languages:{en:!0,ja:!1}},{slug:"Interview ChristianDimmer",city:"tokyo",title:" Interview — Christian Dimmer, Urban Studies Prof of Waseda University",description:" \nI had a great opportunity to interview Christian Dimmer, a space / environment designer who is teaching Urbanism at Waseda University. He has been living in Tokyo for over 15 years to understand Japanese...",url:"/tokyo/Interview ChristianDimmer",public:!0,date:"11/24/2016",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*Y41HHAW-LzUp2QoP.jpg",languages:{en:!0,ja:!1}},{slug:"subjectivemapworkshop",city:"tokyo",title:" Subjective Map Workshop #Shibuya",description:" \nIn 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...",url:"/tokyo/subjectivemapworkshop",public:!0,date:"5/9/1991",category:"essay",mapPosition:{location:"Shibuya",bearing:0,center:[139.70405059999996,35.6617773],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg",languages:{en:!0,ja:!1}}]},l1Je:function(t,e,o){"use strict";var i=o("WVck"),n=o("5pgI"),a=o("XyMi"),s=!1;var r=function(t){s||o("zcYU")},c=Object(a.a)(i.a,n.a,n.b,!1,r,"data-v-07a8c045",null);c.options.__file="components/CitySelector.vue",e.a=c.exports},l4kH:function(t,e,o){"use strict";var i=o("nNrl"),n=(o.n(i),o("v6Qx"));e.a={props:["url","image","title","category","city","date","description","mapPosition","languages"],components:{PostDetails:n.a},computed:{currentLanguage:function(){return this.$store.state.language}},methods:{capitalize:i.capitalize,mouseOver:function(){this.$store.commit("setHighlight",this.mapPosition)},mouseOut:function(){this.$store.commit("setHighlight")}}}},lVi9:function(t,e){t.exports=[{slug:"Seaholm_EcoDistrict",city:"austin",title:" Seaholm EcoDistrict - Austin's sustainable urban renewal",description:" \nSeaholm EcoDistrict is an 85-acre urban development on the edge of downtown - it once used to be the city-owned power plant and a water treatment facility. After the power plant was decommissioned in...",url:"/austin/Seaholm_EcoDistrict",public:!0,date:"5/31/2018",category:"place",mapPosition:{location:"Seaholm EcoDistrict",bearing:0,center:[-97.7518561,30.2660292],zoom:12,pitch:0},image:"/posts/austin/Seaholm_EcoDistrict/resized/Seaholm01.jpg",languages:{en:!0,ja:!1}},{slug:"CreativeReuse",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Creative Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/CreativeReuse",public:!0,date:"5/28/2018",category:"place",mapPosition:{location:"Austin Creative Reuse",bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0},image:"/posts/austin/CreativeReuse/resized/CreativeReuse01.jpg",languages:{en:!0,ja:!1}},{slug:"Introduction",city:"austin",title:" Urbanism-Related Things to do and read @Austin",description:" \n Things to do, places to go\n\n1. Austin’s “new urbanist enclave”, Mueller\nRead: How One City Turned Industrial Zones Into Green Enclaves\n\n2. Fostering conservation and reuse through creativity, education...",url:"/austin/Introduction",public:!0,date:"5/28/2018",category:"place",mapPosition:[{location:"Mueller",bearing:0,center:[-97.70094159999996,30.29841529999999],zoom:12,pitch:0},{location:"CRAFT",bearing:0,center:[-97.70247119999999,30.2526366],zoom:12,pitch:0},{location:"Movability",bearing:0,center:[-97.74069420000001,30.2682578],zoom:12,pitch:0},{location:"Austin Creative Reuse",bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0}],image:"/posts/austin/Introduction/resized/Austin01.jpeg",languages:{en:!0,ja:!1}},{slug:"Mueller",city:"austin",title:" Mueller - a former industrial zone to a sustainable enclave",description:"  Mueller doesn't look like anywhere else in Austin\n\nDuring my stay in Austin, I had a chance to visit a neighborhood called Mueller - Austin's 700-acre wide 'showplace' of new urbanism and enlightened...",url:"/austin/Mueller",public:!0,date:"5/28/2018",category:"place",mapPosition:{location:"Mueller",bearing:0,center:[-97.70094159999996,30.29841529999999],zoom:12,pitch:0},image:"/posts/austin/Mueller/resized/Meuller01.jpg",languages:{en:!0,ja:!1}}]},msLx:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzMzcHgiIGhlaWdodD0iMjM0cHgiIHZpZXdCb3g9IjAgMCAzMzMgMjM0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4xICgzOTAxMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMzIiBoZWlnaHQ9IjIzNCI+PC9yZWN0PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ikdyb3VwIj4KICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZSI+CiAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICA8cmVjdCBzdHJva2Utb3BhY2l0eT0iMC40NDAyNDU2OTciIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLXdpZHRoPSIxMSIgeD0iNS41IiB5PSI1LjUiIHdpZHRoPSIzMjIiIGhlaWdodD0iMjIzIj48L3JlY3Q+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZGMDAwMCIgY3g9IjE2NyIgY3k9IjExNyIgcj0iNjQiPjwvY2lyY2xlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"},nNrl:function(t,e){e.capitalize=function(t){return t?t.split(" ").map(function(t){return t.substring(0,1).toUpperCase()+t.substring(1)}).join(" "):""},e.log=function(t){for(var e,o={red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m"},i=arguments.length,n=Array(i>1?i-1:0),a=1;a<i;a++)n[a-1]=arguments[a];(e=console).log.apply(e,[o[t]||o.green].concat(n,["[0m"]))}},qbLw:function(t,e){t.exports=[]},qkAE:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,"",""])},rCfz:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".footer[data-v-0d2d6594]{margin:-48px;margin-top:96px;color:#fff;background:#222;padding:48px}.footer [data-v-0d2d6594]{text-align:center}@media (max-width:768px){.footer[data-v-0d2d6594]{margin:-18px;margin-top:36px;padding:18px}}",""])},sao2:function(t,e){t.exports=[{slug:"Books",city:"nowhere",title:" 9 beautiful books on urban analysis and research",description:" \nThere are many great books out there on urban planning and design, but I realized not many of them quite sum up the full scope of roles of urban analysis and research. I believe that analytical process...",url:"/nowhere/Books",public:!0,date:"5/25/2018",category:"essay",image:"/posts/nowhere/Books/resized/Book01.jpg",languages:{en:!0,ja:!1}}]},v6Qx:function(t,e,o){"use strict";var i=o("zu5t"),n=o("MYt/"),a=o("XyMi"),s=!1;var r=function(t){s||o("xM9k")},c=Object(a.a)(i.a,n.a,n.b,!1,r,"data-v-fc85e312",null);c.options.__file="components/PostDetails.vue",e.a=c.exports},vNdf:function(t,e){t.exports=[]},wGRZ:function(t,e,o){var i=o("qkAE");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o("rjj0").default)("de2a79c2",i,!1,{sourceMap:!1})},xM9k:function(t,e,o){var i=o("y9OO");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o("rjj0").default)("dd39bdee",i,!1,{sourceMap:!1})},xSm0:function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"post-list"},[t.title?o("h3",{staticClass:"sectionhead"},[t._v(t._s(t.title))]):t._e(),t._l(t.postsToShow,function(e,i){return o("PostPreview",t._b({key:i},"PostPreview",e,!1))}),t.shownPostCount<t.totalPosts?o("div",{staticClass:"show-more button secondary full",on:{click:function(e){t.shownPostCount+=t.perPage}}},[t._v("\n\t\t\tShow more posts\n    ")]):t._e()],2)},n=[];i._withStripped=!0},y9OO:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,"",""])},yqLL:function(t,e,o){"use strict";var i=o("dRMS"),n=o.n(i),a=o("6Bn+"),s=o("XyMi"),r=!1;var c=function(t){r||o("ANEC")},l=Object(s.a)(n.a,a.a,a.b,!1,c,"data-v-0d2d6594",null);l.options.__file="components/Footer.vue",e.default=l.exports},zNXz:function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._g({staticClass:"post-preview"},{mouseover:t.mouseOver,mouseout:t.mouseOut}),[i("nuxt-link",{attrs:{to:t.url}},[i("div",{staticClass:"previewimage",style:{"background-image":"url('"+t.image+"')"}})]),i("div",[i("nuxt-link",{staticClass:"titlelink",attrs:{to:t.url}},[i("h4",[t._v(t._s(t.title))])]),"ja"===t.currentLanguage&&t.languages.ja?i("div",{staticClass:"japanese-available"},[i("img",{staticClass:"flag-icon",attrs:{src:o("msLx")}}),i("span",{staticClass:"sub"},[t._v("日本語版あり")])]):t._e(),i("PostDetails",{attrs:{category:t.category,mapPosition:t.mapPosition,city:t.city,date:t.date}}),i("div",[t._v("\n      "+t._s(t.description)+"\n      "),i("nuxt-link",{attrs:{to:t.url}},[t._v("Keep Reading →")])],1)],1)],1)},n=[];i._withStripped=!0},zcYU:function(t,e,o){var i=o("2+3J");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o("rjj0").default)("f5848e84",i,!1,{sourceMap:!1})},zu5t:function(t,e,o){"use strict";var i=o("nNrl");o.n(i);e.a={props:["category","mapPosition","city","date"],methods:{capitalize:i.capitalize}}}});