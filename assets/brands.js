/* Only brands explicitly marked published appear publicly. */
(async()=>{
 const list=document.getElementById('brands-list');const detail=document.getElementById('brand-name');
 if(!list&&!detail)return;
 try{
 const r=await fetch('content/brands.json',{cache:'no-store'});if(!r.ok)throw new Error('Portfolio unavailable');
 const all=await r.json(); const brands=Array.isArray(all)?all.filter(x=>x.published===true && /^[a-z0-9-]+$/.test(x.slug||'')):[];
 const safeImage=s=>typeof s==='string' && /^\/(?:media|assets)\/[a-z0-9_./-]+\.(png|jpe?g|webp|svg)$/i.test(s);
 if(list){list.textContent='';if(!brands.length){const p=document.createElement('p');p.className='lead';p.textContent='Our brand portfolio will be announced here as official partnerships are confirmed.';list.append(p);}
 brands.forEach(b=>{const a=document.createElement('a');a.className='brand-card';a.href='brand.html?slug='+encodeURIComponent(b.slug);
 if(safeImage(b.logo||b.image)){const im=document.createElement('img');im.src=b.logo||b.image;im.alt=b.name||'Brand';im.loading='lazy';a.append(im);}
 const tag=document.createElement('span');tag.className='eyebrow';tag.textContent=b.category||'Brand partner';a.append(tag);
 const h=document.createElement('h2');h.textContent=b.name||'Brand';a.append(h);
 const p=document.createElement('p');p.textContent=b.summary||'';a.append(p);list.append(a);});}
 if(detail){const slug=new URLSearchParams(location.search).get('slug');const b=brands.find(x=>x.slug===slug);
 if(!b){detail.textContent='Brand not found';document.getElementById('brand-summary').textContent='This brand page is not available.';return;}
 detail.textContent=b.name;document.title=b.name+' | MEVCO International';document.getElementById('brand-summary').textContent=b.summary||'';
 document.getElementById('brand-description').textContent=b.description||'';
 document.getElementById('brand-category').textContent=b.category||'';
 const im=document.getElementById('brand-image');if(safeImage(b.image||b.logo)){im.src=b.image||b.logo;im.alt=b.name;im.hidden=false;}
 }
 }catch(err){console.warn(err);if(list)list.textContent='The brand portfolio is temporarily unavailable.';if(detail)detail.textContent='Brand portfolio unavailable';}
})();
