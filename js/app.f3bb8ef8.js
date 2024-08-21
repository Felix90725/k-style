(function(){"use strict";var e={5509:function(e,n,t){var r=t(5130),o=t(4373),a=t(6942),i=t(5756),c=t(482),u=t(3224),s=t(4164),d=t(1066);function f(e){const n=parseInt(e,10);return`${n.toFixed(0).replace(/./g,((e,n,t)=>n&&"."!==e&&(t.length-n)%3===0?`, ${e}`.replace(/\s/g,""):e))}`}function l(e){const n=new Date(1e3*e);return n.toLocaleDateString()}var p=t(1600);const h=(e,n="更新")=>{if(e.data.success)p.A.emit("push-message",{style:"success",title:`${n}成功`});else{const t="string"===typeof e.data.message?[e.data.message]:e.data.message;p.A.emit("push-message",{style:"danger",title:`${n}失敗`,content:t.join("、")})}};var m=h,b=(t(8077),t(6768));function g(e,n){const t=(0,b.g2)("router-view");return(0,b.uX)(),(0,b.Wv)(t)}var v=t(1241);const y={},k=(0,v.A)(y,[["render",g]]);var O=k,w=t(1387);const A=[{path:"/",name:"userBoard",component:()=>Promise.all([t.e(462),t.e(959)]).then(t.bind(t,8959)),children:[{path:"",name:"userHome",component:()=>t.e(255).then(t.bind(t,1918))},{path:"userAllProducts",name:"userAllProducts",component:()=>t.e(849).then(t.bind(t,4849))},{path:"product/:productId",component:()=>t.e(136).then(t.bind(t,2136))},{path:"userCart",component:()=>Promise.all([t.e(462),t.e(286),t.e(55)]).then(t.bind(t,3055))},{path:"userLike",component:()=>t.e(225).then(t.bind(t,7225))},{path:"userDetail",component:()=>t.e(875).then(t.bind(t,3875))},{path:"userPay/:order_id",component:()=>t.e(495).then(t.bind(t,9733))},{path:"userFinish",component:()=>t.e(670).then(t.bind(t,670))},{path:"userCheck",component:()=>t.e(218).then(t.bind(t,9218))},{path:"userCheckOrder/:email_id",component:()=>Promise.all([t.e(462),t.e(286),t.e(294)]).then(t.bind(t,1294))}]},{path:"/login",name:"login",component:()=>t.e(260).then(t.bind(t,7260))},{path:"/backstage",name:"backstage",component:()=>Promise.all([t.e(462),t.e(503)]).then(t.bind(t,5503)),children:[{path:"control",name:"control",component:()=>t.e(117).then(t.bind(t,5117))},{path:"products",name:"products",component:()=>Promise.all([t.e(462),t.e(286),t.e(869)]).then(t.bind(t,869))},{path:"orders",name:"orders",component:()=>Promise.all([t.e(462),t.e(286),t.e(100)]).then(t.bind(t,2100))},{path:"coupons",name:"coupons",component:()=>Promise.all([t.e(462),t.e(286),t.e(270)]).then(t.bind(t,1889))}]},{path:"/:pathMatch(.*)*",redirect:"/"}],P=(0,w.aE)({history:(0,w.Bt)(),linkActiveClass:"active",routes:A});var E=P;Object.entries(u.Q7).forEach((([e,n])=>{(0,c.Km)(e,n)})),(0,c.jK)({generateMessage:(0,s.kg)({zh_TW:d}),validateOnInput:!0}),(0,s.xS)("zh_TW");const C=(0,r.Ef)(O);C.component("VForm",c.lV),C.component("VField",c.D0),C.component("ErrorMessage",c.Kw),C.config.globalProperties.$filters={currency:f,date:l},C.use(a.A,o.A),C.component("isLoading",i.A),C.config.globalProperties.$httpMessageState=m,C.use(E),C.mount("#app")},1600:function(e,n,t){var r=t(595);const o=(0,r.A)();n.A=o}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}t.m=e,function(){t.amdO={}}(),function(){var e=[];t.O=function(n,r,o,a){if(!r){var i=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],a=e[d][2];for(var c=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(t.O).every((function(e){return t.O[e](r[u])}))?r.splice(u--,1):(c=!1,a<i&&(i=a));if(c){e.splice(d--,1);var s=o();void 0!==s&&(n=s)}}return n}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[r,o,a]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+"."+{55:"08961dca",100:"684e4b23",117:"1aeb56ec",136:"d852d938",218:"f0f7b53e",225:"da94aba1",255:"2ca9f42f",260:"a72f4f7b",270:"dcf9d1ef",286:"ea2a3b30",294:"3805498f",462:"938145b4",495:"17a26990",503:"04d35ae9",670:"9e5ea50d",849:"02acf3d0",869:"d150aebf",875:"2a5a1e37",959:"48457f79"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+"."+{55:"3741d67d",100:"5bd2ddd5",117:"9a56ef52",136:"1a314cc2",218:"cb7afef9",225:"ccd0e439",255:"6b11265a",260:"025ae0bd",270:"62da4e0a",294:"1e4df6ce",495:"d6d117f0",503:"2e88cbdd",670:"e264fe9b",849:"d80ec63a",869:"17bf4170",875:"88492229",959:"86fd6336"}[e]+".css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="k-style:";t.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var c,u;if(void 0!==a)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var f=s[d];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==n+a){c=f;break}}c||(u=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,t.nc&&c.setAttribute("nonce",t.nc),c.setAttribute("data-webpack",n+a),c.src=r),e[r]=[o];var l=function(n,t){c.onerror=c.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=l.bind(null,c.onerror),c.onload=l.bind(null,c.onload),u&&document.head.appendChild(c)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/k-style/"}(),function(){if("undefined"!==typeof document){var e=function(e,n,r,o,a){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",t.nc&&(i.nonce=t.nc);var c=function(t){if(i.onerror=i.onload=null,"load"===t.type)o();else{var r=t&&t.type,c=t&&t.target&&t.target.href||n,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+c+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=r,u.request=c,i.parentNode&&i.parentNode.removeChild(i),a(u)}};return i.onerror=i.onload=c,i.href=n,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===n))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===n)return o}},r=function(r){return new Promise((function(o,a){var i=t.miniCssF(r),c=t.p+i;if(n(i,c))return o();e(r,c,null,o,a)}))},o={524:0};t.f.miniCss=function(e,n){var t={55:1,100:1,117:1,136:1,218:1,225:1,255:1,260:1,270:1,294:1,495:1,503:1,670:1,849:1,869:1,875:1,959:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=r(e).then((function(){o[e]=0}),(function(n){throw delete o[e],n})))}}}(),function(){var e={524:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=a);var i=t.p+t.u(n),c=new Error,u=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;c.message="Loading chunk "+n+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,o[1](c)}};t.l(i,u,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,a,i=r[0],c=r[1],u=r[2],s=0;if(i.some((function(n){return 0!==e[n]}))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(u)var d=u(t)}for(n&&n(r);s<i.length;s++)a=i[s],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(d)},r=self["webpackChunkk_style"]=self["webpackChunkk_style"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[504],(function(){return t(5509)}));r=t.O(r)})();
//# sourceMappingURL=app.f3bb8ef8.js.map