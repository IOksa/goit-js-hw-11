!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var a=r("bpxeT"),i=r("2TvXO"),s=r("dIxxU"),c=r("h6c0i"),l=r("5IjG7"),u="https://pixabay.com/api/",f="35857316-b0404474f9c8f0cfe824c51d8",d=1,p="",g={form:document.querySelector("#search-form"),input:document.querySelector(".search-input"),div:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")},h=new(e(l))(".gallery a"),m=new IntersectionObserver((function(e,n){console.log("I am onScrollPagination"),e.forEach((function(e){e.isIntersecting&&(d+=1,y().then(b).catch((function(e){c.Notify.failure("Ooops! Something went wrong!"),console.error(e)})))}))}),{root:null,rootMargin:"300px",threshold:0});function y(){return v.apply(this,arguments)}function v(){return(v=e(a)(e(i).mark((function n(){var t;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new URLSearchParams({key:f,q:p,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:d}),e.next=3,s.default.get("".concat(u,"?").concat(t));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function b(e){if(0===e.data.hits.length)c.Notify.failure("Sorry, there are no images matching your search query. Please try again.");else{if(function(e){var n=(t=e.data.hits,console.log("arr=",t),t.map((function(e){var n=e.largeImageURL,t=e.webformatURL,o=(e.tags,e.views),r=e.likes,a=e.comments,i=e.downloads;return'<div class="photo-card">\n       \n        <div class="img-thumb">\n        <a href="'.concat(n,'" class="photo-card__link">\n        <img class="photo-card__image"" src="').concat(t,'" alt="{tags}" loading="lazy" data-source="large-image.jpg"/>\n        </a>\n        </div>\n        <div class="info">\n          <p class="info-item">\n            <b>Likes</b>\n            <span>').concat(r,'</span>\n          </p>\n          <p class="info-item">\n            <b>Views</b>\n            <span>').concat(o,'</span>\n          </p>\n          <p class="info-item">\n            <b>Comments</b>\n            <span>').concat(a,'</span>\n          </p>\n          <p class="info-item">\n            <b>Downloads</b>\n            <span>').concat(i,"</span>\n          </p>\n        </div>\n      </div>")})).join(""));var t;g.div.insertAdjacentHTML("beforeend",n),h.refresh()}(e),d>1){var n=40*d;c.Notify.info("Hooray! We found ".concat(n," images."))}console.log(d,"   ",e.data.totalHits/40),d<e.data.totalHits/40?m.observe(g.guard):(m.unobserve(g.guard),c.Notify.info("We're sorry, but you've reached the end of search results."))}}g.form.addEventListener("submit",(function(e){e.preventDefault(),d=1,g.div.innerHTML="";var n=e.currentTarget;""!==(p=n.elements.searchQuery.value.trim())?y().then(b).catch((function(e){c.Notify.failure("Ooops! Something went wrong!"),console.error(e)})):c.Notify.failure("Empty search input")}))}();
//# sourceMappingURL=scroll.ca4d27f8.js.map
