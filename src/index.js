// const axios = require('axios/dist/browser/axios.cjs');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');
let pages = 1;

formEl.addEventListener('submit', onSubmitClick);
let inputValue = '';
function fetchImg(name, pagee) {
  return fetch(
    `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pagee}`
  ).then(response => {

    return response.json();
  });

}

function onSubmitClick(e) {
  e.preventDefault();
  inputValue = inputEl.value.trim();
let page = 1;
  fetchImg(inputValue, page).then(data => {
    console.log(data);

    if (data.total === 0) {
         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
         
    }

   if (data.total >= 1) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    const items = data.hits
    .map(
      item => `<a class="gallery__item" href="${item.largeImageURL}" onclick="event.preventDefault()">
      <div class="photo-card"> 
      <img src="${item.webformatURL}" alt="${item.tags}" title="${item.tags}" class="photo" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>likes: ${item.likes}s</b>
        </p>
        <p class="info-item">
          <b >views: ${item.views}</b>
        </p>
        <p class="info-item">
          <b>comments: ${item.comments}</b>
        </p>
        <p class="info-item">
          <b > downloads: ${item.downloads}</b>
        </p>
      </div> </div>

  </a>`
    )
    .join('');
    moreBtn.style.opacity = "1";

  galleryEl.innerHTML = items;
  var lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: 'img',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
      scrollZoom: false,
    });
   }
      
  });
  
}


moreBtn.addEventListener('click', onBtnClick)


function onBtnClick() {
    pages += 1;
    
    fetchImg(inputValue, pages).then(data => {
        console.log(data);
        const items = data.hits
      .map(
        item => `<a class="gallery__item" href="${item.largeImageURL}" onclick="event.preventDefault()">
        <div class="photo-card"> 
        <img src="${item.webformatURL}" alt="${item.tags}" title="${item.tags}" class="photo" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>likes: ${item.likes}s</b>
          </p>
          <p class="info-item">
            <b >views: ${item.views}</b>
          </p>
          <p class="info-item">
            <b>comments: ${item.comments}</b>
          </p>
          <p class="info-item">
            <b > downloads: ${item.downloads}</b>
          </p>
        </div> </div>
 
    </a>`
      )
      .join('');

    galleryEl.insertAdjacentHTML("beforeend", items);
    var lightbox = new SimpleLightbox('.gallery a', {
        captionSelector: 'img',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        scrollZoom: false,
      });
    
    })


}