var e,t;"function"==typeof(e=globalThis.define)&&(t=e,e=null),function(t,n,r,i,o){var c="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof c[i]&&c[i],u=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(e,n){if(!u[e]){if(!t[e]){var r="function"==typeof c[i]&&c[i];if(!n&&r)return r(e,!0);if(a)return a(e,!0);if(s&&"string"==typeof e)return s(e);var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}f.resolve=function(n){var r=t[e][1][n];return null!=r?r:n},f.cache={};var l=u[e]=new d.Module(e);t[e][0].call(l.exports,f,l,l.exports,this)}return u[e].exports;function f(e){var t=f.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=t,d.cache=u,d.parent=a,d.register=function(e,n){t[e]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return c[i]}}),c[i]=d;for(var l=0;l<n.length;l++)d(n[l]);if(r){var f=d(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=f:"function"==typeof e&&e.amd?e(function(){return f}):o&&(this[o]=f)}}({"5RC3s":[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.QuickJSAsyncWASMModule=void 0;let r=e("a5d311b7a24ffdc"),i=e("19466acb459883a9"),o=e("e68dac2f455069f9"),c=e("3163d8eb5470cec8");class a extends o.QuickJSWASMModule{constructor(e,t){super(e,t),this.ffi=t,this.module=e}newRuntime(e={}){let t=new i.Lifetime(this.ffi.QTS_NewRuntime(),void 0,e=>{this.callbacks.deleteRuntime(e),this.ffi.QTS_FreeRuntime(e)}),n=new c.QuickJSAsyncRuntime({module:this.module,ffi:this.ffi,rt:t,callbacks:this.callbacks});return(0,o.applyBaseRuntimeOptions)(n,e),e.moduleLoader&&n.setModuleLoader(e.moduleLoader),n}newContext(e={}){let t=this.newRuntime(),n=e.ownedLifetimes?e.ownedLifetimes.concat([t]):[t],r=t.newContext({...e,ownedLifetimes:n});return t.context=r,r}evalCode(){throw new r.QuickJSNotImplemented("QuickJSWASMModuleAsyncify.evalCode: use evalCodeAsync instead")}evalCodeAsync(e,t){return i.Scope.withScopeAsync(async n=>{let r=n.manage(this.newContext());(0,o.applyModuleEvalRuntimeOptions)(r.runtime,t);let i=await r.evalCodeAsync(e,"eval.js");if(void 0!==t.memoryLimitBytes&&r.runtime.setMemoryLimit(-1),i.error){let e=r.dump(n.manage(i.error));throw e}let c=r.dump(n.manage(i.value));return c})}}n.QuickJSAsyncWASMModule=a},{a5d311b7a24ffdc:"6rKqW","19466acb459883a9":"3PNRg",e68dac2f455069f9:"8UfFv","3163d8eb5470cec8":"2IRBU"}],"2IRBU":[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.QuickJSAsyncRuntime=void 0;let r=e("90f632818e91e9d4"),i=e("ab68c282a87f5abf"),o=e("6ddbc2cd68a805ff"),c=e("b18ef81f802f0e8c");class a extends o.QuickJSRuntime{constructor(e){super(e)}newContext(e={}){if(e.intrinsics&&e.intrinsics!==c.DefaultIntrinsics)throw Error("TODO: Custom intrinsics are not supported yet");let t=new r.Lifetime(this.ffi.QTS_NewContext(this.rt.value),void 0,e=>{this.contextMap.delete(e),this.callbacks.deleteContext(e),this.ffi.QTS_FreeContext(e)}),n=new i.QuickJSAsyncContext({module:this.module,ctx:t,ffi:this.ffi,rt:this.rt,ownedLifetimes:[],runtime:this,callbacks:this.callbacks});return this.contextMap.set(t.value,n),n}setModuleLoader(e,t){super.setModuleLoader(e,t)}setMaxStackSize(e){return super.setMaxStackSize(e)}}n.QuickJSAsyncRuntime=a},{"90f632818e91e9d4":"5u3hB",ab68c282a87f5abf:"6YUEx","6ddbc2cd68a805ff":"6l28Q",b18ef81f802f0e8c:"1OzQ7"}],"5u3hB":[function(e,t,n){let r,i;var o=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),c=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||o(t,e,n)},u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return c(t,e),t};Object.defineProperty(n,"__esModule",{value:!0}),n.shouldInterruptAfterDeadline=n.newAsyncContext=n.newAsyncRuntime=n.getQuickJSSync=n.getQuickJS=n.errors=n.RELEASE_SYNC=n.RELEASE_ASYNC=n.DEBUG_SYNC=n.DEBUG_ASYNC=n.newQuickJSAsyncWASMModule=n.newQuickJSWASMModule=void 0;let s=e("c92f5299fc167e9c");async function d(){return i??(i=(0,s.newQuickJSWASMModule)().then(e=>(r=e,e))),await i}async function l(e){let t=await (0,s.newQuickJSAsyncWASMModule)();return t.newRuntime(e)}async function f(e){let t=await (0,s.newQuickJSAsyncWASMModule)();return t.newContext(e)}Object.defineProperty(n,"newQuickJSWASMModule",{enumerable:!0,get:function(){return s.newQuickJSWASMModule}}),Object.defineProperty(n,"newQuickJSAsyncWASMModule",{enumerable:!0,get:function(){return s.newQuickJSAsyncWASMModule}}),Object.defineProperty(n,"DEBUG_ASYNC",{enumerable:!0,get:function(){return s.DEBUG_ASYNC}}),Object.defineProperty(n,"DEBUG_SYNC",{enumerable:!0,get:function(){return s.DEBUG_SYNC}}),Object.defineProperty(n,"RELEASE_ASYNC",{enumerable:!0,get:function(){return s.RELEASE_ASYNC}}),Object.defineProperty(n,"RELEASE_SYNC",{enumerable:!0,get:function(){return s.RELEASE_SYNC}}),a(e("25cc68b8a38948cc"),n),a(e("a8406484d314f6"),n),n.errors=u(e("c801bf7eedbb568f")),a(e("7e3bf696a55a1c28"),n),a(e("8abc6597b62a0ece"),n),n.getQuickJS=d,n.getQuickJSSync=function(){if(!r)throw Error("QuickJS not initialized. Await getQuickJS() at least once.");return r},n.newAsyncRuntime=l,n.newAsyncContext=f,n.shouldInterruptAfterDeadline=function(e){let t="number"==typeof e?e:e.getTime();return function(){return Date.now()>t}}},{c92f5299fc167e9c:"dwDwn","25cc68b8a38948cc":"aBAim",a8406484d314f6:"3PNRg",c801bf7eedbb568f:"6rKqW","7e3bf696a55a1c28":"h19K3","8abc6597b62a0ece":"142Rr"}],dwDwn:[function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t};Object.defineProperty(n,"__esModule",{value:!0}),n.RELEASE_ASYNC=n.DEBUG_ASYNC=n.RELEASE_SYNC=n.DEBUG_SYNC=n.memoizePromiseFactory=n.newQuickJSAsyncWASMModule=n.newQuickJSWASMModule=void 0;let c=e("c5a0540d6e5552f1");async function a(t=n.RELEASE_SYNC){let[r,i,{QuickJSWASMModule:a}]=await Promise.all([t.importModuleLoader(),t.importFFI(),Promise.resolve().then(function(){return e("9cc7f1242e8de662")}).then(e=>o(e)).then(c.unwrapTypescript)]),u=await r();u.type="sync";let s=new i(u);return new a(u,s)}async function u(t=n.RELEASE_ASYNC){let[r,i,{QuickJSAsyncWASMModule:a}]=await Promise.all([t.importModuleLoader(),t.importFFI(),Promise.resolve().then(function(){return e("c9ed045808f1ca6f")}).then(e=>o(e)).then(c.unwrapTypescript)]),u=await r();u.type="async";let s=new i(u);return new a(u,s)}n.newQuickJSWASMModule=a,n.newQuickJSAsyncWASMModule=u,n.memoizePromiseFactory=function(e){let t;return()=>t??(t=e())},n.DEBUG_SYNC={type:"sync",async importFFI(){throw Error("not implemented")},async importModuleLoader(){throw Error("not implemented")}},n.RELEASE_SYNC={type:"sync",async importFFI(){let t=await Promise.resolve().then(function(){return e("b6041b6ee52d29c1")}).then(e=>o(e));return(0,c.unwrapTypescript)(t).QuickJSFFI},async importModuleLoader(){let t=await Promise.resolve().then(function(){return e("5c4d8fbaf488c81b")}).then(e=>o(e));return(0,c.unwrapJavascript)(t)}},n.DEBUG_ASYNC={type:"async",async importFFI(){throw Error("not implemented")},async importModuleLoader(){throw Error("not implemented")}},n.RELEASE_ASYNC={type:"async",async importFFI(){throw Error("not implemented")},async importModuleLoader(){throw Error("not implemented")}}},{c5a0540d6e5552f1:"bOkLp","9cc7f1242e8de662":"5rIXI",c9ed045808f1ca6f:"IuG1d",b6041b6ee52d29c1:"96OJN","5c4d8fbaf488c81b":"hYRd2"}],bOkLp:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.unwrapJavascript=n.unwrapTypescript=void 0,n.unwrapTypescript=function(e){let t=e.default;return t??e},n.unwrapJavascript=function(e){return e.default}},{}],"5rIXI":[function(e,t,n){t.exports=e("b865ee2c75e410a1")(e("8cee0ceae08a1615").getBundleURL("gd5L8")+e("a75f2ec76d8157e2").resolve("kTSXf")).then(()=>t.bundle.root("8UfFv"))},{b865ee2c75e410a1:"3D0UT","8cee0ceae08a1615":"6haDs",a75f2ec76d8157e2:"amLA4"}],"3D0UT":[function(e,t,n){var r=e("83e44af0887950b5");t.exports=r(function(e){return new Promise(function(t,n){if([].concat(document.getElementsByTagName("script")).some(function(t){return t.src===e})){t();return}var r=document.createElement("link");r.href=e,r.rel="preload",r.as="script",document.head.appendChild(r);var i=document.createElement("script");i.async=!0,i.type="text/javascript",i.src=e,i.onerror=function(t){var r=TypeError("Failed to fetch dynamically imported module: ".concat(e,". Error: ").concat(t.message));i.onerror=i.onload=null,i.remove(),n(r)},i.onload=function(){i.onerror=i.onload=null,t()},document.getElementsByTagName("head")[0].appendChild(i)})})},{"83e44af0887950b5":"lbXpP"}],lbXpP:[function(e,t,n){var r={},i={},o={};t.exports=function(e,t){return function(n){var c=function(e){switch(e){case"preload":return i;case"prefetch":return o;default:return r}}(t);return c[n]?c[n]:c[n]=e.apply(null,arguments).catch(function(e){throw delete c[n],e})}}},{}],"6haDs":[function(e,t,n){var r={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}n.getBundleURL=function(e){var t=r[e];return t||(t=function(){try{throw Error()}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),r[e]=t),t},n.getBaseURL=i,n.getOrigin=function(e){var t=(""+e).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);if(!t)throw Error("Origin not found");return t[0]}},{}],amLA4:[function(e,t,n){var r={};t.exports.register=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)r[t[n]]=e[t[n]]},t.exports.resolve=function(e){var t=r[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}},{}],IuG1d:[function(e,t,n){t.exports=Promise.all([e("b3091d37d27a8473")(e("5a6d65ef9aca3e01").getBundleURL("gd5L8")+e("eb68a9b54a5a1ab5").resolve("kTSXf")),e("b3091d37d27a8473")(e("5a6d65ef9aca3e01").getBundleURL("gd5L8")+e("eb68a9b54a5a1ab5").resolve("gd5L8"))]).then(()=>t.bundle.root("5RC3s"))},{b3091d37d27a8473:"3D0UT","5a6d65ef9aca3e01":"6haDs",eb68a9b54a5a1ab5:"amLA4"}],"96OJN":[function(e,t,n){t.exports=e("fc8be48ed2f35fdb")(e("c1586d1dae1f0fc0").getBundleURL("gd5L8")+e("8523522117deed4a").resolve("asq0W")).then(()=>t.bundle.root("k7N3T"))},{fc8be48ed2f35fdb:"3D0UT",c1586d1dae1f0fc0:"6haDs","8523522117deed4a":"amLA4"}],hYRd2:[function(e,t,n){t.exports=Promise.all([e("67a03d2e02d090c1")(e("ef12c778a1609115").getBundleURL("gd5L8")+e("6977930bd85328a2").resolve("8XDlT")),e("67a03d2e02d090c1")(e("ef12c778a1609115").getBundleURL("gd5L8")+e("6977930bd85328a2").resolve("7TLwG"))]).then(()=>t.bundle.root("3t9Ty"))},{"67a03d2e02d090c1":"3D0UT",ef12c778a1609115:"6haDs","6977930bd85328a2":"amLA4"}],aBAim:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.isFail=n.isSuccess=void 0,n.isSuccess=function(e){return"error"in e==!1},n.isFail=function(e){return"error"in e==!0}},{}],"142Rr":[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.TestQuickJSWASMModule=void 0;let r=e("7da061daaa4d22c9"),i=e("cf9de2d30d3ad426");n.TestQuickJSWASMModule=class{constructor(e){this.parent=e,this.contexts=new Set,this.runtimes=new Set}newRuntime(e){let t=this.parent.newRuntime({...e,ownedLifetimes:[new i.Lifetime(void 0,void 0,()=>this.runtimes.delete(t)),...e?.ownedLifetimes??[]]});return this.runtimes.add(t),t}newContext(e){let t=this.parent.newContext({...e,ownedLifetimes:[new i.Lifetime(void 0,void 0,()=>this.contexts.delete(t)),...e?.ownedLifetimes??[]]});return this.contexts.add(t),t}evalCode(e,t){return this.parent.evalCode(e,t)}disposeAll(){let e=[...this.contexts,...this.runtimes];this.runtimes.clear(),this.contexts.clear(),e.forEach(e=>{e.alive&&e.dispose()})}assertNoMemoryAllocated(){let e=this.getFFI().QTS_RecoverableLeakCheck();if(e)throw new r.QuickJSMemoryLeakDetected("Leak sanitizer detected un-freed memory");if(this.contexts.size>0)throw new r.QuickJSMemoryLeakDetected(`${this.contexts.size} contexts leaked`);if(this.runtimes.size>0)throw new r.QuickJSMemoryLeakDetected(`${this.runtimes.size} runtimes leaked`)}getFFI(){return this.parent.getFFI()}}},{"7da061daaa4d22c9":"6rKqW",cf9de2d30d3ad426:"3PNRg"}],"6YUEx":[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.QuickJSAsyncContext=void 0;let r=e("ab1e4775c87c513b"),i=e("2f7ce4117150e9f7"),o=e("e93b0daa4dc5e7ac");class c extends r.QuickJSContext{async evalCodeAsync(e,t="eval.js",n){let r=void 0===n?1:0,c=(0,o.evalOptionsToFlags)(n),a=0;try{a=await this.memory.newHeapCharPointer(e).consume(e=>this.ffi.QTS_Eval_MaybeAsync(this.ctx.value,e.value,t,r,c))}catch(e){throw(0,i.debugLog)("QTS_Eval_MaybeAsync threw",e),e}let u=this.ffi.QTS_ResolveException(this.ctx.value,a);return u?(this.ffi.QTS_FreeValuePointer(this.ctx.value,a),{error:this.memory.heapValueHandle(u)}):{value:this.memory.heapValueHandle(a)}}newAsyncifiedFunction(e,t){return this.newFunction(e,t)}}n.QuickJSAsyncContext=c},{ab1e4775c87c513b:"gR0Lt","2f7ce4117150e9f7":"2JqP3",e93b0daa4dc5e7ac:"1OzQ7"}]},[],null,"parcelRequirefcb8"),globalThis.define=t;