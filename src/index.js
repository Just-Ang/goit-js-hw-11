// const axios = require('axios/dist/browser/axios.cjs'); 

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery')

formEl.addEventListener('submit', onSubmitClick);
let inputValue = '';
function fetchImg(name) {
    return fetch(
        `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
      ).then(response => {
        return response.json();
      });
}

function onSubmitClick(e) {
    e.preventDefault()
    inputValue = inputEl.value.trim();

fetchImg(inputValue).then(data => {
    console.log(data)
    let html = '';
    for (const img of data.hits) {
        const webformatURL = img.webformatURL;
        const largeImageURL = img.largeImageURL;
        const tags = img.tags;
        const likes = img.likes;
        const views = img.views;
        const comments = img.comments;
        const downloads = img.downloads;

        html += `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" class="photo" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>likes: ${likes}s</b>
          </p>
          <p class="info-item">
            <b>views: ${views}</b>
          </p>
          <p class="info-item">
            <b>comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b> downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
       galleryEl.innerHTML = html;
      }
    
})

}