
(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.mnav');
  if(b&&m){b.addEventListener('click',function(){var o=m.hasAttribute('data-open');o?m.removeAttribute('data-open'):m.setAttribute('data-open','');b.setAttribute('aria-expanded',String(!o))})}
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight){el.classList.add('pre');io.observe(el)}});
  }
  var lb=document.querySelector('.lb');
  if(lb){
    var items=[].slice.call(document.querySelectorAll('.gallery button')),i=0,li=lb.querySelector('img'),lp=lb.querySelector('p');
    function show(n){i=(n+items.length)%items.length;var im=items[i].querySelector('img');li.src=im.src.replace('w=900','w=1800');li.alt=im.alt;lp.textContent=im.alt}
    items.forEach(function(g,n){g.addEventListener('click',function(){show(n);lb.hidden=false;lb.querySelector('.x').focus()})});
    function close(){lb.hidden=true}
    lb.querySelector('.x').addEventListener('click',close);
    lb.querySelector('.pv').addEventListener('click',function(){show(i-1)});
    lb.querySelector('.nx').addEventListener('click',function(){show(i+1)});
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
  }
  var f=document.querySelector('form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('note').hidden=false})}
})();
