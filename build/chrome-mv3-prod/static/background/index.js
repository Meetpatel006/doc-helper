var e,n;"function"==typeof(e=globalThis.define)&&(n=e,e=null),function(n,t,r,o,i){var u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof u[o]&&u[o],f=s.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(e,t){if(!f[e]){if(!n[e]){var r="function"==typeof u[o]&&u[o];if(!t&&r)return r(e,!0);if(s)return s(e,!0);if(d&&"string"==typeof e)return d(e);var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}a.resolve=function(t){var r=n[e][1][t];return null!=r?r:t},a.cache={};var l=f[e]=new c.Module(e);n[e][0].call(l.exports,a,l,l.exports,this)}return f[e].exports;function a(e){var n=a.resolve(e);return!1===n?{}:c(n)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=n,c.cache=f,c.parent=s,c.register=function(e,t){n[e]=[function(e,n){n.exports=t},{}]},Object.defineProperty(c,"root",{get:function(){return u[o]}}),u[o]=c;for(var l=0;l<t.length;l++)c(t[l]);if(r){var a=c(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=a:"function"==typeof e&&e.amd?e(function(){return a}):i&&(this[i]=a)}}({kgW6q:[function(e,n,t){e("../../../src/background")},{"../../../src/background":"fx8Od"}],fx8Od:[function(e,n,t){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(t),"undefined"==typeof window||window.define||(window.define=function(e){try{let t=e();return n.exports&&(n.exports=t),t}catch(e){return console.error("AMD define error:",e),{}}},window.define.amd=!0),chrome.runtime.onInstalled.addListener(()=>{console.log("Extension installed")}),chrome.tabs.onUpdated.addListener((e,n,t)=>{"complete"===n.status&&t.url&&chrome.tabs.sendMessage(e,{type:"TAB_UPDATED"}).catch(()=>{})}),t.default={async onMessage(e,n){if("highlightElements"===e.name)try{let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});t?.id&&(await chrome.tabs.sendMessage(t.id,{type:"HIGHLIGHT_ELEMENTS",steps:e.body}),n.send({success:!0}))}catch(e){n.send({success:!1,error:e.message})}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],hbR2Q:[function(e,n,t){t.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},t.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.exportAll=function(e,n){return Object.keys(e).forEach(function(t){"default"===t||"__esModule"===t||n.hasOwnProperty(t)||Object.defineProperty(n,t,{enumerable:!0,get:function(){return e[t]}})}),n},t.export=function(e,n,t){Object.defineProperty(e,n,{enumerable:!0,get:t})}},{}]},["kgW6q"],"kgW6q","parcelRequirefcb8"),globalThis.define=n;