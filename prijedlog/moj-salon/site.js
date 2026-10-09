
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

(function(){var box=document.getElementById('qbox');var pr=document.getElementById('pr');
 try{if(pr){pr.value=sessionStorage.getItem('mojsalon_pr')||'Šišanje i njega'}}catch(e){if(pr)pr.value='Šišanje i njega'}
 if(!box)return;var Q={"q": [["Kakva vam je kosa?", [["Oštećena ili suha", "nakon bojanja, ravnanja, sunca"], ["Normalna", "bez većih problema"], ["Tanka", "teško drži oblik"], ["Za dijete", "šišanje ili pletenice"]]], ["Što želite?", [["Osvježiti", "malo skratiti, urediti"], ["Promjenu", "novi kroj ili boju"], ["Njegu", "da kosa opet sjaji"], ["Nešto posebno", "pletenice, svečano"]]], ["Kad vam treba?", [["Što prije", "ovaj tjedan"], ["Nije hitno", "sljedećih par tjedana"], ["Za događaj", "vjenčanje, krizma, matura"], ["Redovito", "fiksni termin svaki mjesec"]]]]}.q,ans=[],bar=document.getElementById('qbar');
 function rec(){var a=ans[0],b=ans[1],c=ans[2];var t,l=[];
  if(a===3||b===3){t='Pletenice i posebne frizure';l=['Pletenice za djecu i odrasle','Svečane frizure za događaje','Javite nam motiv ili sliku']}
  else if(a===0||b===2){t='Njega oštećene kose';l=['Dubinska njega i tretman','Lagano skraćivanje vrhova','Savjet za njegu kod kuće']}
  else if(b===1){t='Novi kroj ili boja';l=['Konzultacija prije početka','Kroj prilagođen obliku glave','Boja ili pramenovi po želji']}
  else{t='Šišanje i osvježenje';l=['Pranje, šišanje i fen','Kratko i bez čekanja','Može i fiksni termin']}
  if(c===2)l.push('Za događaj: javite datum na vrijeme');if(c===3)l.push('Rezervirajte stalni termin svaki mjesec');return [t,l]}
 function show(){bar.style.width=(ans.length/Q.length*100)+'%';box.innerHTML='';
  if(ans.length<Q.length){var q=Q[ans.length];var h=document.createElement('h2');h.textContent=(ans.length+1)+'/3 · '+q[0];box.appendChild(h);
   var o=document.createElement('div');o.className='opts';o.style.marginTop='14px';q[1].forEach(function(x,i){var b=document.createElement('button');b.type='button';b.innerHTML='<span></span><small></small>';b.firstChild.textContent=x[0];b.lastChild.textContent=x[1];b.addEventListener('click',function(){ans.push(i);show()});o.appendChild(b)});box.appendChild(o)}
  else{var r=rec();try{sessionStorage.setItem('mojsalon_pr',r[0])}catch(e){}
   var d=document.createElement('div');d.className='res';d.innerHTML='<span class="tag">Naš prijedlog</span><h3></h3><ul></ul><div class="row"><a class="btn" href="kontakt.html">Pošalji upit</a><button type="button" class="btn ghost">Ispočetka</button></div>';
   d.querySelector('h3').textContent=r[0];r[1].forEach(function(x){var li=document.createElement('li');li.textContent=x;d.querySelector('ul').appendChild(li)});
   d.querySelector('.ghost').addEventListener('click',function(){ans=[];show()});box.appendChild(d)}}
 show()})();

(function(){var H={"1": [8, 20], "2": [8, 20], "3": [8, 20], "4": [8, 20], "5": [8, 13]},el=document.querySelectorAll('[data-open]');if(!el.length)return;
 var d=new Date(),wd=(d.getDay()+6)%7,h=d.getHours()+d.getMinutes()/60,t=H[wd],txt;
 if(t&&h>=t[0]&&h<t[1])txt='Danas radimo do '+t[1]+':00';
 else{for(var k=0;k<8;k++){var w=(wd+k)%7,x=H[w];if(x&&(k>0||h<x[0])){var dn=['ponedjeljak','utorak','srijedu','četvrtak','petak','subotu','nedjelju'][w];txt=(k===0?'Otvaramo danas u ':k===1?'Otvaramo sutra u ':'Otvaramo u '+dn+' u ')+x[0]+':00';break}}}
 el.forEach(function(e){e.textContent=txt;e.classList.toggle('isopen',!!(t&&h>=t[0]&&h<t[1]))})})();
