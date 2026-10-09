
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
  var days=document.getElementById('days');if(!days)return;
  var MON=['Siječanj','Veljača','Ožujak','Travanj','Svibanj','Lipanj','Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'];
  var today=new Date();today.setHours(0,0,0,0);
  var view=new Date(today.getFullYear(),today.getMonth(),1),a=null,b=null;
  function key(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
  function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  // example busy dates: a few weekends relative to today, clearly labelled as example
  var busy={};[[9,11],[23,25],[37,38],[51,53]].forEach(function(r){for(var k=r[0];k<=r[1];k++){var d=new Date(today);d.setDate(d.getDate()+k);busy[key(d)]=1}});
  function fmt(d){return d.getDate()+'. '+(d.getMonth()+1)+'.'}
  function render(){
    document.getElementById('mon').textContent=MON[view.getMonth()]+' '+view.getFullYear();
    document.getElementById('prev').disabled=(view.getFullYear()===today.getFullYear()&&view.getMonth()===today.getMonth());
    days.innerHTML='';
    var first=(new Date(view.getFullYear(),view.getMonth(),1).getDay()+6)%7,n=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    for(var p=0;p<first;p++){var s=document.createElement('span');s.className='pad';days.appendChild(s)}
    for(var d=1;d<=n;d++){
      var dt=new Date(view.getFullYear(),view.getMonth(),d),btn=document.createElement('button');btn.type='button';btn.textContent=d;
      btn.setAttribute('aria-label',fmt(dt)+view.getFullYear());
      if(dt<today)btn.disabled=true;
      else if(busy[key(dt)]){btn.classList.add('busy');btn.disabled=true;btn.setAttribute('aria-label',fmt(dt)+' zauzeto')}
      if(a&&+dt===+a||b&&+dt===+b)btn.classList.add('edge');
      else if(a&&b&&dt>a&&dt<b)btn.classList.add('in');
      (function(dt){btn.addEventListener('click',function(){pick(dt)})})(dt);
      days.appendChild(btn)}
    summary()}
  function rangeFree(x,y){for(var d=new Date(x);d<y;d.setDate(d.getDate()+1)){if(busy[key(d)])return false}return true}
  function pick(dt){if(!a||b||dt<=a){a=dt;b=null}else if(rangeFree(a,dt)){b=dt}else{a=dt;b=null}render()}
  function summary(){var t=document.getElementById('sumt'),g=document.getElementById('go');
    if(a&&b){var nights=Math.round((b-a)/864e5);t.textContent=fmt(a)+' – '+fmt(b)+' · '+nights+(nights===1?' noć':(nights<5?' noći':' noći'));g.setAttribute('aria-disabled','false');
      var d1=document.getElementById('d1'),d2=document.getElementById('d2');if(d1){d1.value=iso(a);d2.value=iso(b)}}
    else{t.textContent=a?'Dolazak '+fmt(a)+', odaberite odlazak':'Odaberite dolazak';g.setAttribute('aria-disabled','true')}}
  document.getElementById('prev').addEventListener('click',function(){view.setMonth(view.getMonth()-1);render()});
  document.getElementById('next').addEventListener('click',function(){view.setMonth(view.getMonth()+1);render()});
  render();
})();
