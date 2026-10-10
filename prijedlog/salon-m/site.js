
(function(){
  var b=document.querySelector('[data-burger]'),m=document.querySelector('[data-mnav]');
  if(b&&m){b.addEventListener('click',function(){var o=!m.hidden;m.hidden=o;b.setAttribute('aria-expanded',String(!o))})}
  var f=document.querySelector('form[data-demo]');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();var n=document.getElementById('note');if(n)n.hidden=false})}
})();

(function(){
  var lb=document.querySelector('[data-lb]');if(!lb)return;
  var items=[].slice.call(document.querySelectorAll('[data-lbitem]')),i=0,im=lb.querySelector('img'),cap=lb.querySelector('p');
  function show(n){i=(n+items.length)%items.length;var s=items[i].querySelector('img');im.src=s.src.replace(/w=\d+/,'w=1800');im.alt=s.alt;cap.textContent=s.alt}
  items.forEach(function(it,n){it.addEventListener('click',function(){show(n);lb.hidden=false;lb.querySelector('[data-x]').focus()})});
  function close(){lb.hidden=true}
  lb.querySelector('[data-x]').addEventListener('click',close);
  lb.querySelector('[data-prev]').addEventListener('click',function(){show(i-1)});
  lb.querySelector('[data-next]').addEventListener('click',function(){show(i+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
})();

(function(){var H={"0": [12, 19], "1": [12, 19], "2": [12, 19], "3": [8, 15], "4": [8, 15], "5": [7, 12]},el=document.querySelectorAll('[data-open]');if(!el.length)return;
 var d=new Date(),wd=(d.getDay()+6)%7,h=d.getHours()+d.getMinutes()/60,t=H[wd],txt;
 if(t&&h>=t[0]&&h<t[1])txt='Danas radimo do '+t[1]+':00';
 else{for(var k=0;k<8;k++){var w=(wd+k)%7,x=H[w];if(x&&(k>0||h<x[0])){var dn=['ponedjeljak','utorak','srijedu','četvrtak','petak','subotu','nedjelju'][w];txt=(k===0?'Otvaramo danas u ':k===1?'Otvaramo sutra u ':'Otvaramo u '+dn+' u ')+x[0]+':00';break}}}
 el.forEach(function(e){e.textContent=txt;e.classList.toggle('isopen',!!(t&&h>=t[0]&&h<t[1]))})})();

(function(){
  var ph=document.getElementById('ph');if(!ph)return;
  var imgs=[].slice.call(ph.querySelectorAll('img')),bars=[].slice.call(ph.querySelectorAll('.ph-bars b')),cap=document.getElementById('ph-cap'),pb=ph.querySelector('.ph-pause');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,i=0,t0=null,dur=4500,paused=reduce,visible=true,raf;
  function go(n){i=(n+imgs.length)%imgs.length;imgs.forEach(function(im,k){im.classList.toggle('on',k===i);if(k===(i+1)%imgs.length)im.loading='eager'});bars.forEach(function(b,k){b.style.width=k<i?'100%':'0'});if(paused)bars[i].style.width='100%';cap.textContent=imgs[i].dataset.cap;t0=null}
  function tick(t){if(!paused&&visible){if(t0===null)t0=t;var p=Math.min((t-t0)/dur,1);bars[i].style.width=(p*100)+'%';if(p>=1)go(i+1)}raf=requestAnimationFrame(tick)}
  function setPaused(v){paused=v;pb.setAttribute('aria-label',v?'Pokreni priče':'Zaustavi priče');pb.firstChild.textContent=v?'▶':'❚❚';t0=null;if(v)bars[i].style.width='100%'}
  ph.querySelector('.ph-tap.l').addEventListener('click',function(){go(i-1)});
  ph.querySelector('.ph-tap.r').addEventListener('click',function(){go(i+1)});
  pb.addEventListener('click',function(){setPaused(!paused)});
  ph.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){go(i+1);e.preventDefault()}if(e.key==='ArrowLeft'){go(i-1);e.preventDefault()}});
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting;t0=null}).observe(ph);
  document.addEventListener('visibilitychange',function(){visible=!document.hidden;t0=null});
  setPaused(paused);go(0);raf=requestAnimationFrame(tick);
})();

(function(){
  var f=document.getElementById('bk');if(!f)return;
  var H={1:[12,19],2:[12,19],3:[12,19],4:[8,15],5:[8,15],6:[7,12]};
  function chip(n,v,l,dis){return '<label class="bk-c"><input type="radio" name="'+n+'" value="'+v+'"'+(dis?' disabled':'')+'><span>'+l+'</span></label>'}
  f.querySelectorAll('[data-list]').forEach(function(g){g.innerHTML=g.dataset.list.split('|').map(function(x){return chip('usluga',x,x)}).join('')});
  var now=new Date(),days=[],fw=new Intl.DateTimeFormat('hr-HR',{weekday:'short'}),fl=new Intl.DateTimeFormat('hr-HR',{weekday:'long',day:'numeric',month:'numeric'});
  for(var i=0;i<10;i++)days.push(new Date(now.getFullYear(),now.getMonth(),now.getDate()+i));
  var dEl=document.getElementById('bk-days'),sEl=document.getElementById('bk-slots'),pv=document.getElementById('bk-prev'),er=document.getElementById('bk-err');
  dEl.innerHTML=days.map(function(d,i){var h=H[d.getDay()],last=h&&i===0&&now.getHours()>=h[1]-1;return chip('dan',i,'<small>'+(i===0?'danas':i===1?'sutra':fw.format(d).replace('.',''))+'</small><b>'+d.getDate()+'.</b>',!h||last)}).join('');
  var st={usluga:null,dan:null,vrijeme:null};
  function slots(){
    if(st.dan===null){sEl.innerHTML='<p class="bk-empty">Prvo odaberite dan.</p>';return}
    var d=days[st.dan],h=H[d.getDay()],out=[];
    for(var t=h[0];t<h[1];t++){var past=st.dan===0&&t<=now.getHours();out.push(chip('vrijeme',t+':00',t+':00',past))}
    sEl.innerHTML=out.join('')+chip('vrijeme','svejedno','Svejedno');st.vrijeme=null;
  }
  function msg(){
    return 'Pozdrav, željela bih termin: '+st.usluga.toLowerCase()+', '+fl.format(days[st.dan])+(st.vrijeme==='svejedno'?', bilo kada':' oko '+st.vrijeme)+'.'+(f.ime.value.trim()?' '+f.ime.value.trim():'');
  }
  function prev(){pv.textContent=(st.usluga&&st.dan!==null&&st.vrijeme)?msg():'Odaberite uslugu, dan i vrijeme.'}
  f.addEventListener('change',function(e){var n=e.target.name;if(n in st){st[n]=n==='dan'?+e.target.value:e.target.value;if(n==='dan')slots()}er.hidden=true;prev()});
  f.ime.addEventListener('input',prev);
  f.addEventListener('submit',function(e){e.preventDefault();
    var miss=!st.usluga?'uslugu':st.dan===null?'dan':!st.vrijeme?'vrijeme':null;
    if(miss){er.textContent='Odaberite '+miss+'.';er.hidden=false;var q=!st.usluga?'[name=usluga]':st.dan===null?'[name=dan]:not(:disabled)':'[name=vrijeme]:not(:disabled)';var el=f.querySelector(q);if(el)el.focus();return}
    window.open('https://wa.me/385977531914?text='+encodeURIComponent(msg()),'_blank','noopener');
  });
})();
