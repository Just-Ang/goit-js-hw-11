import axios from 'axios'
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
async function fetchImg(name, pagee) {

    const response = await fetch(
      `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pagee}`
    );
    const pictures = await response.json();
    return pictures;
}

function onSubmitClick(e) {
  e.preventDefault();
  inputValue = inputEl.value.trim();
  let page = 1;
  fetchImg(inputValue, page).then(data => {
    console.log(data);
    if (data.total <= 40) {
      galleryEl.innerHTML='';
      moreBtn.classList.add('is-hidden');
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      markUp(data);
      return;
    }

    if (data.total === 0) {
      galleryEl.innerHTML='';
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if ( data.total >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      galleryEl.innerHTML='';
      markUp(data);
      moreBtn.classList.remove('is-hidden');
    }
  });
}

moreBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  pages += 1;

  fetchImg(inputValue, pages)
    .then(data => {
      console.log(data);
      markUp(data);
      if (data.hits.length < 40) {
        markUp(data);
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results.")
        moreBtn.classList.add('is-hidden');
        return;
      } 
    })
    .catch(error => { Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    moreBtn.classList.add('is-hidden');});
}

function markUp(data) {
  const items = data.hits
    .map(
      item => `<a class="gallery__item" href="${item.largeImageURL}" onclick="event.preventDefault()">
        <div class="photo-card"> 
        <img src="${item.webformatURL}" alt="${item.tags}" title="${item.tags}" class="photo" width="340" height="200" loading="lazy" />
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

  galleryEl.insertAdjacentHTML('beforeend', items);
  var lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    scrollZoom: false,
  });
}
