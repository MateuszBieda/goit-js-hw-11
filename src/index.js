import './sass/index.scss';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//const axios = require('axios').default;


axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "35005985-6320445dd5945a516c4e799c6";
//const axios = require('axios').default;
const form = document.querySelector("#search-form");
const input = document.querySelector("input[name='searchQuery']");
const button = document.querySelector("button[type='submit']");
const gallery = document.querySelector(".gallery");
let descrImage = "";
let page = 1;
const perPage = 40;
const image = document.querySelector("img");
//image.style.width='200';
//gallery.style.height='200';

const URL = `?key=${API_KEY}&q=${descrImage}&image_type=photo&orientation=horizontal&safesearch=true`;

//form.addEventListener("submit", getImage());

button.addEventListener("click", getImage());


function onInput (e){
    e.preventDefault();
    let descrImage = input.value.trim();
    console.log(descrImage);
};

async function getImage() {
    try {
      const response = await axios.get(URL);     
      console.log(response.data);
      renderImageList(response)
    } catch (error) {
      console.error(error);
    }
  }

  function renderImageList(response){

    const markup = response.data.hits
    .map((key) => 
    `<div class="photo-card">
    <img src="${key.webformatURL}" alt="${key.tags}" loading="lazy" /> 
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
