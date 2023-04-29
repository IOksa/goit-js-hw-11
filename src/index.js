import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35857316-b0404474f9c8f0cfe824c51d8";

const refs={
    form: document.querySelector('#search-form'),
    input: document.querySelector('.search-input'),
    div: document.querySelector(".gallery"),
}

let gallery = new SimpleLightbox('.gallery a');

console.log(refs.form);
console.log(refs.input);
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event){
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    console.log(searchQuery);

    fetchQuery(searchQuery)
    .then(checkQueryResponse)
    .catch(err=>console.error("ERROR!", err));;
    
}

async function fetchQuery(searchQuery){
    console.log("I am in fetchQuery");

    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,

    });

    return await axios.get(`${BASE_URL}?${params}`);
    
    // return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
    
}

function checkQueryResponse(queryResponse){
    console.log("I am in checkQueryResponse");
    console.log("queryResponse", queryResponse);
    console.log("queryResponse.hits=",queryResponse.data.hits);

    if (queryResponse.data.hits.length===0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    else{
        const markup=createImageGalleryMarkup(queryResponse.data.hits);
        console.log(markup);
        refs.div.insertAdjacentHTML('beforeend', markup);
        gallery.refresh();
    
       
    }
}

function createImageGalleryMarkup(arr){
    console.log("arr=", arr);

    const markup=arr.map(({pageURL, previewURL, tags})=>
        `<div class="photo-card">
        <a href="${pageURL}">
        <img src="${previewURL}" alt="{tags}" loading="lazy" data-source="large-image.jpg"/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div>`).join('');
      
    console.log(markup);
    return markup;
    
}