webpackJsonp([1],{"/TYz":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("4Hms"),n=o("rGQh"),a=!1;var s=function(t){a||o("ueS4")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-2a183b29",null);r.options.__file="pages/index.vue",e.default=r.exports},"3JP0":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".post-preview[data-v-a4266606]{margin-bottom:60px;display:grid;grid-template-columns:40% 1fr;grid-gap:30px}.post-preview .previewimage[data-v-a4266606]{height:100%;width:100%;background-size:cover;background-repeat:no-repeat;background-position:50%}@media (min-width:769px) and (max-width:1300px){.post-preview[data-v-a4266606]{grid-template-columns:1fr}.post-preview .previewimage[data-v-a4266606]{height:300px}}.post-preview .titlelink[data-v-a4266606]{text-decoration:none}h4[data-v-a4266606]{color:#222!important;margin-top:0;margin-bottom:12px}",""])},"4Hms":function(t,e,o){"use strict";var i=o("Dd8w"),n=o.n(i),a=o("yqLL"),s=o("Envs"),r=o("l1Je");e.a={head:function(){return{title:"Home"}},components:{Footer:a.default,PostList:s.a,CitySelector:r.a},asyncData:function(){var t=o("GTTH");return{posts:t,cityPosts:o("52BU")("./"+t[0].city+".json")}},mounted:function(){this.$store.commit("setMapMarkers",this.cityPosts.map(function(t){return Array.isArray(t.mapPosition)?t.mapPosition.map(function(t){return{position:n()({},t),locationName:t.location}}):[{position:n()({},t.mapPosition),locationName:t.mapPosition.location}]}).reduce(function(t,e){return t.concat(e)}))}}},"4kk+":function(t,e){},"52BU":function(t,e,o){var i={"./austin.json":"lVi9","./kuala lumpur.json":"K8CU","./nowhere.json":"sao2","./posts.json":"GTTH","./tokyo.json":"eGme"};function n(t){return o(a(t))}function a(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(i)},n.resolve=a,t.exports=n,n.id="52BU"},"9mMe":function(t,e,o){var i=o("3JP0");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("700c0e53",i,!1,{sourceMap:!1})},A4bo:function(t,e,o){"use strict";var i=o("oir9"),n=o("UI3K"),a=!1;var s=function(t){a||o("9mMe")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-a4266606",null);r.options.__file="components/PostPreview.vue",e.a=r.exports},Bpw0:function(t,e,o){var i=o("RTfU");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("52077b16",i,!1,{sourceMap:!1})},Envs:function(t,e,o){"use strict";var i=o("f3rP"),n=o("KNuT"),a=!1;var s=function(t){a||o("Znol")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-5264528e",null);r.options.__file="components/PostList.vue",e.a=r.exports},GTTH:function(t,e){t.exports=[{slug:"Seaholm_EcoDistrict",city:"austin",title:" Seaholm EcoDistrict - Austin's sustainable urban renewal",description:" \nSeaholm EcoDistrict is an 85-acre urban development on the edge of downtown - it once used to be the city-owned power plant and a water treatment facility. After the power plant was decommissioned in...",url:"/austin/Seaholm_EcoDistrict",date:"5/31/2018",category:"place",mapPosition:{location:"Seaholm EcoDistrict",bearing:0,center:[-97.7518561,30.2660292],zoom:12,pitch:0},image:"/posts/austin/Seaholm_EcoDistrict/resized/Seaholm01.jpg"},{slug:"CreativeReuse",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Creative Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/CreativeReuse",date:"5/28/2018",category:"place",mapPosition:{location:"Austin Creative Reuse",bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0},image:"/posts/austin/CreativeReuse/resized/CreativeReuse01.jpg"},{slug:"Introduction",city:"austin",title:" Urbanism-Related Things to do and read @Austin",description:" \n Things to do, places to go\n\n1. Austin’s “new urbanist enclave”, Mueller\nRead: How One City Turned Industrial Zones Into Green Enclaves\n\n1. Fostering conservation and reuse through creativity, education...",url:"/austin/Introduction",date:"5/28/2018",category:"place",mapPosition:{bearing:0,center:[-97.74306079999997,30.267153],zoom:12,pitch:0},image:"/posts/austin/Introduction/resized/Austin01.jpeg"},{slug:"Books",city:"nowhere",title:" 9 beautiful books on urban analysis and research",description:" \nThere are many great books out there on urban planning and design, but I realized not many of them quite sum up the full scope of roles of urban analysis and research. I believe that analytical process...",url:"/nowhere/Books",date:"5/25/2018",category:"essay",image:"/posts/nowhere/Books/resized/Book01.jpg"},{slug:"renovationschooltokyo",city:"tokyo",title:" What I learned at “Renovation School” in Tokyo",description:" \n\nHave you ever heard of the “Renovation School” in Japan?\n\nYou might already know that Japan is experiencing a rapid degeneration due to the declining population. This decline raises a lot of social...",url:"/tokyo/renovationschooltokyo",date:"5/14/2018",category:"essay",mapPosition:{location:"Ikegami",bearing:0,center:[139.7029729,35.5720944],zoom:12,pitch:0},image:"/posts/tokyo/renovationschooltokyo/resized/Renovationschool01.jpg"},{slug:"HackMyCity",city:"tokyo",title:" Event report: “Hack My City” — Connecting the Urban Scales from XS to XL",description:" \n\n\nIn March 2018, some of my colleagues and I had an opportunity to invite some of the most prominent practitioners in the field of urban community planning in Japan to our one-day event “Hack my City”...",url:"/tokyo/HackMyCity",date:"3/13/2018",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*IEAJ4RS-SlSJcmKu.jpg"},{slug:"alternativespot",city:"kuala lumpur",title:" 2 alternative spots to visit in Kuala Lumpur",description:" \n\nFew months ago I found this interesting website ALTERNATIVE ASIA, which introduces the interesting independent art spaces in the south east Asian countries. Most of these spaces are owned and managed...",url:"/kuala lumpur/alternativespot",date:"2/16/2018",category:"place",mapPosition:[{location:"Fab Space",bearing:0,center:[101.711938,3.146229],zoom:12,pitch:0},{location:"Test 2nd Location",bearing:0,center:[101.722938,3.176229],zoom:12,pitch:0}],image:"https://cdn-images-1.medium.com/max/8000/1*RWd-sME5koYGLTK8jrDlrA.jpeg"},{slug:"urbanistmeetuptokyo",city:"tokyo",title:" Urbanist MeetUp Tokyo: Examining the role of “urbanists” in improving urban life in Tokyo",description:" \n\n\nLast year, I organized an “Urbanist Meetup Tokyo”, and this post aims to discuss the importance of interdisciplinary collaboration among the people who understand urbanity and love the cities we live...",url:"/tokyo/urbanistmeetuptokyo",date:"12/12/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/1*KhR9gu4HI_5x8PeRTYHBdw.jpeg"},{slug:"globalgoalsjam17",city:"tokyo",title:" Design sprints for sustainable development goals: a recap from Global Goals Jam 2017 #Tokyo",description:" \n\n\nOn 16th-17th September 2017, I had the honor of hosting the first edition of the #GlobalGoalsJam — we invited various professionals, designers, creators, and students from more than 10 countries to...",url:"/tokyo/globalgoalsjam17",date:"9/17/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/1000/1*K1mn1ASdXth8VQYs1zMJ_w.jpeg"},{slug:"subjectivemapworkshop",city:"tokyo",title:" Subjective Map Workshop #Shibuya",description:" \nIn 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...",url:"/tokyo/subjectivemapworkshop",date:"5/9/1991",category:"essay",mapPosition:{location:"Shibuya",bearing:0,center:[139.70405059999996,35.6617773],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg"}]},K8CU:function(t,e){t.exports=[{slug:"alternativespot",city:"kuala lumpur",title:" 2 alternative spots to visit in Kuala Lumpur",description:" \n\nFew months ago I found this interesting website ALTERNATIVE ASIA, which introduces the interesting independent art spaces in the south east Asian countries. Most of these spaces are owned and managed...",url:"/kuala lumpur/alternativespot",date:"2/16/2018",category:"place",mapPosition:[{location:"Fab Space",bearing:0,center:[101.711938,3.146229],zoom:12,pitch:0},{location:"Test 2nd Location",bearing:0,center:[101.722938,3.176229],zoom:12,pitch:0}],image:"https://cdn-images-1.medium.com/max/8000/1*RWd-sME5koYGLTK8jrDlrA.jpeg"}]},KNuT:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"post-list"},[t.title?o("h3",{staticClass:"sectionhead"},[t._v(t._s(t.title))]):t._e(),t._l(t.postsToShow,function(e,i){return o("PostPreview",t._b({key:i},"PostPreview",e,!1))}),t.shownPostCount<t.totalPosts?o("div",{staticClass:"show-more button secondary full",on:{click:function(e){t.shownPostCount+=t.perPage}}},[t._v("\n\t\t\tShow more posts\n    ")]):t._e()],2)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},OvtY:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"selector"},[o("h3",{staticClass:"sectionhead"},[t._v("Cities")]),o("div",{staticClass:"buttonlist"},[t._l(t.citiesToShow,function(e,i){return o("nuxt-link",{key:i,staticClass:"button secondary",attrs:{to:"/"+e,exact:""}},[t._v("\n      "+t._s(t.capitalizeFirstLetter(e))+"\n    ")])}),t.orderedCities.length<t.cutoff?o("div",{staticClass:"sub"},[t._v("And more to come...")]):t._e()],2),t.orderedCities.length>t.cutoff&&!t.showAll?o("div",{staticClass:"button secondary full",on:{click:function(e){t.showAll=!0}}},[t._v("\n    Show All Cities\n  ")]):t._e()])};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},Q82M:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,"",""])},RTfU:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".selector[data-v-07a8c045]{margin-bottom:60px}.buttonlist[data-v-07a8c045]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center}.buttonlist [data-v-07a8c045]{-ms-flex-negative:0;flex-shrink:0;margin:0 12px 12px}.buttonlist .sub[data-v-07a8c045]{padding:12px 0}",""])},RzvT:function(t,e,o){"use strict";var i=function(){var t=this.$createElement;this._self._c;return this._m(0)};i._withStripped=!0;var n={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("p",[this._v("\n     All content copyright Mariko Sugita, except where noted."),e("br"),this._v("\n     Static site built using "),e("a",{attrs:{href:"https://nuxtjs.org/guide",target:"_blank"}},[this._v("Nuxt.js")]),this._v(" and hosted with "),e("a",{attrs:{href:"https://github.com/mariko9012",target:"_blank"}},[this._v("Github Pages")]),this._v(".\n   ")])])}]};e.a=n},UI3K:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",t._g({staticClass:"post-preview"},{mouseover:t.mouseOver,mouseout:t.mouseOut}),[o("nuxt-link",{attrs:{to:t.url}},[o("div",{staticClass:"previewimage",style:{"background-image":"url('"+t.image+"')"}})]),o("div",[o("nuxt-link",{staticClass:"titlelink",attrs:{to:t.url}},[o("h4",[t._v(t._s(t.title))])]),o("p",{staticClass:"sub"},[t._v("\n      "+t._s(t.capitalizeFirstLetter(t.category))+" ・\n      "),t.mapPosition&&!Array.isArray(t.mapPosition)&&t.mapPosition.location?o("span",[o("nuxt-link",{staticClass:"sublink",attrs:{to:"/at/"+t.mapPosition.location}},[t._v(t._s(t.mapPosition.location))]),t._v(",\n      ")],1):t._e(),o("nuxt-link",{staticClass:"sublink",attrs:{to:"/"+t.city}},[t._v(t._s(t.capitalizeFirstLetter(t.city)))]),t._v(" ・\n      "+t._s(new Date(t.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}))+"\n\n    ")],1),o("div",[t._v("\n      "+t._s(t.description)+"\n      "),o("nuxt-link",{attrs:{to:t.url}},[t._v("Keep Reading →")])],1)],1)],1)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},WDZH:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".footer[data-v-0d2d6594]{margin:-48px;margin-top:96px;color:#fff;background:#222;padding:48px}.footer [data-v-0d2d6594]{text-align:center}",""])},Znol:function(t,e,o){var i=o("Q82M");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("6ad23925",i,!1,{sourceMap:!1})},bxC5:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,"",""])},d2tF:function(t,e,o){var i=o("WDZH");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("7a204aa4",i,!1,{sourceMap:!1})},eGme:function(t,e){t.exports=[{slug:"renovationschooltokyo",city:"tokyo",title:" What I learned at “Renovation School” in Tokyo",description:" \n\nHave you ever heard of the “Renovation School” in Japan?\n\nYou might already know that Japan is experiencing a rapid degeneration due to the declining population. This decline raises a lot of social...",url:"/tokyo/renovationschooltokyo",date:"5/14/2018",category:"essay",mapPosition:{location:"Ikegami",bearing:0,center:[139.7029729,35.5720944],zoom:12,pitch:0},image:"/posts/tokyo/renovationschooltokyo/resized/Renovationschool01.jpg"},{slug:"HackMyCity",city:"tokyo",title:" Event report: “Hack My City” — Connecting the Urban Scales from XS to XL",description:" \n\n\nIn March 2018, some of my colleagues and I had an opportunity to invite some of the most prominent practitioners in the field of urban community planning in Japan to our one-day event “Hack my City”...",url:"/tokyo/HackMyCity",date:"3/13/2018",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*IEAJ4RS-SlSJcmKu.jpg"},{slug:"urbanistmeetuptokyo",city:"tokyo",title:" Urbanist MeetUp Tokyo: Examining the role of “urbanists” in improving urban life in Tokyo",description:" \n\n\nLast year, I organized an “Urbanist Meetup Tokyo”, and this post aims to discuss the importance of interdisciplinary collaboration among the people who understand urbanity and love the cities we live...",url:"/tokyo/urbanistmeetuptokyo",date:"12/12/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/1*KhR9gu4HI_5x8PeRTYHBdw.jpeg"},{slug:"globalgoalsjam17",city:"tokyo",title:" Design sprints for sustainable development goals: a recap from Global Goals Jam 2017 #Tokyo",description:" \n\n\nOn 16th-17th September 2017, I had the honor of hosting the first edition of the #GlobalGoalsJam — we invited various professionals, designers, creators, and students from more than 10 countries to...",url:"/tokyo/globalgoalsjam17",date:"9/17/2017",category:"essay",mapPosition:{location:"100Banch",bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/1000/1*K1mn1ASdXth8VQYs1zMJ_w.jpeg"},{slug:"subjectivemapworkshop",city:"tokyo",title:" Subjective Map Workshop #Shibuya",description:" \nIn 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...",url:"/tokyo/subjectivemapworkshop",date:"5/9/1991",category:"essay",mapPosition:{location:"Shibuya",bearing:0,center:[139.70405059999996,35.6617773],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg"}]},f3rP:function(t,e,o){"use strict";var i=o("A4bo");e.a={props:{posts:{type:Array,required:!0},perPage:{type:Number,required:!1,default:5},title:{type:String,required:!1}},components:{PostPreview:i.a},data:function(){return{shownPostCount:this.perPage}},computed:{totalPosts:function(){return this.posts.length},postsToShow:function(){return this.posts.slice(0,this.shownPostCount)}},mounted:function(){},methods:{}}},l1Je:function(t,e,o){"use strict";var i=o("y3eQ"),n=o("OvtY"),a=!1;var s=function(t){a||o("Bpw0")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-07a8c045",null);r.options.__file="components/CitySelector.vue",e.a=r.exports},lVi9:function(t,e){t.exports=[{slug:"Seaholm_EcoDistrict",city:"austin",title:" Seaholm EcoDistrict - Austin's sustainable urban renewal",description:" \nSeaholm EcoDistrict is an 85-acre urban development on the edge of downtown - it once used to be the city-owned power plant and a water treatment facility. After the power plant was decommissioned in...",url:"/austin/Seaholm_EcoDistrict",date:"5/31/2018",category:"place",mapPosition:{location:"Seaholm EcoDistrict",bearing:0,center:[-97.7518561,30.2660292],zoom:12,pitch:0},image:"/posts/austin/Seaholm_EcoDistrict/resized/Seaholm01.jpg"},{slug:"CreativeReuse",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Creative Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/CreativeReuse",date:"5/28/2018",category:"place",mapPosition:{location:"Austin Creative Reuse",bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0},image:"/posts/austin/CreativeReuse/resized/CreativeReuse01.jpg"},{slug:"Introduction",city:"austin",title:" Urbanism-Related Things to do and read @Austin",description:" \n Things to do, places to go\n\n1. Austin’s “new urbanist enclave”, Mueller\nRead: How One City Turned Industrial Zones Into Green Enclaves\n\n1. Fostering conservation and reuse through creativity, education...",url:"/austin/Introduction",date:"5/28/2018",category:"place",mapPosition:{bearing:0,center:[-97.74306079999997,30.267153],zoom:12,pitch:0},image:"/posts/austin/Introduction/resized/Austin01.jpeg"}]},oir9:function(t,e,o){"use strict";e.a={props:["url","image","title","category","city","date","description","mapPosition"],data:function(){return{}},computed:{},mounted:function(){},methods:{capitalizeFirstLetter:function(t){return t?t.substring(0,1).toUpperCase()+t.substring(1):""},mouseOver:function(){this.$store.commit("setHighlight",this.location||this.city)},mouseOut:function(){this.$store.commit("setHighlight")}}}},rGQh:function(t,e,o){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content"},[e("CitySelector"),e("PostList",{attrs:{posts:this.posts,title:"Recent Posts"}}),e("Footer")],1)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},sao2:function(t,e){t.exports=[{slug:"Books",city:"nowhere",title:" 9 beautiful books on urban analysis and research",description:" \nThere are many great books out there on urban planning and design, but I realized not many of them quite sum up the full scope of roles of urban analysis and research. I believe that analytical process...",url:"/nowhere/Books",date:"5/25/2018",category:"essay",image:"/posts/nowhere/Books/resized/Book01.jpg"}]},ueS4:function(t,e,o){var i=o("bxC5");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("00e7476c",i,!1,{sourceMap:!1})},y3eQ:function(t,e,o){"use strict";var i=o("fZjL"),n=o.n(i),a=o("GTTH");e.a={props:{hide:{required:!1,type:String}},data:function(){return{showAll:!1,cutoff:10}},computed:{orderedCities:function(){var t=this,e={};return a.forEach(function(o){t.hide&&o.city.toLowerCase()===t.hide.toLowerCase()||(e[o.city]=e[o.city]?e[o.city]+1:1)}),n()(e).sort(function(t,o){return e[t]<e[o]})},citiesToShow:function(){return this.showAll?this.orderedCities:this.orderedCities.slice(0,this.cutoff)}},methods:{capitalizeFirstLetter:function(t){return t?t.substring(0,1).toUpperCase()+t.substring(1):""}}}},yqLL:function(t,e,o){"use strict";var i=o("4kk+"),n=o.n(i),a=o("RzvT"),s=!1;var r=function(t){s||o("d2tF")},c=o("VU/8")(n.a,a.a,!1,r,"data-v-0d2d6594",null);c.options.__file="components/Footer.vue",e.default=c.exports}});