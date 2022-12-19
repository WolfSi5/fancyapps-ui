// @fancyapps/ui/Panzoom v4.0.32
const t=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),i=(...e)=>{let s=!1;"boolean"==typeof e[0]&&(s=e.shift());let o=e[0];if(!o||"object"!=typeof o)throw new Error("extendee must be an object");const n=e.slice(1),h=n.length;for(let e=0;e<h;e++){const h=n[e];for(let e in h)if(h.hasOwnProperty(e)){const n=h[e];if(s&&(Array.isArray(n)||t(n))){const t=Array.isArray(n)?[]:{};o[e]=i(!0,o.hasOwnProperty(e)?o[e]:t,n)}else o[e]=n}}return o},e=(t,i=1e4)=>(t=parseFloat(t)||0,Math.round((t+Number.EPSILON)*i)/i),s=function(t){return!!(t&&"object"==typeof t&&t instanceof Element&&t!==document.body)&&(!t.__Panzoom&&(function(t){const i=getComputedStyle(t)["overflow-y"],e=getComputedStyle(t)["overflow-x"],s=("scroll"===i||"auto"===i)&&Math.abs(t.scrollHeight-t.clientHeight)>1,o=("scroll"===e||"auto"===e)&&Math.abs(t.scrollWidth-t.clientWidth)>1;return s||o}(t)?t:s(t.parentNode)))},o="undefined"!=typeof window&&window.ResizeObserver||class{constructor(t){this.observables=[],this.boundCheck=this.check.bind(this),this.boundCheck(),this.callback=t}observe(t){if(this.observables.some((i=>i.el===t)))return;const i={el:t,size:{height:t.clientHeight,width:t.clientWidth}};this.observables.push(i)}unobserve(t){this.observables=this.observables.filter((i=>i.el!==t))}disconnect(){this.observables=[]}check(){const t=this.observables.filter((t=>{const i=t.el.clientHeight,e=t.el.clientWidth;if(t.size.height!==i||t.size.width!==e)return t.size.height=i,t.size.width=e,!0})).map((t=>t.el));t.length>0&&this.callback(t),window.requestAnimationFrame(this.boundCheck)}};class n{constructor(t){this.id=self.Touch&&t instanceof Touch?t.identifier:-1,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY}}const h=(t,i)=>i?Math.sqrt((i.clientX-t.clientX)**2+(i.clientY-t.clientY)**2):0,r=(t,i)=>i?{clientX:(t.clientX+i.clientX)/2,clientY:(t.clientY+i.clientY)/2}:t;class a{constructor(t,{start:i=(()=>!0),move:e=(()=>{}),end:s=(()=>{})}={}){this._element=t,this.startPointers=[],this.currentPointers=[],this._pointerStart=t=>{if(t.buttons>0&&0!==t.button)return;const i=new n(t);this.currentPointers.some((t=>t.id===i.id))||this._triggerPointerStart(i,t)&&(window.addEventListener("mousemove",this._move),window.addEventListener("mouseup",this._pointerEnd))},this._touchStart=t=>{for(const i of Array.from(t.changedTouches||[]))this._triggerPointerStart(new n(i),t)},this._move=t=>{const i=this.currentPointers.slice(),e=(t=>"changedTouches"in t)(t)?Array.from(t.changedTouches).map((t=>new n(t))):[new n(t)];for(const t of e){const i=this.currentPointers.findIndex((i=>i.id===t.id));i<0||(this.currentPointers[i]=t)}this._moveCallback(i,this.currentPointers.slice(),t)},this._triggerPointerEnd=(t,i)=>{const e=this.currentPointers.findIndex((i=>i.id===t.id));return!(e<0)&&(this.currentPointers.splice(e,1),this.startPointers.splice(e,1),this._endCallback(t,i),!0)},this._pointerEnd=t=>{t.buttons>0&&0!==t.button||this._triggerPointerEnd(new n(t),t)&&(window.removeEventListener("mousemove",this._move,{passive:!1}),window.removeEventListener("mouseup",this._pointerEnd,{passive:!1}))},this._touchEnd=t=>{for(const i of Array.from(t.changedTouches||[]))this._triggerPointerEnd(new n(i),t)},this._startCallback=i,this._moveCallback=e,this._endCallback=s,this._element.addEventListener("mousedown",this._pointerStart,{passive:!1}),this._element.addEventListener("touchstart",this._touchStart,{passive:!1}),this._element.addEventListener("touchmove",this._move,{passive:!1}),this._element.addEventListener("touchend",this._touchEnd),this._element.addEventListener("touchcancel",this._touchEnd)}stop(){this._element.removeEventListener("mousedown",this._pointerStart,{passive:!1}),this._element.removeEventListener("touchstart",this._touchStart,{passive:!1}),this._element.removeEventListener("touchmove",this._move,{passive:!1}),this._element.removeEventListener("touchend",this._touchEnd),this._element.removeEventListener("touchcancel",this._touchEnd),window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)}_triggerPointerStart(t,i){return!!this._startCallback(t,i)&&(this.currentPointers.push(t),this.startPointers.push(t),!0)}}const c={touch:!0,zoom:!0,pinchToZoom:!0,panOnlyZoomed:!1,lockAxis:!1,friction:.64,decelFriction:.88,zoomFriction:.74,flatXTransition:!1,bounceForce:.2,baseScale:1,minScale:1,maxScale:2,step:.5,textSelection:!1,click:"toggleZoom",wheel:"zoom",wheelFactor:42,wheelLimit:5,draggableClass:"is-draggable",draggingClass:"is-dragging",ratio:1};class l extends class{constructor(t={}){this.options=i(!0,{},t),this.plugins=[],this.events={};for(const t of["on","once"])for(const i of Object.entries(this.options[t]||{}))this[t](...i)}option(t,i,...e){t=String(t);let s=(o=t,n=this.options,o.split(".").reduce((function(t,i){return t&&t[i]}),n));var o,n;return"function"==typeof s&&(s=s.call(this,this,...e)),void 0===s?i:s}localize(t,i=[]){return t=(t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,s)=>{let o="";s?o=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${s}`):e&&(o=this.option(`l10n.${e}`)),o||(o=t);for(let t=0;t<i.length;t++)o=o.split(i[t][0]).join(i[t][1]);return o}))).replace(/\{\{(.*)\}\}/,((t,i)=>i))}on(i,e){if(t(i)){for(const t of Object.entries(i))this.on(...t);return this}return String(i).split(" ").forEach((t=>{const i=this.events[t]=this.events[t]||[];-1==i.indexOf(e)&&i.push(e)})),this}once(i,e){if(t(i)){for(const t of Object.entries(i))this.once(...t);return this}return String(i).split(" ").forEach((t=>{const i=(...s)=>{this.off(t,i),e.call(this,this,...s)};i._=e,this.on(t,i)})),this}off(i,e){if(!t(i))return i.split(" ").forEach((t=>{const i=this.events[t];if(!i||!i.length)return this;let s=-1;for(let t=0,o=i.length;t<o;t++){const o=i[t];if(o&&(o===e||o._===e)){s=t;break}}-1!=s&&i.splice(s,1)})),this;for(const t of Object.entries(i))this.off(...t)}trigger(t,...i){for(const e of[...this.events[t]||[]].slice())if(e&&!1===e.call(this,this,...i))return!1;for(const e of[...this.events["*"]||[]].slice())if(e&&!1===e.call(this,t,this,...i))return!1;return!0}attachPlugins(t){const e={};for(const[s,o]of Object.entries(t||{}))!1===this.options[s]||this.plugins[s]||(this.options[s]=i({},o.defaults||{},this.options[s]),e[s]=new o(this));for(const[t,i]of Object.entries(e))i.attach(this);return this.plugins=Object.assign({},this.plugins,e),this}detachPlugins(){for(const t in this.plugins){let i;(i=this.plugins[t])&&"function"==typeof i.detach&&i.detach(this)}return this.plugins={},this}}{constructor(t,e={}){super(i(!0,{},c,e)),this.state="init",this.$container=t;for(const t of["onLoad","onWheel","onClick"])this[t]=this[t].bind(this);this.initLayout(),this.resetValues(),this.attachPlugins(l.Plugins),this.trigger("init"),this.updateMetrics(),this.attachEvents(),this.trigger("ready"),!1===this.option("centerOnStart")?this.state="ready":this.panTo({friction:0}),t.__Panzoom=this}initLayout(){const t=this.$container;if(!(t instanceof HTMLElement))throw new Error("Panzoom: Container not found");const i=this.option("content")||t.querySelector(".panzoom__content");if(!i)throw new Error("Panzoom: Content not found");this.$content=i;let e=this.option("viewport")||t.querySelector(".panzoom__viewport");e||!1===this.option("wrapInner")||(e=document.createElement("div"),e.classList.add("panzoom__viewport"),e.append(...t.childNodes),t.appendChild(e)),this.$viewport=e||i.parentNode}resetValues(){this.updateRate=this.option("updateRate",/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?250:24),this.container={width:0,height:0},this.viewport={width:0,height:0},this.content={origWidth:0,origHeight:0,width:0,height:0,x:this.option("x",0),metaX:this.option("x",0),y:this.option("y",0),scale:this.option("baseScale")},this.transform={x:0,metaX:0,y:0,scale:1},this.resetDragPosition()}onLoad(t){this.updateMetrics(),this.panTo({scale:this.option("baseScale"),friction:0}),this.trigger("load",t)}onClick(t){if(t.defaultPrevented)return;if(document.activeElement&&document.activeElement.closest("[contenteditable]"))return;if(this.option("textSelection")&&window.getSelection().toString().length&&(!t.target||!t.target.hasAttribute("data-fancybox-close")))return void t.stopPropagation();const i=this.$content.getClientRects()[0];if("ready"!==this.state&&(this.dragPosition.midPoint||Math.abs(i.top-this.dragStart.rect.top)>1||Math.abs(i.left-this.dragStart.rect.left)>1))return t.preventDefault(),void t.stopPropagation();!1!==this.trigger("click",t)&&this.option("zoom")&&"toggleZoom"===this.option("click")&&(t.preventDefault(),t.stopPropagation(),this.zoomWithClick(t))}onWheel(t){!1!==this.trigger("wheel",t)&&this.option("zoom")&&this.option("wheel")&&this.zoomWithWheel(t)}zoomWithWheel(t){void 0===this.changedDelta&&(this.changedDelta=0);const i=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)),e=this.content.scale;let s=e*(100+i*this.option("wheelFactor"))/100;if(i<0&&Math.abs(e-this.option("minScale"))<.01||i>0&&Math.abs(e-this.option("maxScale"))<.01?(this.changedDelta+=Math.abs(i),s=e):(this.changedDelta=0,s=Math.max(Math.min(s,this.option("maxScale")),this.option("minScale"))),this.changedDelta>this.option("wheelLimit"))return;if(t.preventDefault(),s===e)return;const o=this.$content.getBoundingClientRect(),n=t.clientX-o.left,h=t.clientY-o.top;this.zoomTo(s,{x:n,y:h})}zoomWithClick(t){const i=this.$content.getClientRects()[0],e=t.clientX-i.left,s=t.clientY-i.top;this.toggleZoom({x:e,y:s})}attachEvents(){this.$content.addEventListener("load",this.onLoad),this.$container.addEventListener("wheel",this.onWheel,{passive:!1}),this.$container.addEventListener("click",this.onClick,{passive:!1}),this.initObserver();const t=new a(this.$container,{start:(i,e)=>{if(!this.option("touch"))return!1;if(this.velocity.scale<0)return!1;const o=e.composedPath()[0];if(!t.currentPointers.length){if(-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(o.nodeName))return!1;if(this.option("textSelection")&&((t,i,e)=>{const s=t.childNodes,o=document.createRange();for(let t=0;t<s.length;t++){const n=s[t];if(n.nodeType!==Node.TEXT_NODE)continue;o.selectNodeContents(n);const h=o.getBoundingClientRect();if(i>=h.left&&e>=h.top&&i<=h.right&&e<=h.bottom)return n}return!1})(o,i.clientX,i.clientY))return!1}return!s(o)&&(!1!==this.trigger("touchStart",e)&&("mousedown"===e.type&&e.preventDefault(),this.state="pointerdown",this.resetDragPosition(),this.dragPosition.midPoint=null,this.dragPosition.time=Date.now(),!0))},move:(i,e,s)=>{if("pointerdown"!==this.state)return;if(!1===this.trigger("touchMove",s))return void s.preventDefault();if(e.length<2&&!0===this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale"))return;if(e.length>1&&(!this.option("zoom")||!1===this.option("pinchToZoom")))return;const o=r(i[0],i[1]),n=r(e[0],e[1]),a=n.clientX-o.clientX,c=n.clientY-o.clientY,l=h(i[0],i[1]),d=h(e[0],e[1]),f=l&&d?d/l:1;this.dragOffset.x+=a,this.dragOffset.metaX+=a,this.dragOffset.y+=c,this.dragOffset.scale*=f,this.dragOffset.time=Date.now()-this.dragPosition.time;const g=1===this.dragStart.scale&&this.option("lockAxis");if(g&&!this.lockAxis){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return void s.preventDefault();if(Math.abs(this.dragOffset.metaX)<6&&Math.abs(this.dragOffset.y)<6)return void s.preventDefault();const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockAxis=t>45&&t<135?"y":"x"}if("xy"===g||"y"!==this.lockAxis){if(s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.lockAxis&&(this.dragOffset["x"===this.lockAxis?"y":"x"]=0),this.$container.classList.add(this.option("draggingClass")),this.transform.scale===this.option("baseScale")&&"y"===this.lockAxis||(this.dragPosition.x=this.dragStart.x+this.dragOffset.x,this.dragPosition.metaX=this.dragStart.metaX+this.dragOffset.metaX),this.transform.scale===this.option("baseScale")&&"x"===this.lockAxis||(this.dragPosition.y=this.dragStart.y+this.dragOffset.y),this.dragPosition.scale=this.dragStart.scale*this.dragOffset.scale,e.length>1){const i=r(t.startPointers[0],t.startPointers[1]),e=i.clientX-this.dragStart.rect.x,s=i.clientY-this.dragStart.rect.y,{deltaX:o,deltaY:h}=this.getZoomDelta(this.content.scale*this.dragOffset.scale,e,s);this.dragPosition.x-=o,this.dragPosition.metaX-=o,this.dragPosition.y-=h,this.dragPosition.midPoint=n}else this.setDragResistance();this.transform={x:this.dragPosition.x,metaX:this.dragPosition.metaX,y:this.dragPosition.y,scale:this.dragPosition.scale},this.startAnimation()}},end:(i,e)=>{if("pointerdown"!==this.state)return;if(this._dragOffset={...this.dragOffset},t.currentPointers.length)return void this.resetDragPosition();if(this.state="decel",this.friction=this.option("decelFriction"),this.recalculateTransform(),this.$container.classList.remove(this.option("draggingClass")),!1===this.trigger("touchEnd",e))return;if("decel"!==this.state)return;const s=this.option("minScale");if(this.transform.scale<s)return void this.zoomTo(s,{friction:.64});const o=this.option("maxScale");if(this.transform.scale-o>.01){const t=this.dragPosition.midPoint||i,e=this.$content.getClientRects()[0];this.zoomTo(o,{friction:.64,x:t.clientX-e.left,y:t.clientY-e.top})}else;}});this.pointerTracker=t}initObserver(){this.resizeObserver||(this.resizeObserver=new o((()=>{this.updateTimer||(this.updateTimer=setTimeout((()=>{const t=this.$container.getBoundingClientRect();t.width&&t.height?((Math.abs(t.width-this.container.width)>1||Math.abs(t.height-this.container.height)>1)&&(this.isAnimating()&&this.endAnimation(!0),this.updateMetrics(),this.panTo({x:this.content.x,y:this.content.y,scale:this.option("baseScale"),friction:0})),this.updateTimer=null):this.updateTimer=null}),this.updateRate))})),this.resizeObserver.observe(this.$container))}resetDragPosition(){this.lockAxis=null,this.friction=this.option("friction"),this.velocity={x:0,metaX:0,y:0,scale:0};const{x:t,metaX:i,y:e,scale:s}=this.content;this.dragStart={rect:this.$content.getBoundingClientRect(),x:t,metaX:i,y:e,scale:s},this.dragPosition={...this.dragPosition,x:t,metaX:i,y:e,scale:s},this.dragOffset={x:0,metaX:0,y:0,scale:1,time:0}}updateMetrics(t){!0!==t&&this.trigger("beforeUpdate");const i=this.$container,s=this.$content,o=this.$viewport,n=s instanceof HTMLImageElement,h=this.option("zoom"),r=this.option("resizeParent",h);let a=this.option("width"),c=this.option("height"),l=a||(d=s,Math.max(parseFloat(d.naturalWidth||0),parseFloat(d.width&&d.width.baseVal&&d.width.baseVal.value||0),parseFloat(d.offsetWidth||0),parseFloat(d.scrollWidth||0)));var d;let f=c||(t=>Math.max(parseFloat(t.naturalHeight||0),parseFloat(t.height&&t.height.baseVal&&t.height.baseVal.value||0),parseFloat(t.offsetHeight||0),parseFloat(t.scrollHeight||0)))(s);Object.assign(s.style,{width:a?`${a}px`:"",height:c?`${c}px`:"",maxWidth:"",maxHeight:""}),r&&Object.assign(o.style,{width:"",height:""});const g=this.option("ratio");l=e(l*g),f=e(f*g),a=l,c=f;const m=s.getBoundingClientRect(),p=o.getBoundingClientRect(),u=o==i?p:i.getBoundingClientRect();let v=Math.max(o.offsetWidth,e(p.width)),y=Math.max(o.offsetHeight,e(p.height)),b=window.getComputedStyle(o);if(v-=parseFloat(b.paddingLeft)+parseFloat(b.paddingRight),y-=parseFloat(b.paddingTop)+parseFloat(b.paddingBottom),this.viewport.width=v,this.viewport.height=y,h){if(Math.abs(l-m.width)>.1||Math.abs(f-m.height)>.1){const t=((t,i,e,s)=>{const o=Math.min(e/t||0,s/i);return{width:t*o||0,height:i*o||0}})(l,f,Math.min(l,m.width),Math.min(f,m.height));a=e(t.width),c=e(t.height)}Object.assign(s.style,{width:`${a}px`,height:`${c}px`,transform:""})}if(r&&(Object.assign(o.style,{width:`${a}px`,height:`${c}px`}),this.viewport={...this.viewport,width:a,height:c}),n&&h&&"function"!=typeof this.options.maxScale){const t=this.option("maxScale");this.options.maxScale=function(){return this.content.origWidth>0&&this.content.fitWidth>0?this.content.origWidth/this.content.fitWidth:t}}this.content={...this.content,origWidth:l,origHeight:f,fitWidth:a,fitHeight:c,width:a,height:c,scale:1,isZoomable:h},this.container={width:u.width,height:u.height},!0!==t&&this.trigger("afterUpdate")}zoomIn(t){this.zoomTo(this.content.scale+(t||this.option("step")))}zoomOut(t){this.zoomTo(this.content.scale-(t||this.option("step")))}toggleZoom(t={}){const i=this.option("maxScale"),e=this.option("baseScale"),s=this.content.scale>e+.5*(i-e)?e:i;this.zoomTo(s,t)}zoomTo(t=this.option("baseScale"),{x:i=null,y:s=null}={}){t=Math.max(Math.min(t,this.option("maxScale")),this.option("minScale"));const o=e(this.content.scale/(this.content.width/this.content.fitWidth),1e7);null===i&&(i=this.content.width*o*.5),null===s&&(s=this.content.height*o*.5);const{deltaX:n,deltaY:h}=this.getZoomDelta(t,i,s);i=this.content.x-n,s=this.content.y-h,this.panTo({x:i,y:s,scale:t,friction:this.option("zoomFriction")})}getZoomDelta(t,i=0,e=0){const s=this.content.fitWidth*this.content.scale,o=this.content.fitHeight*this.content.scale,n=i>0&&s?i/s:0,h=e>0&&o?e/o:0;return{deltaX:(this.content.fitWidth*t-s)*n,deltaY:(this.content.fitHeight*t-o)*h}}panTo({x:t=this.content.x,metaX:i=this.content.metaX,y:e=this.content.y,scale:s,friction:o=this.option("friction"),ignoreBounds:n=!1}={}){if(s=s||this.content.scale||1,!n){const{boundX:o,boundY:n}=this.getBounds(s);o&&(t=Math.max(Math.min(t,o.to),o.from),i=Math.max(Math.min(i,o.to),o.from)),n&&(e=Math.max(Math.min(e,n.to),n.from))}this.friction=o,this.transform={...this.transform,x:t,metaX:i,y:e,scale:s},o?(this.state="panning",this.velocity={x:this.options.flatXTransition?10*(1/this.friction-1)*(t-this.content.x)/Math.abs(t-this.content.x):(1/this.friction-1)*(t-this.content.x),metaX:(1/this.friction-1)*(i-this.content.metaX),y:(1/this.friction-1)*(e-this.content.y),scale:(1/this.friction-1)*(s-this.content.scale)},this.startAnimation()):this.endAnimation()}startAnimation(){this.rAF?cancelAnimationFrame(this.rAF):this.trigger("startAnimation"),this.rAF=requestAnimationFrame((()=>this.animate()))}animate(){if(this.setEdgeForce(),this.setDragForce(),this.velocity.metaX*=this.friction,Math.abs(this.velocity.metaX)<.05&&(this.velocity.metaX=0),this.options.flatXTransition||(this.velocity.x*=this.friction),this.velocity.y*=this.friction,this.velocity.scale*=this.friction,this.content.x+=this.velocity.x,this.content.metaX+=this.velocity.metaX,this.content.y+=this.velocity.y,this.content.scale+=this.velocity.scale,this.options.flatXTransition&&0===this.velocity.metaX&&Math.abs(Math.abs(this.content.x)-Math.abs(this.content.metaX))<(1/this.friction-1)*this.friction*25&&(this.content.x=this.content.metaX,this.velocity.x=0),this.isAnimating())this.setTransform();else if("pointerdown"!==this.state)return void this.endAnimation();this.rAF=requestAnimationFrame((()=>this.animate()))}getBounds(t){let i=this.boundX,s=this.boundY;if(void 0!==i&&void 0!==s)return{boundX:i,boundY:s};i={from:0,to:0},s={from:0,to:0},t=t||this.transform.scale;const o=this.content.fitWidth*t,n=this.content.fitHeight*t,h=this.viewport.width,r=this.viewport.height;if(o<h){const t=e(.5*(h-o));i.from=t,i.to=t}else i.from=e(h-o);if(n<r){const t=.5*(r-n);s.from=t,s.to=t}else s.from=e(r-n);return{boundX:i,boundY:s}}setEdgeForce(){if("decel"!==this.state)return;const t=this.option("bounceForce"),{boundX:i,boundY:e}=this.getBounds(Math.max(this.transform.scale,this.content.scale));let s,o,n,h;if(i&&(s=this.content.x<i.from,o=this.content.x>i.to),e&&(n=this.content.y<e.from,h=this.content.y>e.to),s||o){const e=s?i.from:i.to;let o=(e-this.content.x)*t,n=(e-this.content.metaX)*t;const h=this.content.x+(this.velocity.x+o)/this.friction,r=this.content.metaX+(this.velocity.metaX+n)/this.friction;h>=i.from&&h<=i.to&&(o+=this.velocity.x),r>=i.from&&r<=i.to&&(n+=this.velocity.metaX),this.velocity.x=n,this.velocity.metaX=n,this.recalculateTransform()}if(n||h){let i=((n?e.from:e.to)-this.content.y)*t;const s=this.content.y+(i+this.velocity.y)/this.friction;s>=e.from&&s<=e.to&&(i+=this.velocity.y),this.velocity.y=i,this.recalculateTransform()}}setDragResistance(){if("pointerdown"!==this.state)return;const{boundX:t,boundY:i}=this.getBounds(this.dragPosition.scale);let e,s,o,n;if(t&&(e=this.dragPosition.x<t.from,s=this.dragPosition.x>t.to),i&&(o=this.dragPosition.y<i.from,n=this.dragPosition.y>i.to),(e||s)&&(!e||!s)){const i=e?t.from:t.to,s=i-this.dragPosition.x;this.dragPosition.x=i-.3*s,this.dragPosition.metaX=i-.3*s}if((o||n)&&(!o||!n)){const t=o?i.from:i.to,e=t-this.dragPosition.y;this.dragPosition.y=t-.3*e}}setDragForce(){"pointerdown"===this.state&&(this.velocity.x=this.dragPosition.x-this.content.x,this.velocity.metaX=this.dragPosition.metaX-this.content.metaX,this.velocity.y=this.dragPosition.y-this.content.y,this.velocity.scale=this.dragPosition.scale-this.content.scale)}recalculateTransform(){this.transform.x=this.content.x+this.velocity.x/(1/this.friction-1),this.transform.metaX=this.content.metaX+this.velocity.metaX/(1/this.friction-1),this.transform.y=this.content.y+this.velocity.y/(1/this.friction-1),this.transform.scale=this.content.scale+this.velocity.scale/(1/this.friction-1)}isAnimating(){return!(!this.friction||!(Math.abs(this.velocity.x)>.05||Math.abs(this.velocity.y)>.05||Math.abs(this.velocity.scale)>.05))}setTransform(t){let i,s,o,n;if(t?(i=e(this.transform.x),s=e(this.transform.metaX),o=e(this.transform.y),n=this.transform.scale,this.content={...this.content,x:i,metaX:s,y:o,scale:n}):(i=e(this.content.x),s=e(this.content.metaX),o=e(this.content.y),n=this.content.scale/(this.content.width/this.content.fitWidth),this.content={...this.content,x:i,metaX:s,y:o}),this.trigger("beforeTransform"),i=e(this.content.x),o=e(this.content.y),t&&this.option("zoom")){let t,s;t=e(this.content.fitWidth*n),s=e(this.content.fitHeight*n),this.content.width=t,this.content.height=s,this.transform={...this.transform,width:t,height:s,scale:n},Object.assign(this.$content.style,{width:`${t}px`,height:`${s}px`,maxWidth:"none",maxHeight:"none",transform:`translate3d(${i}px, ${o}px, 0) scale(1)`})}else this.$content.style.transform=`translate3d(${i}px, ${o}px, 0) scale(${n})`;this.trigger("afterTransform")}endAnimation(t){cancelAnimationFrame(this.rAF),this.rAF=null,this.velocity={x:0,metaX:0,y:0,scale:0},this.setTransform(!0),this.state="ready",this.handleCursor(),!0!==t&&this.trigger("endAnimation")}handleCursor(){const t=this.option("draggableClass");t&&this.option("touch")&&(1==this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale")?this.$container.classList.remove(t):this.$container.classList.add(t))}detachEvents(){this.$content.removeEventListener("load",this.onLoad),this.$container.removeEventListener("wheel",this.onWheel,{passive:!1}),this.$container.removeEventListener("click",this.onClick,{passive:!1}),this.pointerTracker&&(this.pointerTracker.stop(),this.pointerTracker=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}destroy(){"destroy"!==this.state&&(this.state="destroy",clearTimeout(this.updateTimer),this.updateTimer=null,cancelAnimationFrame(this.rAF),this.rAF=null,this.detachEvents(),this.detachPlugins(),this.resetDragPosition())}}l.version="4.0.32",l.Plugins={};export{l as Panzoom};
