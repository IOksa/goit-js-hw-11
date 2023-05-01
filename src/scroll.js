import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35857316-b0404474f9c8f0cfe824c51d8";
let countPage=1;
let searchQuery="";
let queryLimit=40;

const refs={
    form: document.querySelector('#search-form'),
    input: document.querySelector('.search-input'),
    div: document.querySelector(".gallery"),
    guard: document.querySelector('.js-guard'),   
}

let gallery = new SimpleLightbox('.gallery a');

const options = {
  root: null,
  rootMargin: "300px",
  threshold: 0,
};
const observer = new IntersectionObserver(onScrollPagination, options);

refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(event){
    event.preventDefault();

    countPage=1;
    refs.div.innerHTML="";

    const form = event.currentTarget;
    searchQuery = form.elements.searchQuery.value.trim();
    if(searchQuery!==""){
      fetchQuery()
      .then(handlerQueryResponse)
      .catch(err=>{
        Notify.failure('Ooops! Something went wrong!');
        console.error(err);
      });
    }
    else{
      Notify.failure('Empty search input');
    }
    
}

async function fetchQuery(){
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: queryLimit,
        page: countPage,

    });

    return await axios.get(`${BASE_URL}?${params}`);
    
    // return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
    
}

function handlerQueryResponse(queryResponse){
     if (queryResponse.data.hits.length===0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    else{
        renderMarkup(queryResponse);
         
        if(countPage>1){
            const countImage=countPage*queryLimit;
            Notify.info(`Hooray! We found ${countImage} images.`);
        }

        console.log(countPage,"   ", queryResponse.data.totalHits/queryLimit);
        if(countPage<queryResponse.data.totalHits/queryLimit){
            observer.observe(refs.guard);

        }else{
            observer.unobserve(refs.guard);
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
       
    }
}

function renderMarkup(queryResponse){
    const markup=createImageGalleryMarkup(queryResponse.data.hits);
    refs.div.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
}

function createImageGalleryMarkup(arr){
    console.log("arr=", arr);

    return arr.map(({largeImageURL, webformatURL, tags, views, likes, comments, downloads})=>
        `<div class="photo-card">
       
        <div class="img-thumb">
        <a href="${largeImageURL}" class="photo-card__link">
        <img class="photo-card__image"" src="${webformatURL}" alt="{tags}" loading="lazy" data-source="large-image.jpg"/>
        </a>
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>`).join('');
    
}

function onScrollPagination(entries, observer){
  console.log('I am onScrollPagination');
  entries.forEach((entry) => {
    
    if (entry.isIntersecting) {
      countPage += 1;

      fetchQuery()
     .then(handlerQueryResponse)
     .catch(err=>{
      Notify.failure('Ooops! Something went wrong!');
      console.error(err);
     });
    }
  });
}