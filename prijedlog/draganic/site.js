
(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.mnav');
  if(b&&m){b.addEventListener('click',function(){var o=m.hasAttribute('data-open');o?m.removeAttribute('data-open'):m.setAttribute('data-open','');b.setAttribute('aria-expanded',String(!o))})}
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight){el.classList.add('pre');io.observe(el)}});
  }
  var fb=document.querySelectorAll('.filters button');
  fb.forEach(function(btn){btn.addEventListener('click',function(){
    var c=btn.dataset.f;fb.forEach(function(x){x.setAttribute('aria-pressed',String(x===btn))});
    document.querySelectorAll('.gallery button').forEach(function(g){g.hidden=!(c==='sve'||g.dataset.c===c)});
  })});
  var lb=document.querySelector('.lb');
  if(lb){
    var li=lb.querySelector('img'),lp=lb.querySelector('p');
    document.querySelectorAll('.gallery button').forEach(function(g){g.addEventListener('click',function(){
      var im=g.querySelector('img');li.src=im.src.replace('w=900','w=1800');li.alt=im.alt;lp.textContent=g.querySelector('span').textContent;lb.hidden=false;lb.querySelector('button').focus();
    })});
    function close(){lb.hidden=true}
    lb.querySelector('button').addEventListener('click',close);
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
  var f=document.querySelector('form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('note').hidden=false})}
})();
