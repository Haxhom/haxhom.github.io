
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

(function(){var B=[["https://images.unsplash.com/photo-1472747624745-ce92d32d3c24?auto=format&fit=crop&w=1400&q=72", "Pletenica sa strane"], ["https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1400&q=72", "Valovi"], ["https://images.unsplash.com/photo-1572954889228-2b12a55144d1?auto=format&fit=crop&w=1400&q=72", "Duga pletenica"], ["https://images.unsplash.com/photo-1605980766335-d3a41c7332a1?auto=format&fit=crop&w=1400&q=72", "Hladna plava"], ["https://images.unsplash.com/photo-1614020863825-28a0bb7e3c3c?auto=format&fit=crop&w=1400&q=72", "Punđa s uvijanjem"], ["https://images.unsplash.com/photo-1572955304332-bf714bd49add?auto=format&fit=crop&w=1400&q=72", "Tanke pletenice"], ["https://images.unsplash.com/photo-1617391654484-2894196c2cc9?auto=format&fit=crop&w=1400&q=72", "Prirodni sjaj"], ["https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1400&q=72", "Pastelna boja"], ["https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=72", "Fen i volumen"], ["https://images.unsplash.com/photo-1613099084406-4b9140fc780a?auto=format&fit=crop&w=1400&q=72", "Pletenice s detaljima"], ["https://images.unsplash.com/photo-1602549179763-ce6c9df961b7?auto=format&fit=crop&w=1400&q=72", "Topla smeđa"], ["https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1400&q=72", "Kratki kroj"]],K='sbl_board',sel=[];try{sel=JSON.parse(sessionStorage.getItem(K)||'[]')}catch(e){sel=[]}
 function save(){try{sessionStorage.setItem(K,JSON.stringify(sel))}catch(e){}}
 function render(){document.querySelectorAll('[data-count]').forEach(function(c){c.textContent=sel.length});
  document.querySelectorAll('.heart').forEach(function(h){h.setAttribute('aria-pressed',String(sel.indexOf(+h.dataset.id)>-1))});
  var th=document.getElementById('tth'),tx=document.getElementById('ttx');
  if(th){th.innerHTML='';sel.slice(-5).forEach(function(i){var im=document.createElement('img');im.src=B[i][0].replace(/w=\d+/,'w=120');im.alt='';th.appendChild(im)});tx.textContent=sel.length?('Spremljeno: '+sel.length):'Još niste spremili nijednu frizuru'}
  var sv=document.getElementById('saved');if(sv&&sel.length){sv.innerHTML='';sel.forEach(function(i){var im=document.createElement('img');im.src=B[i][0].replace(/w=\d+/,'w=160');im.alt=B[i][1];im.title=B[i][1];sv.appendChild(im)})}}
 document.querySelectorAll('.heart').forEach(function(h){h.addEventListener('click',function(){var id=+h.dataset.id,k=sel.indexOf(id);if(k>-1)sel.splice(k,1);else sel.push(id);save();render()})});
 var fb=document.querySelectorAll('.chips button');fb.forEach(function(b){b.addEventListener('click',function(){fb.forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});var c=b.dataset.f;document.querySelectorAll('.pin').forEach(function(p){p.hidden=!(c==='sve'||p.dataset.c===c)})})});
 render()})();

(function(){var H={"0": [8, 20], "1": [8, 20], "2": [8, 20], "3": [8, 20], "4": [8, 20], "5": [8, 14]},el=document.querySelectorAll('[data-open]');if(!el.length)return;
 var d=new Date(),wd=(d.getDay()+6)%7,h=d.getHours()+d.getMinutes()/60,t=H[wd],txt;
 if(t&&h>=t[0]&&h<t[1])txt='Danas radimo do '+t[1]+':00';
 else{for(var k=0;k<8;k++){var w=(wd+k)%7,x=H[w];if(x&&(k>0||h<x[0])){var dn=['ponedjeljak','utorak','srijedu','četvrtak','petak','subotu','nedjelju'][w];txt=(k===0?'Otvaramo danas u ':k===1?'Otvaramo sutra u ':'Otvaramo u '+dn+' u ')+x[0]+':00';break}}}
 el.forEach(function(e){e.textContent=txt;e.classList.toggle('isopen',!!(t&&h>=t[0]&&h<t[1]))})})();
