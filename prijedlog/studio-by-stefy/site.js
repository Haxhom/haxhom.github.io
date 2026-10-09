
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

(function(){var D=[["Ledena plava", "#E9DFC6", "#2B2A33", "https://images.unsplash.com/photo-1605980766335-d3a41c7332a1?auto=format&fit=crop&w=1400&q=72", "Hladni, svijetli tonovi i pramenovi bez žutila."], ["Med i karamel", "#C68A4E", "#1E140C", "https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1400&q=72", "Topli pramenovi koji osvježe prirodnu boju."], ["Bakreni", "#A2502A", "#FFF4EC", "https://images.unsplash.com/photo-1614020863825-28a0bb7e3c3c?auto=format&fit=crop&w=1400&q=72", "Bakrene i crvenkaste nijanse za jesen."], ["Čokolada", "#5A3727", "#FFF1E8", "https://images.unsplash.com/photo-1602549179763-ce6c9df961b7?auto=format&fit=crop&w=1400&q=72", "Duboka smeđa s prirodnim sjajem."], ["Srebrna", "#B9BCC2", "#1B1D22", "https://images.unsplash.com/photo-1605980625600-88b46abafa8d?auto=format&fit=crop&w=1400&q=72", "Sijeda i srebrna kosa, njegovana i moderna."], ["Pastelna", "#B49BD4", "#1C1530", "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1400&q=72", "Za hrabre: pastelne i modne boje."]],b=document.querySelectorAll('.sw');b.forEach(function(x){x.addEventListener('click',function(){
 b.forEach(function(y){y.setAttribute('aria-pressed',String(y===x))});var s=D[+x.dataset.i];
 document.documentElement.style.setProperty('--tone',s[1]);document.documentElement.style.setProperty('--on-tone',s[2]);
 var im=document.getElementById('swimg');im.style.opacity=0;setTimeout(function(){im.src=s[3];im.alt=s[0];im.style.opacity=1},200);
 document.getElementById('swn').textContent=s[0];document.getElementById('swd').textContent=s[4]})})})();

(function(){var H={"0": [14, 20], "1": [8, 15], "2": [14, 20], "3": [8, 15], "4": [8, 15], "5": [8, 15]},el=document.querySelectorAll('[data-open]');if(!el.length)return;
 var d=new Date(),wd=(d.getDay()+6)%7,h=d.getHours()+d.getMinutes()/60,t=H[wd],txt;
 if(t&&h>=t[0]&&h<t[1])txt='Danas radimo do '+t[1]+':00';
 else{for(var k=0;k<8;k++){var w=(wd+k)%7,x=H[w];if(x&&(k>0||h<x[0])){var dn=['ponedjeljak','utorak','srijedu','četvrtak','petak','subotu','nedjelju'][w];txt=(k===0?'Otvaramo danas u ':k===1?'Otvaramo sutra u ':'Otvaramo u '+dn+' u ')+x[0]+':00';break}}}
 el.forEach(function(e){e.textContent=txt;e.classList.toggle('isopen',!!(t&&h>=t[0]&&h<t[1]))})})();
