/* v24.393: Layered Task Treasure art. 500px art stays aligned; original pixels are never modified. */
(()=>{ 'use strict';
const ROOT='assets/task-shop/layered/';
const ART={"plush-lop-bunny":{"type":"plush","name":"Lop Bunny Plush","layers":["Plush-Lop-Bunny-color-main.png","Plush-Lop-Bunny-color-secondary.png","Plush-face-color.png","Plush-face-lines.png","Plush-blush.png","Plush-stitch-marks.png","Plush-Lop-Bunny-lines.png"],"defaults":{"main":"#eed7ea","secondary":"#fff0ed","face":"#363036"}},"plush-perky-bunny":{"type":"plush","name":"Perky Bunny Plush","layers":["Plush-Bunny-Perky-color-main.png","Plush-Bunny-Perky-color-Secondary.png","Plush-face-color.png","Plush-face-lines.png","Plush-blush.png","Plush-stitch-marks.png","Plush-Bunny-Perky-lines.png"],"defaults":{"main":"#f6dcbb","secondary":"#fff2f2","face":"#363036"}},"plush-kitty":{"type":"plush","name":"Kitty Plush","layers":["Plush-cat-color-main.png","Plush-cat-color-secondary.png","Plush-face-color.png","Plush-face-lines.png","Plush-blush.png","Plush-stitch-marks.png","Plush-cat-lines.png"],"defaults":{"main":"#d8d9ee","secondary":"#fff4f1","face":"#363036"}},"flower-daisy":{"type":"flower","name":"Daisy Vase","layers":["Stem.png","Daisy-color-1.png","Daisy-color-2.png","Daisy-lines.png","Vase-color.png","Vase-lines.png"],"defaults":{"vase":"#b9dfe7","petal":"#fff9ee","center":"#ffd16c"}},"flower-rose":{"type":"flower","name":"Rose Vase","layers":["Stem.png","Rose-color.png","Rose-lines.png","Vase-color.png","Vase-lines.png"],"defaults":{"vase":"#f1c1d9","petal":"#ed8fab"}},"flower-tulip":{"type":"flower","name":"Tulip Vase","layers":["Stem.png","Tulip-color.png","Tulip-lines.png","Vase-color.png","Vase-lines.png"],"defaults":{"vase":"#e8d2b7","petal":"#f3b58e"}}};
const fileCache=new Map(),renderCache=new Map();
function image(filename){
 if(!fileCache.has(filename))fileCache.set(filename,new Promise((resolve,reject)=>{
  const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Missing collectible layer: '+filename));img.src=ROOT+filename;
 }));
 return fileCache.get(filename);
}
function drawLayer(ctx,src,color,opacity=1){
 const buffer=document.createElement('canvas');buffer.width=500;buffer.height=500;
 const b=buffer.getContext('2d');b.drawImage(src,0,0,500,500);
 if(color){b.globalCompositeOperation='source-in';b.fillStyle=color;b.fillRect(0,0,500,500);b.globalCompositeOperation='source-over';}
 ctx.globalAlpha=opacity;ctx.drawImage(buffer,0,0);ctx.globalAlpha=1;
}
async function render(id,custom={}){
 const def=ART[id];if(!def)return '';
 const opts={...def.defaults,...custom};const key=id+JSON.stringify(opts);
 if(renderCache.has(key))return renderCache.get(key);
 const p=Promise.all(def.layers.map(image)).then(images=>{
  const canvas=document.createElement('canvas');canvas.width=500;canvas.height=500;
  const ctx=canvas.getContext('2d');const d=def.type==='plush';
  const colors=d?[opts.main,opts.secondary,opts.face,null,null,null,null]:id==='flower-daisy'?[null,opts.petal,opts.center,null,opts.vase,null]:[null,opts.petal,null,opts.vase,null];
  images.forEach((img,i)=>drawLayer(ctx,img,colors[i],d && (i===4||i===5) ? .5 : 1));
  return canvas.toDataURL('image/png');
 });
 renderCache.set(key,p);return p;
}
function apply(img,id,styles){
 if(!ART[id]||!img)return;
 const token=String((Number(img.dataset.artToken)||0)+1);img.dataset.artToken=token;
 render(id,styles?.[id]||{}).then(uri=>{if(img.isConnected&&img.dataset.artToken===token){img.src=uri;img.dataset.collectibleArtId=id;}}).catch(e=>console.warn(e));
}
window.DuckieCollectibleArtV393={ART,render,apply};
})();