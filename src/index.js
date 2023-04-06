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
loadMoreBtn.hidden=true;
let descrImage = "";
let page = 1;
const perPage = 40;
const image = document.querySelector("img");
let galleryList=  new SimpleLightbox('.photo-card a');


const URL = `?key=${API_KEY}&q=${descrImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;


// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
//form.addEventListener("submit", getImage());

//button.addEventListener("click", getImage());
form.addEventListener("submit", handleSubmit);


// function onInput (e){
//     e.preventDefault();
//     let page = 1;
//     let descrImage = e.currentTarget.searchQuery.value.trim();
//     gallery.innerHTML = '';
//     return console.log(descrImage);
// };

function handleSubmit(e){
    e.preventDefault();
    page=1;
     const descrImage = e.currentTarget.searchQuery.value.trim();
     gallery.innerHTML='';
     const URL = `?key=${API_KEY}&q=${descrImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
    console.log(descrImage);
    console.log(URL);


    fetchGallery(descrImage, page, perPage)
    .then((response) => {
        gallery.innerHTML='';
        console.log(response.data);
        renderImageList(response);
        const totalHits=response.data.totalHits;
        console.log(totalHits);
        if(totalHits===0){
            failureMessage();
            gallery.innerHTML='';
        }
        if(totalHits>0){
            succesMessage(totalHits);
            galleryList.refresh();
        }
        
    })
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
    });
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
  



        //   function searchImage (e){
        //     e.preventDefault();
        //     descrImage = e.currentTarget.searchQuery.value.trim();
        //     console.log(descrImage);
        //     getImage(descrImage);
        // };



//===============================================TEST==============================================================================


// const fetchUsers = async () => {
//     const response = await fetch("https://pixabay.com/api/?key=35005985-6320445dd5945a516c4e799c6&q=yellow+flowers&image_type=photo&pretty=true&id=2295434");
//     const data = await response.json();
//     return data;
//   };
  
//   fetchUsers().then(data => console.log(data));


//  async function getImage() {
//             try {
//               const response = await axios.get("https://pixabay.com/api/?key=35005985-6320445dd5945a516c4e799c6&q=yellow+flowers&image_type=photo&pretty=true&id=2295434");
//               console.log(response);
//             } catch (error) {
//               console.error("hello");
//             }
//           };
//           getImage().then(response =>console.log(response.data));



///////////////TEST1------correct//////////////////////////////

//button.addEventListener("click", fetchData());

    // function fetchData () {
    //     axios.get("https://pixabay.com/api/?key=35005985-6320445dd5945a516c4e799c6&q=yellow+flowers&image_type=photo&pretty=true&id=2295434")
    //     .then(function(response){
    //         console.log(response.data.hits);

    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })

    // };
///////////////TEST2 ---correct //////////////////////////////

    // button.addEventListener("click", fetchImage());
    // async function fetchImage() {
    //     try {
    //       const response = await axios.get('https://pixabay.com/api/?key=35005985-6320445dd5945a516c4e799c6&q=yellow+flowers&image_type=photo&pretty=true&id=2295434');
    //       console.log(response.data.hits);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }

////////////////////////////////////////copy

// function renderImageList(descrImage){

//     const markup = image.style.width='200';
//     .map(({webformatURL , largeImageURL , tags, likes, views, comments, downloads }) =>
//     `<div class="photo-card">
//     <img src="${Object.values(webformatURL)}" alt="${Object.values(tags)}" loading="lazy" />
//     <div class="info">
//     <p class="info-item">
//     <b>Likes</b>
//     ${Object.values(likes)}
//     </p>
//     <p class="info-item">
//     <b>Views</b>
//     ${Object.values(views)}
//     </p>
//     <p class="info-item">
//     <b>Comments</b>
//     ${Object.values(comments)}
//     </p>
//     <p class="info-item">
//     <b>Downloads</b>
//     ${Object.values(downloads)}
//     </p>
//     </div>
//     </div>`)
//     .join("");
//     console.log(Object.values(tags));
//     return console.log(markup);
    
//     gallery.insertAdjacentHTML('beforeend',markup);

//    }
