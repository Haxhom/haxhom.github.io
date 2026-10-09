
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

(function(){
  var ph=document.getElementById('phone');
  if(ph){
    var imgs=ph.querySelectorAll('img'),bars=ph.querySelectorAll('.bars b'),cap=document.getElementById('stcap'),caps=["Nova sezona, nova frizura", "Nokti koji traju", "Boja i pramenovi", "I najmlađi su dobrodošli", "Kosa i nokti u istom terminu"],i=0,t0=null,dur=4000,paused=false,raf;
    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function go(n){i=(n+imgs.length)%imgs.length;imgs.forEach(function(im,k){im.classList.toggle('on',k===i)});bars.forEach(function(b,k){b.style.width=k<i?'100%':'0'});cap.textContent=caps[i];t0=null}
    function tick(t){if(!paused){if(t0===null)t0=t;var p=Math.min((t-t0)/dur,1);bars[i].style.width=(p*100)+'%';if(p>=1)go(i+1)}raf=requestAnimationFrame(tick)}
    ph.querySelector('.tap.l').addEventListener('click',function(){go(i-1)});
    ph.querySelector('.tap.r').addEventListener('click',function(){go(i+1)});
    var pb=ph.querySelector('.pause');pb.addEventListener('click',function(){paused=!paused;pb.textContent=paused?'▶':'❚❚';pb.setAttribute('aria-label',paused?'Pokreni priče':'Pauziraj priče');if(!paused)t0=null});
    if(reduce){paused=true;pb.textContent='▶';bars[0].style.width='100%'}
    raf=requestAnimationFrame(tick);
  }
  var H={"sisanje": {"t": "Šišanje", "d": "Žensko, muško i dječje šišanje, s pranjem i fenom."}, "boja": {"t": "Boja i pramenovi", "d": "Bojanje i pramenovi, uz savjet koja nijansa vam pristaje."}, "svecane": {"t": "Svečane frizure", "d": "Vjenčanja, krizme i maturalne."}, "nokti": {"t": "Manikura i trajni lak", "d": "Precizno i dugotrajno."}, "djeca": {"t": "Za cijelu obitelj", "d": "Strpljivi smo s djecom, a vi u istom posjetu sredite i kosu i nokte."}},bs=document.querySelectorAll('.bub');
  bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});document.getElementById('ht').textContent=H[b.dataset.k].t;document.getElementById('hd').textContent=H[b.dataset.k].d})});
  var steps={u:['a1','q2','o2'],d:['a2','q3','o3'],t:['a3','q4']};
  document.querySelectorAll('.opts').forEach(function(o){o.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var s=steps[o.dataset.step];var a=document.getElementById(s[0]);a.textContent=b.textContent;a.hidden=false;o.hidden=true;s.slice(1).forEach(function(id){document.getElementById(id).hidden=false})})});
})();
