(function(){"use strict";var e={4840:function(e,i,t){var a=t(5130),s=t(6768),l=t(4232);const n={id:"app"},r={class:"controls"},o={class:"control-item"},h=["value"],d={class:"control-item"},c={class:"custom-file-upload"},g={class:"control-item"},u={for:"grid-gap-slider"},p={class:"control-item",id:"grid-gap-slider-container"},m={class:"control-item"},f={key:0,class:"loading-overlay"};function v(e,i,t,v,x,k){const y=(0,s.g2)("GridCell");return(0,s.uX)(),(0,s.CE)("div",n,[i[9]||(i[9]=(0,s.Lk)("h1",null,"Photo Grid Collage: n宫格图片生成器",-1)),(0,s.Lk)("div",r,[(0,s.Lk)("div",o,[i[6]||(i[6]=(0,s.Lk)("label",{for:"grid-size"},"选择网格大小：",-1)),(0,s.bo)((0,s.Lk)("select",{"onUpdate:modelValue":i[0]||(i[0]=e=>x.gridSize=e),onChange:i[1]||(i[1]=(...e)=>k.generateGrid&&k.generateGrid(...e))},[((0,s.uX)(),(0,s.CE)(s.FK,null,(0,s.pI)(9,(e=>(0,s.Lk)("option",{key:e+1,value:e+1},(0,l.v_)(e+1)+" x "+(0,l.v_)(e+1),9,h))),64))],544),[[a.u1,x.gridSize]])]),(0,s.Lk)("div",d,[(0,s.Lk)("label",c,[(0,s.Lk)("input",{type:"file",multiple:"",accept:"image/*",onChange:i[2]||(i[2]=(...e)=>k.handleFileUpload&&k.handleFileUpload(...e))},null,32),i[7]||(i[7]=(0,s.eW)(" 上传图片 "))])]),(0,s.Lk)("div",g,[(0,s.Lk)("label",u,"网格间距："+(0,l.v_)(x.gridGap)+"px",1)]),(0,s.Lk)("div",p,[(0,s.bo)((0,s.Lk)("input",{id:"grid-gap-slider",type:"range",min:"0",max:"20","onUpdate:modelValue":i[3]||(i[3]=e=>x.gridGap=e)},null,512),[[a.Jo,x.gridGap]])]),(0,s.Lk)("div",m,[(0,s.Lk)("button",{class:"export-button",onClick:i[4]||(i[4]=(...e)=>k.exportImage&&k.exportImage(...e))},"导出为 JPG"),x.exportedImage?((0,s.uX)(),(0,s.CE)("button",{key:0,class:"download-button",onClick:i[5]||(i[5]=(...e)=>k.downloadImage&&k.downloadImage(...e))}," 下载图片 ")):(0,s.Q3)("",!0)])]),i[10]||(i[10]=(0,s.Lk)("div",null,[(0,s.Lk)("p",{class:"help-text"}," Tips：拖动图片改变位置，缩放图片或滚动鼠标滚轮更改大小。下方预览效果即为导出效果。 ")],-1)),(0,s.Lk)("div",{class:"grid-container",style:(0,l.Tr)(k.gridStyle),ref:"gridContainer"},[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(x.gridCells,((e,i)=>((0,s.uX)(),(0,s.Wv)(y,{key:e.id,image:e.image,onUpdateImage:e=>k.updateCellImage(i,e)},null,8,["image","onUpdateImage"])))),128))],4),x.isLoading?((0,s.uX)(),(0,s.CE)("div",f,i[8]||(i[8]=[(0,s.Lk)("div",{class:"spinner"},null,-1)]))):(0,s.Q3)("",!0),i[11]||(i[11]=(0,s.Lk)("footer",null,[(0,s.Lk)("p",null,[(0,s.eW)(" © 2024~2025 spicyfish. All rights reserved. "),(0,s.Lk)("br"),(0,s.eW)(" 所有图片均在本地处理，不会上传到服务器 ")])],-1))])}t(4114),t(8992),t(3949);const x={class:"grid-cell",ref:"cell"},k=["src"],y={key:1,class:"placeholder"};function I(e,i,t,a,n,r){return(0,s.uX)(),(0,s.CE)("div",x,[t.image?((0,s.uX)(),(0,s.CE)("img",{key:0,src:t.image,class:"draggable",ref:"image",style:(0,l.Tr)(r.imageStyle)},null,12,k)):((0,s.uX)(),(0,s.CE)("div",y,"请上传图片"))],512)}var L=t(2506),C=t.n(L),$={props:{image:String},emits:["updateImage"],data(){return{scale:1,position:{x:0,y:0},imageNaturalWidth:0,imageNaturalHeight:0,cellWidth:0,cellHeight:0,initialScale:1}},computed:{imageStyle(){return{transform:`translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`}}},mounted(){this.image&&(this.$nextTick((()=>{this.initializeImage()})),this.$refs.image&&this.$refs.image.addEventListener("wheel",this.onWheel))},beforeUnmount(){this.$refs.image&&this.$refs.image.removeEventListener("wheel",this.onWheel)},watch:{image(e){e&&this.$nextTick((()=>{this.initializeImage(),this.$refs.image&&this.$refs.image.addEventListener("wheel",this.onWheel)}))}},methods:{initializeImage(){this.position={x:0,y:0},this.scale=1;const e=new Image;e.onload=()=>{this.imageNaturalWidth=e.width,this.imageNaturalHeight=e.height,this.$nextTick((()=>{const e=this.$refs.cell.getBoundingClientRect();this.cellWidth=e.width,this.cellHeight=e.height;const i=this.cellWidth/this.imageNaturalWidth,t=this.cellHeight/this.imageNaturalHeight;this.initialScale=Math.max(i,t),this.scale=this.initialScale;const a=this.imageNaturalWidth*this.initialScale,s=this.imageNaturalHeight*this.initialScale;this.position.x=(this.cellWidth-a/this.scale)/2,this.position.y=(this.cellHeight-s/this.scale)/2,this.initInteract()}))},e.src=this.image},initInteract(){C()(this.$refs.image).draggable({modifiers:[C().modifiers.restrictRect({restriction:this.$refs.cell,endOnly:!0})],listeners:{move:e=>{this.position.x+=e.dx,this.position.y+=e.dy,e.target.style.transform=`translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`}}}).gesturable({listeners:{move:e=>{this.scale*=1+e.ds,this.scale=Math.max(.05*this.initialScale,Math.min(this.scale,10*this.initialScale)),e.target.style.transform=`translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`}}})},onWheel(e){e.preventDefault();const i=e.deltaY<0?.05:-.05,t=1+i,a=this.scale*t,s=.5*this.initialScale,l=3*this.initialScale;this.scale=Math.max(s,Math.min(a,l));const n=this.imageNaturalWidth/this.imageNaturalHeight,r=i,o=i*n;this.position.x-=r,this.position.y-=o,this.$refs.image.style.transform=`translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`}}},b=t(1241);const S=(0,b.A)($,[["render",I]]);var w=S,W=t(2125),E=t.n(W),G={components:{GridCell:w},data(){return{gridSize:2,gridGap:0,gridCells:[],uploadedImages:[],exportedImage:null,isLoading:!1}},computed:{gridStyle(){return{"grid-template-columns":`repeat(${this.gridSize}, 1fr)`,gap:`${this.gridGap}px`}}},methods:{generateGrid(){const e=this.gridSize*this.gridSize;this.gridCells=Array.from({length:e},((e,i)=>({id:i,image:null}))),this.uploadedImages=[],this.exportedImage=null},handleFileUpload(e){const i=Array.from(e.target.files),t=this.gridSize*this.gridSize,a=t-this.uploadedImages.length;i.length>a?alert(`您最多还能上传 ${a} 张图片`):(i.forEach((e=>{const i=new FileReader;i.onload=e=>{this.uploadedImages.push(e.target.result),this.placeImageInGrid(e.target.result)},i.readAsDataURL(e)})),e.target.value="")},placeImageInGrid(e){for(let i=0;i<this.gridCells.length;i++)if(!this.gridCells[i].image){this.gridCells[i].image=e;break}},updateCellImage(e,i){this.$set(this.gridCells,e,{...this.gridCells[e],image:i})},exportImage(){this.isLoading=!0,E()(this.$refs.gridContainer,{useCORS:!0,scale:3}).then((e=>{this.exportedImage=e.toDataURL("image/jpeg"),this.isLoading=!1})).catch((()=>{this.isLoading=!1,alert("导出失败，请重试。")}))},downloadImage(){const e=document.createElement("a");e.href=this.exportedImage,e.download="collage.jpg",e.click()}},mounted(){this.generateGrid()}};const O=(0,b.A)(G,[["render",v]]);var z=O;(0,a.Ef)(z).mount("#app")}},i={};function t(a){var s=i[a];if(void 0!==s)return s.exports;var l=i[a]={id:a,loaded:!1,exports:{}};return e[a].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}t.m=e,function(){var e=[];t.O=function(i,a,s,l){if(!a){var n=1/0;for(d=0;d<e.length;d++){a=e[d][0],s=e[d][1],l=e[d][2];for(var r=!0,o=0;o<a.length;o++)(!1&l||n>=l)&&Object.keys(t.O).every((function(e){return t.O[e](a[o])}))?a.splice(o--,1):(r=!1,l<n&&(n=l));if(r){e.splice(d--,1);var h=s();void 0!==h&&(i=h)}}return i}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[a,s,l]}}(),function(){t.n=function(e){var i=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(i,{a:i}),i}}(),function(){t.d=function(e,i){for(var a in i)t.o(i,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:i[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={524:0};t.O.j=function(i){return 0===e[i]};var i=function(i,a){var s,l,n=a[0],r=a[1],o=a[2],h=0;if(n.some((function(i){return 0!==e[i]}))){for(s in r)t.o(r,s)&&(t.m[s]=r[s]);if(o)var d=o(t)}for(i&&i(a);h<n.length;h++)l=n[h],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(d)},a=self["webpackChunkphoto_grid_collage"]=self["webpackChunkphoto_grid_collage"]||[];a.forEach(i.bind(null,0)),a.push=i.bind(null,a.push.bind(a))}();var a=t.O(void 0,[504],(function(){return t(4840)}));a=t.O(a)})();
//# sourceMappingURL=app.309c71a4.js.map