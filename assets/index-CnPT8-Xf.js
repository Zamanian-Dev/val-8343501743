(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();document.querySelector("#app").innerHTML=`
  <main class="card">
    <p class="tag">Till varldens mest underbara kvinna</p>
    <h1>Vill du vara min Valentine?</h1>
    <p class="sub">Det finns ett sjalvklart val och en knapp som har lite prestationsangest.</p>

    <div class="button-row">
      <button id="yesBtn" autofocus>Ja, absolut</button>
      <button id="noBtn" tabindex="-1">Nej</button>
    </div>

    <p class="hint" id="hint">Tips: den stora roda knappen gor alla glada.</p>
  </main>

  <section class="celebration hidden" id="celebration" aria-live="polite">
    <div class="celebration-card">
      <h2>Basta. Beslutet. Nagonsin.</h2>
      <p>Du fick precis mitt hjarta att gora en lyckodans.</p>
      <p class="hearts">&lt;3 &lt;3 &lt;3</p>
    </div>
  </section>

  <div id="sparkles"></div>
`;const m=document.getElementById("yesBtn"),i=document.getElementById("noBtn"),h=document.getElementById("hint"),g=document.getElementById("celebration"),p=document.getElementById("sparkles"),f=["Nej","Inte nu","Forsok igen","Nix","Missade","Nastan","Fel knapp"];let c=!1,u=!1;function r(t,e){return Math.random()*(e-t)+t}function y(t,e){const s=m.getBoundingClientRect(),a=i.offsetWidth,n=i.offsetHeight,o=30;return!(t+a>s.left-o&&t<s.right+o&&e+n>s.top-o&&e<s.bottom+o)}function l(){if(c||u)return;u=!0,i.style.position="fixed",i.style.zIndex="40";const t={left:8,top:8,right:window.innerWidth-i.offsetWidth-8,bottom:window.innerHeight-i.offsetHeight-8};let e=r(t.left,Math.max(t.left+1,t.right)),s=r(t.top,Math.max(t.top+1,t.bottom)),a=0;for(;!y(e,s)&&a<40;)e=r(t.left,Math.max(t.left+1,t.right)),s=r(t.top,Math.max(t.top+1,t.bottom)),a+=1;i.style.left=`${e}px`,i.style.top=`${s}px`,i.textContent=f[Math.floor(Math.random()*f.length)],h.textContent="Den har knappen ar inte tillganglig for slutgiltiga svar.",setTimeout(()=>{u=!1},60)}function v(t,e){const s=i.getBoundingClientRect(),a=s.left+s.width/2,n=s.top+s.height/2;return Math.hypot(t-a,e-n)}function b(){p.innerHTML="";for(let t=0;t<110;t+=1){const e=document.createElement("span");e.className="spark",e.textContent=Math.random()>.5?"<3":"*",e.style.left=`${r(0,100)}vw`,e.style.fontSize=`${r(.8,2.1)}rem`,e.style.opacity=r(.5,1).toFixed(2),e.style.transform=`translateX(${r(-30,30)}px)`,e.style.setProperty("--dur",`${r(1.7,3.5)}s`),e.style.animationDelay=`${r(0,.75)}s`,p.appendChild(e)}}i.addEventListener("mouseenter",l);i.addEventListener("mousedown",t=>{t.preventDefault(),l()});i.addEventListener("touchstart",t=>{t.preventDefault(),l()},{passive:!1});i.addEventListener("click",t=>{t.preventDefault(),l()});document.addEventListener("pointermove",t=>{c||v(t.clientX,t.clientY)<120&&l()});m.addEventListener("click",()=>{c=!0,g.classList.remove("hidden"),i.remove(),h.textContent="Klart och valt. Perfekt beslut.",b()});window.addEventListener("resize",()=>{!c&&i.style.position==="fixed"&&l()});
