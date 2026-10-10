
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
