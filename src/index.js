import './sass/index.scss';
import axios from "axios";
import Notiflix from 'notiflix';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchGallery } from './fetch.js';
//const axios = require('axios').default;



const API_KEY = "35005985-6320445dd5945a516c4e799c6";
//const axios = require('axios').default;
const form = document.querySelector("#search-form");
const input = document.querySelector("input[name='searchQuery']");
const button = document.querySelector("button[type='submit']");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const formContainer = document.querySelector(".form-container");

//loadMoreBtn.hidden=true;
let descrImage = "";
let page = 1;
const perPage = 40;
const image = document.querySelector("img");
let galleryList=  new SimpleLightbox('.photo-card a');
window.onscroll = function() {scrollFunction()};
let sticky = formContainer.offsetTop;
const URL = `?key=${API_KEY}&q=${descrImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
loadMoreBtn.classList.add('is-hidden');

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function handleSubmit(e){
    e.preventDefault();
    let page = 1;
     const descrImage = e.currentTarget.searchQuery.value.trim();
     gallery.innerHTML='';
     const URL = `?key=${API_KEY}&q=${descrImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
    //console.log(descrImage);
    //console.log(URL);

    
    fetchGallery(descrImage, page, perPage)
    .then((response) => {
        //gallery.innerHTML='';
        loadMoreBtn.classList.remove('is-hidden');
        //console.log(response.data);
        renderImageList(response);
        const totalHits=response.data.totalHits;
        galleryList.refresh();
        //console.log(totalHits);
        if(totalHits===0){
            failureMessage();
            gallery.innerHTML='';
            loadMoreBtn.classList.add('is-hidden');
        }
        if (totalHits<perPage){
            loadMoreBtn.classList.add('is-hidden');
        }
        // if(totalHits>perPage){
        //     loadMoreBtn.classList.remove('is-hidden');
        //     onLoadMoreBtn();
        // }
        if(totalHits>0){
            succesMessage(totalHits);
            const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();
        
          window.scrollBy({
            top: cardHeight *0,
            behavior: 'smooth',
          });

          
        }

        
        
    })
    .catch(error => console.log(error));
    // .finally(() => {
    //   form.reset();
    // });
}

  function renderImageList(response){

    const markup = response.data.hits
    .map((key) => 
    `<div class="photo-card">
    <a class="gallery__link" href=${key.largeImageURL}><img src="${key.webformatURL}" alt="${key.tags}" loading="lazy" /> </a>
    <div class="info">
    <p class="info-item">
    <b>Likes</b>
    ${key.likes}
    </p>
    <p class="info-item">
    <b>Views</b>
    ${key.views}
    </p>
    <p class="info-item">
    <b>Comments</b>
    ${key.comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>
    ${key.downloads}
    </p>
    </div>
    </div>
   `)
   .join("");
    
   return gallery.insertAdjacentHTML('beforeend',markup);
   }       
        
   function succesMessage(data) {
    Notiflix.Notify.success(`Hooray! We found ${data} images.`);
  }

  function failureMessage(data){
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

  }

  function messageEndOfSearch(data){
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");

  }
  
  function scrollFunction() {
    if (window.pageYOffset > sticky) {
        formContainer.classList.add("sticky");
    } else {
        formContainer.classList.remove("sticky");
    }
  }


  function onLoadMoreBtn() {
    
    page += 1;
    //galleryList.destroy();
    const descrImage = input.value.trim();
     gallery.innerHTML='';
    fetchGallery(descrImage, page, perPage)
      .then((response) => {
        console.log(response.data.hits);
        renderImageList(response);
        const totalHits=response.data.totalHits;
        galleryList.refresh();
  
        const totalPages = Math.ceil(totalHits / perPage);
  
        if (page > totalPages) {
          loadMoreBtn.classList.add('is-hidden');
          messageEndOfSearch();
        }
      })
      .catch(error => console.log(error));
  }
