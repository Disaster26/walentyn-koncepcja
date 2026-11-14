(function(){
  var d=document;
  // menu mobilne
  var mb=d.getElementById('menu-btn'),mn=d.getElementById('mnav');
  mb.addEventListener('click',function(){var o=mb.getAttribute('aria-expanded')!=='true';mb.setAttribute('aria-expanded',o);mn.classList.toggle('otw',o);if(o)zamknijSzukaj();});
  mn.addEventListener('click',function(e){if(e.target.tagName==='A'){mb.setAttribute('aria-expanded','false');mn.classList.remove('otw');}});

  // wyszukiwarka
  var sb=d.getElementById('szukaj-btn'),sp=d.getElementById('szukaj'),q=d.getElementById('q'),ul=d.getElementById('wyniki'),brak=d.getElementById('brak');
  var hasla=[['Texanger','#p-texanger'],['Bucior parowy','#p-bucior'],['Tapeciarka','#p-tapeciarka'],['Pucybut rewolwerowy','#p-pucybut'],['Wsparcie techniczne','#wsparcie'],['Filmy promocyjne','#filmy'],['Gdzie kupić?','gdzie-kupic.html'],['Gwarancja','#wsparcie'],['Serwisy','#wsparcie']];
  function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l');}
  function pokaz(){var t=norm(q.value.trim()),n=0;ul.innerHTML='';hasla.forEach(function(h){if(!t||norm(h[0]).indexOf(t)>-1){var li=d.createElement('li'),a=d.createElement('a');a.href=h[1];a.textContent=h[0];li.appendChild(a);ul.appendChild(li);n++;}});brak.hidden=n>0;}
  function zamknijSzukaj(){sp.hidden=true;sb.setAttribute('aria-expanded','false');}
  sb.addEventListener('click',function(){var o=sp.hidden;sp.hidden=!o;sb.setAttribute('aria-expanded',o);if(o){mb.setAttribute('aria-expanded','false');mn.classList.remove('otw');pokaz();q.focus();}});
  q.addEventListener('input',pokaz);
  ul.addEventListener('click',zamknijSzukaj);
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&!sp.hidden){zamknijSzukaj();sb.focus();}});

  // karuzela banerow
  var dane=[
    ['Texanger','Twój ogród Twoim Teksasem. Bądź jego Rangerem.','#p-texanger'],
    ['Bucior parowy','Stop chwastom… i brudnym podłogom.','#p-bucior'],
    ['Tapeciarka','Z tapeciarką robota jak błyskawica mknie. Po niej dobry nastrój do domu lgnie.','#p-tapeciarka'],
    ['Pucybut rewolwerowy','Wybierasz się na bal aż do brzasku? Pucybut doda Twoim butom blasku.','#p-pucybut']
  ];
  var sl=d.querySelectorAll('.slajd');
  if(sl.length){
  var sl2=sl,be=d.querySelectorAll('.belki button'),mi=d.querySelectorAll('.miniatury button');
  var ot=d.querySelectorAll('.ot'),ln=d.getElementById('o-link');
  var akt=0,timer=null,ruch=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function idz(i){
    if(typeof dociagnij==='function')dociagnij();
    akt=(i+sl.length)%sl.length;
    for(var k=0;k<sl.length;k++){var on=k===akt;sl[k].classList.toggle('on',on);be[k].setAttribute('aria-current',on);mi[k].setAttribute('aria-current',on);}
    for(var j=0;j<ot.length;j++){ot[j].classList.toggle('on',j===akt);if(j===akt)ot[j].removeAttribute('aria-hidden');else ot[j].setAttribute('aria-hidden','true');}ln.href=dane[akt][2];
  }
  function start(){stop();if(ruch)timer=setInterval(function(){idz(akt+1);},6500);}
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  [].forEach.call(be,function(b,i){b.addEventListener('click',function(){idz(i);start();});});
  [].forEach.call(mi,function(b,i){b.addEventListener('click',function(){idz(i);start();});});
  var sc=d.querySelector('.scena');
  sc.addEventListener('mouseenter',stop);sc.addEventListener('mouseleave',start);
  sc.addEventListener('focusin',stop);
  // przesuwanie palcem i mysza
  var et=d.getElementById('etap'),x0=null,y0=0,przes=false;
  et.addEventListener('pointerdown',function(e){x0=e.clientX;y0=e.clientY;przes=false;});
  et.addEventListener('pointermove',function(e){if(x0!==null&&Math.abs(e.clientX-x0)>10)przes=true;});
  et.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0,dy=e.clientY-y0;x0=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){idz(akt+(dx<0?1:-1));start();}});
  et.addEventListener('pointercancel',function(){x0=null;});
  et.addEventListener('click',function(e){if(przes){e.preventDefault();przes=false;}},true);
  d.addEventListener('visibilitychange',function(){if(d.hidden)stop();else start();});
  function dociagnij(){[].forEach.call(d.querySelectorAll('.slajd img[data-src]'),function(im){im.srcset=im.dataset.srcset;im.src=im.dataset.src;im.removeAttribute('data-src');im.removeAttribute('data-srcset');});}
  if(d.readyState==='complete')setTimeout(dociagnij,300);else window.addEventListener('load',function(){setTimeout(dociagnij,300);});
  start();
  }
  var r=d.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
