
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
  var ba=document.getElementById('ba');
  if(ba){var r=ba.querySelector('input');function s(){ba.style.setProperty('--x',r.value+'%')}r.addEventListener('input',s);s()}
  function seg(id,cb){var g=document.getElementById(id);if(!g)return;g.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});cb()})})}
  function calc(){
    var dl=document.getElementById('dl');if(!dl)return;
    var a=Math.max(0,parseFloat(dl.value.replace(',','.'))||0)*Math.max(0,parseFloat(document.getElementById('sl').value.replace(',','.'))||0);
    var f=document.querySelector('#fmt [aria-pressed="true"]'),p=+document.querySelector('#lay [aria-pressed="true"]').dataset.p;
    var tile=(+f.dataset.w/100)*(+f.dataset.h/100);var need=a*(1+p/100);
    document.getElementById('m2').textContent=need.toFixed(1);
    document.getElementById('pov').textContent=a.toFixed(1)+' m²';
    document.getElementById('dod').textContent=p+' %';
    document.getElementById('kom').textContent=(a>0?Math.ceil(need/tile):0)+' kom';
  }
  ['dl','sl'].forEach(function(id){var e=document.getElementById(id);if(e)e.addEventListener('input',calc)});
  seg('fmt',calc);seg('lay',calc);calc();
  var fb=document.querySelectorAll('.filters button');
  fb.forEach(function(b){b.addEventListener('click',function(){var c=b.dataset.f;fb.forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll('.grid button').forEach(function(g){g.hidden=!(c==='sve'||g.dataset.c===c)})})});
})();
