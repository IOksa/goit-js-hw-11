!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){a[e]=n},n.parcelRequired7c6=r);var o=r("bpxeT"),i=r("2TvXO"),c=r("dIxxU"),s=r("h6c0i"),l=r("5IjG7"),d="https://pixabay.com/api/",u="35857316-b0404474f9c8f0cfe824c51d8",f=1,p="",h={form:document.querySelector("#search-form"),input:document.querySelector(".search-input"),div:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")},m=new(e(l))(".gallery a");function g(){return y.apply(this,arguments)}function y(){return(y=e(o)(e(i).mark((function n(){var t;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new URLSearchParams({key:u,q:p,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:f}),e.next=3,c.default.get("".concat(d,"?").concat(t));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function v(e){if(0===e.data.hits.length)s.Notify.failure("Sorry, there are no images matching your search query. Please try again.");else{var n=e.data.hits.map((function(e){var n=e.largeImageURL,t=e.webformatURL,a=(e.tags,e.views),r=e.likes,o=e.comments,i=e.downloads;return'<div class="photo-card">\n       \n        <div class="img-thumb">\n        <a href="'.concat(n,'" class="photo-card__link">\n        <img class="photo-card__image"" src="').concat(t,'" alt="{tags}" loading="lazy" data-source="large-image.jpg"/>\n        </a>\n        </div>\n        <div class="info">\n          <p class="info-item">\n            <b>Likes</b>\n            <span>').concat(r,'</span>\n          </p>\n          <p class="info-item">\n            <b>Views</b>\n            <span>').concat(a,'</span>\n          </p>\n          <p class="info-item">\n            <b>Comments</b>\n            <span>').concat(o,'</span>\n          </p>\n          <p class="info-item">\n            <b>Downloads</b>\n            <span>').concat(i,"</span>\n          </p>\n        </div>\n      </div>")})).join("");if(h.div.insertAdjacentHTML("beforeend",n),m.refresh(),f>1){var t=document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*t-70,behavior:"smooth"});var a=40*f;s.Notify.info("Hooray! We found ".concat(a," images."))}f<e.data.totalHits/40?h.loadMoreBtn.hidden=!1:(h.loadMoreBtn.hidden=!0,s.Notify.info("We're sorry, but you've reached the end of search results."))}}h.loadMoreBtn.hidden=!0,h.form.addEventListener("submit",(function(e){e.preventDefault(),h.loadMoreBtn.hidden=!0,f=1,h.div.innerHTML="";var n=e.currentTarget;""!==(p=n.elements.searchQuery.value.trim())?g().then(v).catch((function(e){return s.Notify.failure("Ooops! Something went wrong!")})):s.Notify.failure("Empty search input")})),h.loadMoreBtn.addEventListener("click",(function(){f+=1,g().then(v).catch((function(e){return s.Notify.failure("Ooops! Something went wrong!")}))}))}();
//# sourceMappingURL=butLoadMore.ba88d447.js.map