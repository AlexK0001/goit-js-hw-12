import{a as f}from"./assets/vendor-66d0fff2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m=document.getElementById("search-form"),c=document.getElementById("gallery"),n=document.getElementById("load-more");let d="",i=1;const p=15,y="44813412-f6fc02e89419494116d973502",g="https://pixabay.com/api/";m.addEventListener("submit",async o=>{o.preventDefault(),d=o.target.query.value,i=1,c.innerHTML="",n.hidden=!0,await u()});n.addEventListener("click",async()=>{i+=1,await u()});const u=async()=>{try{const r=(await f.get(g,{params:{key:y,q:d,page:i,per_page:p}})).data;r.hits.length>0&&(h(r.hits),n.hidden=!1),c.childElementCount>=r.totalHits&&(n.hidden=!0,alert("We're sorry, but you've reached the end of search results."))}catch(o){console.error("Error fetching data:",o)}},h=o=>{const r=o.map(s=>`
    <div class="gallery-item">
      <img src="${s.webformatURL}" alt="${s.tags}" />
    </div>
  `).join("");c.insertAdjacentHTML("beforeend",r)};
//# sourceMappingURL=commonHelpers.js.map
