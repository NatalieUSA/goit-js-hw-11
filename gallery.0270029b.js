function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},t.parcelRequired7c6=a);var s=a("7Y9D8"),i=a("fZKcF"),r=a("2shzp");const l=document.querySelector(".gallery"),c=document.querySelector("input"),p=document.querySelector("#search-form"),f=document.querySelector(".load-more");f.addEventListener("click",(function(){u+=1,f.style.display="none";y(c.value.trim(),u).then((t=>{m(t.hits),d.refresh();const n=Math.ceil(t.totalHits/40);console.log(n),console.log(u),u!==n&&1!==n||(f.style.display="none",e(s).Notify.failure("We're sorry, but you've reached the end of search results."))})),f.style.display="block"})),p.addEventListener("submit",(function(t){t.preventDefault(),l.innerHTML="",u=1,f.style.display="none";const n=c.value.trim();y(n,u).then((t=>{if(""===n||0===t.totalHits)return e(s).Notify.failure("Sorry, there are no images matching your search query. Please try again.");e(s).Notify.success(`Hooray! We found ${t.totalHits} images.`),m(t.hits),f.style.display="block",d.refresh()}))}));const d=new(e(i))(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,scrollZoomFactor:2,overlayOpacity:.9,fadeSpeed:300});let u=1;async function y(e,t){try{const n=(await r.default.get(`https://pixabay.com/api/?key=32856813-557b11f28047fc34e33f2f2e2&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40`)).data;return await n}catch(e){console.error(e)}}function m(e){const t=e.map((({webformatURL:e,largeImageURL:t,tags:n,likes:o,views:a,comments:s,downloads:i})=>`<div class="photo-card">\n         <a href="${t}"><img class="photo" src="${e}" alt="${n}" title="${n}" loading="lazy"/></a>\n          <div class="info">\n             <p class="info-item">\n      <b>Likes</b> <span class="info-item-api"> ${o} </span>\n  </p>\n              <p class="info-item">\n                  <b>Views</b> <span class="info-item-api">${a}</span>\n              </p>\n              <p class="info-item">\n                  <b>Comments</b> <span class="info-item-api">${s}</span>\n              </p>\n              <p class="info-item">\n                  <b>Downloads</b> <span class="info-item-api">${i}</span>\n              </p>\n          </div>\n      </div>`)).join("");l.insertAdjacentHTML("beforeend",t)}f.style.display="none";
//# sourceMappingURL=gallery.0270029b.js.map
