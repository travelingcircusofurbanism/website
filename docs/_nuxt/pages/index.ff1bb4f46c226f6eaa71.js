webpackJsonp([1],{"/TYz":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("4Hms"),n=o("rGQh"),a=!1;var s=function(t){a||o("ueS4")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-2a183b29",null);r.options.__file="pages/index.vue",e.default=r.exports},"0FtT":function(t,e){t.exports=[{slug:"Books",city:"nowhere",title:" 9 beautiful books on urban analysis and research",description:" \nThere are many great books out there on urban planning and design, but I realized not many of them quite sum up the full scope of roles of urban analysis and research. I believe that analytical process...",url:"/nowhere/Books",date:"5/25/2018",location:"",category:"essay",image:"/posts/nowhere/Books/Book01.jpg"}]},"3JP0":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".post-preview[data-v-a4266606]{padding-bottom:60px;display:grid;grid-template-columns:40% 1fr;grid-gap:30px}.post-preview .previewimage[data-v-a4266606]{height:100%;width:100%;background-size:cover;background-repeat:no-repeat;background-position:50%}@media (min-width:769px) and (max-width:1300px){.post-preview[data-v-a4266606]{grid-template-columns:1fr}.post-preview .previewimage[data-v-a4266606]{height:300px}}.post-preview .titlelink[data-v-a4266606]{text-decoration:none}h4[data-v-a4266606]{color:#222!important;margin-top:0;margin-bottom:12px}",""])},"4Hms":function(t,e,o){"use strict";var i=o("yqLL"),n=o("Envs"),a=o("l1Je");e.a={head:function(){return{title:"Home"}},components:{Footer:i.default,PostList:n.a,CitySelector:a.a},asyncData:function(){var t=o("c8Z6");return{posts:t,cityPosts:o("ojeH")("./"+t[0].city+".json")}},computed:{shownPosts:function(){return this.posts}},mounted:function(){this.$store.commit("setMapMarkers",this.cityPosts.map(function(t){return{position:t.mapPosition,locationName:t.location,title:t.title,url:t.url}}))}}},"4gBP":function(t,e){t.exports=[]},"4kk+":function(t,e){},"9mMe":function(t,e,o){var i=o("3JP0");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("700c0e53",i,!1,{sourceMap:!1})},A4bo:function(t,e,o){"use strict";var i=o("oir9"),n=o("UI3K"),a=!1;var s=function(t){a||o("9mMe")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-a4266606",null);r.options.__file="components/PostPreview.vue",e.a=r.exports},Bpw0:function(t,e,o){var i=o("RTfU");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("52077b16",i,!1,{sourceMap:!1})},DFPz:function(t,e){t.exports=[]},Envs:function(t,e,o){"use strict";var i=o("f3rP"),n=o("KNuT"),a=!1;var s=function(t){a||o("Znol")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-5264528e",null);r.options.__file="components/PostList.vue",e.a=r.exports},KNuT:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"post-list"},[t.title?o("h3",{staticClass:"sectionhead"},[t._v(t._s(t.title))]):t._e(),t._l(t.postsToShow,function(e,i){return o("PostPreview",t._b({key:i},"PostPreview",e,!1))}),t.shownPostCount<t.totalPosts?o("div",{staticClass:"show-more button secondary full",on:{click:function(e){t.shownPostCount+=t.perPage}}},[t._v("\n\t\t\tShow more posts\n    ")]):t._e()],2)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},OvtY:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"selector"},[o("h3",{staticClass:"sectionhead"},[t._v("Places")]),o("div",{staticClass:"buttonlist"},[t._l(t.citiesToShow,function(e,i){return o("nuxt-link",{key:i,staticClass:"button secondary",attrs:{to:"/"+e,exact:""}},[t._v("\n      "+t._s(t.capitalizeFirstLetter(e))+"\n    ")])}),t.orderedCities.length<t.cutoff?o("div",{staticClass:"sub"},[t._v("And more to come...")]):t._e()],2),t.orderedCities.length>t.cutoff&&!t.showAll?o("div",{staticClass:"button secondary full",on:{click:function(e){t.showAll=!0}}},[t._v("\n    Show All Places\n  ")]):t._e()])};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},Q82M:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".post-preview[data-v-5264528e]{padding-bottom:60px;display:grid;grid-template-columns:40% 1fr;grid-gap:30px}@media (min-width:769px) and (max-width:1300px){.post-preview[data-v-5264528e]{grid-template-columns:1fr}.post-preview img[data-v-5264528e]{max-height:300px;display:block;width:auto;margin:0 auto}}.post-preview a[data-v-5264528e]{text-decoration:none}.post-preview .sublink[data-v-5264528e]{text-decoration:underline}h4[data-v-5264528e]{color:#222!important;margin-top:0;margin-bottom:12px}img[data-v-5264528e]{width:100%}",""])},QdRn:function(t,e){t.exports=[{slug:"renovationschooltokyo",city:"tokyo",title:" What I learned at “Renovation School” in Tokyo",description:" \n\nHave you ever heard of the “Renovation School” in Japan?\n\nYou might already know that Japan is experiencing a rapid degeneration due to the declining population. This decline raises a lot of social...",url:"/tokyo/renovationschooltokyo",date:"5/14/2018",location:"Ikegami",category:"essay",mapPosition:{bearing:0,center:[139.7029729,35.5720944],zoom:12,pitch:0},image:"/posts/tokyo/renovationschooltokyo/Renovationschool01.jpg"},{slug:"HackMyCity",city:"tokyo",title:" Event report: “Hack My City” — Connecting the Urban Scales from XS to XL",description:" \n\n\nIn March 2018, some of my colleagues and I had an opportunity to invite some of the most prominent practitioners in the field of urban community planning in Japan to our one-day event “Hack my City”...",url:"/tokyo/HackMyCity",date:"3/13/2018",location:"100Banch",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*IEAJ4RS-SlSJcmKu.jpg"},{slug:"urbanistmeetuptokyo",city:"tokyo",title:" Urbanist MeetUp Tokyo: Examining the role of “urbanists” in improving urban life in Tokyo",description:" \n\n\nLast year, I organized an “Urbanist Meetup Tokyo”, and this post aims to discuss the importance of interdisciplinary collaboration among the people who understand urbanity and love the cities we live...",url:"/tokyo/urbanistmeetuptokyo",date:"12/12/2017",location:"100Banch",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/1*KhR9gu4HI_5x8PeRTYHBdw.jpeg"},{slug:"globalgoalsjam17",city:"tokyo",title:" Design sprints for sustainable development goals: a recap from Global Goals Jam 2017 #Tokyo",description:" \n\n\nOn 16th-17th September 2017, I had the honor of hosting the first edition of the #GlobalGoalsJam — we invited various professionals, designers, creators, and students from more than 10 countries to...",url:"/tokyo/globalgoalsjam17",date:"9/17/2017",location:"100Banch",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/1000/1*K1mn1ASdXth8VQYs1zMJ_w.jpeg"},{slug:"subjectivemapworkshop",city:"tokyo",title:" Subjective Map Workshop #Shibuya",description:" \nIn 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...",url:"/tokyo/subjectivemapworkshop",date:"5/9/1991",location:"Shibuya",category:"essay",mapPosition:{bearing:0,center:[139.70405059999996,35.6617773],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg"}]},RTfU:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".selector[data-v-07a8c045]{margin-bottom:60px}.buttonlist[data-v-07a8c045]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center}.buttonlist [data-v-07a8c045]{-ms-flex-negative:0;flex-shrink:0;margin:0 12px 12px}.buttonlist .sub[data-v-07a8c045]{padding:12px 0}",""])},RzvT:function(t,e,o){"use strict";var i=function(){var t=this.$createElement;this._self._c;return this._m(0)};i._withStripped=!0;var n={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("p",[this._v("\n     All content copyright Mariko Sugita, except where noted."),e("br"),this._v("\n     Static site built using "),e("a",{attrs:{href:"https://nuxtjs.org/guide",target:"_blank"}},[this._v("Nuxt.js")]),this._v(" and hosted with "),e("a",{attrs:{href:"https://github.com/mariko9012",target:"_blank"}},[this._v("Github Pages")]),this._v(".\n   ")])])}]};e.a=n},UI3K:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",t._g({staticClass:"post-preview"},{mouseover:t.mouseOver,mouseout:t.mouseOut}),[o("nuxt-link",{attrs:{to:t.url}},[o("div",{staticClass:"previewimage",style:{"background-image":"url('"+t.image+"')"}})]),o("div",[o("nuxt-link",{staticClass:"titlelink",attrs:{to:t.url}},[o("h4",[t._v(t._s(t.title))])]),o("p",{staticClass:"sub"},[t._v("\n      "+t._s(t.capitalizeFirstLetter(t.category))+" ・\n      "),t.location?o("span",[o("nuxt-link",{staticClass:"sublink",attrs:{to:"/at/"+t.location}},[t._v(t._s(t.location))]),t._v(",\n      ")],1):t._e(),o("nuxt-link",{staticClass:"sublink",attrs:{to:"/"+t.city}},[t._v(t._s(t.capitalizeFirstLetter(t.city)))]),t._v(" ・\n      "+t._s(new Date(t.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}))+"\n\n    ")],1),o("div",[t._v("\n      "+t._s(t.description)+"\n      "),o("nuxt-link",{attrs:{to:t.url}},[t._v("Keep Reading →")])],1)],1)],1)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},WDZH:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".footer[data-v-0d2d6594]{margin:-48px;margin-top:96px;color:#fff;background:#222;padding:48px}.footer [data-v-0d2d6594]{text-align:center}",""])},ZQff:function(t,e){t.exports=[{slug:"Seaholm_EcoDistrict",city:"austin",title:" Seaholm EcoDistrict - Austin's sustainable urban renewal",description:" \nSeaholm EcoDistrict is an 85-acre urban development on the edge of downtown - it once used to be the city-owned power plant and a water treatment facility. After the power plant was decommissioned in...",url:"/austin/Seaholm_EcoDistrict",date:"5/31/2018",location:"Seaholm EcoDistrict",category:"place",mapPosition:{bearing:0,center:[-97.7518561,30.2660292],zoom:12,pitch:0},image:"/posts/austin/Seaholm_EcoDistrict/Seaholm01.jpg"},{slug:"CreativeReuse",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Create Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/CreativeReuse",date:"5/28/2018",location:"Austin Creative Reuse",category:"place",mapPosition:{bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0},image:"/posts/austin/CreativeReuse/CreativeReuse01.jpg"},{slug:"Introduction",city:"austin",title:" Urbanism-Related Things to do and read @Austin",description:" \n Things to do, places to go\n\n1. Austin’s “new urbanist enclave”, Mueller\nRead: How One City Turned Industrial Zones Into Green Enclaves\n\n1. Fostering conservation and reuse through creativity, education...",url:"/austin/Introduction",date:"5/28/2018",location:"",category:"place",mapPosition:{bearing:0,center:[-97.74306079999997,30.267153],zoom:12,pitch:0},image:"/posts/austin/Introduction/Austin01.jpeg"},{slug:"Mueller",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Create Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/Mueller",date:"5/28/2018",location:"Mueller",category:"place",mapPosition:{bearing:0,center:[-97.70094159999996,30.29841529999999],zoom:12,pitch:0},image:"/posts/austin/Mueller/"}]},Znol:function(t,e,o){var i=o("Q82M");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("6ad23925",i,!1,{sourceMap:!1})},bxC5:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,"",""])},c8Z6:function(t,e){t.exports=[{slug:"Seaholm_EcoDistrict",city:"austin",title:" Seaholm EcoDistrict - Austin's sustainable urban renewal",description:" \nSeaholm EcoDistrict is an 85-acre urban development on the edge of downtown - it once used to be the city-owned power plant and a water treatment facility. After the power plant was decommissioned in...",url:"/austin/Seaholm_EcoDistrict",date:"5/31/2018",location:"Seaholm EcoDistrict",category:"place",mapPosition:{bearing:0,center:[-97.7518561,30.2660292],zoom:12,pitch:0},image:"/posts/austin/Seaholm_EcoDistrict/Seaholm01.jpg"},{slug:"CreativeReuse",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Create Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/CreativeReuse",date:"5/28/2018",location:"Austin Creative Reuse",category:"place",mapPosition:{bearing:0,center:[-97.708143,30.3266615],zoom:12,pitch:0},image:"/posts/austin/CreativeReuse/CreativeReuse01.jpg"},{slug:"Introduction",city:"austin",title:" Urbanism-Related Things to do and read @Austin",description:" \n Things to do, places to go\n\n1. Austin’s “new urbanist enclave”, Mueller\nRead: How One City Turned Industrial Zones Into Green Enclaves\n\n1. Fostering conservation and reuse through creativity, education...",url:"/austin/Introduction",date:"5/28/2018",location:"",category:"place",mapPosition:{bearing:0,center:[-97.74306079999997,30.267153],zoom:12,pitch:0},image:"/posts/austin/Introduction/Austin01.jpeg"},{slug:"Mueller",city:"austin",title:" Austin Creative Reuse",description:" \n\n\nI found this little place called Austin Create Reuse, which is run by a nonprofit organization that collects, sells, and distributes donated articles. They focus on a community building for smarter...",url:"/austin/Mueller",date:"5/28/2018",location:"Mueller",category:"place",mapPosition:{bearing:0,center:[-97.70094159999996,30.29841529999999],zoom:12,pitch:0},image:"/posts/austin/Mueller/"},{slug:"Books",city:"nowhere",title:" 9 beautiful books on urban analysis and research",description:" \nThere are many great books out there on urban planning and design, but I realized not many of them quite sum up the full scope of roles of urban analysis and research. I believe that analytical process...",url:"/nowhere/Books",date:"5/25/2018",location:"",category:"essay",image:"/posts/nowhere/Books/Book01.jpg"},{slug:"renovationschooltokyo",city:"tokyo",title:" What I learned at “Renovation School” in Tokyo",description:" \n\nHave you ever heard of the “Renovation School” in Japan?\n\nYou might already know that Japan is experiencing a rapid degeneration due to the declining population. This decline raises a lot of social...",url:"/tokyo/renovationschooltokyo",date:"5/14/2018",location:"Ikegami",category:"essay",mapPosition:{bearing:0,center:[139.7029729,35.5720944],zoom:12,pitch:0},image:"/posts/tokyo/renovationschooltokyo/Renovationschool01.jpg"},{slug:"HackMyCity",city:"tokyo",title:" Event report: “Hack My City” — Connecting the Urban Scales from XS to XL",description:" \n\n\nIn March 2018, some of my colleagues and I had an opportunity to invite some of the most prominent practitioners in the field of urban community planning in Japan to our one-day event “Hack my City”...",url:"/tokyo/HackMyCity",date:"3/13/2018",location:"100Banch",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/0*IEAJ4RS-SlSJcmKu.jpg"},{slug:"urbanistmeetuptokyo",city:"tokyo",title:" Urbanist MeetUp Tokyo: Examining the role of “urbanists” in improving urban life in Tokyo",description:" \n\n\nLast year, I organized an “Urbanist Meetup Tokyo”, and this post aims to discuss the importance of interdisciplinary collaboration among the people who understand urbanity and love the cities we live...",url:"/tokyo/urbanistmeetuptokyo",date:"12/12/2017",location:"100Banch",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/2000/1*KhR9gu4HI_5x8PeRTYHBdw.jpeg"},{slug:"globalgoalsjam17",city:"tokyo",title:" Design sprints for sustainable development goals: a recap from Global Goals Jam 2017 #Tokyo",description:" \n\n\nOn 16th-17th September 2017, I had the honor of hosting the first edition of the #GlobalGoalsJam — we invited various professionals, designers, creators, and students from more than 10 countries to...",url:"/tokyo/globalgoalsjam17",date:"9/17/2017",location:"100Banch",category:"essay",mapPosition:{bearing:0,center:[139.7047394,35.6559546],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/1000/1*K1mn1ASdXth8VQYs1zMJ_w.jpeg"},{slug:"subjectivemapworkshop",city:"tokyo",title:" Subjective Map Workshop #Shibuya",description:" \nIn 2017 December, I organized a workshop to encourage people to make their own map based on their own subjective experiences of a city. This article explains the philosophy behind this workshop as well...",url:"/tokyo/subjectivemapworkshop",date:"5/9/1991",location:"Shibuya",category:"essay",mapPosition:{bearing:0,center:[139.70405059999996,35.6617773],zoom:12,pitch:0},image:"https://cdn-images-1.medium.com/max/5248/1*aHOJjlyLmGAcIGlTtX3JIA.jpeg"}]},d2tF:function(t,e,o){var i=o("WDZH");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("7a204aa4",i,!1,{sourceMap:!1})},f3rP:function(t,e,o){"use strict";var i=o("A4bo");e.a={props:{posts:{type:Array,required:!0},perPage:{type:Number,required:!1,default:5},title:{type:String,required:!1}},components:{PostPreview:i.a},data:function(){return{shownPostCount:this.perPage}},computed:{totalPosts:function(){return this.posts.length},postsToShow:function(){return this.posts.slice(0,this.shownPostCount)}},mounted:function(){},methods:{}}},l1Je:function(t,e,o){"use strict";var i=o("y3eQ"),n=o("OvtY"),a=!1;var s=function(t){a||o("Bpw0")},r=o("VU/8")(i.a,n.a,!1,s,"data-v-07a8c045",null);r.options.__file="components/CitySelector.vue",e.a=r.exports},oir9:function(t,e,o){"use strict";e.a={props:["url","image","title","category","city","date","description","location"],data:function(){return{}},computed:{},mounted:function(){},methods:{capitalizeFirstLetter:function(t){return t?t.substring(0,1).toUpperCase()+t.substring(1):""},mouseOver:function(){this.$store.commit("setHighlight",this.location||this.city)},mouseOut:function(){this.$store.commit("setHighlight")}}}},ojeH:function(t,e,o){var i={"./austin.json":"ZQff","./kuala lumpur.json":"4gBP","./nowhere.json":"0FtT","./posts.json":"c8Z6","./tokyo.json":"QdRn","./vienna.json":"DFPz"};function n(t){return o(a(t))}function a(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(i)},n.resolve=a,t.exports=n,n.id="ojeH"},rGQh:function(t,e,o){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content"},[e("CitySelector"),e("PostList",{attrs:{posts:this.shownPosts,title:"Recent Posts"}}),e("Footer")],1)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n},ueS4:function(t,e,o){var i=o("bxC5");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("00e7476c",i,!1,{sourceMap:!1})},y3eQ:function(t,e,o){"use strict";var i=o("fZjL"),n=o.n(i),a=o("c8Z6");e.a={props:{hide:{required:!1,type:String}},data:function(){return{showAll:!1,cutoff:10}},computed:{orderedCities:function(){var t=this,e={};return a.forEach(function(o){t.hide&&o.city.toLowerCase()===t.hide.toLowerCase()||(e[o.city]=e[o.city]?e[o.city]+1:1)}),n()(e).sort(function(t,o){return e[t]<e[o]})},citiesToShow:function(){return this.showAll?this.orderedCities:this.orderedCities.slice(0,this.cutoff)}},methods:{capitalizeFirstLetter:function(t){return t?t.substring(0,1).toUpperCase()+t.substring(1):""}}}},yqLL:function(t,e,o){"use strict";var i=o("4kk+"),n=o.n(i),a=o("RzvT"),s=!1;var r=function(t){s||o("d2tF")},c=o("VU/8")(n.a,a.a,!1,r,"data-v-0d2d6594",null);c.options.__file="components/Footer.vue",e.default=c.exports}});