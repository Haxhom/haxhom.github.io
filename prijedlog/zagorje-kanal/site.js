
(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.mnav');
  if(b&&m){b.addEventListener('click',function(){var o=m.hasAttribute('data-open');if(o){m.removeAttribute('data-open')}else{m.setAttribute('data-open','')}b.setAttribute('aria-expanded',String(!o))})}
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var els=[].slice.call(document.querySelectorAll('.reveal'));
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top>innerHeight){el.classList.add('pre');io.observe(el)}});
  }
  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=+el.dataset.count,suf=el.dataset.suf||'',t0=null;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1100,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(step)}
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){requestAnimationFrame(step)}
  });
  var f=document.querySelector('form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('note').hidden=false})}
})();
