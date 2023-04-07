

import axios from "axios";
export {fetchGallery};

const API_KEY = "35005985-6320445dd5945a516c4e799c6";
axios.defaults.baseURL = "https://pixabay.com/api/";


async function fetchGallery(descrImage, page, perPage) {
    const response = await axios.get(
      `?key=${API_KEY}&q=${descrImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`,
    );
    return response;
  }