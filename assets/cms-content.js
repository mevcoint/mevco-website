/* MEVCO CMS content loader: Pages CMS edits content/*.json via GitHub. */
(async () => {
  const page = document.body.dataset.cmsPage;
  const getJSON = async path => {const r=await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error('Unavailable '+path);return r.json();};
  const safeImage = value => typeof value==='string' && (/^\/(?:media|assets)\/[a-z0-9_./-]+\.(?:png|jpe?g|webp|svg)$/i.test(value)||/^assets\/[a-z0-9_./-]+\.(?:png|jpe?g|webp|svg)$/i.test(value));
  try {
    const site=await getJSON('content/site.json');
    if(site.logo && safeImage(site.logo)) document.querySelectorAll('header .logo img,footer img[alt="MEVCO International"]').forEach(img=>img.src=site.logo);
    document.querySelectorAll('footer p').forEach(el=>{
      if(el.textContent.includes('Market Access • Representation • Value')) el.textContent=site.tagline||el.textContent;
      else if(el.textContent.includes('Consumer Health & Brand Distribution')) el.textContent=site.brand_descriptor||el.textContent;
    });
    const connect=document.querySelector('footer .footer-grid > div:last-child');
    if(connect){const p=connect.querySelector('p:last-of-type');
      if(site.contact_email){
        if(p){p.textContent='';const a=document.createElement('a');a.href='mailto:'+site.contact_email;a.textContent=site.contact_email;p.append(a);}
        if(site.contact_phone){const phone=document.createElement('p');phone.textContent=site.contact_phone;connect.append(phone);}
      }
    }
    const info=document.querySelector('.contact-grid');
    if(info && site.contact_email){const note=info.querySelector('.muted.small');if(note){note.textContent='';const a=document.createElement('a');a.href='mailto:'+site.contact_email;a.textContent=site.contact_email;note.append(a);if(site.contact_phone) note.append(' • '+site.contact_phone);}}
  }catch(err){console.warn('CMS site settings not loaded:',err.message);}
  if(!page || page==='brands' || page==='brand')return;
  try {
    const data=await getJSON('content/pages/'+page+'.json');
    document.querySelectorAll('[data-cms-text]').forEach(el=>{const key=el.dataset.cmsText;if(typeof data[key]==='string')el.textContent=data[key];});
    document.querySelectorAll('[data-cms-image]').forEach(el=>{const value=data[el.dataset.cmsImage];if(safeImage(value)){el.src=value;el.hidden=false;el.closest('.hero-art')?.classList.add('has-cms-photo');}else el.hidden=true;});
    if(data.seo_title)document.title=data.seo_title;
    if(data.seo_description){const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=data.seo_description;}
  }catch(err){console.warn('CMS page data unavailable; built-in copy shown:',err.message);}
})();
