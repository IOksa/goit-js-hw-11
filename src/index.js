import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35857316-b0404474f9c8f0cfe824c51d8";

const refs={
    form: document.querySelector('#search-form'),
    input: document.querySelector('.search-input'),
}

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
    // try {
        // const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
        // console.log(response);
        // const queryResponse = response.json();
        // console.log('queryResponse=', queryResponse);
        // return queryResponse;
    // } catch (error) {
    //     console.log ("Error!");
    //     console.error(error);
    // }
      
    // return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`).then(response=>response.json());

    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
}

function checkQueryResponse(queryResponse){
    console.log("I am in checkQueryResponse");
    console.log("queryResponse", queryResponse);
    console.log("queryResponse.hits=",queryResponse.data.hits);

    if (queryResponse.data.hits.length===0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    else{
        Notify.info(`${queryResponse.data.hits.length}`);
    }
}