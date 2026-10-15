const pages=[...document.querySelectorAll('.page')];
let current=0;
const counter=document.getElementById('pageCounter');
const prev=document.getElementById('prevBtn');
const next=document.getElementById('nextBtn');
const panel=document.getElementById('contentsPanel');
const contentsBtn=document.getElementById('contentsBtn');
const closeContents=document.getElementById('closeContents');

function showPage(index,direction=1){
  index=Math.max(0,Math.min(pages.length-1,index));
  if(index===current && pages[current].classList.contains('active')) return;
  pages.forEach((p,i)=>{p.classList.remove('active','exit-left'); if(i<index) p.classList.add('exit-left');});
  pages[index].classList.add('active');
  current=index;
  counter.textContent=`${current+1} / ${pages.length}`;
  prev.disabled=current===0; next.disabled=current===pages.length-1;
  prev.style.opacity=prev.disabled?.35:1; next.style.opacity=next.disabled?.35:1;
  document.querySelectorAll('[data-goto]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.goto)===current));
}
function go(delta){showPage(current+delta,delta)}
prev.addEventListener('click',()=>go(-1)); next.addEventListener('click',()=>go(1));
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1);if(e.key==='Escape')panel.classList.remove('open')});

document.querySelectorAll('[data-goto]').forEach(btn=>btn.addEventListener('click',()=>{showPage(Number(btn.dataset.goto));panel.classList.remove('open')}));
contentsBtn.addEventListener('click',()=>panel.classList.add('open'));
closeContents.addEventListener('click',()=>panel.classList.remove('open'));

document.getElementById('fullscreenBtn').addEventListener('click',()=>{if(!document.fullscreenElement){document.documentElement.requestFullscreen?.()}else{document.exitFullscreen?.()}});

// Small swipe support for phones/tablets.
let touchStartX=null;
document.getElementById('book').addEventListener('touchstart',e=>touchStartX=e.changedTouches[0].screenX,{passive:true});
document.getElementById('book').addEventListener('touchend',e=>{if(touchStartX===null)return;const dx=e.changedTouches[0].screenX-touchStartX;if(Math.abs(dx)>50)go(dx<0?1:-1);touchStartX=null},{passive:true});
showPage(0);
