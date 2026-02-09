(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();document.querySelector("#app").innerHTML=`
  <main class="card">
    <p class="tag">Till världens mest underbara tjej</p>
    <h1>Vill du bli min Valentine? 🥰</h1>

    <div class="button-row">
      <button id="yesBtn" autofocus>Ja, absolut</button>
      <button id="noBtn" tabindex="-1">Nej</button>
    </div>

  </main>

  <section class="celebration hidden" id="celebration" aria-live="polite">
    <div class="celebration-card">
      <h2>Yay! 🥰😍</h2>
      <p class="hearts">&lt;3 &lt;3 &lt;3</p>
    </div>
  </section>

  <div id="sparkles"></div>
`;const m=document.getElementById("yesBtn"),i=document.getElementById("noBtn"),h=document.getElementById("celebration"),f=document.getElementById("sparkles"),p=["Nej","Inte nu","Forsok igen","Nix","Missade","Nastan","Fel knapp"];let c=!1,u=!1;function r(e,t){return Math.random()*(t-e)+e}function y(e,t){const s=m.getBoundingClientRect(),l=i.offsetWidth,n=i.offsetHeight,o=30;return!(e+l>s.left-o&&e<s.right+o&&t+n>s.top-o&&t<s.bottom+o)}function a(){if(c||u)return;u=!0,i.style.position="fixed",i.style.zIndex="40";const e={left:8,top:8,right:window.innerWidth-i.offsetWidth-8,bottom:window.innerHeight-i.offsetHeight-8};let t=r(e.left,Math.max(e.left+1,e.right)),s=r(e.top,Math.max(e.top+1,e.bottom)),l=0;for(;!y(t,s)&&l<40;)t=r(e.left,Math.max(e.left+1,e.right)),s=r(e.top,Math.max(e.top+1,e.bottom)),l+=1;i.style.left=`${t}px`,i.style.top=`${s}px`,i.textContent=p[Math.floor(Math.random()*p.length)],setTimeout(()=>{u=!1},60)}function g(e,t){const s=i.getBoundingClientRect(),l=s.left+s.width/2,n=s.top+s.height/2;return Math.hypot(e-l,t-n)}function v(){f.innerHTML="";for(let e=0;e<110;e+=1){const t=document.createElement("span");t.className="spark",t.textContent=Math.random()>.5?"<3":"*",t.style.left=`${r(0,100)}vw`,t.style.fontSize=`${r(.8,2.1)}rem`,t.style.opacity=r(.5,1).toFixed(2),t.style.transform=`translateX(${r(-30,30)}px)`,t.style.setProperty("--dur",`${r(1.7,3.5)}s`),t.style.animationDelay=`${r(0,.75)}s`,f.appendChild(t)}}i.addEventListener("mouseenter",a);i.addEventListener("mousedown",e=>{e.preventDefault(),a()});i.addEventListener("touchstart",e=>{e.preventDefault(),a()},{passive:!1});i.addEventListener("click",e=>{e.preventDefault(),a()});document.addEventListener("pointermove",e=>{c||g(e.clientX,e.clientY)<120&&a()});m.addEventListener("click",()=>{c=!0,h.classList.remove("hidden"),i.remove(),v()});window.addEventListener("resize",()=>{!c&&i.style.position==="fixed"&&a()});
