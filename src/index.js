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
    LoadMoreBtn: document.querySelector('.load-more'),
    
}

let gallery = new SimpleLightbox('.gallery a');

refs.LoadMoreBtn.hidden=true;

refs.form.addEventListener('submit', onFormSubmit);
refs.LoadMoreBtn.addEventListener('click', onClickLoadMore)

// плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
///////////////////////////////////////////////////////////////////////////////////////////

function onFormSubmit(event){
    event.preventDefault();
    refs.LoadMoreBtn.hidden=true;

    countPage=1;
    refs.div.innerHTML="";

    const form = event.currentTarget;
    searchQuery = form.elements.searchQuery.value;

    fetchQuery()
    .then(checkQueryResponse)
    .catch(err=>Notify.failure('Ooops! Something went wrong!'));
    
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

function checkQueryResponse(queryResponse){
    console.log("queryResponse", queryResponse);
    console.log("queryResponse.hits=",queryResponse.data.hits);

    if (queryResponse.data.hits.length===0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    else{
        const markup=createImageGalleryMarkup(queryResponse.data.hits);
        refs.div.insertAdjacentHTML('beforeend', markup);
        gallery.refresh();
        console.log("queryResponse.data.totalHits", queryResponse.data.totalHits, "  ", queryResponse.data.totalHits/queryLimit)
        console.log("countPage=", countPage);
        if(countPage>1){
            const countImage=countPage*queryLimit;
            Notify.info(`Hooray! We found ${countImage} images.`);
        }

        if(countPage<queryResponse.data.totalHits/queryLimit){
            refs.LoadMoreBtn.hidden = false;
        }else{
            refs.LoadMoreBtn.hidden = true;
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
       
    }
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

function onClickLoadMore(){
    countPage+=1;
    fetchQuery()
    .then(checkQueryResponse)
    .catch(err=>Notify.failure('Ooops! Something went wrong!'));

}