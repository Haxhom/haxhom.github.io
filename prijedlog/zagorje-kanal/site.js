
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
  var D={"sudoper": {"t": "Sudoper ili umivaonik ne otječe", "u": true, "s": ["Opišete nam problem telefonom", "Dolazimo i odštopavamo strojno ili spiralom", "Provjerimo protok i počistimo za sobom"]}, "wc": {"t": "Začepljen WC", "u": true, "s": ["Nazovite odmah, ovo je hitno", "Odštopavanje sajlom ili vodom pod tlakom", "Ako se ponavlja, kamerom tražimo uzrok"]}, "tus": {"t": "Tuš ili kada sporo otječe", "u": false, "s": ["Dogovorimo termin", "Čišćenje sifona i odvoda", "Savjet kako spriječiti ponovno začepljenje"]}, "miris": {"t": "Neugodan miris iz odvoda", "u": false, "s": ["Pregled odvoda i sifona", "Video inspekcija ako je uzrok dublje", "Uklanjanje uzroka, a ne samo mirisa"]}, "dvoriste": {"t": "Kanalizacija u dvorištu ili šaht", "u": true, "s": ["Pregled okna i cijevi", "Visokotlačno ispiranje kanalizacije", "Po potrebi sanacija ili izrada šahta"]}, "neznam": {"t": "Ne znam što je problem", "u": false, "s": ["Nazovite i opišite što vidite", "Kamerom pogledamo unutrašnjost cijevi", "Pokažemo vam snimku prije bilo kakvih radova"]}};
  var tiles=document.querySelectorAll('.tile');
  tiles.forEach(function(t){t.addEventListener('click',function(){
    tiles.forEach(function(x){x.setAttribute('aria-pressed',String(x===t))});
    var d=D[t.dataset.k];
    document.getElementById('rt').textContent=d.t;
    document.getElementById('urgt').textContent=d.u?'Hitno, dolazimo odmah':'Dogovaramo termin';
    document.getElementById('urg').querySelector('i').style.background=d.u?'':'#7a8f9f';
    var ol=document.getElementById('rs');ol.innerHTML='';d.s.forEach(function(s){var li=document.createElement('li');li.textContent=s;ol.appendChild(li)});
  })});
  var fill=document.getElementById('fill');
  if(fill){var fl=fill.closest('.flow');function upd(){var r=fl.getBoundingClientRect();var p=(innerHeight*0.7-r.top)/r.height;fill.style.transform='scaleY('+Math.max(0,Math.min(1,p))+')'}addEventListener('scroll',upd,{passive:true});upd()}
})();
