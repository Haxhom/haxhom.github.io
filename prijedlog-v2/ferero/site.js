
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
  var s=document.getElementById('strip');
  document.querySelectorAll('[data-dir]').forEach(function(b){b.addEventListener('click',function(){if(!s)return;var w=s.querySelector('.look').getBoundingClientRect().width+16;s.scrollBy({left:w*(+b.dataset.dir),behavior:'smooth'})})});
  function group(id,cb){var g=document.getElementById(id);if(!g)return;g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});cb&&cb()})}
  function sel(id){var b=document.querySelector('#'+id+' [aria-pressed="true"]');return b}
  function times(){var d=sel('day'),t=document.getElementById('time');if(!d||!t)return;t.innerHTML='';
    for(var h=+d.dataset.a;h<+d.dataset.b;h+=0.5){var b=document.createElement('button');b.type='button';var hh=Math.floor(h),mm=h%1?'30':'00';b.textContent=hh+':'+mm;b.setAttribute('aria-pressed',String(h===+d.dataset.a+1));t.appendChild(b)}
    sum()}
  function sum(){var a=sel('svc'),d=sel('day'),t=sel('time');var o=document.getElementById('sumt');if(o)o.textContent=(a?a.textContent:'')+' · '+(d?d.textContent:'')+' · '+(t?t.textContent:'—')}
  group('svc',sum);group('day',times);group('time',sum);times();
})();
