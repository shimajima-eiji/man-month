(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{264:function(t,e,n){var content=n(361);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(108).default)("b2e859e4",content,!0,{sourceMap:!1})},360:function(t,e,n){"use strict";var r=n(264);n.n(r).a},361:function(t,e,n){(e=n(107)(!1)).push([t.i,".main[data-v-6ddfee2e]{width:960px;margin:0 auto}.title[data-v-6ddfee2e]{margin-bottom:20px}.publishedAt[data-v-6ddfee2e]{margin-bottom:40px}.post>h1[data-v-6ddfee2e]{font-size:30px;font-weight:700;margin:40px 0 20px;background-color:#eee;padding:10px 20px;border-radius:5px}.post>h2[data-v-6ddfee2e]{font-size:24px;font-weight:700;margin:40px 0 16px;border-bottom:1px solid #ddd}.post>p[data-v-6ddfee2e]{line-height:1.8;letter-spacing:.2px}.post>ol[data-v-6ddfee2e]{list-style-type:decimal;list-style-position:inside}.paginate ul li[data-v-6ddfee2e]{list-style-type:none;float:left;border:1px solid #00f;margin-right:10px;padding:10px}",""]),t.exports=e},743:function(t,e,n){"use strict";n.r(e);n(39),n(109),n(57),n(40),n(215),n(216),n(110),n(111),n(79),n(41);var r=n(75),o=(n(42),n(6)),c=(n(7),n(9),n(10),n(11),n(214)),l=n.n(c);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,o,data,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=function(t,e,n){for(var r=function(t,text){return c.push({url:t,value:text})},o=Math.ceil(n/e),c=[],l=!1,d=!1,i=t-2;i<=t+2;i++)i<1||i==t||o<i||(r(i,i),i<t&&(l=!0),i>t&&(d=!0));return l&&c.unshift({page:1,text:"First"}),c.length>0&&c[0].page+1<c[1].page&&c.splice(1,0,{page:"#",text:"..."}),d&&r(o,"Last"),c.length>0&&c[c.length-2].page+1<c[c.length-1].page&&c.splice(c.length-1,0,{page:"#",text:"..."}),c},n=Number(t.params.p||"1"),r=1,e.next=5,l.a.get("".concat("https://nomuraya-tutorial.microcms.io/api/v1/test","?limit=").concat(r,"&offset=").concat((n-1)*r),{headers:{"X-API-KEY":"6615a5a4-b894-445e-b979-24612d1a018c"}});case 5:return o=e.sent,data=o.data,e.abrupt("return",f(f({},data),{},{pages:c(n,r,data.totalCount)}));case 8:case"end":return e.stop()}}),e)})))()}},h=(n(360),n(36)),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("h1",[t._v("記事一覧")]),t._v(" "),n("article",[n("ul",t._l(t.contents,(function(content){return n("li",{key:content.id},[n("nuxt-link",{attrs:{to:"/"+content.id}},[t._v("\n          "+t._s(content.title)+"\n        ")])],1)})),0)]),t._v(" "),n("h1",[t._v("ページング")]),t._v(" "),n("nav",{staticClass:"paginate"},[n("ul",t._l(t.pages,(function(e){return n("li",[n("nuxt-link",{attrs:{to:"/page/"+e.url}},[t._v(t._s(e.value))])],1)})),0)])])}),[],!1,null,"6ddfee2e",null);e.default=component.exports}}]);